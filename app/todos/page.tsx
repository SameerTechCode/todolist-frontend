
'use client';

import { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { useAuth } from '../../lib/store';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function TodosPage() {
  const { token, setToken } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const data = await api('/todos');
        setTodos(data);
      } catch (e: any) {
        setError(e.message);
      }
    })();
  }, [token]);

  async function addTodo() {
    if (!title.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const todo = await api('/todos', { method: 'POST', body: JSON.stringify({ title }) });
      setTodos((t) => [todo, ...t]);
      setTitle('');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function toggleTodo(id: number, completed: boolean) {
    try {
      const updated = await api(`/todos/${id}`, { method: 'PATCH', body: JSON.stringify({ completed: !completed }) });
      setTodos((t) => t.map(td => td.id === id ? updated : td));
    } catch (e: any) {
      setError(e.message);
    }
  }

  async function renameTodo(id: number) {
    const newTitle = prompt('New title?');
    if (!newTitle) return;
    try {
      const updated = await api(`/todos/${id}`, { method: 'PATCH', body: JSON.stringify({ title: newTitle }) });
      setTodos((t) => t.map(td => td.id === id ? updated : td));
    } catch (e: any) {
      setError(e.message);
    }
  }

  async function removeTodo(id: number) {
    try {
      await api(`/todos/${id}`, { method: 'DELETE' });
      setTodos((t) => t.filter(td => td.id !== id));
    } catch (e: any) {
      setError(e.message);
    }
  }

  if (!token) {
    return (
      <div className="max-w-md mx-auto mt-10 card">
        <h1 className="text-xl font-semibold">Please sign in</h1>
        <p className="text-gray-400 text-sm mt-2">Go to Sign In or Sign Up to continue.</p>
      </div>
    );
  }

  return (
    <section className="mt-8 grid gap-4">
      <div className="card">
        <div className="flex items-center gap-2">
          <input
            className="input"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' ? addTodo() : null}
          />
          <button className="btn btn-primary" onClick={addTodo} disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </button>
          <button className="btn ml-auto" onClick={() => setToken(null)}>Sign out</button>
        </div>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>
      <ul className="grid gap-2">
        {todos.map(t => (
          <li key={t.id} className="card flex items-center gap-3">
            <input type="checkbox" checked={t.completed} onChange={() => toggleTodo(t.id, t.completed)} />
            <span className={`flex-1 ${t.completed ? 'line-through text-gray-500' : ''}`}>{t.title}</span>
            <button className="text-sm underline" onClick={() => renameTodo(t.id)}>Rename</button>
            <button className="text-sm text-red-400 underline" onClick={() => removeTodo(t.id)}>Delete</button>
          </li>
        ))}
        {todos.length === 0 && (
          <li className="text-center text-gray-400 mt-6">No tasks yet. Add one!</li>
        )}
      </ul>
    </section>
  );
}
