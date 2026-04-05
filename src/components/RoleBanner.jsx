import { useState } from "react";
import { useApp } from "../context/AppContext";

const ROLES = {
  admin: {
    label: "Admin",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#c4b5fd",
    can: { add: true, delete: true },
  },
  editor: {
    label: "Editor",
    color: "#0369a1",
    bg: "#e0f2fe",
    border: "#7dd3fc",
    can: { add: true, delete: false },
  },
  viewer: {
    label: "Viewer",
    color: "#065f46",
    bg: "#d1fae5",
    border: "#6ee7b7",
    can: { add: false, delete: false },
  },
};
const cfg = ROLES[ROLES] || ROLES.viewer; 
export function RoleBanner() {
  const { role, can } = useApp();
  const cfg = ROLES[role];


}
export function RoleSwitcher() {
  const { role, setRole } = useApp();
  const [open, setOpen] = useState(false);
  const cfg = ROLES[role];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`${cfg?.badgeBg} border ${cfg?.badgeBorder} ${cfg?.badgeText} font-bold text-sm px-3 py-2 rounded-lg flex items-center gap-2 transition-all hover:shadow-md`}
      >
       
        <span>{cfg?.label}</span>
        <span className="opacity-100 text-xs">▾</span>
      </button>

      {open && (
        <>
        
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-50 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden min-w-max">
            <div className="px-3.5 pt-2.5 pb-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Switch Role
            </div>
            {Object.entries(ROLES).map(([key, r]) => {
              const active = role === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setRole(key);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 border-l-4 flex items-start gap-2.5 transition-colors ${
                    active
                      ? `${r.badgeBg} border-l-4 border-l-current`
                      : "bg-white border-l-transparent hover:bg-slate-50"
                  }`}
                  style={active ? { borderLeftColor: r.color } : {}}
                >
                  <span className="text-base leading-tight mt-0.5">{r.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold text-sm" style={{ color: r.color }}>
                      {r.label}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {key === "admin" && "Full access — add & delete"}
                      {key === "editor" && "Can add, cannot delete"}
                      {key === "viewer" && "Read-only access"}
                    </div>
                  </div>
                </button>
              );
            })}
           
          </div>
        </>
      )}
    </div>
  );
}

export default RoleBanner;
