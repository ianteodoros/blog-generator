import React, { useState, useEffect } from 'react';
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

  return (
    <>
      <Head>
        <title>Blog Generator SaaS</title>
      </Head>
      <main className="p-4 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Generator de conținut pentru blog</h1>

        <input
          placeholder="Tema articolului"
          className="border p-2 w-full mb-2"
          val
