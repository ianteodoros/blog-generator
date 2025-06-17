import Head from 'next/head';
import { Button } from '../components/ui/button';
export default function Home() {
  const [theme, setTheme] = useState('');
  const [tone, setTone] = useState('formal');
  const [language, setLanguage] = useState('RO');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    setLoading(true);
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme, tone, language }),
    });
    const data = await response.json();
    setContent(data.content);
    setLoading(false);
  };
console.log('Forțare redeploy');
  return (
    <>
      <Head>
        <title>Blog Generator SaaS</title>
      </Head>
      <main className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Generator de conținut pentru blog</h1>
        <input placeholder="Tema articolului" className="border p-2 w-full mb-2" value={theme} onChange={e => setTheme(e.target.value)} />
        <select value={tone} onChange={e => setTone(e.target.value)} className="border p-2 w-full mb-2">
          <option value="formal">Formal</option>
          <option value="amuzant">Amuzant</option>
          <option value="persuasiv">Persuasiv</option>
        </select>
        <select value={language} onChange={e => setLanguage(e.target.value)} className="border p-2 w-full mb-2">
          <option value="RO">Română</option>
          <option value="EN">Engleză</option>
          <option value="FR">Franceză</option>
        </select>
        <Button onClick={handleSubmit} disabled={loading}>{loading ? 'Generează...' : 'Generează articolul'}</Button>
        <div className="mt-4 whitespace-pre-wrap border p-4 bg-gray-100 rounded-xl">
          {content}
        </div>
      </main>
    </>
  );
}
