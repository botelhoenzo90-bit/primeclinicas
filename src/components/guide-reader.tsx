import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PDFDocumentProxy } from 'pdfjs-dist';

export function GuideReader({ url, onDiagnostic }: { url: string; onDiagnostic: () => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [page, setPage] = useState(1);
  const [width, setWidth] = useState(600);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let disposed = false;
    let task: ReturnType<typeof import('pdfjs-dist')['getDocument']> | undefined;
    void (async () => {
      try {
        const pdf = await import('pdfjs-dist');
        const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
        pdf.GlobalWorkerOptions.workerSrc = worker.default;
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) throw new Error('Guide download failed');
        const data = new Uint8Array(await response.arrayBuffer());
        if (disposed) return;
        task = pdf.getDocument({ data });
        const loaded = await task.promise;
        if (!disposed) setDocument(loaded);
      } catch (cause) { console.error('Guide load failed', cause); if (!disposed) { setError(true); setLoading(false); } }
    })();
    return () => { disposed = true; void task?.destroy(); };
  }, [url]);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new ResizeObserver(entries => {
      const entry = entries[0];
      if (entry) setWidth(Math.max(200, Math.floor(entry.contentRect.width)));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!document) return;
    let disposed = false;
    let render: ReturnType<Awaited<ReturnType<PDFDocumentProxy['getPage']>>['render']> | undefined;
    setLoading(true);
    void (async () => {
      try {
        const pdfPage = await document.getPage(page);
        const element = canvas.current;
        if (disposed || !element) return;
        const base = pdfPage.getViewport({ scale: 1 });
        const viewport = pdfPage.getViewport({ scale: width / base.width });
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        element.width = Math.floor(viewport.width * ratio);
        element.height = Math.floor(viewport.height * ratio);
        const context = element.getContext('2d');
        if (!context) throw new Error('Canvas context unavailable');
        render = pdfPage.render({ canvasContext: context, viewport, transform: [ratio, 0, 0, ratio, 0, 0] });
        await render.promise;
        if (!disposed) setLoading(false);
      } catch (cause) { if (!disposed) { console.error('Guide page failed', cause); setError(true); setLoading(false); } }
    })();
    return () => { disposed = true; render?.cancel(); };
  }, [document, page, width]);

  return <div className="guide-reader-body">
    <div className="guide-reader-controls">
      <Button variant="outline" size="icon" aria-label="Página anterior" onClick={() => setPage(p => p - 1)} disabled={!document || page === 1 || loading}><ArrowLeft /></Button>
      <span aria-live="polite">{document ? `${page} / ${document.numPages}` : 'Carregando guia…'}</span>
      <Button variant="outline" size="icon" aria-label="Próxima página" onClick={() => setPage(p => p + 1)} disabled={!document || page === document.numPages || loading}><ArrowRight /></Button>
    </div>
    <div className="guide-reader-scroll"><div ref={container} className="guide-reader-page">
      {loading && !error && <div className="guide-reader-loading" role="status"><LoaderCircle className="animate-spin" /> Carregando página…</div>}
      {error ? <p role="alert">Não foi possível carregar o guia. Feche e abra novamente para tentar outra vez.</p> : <canvas ref={canvas} aria-label={`Página ${page} do Guia de Crescimento para Clínicas`} />}
    </div></div>
    <div className="guide-reader-footer"><span>Qual estratégia sua clínica precisa primeiro?</span><Button onClick={onDiagnostic}>Fazer meu diagnóstico gratuito <ArrowRight /></Button></div>
  </div>;
}