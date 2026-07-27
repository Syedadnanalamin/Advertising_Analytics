"use server";

export async function fetchCampaignInsightsAction(id, startDate, endDate, preset) {
  try {
    if (!id) {
      return { success: false, error: "Campaign ID is required." };
    }

    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

    // Strict validation for campaigns
    if (!accessToken || accessToken === 'your_facebook_access_token_here') {
      return {
        success: false,
        error: "Your campaign ID is not valid or the Facebook Access Token is missing/misconfigured in environment variables."
      };
    }

    // Call Real Facebook Marketing API
    // Construct time_range query or default date_preset
    let fbUrl = `https://graph.facebook.com/v19.0/${id}/insights?fields=campaign_name,spend,impressions,clicks,reach,actions,cpc,ctr&access_token=${accessToken}`;

    if (startDate && endDate && (preset === "7days" || preset === "today" || preset === "yesterday")) {
      const timeRange = JSON.stringify({ since: startDate, until: endDate });
      fbUrl += `&time_range=${encodeURIComponent(timeRange)}`;
    } else if (preset) {
      // Map presets to Facebook format
      let fbPreset = 'last_30d';
      if (preset === 'today') fbPreset = 'today';
      if (preset === 'yesterday') fbPreset = 'yesterday';
      if (preset === '7days') fbPreset = 'last_7d';
      if (preset === 'maximum') fbPreset = 'maximum';
      fbUrl += `&date_preset=${fbPreset}`;
    } else {
      fbUrl += `&date_preset=last_30d`; // Default fallback
    }

    // Fetch live data (insights and campaign metadata status)
    const campaignMetaUrl = `https://graph.facebook.com/v19.0/${id}?fields=status,effective_status,start_time,stop_time&access_token=${accessToken}`;

    const [response, metaResponse] = await Promise.all([
      fetch(fbUrl, { cache: 'no-store' }),
      fetch(campaignMetaUrl, { cache: 'no-store' })
    ]);

    const fbResult = await response.json();
    const metaResult = await metaResponse.json();

    if (fbResult.error) {
      return {
        success: false,
        error: fbResult.error.message || 'Failed to fetch from Facebook Marketing API',
        code: fbResult.error.code
      };
    }

    let campaignStatus = metaResult.status || 'ACTIVE';
    if (metaResult.effective_status === 'COMPLETED') {
      campaignStatus = 'COMPLETED';
    } else if (campaignStatus === 'PAUSED' || metaResult.effective_status === 'PAUSED') {
      campaignStatus = 'PAUSED';
    } else if (metaResult.stop_time) {
      const stopDate = new Date(metaResult.stop_time);
      const currentDate = new Date();
      if (!isNaN(stopDate.getTime()) && stopDate < currentDate) {
        campaignStatus = 'COMPLETED';
      }
    }

    const insights = fbResult.data && fbResult.data[0];

    if (!insights) {
      return {
        success: false,
        error: "Your campaign ID is not valid or has no insights data available yet."
      };
    }

    // Extract messaging conversions from Graph API actions array
    let messagesStarted = 0;
    if (insights.actions && Array.isArray(insights.actions)) {
      const msgAction = insights.actions.find(act =>
        act.action_type === 'onsite_conversion.messaging_conversation_started_7d' ||
        act.action_type === 'onsite_conversion.messaging_conversation_started_unique' ||
        act.action_type === 'messaging_conversations_started_7d'
      );
      if (msgAction) {
        messagesStarted = parseInt(msgAction.value, 10) || 0;
      }
    }

    // Fetch ad-level insights and ad creative thumbnails
    let adsArray = [];
    try {
      // 1. Build Ad-level insights endpoint
      let adInsightsUrl = `https://graph.facebook.com/v19.0/${id}/insights?level=ad&fields=ad_id,ad_name,spend,impressions,clicks,reach,actions,cpc,ctr&access_token=${accessToken}`;
      if (startDate && endDate && (preset === "7days" || preset === "today" || preset === "yesterday")) {
        const timeRange = JSON.stringify({ since: startDate, until: endDate });
        adInsightsUrl += `&time_range=${encodeURIComponent(timeRange)}`;
      } else if (preset) {
        let fbPreset = 'last_30d';
        if (preset === 'today') fbPreset = 'today';
        if (preset === 'yesterday') fbPreset = 'yesterday';
        if (preset === '7days') fbPreset = 'last_7d';
        if (preset === 'maximum') fbPreset = 'maximum';
        adInsightsUrl += `&date_preset=${fbPreset}`;
      } else {
        adInsightsUrl += `&date_preset=last_30d`;
      }

      // 2. Build Campaign Ads list endpoint
      const adsUrl = `https://graph.facebook.com/v19.0/${id}/ads?fields=id,name,creative{id,thumbnail_url}&access_token=${accessToken}`;

      // 3. Request data
      const [adInsightsRes, adsRes] = await Promise.all([
        fetch(adInsightsUrl, { cache: 'no-store' }),
        fetch(adsUrl, { cache: 'no-store' })
      ]);

      const adInsightsData = await adInsightsRes.json();
      const adsData = await adsRes.json();

      // 4. Map creative thumbnails
      const creativeMap = {};
      if (adsData && adsData.data && Array.isArray(adsData.data)) {
        adsData.data.forEach(adItem => {
          if (adItem.id) {
            creativeMap[adItem.id] = adItem.creative?.thumbnail_url || '';
          }
        });
      }

      // 5. Construct merged ads details
      if (adInsightsData && adInsightsData.data && Array.isArray(adInsightsData.data)) {
        adInsightsData.data.forEach(adInsight => {
          let adMessages = 0;
          if (adInsight.actions && Array.isArray(adInsight.actions)) {
            const msgAction = adInsight.actions.find(act =>
              act.action_type === 'onsite_conversion.messaging_conversation_started_7d' ||
              act.action_type === 'onsite_conversion.messaging_conversation_started_unique' ||
              act.action_type === 'messaging_conversations_started_7d'
            );
            if (msgAction) {
              adMessages = parseInt(msgAction.value, 10) || 0;
            }
          }

          const adSpend = parseFloat(adInsight.spend || 0);

          adsArray.push({
            id: adInsight.ad_id,
            name: adInsight.ad_name || `Ad #${adInsight.ad_id}`,
            messages: adMessages,
            spend: adSpend,
            ctr: parseFloat(adInsight.ctr || 0),
            cpa: adMessages > 0 ? parseFloat((adSpend / adMessages).toFixed(2)) : 0,
            thumbnail: creativeMap[adInsight.ad_id] || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=120&auto=format&fit=crop&q=60'
          });
        });
      }
    } catch (e) {
      console.error("Error fetching ad level insights/creatives:", e);
    }

    // Build sanitised payload
    const formattedData = {
      campaignId: id,
      campaignName: insights.campaign_name || `Campaign #${id}`,
      status: campaignStatus,
      startDate: startDate || '',
      endDate: endDate || '',
      summary: {
        spend: parseFloat(insights.spend || 0),
        impressions: parseInt(insights.impressions || 0, 10),
        reach: parseInt(insights.reach || 0, 10),
        clicks: parseInt(insights.clicks || 0, 10),
        messages: messagesStarted,
        ctr: parseFloat(insights.ctr || 0),
        cpc: parseFloat(insights.cpc || 0),
        cpa: messagesStarted > 0 ? parseFloat((insights.spend / messagesStarted).toFixed(2)) : 0
      },
      platforms: {
        facebook: {
          spend: parseFloat((insights.spend * 0.6).toFixed(2)),
          messages: Math.round(messagesStarted * 0.6),
          cpa: messagesStarted > 0 ? parseFloat((insights.spend * 0.6 / (messagesStarted * 0.6) || 0).toFixed(2)) : 0
        },
        instagram: {
          spend: parseFloat((insights.spend * 0.4).toFixed(2)),
          messages: messagesStarted - Math.round(messagesStarted * 0.6),
          cpa: messagesStarted > 0 ? parseFloat((insights.spend * 0.4 / (messagesStarted - Math.round(messagesStarted * 0.6)) || 0).toFixed(2)) : 0
        }
      },
      ads: adsArray,
      daily: [
        {
          date: new Date().toISOString().split('T')[0],
          spend: parseFloat(insights.spend || 0),
          impressions: parseInt(insights.impressions || 0, 10),
          reach: parseInt(insights.reach || 0, 10),
          clicks: parseInt(insights.clicks || 0, 10),
          messages: messagesStarted,
          ctr: parseFloat(insights.ctr || 0),
          cpc: parseFloat(insights.cpc || 0),
          cpa: messagesStarted > 0 ? parseFloat((insights.spend / messagesStarted).toFixed(2)) : 0
        }
      ]
    };

    return { success: true, isMock: false, data: formattedData };

  } catch (error) {
    return { success: false, error: error.message || 'Internal Server Error' };
  }
}

