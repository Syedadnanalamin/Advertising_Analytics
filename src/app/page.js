"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AlertCircle } from "lucide-react";
import { fetchCampaignInsightsAction } from "@/lib/actions/campaign";

// Import custom modular components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchScreen from "@/components/SearchScreen";
import DashboardHeader from "@/components/DashboardHeader";
import KPICards from "@/components/KPICards";
import AdCreativePerformance from "@/components/AdCreativePerformance";

export default function Home() {
  // Navigation & Search State
  const [campaignId, setCampaignId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Dashboard Metrics & Fetch State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [campaignData, setCampaignData] = useState(null);
  const [objectiveMode, setObjectiveMode] = useState("messages"); // 'messages' or 'purchase'

  // Date Filtering State
  const [datePreset, setDatePreset] = useState("maximum"); // default to Maximum
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Initialize dates based on preset
  const setDatesFromPreset = useCallback((preset) => {
    const end = new Date();
    const start = new Date();

    if (preset === "today") {
      // Start is today at 00:00
    } else if (preset === "yesterday") {
      start.setDate(end.getDate() - 1);
      end.setDate(end.getDate() - 1);
    } else if (preset === "7days") {
      start.setDate(end.getDate() - 7);
    } else if (preset === "maximum") {
      setStartDate("");
      setEndDate("");
      return;
    }

    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end.toISOString().split("T")[0]);
  }, []);

  // Sync date fields when preset changes
  useEffect(() => {
    if (datePreset !== "custom") {
      setDatesFromPreset(datePreset);
    }
  }, [datePreset, setDatesFromPreset]);

  // Main fetch function
  const fetchCampaignData = useCallback(async (id, startD, endD, preset) => {
    if (!id) return;
    setLoading(true);
    setError(null);

    try {
      const result = await fetchCampaignInsightsAction(id, startD, endD, preset);

      if (result.success) {
        setCampaignData(result.data);
        // Auto-detect objective from campaign meta
        if (result.data.objective && (result.data.objective.includes("SALES") || result.data.objective.includes("CONVERSIONS"))) {
          setObjectiveMode("purchase");
        } else {
          setObjectiveMode("messages");
        }
      } else {
        setError(result.error || "Could not retrieve campaign. Check Campaign ID.");
      }
    } catch (err) {
      setError("An unexpected error occurred while fetching campaign data.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch when search is triggered
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setCampaignId(searchQuery.trim());
  };

  // Re-fetch data when campaignId, date preset, or custom dates change
  useEffect(() => {
    if (campaignId) {
      fetchCampaignData(campaignId, startDate, endDate, datePreset);
    }
  }, [campaignId, datePreset, startDate, endDate, fetchCampaignData]);

  // Print/Export functionality helper
  const handleExportPrint = () => {
    window.print();
  };

  // Render search screen if no campaign is selected
  if (!campaignId) {
    return (

      <SearchScreen
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSubmit={handleSearchSubmit}
      />

    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0b0b0f] flex flex-col relative overflow-x-hidden print:bg-white print:text-black">
      {/* Background design elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none print:hidden" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-500/5 rounded-full blur-[120px] pointer-events-none print:hidden" />

      {/* Navbar */}
      <Navbar
        onBack={() => {
          setCampaignId("");
          setCampaignData(null);
          setError(null);
        }}
        onExport={handleExportPrint}
        onRefresh={() => fetchCampaignData(campaignId, startDate, endDate, datePreset)}
        loading={loading}
        hasData={!!campaignData}
      />

      {/* Main Container */}
      <main className="flex-1 py-6 sm:py-8 px-4 sm:px-6 max-w-7xl mx-auto w-full space-y-6">
        {/* Loading Overlay */}
        {loading && !campaignData && (
          <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-zinc-400 text-sm font-semibold animate-pulse">
              Retrieving analytics from Facebook Marketing API...
            </span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="glass bg-red-950/15 border-red-500/20 text-red-400 p-5 rounded-2xl flex items-start gap-4">
            <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-white">API Request Error</h3>
              <p className="text-sm text-red-300/80">{error}</p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setError(null);
                    setCampaignId("");
                  }}
                  className="text-xs bg-white/5 hover:bg-white/10 text-white font-semibold py-1.5 px-3 rounded-lg border border-white/5"
                >
                  Return to Dashboard Search
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Campaign Data Dashboard */}
        {campaignData && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* Dashboard Header Bar (Verification details and Date Pickers) */}
            <DashboardHeader
              campaignData={campaignData}
              datePreset={datePreset}
              setDatePreset={setDatePreset}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              objectiveMode={objectiveMode}
              setObjectiveMode={setObjectiveMode}
            />

            {/* KPI Cards Grid */}
            <KPICards summary={campaignData.summary} objectiveMode={objectiveMode} />

            {/* Ad Creative breakdown */}
            <AdCreativePerformance ads={campaignData.ads} objectiveMode={objectiveMode} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
