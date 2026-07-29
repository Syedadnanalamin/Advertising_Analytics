import React from "react";
import { MessageSquare, DollarSign, TrendingUp, MousePointerClick, ShoppingBag, Users, Eye } from "lucide-react";

export default function KPICards({ summary, objectiveMode }) {
  if (objectiveMode === "purchase") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {/* PRIMARY KPI: PURCHASES */}
        <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-emerald-500/25 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-300" />
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Website Purchases
              </span>
              <div className="text-3xl font-extrabold text-white">
                {(summary.purchases || 0).toLocaleString()}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center text-emerald-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 text-xs font-medium text-zinc-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Total purchase conversions</span>
          </div>
        </div>

        {/* SECONDARY KPI: COST PER PURCHASE */}
        <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-fuchsia-500/25 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-fuchsia-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-fuchsia-500/10 transition-all duration-300" />
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Cost Per Purchase
              </span>
              <div className="text-3xl font-extrabold text-white">
                ${(summary.costPerPurchase || 0).toFixed(2)}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/10 flex items-center justify-center text-fuchsia-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 text-xs font-medium text-zinc-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-fuchsia-400" />
            <span>Avg marketing cost per purchase</span>
          </div>
        </div>

        {/* THIRD KPI: TOTAL BUDGET SPENT */}
        <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-indigo-500/25 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-300" />
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Amount Spent
              </span>
              <div className="text-3xl font-extrabold text-white">
                ${(summary.spend || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/10 flex items-center justify-center text-indigo-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 text-xs font-medium text-zinc-400 flex items-center gap-1.5">
            <span>In selected date range</span>
          </div>
        </div>

        {/* FOURTH KPI: REACH */}
        <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-cyan-500/25 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/10 transition-all duration-300" />
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Total Reach
              </span>
              <div className="text-3xl font-extrabold text-white">
                {(summary.reach || 0).toLocaleString()}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 text-xs font-medium text-zinc-400 flex items-center gap-1.5">
            <span>Unique users who saw the ad</span>
          </div>
        </div>

        {/* FIFTH KPI: IMPRESSIONS */}
        <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-amber-500/25 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/10 transition-all duration-300" />
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Total Impressions
              </span>
              <div className="text-3xl font-extrabold text-white">
                {(summary.impressions || 0).toLocaleString()}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/10 flex items-center justify-center text-amber-400">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 text-xs font-medium text-zinc-400 flex items-center gap-1.5">
            <span>Total times the ad was shown</span>
          </div>
        </div>

        {/* SIXTH KPI: LANDING PAGE VIEWS / COST PER LPV */}
        <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-zinc-500/25 transition-all duration-300">
          <div className="absolute top-0 right-0 w-24 h-24 bg-zinc-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-zinc-500/10 transition-all duration-300" />
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Landing Page Views
              </span>
              <div className="text-2xl font-extrabold text-white flex items-baseline gap-2">
                <span>{(summary.landingPageViews || 0).toLocaleString()}</span>
                <span className="text-sm font-semibold text-zinc-500">/</span>
                <span className="text-base font-semibold text-zinc-400">${(summary.costPerLPV || 0).toFixed(2)}</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-zinc-500/10 border border-zinc-500/10 flex items-center justify-center text-zinc-400">
              <MousePointerClick className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 text-xs font-medium text-zinc-400 flex items-center gap-1.5">
            <span>Cost per landing page view</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
      {/* PRIMARY KPI: MESSAGES STARTED */}
      <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-indigo-500/25 transition-all duration-300">
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/10 transition-all duration-300" />
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Conversations Started
            </span>
            <div className="text-3xl font-extrabold text-white">
              {(summary.messages || 0).toLocaleString()}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/10 flex items-center justify-center text-indigo-400">
            <MessageSquare className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 text-xs font-medium text-zinc-400 flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
          <span>Total new client chats initiated</span>
        </div>
      </div>

      {/* SECONDARY KPI: COST PER CONVERSATION (CPA) */}
      <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-fuchsia-500/25 transition-all duration-300">
        <div className="absolute top-0 right-0 w-24 h-24 bg-fuchsia-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-fuchsia-500/10 transition-all duration-300" />
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Cost Per Chat
            </span>
            <div className="text-3xl font-extrabold text-white">
              ${(summary.cpa || 0).toFixed(2)}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/10 flex items-center justify-center text-fuchsia-400">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 text-xs font-medium text-zinc-400 flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-fuchsia-400" />
          <span>Avg marketing cost per chat</span>
        </div>
      </div>

      {/* THIRD KPI: TOTAL BUDGET SPENT */}
      <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-emerald-500/25 transition-all duration-300">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-300" />
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Amount Spent
            </span>
            <div className="text-3xl font-extrabold text-white">
              ${(summary.spend || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/10 flex items-center justify-center text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 text-xs font-medium text-zinc-400 flex items-center gap-1.5">
          <span>In selected date range</span>
        </div>
      </div>

      {/* FOURTH KPI: REACH */}
      <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-cyan-500/25 transition-all duration-300">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/10 transition-all duration-300" />
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Total Reach
            </span>
            <div className="text-3xl font-extrabold text-white">
              {(summary.reach || 0).toLocaleString()}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/10 flex items-center justify-center text-cyan-400">
            <Users className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 text-xs font-medium text-zinc-400 flex items-center gap-1.5">
          <span>Unique users who saw the ad</span>
        </div>
      </div>

      {/* FIFTH KPI: IMPRESSIONS */}
      <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-amber-500/25 transition-all duration-300">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/10 transition-all duration-300" />
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              Total Impressions
            </span>
            <div className="text-3xl font-extrabold text-white">
              {(summary.impressions || 0).toLocaleString()}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/10 flex items-center justify-center text-amber-400">
            <Eye className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 text-xs font-medium text-zinc-400 flex items-center gap-1.5">
          <span>Total times the ad was shown</span>
        </div>
      </div>

      {/* SIXTH KPI: CTR / CPC */}
      <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-zinc-500/25 transition-all duration-300">
        <div className="absolute top-0 right-0 w-24 h-24 bg-zinc-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-zinc-500/10 transition-all duration-300" />
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
              CTR / CPC
            </span>
            <div className="text-2xl font-extrabold text-white flex items-baseline gap-2">
              <span>{summary.ctr}%</span>
              <span className="text-sm font-semibold text-zinc-500">/</span>
              <span className="text-base font-semibold text-zinc-400">${(summary.cpc || 0).toFixed(2)}</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-zinc-500/10 border border-zinc-500/10 flex items-center justify-center text-zinc-400">
            <MousePointerClick className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-4 text-xs font-medium text-zinc-400 flex items-center gap-1.5">
          <span>Clicks: {summary.clicks.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
