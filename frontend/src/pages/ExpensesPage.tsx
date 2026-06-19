import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import type { Expense, Category } from '../types';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // Form state
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');

  // New Category State
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  const fetchExpenses = async () => {
    const res = await apiClient.get<Expense[]>('/expenses');
    setExpenses(res.data);
  };

  const fetchCategories = async () => {
    const res = await apiClient.get<Category[]>('/categories');
    setCategories(res.data);
    if (res.data.length > 0 && !categoryId) {
        setCategoryId(res.data[0].id.toString());
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName) return;
    await apiClient.post('/categories', { name: newCategoryName });
    setNewCategoryName('');
    fetchCategories();
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !categoryId || !date) return;
    
    await apiClient.post('/expenses', {
      amount: parseFloat(amount),
      date,
      description,
      category: { id: parseInt(categoryId) }
    });
    
    setAmount('');
    setDescription('');
    fetchExpenses();
  };

  const handleDelete = async (id: number) => {
    await apiClient.delete(`/expenses/${id}`);
    fetchExpenses();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1 space-y-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Add Expense</h2>
            <form onSubmit={handleAddExpense} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Amount</label>
                <input type="number" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} className="w-full border rounded p-2" required />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border rounded p-2" required />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full border rounded p-2" required>
                    <option value="" disabled>Select a category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                {categories.length === 0 && <p className="text-xs text-red-500 mt-1">Please add a category below first.</p>}
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <input type="text" value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded p-2" />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Expense</button>
            </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-lg font-bold mb-4">Manage Categories</h2>
            <form onSubmit={handleCreateCategory} className="flex gap-2 mb-4">
                <input type="text" placeholder="New category..." value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} className="flex-1 border rounded p-2 text-sm" />
                <button type="submit" className="bg-gray-800 text-white px-3 py-2 rounded text-sm hover:bg-gray-700">Add</button>
            </form>
            <ul className="space-y-1 text-sm">
                {categories.map(c => <li key={c.id} className="text-gray-600 border-b py-1">{c.name}</li>)}
            </ul>
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <h2 className="text-xl font-bold mb-4">All Expenses</h2>
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="border-b bg-gray-50">
                    <th className="p-3 text-sm font-semibold">Date</th>
                    <th className="p-3 text-sm font-semibold">Category</th>
                    <th className="p-3 text-sm font-semibold">Description</th>
                    <th className="p-3 text-sm font-semibold text-right">Amount</th>
                    <th className="p-3 text-sm font-semibold text-center">Action</th>
                </tr>
                </thead>
                <tbody>
                {expenses.map(exp => (
                    <tr key={exp.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="p-3 text-sm">{exp.date}</td>
                        <td className="p-3 text-sm"><span className="bg-gray-200 px-2 py-1 rounded text-xs">{exp.category.name}</span></td>
                        <td className="p-3 text-sm">{exp.description}</td>
                        <td className="p-3 text-sm text-right font-medium">{exp.amount}</td>
                        <td className="p-3 text-sm text-center">
                            <button onClick={() => handleDelete(exp.id)} className="text-red-500 hover:text-red-700">Delete</button>
                        </td>
                    </tr>
                ))}
                {expenses.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-gray-500">No expenses found.</td></tr>}
                </tbody>
            </table>
            </div>
        </div>
      </div>
    </div>
  );
}
