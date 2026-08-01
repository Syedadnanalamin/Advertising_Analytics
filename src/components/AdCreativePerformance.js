import React, { useState } from "react";

export default function AdCreativePerformance({ ads, objectiveMode }) {
  const isPurchase = objectiveMode === "purchase";

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");

  // Sorting State
  const [sortField, setSortField] = useState("spend"); // Default sort by Spend
  const [sortDirection, setSortDirection] = useState("desc"); // Default descending

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc"); // Default to desc for numeric metrics
    }
  };

  // Filter Ads based on search
  const filteredAds = ads.filter(ad => 
    ad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ad.id.toString().includes(searchTerm)
  );

  // Sort Ads array
  const sortedAds = [...filteredAds].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    // Fallbacks for null/undefined
    if (aVal === undefined || aVal === null) aVal = 0;
    if (bVal === undefined || bVal === null) bVal = 0;

    if (typeof aVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (sortDirection === "asc") {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const renderSortIndicator = (field) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  // Stats calculation
  const activeCount = ads.filter(ad => ad.status === "ACTIVE").length;
  const inReviewCount = ads.filter(ad => ad.status === "IN_REVIEW" || ad.status === "PENDING_REVIEW").length;
  const pausedCount = ads.length - activeCount - inReviewCount;

  return (
    <div className="glass p-6 rounded-2xl border border-white/5 space-y-6">
      {/* Title & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-white">Ad Creative Performance</h3>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/10">
              {ads.length} Ads
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Individual ad performance tracking and statistics breakdown (Click headers to sort)
          </p>
        </div>

        {/* Search & Active Stats controls */}
        <div className="flex flex-wrap items-center gap-3 print:hidden">
          {/* Active / Paused Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950/40 border border-white/5 text-xs font-semibold text-zinc-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-zinc-300 font-bold">{activeCount}</span> Active
            </span>
            {inReviewCount > 0 && (
              <>
                <span className="text-zinc-600">|</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                  <span className="text-zinc-300 font-bold">{inReviewCount}</span> In Review
                </span>
              </>
            )}
            <span className="text-zinc-600">|</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
              <span className="text-zinc-300 font-bold">{pausedCount}</span> Paused
            </span>
          </div>

          {/* Search Input bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Filter ads by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-56 px-3.5 py-1.5 pl-8 text-xs bg-[#12121a] text-zinc-200 placeholder-zinc-500 rounded-xl border border-white/5 focus:outline-none focus:border-indigo-500/30 transition duration-200"
            />
            {/* Search Icon */}
            <svg
              className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-zinc-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-sm border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-white/5 text-zinc-400 text-xs font-bold uppercase tracking-wider select-none">
              <th className="py-4">Creative Preview</th>
              <th
                onClick={() => handleSort("name")}
                className="py-4 cursor-pointer hover:text-zinc-200 transition-colors"
              >
                Ad Name{renderSortIndicator("name")}
              </th>
              {isPurchase ? (
                <>
                  <th
                    onClick={() => handleSort("purchases")}
                    className="py-4 text-center cursor-pointer hover:text-zinc-200 transition-colors"
                  >
                    Purchases{renderSortIndicator("purchases")}
                  </th>
                  <th
                    onClick={() => handleSort("costPerPurchase")}
                    className="py-4 text-center cursor-pointer hover:text-zinc-200 transition-colors"
                  >
                    Cost Per Purchase{renderSortIndicator("costPerPurchase")}
                  </th>
                  <th
                    onClick={() => handleSort("landingPageViews")}
                    className="py-4 text-center cursor-pointer hover:text-zinc-200 transition-colors"
                  >
                    Landing Page Views{renderSortIndicator("landingPageViews")}
                  </th>
                  <th
                    onClick={() => handleSort("costPerLPV")}
                    className="py-4 text-center cursor-pointer hover:text-zinc-200 transition-colors"
                  >
                    Cost Per LPV{renderSortIndicator("costPerLPV")}
                  </th>
                </>
              ) : (
                <th
                  onClick={() => handleSort("messages")}
                  className="py-4 text-center cursor-pointer hover:text-zinc-200 transition-colors"
                >
                  Messages Started{renderSortIndicator("messages")}
                </th>
              )}
              <th
                onClick={() => handleSort("ctr")}
                className="py-4 text-center cursor-pointer hover:text-zinc-200 transition-colors"
              >
                Ad CTR{renderSortIndicator("ctr")}
              </th>
              <th
                onClick={() => handleSort("spend")}
                className="py-4 text-right cursor-pointer hover:text-zinc-200 transition-colors"
              >
                Ad Spend{renderSortIndicator("spend")}
              </th>
              {!isPurchase && (
                <th
                  onClick={() => handleSort("cpa")}
                  className="py-4 text-right cursor-pointer hover:text-zinc-200 transition-colors"
                >
                  Cost Per Message{renderSortIndicator("cpa")}
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sortedAds.length === 0 ? (
              <tr>
                <td colSpan={isPurchase ? 8 : 6} className="py-8 text-center text-zinc-500 font-medium">
                  No ads found matching "{searchTerm}"
                </td>
              </tr>
            ) : (
              sortedAds.map((ad, idx) => (
                <tr key={ad.id || idx} className="hover:bg-white/5 transition-colors">
                  <td className="py-4">
                    <img
                      src={ad.thumbnail}
                      alt="ad thumbnail"
                      className="w-10 h-10 object-cover rounded-lg border border-white/10"
                    />
                  </td>
                  <td className="py-4 font-semibold text-white">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span>{ad.name}</span>
                        <span className={`inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wide border ${
                          ad.status === "ACTIVE" 
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/10" 
                            : ad.status === "IN_REVIEW" || ad.status === "PENDING_REVIEW"
                              ? "bg-sky-500/10 text-sky-400 border-sky-500/10 animate-pulse"
                              : "bg-zinc-500/10 text-zinc-400 border-white/5"
                        }`}>
                          {ad.status || "ACTIVE"}
                        </span>
                      </div>
                      <span className="text-[10px] text-zinc-500 font-medium font-mono">{ad.id}</span>
                    </div>
                  </td>
                  {isPurchase ? (
                    <>
                      <td className="py-4 text-center text-zinc-200 font-bold">
                        {ad.purchases || 0}
                      </td>
                      <td className="py-4 text-center text-emerald-400 font-bold">
                        ${(ad.costPerPurchase || 0).toFixed(2)}
                      </td>
                      <td className="py-4 text-center text-zinc-200 font-bold">
                        {ad.landingPageViews || 0}
                      </td>
                      <td className="py-4 text-center text-emerald-400 font-bold">
                        ${(ad.costPerLPV || 0).toFixed(2)}
                      </td>
                    </>
                  ) : (
                    <td className="py-4 text-center text-zinc-200 font-bold">
                      {ad.messages || 0}
                    </td>
                  )}
                  <td className="py-4 text-center text-indigo-400 font-bold">
                    {ad.ctr}%
                  </td>
                  <td className="py-4 text-right text-zinc-300 font-medium">
                    ${ad.spend.toFixed(2)}
                  </td>
                  {!isPurchase && (
                    <td className="py-4 text-right text-emerald-400 font-bold">
                      ${ad.cpa.toFixed(2)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
