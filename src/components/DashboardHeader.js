import React from "react";

export default function DashboardHeader({
  campaignData,
  datePreset,
  setDatePreset,

}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 glass p-6 rounded-2xl border border-white/5">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 text-xs font-bold tracking-wide rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/10">
            MESSAGING CAMPAIGN
          </span>
          <span className="text-zinc-500 text-sm font-medium">
            ID: {campaignData.campaignId}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">
          {campaignData.campaignName}
        </h2>
        <div className="flex items-center gap-4 text-sm text-zinc-400 pt-1">
          <div className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${campaignData.status === "ACTIVE"
              ? "bg-emerald-500 animate-pulse"
              : campaignData.status === "PAUSED"
                ? "bg-amber-500"
                : "bg-zinc-500"
              }`} />
            <span className="font-bold text-zinc-300">{campaignData.status}</span>
          </div>
          <span>•</span>
          <span className="font-semibold text-indigo-300">Boost House Agency Verified</span>
        </div>
      </div>

      {/* Date Filters System */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 print:hidden">
        <div className="flex bg-[#12121a] p-1 rounded-xl border border-white/5 gap-1">
          <button
            onClick={() => setDatePreset("today")}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition duration-200 ${datePreset === "today" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
          >
            Today
          </button>
          <button
            onClick={() => setDatePreset("yesterday")}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition duration-200 ${datePreset === "yesterday" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
          >
            Yesterday
          </button>
          <button
            onClick={() => setDatePreset("7days")}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition duration-200 ${datePreset === "7days" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
          >
            7 Days
          </button>
          <button
            onClick={() => setDatePreset("maximum")}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition duration-200 ${datePreset === "maximum" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
          >
            Maximum
          </button>
        </div>
      </div>
    </div>
  );
}
