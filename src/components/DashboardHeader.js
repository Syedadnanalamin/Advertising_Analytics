import React from "react";

export default function DashboardHeader({
  campaignData,
  datePreset,
  setDatePreset,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  objectiveMode,
  setObjectiveMode,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 glass p-6 rounded-2xl border border-white/5">
      <div className="space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`px-2.5 py-1 text-xs font-bold tracking-wide rounded-md border ${
            objectiveMode === "purchase"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/10"
              : "bg-indigo-500/10 text-indigo-400 border-indigo-500/10"
          }`}>
            {objectiveMode === "purchase" ? "SALES / PURCHASE CAMPAIGN" : "MESSAGING CAMPAIGN"}
          </span>
          <span className="text-zinc-500 text-sm font-medium">
            ID: {campaignData.campaignId}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          {campaignData.campaignName}
        </h2>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-zinc-400 pt-1">
          <div className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${campaignData.status === "ACTIVE"
              ? "bg-emerald-500 animate-pulse"
              : campaignData.status === "PAUSED"
                ? "bg-amber-500"
                : "bg-zinc-500"
              }`} />
            <span className="font-bold text-zinc-300">{campaignData.status}</span>
          </div>
          <span className="text-zinc-600">•</span>
          <span className="font-semibold text-indigo-300">Boost House Agency Verified</span>
        </div>
      </div>

      {/* Date Filters System & Objective Toggle */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 print:hidden w-full sm:w-auto">
        {/* Objective Selector */}
        <div className="flex bg-[#12121a] p-1 rounded-xl border border-white/5 gap-1 shrink-0">
          <button
            onClick={() => setObjectiveMode("messages")}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition duration-200 text-center shrink-0 ${
              objectiveMode === "messages"
                ? "bg-indigo-600 text-white font-bold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Messages
          </button>
          <button
            onClick={() => setObjectiveMode("purchase")}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition duration-200 text-center shrink-0 ${
              objectiveMode === "purchase"
                ? "bg-emerald-600 text-white font-bold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Purchases
          </button>
        </div>

        <div className="flex overflow-x-auto whitespace-nowrap bg-[#12121a] p-1 rounded-xl border border-white/5 gap-1 w-full sm:w-auto scrollbar-none">
          <button
            onClick={() => setDatePreset("today")}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition duration-200 text-center shrink-0 ${datePreset === "today" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
          >
            Today
          </button>
          <button
            onClick={() => setDatePreset("yesterday")}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition duration-200 text-center shrink-0 ${datePreset === "yesterday" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
          >
            Yesterday
          </button>
          <button
            onClick={() => setDatePreset("7days")}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition duration-200 text-center shrink-0 ${datePreset === "7days" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
          >
            7 Days
          </button>
          <button
            onClick={() => setDatePreset("maximum")}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition duration-200 text-center shrink-0 ${datePreset === "maximum" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
          >
            Maximum
          </button>
        </div>
      </div>
    </div>
  );
}
