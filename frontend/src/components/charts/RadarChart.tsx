import React from 'react';
import { InvestmentReport } from '../../types';

interface RadarChartProps {
  report: InvestmentReport;
}

export const RadarChart: React.FC<RadarChartProps> = ({ report }) => {
  const { recommendation, overview, risks } = report;

  // Deriving 5 dimensions dynamically from report contents
  const score = recommendation.investmentScore;
  const moatCount = overview.competitiveAdvantages?.length || 3;
  const riskLevel = risks.level;

  const data = [
    { name: 'Growth', value: Math.min(Math.max(score + 10, 30), 100) },
    { name: 'Moat', value: Math.min(Math.max(moatCount * 22, 40), 100) },
    { name: 'Solvency', value: Math.min(Math.max(riskLevel === 'Low' ? 90 : riskLevel === 'Medium' ? 70 : 45, 20), 100) },
    { name: 'Profitability', value: Math.min(Math.max(score - 5, 30), 100) },
    { name: 'Valuation', value: Math.min(Math.max(riskLevel === 'High' ? 40 : score > 80 ? 60 : 80, 20), 100) }
  ];

  const size = 260;
  const center = size / 2;
  const maxRadius = 80;
  const angleStep = (Math.PI * 2) / data.length;

  // Get coordinates for values
  const getCoordinates = (value: number, index: number, radiusOverride?: number) => {
    const r = radiusOverride || (value / 100) * maxRadius;
    const angle = index * angleStep - Math.PI / 2; // -90 deg to point upwards
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Outer Grid lines
  const gridRings = [0.25, 0.5, 0.75, 1];
  const ringPolygons = gridRings.map((scale) => {
    return data.map((_, i) => {
      const { x, y } = getCoordinates(100, i, scale * maxRadius);
      return `${x},${y}`;
    }).join(' ');
  });

  // Data path
  const dataPoints = data.map((d, i) => getCoordinates(d.value, i));
  const dataPolyPoints = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  // Labels coordinates
  const labelPositions = data.map((d, i) => {
    const { x, y } = getCoordinates(100, i, maxRadius + 22);
    let textAnchor: 'middle' | 'end' | 'start' = 'middle';
    if (x < center - 10) textAnchor = 'end';
    else if (x > center + 10) textAnchor = 'start';
    
    return { x, y, name: d.name, textAnchor, value: d.value };
  });

  return (
    <div className="bg-white dark:bg-[#1C1B22] p-8 scribble-border scribble-shadow-large select-none flex flex-col justify-between h-full">
      <div>
        <div className="font-scribble text-lg uppercase text-indigo-500 font-bold mb-1">
          Performance Profile
        </div>
        <div className="font-scribble text-3xl font-bold tracking-tight uppercase text-[#2D2B2A] dark:text-[#E8E6E3]">
          Vector Matrix
        </div>
      </div>

      <div className="flex justify-center items-center my-4">
        <svg width={size} height={size} className="overflow-visible">
          {/* Grid lines (Axes) */}
          {data.map((_, i) => {
            const outer = getCoordinates(100, i, maxRadius);
            return (
              <line
                key={`axis-${i}`}
                x1={center}
                y1={center}
                x2={outer.x}
                y2={outer.y}
                className="stroke-[#E5E5E0]"
                strokeWidth={1}
              />
            );
          })}

          {/* Grid rings */}
          {ringPolygons.map((points, index) => (
            <polygon
              key={`ring-${index}`}
              points={points}
              fill="none"
              className="stroke-[#E5E5E0]"
              strokeWidth={1}
              strokeDasharray={index === 3 ? 'none' : '2,2'}
            />
          ))}

          {/* Data area */}
          <polygon
            points={dataPolyPoints}
            fill="#1D4ED8"
            fillOpacity={0.15}
            className="stroke-[#1D4ED8]"
            strokeWidth={2}
          />

          {/* Data dots */}
          {dataPoints.map((pt, i) => (
            <circle
              key={`dot-${i}`}
              cx={pt.x}
              cy={pt.y}
              r={3}
              className="fill-[#CC0000] stroke-white"
              strokeWidth={1}
              style={{ borderRadius: '0px' }}
            />
          ))}

          {/* Label Texts */}
          {labelPositions.map((lbl, i) => (
            <g key={`lbl-${i}`}>
              <text
                x={lbl.x}
                y={lbl.y - 2}
                textAnchor={lbl.textAnchor}
                className="font-scribble text-sm font-bold uppercase fill-[#2D2B2A] dark:fill-[#E8E6E3]"
              >
                {lbl.name}
              </text>
              <text
                x={lbl.x}
                y={lbl.y + 12}
                textAnchor={lbl.textAnchor}
                className="font-scribble text-xs fill-zinc-500"
              >
                {lbl.value}%
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="border-t-2 border-dashed border-zinc-200 dark:border-zinc-800 pt-4 flex justify-between text-xs font-scribble text-zinc-500">
        <span>TYPE: PENTAGON RADAR</span>
        <span>INDEX: SCALED 0-100</span>
      </div>
    </div>
  );
};
