import Icon from './Icon'
import { Link } from 'react-router-dom'

function DashboardHeader() {
  return (
    <header className="flex h-[58px] items-center justify-between border-b border-[#252630]/80 px-3 sm:px-5 lg:h-[68px] lg:px-[42px]">
      <div className="flex items-center gap-2.5 text-[11.5px] text-[#777a8a]">
        <Link className="text-inherit no-underline transition hover:text-[#c4b5fd]" to="/">Workspace</Link><Icon name="chevron" size={14} /><strong className="font-medium text-[#d3d4dd]">Overview</strong>
      </div>
      <div className="flex items-center gap-3 sm:gap-[19px]">
        <span className="flex items-center gap-[7px] text-[0px] text-[#858796] sm:text-[10.5px]"><Icon className="text-[#69cfa0]" name="shield" size={15} /> Local monitoring</span>
        <span className="grid size-[29px] place-items-center rounded-full border border-[#383141] bg-[#282131] text-[11px] font-bold text-[#d1b8ff]">A</span>
      </div>
    </header>
  )
}

export default DashboardHeader
