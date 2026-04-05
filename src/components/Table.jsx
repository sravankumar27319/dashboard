import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Table() {
  const { data, deleteEntry, can } = useApp();
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const filteredTransactions = data.transactions.filter((t) => {
    const matchesType = filterType === "all" || t.type === filterType;
    const matchesSearch =
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleDelete = (id) => {
    deleteEntry(id);
    setConfirmDelete(null);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Transactions</h3>
            <p className="text-sm text-slate-500 mt-1">
              {filteredTransactions.length} transactions
            </p>
          </div>
        </div>
        <div className="flex gap-3 items-center flex-wrap">
          <div className="relative flex-1 min-w-50">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 pl-9 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <svg
              className="absolute left-3 top-2.5 w-4 h-4 text-slate-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <div className="flex bg-slate-100 rounded-lg p-1 gap-1">
            {["all", "income", "expense"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-all ${
                  filterType === type
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-6 py-3 text-left font-semibold text-slate-700">
                Description
              </th>
              <th className="px-12 py-3 text-left font-semibold text-slate-700">
                Date
              </th>
              <th className="px-8 py-3 text-left font-semibold text-slate-700">
                Category
              </th>
              <th className="px-6  text-right font-semibold text-slate-700">
                Amount
              </th>
              <th className="px-10 py-3 text-left font-semibold text-slate-700">
                Type
              </th>
              {can?.delete && (
                <th className="px-6 py-3 text-center font-semibold text-slate-700">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td
                  colSpan={can?.delete ? 6 : 5}
                  className="px-6 py-8 text-center text-slate-500"
                >
                  <div className="text-4xl mb-2">📭</div>
                  No transactions found
                </td>
              </tr>
            ) : (
              filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      
                      <span className="font-medium text-slate-900">
                        {transaction.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>

                 
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        transaction.category === "Revenue"
                          ? "bg-green-100 text-green-700"
                          : transaction.category === "Salaries"
                          ? "bg-purple-100 text-purple-700"
                          : transaction.category === "Marketing"
                          ? "bg-yellow-100 text-yellow-700"
                          : transaction.category === "Operations"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {transaction.category}
                    </span>
                  </td>

                 
                  <td
                    className={`px-6 py-4 text-right font-semibold ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "−"}$
                    {Math.abs(transaction.amount).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

               
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {transaction.type.charAt(0).toUpperCase() +
                        transaction.type.slice(1)}
                    </span>
                  </td>

                  {/* Delete Action - Only show if user can delete */}
                  {can?.delete && (
                    <td className="px-6 py-4 text-center">
                      {confirmDelete === transaction.id ? (
                        <div className="flex items-center justify-center gap-2">
                        
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="inline-flex items-center justify-center gap-2 px-3 py-1.5  text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                          title={`Delete ${transaction.description}`}
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14H6L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M9 6V4h6v2" />
                          </svg>
                         
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}