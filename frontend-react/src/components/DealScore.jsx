export function DealScore({ score, model, benchmark, isBenchmark, pricePerGB, ramType }) {
  if (score === null || score === undefined) return null

  const isRam = pricePerGB !== undefined && pricePerGB !== null
  const label = isRam ? 'EUR/GB' : isBenchmark ? 'P/L' : 'Deal'

  const color      = score >= 70 ? '#10b981' : score >= 40 ? '#f59e0b' : '#ef4444'
  const bgColor    = score >= 70 ? 'rgba(16,185,129,0.13)'  : score >= 40 ? 'rgba(245,158,11,0.13)'  : 'rgba(239,68,68,0.13)'
  const borderClr  = score >= 70 ? 'rgba(16,185,129,0.38)'  : score >= 40 ? 'rgba(245,158,11,0.38)'  : 'rgba(239,68,68,0.38)'
  const glowColor  = score >= 70 ? 'rgba(16,185,129,0.28)'  : score >= 40 ? 'rgba(245,158,11,0.28)'  : 'rgba(239,68,68,0.28)'

  const tooltip = isRam
    ? `Preis/GB: ${pricePerGB.toFixed(2)} EUR\n${model || ''}${ramType ? ` (${ramType})` : ''}\nScore: ${score}/100`
    : isBenchmark
    ? `Preis-Leistung: ${score}/100${model ? `\nModell: ${model}` : ''}${benchmark ? `\nBenchmark: ${benchmark} Pkt.` : ''}`
    : `Deal Score: ${score}/100 – relativ zu allen Angeboten`

  return (
    <div
      className="flex flex-col items-center justify-center w-12 h-12 rounded-xl font-bold cursor-help transition-transform duration-200 hover:scale-110 shrink-0"
      style={{
        backgroundColor: bgColor,
        color,
        border: `1px solid ${borderClr}`,
        boxShadow: `0 0 16px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.08)`,
      }}
      title={tooltip}
    >
      <span className="text-[15px] leading-none font-black">{score}</span>
      <span className="text-[8px] font-bold leading-none mt-0.5 tracking-wide uppercase opacity-80">{label}</span>
    </div>
  )
}
