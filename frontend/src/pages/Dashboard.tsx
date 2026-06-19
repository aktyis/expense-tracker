import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import apiClient from '../api/apiClient';
import type { Expense, MonthlyBudget, AppSettings } from '../types';

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<MonthlyBudget | null>(null);
  const [settings, setSettings] = useState<AppSettings | null>(null);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, budgetRes, expensesRes] = await Promise.all([
          apiClient.get<AppSettings>('/settings'),
          apiClient.get<MonthlyBudget>(`/budgets/${year}/${month}`).catch(() => ({data: null})),
          apiClient.get<Expense[]>('/expenses') 
        ]);
        setSettings(settingsRes.data);
        setBudget(budgetRes.data);
        
        const currentMonthExpenses = expensesRes.data.filter(e => {
            const d = new Date(e.date);
            return d.getFullYear() === year && (d.getMonth() + 1) === month;
        });
        setExpenses(currentMonthExpenses);
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      }
    };
    fetchData();
  }, [year, month]);

  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const budgetAmount = budget?.amount || 0;
  const remaining = budgetAmount - totalSpent;
  const currency = settings?.currencyCode || 'USD';

  const grouped = expenses.reduce((acc: Record<string, number>, curr) => {
    acc[curr.date] = (acc[curr.date] || 0) + curr.amount;
    return acc;
  }, {});
  const chartData = Object.keys(grouped).map(date => ({
    date,
    amount: grouped[date]
  })).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-gray-500 text-sm font-semibold">Total Spent This Month</h2>
          <p className="text-3xl font-bold mt-2">{totalSpent} {currency}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-gray-500 text-sm font-semibold">Budget ({year}-{month})</h2>
          <p className="text-3xl font-bold mt-2">{budgetAmount} {currency}</p>
        </div>
        <div className={`p-6 rounded-lg shadow border ${remaining < 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
          <h2 className="text-gray-500 text-sm font-semibold">Remaining</h2>
          <p className={`text-3xl font-bold mt-2 ${remaining < 0 ? 'text-red-600' : 'text-green-600'}`}>
            {remaining} {currency}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-8">
        <h2 className="text-xl font-bold mb-4">Daily Spending</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
         <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-b">
                  <th className="py-2">Date</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Description</th>
                  <th className="py-2 text-right">Amount</th>
               </tr>
            </thead>
            <tbody>
               {expenses.slice(0, 10).map(exp => (
                  <tr key={exp.id} className="border-b last:border-0">
                     <td className="py-2">{exp.date}</td>
                     <td className="py-2">{exp.category.name}</td>
                     <td className="py-2">{exp.description}</td>
                     <td className="py-2 text-right font-medium">{exp.amount} {currency}</td>
                  </tr>
               ))}
               {expenses.length === 0 && (
                  <tr><td colSpan={4} className="py-4 text-center text-gray-500">No expenses recorded this month.</td></tr>
               )}
            </tbody>
         </table>
      </div>
    </div>
  );
}
