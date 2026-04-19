import { useState } from 'react';
import Plot from 'react-plotly.js';
import { Maximize2, Minimize2 } from 'lucide-react';

export default function ChartContainer({ chartData, title, index = 0 }) {
  const [expanded, setExpanded] = useState(false);

  if (!chartData?.data) return null;

  const darkLayout = {
    ...chartData.layout,
    autosize: true,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { family: 'DM Sans, sans-serif', size: 12, color: '#94a3b8' },
    margin: { l: 50, r: 20, t: 40, b: 50 },
    xaxis: { ...chartData.layout?.xaxis, gridcolor: '#1e293b', zerolinecolor: '#1e293b' },
    yaxis: { ...chartData.layout?.yaxis, gridcolor: '#1e293b', zerolinecolor: '#1e293b' },
    legend: {
      ...chartData.layout?.legend,
      font: { color: '#94a3b8', size: 11 },
      orientation: 'h',
      yanchor: 'bottom',
      y: -0.25,
      xanchor: 'center',
      x: 0.5,
    },
  };

  return (
    <div
      className={`
        bg-brand-800/50 border border-brand-700/30 rounded-xl overflow-hidden
        hover:border-brand-500/20 transition-all duration-300 animate-fade-in-up
        ${expanded ? 'col-span-full' : ''}
      `}
      style={{ animationDelay: `${index * 100 + 200}ms` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-brand-700/20">
        <h3 className="text-sm font-medium text-brand-200/80">{title}</h3>
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 rounded-md text-brand-200/30 hover:text-brand-200/70 hover:bg-brand-700/40 transition-colors"
        >
          {expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>

      {/* Chart */}
      <div className="p-4">
        <Plot
          data={chartData.data}
          layout={darkLayout}
          config={{
            responsive: true,
            displayModeBar: false,
            scrollZoom: false,
          }}
          style={{ width: '100%', height: expanded ? '500px' : '320px' }}
          useResizeHandler
        />
      </div>
    </div>
  );
}
