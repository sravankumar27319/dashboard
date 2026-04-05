import { useApp } from "../context/AppContext";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  PieChart,
  Pie,
  CartesianGrid,
} from "recharts";
const INCOME_COLOR  = "#6366F1";
const EXPENSE_COLOR = "#FB7185";
const PROFIT_COLOR  = "#22C55E";
const PIE_COLORS    = ["#6366F1", "#22C55E", "#F59E0B", "#EC4899", "#06B6D4"];
const AXIS = { tickLine: false, axisLine: false, tick: { fontSize: 11, fill: "#94a3b8" } };
function BarTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const rows = [
    { key: "income",   color: INCOME_COLOR,  label: "Income"   },
    { key: "expenses", color: EXPENSE_COLOR, label: "Expense"  },
    { key: "profit",   color: PROFIT_COLOR,  label: "Profit"   },
  ];

  return (
    <div
      style={{
        background: "black",
        border: "3px solid black",
        borderRadius: 6,
        padding: "10px",
        minwidth:90 ,
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      }}
    >
      <p style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 700, marginBottom: 8, borderBottom: "1px solid #334155", paddingBottom: 6 }}>
        {label}
      </p>
      {rows.map(({ key, color, label: lbl }) => {
        const entry = payload.find((p) => p.dataKey === key);
        if (!entry) return null;
        return (
          <div key={key} style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 4, marginBottom: 4 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width:12, height:12, borderRadius: "50%", background: color, flexShrink: 0 }} />
              <span style={{ color: "#94a3b8", fontSize: 11 }}>{lbl}</span>
            </div>
            <span style={{ color: "#f1f5f9", fontSize: 11, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
              ₹{Number(entry.value).toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function LineTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: 12,
        padding: "10px 14px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      }}
    >
      <p style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} style={{ display: "flex", alignItems: "center", gap: 16, justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
            <span style={{ color: "#94a3b8", fontSize: 11, textTransform: "capitalize" }}>{p.dataKey}</span>
          </div>
          <span style={{ color: "#f1f5f9", fontSize: 11, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>
            ₹{Number(p.value).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

function PieTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div
      style={{
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: 12,
        padding: "10px 14px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: d.payload.fill }} />
        <span style={{ color: "#94a3b8", fontSize: 11 }}>{d.name}</span>
      </div>
      <p style={{ color: "#f1f5f9", fontSize: 13, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
        ₹{Number(d.value).toLocaleString()}
        <span style={{ color: "#64748b", fontSize: 10, fontWeight: 400, marginLeft: 4 }}>
          ({d.payload.percentage}%)
        </span>
      </p>
    </div>
  );
}

function ChartCard({ title, subtitle, children, legend }) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col h-75 sm:h-90">
      <div className="mb-3">
        <h3 className="text-sm sm:text-base font-semibold text-slate-800">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex-1 min-h-0">{children}</div>
      {legend && (
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mt-3">
          {legend}
        </div>
      )}
    </div>
  );
}

function LegendDot({ color, label, rounded = false }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-slate-500">
      <span
        className={`w-2.5 h-2.5 inline-block shrink-0 ${rounded ? "rounded-full" : "rounded-sm"}`}
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}

export default function Charts() {
  const { data } = useApp();
  const [activeIdx, setActiveIdx] = useState(null);

  const monthly = data.monthlyData.map((d) => ({
    month:    d.month,
    income:   d.income,
    expenses: d.expenses,
    profit:   d.profit,
  }));

  const pieData = data.expenseBreakdown.map((d) => ({
    name:       d.category,
    value:      d.amount,
    percentage: d.percentage,
  }));

  const yFmt = (v) => `₹${v / 1000}k`;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <div className="flex flex-col gap-5">
        <ChartCard
          title="Revenue vs Expenses"
          subtitle="Monthly comparison — 2025"
          legend={
            <>
              <LegendDot color={INCOME_COLOR}  label="Revenue"  />
              <LegendDot color={EXPENSE_COLOR} label="Expenses" />
            </>
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthly}
              barCategoryGap="32%"
              barGap={3}
              margin={{ top: 5, right: 4, left: -18, bottom: 0 }}
              onMouseLeave={() => setActiveIdx(null)}
            >
              <CartesianGrid vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" {...AXIS} interval="preserveStartEnd" />
              <YAxis {...AXIS} tickFormatter={yFmt} />
              <Tooltip content={<BarTooltip />} cursor={{ fill: "#f8fafc", radius: 6 }} />

              <Bar dataKey="income" radius={[4, 4, 0, 0]} onMouseEnter={(_, i) => setActiveIdx(i)}>
                {monthly.map((_, i) => (
                  <Cell
                    key={i}
                    fill={INCOME_COLOR}
                    opacity={activeIdx !== null && activeIdx !== i ? 0.3 : 1}
                  />
                ))}
              </Bar>

              <Bar dataKey="expenses" radius={[4, 4, 0, 0]} onMouseEnter={(_, i) => setActiveIdx(i)}>
                {monthly.map((_, i) => (
                  <Cell
                    key={i}
                    fill={EXPENSE_COLOR}
                    opacity={activeIdx !== null && activeIdx !== i ? 0.3 : 1}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard
          title="Profit Trend"
          subtitle="Net profit across months"
          legend={<LegendDot color={PROFIT_COLOR} label="Net Profit" rounded />}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthly} margin={{ top: 5, right: 4, left: -18, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" {...AXIS} interval="preserveStartEnd" />
              <YAxis {...AXIS} tickFormatter={yFmt} />
              <Tooltip content={<LineTooltip />} />
              <Line
                type="monotone"
                dataKey="profit"
                stroke={PROFIT_COLOR}
                strokeWidth={2.5}
                dot={{ r: 3, fill: PROFIT_COLOR, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: PROFIT_COLOR, stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <div className="flex flex-col gap-5">
        <ChartCard
          title="Expense Breakdown"
          subtitle="By category"
          legend={
            <>
              {pieData.map((d, i) => (
                <LegendDot
                  key={d.name}
                  color={PIE_COLORS[i % PIE_COLORS.length]}
                  label={`${d.name} (${d.percentage}%)`}
                  rounded
                />
              ))}
            </>
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius="38%"
                outerRadius="68%"
                paddingAngle={0.5}
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard
          title="Income & Profit"
          subtitle="Side-by-side monthly view"
          legend={
            <>
              <LegendDot color={INCOME_COLOR} label="Income" />
              <LegendDot color={PROFIT_COLOR} label="Profit" />
            </>
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthly}
              barCategoryGap="32%"
              barGap={2}
              margin={{ top: 5, right: 4, left: -18, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" {...AXIS} interval="preserveStartEnd" />
              <YAxis {...AXIS} tickFormatter={yFmt} />
              <Tooltip content={<BarTooltip />} cursor={{ fill: "#f8fafc", radius: 6 }} />
              <Bar dataKey="income" fill={INCOME_COLOR} radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" fill={PROFIT_COLOR} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

    </div>
  );
}
