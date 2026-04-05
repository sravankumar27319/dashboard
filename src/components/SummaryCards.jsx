import { useApp } from "../context/AppContext";

const cards = [
  {
    key: "totalRevenue",
    label: "Total Revenue",
    badge: "bg-emerald-100 text-emerald-800",
    trend: "+12.5%",
    trendUp: true,
  },
  {
    key: "totalExpenses",
    label: "Total Expenses",
    badge: "bg-rose-100 text-rose-800",
    trend: "+8.1%",
    trendUp: false,
  },
  {
    key: "netProfit",
    label: "Net Profit",
    badge: "bg-blue-100 text-blue-800",
    trend: "+18.3%",
    trendUp: true,
  },
  {
    key: "profitMargin",
    label: "Profit Margin",
    badge: "bg-violet-100 text-violet-800",
    trend: "+2.1%",
    trendUp: true,
  },
];

function formatValue(key, value) {
  if (key === "profitMargin") return `${value}%`;
  return `$${Number(value).toLocaleString()}`;
}

export default function SummaryCards() {
  const { data } = useApp();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card) => (
        <div
          key={card.key}
          className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between mb-4">
             <p className="text-xl font-semibold">{card.label}</p>
            <span
              className={`text-xs fonxt-semibold px-2 py-1 rounded-full flex items-center gap-1 ${card.badge}`}
            >
              {card.trendUp ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              )}
              {card.trend}
            </span>
          </div>
          
          <p className="text-2xl font-normal text-slate-800 mb-1">
            {formatValue(card.key, data.summary[card.key])}
          </p>
          
        </div>
      ))}
    </div>
  );
}
