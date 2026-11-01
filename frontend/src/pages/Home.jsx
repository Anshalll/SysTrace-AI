import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
}

const revealGroup = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const capabilities = [
  {
    icon: 'activity',
    tone: 'text-[#b9a2ff] bg-violet-300/[0.09] border-violet-300/10',
    title: 'Process visibility',
    description: 'See what is running, what is talking to the network, and what is staying quiet.',
  },
  {
    icon: 'cpu',
    tone: 'text-[#67d7c6] bg-teal-300/[0.08] border-teal-300/10',
    title: 'Resource awareness',
    description: 'Surface the processes and operating system services using the most resources.',
  },
  {
    icon: 'shield',
    tone: 'text-[#f2bf75] bg-amber-300/[0.08] border-amber-300/10',
    title: 'Trust & provenance',
    description: 'Distinguish trusted OS components from third-party apps and inspect executable paths and signatures.',
  },
  {
    icon: 'network',
    tone: 'text-[#83b6ff] bg-blue-300/[0.08] border-blue-300/10',
    title: 'Network context',
    description: 'Understand remote IP ownership with ASN lookups and put connections into context.',
  },
  {
    icon: 'scan',
    tone: 'text-[#f08d9e] bg-rose-300/[0.08] border-rose-300/10',
    title: 'Behavior detection',
    description: 'Highlight unusual network behavior that deserves a closer look.',
  },
  {
    icon: 'sparkles',
    tone: 'text-[#b9a2ff] bg-violet-300/[0.09] border-violet-300/10',
    title: 'AI investigation',
    description: 'Investigate unknown or suspicious processes and get findings explained in plain language.',
  },
]

const workflow = [
  { number: '01', title: 'Observe', description: 'See the processes, services, resources, and connections active on your device.' },
  { number: '02', title: 'Understand', description: 'Add trust, executable signature, resource, and network ownership context.' },
  { number: '03', title: 'Correlate', description: 'Connect related process and network signals to bring unusual behavior into focus.' },
  { number: '04', title: 'Explain', description: 'Use AI-assisted investigation to turn suspicious or unknown activity into understandable findings.' },
]

function CapabilityIcon({ name }) {
  const paths = {
    activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    cpu: <><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M9 1v3m6-3v3M9 20v3m6-3v3M20 9h3m-3 6h3M1 9h3m-3 6h3M10 10h4v4h-4z" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
    network: <><rect x="9" y="2" width="6" height="6" rx="1.5" /><rect x="2" y="16" width="6" height="6" rx="1.5" /><rect x="16" y="16" width="6" height="6" rx="1.5" /><path d="M12 8v4m-7 4v-2h14v2" /></>,
    scan: <><path d="M4 8V5a1 1 0 0 1 1-1h3m8 0h3a1 1 0 0 1 1 1v3m0 8v3a1 1 0 0 1-1 1h-3m-8 0H5a1 1 0 0 1-1-1v-3" /><path d="M4 12h16" /></>,
    sparkles: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" /><path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z" /></>,
  }

  return (
    <svg aria-hidden="true" className="size-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

function ProductPreview() {
  const shouldReduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useSpring(pointerX, { stiffness: 170, damping: 22, mass: 0.6 })
  const rotateY = useSpring(pointerY, { stiffness: 170, damping: 22, mass: 0.6 })

  function handlePointerMove(event) {
    if (shouldReduceMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    pointerX.set(y * -7)
    pointerY.set(x * 9)
  }

  function resetTilt() {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    <div className="relative mx-auto w-full max-w-[500px] [perspective:1200px]">
      <motion.div
        className="absolute -inset-10 rounded-full bg-violet-500/[0.08] blur-[70px]"
        animate={shouldReduceMotion ? undefined : { opacity: [0.55, 0.9, 0.55], scale: [0.96, 1.06, 0.96] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="relative overflow-hidden rounded-[18px] border border-white/[0.09] bg-[#11121a]/95 shadow-[0_35px_100px_rgba(0,0,0,0.5)] [transform-style:preserve-3d]"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 26, rotateY: -8, rotateX: 4 }}
        animate={{ opacity: 1, y: 0, rotateY: 0, rotateX: 0 }}
        transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        style={shouldReduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
      >
        <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-[9px] border border-violet-300/20 bg-violet-300/10 text-[#b8a2ff]"><Icon name="activity" size={17} /></span>
            <div><div className="text-[11px] font-semibold text-[#e4e3ec]">System overview</div><div className="mt-0.5 text-[9px] text-[#747686]">Local device monitor</div></div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-300/10 bg-emerald-300/[0.06] px-2.5 py-1 text-[9px] text-[#70d6a0]"><span className="size-1.5 rounded-full bg-[#58d796]" /> Monitoring</span>
        </div>

        <div className="grid grid-cols-3 gap-2.5 p-4">
          {[['Processes', '318', '#b49aff'], ['Connections', '184', '#63d2c5'], ['Listening', '29', '#efbd73']].map(([label, value, color]) => (
            <div className="rounded-[10px] border border-white/[0.06] bg-white/[0.025] px-3 py-3" key={label}>
              <span className="text-[9px] text-[#858796]">{label}</span>
              <div className="mt-1.5 font-['Manrope'] text-[21px] font-bold tracking-[-.7px]" style={{ color }}>{value}</div>
            </div>
          ))}
        </div>

        <div className="mx-4 overflow-hidden rounded-[10px] border border-white/[0.06]">
          <div className="grid grid-cols-[1.2fr_.7fr_.65fr] border-b border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[8px] font-bold tracking-[.7px] text-[#686a79]">
            <span>PROCESS</span><span>CONNECTIONS</span><span>TRUST</span>
          </div>
          {[
            { name: 'systemd', detail: 'System service', status: 'Trusted', tone: 'text-[#70d6a0]', mark: 'S', iconTone: 'bg-violet-300/10 text-[#b8a2ff]' },
            { name: 'browser', detail: '3 active connections', status: 'Verified', tone: 'text-[#70d6a0]', mark: 'B', iconTone: 'bg-teal-300/10 text-[#6bd6ca]' },
            { name: 'unknown-task', detail: 'Unusual outbound traffic', status: 'Review', tone: 'text-[#efbd73]', mark: '?', iconTone: 'bg-amber-300/10 text-[#efbd73]' },
          ].map((row) => (
            <div className="grid grid-cols-[1.2fr_.7fr_.65fr] items-center border-b border-white/[0.045] px-3 py-[11px] last:border-0" key={row.name}>
              <div className="flex min-w-0 items-center gap-2">
                <span className={`grid size-7 shrink-0 place-items-center rounded-[7px] text-[9px] font-bold ${row.iconTone}`}>{row.mark}</span>
                <div className="min-w-0"><div className="truncate text-[9.5px] font-medium text-[#d3d3de]">{row.name}</div><div className="mt-0.5 truncate text-[8px] text-[#747686]">{row.detail}</div></div>
              </div>
              <span className="text-[9px] text-[#a0a1ae]">{row.name === 'systemd' ? '—' : row.name === 'browser' ? '3' : '1'}</span>
              <span className={`text-[8.5px] ${row.tone}`}>{row.status}</span>
            </div>
          ))}
        </div>

        <div className="m-4 flex items-start gap-2.5 rounded-[9px] border border-amber-200/[0.12] bg-amber-200/[0.04] p-3">
          <Icon name="sparkles" size={15} className="mt-0.5 shrink-0 text-[#d1a96e]" />
          <div><div className="text-[9px] font-semibold text-[#e5ca9f]">Worth a closer look</div><p className="mt-1 text-[8.5px] leading-relaxed text-[#99909a]">An unfamiliar process is making an outbound connection. Review its path and network context.</p></div>
        </div>
      </motion.div>
      <motion.div
        className="absolute -bottom-5 -left-7 hidden items-center gap-2.5 rounded-xl border border-white/[0.09] bg-[#191923] px-3.5 py-3 shadow-xl sm:flex"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12, x: -8 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
      >
        <span className="grid size-8 place-items-center rounded-lg bg-emerald-300/[0.08] text-[#70d6a0]"><Icon name="shield" size={16} /></span>
        <div><div className="text-[9px] font-semibold text-[#d7d6e0]">Built for clarity</div><div className="mt-0.5 text-[8px] text-[#777987]">Findings you can understand</div></div>
      </motion.div>
    </div>
  )
}

function Home() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <main className="min-h-screen overflow-hidden bg-[#0c0d12] text-[#e7e9f1]">
      <motion.div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_68%_12%,rgba(106,77,184,0.12),transparent_38%)]"
        animate={shouldReduceMotion ? undefined : { opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.header
        className="relative z-10 mx-auto flex h-[76px] max-w-[1200px] items-center justify-between px-5 sm:px-8"
        initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        <Link className="flex items-center gap-2.5 text-[#f0eff7] no-underline" to="/">
          <span className="grid size-[34px] place-items-center rounded-[10px] border border-violet-300/25 bg-violet-300/10 text-[#b7a3ff]"><Icon name="activity" size={19} /></span>
          <span className="font-['Manrope'] text-[19px] font-extrabold tracking-[-1px]">SysTrace <span className="text-[#b8a2ff]">AI</span></span>
        </Link>
        <nav className="flex items-center gap-5 sm:gap-8" aria-label="Main navigation">
          <a className="hidden text-[11px] text-[#a1a2af] transition hover:text-white sm:inline" href="#capabilities">Capabilities</a>
          <a className="hidden text-[11px] text-[#a1a2af] transition hover:text-white sm:inline" href="#how-it-works">How it works</a>
          <Link className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/[0.11] bg-white/[0.04] px-3.5 text-[10px] font-semibold text-[#e6e5ed] transition hover:border-violet-300/30 hover:bg-violet-300/[0.08] sm:px-4 sm:text-[11px]" to="/dashboard">
            Open dashboard <Icon name="chevron" size={14} />
          </Link>
        </nav>
      </motion.header>

      <section className="relative z-[1] mx-auto grid max-w-[1200px] items-center gap-14 px-5 pb-[92px] pt-12 sm:px-8 sm:pt-[72px] lg:grid-cols-[1.04fr_.96fr] lg:gap-12 lg:pb-[122px] lg:pt-[76px]">
        <motion.div className="max-w-[570px]" variants={revealGroup} initial={shouldReduceMotion ? false : 'hidden'} animate="visible">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200/[0.13] bg-violet-200/[0.045] px-3 py-[7px] text-[9px] font-medium tracking-[.2px] text-[#c5b6f2] sm:text-[10px]">
            <span className="size-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_8px_rgba(167,139,250,.6)]" />
            AI-POWERED ENDPOINT INTELLIGENCE
          </div>
          <motion.h1 variants={reveal} className="font-['Manrope'] text-[clamp(42px,7vw,72px)] font-bold leading-[1.04] tracking-[-3.4px] text-[#f2f1f7]">
            Understand<br />what’s happening<br /><span className="bg-gradient-to-r from-[#c4b1ff] via-[#a994ee] to-[#70d8cd] bg-clip-text text-transparent">on your endpoint.</span>
          </motion.h1>
          <motion.p variants={reveal} className="mt-6 max-w-[480px] text-[13px] leading-[1.85] text-[#9294a3] sm:text-[14px]">
            SysTrace AI is an AI-powered endpoint security intelligence and monitoring platform. It observes, understands, correlates, and explains system activity so you can investigate what deserves a closer look.
          </motion.p>
          <motion.div variants={reveal} className="mt-8 flex flex-wrap items-center gap-3">
            <Link className="group inline-flex h-11 items-center gap-2.5 rounded-lg bg-[#a78bfa] px-5 text-[11px] font-bold text-[#171321] shadow-[0_8px_28px_rgba(167,139,250,0.19)] transition hover:bg-[#b9a3ff]" to="/dashboard">
              Explore the dashboard
              <Icon className="transition-transform group-hover:translate-x-0.5" name="chevron" size={15} />
            </Link>
            <a className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/[0.09] px-4 text-[11px] font-medium text-[#c2c2ce] transition hover:border-white/20 hover:bg-white/[0.03]" href="#capabilities">
              See what SysTrace AI does
            </a>
          </motion.div>
          <motion.div variants={reveal} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[9px] text-[#777987] sm:text-[10px]">
            <span className="inline-flex items-center gap-1.5"><Icon name="eye" size={13} className="text-[#70d6a0]" />Observe, don’t interfere</span>
            <span className="inline-flex items-center gap-1.5"><Icon name="network" size={13} className="text-[#a995eb]" />Correlated context</span>
            <span className="inline-flex items-center gap-1.5"><Icon name="sparkles" size={13} className="text-[#a995eb]" />AI-assisted explanations</span>
          </motion.div>
        </motion.div>

        <ProductPreview />
      </section>

      <section id="capabilities" className="relative z-[1] border-y border-white/[0.055] bg-[#101117]/75">
        <div className="mx-auto max-w-[1200px] px-5 py-[76px] sm:px-8 sm:py-[92px]">
          <div className="mb-9 flex flex-col justify-between gap-4 sm:mb-11 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 text-[9px] font-bold tracking-[1.35px] text-[#a994e9]">A SYSTEM, MADE LEGIBLE</div>
              <h2 className="font-['Manrope'] text-[27px] font-semibold tracking-[-1.1px] text-[#eeedf4] sm:text-[34px]">From raw activity to real context.</h2>
            </div>
            <p className="max-w-[340px] text-[11px] leading-[1.8] text-[#858796]">One place to see what’s active, what it’s connected to, and what you may want to investigate.</p>
          </div>

          <motion.div
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            variants={revealGroup}
            initial={shouldReduceMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {capabilities.map((feature, index) => (
              <motion.article variants={reveal} className="group rounded-xl border border-white/[0.065] bg-[#15161e]/80 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-white/[0.12] hover:bg-[#191a23]" key={feature.title}>
                <div className="mb-5 flex items-center justify-between">
                  <span className={`grid size-10 place-items-center rounded-[11px] border ${feature.tone}`}><CapabilityIcon name={feature.icon} /></span>
                  <span className="font-mono text-[9px] text-[#535563]">0{index + 1}</span>
                </div>
                <h3 className="font-['Manrope'] text-[13px] font-semibold text-[#dfdee8]">{feature.title}</h3>
                <p className="mt-2 text-[10.5px] leading-[1.8] text-[#858796]">{feature.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className="relative z-[1] mx-auto max-w-[1200px] px-5 py-[76px] sm:px-8 sm:py-[92px]">
        <div className="mb-10 max-w-[560px]">
          <div className="mb-3 text-[9px] font-bold tracking-[1.35px] text-[#a994e9]">A CALMER WAY TO INVESTIGATE</div>
          <h2 className="font-['Manrope'] text-[27px] font-semibold tracking-[-1.1px] text-[#eeedf4] sm:text-[34px]">See it. Understand it. Then decide.</h2>
          <p className="mt-3 text-[11px] leading-[1.8] text-[#858796]">SysTrace AI is built to investigate and explain activity, not directly block threats.</p>
        </div>
        <motion.div
          className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
          variants={revealGroup}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {workflow.map((step, index) => (
            <motion.article variants={reveal} className={`relative rounded-xl border border-white/[0.065] bg-[#12131a]/75 p-5 sm:p-6 ${index < workflow.length - 1 ? 'md:after:absolute md:after:right-[-13px] md:after:top-[31px] md:after:z-[1] md:after:h-px md:after:w-[13px] md:after:bg-violet-300/20 md:after:content-[\'\']' : ''}`} key={step.number}>
              <div className="mb-5 flex items-center gap-3">
                <span className="font-mono text-[10px] text-[#a994e9]">{step.number}</span>
                <span className="h-px flex-1 bg-white/[0.07]" />
              </div>
              <h3 className="font-['Manrope'] text-[14px] font-semibold text-[#e3e2ea]">{step.title}</h3>
              <p className="mt-2 text-[10.5px] leading-[1.8] text-[#858796]">{step.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      <section className="relative z-[1] px-5 pb-[76px] sm:px-8 sm:pb-[92px]">
        <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-2xl border border-violet-200/[0.12] bg-[linear-gradient(110deg,rgba(100,77,158,0.2),rgba(22,22,32,0.94)_58%)] px-6 py-9 sm:px-10 sm:py-11">
          <div className="pointer-events-none absolute -right-10 -top-32 size-80 rounded-full bg-violet-500/[0.1] blur-[65px]" />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-[610px]">
              <div className="mb-2 text-[9px] font-bold tracking-[1.2px] text-[#b8a5f0]">START WITH THE FULL PICTURE</div>
              <h2 className="font-['Manrope'] text-[24px] font-semibold tracking-[-.8px] text-[#f0eff7] sm:text-[29px]">Take a closer look at your system.</h2>
              <p className="mt-2 text-[11px] leading-[1.7] text-[#9999a8]">Explore running processes and their network connections in the SysTrace AI dashboard.</p>
            </div>
            <Link className="group inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-[#eee8ff] px-4 text-[10px] font-bold text-[#201a2c] transition hover:bg-white" to="/dashboard">
              Go to dashboard <Icon className="transition-transform group-hover:translate-x-0.5" name="chevron" size={14} />
            </Link>
          </div>
        </div>
      </section>

      <footer className="relative z-[1] border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-5 py-5 text-[9px] text-[#676977] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link className="flex w-fit items-center gap-2 text-[#a5a4b1] no-underline" to="/">
            <span className="grid size-6 place-items-center rounded-md border border-violet-300/15 bg-violet-300/[0.06] text-[#aa98eb]"><Icon name="activity" size={14} /></span>
            <span className="font-['Manrope'] text-[11px] font-bold">SysTrace <span className="text-[#b8a2ff]">AI</span></span>
          </Link>
          <span>Observe, understand, correlate, explain.</span>
          <Link className="inline-flex w-fit items-center gap-1.5 text-[#a99ad6] transition hover:text-[#d4c8ff]" to="/dashboard">Open dashboard <Icon name="chevron" size={12} /></Link>
        </div>
      </footer>
    </main>
  )
}

export default Home
