import Badge from './components/Badge'
import VideoSection from './components/VideoSection'
import SectionBg from './components/SectionBg'
import AnimatedBorder, { PulseRing } from './components/AnimatedBorder'
import CountUp from './components/CountUp'
import { useReveal } from './components/useReveal'

/* ── Reveal wrapper ── */
function R({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const r = useReveal()
  return <div ref={r.ref} className={`${r.className} ${className}`}>{children}</div>
}

/* ── Icons (inline SVG) ── */
const Icon = {
  terminal: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
  users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  file: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  star: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  book: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  lock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><polyline points="20 6 9 17 4 12"/></svg>,
  arrow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4"><path d="M7 17L17 7M7 7h10v10"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  ban: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>,
  mic: <svg viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth={2} className="w-5 h-5"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/></svg>,
  brain: <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth={2} className="w-5 h-5"><path d="M12 2a8 8 0 0 0-8 8c0 3.4 2.1 6.3 5 7.5V20h6v-2.5c2.9-1.2 5-4.1 5-7.5a8 8 0 0 0-8-8z"/><line x1="9" y1="22" x2="15" y2="22"/></svg>,
}

/* ── Data ── */
const agents = [
  { name: 'Squad Chief', role: 'Orquestrador', bg: 'linear-gradient(135deg,#7c6aef,#4a7dff)', icon: '☀', quote: null, desc: 'Coordenador geral. Faz no maximo 3 perguntas, verifica duplicatas e direciona.', cmds: ['*create-squad', '*refresh-registry', '*guide'], borderColors: ['#7c6aef', '#4a7dff', 'transparent', '#7c6aef'] },
  { name: 'Alan Nicolas', role: 'Knowledge Architect', bg: 'linear-gradient(135deg,#22c55e,#06b6d4)', icon: '📖', quote: '"Curacao maior que volume. Se entrar lixo, sai lixo."', desc: 'Pesquisa elite minds, avalia fontes e extrai o DNA. Pareto ao Cubo: 0,8% de genialidade.', cmds: ['*assess-sources', '*extract-framework', '*find-0.8', '*validate-clone'], borderColors: ['#22c55e', '#06b6d4', 'transparent', '#22c55e'] },
  { name: 'Pedro Valerio', role: 'Process Absolutist', bg: 'linear-gradient(135deg,#f59e0b,#ef4444)', icon: '🔧', quote: '"Processo que permite erro e processo quebrado."', desc: 'Cria agentes, tasks e workflows concretos. Cada processo torna impossivel errar.', cmds: ['*create-agent', '*create-workflow', '*create-task'], borderColors: ['#f59e0b', '#ef4444', 'transparent', '#f59e0b'] },
  { name: 'Thiago Finch', role: 'Business Strategist', bg: 'linear-gradient(135deg,#ec4899,#7c6aef)', icon: '📊', quote: '"Funil maior que produto. Antes de inovar, observe."', desc: 'Direciona posicionamento. OMIE: Observar, Modelar, Melhorar, Excelencia.', cmds: ['*funnel-diagnosis', '*value-prop', '*roi-analysis'], borderColors: ['#ec4899', '#7c6aef', 'transparent', '#ec4899'] },
]

const flowSteps = [
  { n: '1', color: '#7c6aef', title: 'Voce faz o pedido', desc: '"Quero um squad de copywriting"', agent: '@squad-chief' },
  { n: '2', color: '#4a7dff', title: 'Triagem e verificacao', desc: 'Verifica duplicatas, faz ate 3 perguntas.', agent: '@squad-chief' },
  { n: '3', color: '#22c55e', title: 'Pesquisa de elite minds', desc: 'Avalia fontes: livros, entrevistas, podcasts, cases reais.', agent: '@oalanicolas' },
  { n: '4', color: '#06b6d4', title: 'Extracao de DNA', desc: 'Voice DNA (como fala) + Thinking DNA (como pensa).', agent: '@oalanicolas' },
  { n: '5', color: '#f59e0b', title: 'Construcao dos agentes', desc: 'Arquivos, comandos, tasks, workflows + veto conditions.', agent: '@pedro-valerio' },
  { n: '6', color: '#ec4899', title: 'Direcionamento estrategico', desc: 'Posicionamento, ROI, hierarquia de agentes.', agent: '@thiago_finch' },
  { n: '7', color: '#ef4444', title: 'Smoke Tests', desc: '3 testes: vocabulario, decisoes, defesa com conviccao.', agent: null },
  { n: '✓', color: '#22c55e', title: 'Squad pronto', desc: 'Registrado e disponivel para uso.', agent: null },
]

const gates = [
  { n: '1', color: '#4a7dff', title: 'Discovery', desc: '3+ elite minds com fontes acessiveis?', tag: 'Bloqueante', tagColor: '#ef4444' },
  { n: '2', color: '#7c6aef', title: 'Architecture', desc: 'Cobertura 80%+ do escopo?', tag: 'Hibrido', tagColor: '#f59e0b' },
  { n: '3', color: '#22c55e', title: 'DNA Extraction', desc: '15+ citacoes, 5+ frases marcantes?', tag: 'Bloqueante', tagColor: '#ef4444' },
  { n: '4', color: '#f59e0b', title: 'Agent Creation', desc: 'Coerencia 70%+ com persona.', tag: 'Bloqueante', tagColor: '#ef4444' },
  { n: '5', color: '#06b6d4', title: 'Workflow Design', desc: '5+ guardrails, fluxo unidirecional.', tag: 'Hibrido', tagColor: '#f59e0b' },
  { n: '6', color: '#ec4899', title: 'Final Validation', desc: 'Score 7.0+ no Axioma Assessment.', tag: 'Bloqueante', tagColor: '#ef4444' },
]

const coreAgents = [
  ['@dev', 'Dex', 'Implementa codigo, cria features'],
  ['@qa', 'Quinn', 'Testa, valida qualidade'],
  ['@architect', 'Aria', 'Projeta arquitetura'],
  ['@pm', 'Morgan', 'Gerencia produto, PRDs'],
  ['@po', 'Pax', 'Valida stories, backlog'],
  ['@sm', 'River', 'Cria stories, sprints'],
  ['@analyst', 'Atlas', 'Pesquisa, analise'],
  ['@data-engineer', 'Dara', 'Banco de dados, migrations'],
  ['@ux-design-expert', 'Uma', 'UI/UX, acessibilidade'],
  ['@devops', 'Gage', 'CI/CD, git push (exclusivo)'],
  ['@aiox-master', 'Orion', 'Orquestrador mestre'],
  ['@squad-creator', 'Craft', 'Cria squads (open-source)'],
]

export default function App() {
  return (
    <div className="bg-[#030305] overflow-visible">

      {/* ── NAV ── */}
      <nav className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50">
        <AnimatedBorder radius={9999} duration={6} width={1} colors={['rgba(124,106,239,0.6)', 'rgba(74,125,255,0.3)', 'transparent', 'transparent', 'rgba(124,106,239,0.6)']}>
        <div className="liquid-glass rounded-full flex items-center px-1.5 sm:px-2 py-1.5 sm:py-1.5 gap-0.5">
          {/* Desktop links */}
          <div className="hidden md:flex items-center">
            {['Visao Geral', 'Agentes', 'Fluxo', 'DNA', 'Qualidade', 'Pro'].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(/\s/g, '-').replace('ã', 'a')}`}
                className="text-white/90 text-sm font-medium px-3 h-8 inline-flex items-center rounded-full hover:bg-white/10 transition-all font-[var(--font-body)]">
                {l}
              </a>
            ))}
          </div>
          {/* Mobile links */}
          <div className="flex md:hidden items-center">
            {['Agentes', 'Fluxo', 'DNA', 'Pro'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="text-white/80 text-[0.72rem] font-medium px-2.5 h-7 inline-flex items-center rounded-full hover:bg-white/10 transition-all font-[var(--font-body)] whitespace-nowrap">
                {l}
              </a>
            ))}
          </div>
          <a href="#core" className="bg-white text-black font-semibold px-3 h-7 sm:px-4 sm:h-8 rounded-full text-[0.72rem] sm:text-sm inline-flex items-center gap-1 hover:bg-white/85 transition-all font-[var(--font-body)] whitespace-nowrap">
            Core {Icon.arrow}
          </a>
        </div>
        </AnimatedBorder>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-28 sm:pt-40 pb-12 sm:pb-20 overflow-hidden">
        {/* Hero BG video */}
        <video
          className="absolute top-[20%] w-full h-auto object-contain z-0 opacity-40"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
          autoPlay loop muted playsInline
        />
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-b from-transparent to-black z-[1]" />
        <SectionBg variant="hero" pattern="dots" />

        <div className="relative z-10 max-w-[800px]">
          <Badge>Synkra AIOX Pro</Badge>
          <h1 className="font-[var(--font-heading)] italic text-white text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.85] tracking-[-2px] sm:tracking-[-4px] mb-4 sm:mb-6">
            Crie equipes de IA baseadas em{' '}
            <span className="text-[var(--color-accent)]">mentes reais</span>
          </h1>
          <p className="font-[var(--font-body)] font-light text-white/60 text-base sm:text-lg max-w-[560px] mx-auto mb-8 sm:mb-10 px-2">
            O Squad Creator pesquisa os maiores especialistas do mundo, extrai como
            eles pensam e falam, e transforma isso em agentes de IA.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <AnimatedBorder radius={9999} duration={3} width={1} colors={['#7c6aef', '#4a7dff', '#06b6d4', '#22c55e', '#7c6aef']}>
              <a href="#fluxo" className="liquid-glass-strong rounded-full px-7 py-3 text-white font-medium text-sm inline-flex items-center gap-2 hover:-translate-y-0.5 transition-all font-[var(--font-body)]">
                Ver como funciona {Icon.arrow}
              </a>
            </AnimatedBorder>
            <a href="#agentes" className="rounded-full px-7 py-3 text-white/60 font-medium text-sm inline-flex items-center gap-2 hover:text-white transition-all font-[var(--font-body)]">
              {Icon.users} Conhecer agentes
            </a>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 sm:gap-12 flex-wrap mt-10 sm:mt-16">
            {[[4, '', 'Agentes'], [57, '', 'Tasks'], [14, '', 'Workflows'], [18, '', 'Veto Gates'], [32, '', 'Features']].map(([v, s, l]) => (
              <div key={l as string} className="text-center">
                <div className="font-[var(--font-heading)] italic text-white text-2xl sm:text-4xl">
                  <CountUp end={v as number} suffix={s as string} />
                </div>
                <div className="text-white/40 text-[0.6rem] sm:text-xs font-medium uppercase tracking-widest mt-1 font-[var(--font-body)]">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <div className="py-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 70% 100% at 50% 50%, rgba(124,106,239,0.04), transparent 70%)'
        }} />
        <div className="absolute inset-0 bg-dot-grid pointer-events-none" />
        <div className="relative z-10">
        <Badge>Construido sobre expertise real</Badge>
        <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 flex-wrap px-4 sm:px-6">
          {['Brad Frost', 'Dan Mall', 'Alan Nicolas', 'Pedro Valerio', 'Thiago Finch'].map(n => (
            <span key={n} className="font-[var(--font-heading)] italic text-xl sm:text-2xl md:text-3xl text-white/40 hover:text-white transition-colors cursor-default">{n}</span>
          ))}
        </div>
        </div>
      </div>

      <div className="section-divider" />

      {/* ── HOW IT WORKS (Video Section) ── */}
      <VideoSection src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8">
        <Badge>Como funciona</Badge>
        <h2 className="font-[var(--font-heading)] italic text-white text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.9] mb-4">
          Voce sonha. Nos construimos.
        </h2>
        <p className="font-[var(--font-body)] font-light text-white/60 text-sm max-w-lg mb-8">
          Compartilhe sua visao. Nossos agentes pesquisam, extraem DNA, criam os agentes e validam. Tudo em horas, nao semanas.
        </p>
        <a href="#fluxo" className="liquid-glass-strong rounded-full px-7 py-3 text-white font-medium text-sm inline-flex items-center gap-2 hover:-translate-y-0.5 transition-all font-[var(--font-body)]">
          Ver o fluxo {Icon.arrow}
        </a>
      </VideoSection>

      <div className="section-divider" />

      {/* ── OVERVIEW ── */}
      <section id="visao-geral" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <SectionBg variant="purple" pattern="dots" />
        <div className="relative z-10 max-w-[1200px] mx-auto">
        <R>
          <Badge>Fundamentos</Badge>
          <h2 className="font-[var(--font-heading)] italic text-white text-3xl sm:text-4xl md:text-5xl tracking-[-1px] sm:tracking-[-2px] leading-[0.9] mb-3">O que e o AIOX?</h2>
          <p className="font-[var(--font-body)] font-light text-white/60 max-w-lg mb-12">Framework que organiza agentes de IA para desenvolvimento, como uma empresa com cargos definidos.</p>
        </R>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            [Icon.terminal, 'CLI First', 'Tudo roda no terminal. Dashboards observam, nunca controlam.'],
            [Icon.users, '12 Agentes', 'Dev, QA, Arquiteto, PM, PO, SM e mais com personas proprias.'],
            [Icon.file, 'Story-Driven', 'Nenhum codigo sem historia. Criterios claros e progresso rastreado.'],
            [Icon.star, 'Squads Premium', 'Times especializados clonando mentes de experts reais.'],
            [Icon.book, 'Memoria', 'Aprende entre sessoes, extrai padroes, sugere melhorias.'],
            [Icon.lock, 'Licenciamento', '3 tiers de acesso. Degradacao graciosa sem perda de dados.'],
          ].map(([icon, title, desc], i) => (
            <R key={i}>
              <div className="liquid-glass rounded-2xl p-7 hover:-translate-y-1 transition-all">
                <div className="liquid-glass-strong rounded-full w-11 h-11 flex items-center justify-center mb-4">{icon}</div>
                <h3 className="font-[var(--font-heading)] italic text-white text-lg mb-2">{title}</h3>
                <p className="font-[var(--font-body)] font-light text-white/60 text-sm">{desc}</p>
              </div>
            </R>
          ))}
        </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── AGENTS ── */}
      <section id="agentes" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <SectionBg variant="blue" pattern="lines" />
        <div className="relative z-10 max-w-[1200px] mx-auto">
        <R>
          <Badge>O Trio + Chefe</Badge>
          <h2 className="font-[var(--font-heading)] italic text-white text-3xl sm:text-4xl md:text-5xl tracking-[-1px] sm:tracking-[-2px] leading-[0.9] mb-3">Os 4 Agentes</h2>
          <p className="font-[var(--font-body)] font-light text-white/60 max-w-lg mb-12">Cada um com funcao unica. Juntos, a fabrica de squads.</p>
        </R>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {agents.map((a, i) => (
            <R key={i}>
              <AnimatedBorder radius={24} duration={4 + i} width={1} colors={a.borderColors} hoverOnly>
              <div className="liquid-glass rounded-2xl sm:rounded-3xl p-5 sm:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-13 h-13 rounded-2xl flex items-center justify-center text-2xl shrink-0" style={{ background: a.bg }}>{a.icon}</div>
                  <div>
                    <div className="font-[var(--font-heading)] italic text-white text-xl">{a.name}</div>
                    <div className="text-white/40 text-xs font-[var(--font-body)]">{a.role}</div>
                  </div>
                </div>
                {a.quote && <div className="italic text-white/40 text-sm border-l-2 border-white/20 pl-4 my-4 font-[var(--font-body)]">{a.quote}</div>}
                <p className="font-[var(--font-body)] font-light text-white/60 text-sm mb-4">{a.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {a.cmds.map(c => (
                    <span key={c} className="liquid-glass rounded-full px-3 py-1 text-[var(--color-accent)] text-[0.7rem] font-mono">{c}</span>
                  ))}
                </div>
              </div>
              </AnimatedBorder>
            </R>
          ))}
        </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── FLOW ── */}
      <section id="fluxo" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <SectionBg variant="green" pattern="dots" />
        <div className="relative z-10 max-w-[1200px] mx-auto">
        <R className="text-center">
          <Badge>Passo a Passo</Badge>
          <h2 className="font-[var(--font-heading)] italic text-white text-3xl sm:text-4xl md:text-5xl tracking-[-1px] sm:tracking-[-2px] leading-[0.9] mb-3">Como um squad e criado</h2>
          <p className="font-[var(--font-body)] font-light text-white/60 max-w-lg mx-auto mb-12">Voce pede. Os agentes pesquisam, extraem, constroem e validam.</p>
        </R>
        <div className="max-w-[680px] mx-auto flex flex-col">
          {flowSteps.map((s, i) => (
            <R key={i}>
              <div className="flex gap-5">
                <div className="flex flex-col items-center shrink-0">
                  <div className="relative w-11 h-11">
                    <PulseRing color={s.color} size={44} />
                    <div className="liquid-glass-strong absolute inset-0 rounded-[14px] flex items-center justify-center font-[var(--font-heading)] italic text-lg text-white z-10" style={{ color: s.color }}>
                      {s.n}
                    </div>
                  </div>
                  {i < flowSteps.length - 1 && <div className="w-px h-7 bg-white/10" />}
                </div>
                <div className="pb-7 pt-1.5">
                  <h4 className="font-[var(--font-heading)] italic text-white text-lg">{s.title}</h4>
                  <p className="font-[var(--font-body)] font-light text-white/60 text-sm">{s.desc}</p>
                  {s.agent && <span className="inline-block mt-1.5 font-mono text-[0.68rem] px-2.5 py-0.5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">{s.agent}</span>}
                </div>
              </div>
            </R>
          ))}
        </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── DNA ── */}
      <section id="dna" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <SectionBg variant="cyan" pattern="lines" />
        <div className="relative z-10 max-w-[1200px] mx-auto">
        <R>
          <Badge>A Ciencia</Badge>
          <h2 className="font-[var(--font-heading)] italic text-white text-3xl sm:text-4xl md:text-5xl tracking-[-1px] sm:tracking-[-2px] leading-[0.9] mb-3">Voice DNA e Thinking DNA</h2>
          <p className="font-[var(--font-body)] font-light text-white/60 max-w-lg mb-12">Duas dimensoes capturam a essencia de um especialista.</p>
        </R>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <R>
            <AnimatedBorder radius={24} duration={5} width={1} colors={['#06b6d4', '#22c55e', 'transparent', 'transparent', '#06b6d4']} hoverOnly>
            <div className="liquid-glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 border-l-2 border-cyan-500">
              <h3 className="font-[var(--font-heading)] italic text-white text-xl flex items-center gap-2.5 mb-4">{Icon.mic} Voice DNA</h3>
              <p className="font-[var(--font-body)] font-light text-white/60 text-sm mb-4">Como o especialista fala. O estilo reconhecivel.</p>
              {['Palavras-ancora — bordoes e jargoes unicos', 'Estruturas de frase — curto e direto ou analogias', 'Tom e energia — formal, casual, provocativo', 'Frases marcantes — citacoes que viram assinatura'].map(t => (
                <div key={t} className="flex gap-2.5 py-2 items-start">
                  <span className="text-[var(--color-accent)] mt-0.5 shrink-0">{Icon.check}</span>
                  <span className="font-[var(--font-body)] font-light text-white/60 text-sm">{t}</span>
                </div>
              ))}
            </div>
            </AnimatedBorder>
          </R>
          <R>
            <AnimatedBorder radius={24} duration={5} width={1} colors={['#7c6aef', '#ec4899', 'transparent', 'transparent', '#7c6aef']} hoverOnly>
            <div className="liquid-glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 border-l-2 border-[var(--color-accent)]">
              <h3 className="font-[var(--font-heading)] italic text-white text-xl flex items-center gap-2.5 mb-4">{Icon.brain} Thinking DNA</h3>
              <p className="font-[var(--font-body)] font-light text-white/60 text-sm mb-4">Como o especialista pensa. Modelos mentais.</p>
              {['Frameworks mentais — regras SE/ENTAO', 'Heuristicas — atalhos para resolver rapido', 'Hierarquia de valores — prioridades em conflito', 'Paradoxos produtivos — contradicoes que definem'].map(t => (
                <div key={t} className="flex gap-2.5 py-2 items-start">
                  <span className="text-[var(--color-accent)] mt-0.5 shrink-0">{Icon.check}</span>
                  <span className="font-[var(--font-body)] font-light text-white/60 text-sm">{t}</span>
                </div>
              ))}
            </div>
            </AnimatedBorder>
          </R>
        </div>

        {/* Source Tiers */}
        <R className="mt-12">
          <h3 className="font-[var(--font-heading)] italic text-white text-xl mb-4">Classificacao de Fontes</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              ['#22c55e', 'Tier 1A — Ouro', 'Entrevistas longas, lives sem roteiro'],
              ['#4a7dff', 'Tier 1B — Alta', 'Livros, podcasts, cases documentados'],
              ['#f59e0b', 'Tier 2A — Bronze', 'Palestras preparadas, entrevistas curtas'],
              ['#ef4444', 'Tier 2B — Baixa', 'Fontes de terceiros, conteudo antigo'],
            ].map(([c, label, desc]) => (
              <div key={label} className="liquid-glass rounded-2xl p-5 text-center">
                <div className="text-[0.68rem] font-bold uppercase tracking-wider mb-2 font-[var(--font-body)]" style={{ color: c }}>{label}</div>
                <p className="font-[var(--font-body)] font-light text-white/60 text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </R>
        </div>
      </section>

      {/* ── STATS (Video Section) ── */}
      <VideoSection src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8" desaturate minHeight="500px">
        <div className="liquid-glass rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 text-center max-w-4xl mx-4">
          {[['97%', 'Fidelidade max'], ['15+', 'Citacoes minimas'], ['3', 'Smoke tests'], ['18', 'Veto conditions']].map(([v, l]) => (
            <div key={l}>
              <div className="font-[var(--font-heading)] italic text-white text-2xl sm:text-4xl md:text-5xl">{v}</div>
              <div className="text-white/60 font-[var(--font-body)] font-light text-xs sm:text-sm mt-1">{l}</div>
            </div>
          ))}
        </div>
      </VideoSection>

      <div className="section-divider" />

      {/* ── QUALITY GATES ── */}
      <section id="qualidade" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <SectionBg variant="red" pattern="dots" />
        <div className="relative z-10 max-w-[1200px] mx-auto">
        <R>
          <Badge>Controle de Qualidade</Badge>
          <h2 className="font-[var(--font-heading)] italic text-white text-3xl sm:text-4xl md:text-5xl tracking-[-1px] sm:tracking-[-2px] leading-[0.9] mb-3">Quality Gates</h2>
          <p className="font-[var(--font-body)] font-light text-white/60 max-w-lg mb-12">6 portoes. Se nao passar, volta para ajustes.</p>
        </R>
        <R>
          <div className="flex flex-col gap-2 max-w-3xl">
            {gates.map(g => (
              <div key={g.n} className="liquid-glass rounded-2xl flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-all">
                <div className="w-9 h-9 rounded-[10px] flex items-center justify-center font-[var(--font-heading)] italic text-white text-sm shrink-0 glow-breathe" style={{ background: `${g.color}22`, color: g.color, '--glow-color': `${g.color}40` } as React.CSSProperties}>{g.n}</div>
                <div className="flex-1">
                  <h4 className="font-[var(--font-heading)] italic text-white text-sm">{g.title}</h4>
                  <p className="font-[var(--font-body)] font-light text-white/60 text-xs">{g.desc}</p>
                </div>
                <span className="text-[0.65rem] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 font-[var(--font-body)]"
                  style={{ background: `${g.tagColor}18`, color: g.tagColor }}>{g.tag}</span>
              </div>
            ))}
          </div>
        </R>

        {/* Veto */}
        <R className="mt-16">
          <h3 className="font-[var(--font-heading)] italic text-white text-xl flex items-center gap-2 mb-2">
            <span className="text-red-500">{Icon.ban}</span> Veto Conditions
          </h3>
          <p className="font-[var(--font-body)] font-light text-white/60 text-sm mb-6">18 travas fisicas que param tudo imediatamente.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              ['Menos de 3 experts', 'Dominio sem 3+ mentes de elite cancela a criacao.'],
              ['Fidelidade < 90%', 'Agente nao se comporta como expert? Volta pra extracao.'],
              ['Conceito sem fonte', 'Toda afirmacao precisa de citacao. Minimo 15.'],
              ['Score < 7.0', 'Assessment final precisa atingir nota 7 ou superior.'],
              ['Handoff sem validacao', 'Nenhum agente passa trabalho sem 5 checkpoints.'],
              ['Processo sem dono', 'Sem responsavel = sem execucao.'],
            ].map(([t, d]) => (
              <div key={t} className="liquid-glass rounded-2xl p-5 border-l-2 border-red-500">
                <h4 className="font-[var(--font-heading)] italic text-white text-sm mb-1">{t}</h4>
                <p className="font-[var(--font-body)] font-light text-white/60 text-xs">{d}</p>
              </div>
            ))}
          </div>
        </R>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── TIERS ── */}
      <section className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden text-center">
        <SectionBg variant="warm" pattern="lines" />
        <div className="relative z-10 max-w-[1200px] mx-auto">
        <R>
          <Badge>Hierarquia</Badge>
          <h2 className="font-[var(--font-heading)] italic text-white text-3xl sm:text-4xl md:text-5xl tracking-[-1px] sm:tracking-[-2px] leading-[0.9] mb-3">Sistema de Tiers</h2>
          <p className="font-[var(--font-body)] font-light text-white/60 max-w-lg mx-auto mb-12">Topo coordena, base executa.</p>
        </R>
        <div className="max-w-[640px] mx-auto flex flex-col gap-2">
          {[
            ['#4a7dff', 'Orchestrator', 'Coordenador Geral', 'Recebe pedidos e distribui.'],
            ['#7c6aef', 'Tier 0', 'Diagnostico', 'Analisa e avalia antes de agir.'],
            ['#22c55e', 'Tier 1', 'Execucao Core', 'Experts com resultados comprovados.'],
            ['#f59e0b', 'Tier 2', 'Sistematizadores', 'Frameworks replicaveis.'],
            ['#ec4899', 'Tier 3', 'Especialistas', 'Video, email, redes sociais.'],
          ].map(([c, label, title, desc]) => (
            <R key={label}>
              <div className="liquid-glass rounded-2xl flex items-center gap-4 px-6 py-4 text-left hover:bg-white/[0.02] transition-all">
                <span className="font-mono text-[0.68rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full shrink-0" style={{ background: `${c}22`, color: c }}>{label}</span>
                <div>
                  <h4 className="font-[var(--font-heading)] italic text-white text-sm">{title}</h4>
                  <p className="font-[var(--font-body)] font-light text-white/60 text-xs">{desc}</p>
                </div>
              </div>
            </R>
          ))}
        </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── PRO ── */}
      <section id="pro" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <SectionBg variant="purple" pattern="dots" />
        <div className="relative z-10 max-w-[1200px] mx-auto">
        <R>
          <Badge>Edicao Pro</Badge>
          <h2 className="font-[var(--font-heading)] italic text-white text-3xl sm:text-4xl md:text-5xl tracking-[-1px] sm:tracking-[-2px] leading-[0.9] mb-3">32 features. 7 modulos.</h2>
          <p className="font-[var(--font-body)] font-light text-white/60 max-w-lg mb-12">Controlado por licenca com 3 niveis.</p>
        </R>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-12">
          {[
            [Icon.users, 'Squads', ['Templates premium', 'Customizados', 'Marketplace', 'Exportar pacotes']],
            [Icon.book, 'Memoria', ['Persistencia', 'Self-learning', 'Busca semantica', 'Propostas', 'Sync']],
            [Icon.shield, 'Metricas', ['Dashboards', 'Analytics de time', 'Custos', 'Alertas']],
            [Icon.terminal, 'CLI', ['Paralela', 'Scripting', 'Perfis', 'Remota']],
            [Icon.star, 'Agentes', ['Customizados', 'Times', 'Autonomia', 'Aprendizado']],
            [Icon.lock, 'Integracoes', ['ClickUp, Jira', 'GitHub Enterprise', 'Slack, Notion']],
          ].map(([icon, title, items], i) => (
            <R key={i}>
              <div className="liquid-glass rounded-2xl p-6">
                <h4 className="font-[var(--font-heading)] italic text-white flex items-center gap-2 mb-3 text-[var(--color-accent)]">
                  {icon} <span className="text-white">{title as string}</span>
                </h4>
                <ul className="space-y-1">
                  {(items as string[]).map(item => (
                    <li key={item} className="font-[var(--font-body)] font-light text-white/60 text-sm flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </R>
          ))}
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            ['Individual', '3 features', ['Premium Squads', 'Extended Memory', 'Parallel Execution']],
            ['Team', '4 modulos', ['Todos os Squads', 'Toda a Memoria', 'Todas as Metricas', 'Integracoes']],
            ['Enterprise', 'Acesso total', ['32 features', 'Config enterprise', 'Secrets', 'Audit logging']],
          ].map(([t, sub, items], i) => {
            const card = (
              <div className={`${i === 1 ? 'liquid-glass-strong' : 'liquid-glass'} rounded-2xl p-7 text-center`}>
                <h3 className="font-[var(--font-heading)] italic text-white text-2xl">{t}</h3>
                <p className="font-[var(--font-body)] text-white/40 text-xs mb-5">{sub}</p>
                <ul className="text-left space-y-2">
                  {(items as string[]).map(item => (
                    <li key={item} className="font-[var(--font-body)] font-light text-white/60 text-sm flex items-center gap-2">
                      <span className="text-[var(--color-accent)]">{Icon.check}</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            )
            return (
              <R key={i}>
                {i === 1 ? (
                  <AnimatedBorder radius={20} duration={4} width={1} colors={['#7c6aef', '#4a7dff', '#06b6d4', '#ec4899', '#7c6aef']}>
                    {card}
                  </AnimatedBorder>
                ) : card}
              </R>
            )
          })}
        </div>
        </div>
      </section>

      {/* ── CTA (Video Section) ── */}
      <VideoSection src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8" minHeight="600px">
        <h2 className="font-[var(--font-heading)] italic text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.9] mb-4 px-4">
          Seu proximo squad comeca aqui.
        </h2>
        <p className="font-[var(--font-body)] font-light text-white/60 text-sm max-w-lg mb-8">
          Crie squads baseados em mentes reais. Pesquisa, extracao, construcao e validacao automaticas.
        </p>
        <div className="flex gap-3 flex-wrap justify-center">
          <a href="https://github.com/SynkraAI/aios-core" target="_blank" className="liquid-glass-strong rounded-full px-7 py-3 text-white font-medium text-sm inline-flex items-center gap-2 font-[var(--font-body)]">
            GitHub {Icon.arrow}
          </a>
          <a href="#visao-geral" className="bg-white text-black rounded-full px-7 py-3 font-semibold text-sm hover:bg-white/90 transition-all font-[var(--font-body)]">
            Voltar ao topo
          </a>
        </div>
      </VideoSection>

      <div className="section-divider" />

      {/* ── CORE AGENTS ── */}
      <section id="core" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <SectionBg variant="neutral" pattern="lines" />
        <div className="relative z-10 max-w-[1200px] mx-auto">
        <R>
          <Badge>Base do Framework</Badge>
          <h2 className="font-[var(--font-heading)] italic text-white text-3xl sm:text-4xl md:text-5xl tracking-[-1px] sm:tracking-[-2px] leading-[0.9] mb-3">12 Agentes Core</h2>
          <p className="font-[var(--font-body)] font-light text-white/60 max-w-lg mb-12">Open-source. O Squad Creator adiciona squads extras.</p>
        </R>
        <R>
          {/* Desktop table */}
          <div className="liquid-glass rounded-2xl overflow-hidden hidden sm:block">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left px-5 py-3.5 text-[0.7rem] font-semibold uppercase tracking-widest text-white/40 bg-white/[0.02] border-b border-white/10 font-[var(--font-body)]">Agente</th>
                  <th className="text-left px-5 py-3.5 text-[0.7rem] font-semibold uppercase tracking-widest text-white/40 bg-white/[0.02] border-b border-white/10 font-[var(--font-body)]">Persona</th>
                  <th className="text-left px-5 py-3.5 text-[0.7rem] font-semibold uppercase tracking-widest text-white/40 bg-white/[0.02] border-b border-white/10 font-[var(--font-body)]">Funcao</th>
                </tr>
              </thead>
              <tbody>
                {coreAgents.map(([id, persona, fn]) => (
                  <tr key={id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3 border-b border-white/5 font-mono text-[var(--color-accent)] text-sm font-medium">{id}</td>
                    <td className="px-5 py-3 border-b border-white/5 text-white/40 text-xs font-[var(--font-body)]">{persona}</td>
                    <td className="px-5 py-3 border-b border-white/5 font-[var(--font-body)] font-light text-white/60 text-sm">{fn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile cards */}
          <div className="grid grid-cols-1 gap-2 sm:hidden">
            {coreAgents.map(([id, persona, fn]) => (
              <div key={id} className="liquid-glass rounded-xl p-4 flex items-start gap-3">
                <div>
                  <span className="font-mono text-[var(--color-accent)] text-sm font-medium">{id}</span>
                  <span className="text-white/30 text-xs ml-2 font-[var(--font-body)]">{persona}</span>
                </div>
                <p className="font-[var(--font-body)] font-light text-white/60 text-xs mt-0.5 ml-auto text-right">{fn}</p>
              </div>
            ))}
          </div>
        </R>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative overflow-hidden py-16 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#06060c] to-[#030305] pointer-events-none" />
        <div className="absolute inset-0 bg-dot-grid pointer-events-none" />
        <div className="absolute top-0 left-0 right-0">
          <div className="section-divider" />
        </div>
        <div className="relative z-10">
        <p className="font-[var(--font-body)] text-white/40 text-xs">Synkra AIOX v5.0.3 — CLI First &middot; Observability Second &middot; UI Third</p>
        <p className="font-[var(--font-body)] text-white/40 text-xs mt-2">
          Gerado por 20 agentes em paralelo &middot;{' '}
          <a href="https://github.com/SynkraAI/aios-core" target="_blank" className="text-[var(--color-accent)] hover:underline">GitHub</a>
        </p>
        </div>
      </footer>
    </div>
  )
}
