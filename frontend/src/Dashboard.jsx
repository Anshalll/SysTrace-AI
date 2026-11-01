import { useCallback, useEffect, useMemo, useState } from 'react'
import DashboardHeader from './components/DashboardHeader'
import ErrorBanner from './components/ErrorBanner'
import Icon from './components/Icon'
import LocalRunNotice from './components/LocalRunNotice'
import ProcessDetails from './components/ProcessDetails'
import ProcessTable from './components/ProcessTable'
import Sidebar from './components/Sidebar'
import StatsGrid from './components/StatsGrid'

const API_URL = 'http://localhost:5000'

function formatAddress(address) {
  if (!address) return '—'
  return `${address.ip}:${address.port}`
}

function App() {
  const [processes, setProcesses] = useState({
    process_with_connections: [],
    process_without_connections: [],
    process_unknown: [],
  })
  const [activeCategory, setActiveCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [selectedProcess, setSelectedProcess] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState(null)

  const refreshProcesses = useCallback(async (background = false) => {
    if (background) setIsRefreshing(true)
    else setIsLoading(true)
    setError('')

    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error(`The process service returned ${response.status}.`)
      }

      const payload = await response.json()
      const data = payload?.data
      if (
        !data ||
        !Array.isArray(data.process_with_connections) ||
        !Array.isArray(data.process_without_connections) ||
        !Array.isArray(data.process_unknown)
      ) {
        throw new Error('The process service returned an unexpected response.')
      }

      setProcesses(data)
      setLastUpdated(new Date())
      setSelectedProcess((current) => {
        if (!current) return null
        const refreshed = [
          ...data.process_with_connections.map((process) => ({ ...process, category: 'connected' })),
          ...data.process_without_connections.map((process) => ({ ...process, category: 'idle' })),
          ...data.process_unknown.map((process) => ({ ...process, category: 'restricted' })),
        ].find((process) => process.pid === current.pid)
        return refreshed ?? null
      })
    } catch (fetchError) {
      setError(fetchError instanceof Error ? fetchError.message : 'Unable to reach the process service.')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }, [])

  useEffect(() => {
    void Promise.resolve().then(() => refreshProcesses())
  }, [refreshProcesses])

  const allProcesses = useMemo(() => [
    ...processes.process_with_connections.map((process) => ({ ...process, category: 'connected' })),
    ...processes.process_without_connections.map((process) => ({ ...process, category: 'idle' })),
    ...processes.process_unknown.map((process) => ({ ...process, info: [], category: 'restricted' })),
  ], [processes])

  const connectionCount = processes.process_with_connections.reduce(
    (total, process) => total + (process.info?.length ?? 0),
    0,
  )
  const listeningCount = processes.process_with_connections.reduce(
    (total, process) => total + (process.info ?? []).filter((connection) => connection.status === 'LISTEN').length,
    0,
  )

  const visibleProcesses = useMemo(() => {
    const searchTerm = query.trim().toLowerCase()
    return allProcesses
      .filter((process) => activeCategory === 'all' || process.category === activeCategory)
      .filter((process) => {
        if (!searchTerm) return true
        const connectionText = (process.info ?? [])
          .flatMap((connection) => [formatAddress(connection.laddr), formatAddress(connection.raddr), connection.status])
          .join(' ')
        return `${process.name ?? ''} ${process.pid ?? ''} ${process.path ?? ''} ${process.reason ?? ''} ${connectionText}`
          .toLowerCase()
          .includes(searchTerm)
      })
      .sort((first, second) => (second.info?.length ?? 0) - (first.info?.length ?? 0))
  }, [activeCategory, allProcesses, query])

  const categoryCounts = {
    all: allProcesses.length,
    connected: processes.process_with_connections.length,
    idle: processes.process_without_connections.length,
    restricted: processes.process_unknown.length,
  }

  return (
    <div className="min-h-screen bg-[#0c0d12] text-[#e7e9f1]">
      <Sidebar
        activeCategory={activeCategory}
        categoryCounts={categoryCounts}
        error={error}
        isLoading={isLoading}
        onSelectCategory={setActiveCategory}
      />

      <main className="min-h-screen md:ml-[248px]">
        <DashboardHeader />

        <div className="mx-auto w-full max-w-[1530px] px-4 pb-6 pt-7 sm:px-7 lg:px-[42px] lg:pt-[38px]">
          <section className="mb-7 flex items-end justify-between gap-5">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[9px] font-bold tracking-[1.3px] text-[#9c8bd0]">
                <span className="size-1.5 rounded-full bg-[#a78bfa] shadow-[0_0_8px_rgba(167,139,250,0.55)]" />
                SYSTEM OVERVIEW
              </div>
              <h1 className="font-['Manrope'] text-[25px] font-bold leading-tight tracking-[-1.3px] text-[#f0eff5] sm:text-[32px]">
                Your device, <span className="text-[#a796d9]">in focus.</span>
              </h1>
              <p className="mt-2 text-xs text-[#858796]">
                Monitor running processes and their network connections in real time.
              </p>
            </div>
            <button
              className="inline-flex h-[37px] shrink-0 items-center gap-2 rounded-lg border border-[#333440] bg-[#171820] px-3 text-[11px] font-semibold text-[#dedee7] transition hover:border-[#62568b] hover:bg-[#1d1b29] disabled:cursor-wait disabled:opacity-70 max-sm:size-9 max-sm:justify-center max-sm:px-0"
              type="button"
              onClick={() => refreshProcesses(true)}
              disabled={isRefreshing}
            >
              <Icon name="refresh" className={`size-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="max-sm:hidden">{isRefreshing ? 'Refreshing…' : 'Refresh data'}</span>
            </button>
          </section>

          {error && import.meta.env.PROD ? (
            <LocalRunNotice error={error} onRetry={() => refreshProcesses(true)} />
          ) : (
            <>
              {error && <ErrorBanner error={error} onRetry={() => refreshProcesses(true)} />}

              <StatsGrid
                processCount={isLoading ? null : categoryCounts.all}
                connectionCount={isLoading ? null : connectionCount}
                listeningCount={isLoading ? null : listeningCount}
                agentStatus={error ? 'offline' : isLoading ? 'connecting' : 'monitoring'}
                lastUpdated={lastUpdated}
              />

              <ProcessTable
                processes={visibleProcesses}
                totalProcesses={categoryCounts.all}
                counts={categoryCounts}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                query={query}
                onQueryChange={setQuery}
                isLoading={isLoading}
                error={error}
                lastUpdated={lastUpdated}
                selectedPid={selectedProcess?.pid}
                onSelectProcess={setSelectedProcess}
              />

              {selectedProcess && (
                <ProcessDetails
                  process={selectedProcess}
                  onClose={() => setSelectedProcess(null)}
                />
              )}
            </>
          )}

          <footer className="flex flex-col gap-2 px-0.5 pt-5 text-[9px] text-[#595b69] sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-1.5 text-[8px] font-bold tracking-[0.65px]">
              <Icon name="terminal" size={14} />
              SYSTRACE AI · ENDPOINT INTELLIGENCE
            </span>
            <span>Process data stays on this device</span>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default App
