import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [theme, setTheme] = useState('');
  const [tone, setTone] = useState('formal');
  const [language, setLanguage] = useState('RO');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const generateArticle = async () => {
    if (!theme.trim()) return;
    setLoading(true);
    setContent('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme, tone, language })
      });
      const data = await res.json();
      setContent(data.content || 'Niciun text generat.');
    } catch (error) {
      setContent('A apărut o eroare la generare.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <Head>
        <title>Generator de Bloguri Elegant</title>
        <meta name="description" content="Generează articole în limba dorită, cu ton și temă selectabile." />
      </Head>

      <main className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-white">Generator de conținut</h1>

        <div className="grid gap-4">
          <input
            type="text"
            placeholder="Tema articolului (ex: Creșterea oilor în România)"
            className="bg-gray-800 p-3 rounded text-white placeholder-gray-400"
            value={theme}
            onChange={e => setTheme(e.target.value)}
          />

          <div className="flex gap-4">
            <select
              className="bg-gray-800 p-2 rounded w-full"
              value={tone}
              onChange={e => setTone(e.target.value)}
            >
              <option value="formal">Formal</option>
              <option value="informal">Informal</option>
              <option value="tehnic">Tehnic</option>
              <option value="spiritual">Spiritual</option>
            </select>

            <select
              className="bg-gray-800 p-2 rounded w-full"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              <option value="RO">Română</option>
              <option value="EN">Engleză</option>
              <option value="FR">Franceză</option>
              <option value="ES">Spaniolă</option>
            </select>
          </div>

          <button
            onClick={generateArticle}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 p-3 rounded font-semibold"
          >
            {loading ? 'Se generează...' : 'Generează articolul'}
          </button>
        </div>

        {content && (
          <div className="bg-gray-800 p-4 rounded shadow-inner whitespace-pre-line">
            {content}
          </div>
        )}
      </main>

      <footer className="mt-12 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Blog Generator
      </footer>
    </div>
  );
}
feat: redesign complet UI dark mode
