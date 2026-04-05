import { useState } from "react";
import { useApp } from "../context/AppContext";

const initialForm = {
  description: "",
  amount: "",
  type: "income",
  category: "Revenue",
  date: new Date().toISOString().split("T")[0],
};

const incomeCategories = ["Revenue", "Consulting", "Product Sales", "Investment", "Other Income"];
const expenseCategories = ["Salaries", "Marketing", "Operations", "R&D", "Misc"];

export default function InputForm() {
  const { addEntry, setActiveView } = useApp();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = form.type === "income" ? incomeCategories : expenseCategories;

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.amount || isNaN(form.amount) || +form.amount <= 0) e.amount = "Enter a valid amount";
    if (!form.date) e.date = "Date is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    addEntry({ ...form, amount: parseFloat(form.amount) });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm(initialForm);
      setActiveView("dashboard");
    }, 1500);
  };

  const field = (label, key, type = "text", placeholder = "") => (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: "" }); }}
        placeholder={placeholder}
        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all ${
          errors[key] ? "border-rose-300 bg-rose-50" : "border-slate-200 bg-white"
        }`}
      />
      {errors[key] && <p className="text-xs text-rose-500 mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="bg-linear-to-r from bg-indigo-700 to-violent-500 p-6">
          <h2 className="text-white font-bold text-xl">Add Financial Entry</h2>
          <p className="text-indigo-200 text-sm mt-1">Log your income or expense to update your dashboard</p>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Entry Type</label>
            <div className="grid grid-cols-2 gap-2">
              {["income", "expense"].map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    const newCat = t === "income" ? "Revenue" : "Salaries";
                    setForm({ ...form, type: t, category: newCat });
                  }}
                  className={`py-2.5 rounded-xl text-sm font-semibold capitalize flex items-center justify-center gap-2 transition-all duration-150 border-2 ${
                    form.type === t
                      ? t === "income"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border-rose-500 bg-rose-50 text-rose-700"
                      : "border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {t === "income" ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field("Description", "description", "text", "e.g. Client invoice, Office rent...")}
            {field("Amount ($)", "amount", "number", "0.00")}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
              >
                {categories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            {field("Date", "date", "date")}
          </div>
          {form.description && form.amount && (
            <div className={`rounded-xl p-4 border ${form.type === "income" ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}>
              <p className="text-xs font-semibold text-slate-500 mb-1">PREVIEW</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-semibold ${form.type === "income" ? "text-emerald-800" : "text-rose-800"}`}>{form.description}</p>
                  <p className="text-xs text-slate-500">{form.category} · {form.date}</p>
                </div>
                <span className={`text-lg font-bold ${form.type === "income" ? "text-emerald-600" : "text-rose-600"}`}>
                  {form.type === "income" ? "+" : "-"}${parseFloat(form.amount || 0).toLocaleString()}
                </span>
              </div>
            </div>
          )}
          <div className="flex gap-3 pt-1">
            <button
              onClick={() => setActiveView("dashboard")}
              className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitted}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                submitted
                  ? "bg-emerald-500"
                  : "bg-linear-to-r from-violet-600 to-indigo-600 hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-200"
              }`}
            >
              {submitted ? (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Saved! Returning...
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Add Entry
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
