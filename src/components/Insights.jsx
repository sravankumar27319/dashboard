import { useApp } from "../context/AppContext";

function MiniSparkline({ data, color }) {
  const vals = data.map((d) => d.profit);
  const min = Math.min(...vals);
  const max = Math.max(...vals);
  const range = max - min || 1;
  const w = 120, h = 36;
  const pts = vals.map((v, i) => {
    const x = (i / (vals.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  });
  return (
    <svg width={w} height={h}>
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].split(",")[0]} cy={pts[pts.length - 1].split(",")[1]} r="3" fill={color} />
    </svg>
  );
}

export default function Insights() {
  const { data } = useApp();
  const { summary, monthlyData } = data;

  const bestMonth = monthlyData.reduce((a, b) => (b.profit > a.profit ? b : a));
  const worstMonth = monthlyData.reduce((a, b) => (b.profit < a.profit ? b : a));
  const avgMonthlyProfit = (summary.netProfit / 12).toFixed(0);
  const expenseRatio = ((summary.totalExpenses / summary.totalRevenue) * 100).toFixed(1);

  const insights = [
    {
      label: "Best Month",
      value: bestMonth.month,
      sub: `$${bestMonth.profit.toLocaleString()} profit`,
      color: "bg-amber-50 border-amber-200",
    },
    {
      label: "Avg Monthly Profit",
      value: `$${parseInt(avgMonthlyProfit).toLocaleString()}`,
      sub: "Per month average",
      color: "bg-indigo-50 border-indigo-200",
    },
    {
      label: "Expense Ratio",
      value: `${expenseRatio}%`,
      sub: "Of total revenue",
      color: expenseRatio < 60 ? "bg-emerald-50 border-emerald-200" : "bg-amber-50 border-amber-200",
    },
    {
      label: "Worst Month",
      value: worstMonth.month,
      sub: `$${worstMonth.profit.toLocaleString()} profit`,
      color: "bg-rose-50 border-rose-200",
    },
  ];


  const plItems = [
    { label: "Gross Revenue", value: summary.totalRevenue, bold: false, indent: 0 },
    { label: "Total Operating Expenses", value: -summary.totalExpenses, bold: false, indent: 0 },
    { label: "EBITDA (Net Profit)", value: summary.netProfit, bold: true, indent: 0, divider: true },
    { label: "Profit Margin", value: null, pct: `${summary.profitMargin}%`, bold: false, indent: 1 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-bold text-slate-800">Key Insights</h3>
            <p className="text-xs text-slate-400 mt-0.5">Performance highlights</p>
          </div>
          
        </div>
        <div className="grid grid-cols-2 gap-4 h-1">
          {insights.map((ins, i) => (
            <div key={i} className={`rounded-xl border p-3.5 ${ins.color}`}>
              <div className="text-xl mb-1">{ins.icon}</div>
              <p className="text-xs text-slate-500 font-semibold">{ins.label}</p>
              <p className="font-bold text-slate-800 text-base">{ins.value}</p> 
              <p className="text-xs text-slate-400 mt-0.5">{ins.sub}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <div className="mb-4">
          <h3 className="font-semibold text-slate-800">Profit & Loss Statement</h3>
          <p className="text-xs text-slate-400 mt-0.5">Financial Year 2025</p>
        </div>
        <div className="space-y-1">
          {plItems.map((item, i) => (
            <div key={i}>
              {item.divider && <div className="border-t border-slate-200 my-3" />}
              <div className={`flex items-center justify-between py-2 ${item.indent ? "pl-4" : ""}`}>
                <span className={`text-sm ${item.bold ? "font-bold text-slate-800" : "text-slate-600"} ${item.indent ? "text-xs text-slate-400" : ""}`}>
                  {item.label}
                </span>
                {item.pct ? (
                  <span className="text-sm font-semibold text-indigo-600">{item.pct}</span>
                ) : (
                  <span className={`text-sm tabular-nums ${item.bold ? "font-bold" : "font-medium"} ${
                    item.value >= 0 ? "text-emerald-600" : "text-rose-600"
                  }`}>
                    {item.value >= 0 ? "" : "−"}${Math.abs(item.value).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-sm font-semibold  mb-2">
            <span>Profit Margin Progress</span>
            <span className="font-semibold text-indigo-600">{summary.profitMargin}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5">
           <div className={`h-2.5 rounded-full transition-all duration-700 ${ summary.profitMargin >= 30? "bg-green-500": "bg-red-500" }`}
              style={{ width: `${Math.min(summary.profitMargin, 100)}%` }}
            />
          </div>
          <p className="text-sm text-slate-400 mt-1.5">
            {summary.profitMargin >= 30 ? " Excellent margin (above 30% target)" : " Below 30% target margin"}
          </p>
        </div>
      </div>
    </div>
  );
}
