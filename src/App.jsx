import Dashboard from "./pages/Dashboard";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <div className="min-h-screen bg-slate-200">
 

    <AppProvider>
      <Dashboard />
    </AppProvider>
    </div>
  );
}

export default App;