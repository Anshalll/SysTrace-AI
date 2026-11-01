import Icon from './Icon'
import { Link, useLocation } from 'react-router-dom'

function Sidebar({ activeCategory, categoryCounts, error, isLoading, onSelectCategory }) {
  const { pathname } = useLocation()
  const isDashboard = pathname === '/dashboard'
  const navItems = [
    { id: 'connected', label: 'Network activity', icon: 'network', count: categoryCounts.connected },
    { id: 'restricted', label: 'Restricted', icon: 'shield' },
  ]

  return (
    <aside className="fixed inset-y-0 left-0 z-10 flex w-[60px] flex-col border-r border-[#20212b] bg-[#0f1016]/95 px-2 py-5 md:w-[248px] md:px-4 md:py-[27px]">
      <Link className="mb-[42px] flex w-fit items-center gap-[11px] text-[#f0eff7] no-underline md:mb-[49px] md:ml-[7px]" to="/" aria-label="SysTrace AI home">
        <span className="grid size-[35px] place-items-center rounded-[11px] border border-violet-300/30 bg-gradient-to-br from-violet-400/20 to-violet-950/10 text-[#b7a3ff]">
          <Icon name="activity" size={21} />
        </span>
        <span className="hidden font-['Manrope'] text-[18px] font-extrabold tracking-[-.8px] md:inline">SysTrace <span className="text-[#b8a2ff]">AI</span></span>
      </Link>

      <div className="mb-3 hidden pl-[11px] text-[10px] font-bold tracking-[1.15px] text-[#606271] md:block">WORKSPACE</div>
      <nav className="grid gap-[5px]" aria-label="Main navigation">
        <Link
          className={`flex min-h-[43px] items-center justify-center gap-3 rounded-lg border px-0 text-left text-xs transition md:justify-start md:px-[11px] ${
            pathname === '/' ? 'border-violet-300/10 bg-violet-400/10 text-[#c2b1ff]' : 'border-transparent text-[#9294a2] hover:bg-[#181922] hover:text-[#d7d6e0]'
          }`}
          to="/"
          title="Home"
          aria-current={pathname === '/' ? 'page' : undefined}
        >
          <Icon name="activity" className="shrink-0" />
          <span className="hidden md:inline">Home</span>
        </Link>
        <Link
          className={`flex min-h-[43px] items-center justify-center gap-3 rounded-lg border px-0 text-left text-xs transition md:justify-start md:px-[11px] ${
            isDashboard && activeCategory === 'all' ? 'border-violet-300/10 bg-violet-400/10 text-[#c2b1ff]' : 'border-transparent text-[#9294a2] hover:bg-[#181922] hover:text-[#d7d6e0]'
          }`}
          to="/dashboard"
          title="Overview"
          aria-current={isDashboard && activeCategory === 'all' ? 'page' : undefined}
        >
          <Icon name="grid" className="shrink-0" />
          <span className="hidden md:inline">Overview</span>
        </Link>
        {navItems.map((item) => (
          <button
            className={`flex min-h-[43px] items-center justify-center gap-3 rounded-lg border px-0 text-left text-xs transition md:justify-start md:px-[11px] ${
              isDashboard && activeCategory === item.id
                ? 'border-violet-300/10 bg-violet-400/10 text-[#c2b1ff]'
                : 'border-transparent text-[#9294a2] hover:bg-[#181922] hover:text-[#d7d6e0]'
            }`}
            key={item.id}
            type="button"
            onClick={() => onSelectCategory(item.id)}
            aria-current={activeCategory === item.id ? 'page' : undefined}
            title={item.label}
          >
            <Icon name={item.icon} className="shrink-0" />
            <span className="hidden md:inline">{item.label}</span>
            {item.count !== undefined && <span className="ml-auto hidden text-[11px] tabular-nums text-[#777989] md:inline">{item.count}</span>}
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="flex size-[38px] items-center justify-center gap-2 rounded-[10px] border border-[#272832] bg-[#14151c] px-0 md:h-auto md:w-auto md:justify-start md:px-[10px] md:py-[14px]">
          <span className={`size-[7px] shrink-0 rounded-full ${error ? 'bg-[#f07885]' : isLoading ? 'bg-[#f5b95f]' : 'bg-[#56d99b] shadow-[0_0_10px_rgba(86,217,155,0.42)]'}`} />
          <div className="hidden md:grid md:gap-[3px]">
            <strong className="text-[11.5px] font-semibold text-[#d4d4de]">Local agent</strong>
            <span className="text-[10.5px] text-[#777a89]">{error ? 'Connection unavailable' : isLoading ? 'Connecting…' : 'Monitoring this device'}</span>
          </div>
        </div>
        <div className="ml-2 mt-[19px] hidden text-[9px] font-bold tracking-[1px] text-[#555765] md:block">SYSTRACE AI <span className="px-[3px] text-[#888998]">·</span> ENDPOINT MONITOR</div>
      </div>
    </aside>
  )
}

export default Sidebar
