'use client';
import { useState } from 'react';
import { Copy, Share2 } from 'lucide-react';
export function ArticleShare({ title, url }: { title: string; url: string }) {
  const [message, setMessage] = useState('');
  const [manualCopy, setManualCopy] = useState(false);
  const [busy, setBusy] = useState(false);
  async function copy(instagram = false) {
    setMessage('');
    try {
      await navigator.clipboard.writeText(url);
      setManualCopy(false);
      setMessage(instagram ? 'Đã sao chép liên kết. Mở Instagram và dán vào tin nhắn hoặc nhãn Liên kết trong Story.' : 'Đã sao chép liên kết bài viết.');
    } catch {
      setManualCopy(true);
      setMessage('Trình duyệt không cho phép sao chép tự động. Hãy sao chép liên kết bên dưới.');
    }
  }
  async function share() {
    if (busy) return;
    if (!navigator.share) { await copy(); return; }
    setBusy(true); setMessage('');
    try { await navigator.share({ title, url }); }
    catch (err) { if (!(err instanceof DOMException && err.name === 'AbortError')) await copy(); }
    finally { setBusy(false); }
  }
  const button = 'inline-flex items-center gap-2 px-4 py-2 border border-[var(--border-subtle)] rounded hover:border-[var(--accent-gold)] focus-visible:outline-2 focus-visible:outline-offset-4';
  return <section aria-label="Chia sẻ bài viết" className="pt-6 border-t border-[var(--border-subtle)] space-y-3"><h2 className="font-bold text-[var(--text-primary)]">Chia sẻ bài viết</h2><div className="flex flex-wrap gap-3 text-sm">
    <a className={button} href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer">Facebook</a>
    <a className={button} href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer">X / Twitter</a>
    <button className={button} onClick={() => copy(true)}>Instagram · Sao chép link</button>
    <button className={button} onClick={() => copy()}><Copy size={16} />Sao chép</button>
    <button className={button} disabled={busy} onClick={share}><Share2 size={16} />Chia sẻ khác</button>
  </div><p className="text-xs text-[var(--text-secondary)]">Với Instagram, sao chép liên kết rồi dán vào tin nhắn hoặc Story trong ứng dụng.</p><p role="status" className="text-sm">{message}</p>{manualCopy && <input aria-label="Liên kết để sao chép" className="w-full p-3 border rounded bg-transparent" readOnly value={url} onFocus={event => event.currentTarget.select()} />}</section>;
}
