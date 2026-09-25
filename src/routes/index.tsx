import { createFileRoute } from "@tanstack/react-router";
import { createElement, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight, CircleCheck, Globe2, MapPin, MessageCircle, Play, Search, Sparkles, Target, TrendingUp } from "lucide-react";
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
const waLink = (answers?: string[]) => {
  const base = "Olá! Quero entender o que podemos melhorar na minha clínica.";
  const details = answers?.length ? `\n\nMeu diagnóstico:\nObjetivo: ${answers[0]}\nDesafio: ${answers[1]}\nEstrutura atual: ${answers[2]}` : "";
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(base + details)}`;
};

const questions = [
  { title: "Qual é o principal objetivo da sua clínica hoje?", options: ["Lotar mais a agenda", "Atrair novos pacientes", "Aumentar o faturamento", "Melhorar o posicionamento", "Crescer em todas essas áreas"] },
  { title: "O que mais está dificultando o crescimento da sua clínica?", options: ["Poucos pacientes novos", "Muitos horários vagos", "Dependo muito de indicação", "Minha presença digital precisa melhorar", "Tenho dificuldade em transformar contatos em agendamentos"] },
  { title: "Hoje sua clínica possui uma estrutura profissional para atrair e converter pacientes?", options: ["Não tenho site", "Tenho site, mas está desatualizado", "Tenho site, mas quase não gera contatos", "Tenho uma estrutura razoável", "Sim, está bem organizada"] },
];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Diagnóstico de crescimento para clínicas | Prime" },
    { name: "description", content: "Descubra em três perguntas oportunidades para atrair pacientes, fortalecer sua clínica no digital e gerar mais agendamentos." },
    { property: "og:title", content: "Sua clínica está pronta para crescer? | Prime" },
    { property: "og:description", content: "Faça um diagnóstico rápido da presença digital da sua clínica e descubra oportunidades para gerar mais agendamentos." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ClinicPage,
});

function WhatsButton({ children, answers, className = "" }: { children: React.ReactNode; answers?: string[]; className?: string }) {
  return <Button asChild className={`h-auto min-h-14 whitespace-normal rounded-md bg-whatsapp px-7 py-4 text-center text-sm font-bold uppercase text-whatsapp-foreground hover:bg-whatsapp/90 ${className}`}>
    <a href={waLink(answers)} target="_blank" rel="noopener noreferrer"><img src={whatsappLogo.url} alt="" className="h-5 w-5" />{children}<ArrowRight className="h-4 w-4" /></a>
  </Button>;
}

function ClinicPage() {
  const [answers, setAnswers] = useState<string[]>([]);
  const quizRef = useRef<HTMLElement>(null);
  const startQuiz = () => quizRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  return <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
    <header className="absolute inset-x-0 top-0 z-20 border-b border-foreground/10">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
        <a href="#inicio" aria-label="Prime, voltar ao início"><img src={logoPrime.url} alt="Prime" className="h-10 w-auto object-contain md:h-12" /></a>
        <span className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-widest text-foreground/70 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Estratégia digital para clínicas</span>
        <Button asChild variant="outline" className="h-10 border-foreground/20 bg-background/65 px-4 text-xs font-bold uppercase text-foreground backdrop-blur hover:bg-background"><a href={waLink()} target="_blank" rel="noopener noreferrer">Falar com especialista <ArrowRight className="h-3.5 w-3.5" /></a></Button>
      </div>
    </header>

    <section id="inicio" className="clinic-hero relative flex min-h-[670px] items-center overflow-hidden pt-24 pb-14 md:min-h-[760px] md:pb-20">
      <img src={clinicImage} alt="Recepção de clínica moderna e acolhedora" width={1536} height={1024} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="clinic-hero-overlay absolute inset-0" />
      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-10">
        <div className="max-w-[740px]">
          <div className="mb-6 inline-flex items-center gap-2 border-l-4 border-primary bg-background/80 px-4 py-2 text-xs font-bold uppercase tracking-widest backdrop-blur-sm"><Sparkles className="h-4 w-4 text-primary" /> Diagnóstico para médicos e clínicas</div>
          <h1 className="max-w-[730px] text-4xl font-bold uppercase leading-[1.09] sm:text-5xl md:text-6xl lg:text-[68px]">Sua clínica está preparada para <span className="clinic-highlight">lotar a agenda</span> e sair na frente da concorrência?</h1>
          <p className="mt-7 max-w-[560px] text-base leading-relaxed text-foreground/80 md:text-xl">Descubra em poucos passos o que pode estar impedindo sua clínica de atrair mais pacientes, passar mais confiança e crescer no digital.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button onClick={startQuiz} className="h-14 rounded-md px-7 text-sm font-bold uppercase shadow-sm sm:h-16 sm:px-9">Começar diagnóstico <ArrowRight className="ml-2 h-5 w-5" /></Button>
            <Button asChild variant="outline" className="h-14 border-foreground/30 bg-background/70 px-7 text-sm font-bold uppercase text-foreground backdrop-blur-sm hover:bg-background sm:h-16"><a href={waLink()} target="_blank" rel="noopener noreferrer"><img src={whatsappLogo.url} alt="" className="h-5 w-5" /> Falar no WhatsApp</a></Button>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm font-medium text-foreground/70"><CircleCheck className="h-4 w-4 text-foreground" /> 3 perguntas rápidas · Sem cadastro</p>
        </div>
      </div>
      <span className="absolute bottom-5 right-5 hidden text-xs font-medium uppercase tracking-widest text-foreground/60 md:block">Prime / Saúde & crescimento</span>
    </section>

    <Quiz refEl={quizRef} answers={answers} setAnswers={setAnswers} />
    <Growth />
    <VideoSection />
    <Services />
    <Testimonials />
    <section className="border-t border-border bg-secondary py-18 md:py-24">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">O próximo passo é uma conversa</p>
        <h2 className="text-3xl font-bold uppercase leading-tight md:text-5xl">Quer entender o que podemos melhorar na sua clínica?</h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">Fale com nossa equipe no WhatsApp e veja como podemos ajudar sua clínica a atrair mais pacientes, fortalecer sua presença digital e gerar mais agendamentos.</p>
        <div className="mt-9"><WhatsButton answers={answers} className="w-full sm:w-auto sm:px-10">Quero falar no WhatsApp</WhatsButton></div>
        <p className="mt-7 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Site · Google · Tráfego · Posicionamento · Comercial</p>
      </div>
    </section>
    <footer className="border-t border-border bg-background px-5 py-7 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Prime Página de Vendas</footer>
  </main>;
}

function Quiz({ refEl, answers, setAnswers }: { refEl: React.RefObject<HTMLElement | null>; answers: string[]; setAnswers: (answers: string[]) => void }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  useEffect(() => { if (!loading) return; const timer = window.setTimeout(() => { setLoading(false); setDone(true); }, 1500); return () => window.clearTimeout(timer); }, [loading]);
  const choose = (option: string) => {
    const next = [...answers.slice(0, step), option];
    setAnswers(next);
    if (step < questions.length - 1) setStep(step + 1);
    else setLoading(true);
  };
  const reset = () => { setAnswers([]); setStep(0); setDone(false); setLoading(false); };
  return <section ref={refEl} id="diagnostico" className="scroll-mt-4 border-y border-border bg-secondary py-16 md:py-24">
    <div className="mx-auto max-w-3xl px-5">
      <div className="mb-9 text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Diagnóstico estratégico</p><h2 className="mt-3 text-3xl font-bold md:text-4xl">Onde sua clínica pode avançar?</h2><p className="mt-3 text-muted-foreground">Responda com sinceridade. Leva menos de um minuto.</p></div>
      <div className="border border-border bg-background p-6 shadow-sm sm:p-10">
        {done ? <div className="py-6 text-center" aria-live="polite">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/30"><Check className="h-7 w-7" /></div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Seu diagnóstico está pronto</p>
          <h3 className="mx-auto mt-3 max-w-xl text-2xl font-bold md:text-3xl">Encontramos oportunidades importantes para o crescimento da sua clínica.</h3>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">{answers[2] === "Sim, está bem organizada" ? "Mesmo com uma boa estrutura, sempre há espaço para refinar a jornada do paciente e melhorar os agendamentos." : `Você apontou “${answers[1]?.toLowerCase()}”. Uma presença digital estratégica pode ajudar a transformar interesse em contatos mais qualificados.`}</p>
          <div className="mt-7"><WhatsButton answers={answers}>Conversar sobre meu diagnóstico</WhatsButton></div>
          <Button variant="ghost" onClick={reset} className="mt-4 text-muted-foreground">Refazer diagnóstico</Button>
        </div> : loading ? <div className="flex min-h-72 flex-col items-center justify-center text-center" aria-live="polite"><div className="h-12 w-12 animate-spin rounded-full border-4 border-border border-t-primary" /><h3 className="mt-6 text-2xl font-bold">Analisando suas respostas...</h3><p className="mt-2 text-muted-foreground">Identificando oportunidades para sua clínica.</p></div> : <>
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted-foreground"><span>Etapa 0{step + 1} / 03</span><span>{Math.round((step + 1) / 3 * 100)}%</span></div>
          <div className="mt-3 h-1.5 w-full bg-muted" role="progressbar" aria-valuenow={step + 1} aria-valuemin={0} aria-valuemax={3} aria-label="Progresso do diagnóstico"><div className="h-full bg-primary transition-all duration-300" style={{ width: `${(step + 1) / 3 * 100}%` }} /></div>
          <h3 className="mt-8 min-h-16 text-xl font-bold leading-snug sm:text-2xl">{questions[step].title}</h3>
          <div className="mt-6 grid gap-2.5">{questions[step].options.map((option, i) => <Button key={option} variant="outline" onClick={() => choose(option)} className="group h-auto min-h-14 w-full justify-between whitespace-normal rounded-md border-border bg-background px-4 py-3 text-left text-sm font-medium text-foreground transition hover:border-foreground hover:bg-secondary sm:text-base"><span className="flex items-center gap-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center border border-border bg-secondary text-xs text-muted-foreground group-hover:border-foreground">{String.fromCharCode(65 + i)}</span>{option}</span><ArrowRight className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" /></Button>)}</div>
          <div className="mt-6 h-8">{step > 0 && <Button variant="ghost" className="px-0 text-muted-foreground" onClick={() => setStep(step - 1)}><ArrowLeft className="h-4 w-4" /> Voltar</Button>}</div>
        </>}
      </div>
    </div>
  </section>;
}

function Growth() {
  const steps = ["Ser encontrada", "Passar confiança", "Mostrar diferenciais", "Facilitar o contato", "Gerar agendamentos"];
  return <section className="py-16 md:py-22"><div className="mx-auto max-w-6xl px-5 text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">A jornada do paciente</p><h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold md:text-4xl">Para crescer no digital, sua clínica precisa de estrutura.</h2><div className="mt-9 grid grid-cols-1 gap-2 sm:grid-cols-5">{steps.map((item, i) => <div key={item} className="flex items-center gap-3 border-l-4 border-primary bg-secondary px-4 py-4 text-left sm:flex-col sm:items-start sm:justify-between sm:border-l-0 sm:border-t-4 sm:py-5"><span className="text-xs font-bold text-muted-foreground">0{i + 1}</span><span className="text-sm font-bold sm:mt-5">{item}</span></div>)}</div><p className="mx-auto mt-8 max-w-2xl leading-relaxed text-muted-foreground">Muitas clínicas não têm dificuldade por falta de qualidade no atendimento, mas por falta de uma presença digital profissional e estratégica.</p></div></section>;
}

function VideoSection() {
  useEffect(() => {
    for (const [src, module] of [["https://fast.wistia.com/player.js", false], ["https://fast.wistia.com/embed/qfxqkdkt5n.js", true]] as const) {
      if (document.querySelector(`script[src="${src}"]`)) continue;
      const script = document.createElement("script"); script.src = src; script.async = true; if (module) script.type = "module"; document.head.appendChild(script);
    }
  }, []);
  return <section className="border-y border-border bg-secondary py-16 md:py-22"><div className="mx-auto max-w-5xl px-5 text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Conheça nossa abordagem</p><h2 className="mt-4 text-3xl font-bold md:text-4xl">Entenda como ajudamos clínicas a gerar mais oportunidades</h2><p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Assista ao vídeo e veja como estruturamos a presença digital da sua clínica para atrair mais pacientes, fortalecer sua imagem e facilitar agendamentos.</p><div className="mx-auto mt-9 w-full max-w-[280px] overflow-hidden border border-border bg-background shadow-lg"><div className="relative aspect-[9/16]">{createElement("wistia-player", { "media-id": "qfxqkdkt5n", aspect: "0.5625", style: { display: "block", width: "100%", height: "100%" } })}</div></div><p className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground"><Play className="h-3.5 w-3.5" /> Vídeo original da Prime</p></div></section>;
}

function Services() {
  const services = [
    { icon: Globe2, title: "Site profissional", desc: "Apresente sua clínica, serviços, equipe, avaliações e facilite o contato." },
    { icon: MapPin, title: "Posicionamento no Google", desc: "Fortaleça sua presença para pacientes que pesquisam pelos seus serviços." },
    { icon: Target, title: "Tráfego pago", desc: "Atraia mais pessoas interessadas na sua clínica." },
    { icon: MessageCircle, title: "Estratégia comercial", desc: "Melhore atendimento, abordagem, follow-up e conversão em agendamentos." },
  ];
  return <section className="py-16 md:py-22"><div className="mx-auto max-w-6xl px-5"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Nossa solução</p><h2 className="mt-4 text-3xl font-bold md:text-4xl">O que fazemos para ajudar sua clínica a crescer</h2></div><div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{services.map(({ icon: Icon, title, desc }, i) => <div key={title} className="border border-border bg-background p-6"><div className="mb-8 flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center bg-primary/25"><Icon className="h-5 w-5" /></span><span className="text-xs font-bold text-muted-foreground">0{i + 1}</span></div><h3 className="text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p></div>)}</div><p className="mt-7 max-w-3xl border-l-4 border-primary pl-5 text-base font-medium leading-relaxed">Não é só ter um site ou anunciar. É criar uma estrutura para atrair, gerar confiança e transformar interesse em agendamentos.</p></div></section>;
}

const testimonials = [
  { kind: "image" as const, src: dep1.url }, { kind: "image" as const, src: dep2.url }, { kind: "image" as const, src: dep3.url }, { kind: "image" as const, src: dep4.url }, { kind: "image" as const, src: dep5.url }, { kind: "image" as const, src: dep6.url }, { kind: "image" as const, src: dep7.url }, { kind: "image" as const, src: dep8.url }, { kind: "image" as const, src: dep9.url }, { kind: "image" as const, src: dep10.url }, { kind: "image" as const, src: dep11.url }, { kind: "image" as const, src: dep12.url }, { kind: "image" as const, src: dep13.url },
  { kind: "audio" as const, src: newestAudio.url }, { kind: "audio" as const, src: audio1.url }, { kind: "audio" as const, src: audio2.url },
  { kind: "text" as const, name: "Camila R.", role: "Mentora de vendas", quote: "Minha página ficou pronta em menos de um dia e já no primeiro post fechei 3 mentorias. Impecável." },
  { kind: "text" as const, name: "Diego M.", role: "Infoprodutor", quote: "O design ficou absurdo, muito mais profissional do que eu esperava. Recomendo demais." },
  { kind: "text" as const, name: "Larissa S.", role: "Loja de roupas", quote: "Rápido, atencioso e entregou exatamente o que combinamos. Página linda e vendendo." },
];

function Testimonials() {
  const [index, setIndex] = useState(0);
  const item = testimonials[index];
  const move = (by: number) => setIndex(i => (i + by + testimonials.length) % testimonials.length);
  return <section className="border-t border-border bg-secondary py-16 md:py-22"><div className="mx-auto max-w-5xl px-5"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Quem já trabalhou com a Prime</p><h2 className="mt-4 max-w-xl text-3xl font-bold md:text-4xl">Veja o que estão falando sobre nosso trabalho</h2></div><div className="flex gap-2"><Button variant="outline" size="icon" className="h-11 w-11 bg-background" aria-label="Depoimento anterior" onClick={() => move(-1)}><ChevronLeft /></Button><Button variant="outline" size="icon" className="h-11 w-11 bg-background" aria-label="Próximo depoimento" onClick={() => move(1)}><ChevronRight /></Button></div></div>
      <div className="mt-8 flex min-h-[350px] items-center justify-center border border-border bg-background px-4 py-6 sm:min-h-[430px] sm:px-10" aria-live="polite" key={index}>
        {item.kind === "image" ? <div className="w-full text-center"><img src={item.src} alt={`Depoimento original de cliente ${index + 1}`} loading="lazy" className="mx-auto max-h-[520px] w-auto max-w-full object-contain" /><p className="mt-4 text-xs text-muted-foreground">Depoimento original de cliente · {index + 1} / 13</p></div> : item.kind === "audio" ? <div className="w-full max-w-md text-center"><span className="mx-auto flex h-14 w-14 items-center justify-center bg-primary/25"><MessageCircle className="h-6 w-6" /></span><h3 className="mt-6 text-xl font-bold">Depoimento em áudio {index - 12}</h3><p className="mt-2 text-sm text-muted-foreground">Ouça a experiência de quem já trabalhou conosco.</p><audio controls className="mt-7 w-full" src={item.src}>Seu navegador não suporta áudio.</audio></div> : <blockquote className="max-w-xl text-center"><span className="text-5xl font-bold text-primary">“</span><p className="mt-2 text-xl font-medium leading-relaxed sm:text-2xl">{item.quote}</p><footer className="mt-7 text-sm font-bold">{item.name} <span className="font-normal text-muted-foreground">· {item.role}</span></footer></blockquote>}
      </div><div className="mt-5 flex items-center justify-between gap-4"><span className="text-xs font-semibold text-muted-foreground">{String(index + 1).padStart(2, "0")} / {testimonials.length}</span><div className="flex flex-wrap justify-end gap-1.5">{testimonials.map((_, i) => <Button key={i} variant="ghost" size="icon" aria-label={`Mostrar depoimento ${i + 1}`} aria-current={index === i ? "true" : undefined} onClick={() => setIndex(i)} className="h-6 w-3 p-0 hover:bg-transparent"><span className={`h-1.5 w-1.5 rounded-full ${i === index ? "bg-foreground" : "bg-border"}`} /></Button>)}</div></div><p className="mt-4 text-xs text-muted-foreground">Depoimentos de clientes de diferentes segmentos. Os resultados variam conforme cada projeto.</p>
    </div></section>;
}
