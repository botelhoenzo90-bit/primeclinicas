import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import whatsappLogo from "@/assets/whatsapp-logo.png.asset.json";
import heroMockup from "@/assets/hero-mockup-v2.png.asset.json";
import logoPrime from "@/assets/logo-prime-v2.png.asset.json";

import {
  Rocket,
  Zap,
  Timer,
  Sparkles,
  ShoppingBag,
  GraduationCap,
  Link2,
  BookOpen,
  Check,
  ArrowRight,
  MessageCircle,
  Star,
  Palette,
  Smartphone,
  Search,
  Gauge,
  ChevronDown,
  Code2,
  Eye,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP = "5542999787035";
const WA_MSG = encodeURIComponent(
  "Olá! Fiquei interessado nas páginas de vendas."
);
const waLink = (extra = "") =>
  `https://wa.me/${WHATSAPP}?text=${extra ? encodeURIComponent(extra) : WA_MSG}`;

function Index() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-foreground">
      <BackgroundFX />
      {/* Nav removido conforme solicitado */}
      <Introduction />
      <VslSection />
      <Testimonials />
      <Portfolio />
      <Hero />
      <Stats />
      <ForWho />
      <Services />
      <FAQ />
      <FinalCTA />

      <Footer />
      <FloatingWhats />
    </div>
  );
}

/* ----------------------------- Introduction ------------------------------ */
function Introduction() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const words = ["mais agendamentos", "mais vendas", "mais autoridade", "seu negócio escalando"];
  const speed = isDeleting ? 40 : 80;

  useEffect(() => {
    const timer = setTimeout(() => {
      const currentWord = words[wordIndex];
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, speed]);

  return (
    <section className="relative pt-8 pb-12 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--neon)]/30 blur-[120px] animate-pulse" />
      </div>
      <div className="mx-auto max-w-6xl px-4 text-center animate-rise">
        <div className="flex justify-center mb-8">
          <img 
            src={logoPrime.url} 
            alt="Logo Prime" 
            className="h-16 w-auto md:h-24 drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
          />
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--neon)]/20 bg-[color:var(--neon)]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[color:var(--neon)] mb-8">
          <Sparkles className="h-3.5 w-3.5" /> Sites Profissionais<br className="md:hidden" /> que Elevam sua Empresa
        </div>
        <h2 className="font-display text-4xl font-black leading-[1.2] tracking-tight md:text-7xl lg:text-8xl md:leading-[1.1]">
          Design e estratégia <br />
          que cria <span className="text-gradient min-w-[280px] md:min-w-[350px] inline-block">{text}<span className="animate-pulse text-foreground">|</span></span>
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-muted-foreground md:text-2xl leading-relaxed">
          Confira abaixo os depoimentos de nossos parceiros e o portfólio completo com projetos otimizados para escala.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#depoimentos"
            className="group inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-8 py-4 text-base font-bold hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
          >
            <Star className="h-5 w-5 text-[color:var(--lime)] group-hover:rotate-12 transition-transform" /> 
            Ver Depoimentos
          </a>
          <a
            href="#portfolio"
            className="shine-hover inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--neon)] to-[color:var(--magenta)] px-8 py-4 text-base font-bold text-background shadow-[0_0_30px_-5px_var(--neon)] hover:scale-105 active:scale-95 transition-all"
          >
            <Eye className="h-5 w-5" /> 
            Portfólio Completo
          </a>
        </div>
        <p className="mt-6 text-xs text-muted-foreground/60 font-medium italic">
          *Aviso: Ainda estamos adicionando todos os depoimentos e sites. O portfólio ainda não está completo.
        </p>
      </div>
    </section>
  );
}

/* ----------------------------- Background FX ----------------------------- */
function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-[color:var(--neon)]/10 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 h-[600px] w-[600px] rounded-full bg-[color:var(--magenta)]/10 blur-[120px]" />
    </div>
  );
}

/* ---------------------------------- Nav ---------------------------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-background/60 border-b border-white/5" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[color:var(--neon)] to-[color:var(--magenta)] text-background shadow-[0_0_24px_-4px_var(--neon)]">
            <Code2 className="h-5 w-5" />
          </span>
          <span>
            dev<span className="text-gradient">.pages</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#servicos" className="hover:text-foreground transition">Serviços</a>
          <a href="#processo" className="hover:text-foreground transition">Processo</a>
          <a href="#portfolio" className="hover:text-foreground transition">Portfólio</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="shine-hover inline-flex items-center gap-2 rounded-full bg-[#16c60c] px-4 py-2 text-sm font-semibold text-background neon-glow"
        >
          <img src={whatsappLogo.url} alt="" className="h-5 w-5" /> Orçamento
        </a>
      </div>
    </header>
  );
}

/* --------------------------------- Hero ---------------------------------- */
function Hero() {
  return (
    <section id="top" className="relative pt-6 pb-12 md:pb-20">
      {/* Banner de promoção removido */}

      <div className="mx-auto max-w-6xl px-4 pt-6 md:pt-8">
        <div className="mx-auto max-w-3xl text-center animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--lime)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--lime)]" />
            </span>
            Disponível para novos projetos — entrega no mesmo dia
          </span>
          <h1 className="mt-8 font-display text-4xl font-black leading-[1.05] md:text-7xl tracking-tighter normal-case">
            Páginas que <span className="text-gradient">vendem</span> enquanto você <span className="text-gradient">dorme</span>.
          </h1>
          <div className="mx-auto mt-10 max-w-lg md:max-w-3xl relative">
            <div className="absolute -inset-10 -z-10 bg-[color:var(--neon)]/10 blur-[100px] rounded-full" />
            <img
              src={heroMockup.url}
              alt="Exemplos de páginas de vendas profissionais"
              className="mx-auto w-full rounded-3xl shadow-2xl animate-float"
              loading="eager"
            />
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-xl text-muted-foreground md:text-2xl font-medium leading-relaxed">
            Design de alto nível, performance extrema e copy estratégica.
            Especialista em <span className="text-foreground font-bold">Lançamentos</span>, <span className="text-foreground font-bold">Infoprodutos</span> e <span className="text-foreground font-bold">Negócios Locais</span>.
          </p>


          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="shine-hover group inline-flex items-center gap-2 rounded-full bg-[#16c60c] px-7 py-3.5 text-base font-semibold text-background neon-glow transition-transform hover:scale-[1.03]"
            >
              <img src={whatsappLogo.url} alt="" className="h-6 w-6" />
              Quero meu orçamento agora
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-base font-medium text-foreground transition hover:bg-white/10"
            >
              <Eye className="h-5 w-5" /> Ver portfólio
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-[color:var(--lime)]" /> Entrega em 24h</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-[color:var(--lime)]" /> 100% responsiva</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-[color:var(--lime)]" /> Otimizada pra Google</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-4 w-4 text-[color:var(--lime)]" /> Sem custo de hospedagem</span>
          </div>
        </div>

      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <div className="mx-auto mt-16 max-w-4xl animate-rise" style={{ animationDelay: "0.15s" }}>
      <div className="relative">
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[color:var(--neon)]/40 via-[color:var(--magenta)]/40 to-[color:var(--neon)]/40 blur-2xl opacity-60" />
        <div className="relative glass rounded-3xl p-3 neon-glow">
          <div className="flex items-center gap-1.5 px-3 pb-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">seusite.dev.pages</span>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br from-[color:var(--card)] to-[color:var(--background)] p-6">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] uppercase tracking-widest text-[color:var(--neon)]">
                  <Sparkles className="h-3 w-3" /> Novo lançamento
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold md:text-4xl">
                  Seu produto <span className="text-gradient">vendendo 24/7</span>
                </h3>
                <p className="mt-2 max-w-md text-xs text-muted-foreground md:text-sm">
                  Uma página feita pra levar o visitante direto ao botão de compra.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="rounded-full bg-[#16c60c] px-4 py-2 text-xs font-semibold text-background">
                  Comprar agora
                </div>
                <div className="rounded-full border border-white/15 px-4 py-2 text-xs">Saiba mais</div>
                <div className="ml-auto hidden gap-2 md:flex">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-14 w-20 rounded-lg border border-white/10 bg-white/[0.03]" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Logo Marquee ------------------------------ */
function LogoMarquee() {
  const items = [
    "INFOPRODUTORES",
    "LOJAS ONLINE",
    "MENTORIAS",
    "LINK NA BIO",
    "AGÊNCIAS",
    "COACHES",
    "RESTAURANTES",
    "CLÍNICAS",
  ];
  return (
    <section className="relative border-y border-white/5 bg-white/[0.02] py-6">
      <div className="scrollbar-none overflow-hidden">
        <div className="animate-marquee-reverse flex w-max gap-14 whitespace-nowrap px-6 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {[...items, ...items].map((t, i) => (
            <span key={i} className="flex items-center gap-14">
              {t} <span className="text-[color:var(--neon)]">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Stats --------------------------------- */
function SectionBadge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-[color:oklch(0.15_0.01_90)]/10 bg-[color:var(--neon)]/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[color:oklch(0.25_0.08_90)] ${className}`}>
      {children}
    </span>
  );
}

function Stats() {
  const items = [
    {
      icon: Rocket,
      title: "Mais conversão, menos clique perdido",
      desc: "Cada seção é planejada pra guiar o visitante até o botão de compra. Nada de página bonita que não vende — aqui é estrutura pensada pra converter.",
      badge: "+3.4x vendas",
    },
    {
      icon: Star,
      title: "Autoridade e credibilidade na hora",
      desc: "Design profissional passa confiança em segundos. Seu cliente sente que está comprando de quem entende — e não hesita na hora de fechar.",
      badge: "Confiança imediata",
    },
    {
      icon: BookOpen,
      title: "Explica seu produto e quebra objeções",
      desc: "Copy estratégica que apresenta seu serviço, mostra benefícios, responde as dúvidas mais comuns e derruba as desculpas antes do cliente pensar nelas.",
      badge: "Vende sozinha",
    },
    {
      icon: Link2,
      title: "Link na bio profissional e personalizado",
      desc: "Chega de Linktree igual ao dos outros. Uma página única com a cara do seu negócio, que agrupa seus links, produtos e contatos de forma memorável.",
      badge: "Cara de marca",
    },
    {
      icon: Gauge,
      title: "Mais conversão nos anúncios Meta e Google Ads",
      desc: "Página rápida, com pixel, tags e estrutura otimizada pra tráfego pago. Você paga menos por clique, gera mais lead e escala seu ROI de verdade.",
      badge: "ROI maior",
    },
    {
      icon: Smartphone,
      title: "Perfeita no celular e no Google",
      desc: "100% responsiva, carregamento rápido e SEO otimizado. Seus clientes acham você no Google e navegam com fluidez em qualquer aparelho.",
      badge: "Mobile-first",
    },
  ];
  return (
    <section className="section-light relative overflow-hidden py-12 md:py-16">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-[oklch(0.98_0.03_95)] via-white to-white" />
      <div aria-hidden className="absolute -top-32 -right-20 -z-10 h-[380px] w-[380px] rounded-full bg-[color:var(--neon)]/25 blur-3xl" />
      <div aria-hidden className="absolute -bottom-32 -left-20 -z-10 h-[380px] w-[380px] rounded-full bg-[color:var(--magenta)]/20 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <SectionBadge>
            <Sparkles className="h-3.5 w-3.5" /> Benefícios de uma página profissional
          </SectionBadge>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
            Sua página trabalha por você <span className="text-gradient">24 horas por dia</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[color:oklch(0.42_0.02_90)] md:text-xl leading-relaxed">
            Não é apenas sobre estética. É sobre criar uma <span className="text-black font-bold">máquina de vendas</span> que converte cliques em lucro real para o seu negócio.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map(({ icon: Icon, title, desc, badge }, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl border border-[color:oklch(0.15_0.01_90)]/8 bg-white p-8 text-center shadow-[0_10px_30px_-10px_oklch(0_0_0/0.1)] transition-all hover:-translate-y-2 hover:border-[color:var(--neon)]/70 hover:shadow-[0_20px_50px_-15px_oklch(0.88_0.19_96/0.4)] md:p-10"
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[color:var(--neon)] via-[color:var(--magenta)] to-[color:var(--neon)]" />
              <div className="grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-[color:var(--neon)] to-[color:var(--magenta)] text-black shadow-xl shadow-[color:var(--neon)]/30 group-hover:scale-110 transition-transform duration-500">
                <Icon className="h-10 w-10" strokeWidth={2.5} />
              </div>
              <div className="w-full">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <h3 className="font-display text-xl font-black text-[color:oklch(0.15_0.01_90)] md:text-2xl tracking-tight">{title}</h3>
                  <span className="rounded-full bg-[color:var(--neon)]/15 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-[color:oklch(0.25_0.08_90)] border border-[color:var(--neon)]/20">
                    {badge}
                  </span>
                </div>
                <p className="mx-auto mt-4 max-w-xl text-base text-[color:oklch(0.42_0.02_90)] font-medium leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <WhatsCTA />
      </div>
    </section>
  );
}

/* --------------------------------- ForWho -------------------------------- */
function ForWho() {
  const items = [
    {
      icon: ShoppingBag,
      title: "Lojas & Empresas",
      desc: "Página institucional ou de produto que gera autoridade, mostra seus diferenciais e transforma visitante em cliente.",
      tags: ["Institucional", "Serviços", "Vendas"],
    },
    {
      icon: BookOpen,
      title: "Infoprodutos & Mentorias",
      desc: "Lançamentos, capturas e páginas de venda com copy que aquece o lead e leva direto pro checkout.",
      tags: ["Lançamento", "Páginas", "Checkout"],
    },
    {
      icon: Link2,
      title: "Link na Bio Personalizado",
      desc: "Adeus Linktree genérico. Uma página única com a cara do seu negócio, agrupando redes, produtos e contatos.",
      tags: ["Instagram", "TikTok", "Marca"],
    },
    {
      icon: Smartphone,
      title: "Negócios Locais & Clínicas",
      desc: "Restaurantes, salões, clínicas, estética, prestadores de serviço — presença digital que faz o telefone tocar.",
      tags: ["Local", "Agendamento", "WhatsApp"],
    },
    {
      icon: GraduationCap,
      title: "Cursos, Quizzes & Ofertas",
      desc: "Estruturas estratégicas que educam, qualificam e conduzem o cliente até a decisão de compra.",
      tags: ["Curso", "Quiz", "Funil"],
    },
    {
      icon: Sparkles,
      title: "E muito mais...",
      desc: "Portfólio, evento, convite digital, currículo, landing de captação — se cabe numa página, eu crio pra você.",
      tags: ["Sob medida", "Criativo"],
    },
  ];
  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-[color:var(--magenta)]/5 to-background" />
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          eyebrow="O que eu crio"
          title="Trabalhos que eu faço pra você"
          desc="De loja física a lançamento digital — cada nicho ganha uma estrutura pensada pra vender no seu jeito."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, desc, tags }, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 transition hover:-translate-y-1 hover:border-[color:var(--neon)]/60 hover:shadow-[0_20px_50px_-20px_oklch(0.88_0.19_96/0.4)]"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[color:var(--neon)]/10 blur-2xl transition group-hover:bg-[color:var(--magenta)]/25" />
              <div className="relative flex flex-col items-center text-center">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[color:var(--neon)] to-[color:var(--magenta)] text-black shadow-lg shadow-[color:var(--neon)]/20">
                  <Icon className="h-7 w-7" strokeWidth={2.2} />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {tags.map((t) => (
                    <span key={t} className="rounded-full border border-[color:var(--neon)]/30 bg-[color:var(--neon)]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[color:var(--neon)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <WhatsCTA />
      </div>
    </section>
  );
}


/* -------------------------------- Services ------------------------------- */
function Services() {
  const items = [
    { icon: Palette, title: "Design exclusivo", desc: "Nada de template. Cada página é desenhada pra sua marca." },
    { icon: Smartphone, title: "100% responsiva", desc: "Perfeita em celular, tablet e desktop, sem ajustes manuais." },
    { icon: Zap, title: "Animações premium", desc: "Transições, hover e efeitos que prendem o visitante." },
    { icon: Gauge, title: "Ultra-rápida", desc: "Carrega em segundos — Google e cliente amam." },
    { icon: Search, title: "SEO otimizado", desc: "Meta tags, títulos e estrutura semântica prontos pro Google." },
    { icon: MessageCircle, title: "Integração WhatsApp", desc: "Botões estratégicos que levam direto pra conversa." },
    { icon: Rocket, title: "Entrega em 24h", desc: "Do briefing ao ar no mesmo dia, sem enrolação." },
    { icon: Sparkles, title: "Copywriting incluso", desc: "Textos persuasivos que conduzem o visitante à compra." },
  ];
  const loop = [...items, ...items];
  return (
    <section id="servicos" className="section-light py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          eyebrow="O que está incluso"
          title="Tudo o que sua página precisa pra vender"
          desc="Um pacote completo, sem cobranças escondidas. Você recebe pronto e no ar."
        />
      </div>
      <div className="relative mt-8 overflow-hidden">

        <div className="animate-marquee flex w-max gap-5 px-4">
          {loop.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="glass w-[280px] shrink-0 rounded-2xl p-6 text-center transition hover:-translate-y-1 hover:neon-glow sm:w-[300px]"
            >
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[color:var(--neon)] to-[color:var(--magenta)] text-background">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4">
        <WhatsCTA />
      </div>
    </section>
  );
}


/* -------------------------------- Process -------------------------------- */
function Process() {
  const steps = [
    { icon: MessageCircle, title: "Briefing rápido", desc: "Conversamos no WhatsApp. Você me conta seu produto, objetivo e referências." },
    { icon: Palette, title: "Design & Copy", desc: "Eu monto a estrutura, escolho a estética e escrevo a copy que vende." },
    { icon: Code2, title: "Desenvolvimento", desc: "Codifico tudo com animações, responsividade e otimizações." },
    { icon: Rocket, title: "Entrega Expressa", desc: "Seu projeto no ar em tempo recorde, sem abrir mão da qualidade." },
  ];
  return (
    <section id="processo" className="relative py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          eyebrow="Como funciona"
          title="Do briefing ao ar em 24 horas"
          desc="Processo enxuto, direto ao ponto, sem burocracia."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <div className="absolute -top-4 left-6 rounded-full bg-[#16c60c] px-3 py-1 font-mono text-xs font-bold text-background">
                0{i + 1}
              </div>
              <div className="mt-4 grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-[color:var(--neon)]">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Portfolio ------------------------------- */
import portMestre from "@/assets/portfolio-mestre-manutencao.png.asset.json";
import portReceitas from "@/assets/portfolio-receitas-airfryer.png.asset.json";
import portVivace from "@/assets/portfolio-vivace.png.asset.json";
import portVelmo from "@/assets/portfolio-velmo.png.asset.json";
import portTreinamento from "@/assets/portfolio-treinamento-start.png.asset.json";
import portAndreCell from "@/assets/portfolio-andre-cell.png.asset.json";
import portViolao from "@/assets/portfolio-violao-catolico.png.asset.json";
import portSol from "@/assets/portfolio-sol-massoterapia.png.asset.json";
import portPascoa from "@/assets/portfolio-pascoa.png.asset.json";
import portCalistenia from "@/assets/portfolio-calistenia.png.asset.json";
import portArtesanato from "@/assets/portfolio-artesanato.png.asset.json";
import portJesus from "@/assets/portfolio-jesus.png.asset.json";
import portManicure from "@/assets/portfolio-manicure.png.asset.json";
import portPrimeEnergia from "@/assets/portfolio-prime-energia.png.asset.json";
import portGabriela from "@/assets/port-gabriela.png.asset.json";
import portBras from "@/assets/port-bras.png.asset.json";
import portConexao from "@/assets/port-conexao.png.asset.json";
import portArraial from "@/assets/port-arraial.png.asset.json";
import portJhonatas from "@/assets/port-jhonatas.png.asset.json";
import portElis from "@/assets/port-elis.png.asset.json";
import portDabliu from "@/assets/port-dabliu.png.asset.json";
import portAfrica from "@/assets/port-africa.png.asset.json";
import portMarilu from "@/assets/port-marilu.png.asset.json";
import portSonia from "@/assets/port-sonia.png.asset.json";
import portSxk from "@/assets/port-sxk.png.asset.json";
import portAmaral from "@/assets/port-amaral.png.asset.json";
import portFeridas from "@/assets/port-feridas.png.asset.json";
import portNavega from "@/assets/port-navega.png.asset.json";
import portProSaude from "@/assets/port-pro-saude.png.asset.json";
import portMenteExpandida from "@/assets/port-mente-expandida.png.asset.json";
import portNildes from "@/assets/port-nildes.png.asset.json";




function Portfolio() {
  const categories = [
    { id: "all", name: "🔥 Todos" },
    { id: "servicos", name: "Negócios & Serviços" },
    { id: "clinicas", name: "Clínicas & Saúde" },
    { id: "infoprodutos", name: "Infoprodutos & Cursos" },
    { id: "bio", name: "Links na Bio" },
  ];

  const items = [
    { title: "Clínica Médica Pro Saúde", tag: "Clínica & Saúde", category: "clinicas", accent: "from-emerald-400 to-green-600", url: "https://clinicamedicaprosaude.lovable.app", image: portProSaude.url },
    { title: "Consultório Marilu", tag: "Clínica & Saúde", category: "clinicas", accent: "from-pink-100 to-rose-200", url: "https://consultoriomarilu.lovable.app/", image: portMarilu.url },
    { title: "Amaral Engenharia", tag: "Engenharia & Construção", category: "servicos", accent: "from-amber-400 to-yellow-600", url: "https://amaralengenharia.lovable.app", image: portAmaral.url },
    { title: "Curso Feridas e Curativos", tag: "Infoproduto", category: "infoprodutos", accent: "from-cyan-100 to-blue-200", url: "https://cursoferidasecurativos.lovable.app", image: portFeridas.url },
    { title: "Dabliu Consórcios", tag: "Página de Vendas", category: "servicos", accent: "from-blue-600 to-indigo-700", url: "https://dabliuconsorcios.lovable.app/", image: portDabliu.url },
    { title: "Fornecedores Premium Brass", tag: "Catálogo", category: "infoprodutos", accent: "from-amber-600 to-yellow-700", url: "https://fornecedorespremiumbrass.lovable.app/", image: portBras.url },

    { title: "Gabriela Massoterapeuta", tag: "Página de Vendas", category: "clinicas", accent: "from-emerald-400 to-teal-600", url: "https://gabrielamassoterapeuta.lovable.app", image: portGabriela.url },
    { title: "Nildes Souza Estética", tag: "Clínica & Saúde", category: "clinicas", accent: "from-rose-300 to-pink-400", url: "https://nildessouzaestetica.lovable.app", image: portNildes.url },
    { title: "Massagem Arraial d’Ajuda", tag: "Página de Vendas", category: "clinicas", accent: "from-blue-400 to-cyan-600", url: "https://massagemarraialdajuda.com.br/", image: portArraial.url },
    { title: "Conexão Médica", tag: "Página de Vendas", category: "clinicas", accent: "from-indigo-400 to-blue-600", url: "https://esbococonexaomedica.lovable.app", image: portConexao.url },
    { title: "Jhonatas Terapeuta", tag: "Página de Vendas", category: "clinicas", accent: "from-stone-400 to-neutral-600", url: "https://jhonatasterapeuta.lovable.app/", image: portJhonatas.url },
    { title: "Elis Frazão — Psicanalista", tag: "Página de Vendas", category: "clinicas", accent: "from-purple-400 to-violet-600", url: "https://elisfrazaoansiedade.lovable.app/", image: portElis.url },
    { title: "Do Zero à Manicure Profissional", tag: "Infoproduto", category: "infoprodutos", accent: "from-pink-400 to-rose-500", url: "https://dozeromanicureprofissional.lovable.app/", image: portManicure.url },
    { title: "Prime Energia Solar", tag: "Página de Vendas", category: "servicos", accent: "from-blue-500 to-orange-500", url: "https://primeenergiasolares.lovable.app/", image: portPrimeEnergia.url },
    { title: "Mestre da Manutenção", tag: "Página de Vendas", category: "servicos", accent: "from-yellow-400 to-amber-600", url: "https://mestredaamanutencao.lovable.app", image: portMestre.url },
    { title: "Receitas na Air Fryer", tag: "Infoproduto", category: "infoprodutos", accent: "from-amber-400 to-yellow-500", url: "https://receitasnaairfryerr.lovable.app", image: portReceitas.url },
    { title: "Clínica Vivace Estética", tag: "Link na Bio", category: "clinicas", accent: "from-yellow-300 to-amber-500", url: "https://vivaceclinicadeestica.lovable.app", image: portVivace.url },
    { title: "Velmo Black Drinks", tag: "Página de Vendas", category: "servicos", accent: "from-amber-500 to-orange-500", url: "https://velmoblackdrinkss.lovable.app", image: portVelmo.url },
    { title: "Treinamento Start", tag: "Infoproduto", category: "infoprodutos", accent: "from-yellow-400 to-amber-500", url: "https://treinamentostart.lovable.app", image: portTreinamento.url },
    { title: "André Cell Assistência", tag: "Link na Bio", category: "servicos", accent: "from-amber-400 to-yellow-500", url: "https://andrecellassistec.lovable.app", image: portAndreCell.url },
    { title: "Meu Violão Católico", tag: "Infoproduto", category: "infoprodutos", accent: "from-yellow-400 to-amber-600", url: "https://meuviolaocatolico.lovable.app", image: portViolao.url },
    { title: "Sol Massoterapia Avançada", tag: "Link na Bio", category: "clinicas", accent: "from-amber-400 to-orange-500", url: "https://solmassoterapiaavancada.lovable.app/", image: portSol.url },
    { title: "Sonia Freitas Massoterapeuta", tag: "Clínica & Saúde", category: "clinicas", accent: "from-emerald-100 to-teal-200", url: "https://soniafreitasmassoterapeuta.lovable.app", image: portSonia.url },
    { title: "Páscoa Lucrativa", tag: "Infoproduto", category: "infoprodutos", accent: "from-amber-300 to-yellow-500", url: "https://pascoalucrativaa.lovable.app", image: portPascoa.url },
    { title: "Calistenia para Mulheres", tag: "Quiz", category: "infoprodutos", accent: "from-yellow-300 to-orange-400", url: "https://calisteniaparamulheres1.lovable.app", image: portCalistenia.url },
    { title: "Artesanato com Papel", tag: "Infoproduto", category: "infoprodutos", accent: "from-amber-300 to-yellow-500", url: "https://artesanatocompapel.lovable.app", image: portArtesanato.url },
    { title: "Aprenda com Jesus", tag: "Em produção", category: "infoprodutos", accent: "from-yellow-300 to-amber-500", url: "https://aprendacomjesus.lovable.app", image: portJesus.url },
    { title: "Navega Onco", tag: "Clínica & Saúde", category: "clinicas", accent: "from-indigo-100 to-purple-200", url: "https://navegaoncologia.lovable.app/", image: portNavega.url },
    { title: "SXK Engenharia", tag: "Engenharia & Ambiental", category: "servicos", accent: "from-blue-800 to-slate-900", url: "https://sxkengenharia.lovable.app/", image: portSxk.url },


    { title: "For Africa Mission", tag: "Página de Vendas", category: "servicos", accent: "from-orange-500 to-red-700", url: "https://forafricamission.lovable.app/#tpln", image: portAfrica.url },
    { title: "Método Mente Expandida", tag: "Curso de IA", category: "infoprodutos", accent: "from-blue-400 to-cyan-600", url: "https://metodomenteexpandida.lovable.app", image: portMenteExpandida.url },
  ] as Array<{ title: string; tag: string; category: string; accent: string; url: string; image?: string }>;

  const [activeCategory, setActiveCategory] = useState("all");
  const filteredItems = items.filter(it => activeCategory === "all" || it.category === activeCategory);

  const [preview, setPreview] = useState<{ url: string; title: string } | null>(null);
  useEffect(() => {
    if (preview) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [preview]);

  return (
    <section id="portfolio" className="section-light py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4">
        <SectionTitle
          eyebrow="Portfólio"
          title="Trabalhos que já estão no ar"
          desc="Cada projeto pensado do zero pra converter no nicho certo. 👇 Clique nas imagens para acessar os sites ao vivo."
        />

        <div className="mt-4 mx-auto max-w-2xl rounded-2xl border border-[color:var(--neon)]/20 bg-[color:var(--neon)]/10 px-5 py-3 text-sm font-medium text-[color:var(--neon)]">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Este site foi criado recentemente e ainda não está 100% atualizado com todos os sites e projetos desenvolvidos. Novos trabalhos estão sendo adicionados semanalmente.
          </span>
        </div>

        {/* Filtros por Categoria */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-[color:var(--neon)] to-[color:var(--magenta)] text-black shadow-lg shadow-[color:var(--neon)]/20"
                  : "border border-[color:oklch(0.15_0.01_90)]/10 bg-white/50 text-muted-foreground hover:bg-white"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((it, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPreview({ url: it.url, title: it.title })}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card text-left transition hover:-translate-y-1 hover:border-[color:var(--neon)]/40"
            >
              <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${it.accent}`}>
                {it.image ? (
                  <img
                    src={it.image}
                    alt={it.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 grid-bg opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="glass rounded-xl px-4 py-2 font-mono text-xs">{it.tag.toUpperCase()}</div>
                    </div>
                  </>
                )}
                <div className="absolute right-3 top-3 rounded-full bg-background/60 p-2 opacity-0 backdrop-blur transition group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4 -rotate-45" />
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-display font-semibold">{it.title}</h3>
                <p className="text-xs text-muted-foreground">{it.tag}</p>
              </div>

            </button>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          * Alguns links são exibidos como demonstração — peço permissão dos clientes antes de publicar.
        </p>
        <WhatsCTA label="Quero uma página como essas" />
      </div>

      {preview && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black">
          <div className="flex items-center gap-2 border-b border-white/10 bg-black px-3 py-2 text-white">
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-[color:var(--neon)] hover:bg-white/10"
              aria-label="Voltar"
            >
              <ArrowRight className="h-5 w-5 rotate-180" />
              Voltar
            </button>
            <div className="mx-auto truncate text-xs opacity-70">{preview.title}</div>
            <a
              href={preview.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-3 py-2 text-xs text-white/70 hover:bg-white/10"
            >
              Abrir ↗
            </a>
          </div>
          <iframe
            src={preview.url}
            title={preview.title}
            className="h-full w-full flex-1 bg-white"
          />
        </div>
      )}
    </section>
  );
}

/* ------------------------------ VSL Section ------------------------------ */
function VslSection() {
  const [viewers, setViewers] = useState(37);

  useEffect(() => {
    // Carrega os scripts do player Wistia uma única vez
    const load = (src: string, module = false) => {
      if (document.querySelector(`script[src="${src}"]`)) return;
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      if (module) s.type = "module";
      document.head.appendChild(s);
    };
    load("https://fast.wistia.com/player.js");
    load("https://fast.wistia.com/embed/qfxqkdkt5n.js", true);

    // Simula variação de pessoas assistindo
    const t = setInterval(() => {
      setViewers(() => 28 + Math.floor(Math.random() * 21));
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="assista" className="relative pt-8 pb-4 md:pt-10 md:pb-6">
      <div className="mx-auto max-w-3xl px-4 text-center">
        {/* Título chamativo */}
        <p className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-[color:var(--neon)]">
          Veja como funciona
        </p>
        <h2 className="mt-2 text-xl md:text-3xl font-extrabold leading-tight">
          Sua clínica com <span className="text-gradient">mais pacientes todos os dias</span>
        </h2>
        <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
          Assista ao vídeo e descubra como uma página profissional posiciona sua clínica no digital, lota a agenda de pacientes e passa mais confiança.
        </p>

        {/* Indicador ao vivo */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 text-xs md:text-sm font-semibold text-red-400">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
          </span>
          AO VIVO · {viewers} pessoas assistindo agora
        </div>

        <div className="mt-2 inline-flex items-center gap-2 text-xs md:text-sm font-bold text-[color:var(--neon)]">
          <span role="img" aria-label="dedo apontando para baixo">👇</span>
          Assista o vídeo e veja como funciona!
        </div>

        {/* Player */}
        <div className="mt-4 mx-auto w-full max-w-[240px] md:max-w-[300px] overflow-hidden rounded-2xl border border-[color:var(--neon)]/25 shadow-[0_0_50px_-15px_color-mix(in_oklab,var(--neon)_40%,transparent)]">
          <div className="relative aspect-[9/16]">
            {/* @ts-expect-error elemento customizado do player Wistia */}
            <wistia-player media-id="qfxqkdkt5n" aspect="0.5625" style={{ display: "block", width: "100%", height: "100%" }}></wistia-player>
          </div>
        </div>

        {/* 4 tópicos chamativos */}
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--neon)]/20 bg-[color:var(--neon)]/10 px-4 py-3 text-left">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[color:var(--neon)] text-black">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Mais confiança</p>
              <p className="text-xs text-muted-foreground">Design profissional que transmite credibilidade e faz o paciente confiar no seu trabalho.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--neon)]/20 bg-[color:var(--neon)]/10 px-4 py-3 text-left">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[color:var(--neon)] text-black">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Atrai mais pacientes</p>
              <p className="text-xs text-muted-foreground">Página otimizada para converter visitantes em agendamentos qualificados.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--neon)]/20 bg-[color:var(--neon)]/10 px-4 py-3 text-left">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[color:var(--neon)] text-black">
              <Smartphone className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Facilita agendamentos</p>
              <p className="text-xs text-muted-foreground">Botões diretos pro WhatsApp e telefone fazem o paciente marcar consulta com poucos toques.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--neon)]/20 bg-[color:var(--neon)]/10 px-4 py-3 text-left">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[color:var(--neon)] text-black">
              <Timer className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold">Trabalha 24h por dia pra você</p>
              <p className="text-xs text-muted-foreground">Sua clínica fica disponível a qualquer hora, capturando pacientes mesmo fora do expediente.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Testimonials ----------------------------- */
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

function Testimonials() {
  const images = [dep1, dep2, dep3, dep4, dep5, dep6, dep7, dep8, dep9, dep10, dep11, dep12, dep13].map((a, i) => ({
    src: a.url,
    alt: `Depoimento cliente ${i + 1}`,
  }));
  const texts = [
    { name: "Camila R.", role: "Mentora de vendas", text: "Minha página ficou pronta em menos de um dia e já no primeiro post fechei 3 mentorias. Impecável." },
    { name: "Diego M.", role: "Infoprodutor", text: "O design ficou absurdo, muito mais profissional do que eu esperava. Recomendo demais." },
    { name: "Larissa S.", role: "Loja de roupas", text: "Rápido, atencioso e entregou exatamente o que combinamos. Página linda e vendendo." },
  ];
  const audios: string[] = [newestAudio.url, audio1.url, audio2.url];

  // Duplicamos as imagens para criar um loop infinito perfeito
  const loop = [...images, ...images];

  return (
    <section id="depoimentos" className="relative py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <SectionTitle eyebrow="Depoimentos" title="Resultados que falam por si" />

        <div className="mt-4 mx-auto max-w-2xl rounded-2xl border border-[color:var(--neon)]/20 bg-[color:var(--neon)]/10 px-5 py-3 text-sm font-medium text-[color:var(--neon)]">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Este site foi criado recentemente e ainda não está 100% atualizado com todos os depoimentos e sites desenvolvidos. Novos projetos estão sendo adicionados semanalmente.
          </span>
        </div>
        
        {/* Carrossel de Imagens (Prova Social) - Unificado */}
        <div className="relative mt-6 overflow-hidden">
          <div className="flex w-max gap-5 animate-marquee hover:[animation-play-state:paused]" style={{ animationDuration: "30s" }}>
            {loop.map((im, i) => (
              <div
                key={i}
                className="shrink-0 w-[260px] md:w-[320px] rounded-2xl border border-white/10 bg-card/40 p-2 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)]"
              >
                <img
                  src={im.src}
                  alt={im.alt}
                  loading="lazy"
                  className="h-[420px] md:h-[520px] w-full rounded-xl object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Carrossel de Depoimentos em Texto */}
        <div className="relative mt-16 overflow-hidden">
          <div className="flex w-max gap-5 animate-marquee-reverse hover:[animation-play-state:paused]" style={{ animationDuration: "15s" }}>
            {[...texts, ...texts, ...texts].map((it, i) => (
              <div 
                key={i} 
                className="bg-white w-[300px] md:w-[350px] shrink-0 rounded-2xl p-8 shadow-xl border border-black/5"
              >
                <div className="flex justify-center gap-0.5 text-[color:var(--lime)]">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 text-base text-[color:oklch(0.15_0.01_90)] font-medium italic leading-relaxed">"{it.text}"</p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[color:var(--neon)] to-[color:var(--magenta)] font-bold text-background shadow-lg">
                    {it.name[0]}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold text-[color:oklch(0.15_0.01_90)]">{it.name}</div>
                    <div className="text-xs text-[color:oklch(0.42_0.02_90)] font-medium">{it.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Depoimentos em áudio */}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {audios.map((audio, i) => (
            <div key={i} className="bg-white flex items-center gap-4 rounded-2xl p-5 shadow-xl border border-black/5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[color:var(--neon)] to-[color:var(--magenta)] text-background">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-[color:oklch(0.15_0.01_90)]">Depoimento em áudio {i + 1}</div>
                <audio controls className="mt-2 w-full">
                  <source src={audio} />
                  Seu navegador não suporta áudio.
                </audio>
              </div>
            </div>
          ))}
        </div>

        <WhatsCTA label="Quero esse resultado também" />
      </div>
    </section>
  );
}



/* ---------------------------------- FAQ ---------------------------------- */
function FAQ() {
  const items = [
    { q: "Quanto tempo leva pra ficar pronta?", a: "Normalmente entrego no mesmo dia. Projetos maiores podem levar até 48h. O prazo é sempre combinado antes." },
    { q: "Preciso pagar hospedagem ou domínio?", a: "Não. Eu publico a página gratuitamente em um endereço profissional. Se quiser um domínio próprio depois, é opcional." },
    { q: "Posso editar depois?", a: "Sim, faço ajustes iniciais sem custo. Alterações grandes futuras têm um valor combinado à parte." },
    { q: "Serve pra qualquer nicho?", a: "Sim! Já entreguei pra lojas, infoprodutores, mentorias, coaches, clínicas, restaurantes e link na bio." },
    { q: "Como faço pra começar?", a: "Basta clicar em qualquer botão de WhatsApp da página. Em poucos minutos eu passo o orçamento." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section-light py-6 md:py-8">
      <div className="mx-auto max-w-3xl px-4">
        <SectionTitle eyebrow="FAQ" title="Perguntas frequentes" />
        <div className="mt-10 space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-medium">{it.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-muted-foreground">{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <WhatsCTA label="Tirar minha dúvida no WhatsApp" />
      </div>
    </section>
  );
}

/* -------------------------------- Final CTA ------------------------------ */
function FinalCTA() {
  return (
    <section className="section-light py-12 md:py-20 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      <div className="mx-auto max-w-5xl px-4">
        <div className="relative overflow-hidden rounded-[3rem] border border-black/5 bg-white p-10 shadow-2xl md:p-24 text-center">
          <div className="absolute inset-0 -z-10 opacity-[0.03] grid-bg" />
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[color:var(--neon)]/20 blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[color:var(--magenta)]/20 blur-[80px]" />
          
          <div className="relative">
            <SectionBadge className="mb-8">
              <Timer className="h-4 w-4" /> Vagas limitadas para esta semana
            </SectionBadge>
            <h2 className="font-display text-5xl font-black leading-tight md:text-8xl tracking-tighter">
              Bora escalar seus <br /><span className="text-gradient">resultados hoje?</span>
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed">
              Clique no botão abaixo e vamos construir a página que vai mudar o jogo do seu negócio. Atendimento imediato.
            </p>
            
            <div className="mt-12 flex justify-center">
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="shine-hover group inline-flex items-center gap-3 rounded-full bg-[#16c60c] px-10 py-5 text-xl font-black text-background neon-glow transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(22,198,12,0.4)]"
              >
                <img src={whatsappLogo.url} alt="" className="h-8 w-8" />
                COMEÇAR AGORA
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Footer -------------------------------- */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="section-light border-t border-black/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-2 px-6 py-8 text-center">
        <p className="font-display text-base font-semibold">Prime Página de Vendas</p>
        <p className="text-xs text-muted-foreground">© {year} — Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

/* --------------------------- Floating WhatsApp --------------------------- */
function FloatingWhats() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 block h-14 w-14"
    >
      <img
        src={whatsappLogo.url}
        alt="WhatsApp"
        className="h-14 w-14 rounded-full transition-transform hover:scale-110"
      />
    </a>
  );
}

/* ------------------------------ Section Title ---------------------------- */
function SectionTitle({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <span className="font-mono text-xs uppercase tracking-[0.3em] text-[color:var(--neon)]">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-3xl font-bold md:text-5xl">{title}</h2>
      {desc && <p className="mt-3 text-muted-foreground">{desc}</p>}
    </div>
  );
}

/* --------------------------- WhatsApp CTA Button ------------------------- */
function WhatsCTA({ label = "Falar no WhatsApp agora", className = "" }: { label?: string; className?: string }) {
  return (
    <div className={`mt-6 flex justify-center ${className}`}>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="shine-hover inline-flex items-center gap-2 rounded-full bg-[#16c60c] px-8 py-4 text-base font-bold text-background neon-glow transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[rgba(22,198,12,0.3)]"
      >
        <img src={whatsappLogo.url} alt="" className="h-6 w-6" />
        {label}
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  );
}
