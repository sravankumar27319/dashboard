import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import jsonData from "../data/data.json"; 
const ROLES = {
  admin: {
    label: "Admin",
    color: "#7c3aed",
    can: { add: true, delete: true },
  },
  editor: {
    label: "Editor",
    color: "#0369a1",
    can: { add: true, delete: false },
  },
  viewer: {
    label: "Viewer",
    color: "#065f46",
    can: { add: false, delete: false },
  },
};
const AppContext = createContext();
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};
export function AppProvider({ children }) {
  const [role, setRoleState] = useState(() => {
    try {
      const saved = localStorage.getItem("app_role");
      return saved && ROLES[saved] ? saved : "admin";
    } catch {
      return "admin";
    }
  });

  const [activeView, setActiveView] = useState("dashboard");
  const [transactions, setTransactions] = useState(jsonData.transactions || []);
  const [monthlyData] = useState(jsonData.monthlyData || []);
  const [expenseBreakdown] = useState(jsonData.expenseBreakdown || []);
  useEffect(() => {
    try {
      localStorage.setItem("app_role", role);
    } catch (error) {
      console.error("Failed to save role:", error);
    }
  }, [role]);

  const setRole = useCallback((newRole) => {
    if (ROLES[newRole]) {
      setRoleState(newRole);
    }
  }, []);

  const can = useMemo(() => ROLES[role]?.can || ROLES.viewer.can, [role]);
  const summary = useMemo(() => {
    const totalRevenue = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const netProfit = totalRevenue - totalExpenses;

    const profitMargin =
      totalRevenue > 0
        ? parseFloat(((netProfit / totalRevenue) * 100).toFixed(1))
        : 0;

    return { totalRevenue, totalExpenses, netProfit, profitMargin };
  }, [transactions]);
  const addEntry = useCallback((entry) => {
    const newTransaction = {
      id: Date.now(),
      date: entry.date || new Date().toISOString().split("T")[0],
      description: entry.description,
      category: entry.category,
      amount:
        entry.type === "expense"
          ? -Math.abs(entry.amount)
          : Math.abs(entry.amount),
      type: entry.type,
    };

    setTransactions((prev) => [newTransaction, ...prev]);
  }, []);
  const deleteEntry = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const value = {
    role,
    setRole,
    can,
    activeView,
    setActiveView,
    data: {
      transactions,
      monthlyData,
      expenseBreakdown,
      summary,
    },
    addEntry,
    deleteEntry,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContext;