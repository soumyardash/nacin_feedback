// --- FRONTEND --- (React + Vite)
// File: frontend/src/App.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const fetchComplaints = async () => {
    const res = await axios.get('/api/complaints');
    setComplaints(res.data);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const submitComplaint = async (e) => {
    e.preventDefault();
    await axios.post('/api/complaints', form);
    setForm({ name: '', email: '', subject: '', message: '' });
    fetchComplaints();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Complaint Management System</h1>
      <form onSubmit={submitComplaint} className="mb-6">
        <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" className="border p-2 w-full mb-2" />
        <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" className="border p-2 w-full mb-2" />
        <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Subject" className="border p-2 w-full mb-2" />
        <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Message" className="border p-2 w-full mb-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Submit Complaint</button>
      </form>

      <h2 className="text-xl font-semibold mb-2">All Complaints</h2>
      <ul>
        {complaints.map(c => (
          <li key={c._id} className="border p-4 mb-2">
            <p><strong>{c.subject}</strong> ({c.status})</p>
            <p>{c.message}</p>
            <p><em>By: {c.name}, {c.email}</em></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
