import { useApp } from "../context/AppContext";
import SummaryCards from "../components/SummaryCards";
import Charts from "../components/Charts";
import Table from "../components/Table";
import Insights from "../components/Insights";
import InputForm from "../components/InputForm";
import { RoleBanner, RoleSwitcher } from "../components/RoleBanner";

export default function Dashboard() {
  const { activeView, setActiveView, data, can } = useApp();

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-900 text-2xl">FinDash</span>
          </div>
          <div className="flex items-center gap-3">
            {activeView === "dashboard" && (
              <>
                <RoleSwitcher />
                {can?.add && (
                  <button
                    onClick={() => setActiveView("form")}
                    className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-all shadow-md hover:shadow-lg"
                  >
                    + Add Entry
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        {activeView === "form" ? (
          <InputForm />
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Financial Overview</h1>
                <p className="text-sm text-slate-500 mt-1">Financial Year 2025 · {data.transactions.length} transactions</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-xs text-slate-600 bg-white border border-slate-200 px-3 py-2 rounded-lg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-400">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Jan – Dec 2025
                </span>
              </div>
            </div>
            <RoleBanner />
            <div className="space-y-5">
              <SummaryCards />
              <Charts />
              <Insights />
              <Table />
            </div>
          </>
        )}
      </main>
    </div>
  );
}