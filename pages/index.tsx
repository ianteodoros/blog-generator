// pages/index.tsx – UI dark‑mode + Stripe abonament
import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  /* ------------ state -------------- */
  const [theme, setTheme]       = useState('');
  const [tone, setTone]         = useState('formal');
  const [language, setLanguage] = useState('RO');
  const [content, setContent]   = useState('');
  const [loading, setLoading]   = useState(false);
  const [stripeLoad, setStripe] = useState(false);

  /* ------------ generate article -------------- */
  const handleGenerate = async () => {
    if (!theme.trim()) return;
    setLoading(true);
    setContent('');
    try {
      const r = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme, tone, language }),
      });
      const data = await r.json();
      setContent(data.content || '- nu s-a generat text -');
    } catch {
      setContent('Eroare la generare.');
    }
    setLoading(false);
  };

  /* ------------ stripe subscribe -------------- */
  const handleStripe = async () => {
    if (stripeLoad) return;
    setStripe(true);
    try {
      const { url } = await fetch('/api/subscribe', { method: 'POST' }).then(r => r.json());
      window.location.href = url;
    } catch {
      alert('Eroare Stripe');
      setStripe(false);
    }
  };

  return (
    <>
      <Head>
        <title>Generator de conținut – AI Blog</title>
        <meta name="description" content="Generează instant articole de blog cu AI" />
        <meta property="og:title" content="Generator de conținut – AI Blog" />
        <meta property="og:description" content="Generează instant articole de blog cu AI" />
      </Head>

      <main className="min-h-screen bg-zinc-900 text-white p-6 flex flex-col items-center">
        <section className="w-full max-w-3xl space-y-6">
          <h1 className="text-3xl font-bold text-center">Generator de conținut pentru blog</h1>

          {/* INPUTS */}
          <div className="space-y-4">
            <input
              className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded"
              placeholder="Tema articolului"
              value={theme}
              onChange={e => setTheme(e.target.value)}
            />

            <div className="grid sm:grid-cols-3 gap-4">
              <select
                className="bg-zinc-800 border border-zinc-700 p-2 rounded"
                value={tone}
                onChange={e => setTone(e.target.value)}
              >
                <option value="formal">Formal</option>
                <option value="informal">Informal</option>
                <option value="tehnic">Tehnic</option>
                <option value="persuasiv">Persuasiv</option>
              </select>

              <select
                className="bg-zinc-800 border border-zinc-700 p-2 rounded"
                value={language}
                onChange={e => setLanguage(e.target.value)}
              >
                <option value="RO">Română</option>
                <option value="EN">English</option>
                <option value="FR">Français</option>
              </select>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-700 p-2 rounded"
              >
                {loading ? 'Se generează…' : 'Generează articol'}
              </button>
            </div>
          </div>

          {/* OUTPUT */}
          {content && (
            <article className="whitespace-pre-line bg-zinc-800 p-4 rounded border border-zinc-700">
              {content}
            </article>
          )}

          {/* STRIPE SUBSCRIBE */}
          <div className="text-center pt-8">
            <button
              onClick={handleStripe}
              className="bg-green-600 hover:bg-green-700 p-3 rounded font-semibold disabled:bg-zinc-700"
              disabled={stripeLoad}
            >
              {stripeLoad ? 'Se deschide Stripe…' : 'Abonează‑te – 5 € / lună'}
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
