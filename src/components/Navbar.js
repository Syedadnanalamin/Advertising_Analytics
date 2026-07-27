import React from "react";
import { ArrowLeft, Download, RefreshCw } from "lucide-react";

export default function Navbar({
  onBack,
  onExport,
  onRefresh,
  loading,
  hasData
}) {
  return (
    <header className="border-b border-white/5 py-4 px-6 sticky top-0 bg-[#0b0b0f]/80 backdrop-blur-md z-30 print:hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition"
            title="Change Campaign"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#12121a]/80 border border-white/10 flex items-center justify-center p-1.5 overflow-hidden shrink-0">
              <img 
                src="/logo.jpg" 
                alt="Boost House Agency Logo" 
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
            <span className="text-sm sm:text-lg font-bold tracking-tight text-white truncate max-w-[120px] xs:max-w-[180px] sm:max-w-none">
              BOOST HOUSE AGENCY
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onExport}
            disabled={!hasData}
            className="px-3 sm:px-4 py-2 bg-white/5 hover:bg-white/10 active:scale-95 transition text-zinc-300 hover:text-white text-sm font-semibold rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Export Report</span>
          </button>
          <button
            onClick={onRefresh}
            disabled={loading}
            className="p-2.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 hover:text-indigo-300 transition rounded-xl disabled:opacity-50 disabled:pointer-events-none"
            title="Refresh Stats"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
