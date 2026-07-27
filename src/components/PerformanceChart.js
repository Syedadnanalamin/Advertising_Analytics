import React, { useState } from "react";

export default function PerformanceChart({ dailyData }) {
  const [chartMetric, setChartMetric] = useState("messages"); // 'messages' or 'spend'
  const [hoveredDataPoint, setHoveredDataPoint] = useState(null);

  if (!dailyData || dailyData.length === 0) return null;

  const width = 800;
  const height = 300;
  const padding = { top: 30, right: 30, bottom: 40, left: 60 };

  // Get max values for calculations
  const maxVal = Math.max(...dailyData.map(d => chartMetric === "messages" ? d.messages : d.spend)) || 1;
  const n = dailyData.length;

  // Calculate coordinates
  const points = dailyData.map((d, i) => {
    const val = chartMetric === "messages" ? d.messages : d.spend;
    const x = padding.left + (i / Math.max(1, n - 1)) * (width - padding.left - padding.right);
    const y = height - padding.bottom - (val / maxVal) * (height - padding.top - padding.bottom);
    return { x, y, data: d, index: i };
  });

  // Create Path String
  let pathD = "";
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ");
  }

  // Create Area Fill String
  const areaD = pathD
    ? `${pathD} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`
    : "";

  // Set colors
  const strokeColor = chartMetric === "messages" ? "#6366f1" : "#10b981"; // Indigo or Emerald
  const areaGradient = chartMetric === "messages" ? "url(#indigoGrad)" : "url(#emeraldGrad)";

  return (
    <div className="lg:col-span-2 glass p-6 rounded-2xl border border-white/5 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">Performance Overview</h3>
          <p className="text-xs text-zinc-400">View daily metrics distributions across the timeline</p>
        </div>

        <div className="flex bg-[#12121a] p-1 rounded-xl border border-white/5 gap-1 print:hidden">
          <button
            onClick={() => setChartMetric("messages")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition duration-200 ${chartMetric === "messages" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
          >
            Conversations
          </button>
          <button
            onClick={() => setChartMetric("spend")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition duration-200 ${chartMetric === "spend" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
          >
            Spend
          </button>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible select-none">
          <defs>
            <linearGradient id="indigoGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = padding.top + ratio * (height - padding.top - padding.bottom);
            const gridVal = Math.round(maxVal * (1 - ratio));
            return (
              <g key={idx} className="opacity-40">
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#1f1f2e"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding.left - 15}
                  y={y + 4}
                  fill="#71717a"
                  fontSize="10"
                  textAnchor="end"
                  fontWeight="600"
                >
                  {chartMetric === "spend" ? `$${gridVal}` : gridVal}
                </text>
              </g>
            );
          })}

          {/* X Axis Labels */}
          {points.map((p, idx) => {
            // Render labels for start, mid, end or every few ticks if there are many days
            const showLabel = n <= 7 || idx === 0 || idx === Math.floor(n / 2) || idx === n - 1;
            if (!showLabel) return null;

            // Format date string (MM-DD)
            const dateObj = new Date(p.data.date);
            const dateStr = dateObj.toLocaleDateString(undefined, { month: "short", day: "numeric" });

            return (
              <text
                key={idx}
                x={p.x}
                y={height - padding.bottom + 20}
                fill="#71717a"
                fontSize="11"
                textAnchor="middle"
                fontWeight="500"
              >
                {dateStr}
              </text>
            );
          })}

          {/* Area Fill */}
          {areaD && <path d={areaD} fill={areaGradient} />}

          {/* Main Stroke Line */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke={strokeColor}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data Points */}
          {points.map((p, idx) => {
            const isHovered = hoveredDataPoint && hoveredDataPoint.index === idx;
            return (
              <g key={idx} className="cursor-pointer">
                {/* Bigger invisible circle for easier hovering */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="14"
                  fill="transparent"
                  onMouseEnter={() => setHoveredDataPoint(p)}
                  onMouseLeave={() => setHoveredDataPoint(null)}
                />
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? "7" : "4.5"}
                  fill={isHovered ? "#fff" : strokeColor}
                  stroke={strokeColor}
                  strokeWidth={isHovered ? "4" : "1.5"}
                  className="transition-all duration-150"
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredDataPoint && (
          <div
            className="absolute z-20 glass p-3 rounded-xl border border-white/10 shadow-2xl text-xs space-y-1"
            style={{
              left: `${(hoveredDataPoint.x / width) * 100}%`,
              top: `${(hoveredDataPoint.y / height) * 100 - 25}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="font-semibold text-zinc-300">
              {new Date(hoveredDataPoint.data.date).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </div>
            <div className="flex gap-4 font-bold">
              <span className="text-indigo-400">
                💬 {hoveredDataPoint.data.messages} chats
              </span>
              <span className="text-emerald-400">
                💵 ${hoveredDataPoint.data.spend.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
