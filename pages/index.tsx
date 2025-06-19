import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [theme, setTheme]       = useState('');
  const [tone, setTone]         = useState('formal');
  const [language, setLanguage] = useState('RO');
  const [content, setContent]   = useState('');
  const [loading, setLoading]   = useState(false);

  // abonare
  const [email, setEmail]       = useState('');
  const [subscribed, setSub]    = useState(false);
  const [subErr, setSubErr]     = useState('');

  /*------------------  GENERATE  ------------------*/
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
      setContent(data.content || '- Nu s-a generat conținut -');
    } catch (e) {
      setContent('Eroare la generare.');
    }
    setLoading(false);
  };

  /*------------------  SUBSCRIBE  ------------------*/
  const handleSubscribe = async () => {
    if (!email.trim()) return;
    try {
      const r = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (r.ok) setSub(true);
      else throw new Error('Fail');
    } catch (e) {
      setSubErr('Eroare la abonare.');
    }
  };

  return (
    <>
      <Head>
        <title>Generator de conținut – AI Blog</title>
        <meta
          name="description"
          content="Generează instant articole de blog în limba și tonul dorit."
        />
        <meta property="og:title" content="Generator de conținut – AI Blog" />
        <meta
          property="og:description"
          content="Generează instant articole de blog în limba și tonul dorit."
        />
      </Head>

      <main className="min-h-screen bg-zinc-900 text-white p-6 flex flex-col items-center">
        <section className="w-full max-w-3xl space-y-6">
          <h1 className="text-3xl font-bold text-center">
            Generator de conținut pentru blog
          </h1>

          {/* FORM INPUTS */}
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
                {loading ? 'Se generează…' : 'Generează articolul'}
              </button>
            </div>
          </div>

          {/* OUTPUT */}
          {content && (
            <article className="whitespace-pre-line bg-zinc-800 p-4 rounded border border-zinc-700">
              {content}
            </article>
          )}

          {/* SUBSCRIBE */}
          {!subscribed && (
            <div className="bg-zinc-800 p-4 rounded border border-zinc-700 space-y-2">
              <p className="font-semibold">Primește noutăți pe email:</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  className="flex-grow bg-zinc-900 border border-zinc-700 p-2 rounded"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <button
                  onClick={handleSubscribe}
                  className="bg-green-600 hover:bg-green-700 p-2 rounded"
                >
                  Abonează-te
                </button>
              </div>
              {subErr && <p className="text-red-400 text-sm">{subErr}</p>}
            </div>
          )}

          {subscribed && (
            <p className="text-green-400 font-medium">
              Mulțumim, te-ai abonat!
            </p>
          )}
        </section>
      </main>
    </>
  );
}
