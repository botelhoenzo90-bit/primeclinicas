import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { testimonialVideos } from '@/lib/testimonial-videos';
import poster from '@/assets/testimonials/depoimento-clinica-poster.jpg';

export function VideoTestimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonialVideos[index];
  if (!current) return null;
  const move = (delta: number) => setIndex(i => (i + delta + testimonialVideos.length) % testimonialVideos.length);
  return <div className="video-testimonials" role="region" aria-label="Depoimentos em vídeo" aria-roledescription="carrossel">
    <div className="video-carousel-frame">
      <Button variant="outline" size="icon" className="video-carousel-arrow" onClick={() => move(-1)} aria-label="Depoimento anterior"><ArrowLeft /></Button>
      <video key={current.url} controls playsInline preload="metadata" poster={current.person === 'older-woman' ? poster : undefined} src={current.url} aria-label={`${current.label} ${index + 1}`} />
      <Button variant="outline" size="icon" className="video-carousel-arrow" onClick={() => move(1)} aria-label="Próximo depoimento"><ArrowRight /></Button>
    </div>
    <div className="video-carousel-caption"><span>Depoimentos reais</span><b aria-live="polite">{index + 1} / {testimonialVideos.length}</b></div>
  </div>;
}