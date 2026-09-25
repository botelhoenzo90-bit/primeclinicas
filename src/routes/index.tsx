import { createFileRoute } from "@tanstack/react-router";
import { createElement, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, AudioLines, Check, ChevronLeft, ChevronRight, ClipboardList, Globe2, MapPin, MessageCircle, Play, Target } from "lucide-react";
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
  const intro = "Olá! Fiz o diagnóstico e quero entender o que podemos melhorar na minha clínica.";
  const details = answers?.length === 3 ? `\n\nMinhas respostas:\nDesafio: ${answers[0]}\nO que acontece hoje: ${answers[1]}\nEstrutura atual: ${answers[2]}` : "";
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(intro + details)}`;
};
const questions = [
  { title: "Onde sua clínica está perdendo mais oportunidades hoje?", options: ["A agenda tem horários vagos", "Poucos pacientes novos chegam até nós", "Recebemos contatos, mas poucos agendam", "Dependemos demais de indicações"] },
  { title: "Quando alguém procura sua clínica no digital, o que acontece?", options: ["Quase não nos encontram no Google", "Encontram, mas não percebem nossos diferenciais", "Chamam no WhatsApp, mas a conversa não avança", "Não sei como está essa jornada"] },
  { title: "Sua presença digital hoje ajuda a transformar interesse em agendamentos?", options: ["Ainda não temos uma estrutura profissional", "Temos site e redes, mas estão desatualizados", "Investimos em anúncios sem clareza do retorno", "Já temos estrutura, mas queremos melhorar"] },
];
const solutions: Record<string, { title: string; text: string; actions: string[] }> = {
  "A agenda tem horários vagos": { title: "Sua agenda precisa de demanda mais previsível.", text: "Horários vagos podem indicar uma falha entre ser encontrado, gerar confiança e facilitar o agendamento.", actions: ["Presença forte no Google", "Campanhas para pacientes da sua região", "Caminho simples até o agendamento"] },
  "Poucos pacientes novos chegam até nós": { title: "Sua clínica precisa aparecer para as pessoas certas.", text: "Quando o paciente pesquisa uma solução, sua clínica precisa estar presente e mostrar por que merece a escolha.", actions: ["Visibilidade nas buscas", "Posicionamento da clínica", "Tráfego com intenção"] },
  "Recebemos contatos, mas poucos agendam": { title: "Oportunidades estão parando antes do agendamento.", text: "Não basta gerar mensagens: a experiência, a abordagem e o acompanhamento precisam conduzir o próximo passo.", actions: ["Contato mais fácil", "Atendimento mais claro", "Acompanhamento comercial"] },
  "Dependemos demais de indicações": { title: "Indicação é valiosa. Dependência dela limita o crescimento.", text: "Uma presença digital estruturada pode criar novos caminhos para o paciente conhecer e escolher sua clínica.", actions: ["Autoridade digital", "Site que transmite confiança", "Aquisição de novos pacientes"] },
};
const images = [dep1, dep2, dep3, dep4, dep5, dep6, dep7, dep8, dep9, dep10, dep11, dep12, dep13].map(item => item.url);
const audios = [newestAudio.url, audio1.url, audio2.url];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Diagnóstico de crescimento para clínicas | Prime" },
    { name: "description", content: "Descubra onde sua clínica perde oportunidades e conheça uma estratégia para atrair pacientes e gerar mais agendamentos." },
    { property: "og:title", content: "Onde sua clínica está perdendo pacientes? | Prime" },
    { property: "og:description", content: "Responda a três perguntas e veja caminhos para fortalecer a presença digital e os agendamentos da sua clínica." },
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
  return <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
    <header className="border-b border-border bg-background">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 md:h-20 md:grid-cols-[1fr_auto_1fr] md:px-10">
        <a href="#inicio" aria-label="Prime, voltar ao início" className="min-w-0"><img src={logoPrime.url} alt="Prime" className="h-9 w-auto object-contain md:h-11" /></a>
        <span className="hidden text-xs font-bold uppercase text-muted-foreground md:block">Estratégia digital para clínicas</span>
        <Button asChild variant="outline" className="h-9 shrink-0 border-foreground px-3 text-[11px] font-bold uppercase hover:bg-secondary md:h-10 md:justify-self-end md:px-5"><a href={waLink()} target="_blank" rel="noopener noreferrer">Falar com a Prime <ArrowRight className="hidden sm:block" /></a></Button>
      </div>
    </header>
    <Diagnosis answers={answers} setAnswers={setAnswers} />
    <Testimonials />
    <VideoSection />
    <Strategy />
    <section id="contato" className="border-t border-border bg-primary py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-5 text-center">
        <p className="text-xs font-bold uppercase tracking-widest">O próximo passo</p>
        <h2 className="mt-4 font-display text-3xl uppercase leading-tight md:text-5xl">Sua clínica pode crescer com mais clareza.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed md:text-lg">Vamos olhar para sua realidade e conversar sobre as oportunidades que fazem sentido para o seu momento.</p>
        <div className="mt-8"><WhatsButton answers={answers} className="w-full sm:w-auto sm:px-12">Quero conversar sobre minha clínica</WhatsButton></div>
        <p className="mt-6 text-xs font-semibold uppercase">Site · Google · Tráfego · Posicionamento · Comercial</p>
      </div>
    </section>
    <footer className="border-t border-border bg-background px-5 py-7 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Prime Página de Vendas</footer>
  </main>;
}

function Diagnosis({ answers, setAnswers }: { answers: string[]; setAnswers: (answers: string[]) => void }) {
  const [step, setStep] = useState(-1);
  useEffect(() => {
    if (step !== 3) return;
    const timer = window.setTimeout(() => setStep(4), 1400);
    return () => window.clearTimeout(timer);
  }, [step]);
  const choose = (option: string) => { setAnswers([...answers.slice(0, step), option]); setStep(step + 1); };
  const result = solutions[answers[0]];
  return <section id="inicio" className="relative flex min-h-[calc(100svh-6rem)] flex-col border-b border-border bg-background md:min-h-[min(780px,calc(100svh-7rem))]">
    <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 pt-5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground md:px-10 md:pt-8">
      <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-primary" /> Diagnóstico de crescimento</span>
      <span>{step < 0 ? "01 / 04" : step < 3 ? `0${step + 2} / 04` : "04 / 04"}</span>
    </div>
    <div className="mx-auto mt-5 h-1 w-[calc(100%-2.5rem)] max-w-[calc(80rem-5rem)] bg-muted md:mt-7" role="progressbar" aria-label="Progresso do diagnóstico" aria-valuenow={step < 0 ? 0 : step >= 3 ? 4 : step + 1} aria-valuemin={0} aria-valuemax={4}>
      <div className={`h-full bg-primary transition-all duration-500 ${step < 0 ? "w-1/12" : step === 0 ? "w-1/4" : step === 1 ? "w-1/2" : step === 2 ? "w-3/4" : "w-full"}`} />
    </div>
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-8 text-center md:py-14" aria-live="polite">
      {step === -1 ? <div className="animate-rise">
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-primary/25 md:mb-8 md:h-16 md:w-16"><ClipboardList className="h-7 w-7" /></span>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Para médicos e donos de clínicas</p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-[clamp(2rem,5vw,4.5rem)] uppercase leading-[1.08]">Sua clínica atende bem. <span className="decoration-primary underline decoration-[0.16em] underline-offset-[0.12em]">Mas quantos pacientes estão escolhendo outra?</span></h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:mt-5 md:text-lg">Descubra onde oportunidades escapam entre a busca do paciente e o agendamento. Três perguntas. Uma direção mais clara.</p>
        <Button onClick={() => setStep(0)} className="mt-6 h-16 w-full max-w-sm rounded-md px-6 text-base font-bold uppercase shadow-md transition-transform hover:scale-[1.02] md:mt-9">Começar diagnóstico <ArrowRight className="ml-2" /></Button>
        <p className="mt-3 text-xs font-medium text-muted-foreground md:mt-5">Gratuito · 3 perguntas · Sem cadastro</p>
      </div> : step < 3 ? <div key={step} className="animate-rise">
        <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-primary/25 font-display text-lg">0{step + 1}</span>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pergunta {step + 1} de 3</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-2xl uppercase leading-tight md:text-4xl">{questions[step].title}</h2>
        <div className="mx-auto mt-7 grid max-w-xl gap-2.5 text-left">{questions[step].options.map((option, i) => <Button key={option} variant="outline" onClick={() => choose(option)} className="group h-auto min-h-16 w-full justify-between whitespace-normal rounded-md border-border bg-background px-4 py-3 text-left text-sm font-semibold text-foreground hover:border-foreground hover:bg-primary/15 md:text-base"><span className="flex min-w-0 items-center gap-3"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-secondary text-xs group-hover:bg-primary">{String.fromCharCode(65 + i)}</span><span className="min-w-0">{option}</span></span><ArrowRight className="ml-2 shrink-0" /></Button>)}</div>
        <div className="mt-5 h-9">{step > 0 && <Button variant="ghost" onClick={() => setStep(step - 1)} className="text-muted-foreground"><ArrowLeft /> Voltar</Button>}</div>
      </div> : step === 3 ? <div className="animate-rise"><span className="mx-auto block h-14 w-14 animate-spin rounded-full border-4 border-muted border-t-primary" /><h2 className="mt-7 font-display text-2xl uppercase md:text-4xl">Analisando suas respostas...</h2><p className="mt-3 text-muted-foreground">Identificando o primeiro ponto de atenção da sua clínica.</p></div> : <div className="animate-rise">
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-md bg-primary/25"><Check className="h-7 w-7" /></span>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Seu diagnóstico inicial</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-2xl uppercase leading-tight md:text-4xl">{result?.title ?? "Sua clínica tem oportunidades para avançar."}</h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">{result?.text}</p>
        <div className="mx-auto mt-7 max-w-xl border-t border-border text-left"><p className="mt-5 text-xs font-bold uppercase tracking-widest">Onde podemos atuar</p><div className="mt-3 grid gap-2 sm:grid-cols-3">{result?.actions.map(action => <div key={action} className="flex items-start gap-2 text-sm font-semibold"><Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />{action}</div>)}</div></div>
        <div className="mt-8"><WhatsButton answers={answers} className="w-full max-w-sm">Conversar sobre meu diagnóstico</WhatsButton></div>
        <Button variant="ghost" onClick={() => { setAnswers([]); setStep(-1); }} className="mt-3 text-muted-foreground">Refazer diagnóstico</Button>
      </div>}
    </div>
    <div className="border-t border-border bg-secondary/50 px-5 py-4 text-center text-xs font-semibold text-muted-foreground">PRESENÇA DIGITAL <span className="mx-2 text-primary">✦</span> CONFIANÇA <span className="mx-2 text-primary">✦</span> AGENDAMENTOS</div>
  </section>;
}

function Testimonials() {
  const [index, setIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const move = (by: number) => setIndex(i => (i + by + images.length) % images.length);
  return <section className="bg-secondary py-16 md:py-24" aria-label="Depoimentos">
    <div className="mx-auto max-w-6xl px-5">
      <div className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">A voz de quem já trabalhou com a Prime</p><h2 className="mt-4 font-display text-3xl uppercase leading-tight md:text-4xl">Confiança se constrói com trabalho real.</h2></div>
      <div className="mx-auto mt-9 max-w-3xl">
        <div className="relative flex h-[400px] items-center justify-center overflow-hidden border border-border bg-background px-5 py-4 sm:h-[510px]" onTouchStart={e => setTouchStart(e.touches[0]?.clientX ?? null)} onTouchEnd={e => { const end = e.changedTouches[0]?.clientX; if (touchStart !== null && end !== undefined && Math.abs(end - touchStart) > 50) move(end < touchStart ? 1 : -1); setTouchStart(null); }}>
          <img key={index} src={images[index]} alt={`Depoimento em imagem ${index + 1} de ${images.length}`} loading="lazy" className="h-full max-w-full animate-rise object-contain" />
          <Button variant="outline" size="icon" onClick={() => move(-1)} aria-label="Depoimento anterior" className="absolute left-2 top-1/2 h-10 w-10 -translate-y-1/2 bg-background/95 sm:left-5"><ChevronLeft /></Button>
          <Button variant="outline" size="icon" onClick={() => move(1)} aria-label="Próximo depoimento" className="absolute right-2 top-1/2 h-10 w-10 -translate-y-1/2 bg-background/95 sm:right-5"><ChevronRight /></Button>
        </div>
        <div className="mt-5 flex items-center justify-center gap-4"><span className="text-xs font-bold text-muted-foreground">{String(index + 1).padStart(2, "0")} / {images.length}</span><div className="flex flex-wrap justify-center gap-1">{images.map((_, i) => <Button key={i} variant="ghost" size="icon" aria-label={`Mostrar depoimento ${i + 1}`} aria-current={i === index ? "true" : undefined} onClick={() => setIndex(i)} className="h-7 w-5 p-0 hover:bg-transparent"><span className={`h-1.5 w-1.5 rounded-full ${i === index ? "bg-foreground" : "bg-border"}`} /></Button>)}</div></div>
      </div>
      <div className="mt-14 border-t border-border pt-9"><div className="flex items-center gap-3"><AudioLines className="h-6 w-6" /><h3 className="font-display text-xl uppercase md:text-2xl">Ouça também</h3></div><div className="mt-6 grid gap-3 md:grid-cols-3">{audios.map((src, i) => <div key={src} className="border border-border bg-background p-5"><p className="mb-4 text-sm font-bold">Depoimento em áudio 0{i + 1}</p><audio controls preload="none" src={src} aria-label={`Depoimento em áudio ${i + 1}`} className="h-10 w-full">Seu navegador não suporta áudio.</audio></div>)}</div></div>
      <p className="mt-5 text-xs text-muted-foreground">Depoimentos originais de clientes de diferentes segmentos. Os resultados variam conforme cada projeto.</p>
    </div>
  </section>;
}

function VideoSection() {
  useEffect(() => {
    for (const [src, module] of [["https://fast.wistia.com/player.js", false], ["https://fast.wistia.com/embed/qfxqkdkt5n.js", true]] as const) {
      if (document.querySelector(`script[src="${src}"]`)) continue;
      const script = document.createElement("script"); script.src = src; script.async = true; if (module) script.type = "module"; document.head.appendChild(script);
    }
  }, []);
  return <section className="border-y border-border bg-background py-16 md:py-24"><div className="mx-auto max-w-5xl px-5 text-center"><p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">A estratégia por trás do crescimento</p><h2 className="mx-auto mt-4 max-w-3xl font-display text-3xl uppercase leading-tight md:text-4xl">Entenda como ajudamos clínicas a gerar mais oportunidades.</h2><p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Assista e veja por que atrair pacientes exige mais do que simplesmente publicar ou anunciar.</p><div className="mx-auto mt-9 w-full max-w-[280px] overflow-hidden border border-border bg-secondary shadow-lg"><div className="relative aspect-[9/16]">{createElement("wistia-player", { "media-id": "qfxqkdkt5n", aspect: "0.5625", style: { display: "block", width: "100%", height: "100%" } })}</div></div><p className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground"><Play className="h-3.5 w-3.5" /> Vídeo original da Prime</p></div></section>;
}

function Strategy() {
  const pillars = [
    { icon: Globe2, title: "Uma presença que passa confiança", text: "Um site profissional apresenta equipe, serviços e diferenciais com clareza antes mesmo do primeiro contato." },
    { icon: MapPin, title: "Ser encontrado por quem procura", text: "Google e posicionamento ajudam sua clínica a aparecer quando há intenção de buscar atendimento." },
    { icon: Target, title: "Atrair com direção", text: "Tráfego pago pensado para alcançar as pessoas certas, sem depender apenas de indicações." },
    { icon: MessageCircle, title: "Transformar contato em agenda", text: "Uma jornada de atendimento e acompanhamento que reduz a distância entre interesse e agendamento." },
  ];
  return <section className="bg-background py-16 md:py-24"><div className="mx-auto max-w-6xl px-5"><div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]"><div><p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Não é uma ação isolada</p><h2 className="mt-4 font-display text-3xl uppercase leading-tight md:text-4xl">O paciente precisa encontrar, confiar e conseguir agendar.</h2><p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">Crescimento consistente pede uma estrutura conectada: presença digital, atração e uma experiência de contato que não desperdice oportunidades.</p></div><img src={clinicImage} alt="Recepção de clínica moderna" loading="lazy" className="aspect-[16/10] w-full object-cover" /></div><div className="mt-12 grid gap-0 border-t border-border sm:grid-cols-2 lg:grid-cols-4">{pillars.map(({ icon: Icon, title, text }, i) => <div key={title} className="border-b border-border py-7 sm:px-5 lg:border-r lg:last:border-r-0"><div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-sm bg-primary/30"><Icon className="h-5 w-5" /></span><span className="text-xs font-bold text-muted-foreground">0{i + 1}</span></div><h3 className="mt-7 font-display text-base uppercase leading-snug">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p></div>)}</div></div></section>;
}
