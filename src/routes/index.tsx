import { createFileRoute } from "@tanstack/react-router";
import { createElement, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronRight, Globe2, MessageCircle, Play, Search, Target, TrendingUp, Zap, BarChart3, ShieldCheck, Clock3, Users, Smartphone } from "lucide-react";
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
   {name:"twitter:card",content:"summary_large_image"},
 ]}),
 component:ClinicQuiz,
});

function ClinicQuiz(){
 const [stage,setStage]=useState(0);
 const [answers,setAnswers]=useState<Answers>({});
 const [selected,setSelected]=useState<string[]>([]);
 const questionCount=questions.length;
 const proofStage=questionCount+1;
 const resultStage=questionCount+2;
 const qIndex=stage>=1&&stage<=questionCount?stage-1:-1;
 const current=qIndex>=0?questions[qIndex]:null;
 const result=useMemo(()=>diagnostic(answers),[answers]);
 const progress=stage===0?0:stage<=questionCount?stage/resultStage:stage===proofStage?.82:1;
 const scores=useMemo(()=>{
   const all=Object.values(answers).flat();
   const score=(base:number,words:string[])=>Math.min(94,base+words.filter(x=>all.includes(x)).length*9);
   return [
    ["Posicionamento",score(55,["Passar mais confiança antes do contato","Aumentar o valor percebido dos serviços","Posicionar melhor a clínica"])],
    ["Visibilidade",score(48,["Ser encontrado no Google","Aparecer à frente de concorrentes","Google / SEO"])],
    ["Aquisição",score(45,["Quero mais pacientes novos","Tráfego pago","Gerar mais pacientes"])],
    ["Conversão",score(42,["A pessoa chama e não agenda","Recebemos poucos contatos qualificados","Transformar contatos em agendamentos"])],
    ["Agendamento",score(46,["Sistema de agendamento","A pessoa chama e não agenda"])],
    ["Escala",score(40,["Escalar a clínica com previsibilidade","Criar uma estrutura para escalar"])]
   ];
 },[answers]);
 const continueQuestion=()=>{if(!selected.length)return;setAnswers(prev=>({...prev,[qIndex]:selected}));setSelected([]);setStage(stage+1)};
 const back=()=>{if(stage===1){setStage(0);return}if(stage>=2&&stage<=questionCount){setSelected(answers[stage-2]??[]);setStage(stage-1);return}setStage(Math.max(0,stage-1))};
 return <main className="prime-quiz min-h-svh">
  {stage===0&&<section className="prime-opening">
   <div className="opening-logo"><img src={logoPrime.url} alt="Prime"/></div>
   <div className="opening-content">
    <div className="opening-copy">
     <span className="opening-eyebrow">Diagnóstico estratégico para médicos e donos de clínicas</span>
     <h1>Sua clínica está <em>perdendo oportunidades</em> sem você perceber?</h1>
     <p>Descubra os principais gargalos da sua clínica e veja o que pode ser melhorado para <strong>atrair mais pacientes, passar mais confiança e transformar contatos em agendamentos.</strong></p>
     <div className="opening-points"><span><Check/> Analisa sua realidade</span><span><Check/> Identifica gargalos</span><span><Check/> Mostra soluções</span></div>
     <Button onClick={()=>setStage(1)} className="opening-cta">Começar meu diagnóstico <ArrowRight/></Button>
     <div className="opening-social">
        <div className="mini-avatars">{images.slice(0,5).map((src,i)=><img key={i} src={src} alt=""/>)}</div>
       <div><strong>Diagnóstico personalizado</strong><span>Para clínicas que querem crescer com estratégia.</span></div>
     </div>
    </div>
    <div className="opening-visual">
      <img src={clinicImage} alt="Ambiente profissional de clínica"/>
      
    </div>
   </div>
   <div className="opening-bottom"><span>✓ Gratuito</span><span>✓ Leva poucos minutos</span><span>✓ Resultado personalizado</span></div>
  </section>}
  {stage>0&&<div className="quiz-progress-wrap"><img className="progress-logo" src={logoPrime.url} alt="Prime"/><div className="quiz-progress"><span style={{width:`${Math.max(5,progress*100)}%`}}/></div><b>{Math.round(progress*100)}%</b></div>}
  {current&&<section className="question-stage">
    
    <div className="question-center"><h2>{current.title}</h2><p className="question-sub">{current.subtitle}</p>
    <div className="option-grid">{current.options.map((option,i)=>{const active=selected.includes(option);return <button type="button" key={option} className={`quiz-option ${active?"active":""}`} onClick={()=>current.multi?setSelected(v=>v.includes(option)?v.filter(x=>x!==option):[...v,option]):setSelected([option])}><span className="option-check">{active?<Check/>:String.fromCharCode(65+i)}</span><span>{option}</span><ChevronRight/></button>})}</div>
    <div className="question-actions"><Button variant="ghost" onClick={back}><ArrowLeft/> Voltar</Button><Button onClick={continueQuestion} disabled={!selected.length}>Continuar <ArrowRight/></Button></div></div>
  </section>}
  {false&&<section className="health-news-stage">
    <div className="news-head"><span className="opening-eyebrow">Radar do mercado de saúde</span><h2>Enquanto sua clínica cresce, <em>o comportamento do paciente também muda.</em></h2><p>Veja um contexto real antes de receber seu diagnóstico.</p></div>
    <div className="news-grid">
      <article><span className="news-tag">ATUALIZAÇÃO · 2026</span><h3>Agendamento online está ganhando espaço na saúde digital.</h3><p>O Ministério da Saúde publicou orientações sobre a funcionalidade de Agendamento Online integrada ao Meu SUS Digital.</p><a href="https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/notas-tecnicas/2026/nota-tecnica-conjunta-no-48-2026-seidigi-saps-ms.pdf/view" target="_blank" rel="noreferrer">Ver fonte oficial →</a></article>
      <article><span className="news-tag">MERCADO · SEBRAE</span><h3>O mercado de clínicas apresenta oportunidades para quem consegue se diferenciar.</h3><p>O Sebrae aponta crescimento do mercado de clínicas e destaca segmentação, inovação e tecnologia entre os temas relevantes para competitividade.</p><a href="https://inteligenciademercado.rj.sebrae.com.br/multissetorial/Mercado-de-Clinicas-e-Consultorios-Medicos" target="_blank" rel="noreferrer">Ver análise →</a></article>
      <article><span className="news-tag">SAÚDE DIGITAL · 2026</span><h3>A transformação digital está levando informação e tecnologia para mais etapas do atendimento.</h3><p>O Ministério da Saúde vem ampliando iniciativas de saúde digital, integração de dados e soluções de atendimento.</p><a href="https://www.gov.br/saude/pt-br/assuntos/noticias-ms/2026/agosto/cns-aprova-por-unanimidade-politica-nacional-de-informacao-e-saude-digital" target="_blank" rel="noreferrer">Ver notícia oficial →</a></article>
    </div>
    <div className="news-insight"><Zap/><div><strong>O ponto importante para sua clínica</strong><p>Não basta estar na internet. A oportunidade está em conectar presença, confiança, aquisição, conversão e agendamento.</p></div></div>
    <Button onClick={()=>setStage(proofStage)} className="stage-cta">Continuar diagnóstico <ArrowRight/></Button>
  </section>}
  {stage===proofStage&&<section className="proof-stage">
    <div className="proof-heading"><span className="proof-yellow">Resultados que merecem atenção</span><h2>Veja quem decidiu mudar a forma de <em>crescer a clínica.</em></h2><p>Experiências e materiais compartilhados por clientes da Prime.</p></div>
     <div className="proof-video-grid">{[1,2,3].map(i=><div className="proof-video" key={i}><div className="video-placeholder"><Play/><span>Seu vídeo de depoimento</span><small>Adicione seu vídeo aqui</small></div><strong>Depoimento {i}</strong></div>)}</div>
    <div className="testimonial-marquee proof-top-images"><div className="testimonial-track">{[...images,...images].map((src,i)=><img key={i} src={src} alt="Depoimento"/>)}</div></div>
    <div className="audio-row">{audios.map((src,i)=><audio key={src} controls preload="none" src={src} aria-label={`Depoimento em áudio ${i+1}`}/>)}</div>
    <Button onClick={()=>setStage(resultStage)} className="stage-cta">Ver meu diagnóstico <ArrowRight/></Button>
  </section>}
  {stage===resultStage&&<section className="diagnostic-result">
    <div className="result-badge"><TrendingUp/></div><span className="result-kicker">SEU DIAGNÓSTICO · {result.tag}</span><h2>{result.title}</h2><p className="result-text">{result.text}</p>
    <div className="result-focus"><span>PRINCIPAL OPORTUNIDADE</span><strong>{result.focus}</strong></div><div className="diagnostic-action"><span>AGORA QUE VOCÊ SABE ONDE ESTÁ A OPORTUNIDADE</span><h3>Vamos transformar esse diagnóstico em <em>crescimento.</em></h3><p>A Prime conecta estratégia, presença digital, aquisição e agendamento em uma estrutura pensada para sua clínica.</p><Button asChild><a href={waLink(answers)} target="_blank" rel="noopener noreferrer"><img src={whatsappLogo.url} alt=""/> Quero resolver isso agora <ArrowRight/></a></Button></div>
     <div className="diagnostic-dashboard"><div className="dashboard-title"><span>SEU MAPA DE CRESCIMENTO</span><strong>Onde sua clínica pode evoluir</strong></div><div className="score-grid">{scores.map(([label,value])=><div className="score-item" key={label as string}><div><span>{label as string}</span><b>{value}%</b></div><div className="score-bar"><i style={{width:(value as number)+"%"}}/></div></div>)}</div></div>
    <div className="improvement-grid"><div className="improvement-card problem"><span>⚠ PONTOS DE ATENÇÃO</span><h3>O que pode estar limitando seu crescimento</h3><ul><li>Presença digital que não transmite todo o valor da clínica</li><li>Dependência de indicação ou canais pouco previsíveis</li><li>Perda de oportunidades entre contato e agendamento</li><li>Falta de uma estrutura conectando marketing e atendimento</li></ul></div><div className="improvement-card solution"><span>✓ CAMINHO DE SOLUÇÃO</span><h3>O que pode ser construído</h3><ul><li><b>Site profissional</b> para apresentar a clínica e gerar confiança</li><li><b>Google e presença digital</b> para facilitar que pacientes encontrem você</li><li><b>Tráfego pago</b> para criar novas oportunidades de aquisição</li><li><b>Agendamento e processo comercial</b> para reduzir atrito até a consulta</li></ul></div></div>
    <div className="solution-stack"><h3>Entenda a estrutura</h3><p>Uma estratégia completa conecta os pontos abaixo em vez de tratar cada problema isoladamente.</p>{[[Globe2,"Posicionamento e autoridade","Clareza de oferta, comunicação e percepção de valor."],[Target,"Tráfego pago","Campanhas para colocar sua clínica diante das pessoas certas."],[Search,"Site profissional + Google","Uma presença digital que informa, transmite confiança e facilita o próximo passo."],[Zap,"Agendamento automático","Menos atrito entre o interesse do paciente e o agendamento."],[MessageCircle,"Scripts e estratégia comercial","Um processo para sua equipe aproveitar melhor os contatos recebidos."]].map(([Icon,title,text])=>{const I=Icon as typeof Globe2;return <div className="solution-row" key={title as string}><span><I/></span><div><strong>{title as string}</strong><p>{text as string}</p></div><Check/></div>})}</div>
    <div className="solve-now"><span>SEU PRÓXIMO PASSO</span><h3>Quer começar a resolver esses pontos agora?</h3><p>Receba uma análise do seu cenário e entenda quais soluções fazem mais sentido para sua clínica.</p><Button asChild><a href={waLink(answers)} target="_blank" rel="noopener noreferrer"><img src={whatsappLogo.url} alt=""/> Quero resolver isso com a Prime <ArrowRight/></a></Button></div>
    <div className="result-vsl"><div className="vsl-heading"><span className="opening-eyebrow">Entenda a estrutura Prime</span><h3>Como conectar tudo isso em uma estratégia única?</h3><p>Assista à apresentação e veja como posicionamento, tráfego, site, Google, agendamento e processo comercial podem trabalhar juntos.</p></div><div className="vsl-box"><div className="vsl-label">APRESENTAÇÃO PRIME</div>{createElement("wistia-player",{"media-id":"lz02wotjxg",aspect:"0.5625",style:{display:"block",width:"100%",height:"100%",position:"relative"}})}</div></div>
    <div className="final-contact"><div><span>PRÓXIMO PASSO</span><h3>Chega de perder oportunidades.</h3><p>Converse com a Prime e descubra como colocar sua clínica em uma estrutura de crescimento.</p></div><Button asChild><a href={waLink(answers)} target="_blank" rel="noopener noreferrer"><img src={whatsappLogo.url} alt=""/> Quero falar com a Prime <ArrowRight/></a></Button></div>
    <button className="restart" onClick={()=>{setAnswers({});setSelected([]);setStage(0)}}>Refazer diagnóstico</button>
  </section>}
  {stage>0&&stage<resultStage&&<nav className="bottom-nav"><button onClick={back}><ArrowLeft/> Voltar</button><span>Diagnóstico estratégico para clínicas</span></nav>}
 </main>
}