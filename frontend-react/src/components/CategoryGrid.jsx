import { useState } from 'react'
import { ChevronDown, ChevronUp, Zap } from 'lucide-react'
import { CATEGORIES } from '../data/categories'

const COLOR_MAP = {
  'neon-cyan': {
    glow: 'rgba(0,229,255,0.06)',
    glowHover: 'rgba(0,229,255,0.15)',
    iconBg: 'rgba(0,229,255,0.08)',
    iconBorder: 'rgba(0,229,255,0.15)',
    iconColor: '#00e5ff',
    blobColor: '#00e5ff',
  },
  'electric-purple': {
    glow: 'rgba(124,58,237,0.06)',
    glowHover: 'rgba(124,58,237,0.15)',
    iconBg: 'rgba(124,58,237,0.08)',
    iconBorder: 'rgba(124,58,237,0.15)',
    iconColor: '#a78bfa',
    blobColor: '#7c3aed',
  },
  'emerald-glow': {
    glow: 'rgba(16,185,129,0.06)',
    glowHover: 'rgba(16,185,129,0.15)',
    iconBg: 'rgba(16,185,129,0.08)',
    iconBorder: 'rgba(16,185,129,0.15)',
    iconColor: '#10b981',
    blobColor: '#10b981',
  },
}

export function CategoryGrid({ onCategorySelect }) {
  const [expandedId, setExpandedId] = useState(null)

  const toggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xs font-semibold text-white/40 uppercase tracking-widest">Kategorien</h2>
        <div className="flex-1 h-px bg-[rgba(255,255,255,0.05)]" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {CATEGORIES.map((cat) => {
          const c = COLOR_MAP[cat.color] || COLOR_MAP['neon-cyan']
          const isExpanded = expandedId === cat.id
          const Icon = cat.icon

          return (
            <div key={cat.id} className="flex flex-col">
              {/* Kategorie-Karte */}
              <button
                onClick={() => toggle(cat.id)}
                className="group relative flex flex-col items-center gap-3 p-4 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] overflow-hidden cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-0.5 hover:border-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.04)] active:scale-[0.98] active:shadow-none"
                style={{
                  boxShadow: isExpanded ? `0 0 0 1px ${c.glowHover}` : undefined,
                }}
              >
                {/* Hover Glow Blob */}
                <div
                  className="absolute -top-10 -right-10 h-24 w-24 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"
                  style={{ backgroundColor: c.blobColor + '18' }}
                />

                {/* Icon */}
                <div
                  className="relative p-2.5 rounded-xl border transition-transform duration-200 group-hover:scale-105"
                  style={{
                    backgroundColor: c.iconBg,
                    borderColor: c.iconBorder,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: c.iconColor }} />
                </div>

                <span className="text-xs font-medium text-white/60 group-hover:text-white/80 text-center leading-tight transition-colors">
                  {cat.label}
                </span>

                {isExpanded
                  ? <ChevronUp className="w-3.5 h-3.5 text-white/25" />
                  : <ChevronDown className="w-3.5 h-3.5 text-white/25" />
                }
              </button>

              {/* Unterkategorien */}
              {isExpanded && (
                <div className="mt-1.5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-2 flex flex-col gap-0.5">
                  {cat.subcategories.map((sub) => {
                    const SubIcon = sub.icon
                    return (
                      <button
                        key={sub.id}
                        onClick={() => onCategorySelect(sub)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all duration-150 hover:bg-[rgba(255,255,255,0.05)] cursor-pointer group/sub"
                      >
                        <SubIcon className="w-3.5 h-3.5 text-white/30 group-hover/sub:text-white/60 transition-colors" />
                        <span className="text-xs text-white/45 group-hover/sub:text-white/75 transition-colors flex-1">
                          {sub.label}
                        </span>
                        {sub.benchmarkType && (
                          <Zap className="w-3 h-3 text-amber-400/50" title="Preis-Leistungs-Analyse verfügbar" />
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
