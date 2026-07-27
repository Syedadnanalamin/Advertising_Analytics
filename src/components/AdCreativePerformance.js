import React from "react";

export default function AdCreativePerformance({ ads }) {
  return (
    <div className="glass p-6 rounded-2xl border border-white/5 space-y-6">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-white">Ad Creative Performance</h3>
        <p className="text-xs text-zinc-400">Individual ad performance tracking and statistics breakdown</p>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left text-sm border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/5 text-zinc-400 text-xs font-bold uppercase tracking-wider">
              <th className="py-4">Creative Preview</th>
              <th className="py-4">Ad Name</th>
              <th className="py-4 text-center">Messages Started</th>
              <th className="py-4 text-center">Ad CTR</th>
              <th className="py-4 text-right">Ad Spend</th>
              <th className="py-4 text-right">Cost Per Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {ads.map((ad, idx) => (
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
                    <span>{ad.name}</span>
                    <span className="text-[10px] text-zinc-500 font-medium font-mono">{ad.id}</span>
                  </div>
                </td>
                <td className="py-4 text-center text-zinc-200 font-bold">
                  {ad.messages}
                </td>
                <td className="py-4 text-center text-indigo-400 font-bold">
                  {ad.ctr}%
                </td>
                <td className="py-4 text-right text-zinc-300 font-medium">
                  ${ad.spend.toFixed(2)}
                </td>
                <td className="py-4 text-right text-emerald-400 font-bold">
                  ${ad.cpa.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
