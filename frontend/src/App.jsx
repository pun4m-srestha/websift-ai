import React, { useState } from 'react';
import { ArrowUpRight, Check, Clipboard, FileText, Globe2, LoaderCircle, Sparkles, WandSparkles } from 'lucide-react';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');

export default function App() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(''); setResult(null); setCopied(false);
    const cleanedUrl = url.trim();
    if (!cleanedUrl) { setError('Paste a webpage URL first.'); return; }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/summarize`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: cleanedUrl }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Could not summarize this webpage. Please try again.');
      setResult(data);
    } catch (err) {
      setError(err.message || 'Could not reach the server. Check your connection and try again.');
    } finally { setLoading(false); }
  }

  async function copySummary() {
    if (!result?.summary) return;
    try { await navigator.clipboard.writeText(result.summary); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { setError('Clipboard access is unavailable in this browser. You can select and copy the summary manually.'); }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="WebSift home"><span className="brand-mark"><WandSparkles size={18} /></span><span>websift<span className="brand-ai">.ai</span></span></a>
        <div className="topbar-note"><span className="status-dot" /> AI-powered reading</div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="eyebrow"><Sparkles size={14} /> YOUR SHORTCUT TO THE IMPORTANT PART</div>
          <h1>Read less.<br /><span>Know more.</span></h1>
          <p className="hero-copy">Turn long webpages into clear takeaways. Just drop in a link and let AI do the reading for you.</p>

          <form className="url-form" onSubmit={handleSubmit}>
            <label className="url-label" htmlFor="page-url">WEBPAGE URL</label>
            <div className="input-wrap"><Globe2 size={19} /><input id="page-url" type="url" inputMode="url" placeholder="https://example.com/article" value={url} onChange={(event) => setUrl(event.target.value)} disabled={loading} aria-describedby="url-help" /></div>
            <button className="summarize-button" type="submit" disabled={loading}>{loading ? <><LoaderCircle className="spin" size={18} /> Summarizing…</> : <>Summarize page <ArrowUpRight size={18} /></>}</button>
            <p className="form-footnote" id="url-help"><span className="tiny-lock">↳</span> Works best with public articles, blogs, and documentation.</p>
          </form>

          {loading && <div className="loading-panel" role="status"><span className="loading-icon"><LoaderCircle className="spin" size={19} /></span><div><strong>Reading the page</strong><p>Extracting content and preparing your summary. This can take a few seconds.</p></div></div>}
          {error && <div className="error-panel" role="alert"><strong>Couldn't summarize this page</strong><p>{error}</p></div>}

          {result && <section className="result-card" aria-live="polite">
            <div className="result-top"><div className="result-icon"><FileText size={19} /></div><div className="result-heading"><span className="result-kicker">YOUR SUMMARY</span><h2>{result.title}</h2></div><button className="copy-button" onClick={copySummary} type="button" aria-label="Copy summary">{copied ? <Check size={16} /> : <Clipboard size={16} />}<span>{copied ? 'Copied' : 'Copy'}</span></button></div>
            <div className="result-meta"><span><Globe2 size={13} /> {new URL(result.url).hostname}</span><span className="meta-separator">·</span><span>{Number(result.wordCount).toLocaleString()} words scanned</span></div>
            <div className="summary-content">{result.summary.split('\n').filter(Boolean).map((line, index) => <p key={`${index}-${line.slice(0, 12)}`}>{line.replace(/^[-*•]\s*/, '').startsWith('**') ? line.replace(/\*\*/g, '') : line.replace(/^[-*•]\s*/, '')}</p>)}</div>
            <a className="source-link" href={result.url} target="_blank" rel="noreferrer">Read original page <ArrowUpRight size={15} /></a>
          </section>}
        </section>

        {!result && !loading && <section className="how-section"><div className="section-heading"><span>THREE STEPS. LESS SCROLLING.</span><h2>From link to clarity.</h2></div><div className="steps-grid"><article className="step-card"><span className="step-number">01</span><div className="step-icon"><Globe2 size={19} /></div><h3>Drop a link</h3><p>Paste any publicly accessible webpage URL into the box above.</p></article><article className="step-card"><span className="step-number">02</span><div className="step-icon"><FileText size={19} /></div><h3>We read the page</h3><p>The app extracts the useful text and filters out common page clutter.</p></article><article className="step-card"><span className="step-number">03</span><div className="step-icon"><Sparkles size={19} /></div><h3>Get the gist</h3><p>AI returns the key ideas in a concise, easy-to-scan summary.</p></article></div></section>}
        <div className="privacy-note"><span className="privacy-star">✳</span><span>Made for curious minds. Summaries can miss context—open the original when details matter.</span></div>
      </main>
      <footer><span>© {new Date().getFullYear()} WebSift AI</span><span>Less noise, more signal.</span></footer>
    </div>
  );
}
