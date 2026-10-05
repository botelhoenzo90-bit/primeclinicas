import { createFileRoute } from "@tanstack/react-router";
import { createElement, useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronRight, ExternalLink, Gift, Globe2, MessageCircle, Search, Target, TrendingUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import clinicImage from "@/assets/clinica-etapa-1.png.asset.json";
import clinicProfessionals from "@/assets/clinic-professionals.jpg";
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
import testimonialVideo from "@/assets/testimonials/depoimento-clinica.mp4.asset.json";
import testimonialPoster from "@/assets/testimonials/depoimento-clinica-poster.jpg";
import growthGuide from "@/assets/guia-estrategia-crescimento-clinicas.pdf.asset.json";

const WHATSAPP = "5542999787035";
const images = [dep1,dep2,dep3,dep4,dep5,dep6,dep7,dep8,dep9,dep10,dep11,dep12,dep13].map(x => x.url);
const audios = [newestAudio.url,audio1.url,audio2.url];

type Answers = Record<number,string[]>;
type ClinicProfile = { name:string; clinic:string; area:string; context:string };
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

const waLink = (answers:Answers, profile:ClinicProfile) => {
 const d = diagnostic(answers);
  const summary = questions.map((question,i) => `${question.kicker} — ${question.title}\n${(answers[i]??[]).join("; ") || "Não informado"}`).join("\n\n");
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá, Prime! Meu nome é ${profile.name.trim()} e fiz o diagnóstico da minha clínica. Quero conversar sobre um plano para melhorar meus resultados.\n\nClínica: ${profile.clinic.trim()}\nÁrea de atuação: ${profile.area.trim()}\nComo funciona hoje: ${profile.context.trim()}\n\nPonto de partida indicado: ${d.tag} — ${d.focus}\n\nMinhas respostas e dores:\n${summary}\n\nPodem analisar esse cenário comigo e me orientar sobre os próximos passos para conquistar mais confiança, agendamentos e previsibilidade?`)}`;
};

export const Route = createFileRoute("/")({
 head: () => ({meta:[
  {title:"Diagnóstico de crescimento para clínicas | Prime"},
  {name:"description",content:"Descubra os gargalos de posicionamento, aquisição e agendamento da sua clínica e receba uma direção estratégica."},
  {property:"og:title",content:"Sua clínica está pronta para crescer? Faça o diagnóstico."},
  {property:"og:description",content:"Identifique oportunidades para atrair pacientes, passar confiança e transformar contatos em agendamentos."},
  {property:"og:type",content:"website"},
   {name:"twitter:card",content:"summary_large_image"},
  ],scripts:[
   {src:"https://fast.wistia.com/player.js",async:true},
   {src:"https://fast.wistia.com/embed/lz02wotjxg.js",async:true,type:"module"},
  ]}),
 component:ClinicQuiz,
});

function ClinicQuiz(){
 const [stage,setStage]=useState(-1);
  useEffect(()=>{window.scrollTo({top:0,behavior:"instant"})},[stage]);
  const [profile,setProfile]=useState<ClinicProfile>({name:"",clinic:"",area:"",context:""});
 const [answers,setAnswers]=useState<Answers>({});
 const [selected,setSelected]=useState<string[]>([]);
 const [analyzing,setAnalyzing]=useState(false);
 const [analysisStep,setAnalysisStep]=useState(0);
 const questionCount=questions.length;
  const firstQuestionStage=3;
  const proofStage=questionCount+firstQuestionStage;
  const resultStage=proofStage+1;
 useEffect(()=>{if(!analyzing)return;setAnalysisStep(0);const ticks=[window.setTimeout(()=>setAnalysisStep(1),1100),window.setTimeout(()=>setAnalysisStep(2),2300),window.setTimeout(()=>setAnalyzing(false),3700)];return ()=>ticks.forEach(window.clearTimeout)},[analyzing]);
  const qIndex=stage>=firstQuestionStage&&stage<proofStage?stage-firstQuestionStage:-1;
 const current=qIndex>=0?questions[qIndex]:null;
 const result=useMemo(()=>diagnostic(answers),[answers]);
  const progress=stage===0?0:stage<resultStage?stage/resultStage:1;
  const opportunities=useMemo(()=>{
    const all=Object.values(answers).flat();
    const attention=(terms:string[])=>terms.some(term=>all.includes(term));
    return [
     {label:"Presença e confiança",detail:"Site, apresentação e diferenciais",priority:attention(["Passar mais confiança antes do contato","Ter um site que apresente bem a clínica","O paciente não encontra informações suficientes","Posicionar melhor a clínica"])},
     {label:"Visibilidade",detail:"Google e busca local",priority:attention(["Ser encontrado no Google","Aparecer à frente de concorrentes","Recebemos poucos contatos qualificados"])},
     {label:"Aquisição",detail:"Novos contatos para a clínica",priority:attention(["Tenho horários vazios","Quero mais pacientes novos","Minha agenda depende de indicação","Gerar mais pacientes"])},
     {label:"Conversão",detail:"Do primeiro contato à consulta",priority:attention(["A pessoa chama e não agenda","Não temos um processo comercial claro","Transformar contatos em agendamentos"])},
     {label:"Crescimento",detail:"Processo para crescer com consistência",priority:attention(["Tenho demanda, mas não consigo manter previsibilidade","Escalar a clínica com previsibilidade","Criar uma estrutura para escalar","Nenhuma estrutura consistente"])}
    ].sort((a,b)=>Number(b.priority)-Number(a.priority));
  },[answers]);
 const continueQuestion=()=>{if(!selected.length)return;setAnswers(prev=>({...prev,[qIndex]:selected}));setSelected([]);setStage(stage+1)};
 const showResult=()=>{setAnalyzing(true);setStage(resultStage)};
  const back=()=>{if(stage>firstQuestionStage&&stage<=proofStage){setSelected(answers[stage-firstQuestionStage-1]??[])}setStage(Math.max(0,stage-1))};
  const updateProfile=(key:keyof ClinicProfile,value:string)=>setProfile(prev=>({...prev,[key]:value}));
  const firstName=profile.name.trim().split(/\s+/)[0] || "Você";
  const clinicName=profile.clinic.trim() || "sua clínica";
  const contactLink=waLink(answers,profile);
  return <main className="prime-quiz min-h-svh">
   {stage===-1&&<section className="guide-stage">
    <header className="guide-header"><img src={logoPrime.url} alt="Prime"/><span><Gift/> ACESSO LIBERADO</span></header>
    <div className="guide-intro">
     <span className="guide-kicker">PARABÉNS, ESTE MATERIAL É SEU</span>
     <h1>Você recebeu gratuitamente o <em>Guia de Estratégias de Crescimento para Clínicas</em></h1>
     <p>Um material prático para enxergar gargalos, fortalecer o posicionamento e transformar crescimento em processo — não em sorte.</p>
     <div className="guide-highlights"><span><Check/> 5 pilares do crescimento</span><span><Check/> Diagnóstico e ações práticas</span><span><Check/> Estratégias para atrair e converter</span></div>
    </div>
    <div className="guide-reader">
     <div className="guide-reader-bar"><span><BookOpen/> Leia o guia aqui</span><a href={growthGuide.url} target="_blank" rel="noopener noreferrer">Abrir em tela cheia <ExternalLink/></a></div>
     <iframe src={`${growthGuide.url}#toolbar=0&navpanes=0&view=FitH`} title="Guia de Estratégias de Crescimento para Clínicas"/>
    </div>
    <div className="guide-diagnostic-cta"><span>AGORA, DESCUBRA O QUE SUA CLÍNICA PRECISA MELHORAR</span><h2>O guia mostra o caminho. O diagnóstico revela <em>onde você deve começar.</em></h2><p>Em menos de 1 minuto, responda algumas perguntas e receba uma leitura personalizada dos pontos que podem estar limitando sua agenda, sua autoridade e sua previsibilidade.</p><Button onClick={()=>setStage(0)}>Fazer meu diagnóstico gratuito <ArrowRight/></Button><small>Gratuito · rápido · resultado personalizado</small></div>
   </section>}
  {stage===0&&<section className="prime-opening">
   <div className="opening-logo"><img src={logoPrime.url} alt="Prime"/></div>
   <div className="opening-content">
    <div className="opening-copy">
     <span className="opening-eyebrow">Diagnóstico estratégico para médicos e donos de clínicas</span>
     <h1>Sua clínica está <em>perdendo oportunidades</em> sem você perceber?</h1>
     <p>Descubra os principais gargalos da sua clínica e veja o que pode ser melhorado para <strong>atrair mais pacientes, passar mais confiança e transformar contatos em agendamentos.</strong></p>
     <div className="opening-points"><span><Check/> Analisa sua realidade</span><span><Check/> Identifica gargalos</span><span><Check/> Mostra soluções</span></div>
       <Button onClick={()=>setStage(1)} className="opening-cta">Começar meu diagnóstico gratuito <ArrowRight/></Button>
     <div className="opening-social">
         <div className="mini-avatars" aria-hidden="true">{[0,1,2,3,4].map(i=><span key={i}><img className={`avatar-image-${i}`} src={clinicProfessionals} alt="" width={1500} height={512}/></span>)}</div>
        <div><strong>Para profissionais da saúde</strong><span>Descubra onde sua clínica pode evoluir.</span></div>
     </div>
    </div>
    <div className="opening-visual">
       <img src={clinicImage.url} alt="Pessoas chegando a uma clínica médica"/>
      
    </div>
   </div>
   <div className="opening-bottom"><span>✓ Gratuito</span><span>✓ Leva poucos minutos</span><span>✓ Resultado personalizado</span></div>
  </section>}
  {stage>0&&<div className="quiz-progress-wrap"><img className="progress-logo" src={logoPrime.url} alt="Prime"/><div className="quiz-progress"><span style={{width:`${Math.max(5,progress*100)}%`}}/></div><b>{Math.round(progress*100)}%</b></div>}
   {stage===1&&<section className="question-stage profile-stage"><div className="question-center"><span className="profile-kicker">ANTES DE COMEÇAR</span><h2>Primeiro, como podemos chamar você?</h2><p className="question-sub">Vamos usar seu nome para apresentar uma leitura mais próxima da realidade da sua clínica.</p><form onSubmit={e=>{e.preventDefault();if(profile.name.trim())setStage(2)}}><label htmlFor="visitor-name">Seu nome</label><input id="visitor-name" type="text" autoComplete="name" maxLength={80} required value={profile.name} onChange={e=>updateProfile("name",e.target.value)} placeholder="Como você se chama?"/><div className="question-actions"><Button type="button" variant="ghost" onClick={back}><ArrowLeft/> Voltar</Button><Button type="submit" disabled={!profile.name.trim()}>Continuar <ArrowRight/></Button></div></form></div></section>}
   {stage===2&&<section className="question-stage profile-stage"><div className="question-center"><span className="profile-kicker">SOBRE SUA CLÍNICA</span><h2>{firstName}, conte um pouco sobre a sua clínica.</h2><p className="question-sub">Sua área e a rotina de hoje ajudam a contextualizar as prioridades do diagnóstico.</p><form onSubmit={e=>{e.preventDefault();if(profile.clinic.trim()&&profile.area.trim()&&profile.context.trim())setStage(firstQuestionStage)}}><label htmlFor="clinic-name">Nome da clínica</label><input id="clinic-name" type="text" maxLength={100} required value={profile.clinic} onChange={e=>updateProfile("clinic",e.target.value)} placeholder="Nome da sua clínica"/><label htmlFor="clinic-area">Área de atuação</label><input id="clinic-area" type="text" maxLength={100} required value={profile.area} onChange={e=>updateProfile("area",e.target.value)} placeholder="Ex.: odontologia, dermatologia, clínica médica"/><label htmlFor="clinic-context">Como sua clínica funciona hoje?</label><textarea id="clinic-context" maxLength={500} required rows={4} value={profile.context} onChange={e=>updateProfile("context",e.target.value)} placeholder="Conte brevemente sobre seus atendimentos, equipe, agenda e como os pacientes chegam até vocês."/><div className="question-actions"><Button type="button" variant="ghost" onClick={back}><ArrowLeft/> Voltar</Button><Button type="submit" disabled={!profile.clinic.trim()||!profile.area.trim()||!profile.context.trim()}>Começar perguntas <ArrowRight/></Button></div></form></div></section>}
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
     <div className="proof-heading"><span className="proof-yellow">Histórias reais</span><h2>Quem vive a rotina de uma clínica <em>reconhece a diferença.</em></h2><p>Veja o depoimento e os relatos compartilhados com a Prime.</p></div>
      <div className="proof-feature-video"><video controls playsInline preload="metadata" poster={testimonialPoster} src={testimonialVideo.url} aria-label="Depoimento em vídeo de cliente da Prime"/><span>Depoimento em vídeo</span></div>
     <div className="testimonial-marquee proof-top-images" aria-label="Relatos de clientes da Prime"><div className="testimonial-track">{[...images,...images].map((src,i)=><img key={i} src={src} alt={`Relato de cliente ${i%images.length+1}`} loading="lazy"/>)}</div></div>
    <div className="audio-row">{audios.map((src,i)=><audio key={src} controls preload="none" src={src} aria-label={`Depoimento em áudio ${i+1}`}/>)}</div>
    <Button onClick={showResult} className="stage-cta">Gerar meu diagnóstico <ArrowRight/></Button>
  </section>}
   {stage===resultStage&&analyzing&&<section className="analysis-stage" role="status" aria-live="polite">
     <div className="analysis-symbol"><Search aria-hidden="true"/></div>
     <span className="analysis-eyebrow">DIAGNÓSTICO PRIME CLÍNICAS</span>
      <h2>{[`Lendo as respostas de ${clinicName}...`,`Identificando oportunidades para sua área de atuação...`,`Organizando os próximos passos para ${firstName}...`][analysisStep]}</h2>
      <p>Uma leitura inicial das prioridades que você indicou para a clínica.</p>
     <div className="analysis-progress" aria-hidden="true"><span/></div>
     <div className="analysis-steps"><span className="done">Respostas</span><span className={analysisStep>=1?"done":""}>Oportunidades</span><span className={analysisStep>=2?"done":""}>Plano de ação</span></div>
   </section>}
   {stage===resultStage&&!analyzing&&<section className="diagnostic-result">
       <header className="result-intro"><span className="result-kicker">{firstName}, SEU DIAGNÓSTICO ESTÁ PRONTO</span><h2>{firstName}, {clinicName} pode ser escolhida antes da concorrência. Comece pelos pontos que seguram seus agendamentos.</h2><p className="result-text">Na área de {profile.area.trim()}, ser encontrado, transmitir confiança e transformar interesse em consultas faz diferença. Pelas suas respostas, <strong>{result.title}</strong> {result.text}</p><div className="result-focus"><span>PRIMEIRO MOVIMENTO PARA {clinicName.toLocaleUpperCase("pt-BR")}</span><strong>{result.focus}</strong></div></header>
      <div className="diagnostic-dashboard"><div className="dashboard-title"><span>01 / SEU MAPA DE OPORTUNIDADES</span><strong>O que sua clínica pode melhorar agora</strong><p>Leitura das suas respostas, não uma medição de desempenho. As áreas destacadas refletem o que você apontou como prioridade.</p></div><div className="priority-chart" role="img" aria-label="Mapa qualitativo de prioridades indicadas pelas respostas">
      {opportunities.map(({label,detail,priority})=><div className={`chart-row ${priority?"is-priority":""}`} key={label}><div className="chart-label"><strong>{label}</strong><small>{detail}</small></div><div className="chart-track"><span className={priority?"marked":""}/></div><b>{priority?"Prioridade indicada":"Para avaliar"}</b></div>)}
      </div><div className="chart-key"><span><i/> Suas prioridades</span><span><i/> Outras áreas para avaliar</span></div></div>
      <div className="result-section-heading"><span>02 / O QUE MUDAR</span><h3>Não deixe a concorrência ser a escolha mais fácil.</h3><p>Entre a primeira busca e a consulta, cada etapa precisa fazer o paciente encontrar, confiar e agendar com a sua clínica.</p></div>
      <div className="improvement-grid"><article className="improvement-card problem"><span>O QUE PODE ESTAR CUSTANDO AGENDAMENTOS</span><h3>Se a jornada falha, a agenda sente.</h3><ul><li>Quem procura atendimento encontra outra clínica primeiro.</li><li>Uma apresentação fraca não transmite a confiança que o seu trabalho merece.</li><li>O interesse chega, mas a conversa não vira agendamento.</li><li>Depender só de indicações dificulta planejar o crescimento.</li></ul></article><article className="improvement-card solution"><span>COMO VIRAR ESSE JOGO</span><h3>Uma estrutura para atrair e converter melhor.</h3><ul><li><b>Site profissional</b> para apresentar seus diferenciais e facilitar o contato.</li><li><b>Google e presença local</b> para aparecer na hora da procura.</li><li><b>Campanhas direcionadas</b> para abrir novas conversas.</li><li><b>Atendimento organizado</b> para conduzir o interesse até a agenda.</li></ul></article></div>
       <div className="solution-stack"><div className="result-section-heading"><span>03 / DA OPORTUNIDADE AO AGENDAMENTO</span><h3>Faça sua clínica aparecer, convencer e agendar — antes que o paciente escolha a concorrência.</h3><p>Para {clinicName}, o caminho começa pelo que você apontou como prioridade. Estas frentes ajudam a construir confiança, aumentar a procura e transformar contatos em consultas com mais consistência.</p></div><div className="solution-grid">{[[Globe2,"Mostre por que escolher você","Um site profissional apresenta sua especialidade, seus diferenciais e um caminho claro para agendar."],[Search,"Apareça na hora da procura","Presença no Google para que pacientes da sua região encontrem a clínica quando buscarem atendimento."],[Target,"Gere novas oportunidades","Campanhas direcionadas para alcançar pessoas com interesse real nos seus serviços."],[MessageCircle,"Não perca o contato","Organize o atendimento para responder com clareza, gerar confiança e facilitar o agendamento."],[TrendingUp,"Construa previsibilidade","Acompanhe de onde vêm os contatos e ajuste as ações para depender menos do acaso."]].map(([Icon,title,text],i)=>{const I=Icon as typeof Globe2;return <article className="solution-row" key={title as string}><span><I/></span><small>PASSO 0{i+1}</small><strong>{title as string}</strong><p>{text as string}</p></article>})}</div></div>
       <div className="diagnostic-action"><span>SEU PRÓXIMO PASSO É UMA CONVERSA</span><h3>{firstName}, <em>não deixe as oportunidades de {clinicName} irem para a concorrência.</em></h3><p>Seu diagnóstico é um ponto de partida, não uma avaliação definitiva. Toque no botão: sua mensagem já vai com seu nome, área, contexto e todas as respostas. A Prime poderá entender seu cenário e conversar com você sobre as estratégias mais importantes para conquistar confiança, mais agendamentos e previsibilidade.</p><Button asChild><a href={contactLink} target="_blank" rel="noopener noreferrer"><img src={whatsappLogo.url} alt=""/> Enviar meu diagnóstico e falar com a Prime <ArrowRight/></a></Button><small>Confira a mensagem no WhatsApp antes de enviar.</small></div>
      <div className="result-vsl"><div className="vsl-heading"><span className="opening-eyebrow">APRESENTAÇÃO PRIME</span><h3>Entenda como as peças se conectam.</h3><p>Veja a estratégia por trás de uma presença que atrai, transmite confiança e facilita novos agendamentos.</p></div><div className="vsl-box">{createElement("wistia-player",{"media-id":"lz02wotjxg",aspect:"0.5625",style:{display:"block",width:"100%",height:"100%"}})}</div></div>
       <div className="final-contact"><div><span>VAMOS TRANSFORMAR ESSE DIAGNÓSTICO EM UM PLANO?</span><h3>{firstName}, dê o próximo passo para {clinicName} crescer com mais direção.</h3><p>Envie a mensagem preparada com suas respostas. A conversa com a Prime é o próximo passo para definir o que priorizar.</p></div><Button asChild><a href={contactLink} target="_blank" rel="noopener noreferrer"><img src={whatsappLogo.url} alt=""/> Enviar minhas respostas <ArrowRight/></a></Button></div>
        <Button variant="ghost" className="restart" onClick={()=>{setProfile({name:"",clinic:"",area:"",context:""});setAnswers({});setSelected([]);setStage(-1)}}>Voltar ao guia</Button>
  </section>}
  {stage>0&&stage<resultStage&&<nav className="bottom-nav"><button onClick={back}><ArrowLeft/> Voltar</button><span>Diagnóstico estratégico para clínicas</span></nav>}
 </main>
}