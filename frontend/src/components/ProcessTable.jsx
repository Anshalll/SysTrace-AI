import Icon from './Icon'

const categories = [
  { id: 'all', label: 'All processes' },
  { id: 'connected', label: 'Network activity' },
  { id: 'idle', label: 'No connections' },
  { id: 'restricted', label: 'Restricted' },
]

function ProcessTable({
  processes,
  totalProcesses,
  counts,
  activeCategory,
  onCategoryChange,
  query,
  onQueryChange,
  isLoading,
  error,
  lastUpdated,
  selectedPid,
  onSelectProcess,
}) {
  const updatedLabel = error
    ? 'Agent unavailable'
    : lastUpdated
      ? `Updated ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`
      : 'Waiting for scan'

  return (
    <section className="overflow-hidden rounded-[11px] border border-[#272832] bg-[#12131a]/90 shadow-[0_12px_32px_rgba(0,0,0,0.1)]">
      <div className="flex flex-col items-start justify-between gap-4 px-4 pb-3 pt-4 sm:flex-row sm:items-center lg:px-5 lg:pb-4 lg:pt-[19px]">
        <div>
          <div className="flex items-center gap-[9px]">
            <h2 className="font-['Manrope'] text-sm font-semibold tracking-[-0.2px] text-[#e9e9f0]">Running processes</h2>
            <span className="grid h-[19px] min-w-[22px] place-items-center rounded-[10px] border border-[#343543] bg-[#20212b] px-1.5 text-[9px] font-semibold text-[#a9a9b5]">{processes.length}</span>
          </div>
          <p className="mt-1.5 text-[10.5px] text-[#777987]">Explore process activity and inspect individual connections.</p>
        </div>
        <label className="flex h-[34px] w-full items-center gap-2 rounded-lg border border-[#30313d] bg-[#101117] px-[10px] text-[#777987] transition focus-within:border-[#7663a7] sm:w-[248px]">
          <Icon name="search" size={17} />
          <input
            className="min-w-0 flex-1 bg-transparent text-[10.5px] text-[#e4e3eb] outline-none placeholder:text-[#696b7a]"
            type="search"
            placeholder="Search processes…"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            aria-label="Search processes"
          />
          {query && (
            <button className="grid place-items-center text-[#838594] hover:text-white" type="button" aria-label="Clear search" onClick={() => onQueryChange('')}>
              <Icon name="close" size={14} />
            </button>
          )}
        </label>
      </div>

      <div className="flex gap-4 overflow-x-auto border-b border-[#262731] px-4 sm:gap-[21px] lg:px-5">
        {categories.map((category) => (
          <button
            className={`relative flex shrink-0 items-center gap-[7px] py-[10px] text-[9px] transition sm:text-[10px] ${
              activeCategory === category.id ? 'text-[#c4b5fd] after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-[#a78bfa]' : 'text-[#858795] hover:text-[#c6c6d1]'
            }`}
            key={category.id}
            type="button"
            role="tab"
            aria-selected={activeCategory === category.id}
            onClick={() => onCategoryChange(category.id)}
          >
            {category.label}
            <span className={`min-w-[17px] rounded-lg px-1 py-0.5 text-center text-[8px] ${activeCategory === category.id ? 'bg-violet-400/15 text-[#b8a4fa]' : 'bg-[#24252e] text-[#8c8e9b]'}`}>{counts[category.id]}</span>
          </button>
        ))}
      </div>

      <div className="max-h-[455px] overflow-auto [scrollbar-color:#383943_transparent] [scrollbar-width:thin]">
        <table className="w-full min-w-[670px] border-collapse text-left">
          <thead className="sticky top-0 z-[1] bg-[#14151c]">
            <tr>
              {['PROCESS', 'PID', 'EXECUTABLE PATH', 'CONNECTIONS', 'STATUS'].map((heading) => (
                <th className="h-9 px-[13px] text-[8px] font-bold tracking-[0.75px] text-[#656876] first:pl-5" key={heading}>{heading}</th>
              ))}
              <th className="w-[35px]" aria-label="Details" />
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td className="h-[190px] text-center text-[10px] text-[#777987]" colSpan="6"><span className="mx-auto mb-2 block size-[17px] animate-spin rounded-full border-2 border-[#383744] border-t-[#a78bfa]" />Scanning running processes…</td></tr>
            ) : processes.length === 0 ? (
              <tr>
                <td className="h-[190px] text-center" colSpan="6">
                  <span className="mx-auto mb-2 grid size-[31px] place-items-center rounded-[9px] bg-[#22232c] text-[#9b9cac]"><Icon name="search" /></span>
                  <strong className="block text-[11px] font-semibold text-[#cdced8]">No processes found</strong>
                  <span className="mt-1 block text-[10px] text-[#777987]">Try a different search or filter.</span>
                </td>
              </tr>
            ) : processes.map((process) => {
              const isSelected = selectedPid === process.pid
              const processName = process.name?.trim() || 'Unnamed process'
              const avatarColor = {
                connected: 'border-teal-300/20 bg-teal-300/10 text-[#69d6cb]',
                idle: 'border-[#2e303c] bg-[#20212a] text-[#a0a2b1]',
                restricted: 'border-amber-300/20 bg-amber-300/10 text-[#edbd72]',
              }[process.category]
              const badgeColor = {
                connected: 'border-teal-300/15 bg-teal-300/[0.07] text-[#7dd8d0] before:bg-[#4fd1c5]',
                idle: 'border-[#30313a] bg-[#1e2028] text-[#a6a7b3] before:bg-[#858895]',
                restricted: 'border-amber-300/20 bg-amber-300/[0.07] text-[#e9bb78] before:bg-[#e9b665]',
              }[process.category]

              return (
                <tr
                  className={`h-12 cursor-pointer border-t border-[#282933]/80 transition hover:bg-violet-300/[0.04] ${isSelected ? 'bg-violet-300/[0.07] shadow-[inset_2px_0_#a78bfa]' : ''}`}
                  key={`${process.pid}-${process.category}`}
                  onClick={() => onSelectProcess(isSelected ? null : process)}
                  aria-selected={isSelected}
                >
                  <td className="max-w-0 pl-5 pr-[13px]">
                    <div className="flex min-w-0 items-center gap-[9px]">
                      <span className={`grid size-[27px] shrink-0 place-items-center rounded-[7px] border text-[10px] font-bold ${avatarColor}`}>
                        {process.category === 'restricted' ? <Icon name="shield" size={15} /> : processName.charAt(0).toUpperCase()}
                      </span>
                      <span className="truncate text-[10.5px] font-medium text-[#d9d9e2]" title={processName}>{processName}</span>
                    </div>
                  </td>
                  <td className="px-[13px] font-mono text-[10px] tabular-nums text-[#9a9ba8]">{process.pid ?? '—'}</td>
                  <td className="max-w-0 px-[13px]"><span className="block truncate text-[10px] text-[#777987]" title={process.path || 'Path unavailable'}>{process.path || 'Path unavailable'}</span></td>
                  <td className="px-[13px]">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] tabular-nums ${process.info?.length ? 'text-[#b8b9c5]' : 'text-[#828492]'}`}>
                      <span className={`size-[5px] rounded-full ${process.info?.length ? 'bg-[#4fd1c5] shadow-[0_0_6px_rgba(79,209,197,0.36)]' : 'bg-[#4c4e5b]'}`} />
                      {process.info?.length ?? 0}
                    </span>
                  </td>
                  <td className="px-[13px]">
                    <span className={`inline-flex items-center gap-[5px] rounded-[5px] border px-[7px] py-1 text-[8.5px] before:size-[5px] before:rounded-full before:content-[''] ${badgeColor}`}>
                      {process.category === 'connected' ? 'Active' : process.category === 'restricted' ? 'Restricted' : 'Idle'}
                    </span>
                  </td>
                  <td className="px-1">
                    <button
                      className="grid size-[26px] place-items-center rounded-md text-[#696b79] hover:bg-[#2a2934] hover:text-[#c2b3f0]"
                      type="button"
                      aria-label={`View ${processName} details`}
                      onClick={(event) => {
                        event.stopPropagation()
                        onSelectProcess(isSelected ? null : process)
                      }}
                    >
                      <Icon name="chevron" size={16} />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex min-h-[39px] flex-col justify-center gap-1 border-t border-[#272832] px-[13px] text-[8px] text-[#707280] sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:text-[9px]">
        <span>Showing <strong className="font-semibold text-[#aeb0bc]">{processes.length}</strong> of <strong className="font-semibold text-[#aeb0bc]">{totalProcesses}</strong> processes</span>
        <span className="flex items-center gap-[7px]"><span className={`size-[5px] rounded-full ${error ? 'bg-[#f07885]' : 'bg-[#56d99b] shadow-[0_0_10px_rgba(86,217,155,0.42)]'}`} />{updatedLabel}</span>
      </div>
    </section>
  )
}

export default ProcessTable
