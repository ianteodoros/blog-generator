import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [theme,     setTheme]     = useState('');
  const [tone,      setTone]      = useState('formal');
  const [language,  setLanguage]  = useState('RO');
  const [content,   setContent]   = useState('');
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme, tone, language }),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setContent(data.content);
    } catch (err) {
      setError('Eroare la generare. Încearcă din nou.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head><title>Blog Generator SaaS</title></Head>

      <main style={{ maxWidth: 640, margin: '2rem auto', padding: '1rem' }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
          Generator de conținut pentru blog
        </h1>

        <input
          placeholder="Tema articolului"
          value={theme}
          onChange={e => setTheme(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />

        <select value={tone} onChange={e => setTone(e.target.value)} style={{ padding: 8, marginRight: 8 }}>
          <option value="formal">Formal</option>
          <option value="relaxat">Relaxat</option>
        </select>

        <select value={language} onChange={e => setLanguage(e.target.value)} style={{ padding: 8, marginRight: 8 }}>
          <option value="RO">Română</option>
          <option value="EN">Engleză</option>
        </select>

        <button onClick={handleSubmit} disabled={loading} style={{ padding: 8 }}>
          {loading ? 'Se generează…' : 'Generează articolul'}
        </button>

        {error && <p style={{ color: 'red', marginTop: 12 }}>{error}</p>}
        {content && (
          <pre style={{ whiteSpace: 'pre-wrap', marginTop: 24 }}>{content}</pre>
        )}
      </main>
    </>
  );
}
