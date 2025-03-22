'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { Search, Download, Eye, Share, Filter, FileText, Star, Users, Calendar, Settings, Activity, Layers, Bell, Moon, Sun, PlusCircle, Trash, Edit, MessageCircle, Lock, Unlock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const feedbackData = [
  { event: 'Hackathon', rating: 4.5 },
  { event: 'Tech Talk', rating: 4.2 },
  { event: 'Workshop', rating: 4.8 },
  { event: 'Seminar', rating: 4.6 },
  { event: 'Bootcamp', rating: 4.9 },
];

const reports = [
  { title: 'Hackathon Report', date: '2024-03-15', type: 'Meeting Summary' },
  { title: 'Tech Talk Insights', date: '2024-02-10', type: 'Event Report' },
  { title: 'Workshop Certificate', date: '2024-01-25', type: 'Certificate' },
  { title: 'Seminar Notes', date: '2024-04-20', type: 'Discussion Summary' },
  { title: 'Bootcamp Completion', date: '2024-05-10', type: 'Certification' },
];

const COLORS = ['#4F46E5', '#22C55E', '#FACC15', '#E11D48', '#3B82F6'];

export default function AutomatedReportsPage() {
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([
    'New Hackathon Report added',
    'Tech Talk Insights updated',
    'Workshop Certificate issued',
  ]);
  const [role, setRole] = useState('admin');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <div className={`min-h-screen bg-slate-900/40 p-12`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-6xl font-extrabold text-blue-200 drop-shadow-lg">📜 Automated Reports & Documentation</h1>
          <div className="flex gap-4">
            <Button onClick={() => setDarkMode(!darkMode)} className="p-3 rounded-full">
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </Button>
            <Button onClick={fetchData} className="p-3 rounded-full bg-blue-600 hover:bg-blue-700">
              <RefreshCw size={24} />
            </Button>
          </div>
        </div>

        {/* Role Switcher */}
        <div className="flex gap-4 mb-6">
          <Button onClick={() => setRole('admin')} className={`${role === 'admin' ? 'bg-blue-600' : 'bg-blue-800'} p-3 rounded-lg`}>
            Admin
          </Button>
          <Button onClick={() => setRole('user')} className={`${role === 'user' ? 'bg-blue-600' : 'bg-blue-800'} p-3 rounded-lg`}>
            User
          </Button>
        </div>

        {/* Loading State */}
        {loading && <p className="text-center text-lg font-semibold text-blue-200">Loading data...</p>}

        {/* Reports & Certificates */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mb-12">
          {reports.map((report, index) => (
            <div key={index} className="p-6 bg-slate-900/20 backdrop-blur-md shadow-2xl rounded-2xl transform hover:scale-105 transition-all">
              <h2 className="text-2xl font-semibold text-blue-300 flex items-center gap-2">
                <FileText size={24} /> {report.title}
              </h2>
              <p className="text-lg text-blue-200 mt-2 flex items-center gap-2">
                <Calendar size={20} /> {report.date} - {report.type}
              </p>
              <div className="flex gap-4 mt-6">
                <Button variant="ghost" className="text-blue-300 hover:text-blue-200"><Eye size={20} /> View</Button>
                <Button variant="ghost" className="text-green-400 hover:text-green-300"><Download size={20} /> Download</Button>
                <Button variant="ghost" className="text-yellow-400 hover:text-yellow-300"><Share size={20} /> Share</Button>
                {role === 'admin' && <Button variant="ghost" className="text-red-400 hover:text-red-300"><Trash size={20} /> Delete</Button>}
              </div>
            </div>
          ))}
        </div>

        {/* Participation Trends */}
        <div className="p-10 bg-slate-900/40 backdrop-blur-md shadow-2xl rounded-2xl text-center">
          <h2 className="text-4xl font-bold text-yellow-400 mb-8">📊 Participation Trends</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={feedbackData}>
              <XAxis dataKey="event" stroke="#bbb" tick={{ fontSize: 18 }} />
              <YAxis stroke="#bbb" tick={{ fontSize: 18 }} />
              <Tooltip wrapperClassName="text-black" />
              <Line type="monotone" dataKey="rating" stroke="#22C55E" strokeWidth={4} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-blue-400 text-lg">
          Ⓒ 2025 Automated Reports - All Rights Reserved
        </footer>
      </div>
    </div>


  );
}
