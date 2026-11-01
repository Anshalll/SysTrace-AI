function ErrorBanner({ error, onRetry }) {
  return (
    <div className="mb-[17px] flex items-center gap-3 rounded-[9px] border border-rose-300/20 bg-rose-950/20 px-[15px] py-[13px]" role="alert">
      <span className="grid size-[22px] shrink-0 place-items-center rounded-full bg-rose-300/10 text-[13px] font-bold text-[#f08a96]">!</span>
      <div className="grid gap-[3px]">
        <strong className="text-[11px] text-[#efc3c6]">Couldn’t load process data</strong>
        <span className="text-[10.5px] text-[#b28a8e]">{error} Make sure the local backend is running on port 5000.</span>
      </div>
      <button className="ml-auto shrink-0 rounded-md border border-rose-300/20 px-[9px] py-1.5 text-[10px] text-[#e4a4aa] hover:bg-rose-300/10" type="button" onClick={onRetry}>Try again</button>
    </div>
  )
}

export default ErrorBanner
