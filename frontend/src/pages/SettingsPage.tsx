import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import type { AppSettings, MonthlyBudget } from '../types';

export default function SettingsPage() {
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [budgetYear, setBudgetYear] = useState(new Date().getFullYear());
  const [budgetMonth, setBudgetMonth] = useState(new Date().getMonth() + 1);
  const [budgetAmount, setBudgetAmount] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSettings();
    fetchBudget();
  }, [budgetYear, budgetMonth]);

  const fetchSettings = async () => {
    const res = await apiClient.get<AppSettings>('/settings');
    setCurrencyCode(res.data.currencyCode);
  };

  const fetchBudget = async () => {
    try {
        const res = await apiClient.get<MonthlyBudget>(`/budgets/${budgetYear}/${budgetMonth}`);
        if (res.data) {
            setBudgetAmount(res.data.amount.toString());
        } else {
            setBudgetAmount('');
        }
    } catch {
        setBudgetAmount('');
    }
  };

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiClient.put('/settings', { currencyCode });
    setMessage('Settings saved!');
    setTimeout(() => setMessage(''), 3000);
  };

  const saveBudget = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!budgetAmount) return;
    await apiClient.post('/budgets', {
        year: budgetYear,
        month: budgetMonth,
        amount: parseFloat(budgetAmount)
    });
    setMessage('Budget saved!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      {message && <div className="bg-green-100 text-green-800 p-3 rounded mb-4">{message}</div>}

      <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-8">
        <h2 className="text-xl font-bold mb-4">Global Preferences</h2>
        <form onSubmit={saveSettings} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Currency Code (e.g., USD, EUR, GBP)</label>
            <input type="text" value={currencyCode} onChange={e => setCurrencyCode(e.target.value.toUpperCase())} className="w-full border rounded p-2" required maxLength={3} />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Currency</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Monthly Budgets</h2>
        <form onSubmit={saveBudget} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium mb-1">Year</label>
                <input type="number" value={budgetYear} onChange={e => setBudgetYear(parseInt(e.target.value))} className="w-full border rounded p-2" required />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Month (1-12)</label>
                <input type="number" min="1" max="12" value={budgetMonth} onChange={e => setBudgetMonth(parseInt(e.target.value))} className="w-full border rounded p-2" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Budget Amount</label>
            <input type="number" step="0.01" value={budgetAmount} onChange={e => setBudgetAmount(e.target.value)} className="w-full border rounded p-2" required placeholder="0.00" />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Budget for {budgetMonth}/{budgetYear}</button>
        </form>
      </div>
    </div>
  );
}
