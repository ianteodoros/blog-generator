import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [theme, setTheme] = useState('');
  const [tone, setTone] = useState('formal');
  const [language, setLanguage] = useState('RO');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme, tone, language })
    });
    const data = await response.json();
    setContent(data.content);
    setLoading(false);
  };

  const handleSubscribe = () => {
    if (email) {
      setSubscribed(true);
      // Aici poți adăuga integrare cu un sistem de newsletter (Mailchimp, ConvertKit etc)
    }
  };

  return (
    <>
      <Head>
        <title>Blog Generator SaaS</title>
      </Head>
      <main className="min-h-screen bg-zinc-900 text-white flex flex-col items-center p-8">
        <h1 className="text-3xl font-bold mb-6">Generator de conținut pentru blog</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Tema articolului"
            className="bg-zinc-800 border border-zinc-700 p-2 rounded"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          />
          <select
            className="bg-zinc-800 border border-zinc-700 p-2 rounded"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="formal">Formal</option>
            <option value="informal">Informal</option>
          </select>
          <select
            className="bg-zinc-800 border border-zinc-700 p-2 rounded"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="RO">Română</option>
            <option value="EN">Engleză</option>
            <option value="FR">Franceză</option>
          </select>
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Se generează...' : 'Generează articolul'}
          </button>
        </div>

        {content && (
          <div className="max-w-3xl mt-6 bg-zinc-800 p-4 rounded shadow">
            <article className="prose prose-invert whitespace-pre-line">
              {content}
            </article>
          </div>
        )}

        {!subscribed && (
          <div className="mt-12 bg-zinc-800 p-4 rounded max-w-md w-full text-center">
            <p className="mb-2">Primește articole noi pe email:</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Adresa ta de email"
                className="flex-grow bg-zinc-900 border border-zinc-700 p-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={handleSubscribe}
                className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded"
              >
                Abonează-te
              </button>
            </div>
          </div>
        )}

        {subscribed && (
          <p className="mt-4 text-green-400">Mulțumim! Te-ai abonat cu succes.</p>
        )}
      </main>
    </>
  );
}
