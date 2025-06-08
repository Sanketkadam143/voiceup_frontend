import React from 'react';

interface ComplianceChartProps {
  data: Array<{
    date: string;
    complianceScore: number;
  }>;
}

export const ComplianceChart: React.FC<ComplianceChartProps> = ({ data }) => {
  const maxScore = 100;
  const chartHeight = 200;
  const chartWidth = 600;
  const padding = 40;

  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * (chartWidth - 2 * padding) + padding;
    const y = chartHeight - (item.complianceScore / maxScore) * (chartHeight - 2 * padding) - padding;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Score Trend</h3>
      <div className="relative">
        <svg width={chartWidth} height={chartHeight} className="w-full">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((value) => {
            const y = chartHeight - (value / maxScore) * (chartHeight - 2 * padding) - padding;
            return (
              <g key={value}>
                <line x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="#f3f4f6" strokeWidth="1" />
                <text x={padding - 10} y={y + 4} className="text-xs fill-gray-500" textAnchor="end">
                  {value}
                </text>
              </g>
            );
          })}
          
          {/* Chart line */}
          <polyline
            points={points}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * (chartWidth - 2 * padding) + padding;
            const y = chartHeight - (item.complianceScore / maxScore) * (chartHeight - 2 * padding) - padding;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#3b82f6"
                className="hover:r-6 transition-all duration-200"
              />
            );
          })}
          
          {/* X-axis labels */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * (chartWidth - 2 * padding) + padding;
            return (
              <text
                key={index}
                x={x}
                y={chartHeight - 10}
                className="text-xs fill-gray-500"
                textAnchor="middle"
              >
                {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};