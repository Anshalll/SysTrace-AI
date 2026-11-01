import { Link } from 'react-router-dom'
import Icon from './Icon'

function LocalRunNotice({ error, onRetry }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-violet-300/[0.16] bg-[linear-gradient(135deg,rgba(93,70,146,0.16),rgba(18,19,26,0.96)_52%)] shadow-[0_24px_70px_rgba(0,0,0,0.22)]" role="alert">
      <div className="border-b border-white/[0.07] px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-amber-200/15 bg-amber-200/[0.07] text-[#edbd72]">
            <Icon name="network" size={21} />
          </span>
          <div className="min-w-0">
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-amber-200/10 bg-amber-200/[0.05] px-2.5 py-1 text-[9px] font-semibold tracking-wide text-[#e5bf7d]">
              <span className="size-1.5 rounded-full bg-[#edbd72]" />
              LOCAL AGENT NOT CONNECTED
            </span>
            <h2 className="font-['Manrope'] text-lg font-semibold tracking-[-.4px] text-[#f0eff7] sm:text-xl">
              Run SysTrace AI on your device
            </h2>
            <p className="mt-2 max-w-[690px] text-[11px] leading-[1.8] text-[#a2a3b1] sm:text-xs">
              This hosted page can’t inspect processes on your computer. SysTrace AI reads local system activity, so start both the backend agent and dashboard on the device you want to monitor.
            </p>
            {error && <p className="mt-2 break-words text-[10px] text-[#bd9298]">Connection detail: {error}</p>}
          </div>
        </div>
      </div>

      <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-7">
        <article className="rounded-xl border border-white/[0.07] bg-black/15 p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-md bg-violet-300/10 font-mono text-[9px] text-[#c2aff7]">01</span>
            <h3 className="text-[11px] font-semibold text-[#dfdee8]">Start the local backend</h3>
          </div>
          <p className="mb-3 text-[10px] leading-relaxed text-[#858796]">From the project root, install the Python packages and launch the process monitor:</p>
          <pre className="overflow-x-auto rounded-lg border border-white/[0.06] bg-[#0b0c11] px-3 py-2.5 font-mono text-[9px] leading-[1.8] text-[#c4b8e4]"><code>python -m pip install flask flask-cors psutil{'\n'}python backend/index.py</code></pre>
        </article>

        <article className="rounded-xl border border-white/[0.07] bg-black/15 p-4">
          <div className="mb-3 flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-md bg-teal-300/10 font-mono text-[9px] text-[#7cd6cc]">02</span>
            <h3 className="text-[11px] font-semibold text-[#dfdee8]">Run the dashboard locally</h3>
          </div>
          <p className="mb-3 text-[10px] leading-relaxed text-[#858796]">In a second terminal, start the frontend from its folder:</p>
          <pre className="overflow-x-auto rounded-lg border border-white/[0.06] bg-[#0b0c11] px-3 py-2.5 font-mono text-[9px] leading-[1.8] text-[#a9d8d1]"><code>cd frontend{'\n'}npm install{'\n'}npm run dev</code></pre>
        </article>
      </div>

      <div className="flex flex-col gap-3 border-t border-white/[0.07] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
        <p className="text-[10px] text-[#858796]">Then open <code className="rounded bg-black/20 px-1.5 py-1 font-mono text-[#c8b8f1]">http://localhost:5173/dashboard</code></p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.035] px-3 text-[10px] font-semibold text-[#d3d2de] transition hover:bg-white/[0.07]"
            type="button"
            onClick={onRetry}
          >
            <Icon name="refresh" size={14} /> Try connection again
          </button>
          <Link className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#a78bfa] px-3 text-[10px] font-bold text-[#171321] transition hover:bg-[#b9a3ff]" to="/">
            Back to home <Icon name="chevron" size={13} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LocalRunNotice
