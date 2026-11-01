import Icon from './Icon'

function formatAddress(address) {
  if (!address) return '—'
  return `${address.ip}:${address.port}`
}

function getConnectionType(type) {
  if (type === '1') return 'TCP'
  if (type === '2') return 'UDP'
  return `Type ${type ?? '—'}`
}

function ProcessDetails({ process, onClose }) {
  const processName = process.name?.trim() || 'Unnamed process'
  const avatarColor = {
    connected: 'border-teal-300/20 bg-teal-300/10 text-[#69d6cb]',
    idle: 'border-[#2e303c] bg-[#20212a] text-[#a0a2b1]',
    restricted: 'border-amber-300/20 bg-amber-300/10 text-[#edbd72]',
  }[process.category]

  return (
    <section className="mt-4 overflow-hidden rounded-[11px] border border-[#272832] bg-[#12131a]/90 shadow-[0_12px_32px_rgba(0,0,0,0.1)]" aria-label={`${processName} connection details`}>
      <div className="flex items-center justify-between gap-5 border-b border-[#282933] px-4 py-4 sm:px-[19px]">
        <div className="flex min-w-0 items-center gap-[11px]">
          <span className={`grid size-[35px] shrink-0 place-items-center rounded-[9px] border text-xs font-bold ${avatarColor}`}>
            {process.category === 'restricted' ? <Icon name="shield" size={17} /> : processName.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <span className="mb-[3px] block text-[8px] font-bold tracking-[.9px] text-[#888092]">PROCESS DETAILS</span>
            <h2 className="mb-1 font-['Manrope'] text-sm font-semibold text-[#e9e9f0]">{processName}</h2>
            <span className="block max-w-[650px] truncate text-[9.5px] text-[#777987]">PID {process.pid ?? '—'} <span className="px-[5px] text-[#50515e]">·</span> {process.path || 'Path unavailable'}</span>
          </div>
        </div>
        <button className="grid size-7 shrink-0 place-items-center rounded-md border border-[#30313c] bg-[#1a1b23] text-[#999ba8] hover:bg-[#25232e] hover:text-[#d3c4ff]" type="button" aria-label="Close process details" onClick={onClose}>
          <Icon name="close" />
        </button>
      </div>

      {process.reason && <p className="flex min-h-[52px] items-center gap-2 px-[19px] text-[10px] text-[#d8b576]"><Icon name="shield" size={16} />{process.reason}</p>}

      {process.info?.length ? (
        <div className="overflow-x-auto">
          <div className="grid min-w-[530px] grid-cols-[1.2fr_1.2fr_.8fr_.5fr] items-center gap-3 border-b border-[#24252e] px-3 py-2 text-[8px] font-bold tracking-[.65px] text-[#686a78] sm:px-[19px]">
            <span>LOCAL ADDRESS</span><span>REMOTE ADDRESS</span><span>STATE</span><span>TYPE</span>
          </div>
          {process.info.map((connection, index) => (
            <div className="grid min-h-[37px] min-w-[530px] grid-cols-[1.2fr_1.2fr_.8fr_.5fr] items-center gap-3 border-b border-[#272831]/70 px-3 text-[9.5px] last:border-0 sm:px-[19px]" key={`${connection.laddr?.ip}-${connection.laddr?.port}-${index}`}>
              <span className="truncate font-mono text-[9px] tabular-nums text-[#aaaab7]">{formatAddress(connection.laddr)}</span>
              <span className="truncate font-mono text-[9px] tabular-nums text-[#aaaab7]">{formatAddress(connection.raddr)}</span>
              <span className={`text-[8.5px] ${connection.status === 'LISTEN' ? 'text-[#6fd0a0]' : 'text-[#999ba8]'}`}>{connection.status || 'UNKNOWN'}</span>
              <span className="text-[8.5px] text-[#8e90a0]">{getConnectionType(connection.type)}</span>
            </div>
          ))}
        </div>
      ) : !process.reason ? (
        <div className="flex min-h-[52px] items-center gap-2 px-[19px] text-[10px] text-[#858795]"><Icon name="network" size={17} />No active network connections for this process.</div>
      ) : null}
    </section>
  )
}

export default ProcessDetails
