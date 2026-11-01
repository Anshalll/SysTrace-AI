import Icon from './Icon'

const cards = [
  { key: 'processCount', label: 'Total processes', icon: 'layers', accent: 'violet', foot: 'Currently running on this device' },
  { key: 'connectionCount', label: 'Network connections', icon: 'network', accent: 'teal', foot: 'Across connected processes' },
  { key: 'listeningCount', label: 'Listening ports', icon: 'activity', accent: 'amber', foot: 'Waiting for incoming traffic' },
]

const accentStyles = {
  violet: { icon: 'bg-violet-400/10 text-[#b29cf8]', dot: 'bg-[#a78bfa]' },
  teal: { icon: 'bg-teal-300/10 text-[#5bd6ca]', dot: 'bg-[#4fd1c5]' },
  amber: { icon: 'bg-amber-300/10 text-[#f0bd71]', dot: 'bg-[#edb75d]' },
}

function StatsGrid({ processCount, connectionCount, listeningCount, agentStatus, lastUpdated }) {
  const values = { processCount, connectionCount, listeningCount }
  const statusLabel = { offline: 'Offline', connecting: 'Connecting', monitoring: 'Monitoring' }[agentStatus]
  const statusColor = agentStatus === 'offline' ? 'text-[#f08a96]' : agentStatus === 'connecting' ? 'text-[#f0bb62]' : 'text-[#72d6a2]'
  const statusDot = agentStatus === 'offline' ? 'bg-[#f07885]' : agentStatus === 'connecting' ? 'bg-[#f0bb62]' : 'bg-[#58d796]'

  return (
    <section className="mb-6 grid grid-cols-2 gap-[9px] lg:grid-cols-4 lg:gap-[13px]" aria-label="System statistics">
      {cards.map((card) => (
        <article className="min-w-0 rounded-[10px] border border-[#262832] bg-gradient-to-br from-[#191a23]/90 to-[#12131a]/95 p-[11px] shadow-[0_6px_20px_rgba(0,0,0,0.08)] sm:p-4 lg:min-h-[122px] lg:px-[17px] lg:py-4" key={card.key}>
          <div className="flex items-center justify-between text-[9px] font-medium text-[#a2a3af] sm:text-[10.5px]">
            {card.label}
            <span className={`grid size-[23px] place-items-center rounded-lg sm:size-[29px] ${accentStyles[card.accent].icon}`}><Icon name={card.icon} size={16} /></span>
          </div>
          <div className="my-2 font-['Manrope'] text-xl font-bold leading-none tracking-[-0.8px] text-[#f1f0f7] tabular-nums sm:text-[25px]">{values[card.key] === null ? '—' : values[card.key].toLocaleString()}</div>
          <div className="flex items-center gap-[7px] text-[8px] text-[#777987] sm:text-[9.5px]"><span className={`size-1.5 rounded-full ${accentStyles[card.accent].dot}`} />{card.foot}</div>
        </article>
      ))}
      <article className="min-w-0 rounded-[10px] border border-[#262832] bg-gradient-to-br from-[#191a23]/90 to-[#12131a]/95 p-[11px] shadow-[0_6px_20px_rgba(0,0,0,0.08)] sm:p-4 lg:min-h-[122px] lg:px-[17px] lg:py-4">
        <div className="flex items-center justify-between text-[9px] font-medium text-[#a2a3af] sm:text-[10.5px]">
          Agent status
          <span className="grid size-[23px] place-items-center rounded-lg bg-emerald-300/10 text-[#67d79f] sm:size-[29px]"><Icon name="shield" size={16} /></span>
        </div>
        <div className={`my-2 flex items-center gap-2 font-['Manrope'] text-[15px] font-bold leading-tight tracking-[-0.4px] sm:text-xl ${statusColor}`}>
          <span className={`size-2 rounded-full shadow-[0_0_0_4px_rgba(88,215,150,0.1)] ${statusDot}`} />{statusLabel}
        </div>
        <div className="text-[8px] text-[#777987] sm:text-[9.5px]">
          {lastUpdated ? `Last checked ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Waiting for first scan'}
        </div>
      </article>
    </section>
  )
}

export default StatsGrid
