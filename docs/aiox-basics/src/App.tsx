import Badge from './components/Badge'
import VideoSection from './components/VideoSection'
import SectionBg from './components/SectionBg'
import AnimatedBorder, { PulseRing } from './components/AnimatedBorder'
import CountUp from './components/CountUp'
import { useReveal } from './components/useReveal'

function R({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const r = useReveal()
  return <div ref={r.ref} className={`${r.className} ${className}`}>{children}</div>
}

const I = {
  terminal: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>,
  users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  file: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><polyline points="20 6 9 17 4 12"/></svg>,
  arrow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4"><path d="M7 17L17 7M7 7h10v10"/></svg>,
  ban: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>,
  zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  layers: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
}

function Code({ children, title }: { children: string; title?: string }) {
  return (
    <div className="liquid-glass rounded-xl overflow-hidden">
      {title && <div className="px-4 py-2 border-b border-white/5 text-[0.68rem] font-mono text-white/40">{title}</div>}
      <pre className="p-4 text-sm font-mono text-[var(--color-accent)] leading-relaxed overflow-x-auto"><code>{children}</code></pre>
    </div>
  )
}

function Analogy({ real, aiox }: { real: string; aiox: string }) {
  return (
    <div className="liquid-glass rounded-xl p-5 flex flex-col sm:flex-row gap-4 items-start">
      <div className="flex-1">
        <div className="text-[0.68rem] font-bold uppercase tracking-wider text-amber-400 mb-1 font-[var(--font-body)]">Empresa Real</div>
        <p className="font-[var(--font-body)] font-light text-white/60 text-sm">{real}</p>
      </div>
      <div className="hidden sm:flex items-center text-white/20 text-2xl">=</div>
      <div className="flex-1">
        <div className="text-[0.68rem] font-bold uppercase tracking-wider text-[var(--color-accent)] mb-1 font-[var(--font-body)]">No AIOX</div>
        <p className="font-[var(--font-body)] font-light text-white/60 text-sm">{aiox}</p>
      </div>
    </div>
  )
}

function SH({ tag, title, desc }: { tag: string; title: string; desc: string }) {
  return (
    <R>
      <Badge>{tag}</Badge>
      <h2 className="font-[var(--font-heading)] italic text-white text-3xl sm:text-4xl md:text-5xl tracking-[-1px] sm:tracking-[-2px] leading-[0.9] mb-3">{title}</h2>
      <p className="font-[var(--font-body)] font-light text-white/60 max-w-xl mb-12">{desc}</p>
    </R>
  )
}

const agents = [
  { id: '@dev', name: 'Dex', role: 'Desenvolvedor', color: '#4a7dff', desc: 'Escreve codigo, roda testes, implementa features. Faz git add e git commit, mas nunca git push.', cmds: ['*develop', '*build'] },
  { id: '@qa', name: 'Quinn', role: 'Testador', color: '#22c55e', desc: 'Revisa codigo, roda quality gates, emite veredictos: PASS, CONCERNS, FAIL.', cmds: ['*gate', '*review'] },
  { id: '@architect', name: 'Aria', role: 'Arquiteta', color: '#7c6aef', desc: 'Decide tecnologias, projeta a estrutura do sistema, define padroes.', cmds: ['*design', '*tech-select'] },
  { id: '@pm', name: 'Morgan', role: 'Gerente de Produto', color: '#ec4899', desc: 'Cria PRDs, define epics, prioriza o que sera construido.', cmds: ['*create-prd', '*create-epic'] },
  { id: '@sm', name: 'River', role: 'Scrum Master', color: '#06b6d4', desc: 'Cria stories detalhadas a partir dos epics. Nunca escreve codigo.', cmds: ['*create-story', '*sprint-plan'] },
  { id: '@devops', name: 'Gage', role: 'DevOps', color: '#f59e0b', desc: 'O UNICO que pode fazer git push, criar PRs e releases. Ninguem mais.', cmds: ['*pre-push', '*release'] },
]

const flowSteps = [
  { n: '1', color: '#06b6d4', title: 'Voce pede uma feature', desc: 'Exemplo: "Preciso de um sistema de login"', code: '@pm\n*create-prd' },
  { n: '2', color: '#ec4899', title: 'PM cria o plano', desc: 'Morgan escreve o PRD com requisitos, define o epic e as stories necessarias.', code: null },
  { n: '3', color: '#06b6d4', title: 'SM cria as stories', desc: 'River pega cada item do epic e cria stories com criterios de aceite claros.', code: '@sm\n*create-story' },
  { n: '4', color: '#7c6aef', title: 'PO valida a story', desc: 'Pax roda um checklist de 10 pontos. Se a nota for menor que 7, volta pro SM.', code: '@po\n*validate-story-draft' },
  { n: '5', color: '#4a7dff', title: 'Dev implementa', desc: 'Dex le a story, implementa o codigo, roda testes e marca os checkboxes.', code: '@dev\n*develop 1.1 yolo' },
  { n: '6', color: '#22c55e', title: 'QA revisa', desc: 'Quinn roda 7 checks de qualidade e emite um veredicto: PASS, CONCERNS ou FAIL.', code: '@qa\n*gate 1.1' },
  { n: '7', color: '#f59e0b', title: 'DevOps publica', desc: 'Gage roda pre-push gates (lint, typecheck, test) e faz o push pro GitHub.', code: '@devops\n*pre-push' },
  { n: '\u2713', color: '#22c55e', title: 'Feature no ar', desc: 'Codigo publicado com qualidade garantida, rastreavel ate o requisito original.', code: null },
]

const constitution = [
  { num: 'I', title: 'CLI First', severity: 'NON-NEGOTIABLE', color: '#ef4444', desc: 'Tudo funciona pelo terminal primeiro. Interfaces graficas sao opcionais e so observam.', analogy: 'O cerebro da empresa e o escritorio central, nao o painel da recepcionista.' },
  { num: 'II', title: 'Agent Authority', severity: 'NON-NEGOTIABLE', color: '#ef4444', desc: 'Cada agente tem autoridade exclusiva. O dev nao pode fazer push, o QA nao pode editar codigo.', analogy: 'O estagiario nao assina contratos. O financeiro nao desenvolve produto.' },
  { num: 'III', title: 'Story-Driven', severity: 'MUST', color: '#f59e0b', desc: 'Nenhuma linha de codigo e escrita sem uma story associada com criterios claros.', analogy: 'Nenhuma obra comeca sem planta aprovada.' },
  { num: 'IV', title: 'No Invention', severity: 'MUST', color: '#f59e0b', desc: 'Specs nao podem inventar features. Tudo deve rastrear para um requisito documentado.', analogy: 'O pedreiro constroi o que esta na planta, nao adiciona comodos por conta.' },
  { num: 'V', title: 'Quality First', severity: 'MUST', color: '#f59e0b', desc: 'Codigo deve passar lint, typecheck e testes antes de qualquer merge.', analogy: 'O produto passa pelo controle de qualidade antes de sair da fabrica.' },
  { num: 'VI', title: 'Absolute Imports', severity: 'SHOULD', color: '#22c55e', desc: 'Usar @/ nos imports em vez de ../../.. para manter o codigo limpo.', analogy: 'Usar endereco completo, nao "vira ali e depois la".' },
]

export default function App() {
  return (
    <div className="bg-[#030305] overflow-visible">

      <nav className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50">
        <AnimatedBorder radius={9999} duration={6} width={1} colors={['rgba(124,106,239,0.6)', 'rgba(74,125,255,0.3)', 'transparent', 'transparent', 'rgba(124,106,239,0.6)']}>
        <div className="liquid-glass rounded-full flex items-center px-1.5 sm:px-2 py-1.5 gap-0.5">
          <div className="hidden md:flex items-center">
            {['O que e', 'Analogia', 'Agentes', 'Na Pratica', 'Regras', 'Qualidade'].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(/\s/g, '-')}`}
                className="text-white/90 text-sm font-medium px-3 h-8 inline-flex items-center rounded-full hover:bg-white/10 transition-all font-[var(--font-body)]">{l}</a>
            ))}
          </div>
          <div className="flex md:hidden items-center">
            {['Agentes', 'Pratica', 'Regras'].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="text-white/80 text-[0.72rem] font-medium px-2.5 h-7 inline-flex items-center rounded-full hover:bg-white/10 transition-all font-[var(--font-body)]">{l}</a>
            ))}
          </div>
          <a href="#instalar" className="bg-white text-black font-semibold px-3 h-7 sm:px-4 sm:h-8 rounded-full text-[0.72rem] sm:text-sm inline-flex items-center gap-1 hover:bg-white/85 transition-all font-[var(--font-body)]">
            Instalar {I.arrow}
          </a>
        </div>
        </AnimatedBorder>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-28 sm:pt-40 pb-12 sm:pb-20 overflow-hidden">
        <video className="absolute top-[20%] w-full h-auto object-contain z-0 opacity-30" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" autoPlay loop muted playsInline />
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-b from-transparent to-[#030305] z-[1]" />
        <SectionBg variant="hero" pattern="dots" />
        <div className="relative z-10 max-w-[800px]">
          <Badge>Guia para Iniciantes</Badge>
          <h1 className="font-[var(--font-heading)] italic text-white text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.85] tracking-[-2px] sm:tracking-[-4px] mb-4 sm:mb-6">
            AIOX e a sua{' '}<span className="text-[var(--color-accent)]">empresa de IA</span>
          </h1>
          <p className="font-[var(--font-body)] font-light text-white/60 text-base sm:text-lg max-w-[580px] mx-auto mb-8 sm:mb-10 px-2">
            Imagine uma empresa com 12 funcionarios especializados. Cada um sabe seu papel,
            segue regras claras e ninguem faz o trabalho do outro. Isso e o AIOX — so que os
            funcionarios sao agentes de IA.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <AnimatedBorder radius={9999} duration={3} width={1} colors={['#7c6aef', '#4a7dff', '#06b6d4', '#22c55e', '#7c6aef']}>
              <a href="#na-pratica" className="liquid-glass-strong rounded-full px-7 py-3 text-white font-medium text-sm inline-flex items-center gap-2 hover:-translate-y-0.5 transition-all font-[var(--font-body)]">
                Ver na pratica {I.arrow}
              </a>
            </AnimatedBorder>
            <a href="#o-que-e" className="rounded-full px-7 py-3 text-white/60 font-medium text-sm inline-flex items-center gap-2 hover:text-white transition-all font-[var(--font-body)]">{I.search} Entender do zero</a>
          </div>
          <div className="flex justify-center gap-6 sm:gap-12 flex-wrap mt-10 sm:mt-16">
            {[[12, '', 'Agentes'], [180, '+', 'Tasks'], [6, '', 'Artigos'], [4, '', 'Workflows']].map(([v, s, l]) => (
              <div key={l as string} className="text-center">
                <div className="font-[var(--font-heading)] italic text-white text-2xl sm:text-4xl"><CountUp end={v as number} suffix={s as string} /></div>
                <div className="text-white/40 text-[0.6rem] sm:text-xs font-medium uppercase tracking-widest mt-1 font-[var(--font-body)]">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* O QUE E */}
      <section id="o-que-e" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <SectionBg variant="purple" pattern="dots" />
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <SH tag="Para Iniciantes" title="O que e o AIOX?" desc="Em vez de usar a IA como um assistente generico, o AIOX organiza ela como uma empresa real." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              [I.terminal, 'O Terminal e o Escritorio', 'Tudo acontece pela linha de comando. E o escritorio central — onde decisoes sao tomadas e o trabalho acontece.'],
              [I.users, '12 Funcionarios de IA', 'Cada agente tem nome, cargo e autoridade. O Dev programa, o QA testa, o DevOps publica. Ninguem invade o cargo do outro.'],
              [I.file, 'Tudo Documentado', 'Antes de qualquer codigo, existe uma "story" — um documento com o que fazer e como saber se esta pronto.'],
              [I.shield, 'Regras Inquebraveis', 'A Constituicao tem 6 artigos. Alguns inegociaveis — o sistema bloqueia automaticamente se tentar violar.'],
              [I.zap, 'Automacao com Guardrails', 'O Dev pode rodar no modo YOLO (totalmente autonomo), mas ainda passa pelos quality gates antes de publicar.'],
              [I.layers, 'Workflows Prontos', '4 workflows cobrem qualquer cenario: feature nova, bug fix, feature complexa ou projeto legado.'],
            ].map(([icon, title, desc], i) => (
              <R key={i}>
                <div className="liquid-glass rounded-2xl p-5 sm:p-7 hover:-translate-y-1 transition-all">
                  <div className="liquid-glass-strong rounded-full w-11 h-11 flex items-center justify-center mb-4">{icon}</div>
                  <h3 className="font-[var(--font-heading)] italic text-white text-lg mb-2">{title as string}</h3>
                  <p className="font-[var(--font-body)] font-light text-white/60 text-sm">{desc as string}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ANALOGIA */}
      <section id="analogia" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <SectionBg variant="warm" pattern="lines" />
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <SH tag="Entendendo" title="Empresa real vs. AIOX" desc="Se voce ja trabalhou em uma empresa, ja entende o AIOX." />
          <div className="flex flex-col gap-3">
            <R><Analogy real="O CEO decide o que a empresa vai fazer" aiox="O @pm (Morgan) cria o PRD e define os epics" /></R>
            <R><Analogy real="O gerente de projeto quebra em tarefas" aiox="O @sm (River) cria stories com criterios de aceite" /></R>
            <R><Analogy real="O QA da empresa valida antes de entregar" aiox="O @po (Pax) valida com checklist de 10 pontos" /></R>
            <R><Analogy real="O programador implementa a feature" aiox='O @dev (Dex) implementa com *develop 1.1 yolo' /></R>
            <R><Analogy real="O controle de qualidade inspeciona" aiox="O @qa (Quinn) roda *gate 1.1 e emite veredicto" /></R>
            <R><Analogy real="So o gerente de TI publica em producao" aiox="So o @devops (Gage) pode fazer git push" /></R>
            <R><Analogy real="O regulamento interno da empresa" aiox="A Constituicao com 6 artigos inegociaveis" /></R>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* VIDEO STORY */}
      <VideoSection src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8">
        <Badge>Conceito Central</Badge>
        <h2 className="font-[var(--font-heading)] italic text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[0.9] mb-4 px-4">Story-Driven Development</h2>
        <p className="font-[var(--font-body)] font-light text-white/60 text-sm max-w-lg mb-4 px-4">
          Nenhuma linha de codigo sem uma story. A story define o que fazer, os criterios de aceite e rastreia o progresso.
        </p>
        <div className="max-w-lg w-full px-4">
          <Code title="Exemplo de Story">{`# Story 1.1: Sistema de Login
Status: Ready | Epic: Autenticacao

## Acceptance Criteria
- [ ] Login com email/senha
- [ ] Token JWT com expiracao 24h
- [ ] Bloqueio apos 5 tentativas

## Tasks
- [ ] POST /auth/login
- [ ] Validacao de credenciais
- [ ] Rate limiting
- [ ] Testes unitarios`}</Code>
        </div>
      </VideoSection>

      <div className="section-divider" />

      {/* AGENTES */}
      <section id="agentes" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <SectionBg variant="blue" pattern="dots" />
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <SH tag="O Time" title="Conheca os agentes" desc="Cada agente tem nome, personalidade e autoridade exclusiva." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((a, i) => (
              <R key={i}>
                <AnimatedBorder radius={20} duration={4 + i} width={1} colors={[a.color, 'transparent', a.color]} hoverOnly>
                <div className="liquid-glass rounded-2xl sm:rounded-3xl p-5 sm:p-7">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0" style={{ background: `${a.color}22`, color: a.color }}>
                      {a.id.replace('@', '').slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-[var(--font-heading)] italic text-white text-lg">{a.name}</div>
                      <div className="text-white/40 text-xs font-[var(--font-body)]">{a.id} — {a.role}</div>
                    </div>
                  </div>
                  <p className="font-[var(--font-body)] font-light text-white/60 text-sm mb-3">{a.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {a.cmds.map(c => <span key={c} className="liquid-glass rounded-full px-3 py-1 text-[var(--color-accent)] text-[0.7rem] font-mono">{c}</span>)}
                  </div>
                </div>
                </AnimatedBorder>
              </R>
            ))}
          </div>
          <R className="mt-12">
            <h3 className="font-[var(--font-heading)] italic text-white text-xl flex items-center gap-2 mb-2"><span className="text-red-500">{I.ban}</span> Quem pode o que</h3>
            <p className="font-[var(--font-body)] font-light text-white/60 text-sm mb-6">Regras bloqueadas automaticamente pelo sistema.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[['git push, PRs, releases', 'Exclusivo do @devops (Gage)', '#f59e0b'], ['Escrever/modificar codigo', 'Exclusivo do @dev (Dex)', '#4a7dff'], ['Criar stories', 'Exclusivo do @sm (River)', '#06b6d4'], ['Emitir veredictos', 'Exclusivo do @qa (Quinn)', '#22c55e']].map(([a, r, c]) => (
                <div key={a} className="liquid-glass rounded-xl p-4 border-l-2" style={{ borderColor: c }}>
                  <div className="font-[var(--font-body)] font-medium text-white text-sm">{a}</div>
                  <div className="font-[var(--font-body)] font-light text-white/40 text-xs">{r}</div>
                </div>
              ))}
            </div>
          </R>
        </div>
      </section>

      <div className="section-divider" />

      {/* NA PRATICA */}
      <section id="na-pratica" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <SectionBg variant="green" pattern="lines" />
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <SH tag="Passo a Passo" title="Fluxo completo" desc="Do pedido ate a publicacao. Cada etapa mostra o que voce digita." />
          <div className="max-w-[750px] mx-auto flex flex-col">
            {flowSteps.map((s, i) => (
              <R key={i}>
                <div className="flex gap-5">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative w-11 h-11">
                      <PulseRing color={s.color} size={44} />
                      <div className="liquid-glass-strong absolute inset-0 rounded-[14px] flex items-center justify-center font-[var(--font-heading)] italic text-lg z-10" style={{ color: s.color }}>{s.n}</div>
                    </div>
                    {i < flowSteps.length - 1 && <div className="w-px h-7 bg-white/10" />}
                  </div>
                  <div className="pb-7 pt-1 flex-1">
                    <h4 className="font-[var(--font-heading)] italic text-white text-lg">{s.title}</h4>
                    <p className="font-[var(--font-body)] font-light text-white/60 text-sm mb-2">{s.desc}</p>
                    {s.code && <Code title="O que voce digita">{s.code}</Code>}
                  </div>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <VideoSection src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8" desaturate minHeight="500px">
        <div className="liquid-glass rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 text-center max-w-4xl mx-4">
          {[['12', 'Agentes IA'], ['180+', 'Tasks prontas'], ['3', 'Quality layers'], ['4', 'Workflows']].map(([v, l]) => (
            <div key={l}><div className="font-[var(--font-heading)] italic text-white text-2xl sm:text-4xl md:text-5xl">{v}</div><div className="text-white/60 font-[var(--font-body)] font-light text-xs sm:text-sm mt-1">{l}</div></div>
          ))}
        </div>
      </VideoSection>

      <div className="section-divider" />

      {/* CONSTITUICAO */}
      <section id="regras" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <SectionBg variant="red" pattern="dots" />
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <SH tag="As Regras" title="A Constituicao" desc="6 artigos que governam tudo. O sistema bloqueia violacoes automaticamente." />
          <div className="flex flex-col gap-3">
            {constitution.map((c, i) => (
              <R key={i}>
                <div className="liquid-glass rounded-2xl p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-[10px] flex items-center justify-center font-[var(--font-heading)] italic text-base shrink-0 glow-breathe" style={{ background: `${c.color}22`, color: c.color, '--glow-color': `${c.color}40` } as React.CSSProperties}>{c.num}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-[var(--font-heading)] italic text-white text-base sm:text-lg">{c.title}</h3>
                        <span className="text-[0.6rem] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full font-[var(--font-body)]" style={{ background: `${c.color}18`, color: c.color }}>{c.severity}</span>
                      </div>
                      <p className="font-[var(--font-body)] font-light text-white/60 text-sm">{c.desc}</p>
                    </div>
                  </div>
                  <div className="liquid-glass rounded-lg p-3 mt-2">
                    <div className="text-[0.65rem] font-bold uppercase tracking-wider text-amber-400/70 mb-1 font-[var(--font-body)]">Analogia</div>
                    <p className="font-[var(--font-body)] font-light text-white/50 text-xs italic">{c.analogy}</p>
                  </div>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* QUALIDADE */}
      <section id="qualidade" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <SectionBg variant="cyan" pattern="lines" />
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <SH tag="Controle" title="3 camadas de qualidade" desc="Todo codigo passa por 3 filtros. Nenhum e opcional." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              ['Layer 1', 'Pre-Commit', '#4a7dff', 'Local e rapido. Roda lint, typecheck e testes. Falhou? Nem sai da sua maquina.', 'npm run lint\nnpm run typecheck\nnpm test'],
              ['Layer 2', 'PR Automation', '#7c6aef', 'CodeRabbit e Quinn revisam. Issues CRITICAL bloqueiam merge.', 'coderabbit --severity CRITICAL\n@qa *review'],
              ['Layer 3', 'Human Review', '#22c55e', 'Arquiteto revisa decisoes estrategicas. Sign-off expira em 24h.', '@architect review\n# checklist 5+ items'],
            ].map(([label, title, c, desc, code], i) => (
              <R key={i}>
                <div className="liquid-glass rounded-2xl p-5 sm:p-7 h-full flex flex-col">
                  <span className="font-mono text-[0.68rem] font-bold uppercase tracking-wider px-3 py-1 rounded-full self-start mb-4" style={{ background: `${c}22`, color: c as string }}>{label}</span>
                  <h3 className="font-[var(--font-heading)] italic text-white text-lg mb-2">{title}</h3>
                  <p className="font-[var(--font-body)] font-light text-white/60 text-sm mb-4 flex-1">{desc}</p>
                  <Code>{code as string}</Code>
                </div>
              </R>
            ))}
          </div>
          <R>
            <h3 className="font-[var(--font-heading)] italic text-white text-xl mb-4">Veredictos do QA</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[['PASS', '#22c55e', 'Tudo certo. Vai pro DevOps.'], ['CONCERNS', '#f59e0b', 'Problemas menores. Segue, mas registrados.'], ['FAIL', '#ef4444', 'Problemas serios. Volta pro Dev.'], ['WAIVED', '#7c6aef', 'Aceito com justificativa.']].map(([v, c, d]) => (
                <div key={v} className="liquid-glass rounded-xl p-4 text-center">
                  <div className="font-mono font-bold text-sm mb-1" style={{ color: c as string }}>{v}</div>
                  <p className="font-[var(--font-body)] font-light text-white/60 text-xs">{d}</p>
                </div>
              ))}
            </div>
          </R>
        </div>
      </section>

      <div className="section-divider" />

      {/* WORKFLOWS */}
      <section className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <SectionBg variant="warm" pattern="dots" />
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <SH tag="Quando usar o que" title="4 workflows" desc="Cada situacao tem um workflow. Escolha o certo e o AIOX faz o resto." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ['Story Development Cycle', 'O padrao para tudo', '#4a7dff', 'Feature nova, bug fix. 4 fases: SM cria, PO valida, Dev implementa, QA revisa.', '@sm *create-story\n@dev *develop 1.1\n@qa *gate 1.1'],
              ['QA Loop', 'QA encontrou problemas', '#22c55e', 'Ciclo revisao-correcao. Max 5 rodadas. Se nao resolver, escala.', '@qa *qa-loop 1.1\n# revisa > corrige > repete'],
              ['Spec Pipeline', 'Feature complexa', '#7c6aef', 'Transforma ideia em spec executavel. Avalia complexidade e gera plano.', '@pm *create-prd\n@architect *assess\n# SIMPLE/STANDARD/COMPLEX'],
              ['Brownfield Discovery', 'Projeto existente', '#f59e0b', 'Assessment de 10 fases para projetos legados. Mapeia tudo.', '@architect *discover\n@data-engineer *audit\n@qa *brownfield-gate'],
            ].map(([title, sub, c, desc, code], i) => (
              <R key={i}>
                <AnimatedBorder radius={20} duration={5} width={1} colors={[c as string, 'transparent', c as string]} hoverOnly>
                <div className="liquid-glass rounded-2xl p-5 sm:p-7 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ background: c as string }} />
                    <h3 className="font-[var(--font-heading)] italic text-white text-base sm:text-lg">{title}</h3>
                  </div>
                  <p className="font-[var(--font-body)] font-medium text-white/40 text-xs mb-2">{sub}</p>
                  <p className="font-[var(--font-body)] font-light text-white/60 text-sm mb-4 flex-1">{desc}</p>
                  <Code title="Comandos">{code as string}</Code>
                </div>
                </AnimatedBorder>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <VideoSection src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8" minHeight="600px">
        <h2 className="font-[var(--font-heading)] italic text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.9] mb-4 px-4">Comece agora.</h2>
        <p className="font-[var(--font-body)] font-light text-white/60 text-sm max-w-lg mb-8 px-4">Um comando instala tudo. 12 agentes prontos.</p>
        <div className="max-w-md w-full px-4"><Code title="Instalacao">{`npx aiox-core@latest install\nnpx aiox-core doctor\n@dev *develop 1.1 yolo`}</Code></div>
      </VideoSection>

      <div className="section-divider" />

      {/* INSTALAR */}
      <section id="instalar" className="py-16 sm:py-28 px-4 sm:px-6 relative overflow-hidden">
        <SectionBg variant="purple" pattern="lines" />
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <SH tag="Getting Started" title="Como instalar" desc="3 passos." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[['1', 'Instalar', '#4a7dff', 'npx aiox-core@latest install', 'Wizard interativo configura IDE, tech stack, agentes e regras.'],
              ['2', 'Diagnosticar', '#22c55e', 'npx aiox-core doctor', '15 checks: Node.js, configs, agentes, hooks, registry. --fix corrige.'],
              ['3', 'Trabalhar', '#7c6aef', '@dev *develop 1.1 yolo', 'Ative um agente, de um comando, deixe a IA seguir as regras.']].map(([n, title, c, code, desc], i) => (
              <R key={i}>
                <div className="liquid-glass rounded-2xl p-5 sm:p-7 h-full">
                  <div className="w-10 h-10 rounded-[10px] flex items-center justify-center font-[var(--font-heading)] italic text-lg mb-4" style={{ background: `${c}22`, color: c as string }}>{n}</div>
                  <h3 className="font-[var(--font-heading)] italic text-white text-lg mb-2">{title}</h3>
                  <p className="font-[var(--font-body)] font-light text-white/60 text-sm mb-4">{desc}</p>
                  <Code>{code as string}</Code>
                </div>
              </R>
            ))}
          </div>
          <R className="mt-8">
            <div className="flex gap-3 justify-center flex-wrap">
              <AnimatedBorder radius={9999} duration={3} width={1} colors={['#7c6aef', '#4a7dff', '#06b6d4', '#22c55e', '#7c6aef']}>
                <a href="https://github.com/SynkraAI/aios-core" target="_blank" className="liquid-glass-strong rounded-full px-7 py-3 text-white font-medium text-sm inline-flex items-center gap-2 font-[var(--font-body)]">GitHub {I.arrow}</a>
              </AnimatedBorder>
              <a href="#o-que-e" className="bg-white text-black rounded-full px-7 py-3 font-semibold text-sm hover:bg-white/90 transition-all font-[var(--font-body)]">Voltar ao topo</a>
            </div>
          </R>
        </div>
      </section>

      <footer className="relative overflow-hidden py-16 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-[#06060c] to-[#030305] pointer-events-none" />
        <div className="absolute inset-0 bg-dot-grid pointer-events-none" />
        <div className="absolute top-0 left-0 right-0"><div className="section-divider" /></div>
        <div className="relative z-10">
          <p className="font-[var(--font-body)] text-white/40 text-xs">Synkra AIOX v5.0.3 — CLI First &middot; Observability Second &middot; UI Third</p>
          <p className="font-[var(--font-body)] text-white/40 text-xs mt-2"><a href="https://github.com/SynkraAI/aios-core" target="_blank" className="text-[var(--color-accent)] hover:underline">GitHub</a> &middot; <a href="https://www.npmjs.com/package/aiox-core" target="_blank" className="text-[var(--color-accent)] hover:underline">npm</a></p>
        </div>
      </footer>
    </div>
  )
}
