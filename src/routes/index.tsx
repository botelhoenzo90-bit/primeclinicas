import { createFileRoute } from "@tanstack/react-router";
import { createElement, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, AudioLines, Check, ChevronLeft, ChevronRight, Globe2, MapPin, MessageCircle, Play, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import clinicImage from "@/assets/clinic-reception.jpg";
import logoPrime from "@/assets/logo-prime-v2.png.asset.json";
import whatsappLogo from "@/assets/whatsapp-logo.png.asset.json";
import dep1 from "@/assets/testimonials/depoimento-1.jpeg.asset.json";
import dep2 from "@/assets/testimonials/depoimento-2.jpeg.asset.json";
import dep3 from "@/assets/testimonials/depoimento-3.jpeg.asset.json";
import dep4 from "@/assets/testimonials/depoimento-4.jpeg.asset.json";
import dep5 from "@/assets/testimonials/depoimento-5.jpeg.asset.json";
import dep6 from "@/assets/testimonials/depoimento-6.jpeg.asset.json";
import dep7 from "@/assets/testimonials/depoimento-7.jpeg.asset.json";
import dep8 from "@/assets/testimonials/depoimento-8.jpeg.asset.json";
import dep9 from "@/assets/testimonials/depoimento-9.jpeg.asset.json";
import dep10 from "@/assets/testimonials/depoimento-10.jpeg.asset.json";
import dep11 from "@/assets/testimonials/depoimento-11.png.asset.json";
import dep12 from "@/assets/testimonials/depoimento-12.png.asset.json";
import dep13 from "@/assets/testimonials/depoimento-13.png.asset.json";
import newestAudio from "@/assets/testimonials/depoimento-audio-novo.ogg.asset.json";
import audio1 from "@/assets/testimonials/audio-1.ogg.asset.json";
import audio2 from "@/assets/testimonials/audio-2.ogg.asset.json";

const WHATSAPP = "5542999787035";
const images = [dep1, dep2, dep3, dep4, dep5, dep6, dep7, dep8, dep9, dep10, dep11, dep12, dep13].map(item => item.url);
const audios = [newestAudio.url, audio1.url, audio2.url];
const questions = [
  { kicker: "O sintoma", title: "Qual destes problemas mais trava o crescimento da sua clínica?", options: ["A agenda ainda tem horários vazios", "Poucos pacientes novos chegam até nós", "Muitos contatos, poucos agendamentos", "Dependemos demais de indicações"] },
  { kicker: "O caminho do paciente", title: "Quando um paciente procura uma clínica como a sua, o que acontece?", options: ["Não aparecemos quando ele pesquisa no Google", "Ele nos encontra, mas não vê um diferencial claro", "Ele chama, mas a conversa não vira consulta", "Não sabemos onde estamos perdendo pacientes"] },
  { kicker: "A estrutura", title: "Hoje, o que falta para sua clínica crescer com mais previsibilidade?", options: ["Uma presença digital que passe confiança", "Mais visibilidade para atrair novos pacientes", "Uma estratégia de anúncios com direção", "Um processo melhor do contato ao agendamento"] },
];
const solutions: Record<string, { title: string; text: string; focus: string }> = {
  "A agenda ainda tem horários vazios": { title: "Agenda vazia não se resolve só com mais posts.", text: "É preciso conectar visibilidade, confiança e uma jornada simples até o agendamento.", focus: "Demanda mais previsível" },
  "Poucos pacientes novos chegam até nós": { title: "Sua clínica precisa ser encontrada pelas pessoas certas.", text: "Estar presente no momento da busca pode abrir um novo caminho para atrair pacientes.", focus: "Visibilidade com intenção" },
  "Muitos contatos, poucos agendamentos": { title: "O interesse existe. A conversão é o ponto de atenção.", text: "Uma experiência clara e um atendimento bem estruturado ajudam a transformar conversas em consultas.", focus: "Jornada até o agendamento" },
  "Dependemos demais de indicações": { title: "Indicação ajuda. Depender só dela limita o crescimento.", text: "Sua clínica pode construir presença própria para ser conhecida além da rede de indicação.", focus: "Aquisição de novos pacientes" },
};
const waLink = (answers: string[]) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Fiz o diagnóstico e quero conversar sobre as oportunidades da minha clínica.\n\nMeu principal desafio: ${answers[0] ?? "Crescimento da clínica"}\nJornada do paciente: ${answers[1] ?? "Não informado"}\nPrioridade: ${answers[2] ?? "Não informado"}`)}`;

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Diagnóstico de crescimento para clínicas | Prime" },
    { name: "description", content: "Descubra o que pode estar impedindo sua clínica de crescer e veja uma estratégia para atrair pacientes e gerar mais agendamentos." },
    { property: "og:title", content: "Por que sua clínica não consegue lotar a agenda? | Prime" },
    { property: "og:description", content: "Um diagnóstico rápido para identificar oportunidades de crescimento da sua clínica." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ClinicQuiz,
});

function ClinicQuiz() {
  // Each screen replaces the previous one; nothing is stacked below the opening screen.
  const [stage, setStage] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [testimonial, setTestimonial] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [stage]);
  const select = (question: number, answer: string) => {
    setAnswers(previous => { const next = [...previous]; next[question] = answer; return next; });
    setStage(stage + 1);
  };
  const move = (by: number) => setTestimonial(index => (index + by + images.length) % images.length);
  const result = solutions[answers[0]];
  const isQuestion = stage === 1 || stage === 2 || stage === 4;
  const questionIndex = stage === 4 ? 2 : stage - 1;
  const labels = ["Início", "Sua clínica", "O paciente", "Resultados reais", "Sua estrutura", "A estratégia", "O plano", "Seu diagnóstico"];
  return <main className="quiz-shell min-h-svh bg-background text-foreground">
    <header className="relative z-10 mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-5 md:h-20 md:px-10">
      <div className="flex items-center gap-2.5"><img src={logoPrime.url} alt="" className="h-8 w-auto md:h-9" /><span className="text-base font-extrabold uppercase leading-none">Prime<span className="text-primary">.</span></span></div>
      <span className="hidden text-[11px] font-bold uppercase text-muted-foreground sm:block">Diagnóstico para clínicas</span>
      <span className="rounded-full border border-border bg-card px-3 py-1.5 text-[10px] font-bold uppercase text-muted-foreground md:px-4">{stage === 0 ? "3 perguntas · sem cadastro" : `Etapa ${stage} de 7`}</span>
    </header>
    <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-5 md:px-10">
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted" role="progressbar" aria-label="Progresso do diagnóstico" aria-valuenow={stage} aria-valuemin={0} aria-valuemax={7}><div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${Math.max(5, stage / 7 * 100)}%` }} /></div>
      <span className="min-w-12 text-right text-xs font-bold tabular-nums text-muted-foreground">{String(stage + 1).padStart(2, "0")} / 08</span>
    </div>
    <div key={stage} className="quiz-stage animate-rise mx-auto flex w-full max-w-7xl flex-col justify-center px-5 py-8 md:px-10 md:py-12" aria-live="polite">
      {stage === 0 && <div className="relative isolate flex min-h-[calc(100svh-13rem)] flex-col justify-center overflow-hidden rounded-[2rem] bg-secondary px-6 py-8 md:min-h-[min(700px,calc(100svh-12rem))] md:px-16">
        <img src={clinicImage} alt="Clínica moderna" className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
        <div className="quiz-image-wash absolute inset-0 -z-10" />
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/80 px-4 py-2 text-[11px] font-bold uppercase text-foreground"><span className="h-2 w-2 rounded-full bg-primary" /> Para médicos e donos de clínicas</p>
          <h1 className="font-display text-[clamp(2.25rem,5vw,5rem)] leading-[1.08] text-foreground">Descubra por que sua clínica <span className="quiz-marker">não escala</span> e a agenda não lota.</h1>
          <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-foreground/75 md:text-xl">Você pode estar perdendo pacientes antes mesmo do primeiro contato. Responda 3 perguntas e descubra onde agir primeiro.</p>
          <Button onClick={() => setStage(1)} className="mt-8 h-16 w-full rounded-2xl px-8 text-sm font-extrabold uppercase shadow-lg transition-transform hover:scale-[1.02] sm:w-auto md:h-[72px] md:text-base">Começar diagnóstico <ArrowRight className="ml-2 h-5 w-5" /></Button>
          <p className="mt-4 text-xs font-semibold text-foreground/70">Gratuito · Rápido · Sem cadastro</p>
        </div>
      </div>}
      {isQuestion && <div className="mx-auto w-full max-w-2xl">
        <p className="mb-4 text-xs font-extrabold uppercase text-muted-foreground">0{questionIndex + 1} / 03 <span className="mx-2 text-primary">✦</span> {questions[questionIndex].kicker}</p>
        <h2 className="font-display text-[clamp(1.85rem,4vw,3.5rem)] leading-[1.12]">{questions[questionIndex].title}</h2>
        <p className="mt-4 text-sm text-muted-foreground">Selecione a resposta que mais se aproxima da sua realidade.</p>
        <div className="mt-7 grid gap-3">{questions[questionIndex].options.map((option, i) => <Button key={option} variant="outline" onClick={() => select(questionIndex, option)} className="group h-auto min-h-[70px] w-full justify-between whitespace-normal rounded-2xl border-border bg-card px-4 py-3 text-left text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-accent md:min-h-20 md:px-6 md:text-base"><span className="flex min-w-0 items-center gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-xs font-bold group-hover:bg-primary">{String.fromCharCode(65 + i)}</span><span>{option}</span></span><ArrowRight className="ml-3 h-5 w-5 shrink-0 text-muted-foreground group-hover:text-foreground" /></Button>)}</div>
      </div>}
      {stage === 3 && <div className="mx-auto w-full max-w-4xl text-center">
        <p className="text-xs font-extrabold uppercase text-muted-foreground">Antes de continuar · resultados reais</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight">Não é só sobre aparecer. É sobre gerar confiança.</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">Veja e ouça experiências reais de clientes da Prime.</p>
        <div className="relative mx-auto mt-6 flex h-[270px] max-w-2xl items-center justify-center overflow-hidden rounded-3xl border border-border bg-card p-3 shadow-lg sm:h-[370px] md:h-[420px]" onTouchStart={e => setTouchStart(e.touches[0]?.clientX ?? null)} onTouchEnd={e => { const end = e.changedTouches[0]?.clientX; if (touchStart !== null && end !== undefined && Math.abs(end - touchStart) > 40) move(end < touchStart ? 1 : -1); setTouchStart(null); }}>
          <img key={testimonial} src={images[testimonial]} alt={`Depoimento em imagem ${testimonial + 1} de ${images.length}`} className="h-full max-w-full object-contain" />
          <Button variant="outline" size="icon" onClick={() => move(-1)} aria-label="Depoimento anterior" className="absolute left-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-card/95"><ChevronLeft /></Button>
          <Button variant="outline" size="icon" onClick={() => move(1)} aria-label="Próximo depoimento" className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-card/95"><ChevronRight /></Button>
        </div>
        <div className="mt-3 flex items-center justify-center gap-3"><span className="text-xs font-bold tabular-nums text-muted-foreground">{String(testimonial + 1).padStart(2, "0")} / {images.length}</span><div className="flex max-w-[230px] gap-1 overflow-x-auto py-1">{images.map((_, i) => <Button key={i} variant="ghost" size="icon" aria-label={`Mostrar depoimento ${i + 1}`} aria-current={i === testimonial ? "true" : undefined} onClick={() => setTestimonial(i)} className="h-5 w-4 shrink-0 rounded-full p-0 hover:bg-transparent"><span className={`h-1.5 w-1.5 rounded-full ${i === testimonial ? "bg-foreground" : "bg-border"}`} /></Button>)}</div></div>
        <div className="mx-auto mt-5 max-w-2xl border-t border-border pt-4 text-left"><p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase"><AudioLines className="h-4 w-4" /> Ouça também</p><div className="grid gap-2 sm:grid-cols-3">{audios.map((src, i) => <div key={src} className="rounded-2xl border border-border bg-card p-3"><p className="mb-2 text-xs font-bold">Áudio 0{i + 1}</p><audio controls preload="none" src={src} aria-label={`Depoimento em áudio ${i + 1}`} className="h-9 w-full">Seu navegador não suporta áudio.</audio></div>)}</div></div>
        <p className="mt-3 text-[11px] text-muted-foreground">Depoimentos originais de clientes de diferentes segmentos. Resultados variam por projeto.</p>
      </div>}
      {stage === 5 && <VideoStage />}
      {stage === 6 && <div className="mx-auto w-full max-w-5xl">
        <p className="text-xs font-extrabold uppercase text-muted-foreground">O que vamos construir</p>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(1.8rem,4vw,3.25rem)] leading-tight">Sua clínica não precisa de ações soltas. Precisa de uma estratégia que conecte tudo.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">Do primeiro contato com a sua marca ao momento de marcar a consulta, cada etapa tem um papel no crescimento.</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">{[
          { icon: Globe2, title: "Presença que transmite confiança", text: "Site e apresentação profissional para mostrar seus serviços e diferenciais." },
          { icon: MapPin, title: "Visibilidade na hora certa", text: "Posicionamento no Google para ser encontrado por quem já procura atendimento." },
          { icon: Target, title: "Atração com direção", text: "Tráfego pago pensado para alcançar pessoas com potencial de se tornarem pacientes." },
          { icon: MessageCircle, title: "Contato que vira agenda", text: "Uma jornada comercial mais clara, do interesse à conversa e ao agendamento." },
        ].map(({ icon: Icon, title, text }, i) => <div key={title} className="rounded-3xl border border-border bg-card p-5 shadow-sm md:p-6"><div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/30"><Icon className="h-5 w-5" /></span><span className="text-xs font-bold text-muted-foreground">0{i + 1}</span></div><h3 className="mt-4 text-base font-extrabold md:text-lg">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p></div>)}</div>
      </div>}
      {stage === 7 && <div className="mx-auto w-full max-w-3xl text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/30"><TrendingUp className="h-8 w-8" /></span>
        <p className="mt-6 text-xs font-extrabold uppercase text-muted-foreground">Seu diagnóstico inicial</p>
        <h2 className="mx-auto mt-4 font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.12]">{result?.title ?? "Sua clínica tem espaço para crescer."}</h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{result?.text ?? "Vamos identificar onde estão as oportunidades para sua clínica."}</p>
        <div className="mx-auto mt-8 max-w-xl rounded-3xl border border-primary/40 bg-accent/45 p-5 text-left md:p-7"><p className="text-xs font-extrabold uppercase text-muted-foreground">Primeira direção para sua clínica</p><p className="mt-2 text-lg font-extrabold">{result?.focus ?? "Estratégia de crescimento"}</p><div className="mt-4 grid gap-2 text-sm font-semibold sm:grid-cols-2"><span className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0" /> Diagnóstico da presença atual</span><span className="flex items-center gap-2"><Check className="h-4 w-4 shrink-0" /> Plano de ação sob medida</span></div></div>
        <p className="mt-7 text-sm font-semibold">Quer saber o que melhorar primeiro?</p>
        <Button asChild className="mt-4 h-auto min-h-16 w-full max-w-md whitespace-normal rounded-2xl bg-whatsapp px-5 py-4 text-center text-sm font-extrabold uppercase text-whatsapp-foreground hover:bg-whatsapp/90"><a href={waLink(answers)} target="_blank" rel="noopener noreferrer"><img src={whatsappLogo.url} alt="" className="h-5 w-5" /> Conversar sobre minha clínica <ArrowRight className="h-5 w-5" /></a></Button>
        <p className="mt-4 text-xs text-muted-foreground">Uma conversa para entender seu momento. Sem compromisso.</p>
        <Button variant="ghost" onClick={() => { setAnswers([]); setStage(0); }} className="mt-5 rounded-xl text-muted-foreground">Refazer diagnóstico</Button>
      </div>}
    </div>
    {stage > 0 && stage < 7 && <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-5 pb-6 md:px-10" aria-label="Navegação do diagnóstico"><Button variant="ghost" onClick={() => setStage(stage - 1)} className="rounded-xl text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Voltar</Button><span className="hidden text-xs font-semibold text-muted-foreground sm:block">{labels[stage]}</span>{!isQuestion ? <Button onClick={() => setStage(stage + 1)} className="h-12 rounded-xl px-5 font-bold">Continuar <ArrowRight className="h-4 w-4" /></Button> : <span className="w-8" />}</nav>}
  </main>;
}

function VideoStage() {
  useEffect(() => {
    for (const [src, module] of [["https://fast.wistia.com/player.js", false], ["https://fast.wistia.com/embed/lz02wotjxg.js", true]] as const) {
      if (document.querySelector(`script[src="${src}"]`)) continue;
      const script = document.createElement("script"); script.src = src; script.async = true; if (module) script.type = "module"; document.head.appendChild(script);
    }
  }, []);
  return <div className="mx-auto grid w-full max-w-5xl items-center gap-8 md:grid-cols-[1fr_auto] md:gap-16">
    <div><p className="text-xs font-extrabold uppercase text-muted-foreground">A próxima peça do diagnóstico</p><h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] leading-tight">Entenda a estratégia por trás de uma agenda mais forte.</h2><p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">Assista à apresentação e veja por que atrair pacientes exige uma estrutura completa, não ações isoladas.</p><div className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-bold"><Play className="h-4 w-4" /> Assista antes de ver seu plano</div></div>
    <div className="mx-auto w-full max-w-[260px] overflow-hidden rounded-3xl border border-border bg-secondary shadow-xl md:w-[290px] md:max-w-none"><div className="relative aspect-[9/16]"><div className="absolute inset-0 bg-secondary" />{createElement("wistia-player", { "media-id": "lz02wotjxg", aspect: "0.5625", style: { display: "block", width: "100%", height: "100%", position: "relative" } })}</div></div>
  </div>;
}
