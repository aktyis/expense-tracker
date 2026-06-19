import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ExpensesPage from './pages/ExpensesPage';
import SettingsPage from './pages/SettingsPage';
import { LayoutDashboard, Receipt, Settings } from 'lucide-react';

export default function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <aside className="w-64 bg-gray-900 text-white p-6 hidden md:block">
          <h1 className="text-2xl font-bold mb-8">Expense Tracker</h1>
          <nav className="space-y-2">
            <Link to="/" className="flex items-center gap-3 p-3 rounded hover:bg-gray-800 transition">
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link to="/expenses" className="flex items-center gap-3 p-3 rounded hover:bg-gray-800 transition">
              <Receipt size={20} /> Expenses
            </Link>
            <Link to="/settings" className="flex items-center gap-3 p-3 rounded hover:bg-gray-800 transition">
              <Settings size={20} /> Settings
            </Link>
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto">
          <nav className="bg-white p-4 shadow-sm border-b md:hidden flex justify-between">
            <Link to="/" className="font-bold text-lg">Dashboard</Link>
            <Link to="/expenses" className="font-bold text-lg">Expenses</Link>
            <Link to="/settings" className="font-bold text-lg">Settings</Link>
          </nav>
          
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
