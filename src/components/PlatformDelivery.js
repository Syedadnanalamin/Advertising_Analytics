import React from "react";
import { FacebookIcon, InstagramIcon } from "./Icons";

export default function PlatformDelivery({ platforms, summary }) {
  return (
    <div className="glass p-6 rounded-2xl border border-white/5 space-y-6 flex flex-col justify-between">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-white">Platform Delivery</h3>
        <p className="text-xs text-zinc-400">Distribution of conversations between Facebook and Instagram</p>
      </div>

      <div className="space-y-6 my-auto py-4">
        {/* FACEBOOK GAUGE */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-semibold">
            <div className="flex items-center gap-2">
              <FacebookIcon className="w-4 h-4 text-blue-500" />
              <span className="text-zinc-300">Facebook Messenger</span>
            </div>
            <span className="text-white">{platforms.facebook.messages} chats</span>
          </div>
          {/* Progress slider bar */}
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"
              style={{
                width: `${(platforms.facebook.messages / Math.max(1, summary.messages)) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-zinc-500 font-medium">
            <span>Spent: ${platforms.facebook.spend.toFixed(2)}</span>
            <span>Avg CPA: ${platforms.facebook.cpa.toFixed(2)}</span>
          </div>
        </div>

        {/* INSTAGRAM GAUGE */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-semibold">
            <div className="flex items-center gap-2">
              <InstagramIcon className="w-4 h-4 text-pink-500" />
              <span className="text-zinc-300">Instagram Direct</span>
            </div>
            <span className="text-white">{platforms.instagram.messages} chats</span>
          </div>
          {/* Progress slider bar */}
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-600 to-fuchsia-500 rounded-full"
              style={{
                width: `${(platforms.instagram.messages / Math.max(1, summary.messages)) * 100}%`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-zinc-500 font-medium">
            <span>Spent: ${platforms.instagram.spend.toFixed(2)}</span>
            <span>Avg CPA: ${platforms.instagram.cpa.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-4">
        <div className="grid grid-cols-2 text-center text-xs">
          <div className="border-r border-white/5 space-y-1">
            <div className="font-bold text-zinc-400">Total Impressions</div>
            <div className="text-sm font-extrabold text-white">
              {summary.impressions.toLocaleString()}
            </div>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-zinc-400">Total Reach</div>
            <div className="text-sm font-extrabold text-white">
              {summary.reach.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
