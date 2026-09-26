import { createFileRoute } from "@tanstack/react-router";
import { createElement, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronRight, Globe2, MessageCircle, Play, Search, Target, TrendingUp, Zap } from "lucide-react";
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
const images = [dep1,dep2,dep3,dep4,dep5,dep6,dep7,dep8,dep9,dep10,dep11,dep12,dep13].map(x => x.url);
const audios = [newestAudio.url,audio1.url,audio2.url];

type Answers = Record<number,string[]>;
type Question = { kicker:string; title:string; subtitle:string; options:string[]; multi?:boolean };

const questions:Question[] = [
 {kicker:"Agenda",title:"O que mais incomoda você hoje na sua agenda?",subtitle:"Pode selecionar mais de uma opção.",multi:true,options:["Tenho horários vazios","Quero mais pacientes novos","Minha agenda depende de indicação","Tenho demanda, mas não consigo manter previsibilidade"]},
 {kicker:"Google & presença",title:"Quando alguém procura sua clínica na internet, o que você gostaria que acontecesse?",subtitle:"Selecione tudo que faria diferença para você.",multi:true,options:["Ser encontrado no Google","Passar mais confiança antes do contato","Aparecer à frente de concorrentes","Ter um site que apresente bem a clínica"]},
 {kicker:"Conversão",title:"Onde você sente que pode estar perdendo pacientes?",subtitle:"Escolha os pontos que mais parecem com sua realidade.",multi:true,options:["A pessoa chama e não agenda","Recebemos poucos contatos qualificados","Não temos um processo comercial claro","O paciente não encontra informações suficientes"]},
 {kicker:"Crescimento",title:"O que você gostaria de conseguir nos próximos meses?",subtitle:"Escolha suas principais metas.",multi:true,options:["Lotar mais a agenda","Escalar a clínica com previsibilidade","Aumentar o valor percebido dos serviços","Sair na frente da concorrência"]},
 {kicker:"Estrutura",title:"Quais dessas estruturas sua clínica já possui?",subtitle:"Não existe resposta certa. Isso ajuda a identificar as próximas oportunidades.",multi:true,options:["Site profissional","Tráfego pago","Google / SEO","Sistema de agendamento","Scripts ou processo de vendas","Nenhuma estrutura consistente"]},
 {kicker:"Prioridade",title:"Se pudesse resolver apenas uma coisa primeiro, qual seria?",subtitle:"Escolha a prioridade que mais impactaria sua clínica hoje.",options:["Gerar mais pacientes","Transformar contatos em agendamentos","Posicionar melhor a clínica","Criar uma estrutura para escalar"]},
];

const diagnostic = (answers:Answers) => {
 const all = Object.values(answers).flat();
 const has = (x:string) => all.includes(x);
 if(has("A pessoa chama e não agenda") || has("Não temos um processo comercial claro")) return {
  tag:"Conversão",
  title:"Sua clínica pode estar deixando oportunidades na mesa depois que o paciente demonstra interesse.",
  text:"Atrair pessoas é só uma parte do processo. Se a experiência entre o primeiro contato e o agendamento não estiver bem estruturada, parte da demanda pode se perder.",
  focus:"Melhorar a jornada do contato até o agendamento."
 };
 if(has("Não aparecemos no Google") || has("Ser encontrado no Google") || has("Recebemos poucos contatos qualificados")) return {
  tag:"Visibilidade",
  title:"Existe uma oportunidade clara de tornar sua clínica mais encontrável e relevante.",
  text:"Uma presença digital estratégica ajuda a clínica a aparecer para quem já está procurando por soluções, enquanto uma apresentação profissional reduz insegurança antes do contato.",
  focus:"Aumentar visibilidade e percepção de valor."
 };
 if(has("Tenho horários vazios") || has("Gerar mais pacientes") || has("Lotar mais a agenda")) return {
  tag:"Demanda",
  title:"O próximo passo é construir uma fonte mais previsível de novas oportunidades.",
  text:"Agenda cheia não depende de uma única ação. É preciso combinar posicionamento, aquisição de pacientes e uma jornada simples até o agendamento.",
  focus:"Criar uma estrutura de aquisição e conversão."
 };
 if(has("Escalar a clínica com previsibilidade") || has("Criar uma estrutura para escalar")) return {
  tag:"Escala",
  title:"Para escalar, sua clínica precisa transformar marketing e atendimento em processo.",
  text:"Quando cada etapa tem uma função — posicionar, atrair, converter e acompanhar — o crescimento deixa de depender apenas de esforços isolados.",
  focus:"Construir uma estrutura integrada de crescimento."
 };
 return {
  tag:"Estratégia",
  title:"Sua clínica tem espaço para transformar presença digital em uma estrutura de crescimento.",
  text:"O diagnóstico indica oportunidades em posicionamento, aquisição e conversão. O próximo passo é entender quais ajustes têm maior impacto no seu cenário.",
  focus:"Definir prioridades e um plano de ação sob medida."
 };
};

const waLink = (answers:Answers) => {
 const d = diagnostic(answers);
 const summary = Object.entries(answers).map(([i,v]) => `Etapa ${Number(i)+1}: ${v.join(", ")}`).join("\n");
 return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Fiz o Diagnóstico Prime Clínicas e quero entender como melhorar minha clínica.\n\nPrioridade identificada: ${d.focus}\n\nMinhas respostas:\n${summary}`)}`;
};

export const Route = createFileRoute("/")({
 head: () => ({meta:[
  {title:"Diagnóstico de crescimento para clínicas | Prime"},
  {name:"description",content:"Descubra os gargalos de posicionamento, aquisição e agendamento da sua clínica e receba uma direção estratégica."},
  {property:"og:title",content:"Sua clínica está pronta para crescer? Faça o diagnóstico."},
  {property:"og:description",content:"Identifique oportunidades para atrair pacientes, passar confiança e transformar contatos em agendamentos."},
  {property:"og:type",content:"website"},
 ]}),
 component:ClinicQuiz,
});

function ClinicQuiz(){
 const [stage,setStage]=useState(0);
 const [answers,setAnswers]=useState<Answers>({});
 const [selected,setSelected]=useState<string[]>([]);
 useEffect(()=>{window.scrollTo({top:0,behavior:"instant"})},[stage]);
 const qIndex = stage>=1 && stage<=6 ? stage-1 : -1;
 const current = qIndex>=0 ? questions[qIndex] : null;
 const result = useMemo(()=>diagnostic(answers),[answers]);
 const progress = stage===0?0:stage<=6?stage/10:stage<10?0.65+(stage-6)*.08:1;
 const continueQuestion = () => {
   if(!selected.length) return;
   setAnswers(prev=>({...prev,[qIndex]:selected}));
   setSelected([]);
   setStage(stage+1);
 };
 const back = () => {
   if(stage===1){setStage(0);return}
   if(stage>=2 && stage<=6){
     const prev=answers[stage-2]??[];
     setSelected(prev);
     setStage(stage-1);
     return;
   }
   setStage(stage-1);
 };
 return <main className="prime-quiz min-h-svh">
  <header className="quiz-header">
   <div className="quiz-brand"><img src={logoPrime.url} alt="Prime" /><span>PRIME<span>.</span></span></div>
   <div className="quiz-header-center"><span>Diagnóstico estratégico para clínicas</span></div>
   <div className="quiz-secure">Confidencial · gratuito</div>
  </header>
  {stage>0 && <div className="quiz-progress-wrap"><div className="quiz-progress"><span style={{width:`${Math.max(4,progress*100)}%`}} /></div><b>{Math.round(progress*100)}%</b></div>}
  <div className="quiz-container">
   {stage===0 && <section className="hero-diagnostic">
    <div className="hero-copy">
      <span className="eyebrow-pill"><Zap size={14}/> Diagnóstico estratégico para médicos e donos de clínicas</span>
      <h1>Sua clínica pode estar <em>perdendo pacientes</em> sem você perceber.</h1>
      <p className="hero-lead">Descubra onde sua clínica está deixando oportunidades na mesa — e quais estruturas podem ajudar você a <strong>lotar a agenda, passar mais confiança e crescer com previsibilidade.</strong></p>
      <div className="hero-benefits"><span><Check/> Analisa sua realidade</span><span><Check/> Identifica gargalos</span><span><Check/> Mostra caminhos de solução</span></div>
      <Button onClick={()=>setStage(1)} className="hero-cta">Fazer meu diagnóstico <ArrowRight/></Button>
      <small>Leva poucos minutos · sem compromisso · resultado personalizado</small>
    </div>
    <div className="hero-visual">
      <img src={clinicImage} alt="Ambiente profissional de clínica" />
      <div className="diagnostic-card"><span>O que vamos analisar</span><strong>Posicionamento · Google · Aquisição · Conversão · Agendamento</strong><div><TrendingUp/> Diagnóstico + direção estratégica</div></div>
    </div>
   </section>}
   {current && <section className="question-stage">
     <div className="question-top"><span>ETAPA 0{qIndex+1} <i>•</i> {current.kicker}</span><span>{current.multi?"MÚLTIPLA ESCOLHA":"ESCOLHA UMA"}</span></div>
     <h2>{current.title}</h2><p className="question-sub">{current.subtitle}</p>
     <div className="option-grid">{current.options.map((option,i)=>{const active=selected.includes(option);return <button type="button" key={option} className={`quiz-option ${active?"active":""}`} onClick={()=>current.multi?setSelected(s=>s.includes(option)?s.filter(x=>x!==option):[...s,option]):setSelected([option])}>
       <span className="option-check">{active?<Check/>:String.fromCharCode(65+i)}</span><span>{option}</span><ChevronRight/>
     </button>})}</div>
     <div className="question-actions"><Button variant="ghost" onClick={back}><ArrowLeft/> Voltar</Button><Button onClick={continueQuestion} disabled={!selected.length}>Continuar <ArrowRight/></Button></div>
   </section>}
   {stage===7 && <section className="proof-stage">
     <div className="proof-heading"><span className="eyebrow-pill">Resultados que merecem atenção</span><h2>Veja o que muda quando uma clínica decide <em>parar de improvisar.</em></h2><p>Antes de chegar ao seu diagnóstico, veja exemplos de materiais e resultados compartilhados por clientes da Prime.</p></div>
     <div className="testimonial-marquee"><div className="testimonial-track">{[...images,...images].map((src,i)=><img key={i} src={src} alt="" />)}</div></div>
     <p className="proof-caption">Veja os resultados de quem decidiu mudar a forma como sua clínica se posiciona e atrai pacientes.</p>
     <div className="audio-row">{audios.map((src,i)=><audio key={src} controls preload="none" src={src} aria-label={`Depoimento em áudio ${i+1}`}/>)}</div>
     <Button onClick={()=>setStage(8)} className="stage-cta">Quero ver como isso pode funcionar <ArrowRight/></Button>
   </section>}
   {stage===8 && <VideoStage onContinue={()=>setStage(9)}/>}
   {stage===9 && <section className="diagnostic-result">
     <div className="result-badge"><TrendingUp/></div><span className="result-kicker">SEU DIAGNÓSTICO INICIAL · {result.tag}</span>
     <h2>{result.title}</h2><p className="result-text">{result.text}</p>
     <div className="result-focus"><span>PRINCIPAL DIREÇÃO</span><strong>{result.focus}</strong></div>
     <div className="solution-stack"><h3>Como podemos ajudar sua clínica</h3><p>Em vez de tratar cada problema isoladamente, estruturamos os pontos que fazem o paciente conhecer, confiar e agendar.</p>
       {[
        [Globe2,"Posicionamento e autoridade","Estratégia de marca, comunicação e presença digital para sua clínica ser percebida com mais valor."],
        [Target,"Tráfego pago","Campanhas direcionadas para gerar novas oportunidades e colocar sua clínica diante das pessoas certas."],
        [Search,"Google e presença digital","Site profissional e estratégias para melhorar sua presença quando o paciente pesquisa por atendimento."],
        [Zap,"Agendamentos automáticos","Estruturas que reduzem atrito entre o interesse do paciente e o momento de marcar."],
        [MessageCircle,"Scripts e estratégia comercial","Processos e mensagens para organizar o atendimento e aproveitar melhor cada oportunidade."],
       ].map(([Icon,title,text])=>{const I=Icon as typeof Globe2;return <div className="solution-row" key={title as string}><span><I/></span><div><strong>{title as string}</strong><p>{text as string}</p></div><Check/></div>})}
     </div>
     <div className="final-contact"><div><span>PRÓXIMO PASSO</span><h3>Quer descobrir o que faria mais sentido para a sua clínica?</h3><p>Fale com a Prime. Vamos analisar seu cenário e mostrar onde existe oportunidade de crescimento.</p></div><Button asChild><a href={waLink(answers)} target="_blank" rel="noopener noreferrer"><img src={whatsappLogo.url} alt=""/> Falar com a Prime no WhatsApp <ArrowRight/></a></Button></div>
     <button className="restart" onClick={()=>{setAnswers({});setSelected([]);setStage(0)}}>Refazer diagnóstico</button>
   </section>}
  </div>
  {stage>0 && stage<9 && <nav className="bottom-nav"><button onClick={back}><ArrowLeft/> Voltar</button><span>Diagnóstico Prime · sua clínica, sua próxima oportunidade</span></nav>}
 </main>
}

function VideoStage({onContinue}:{onContinue:()=>void}){
 useEffect(()=>{for(const [src,module] of [["https://fast.wistia.com/player.js",false],["https://fast.wistia.com/embed/lz02wotjxg.js",true]] as const){if(document.querySelector(`script[src="${src}"]`))continue;const s=document.createElement("script");s.src=src;s.async=true;if(module)s.type="module";document.head.appendChild(s)}},[]);
 return <section className="vsl-stage">
  <div className="vsl-copy"><span className="eyebrow-pill"><Play size={14}/> Entenda a estrutura</span><h2>Uma clínica forte não depende de uma única ação. <em>Ela conecta tudo.</em></h2><p>Assista e veja como posicionamento, tráfego pago, site profissional, Google, agendamentos automáticos, scripts de vendas e estratégia podem trabalhar juntos para criar uma jornada mais eficiente até a consulta.</p><div className="service-chips"><span>Posicionamento</span><span>Tráfego pago</span><span>Site profissional</span><span>Google</span><span>Agendamento automático</span><span>Estratégia comercial</span></div></div>
  <div className="vsl-box"><div className="vsl-label">APRESENTAÇÃO PRIME</div>{createElement("wistia-player",{"media-id":"lz02wotjxg",aspect:"0.5625",style:{display:"block",width:"100%",height:"100%",position:"relative"}})}</div>
  <Button onClick={onContinue} className="stage-cta">Ver meu diagnóstico <ArrowRight/></Button>
 </section>
}
