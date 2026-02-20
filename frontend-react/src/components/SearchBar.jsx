import { useState, useEffect, useRef } from 'react'
import { Search, MapPin, Loader2, X, Zap, Bell } from 'lucide-react'
import { FilterPanel } from './FilterPanel'

const RADIUS_OPTIONS = [
  { value: -1, label: 'Deutschlandweit' },
  { value: 0, label: 'Ganzer Ort' },
  { value: 5, label: '5 km' },
  { value: 10, label: '10 km' },
  { value: 20, label: '20 km' },
  { value: 30, label: '30 km' },
  { value: 50, label: '50 km' },
  { value: 100, label: '100 km' },
  { value: 150, label: '150 km' },
  { value: 200, label: '200 km' },
]

const POPULAR_SEARCHES = [
  'iPhone 15 Pro', 'PlayStation 5', 'MacBook Air', 'Samsung Galaxy S24', 'AirPods Pro', 'RTX 4070',
]

export function SearchBar({ onSearch, loading, activeCategory, onClearCategory, minPrice, maxPrice, onMinPriceChange, onMaxPriceChange, hasSearched, onSearchAlert, showImages, onShowImagesChange, includeEbay, onIncludeEbayChange }) {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [radius, setRadius] = useState(-1)
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef(null)

  const handleLocationChange = (e) => {
    const val = e.target.value
    setLocation(val)
    if (!val.trim()) {
      setRadius(-1)
    } else if (radius === -1) {
      setRadius(50)
    }
  }

  useEffect(() => {
    if (activeCategory) {
      setQuery('')
    }
  }, [activeCategory])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim() || activeCategory?.categoryId) {
      const effectiveLocation = radius === -1 ? '' : location
      const effectiveRadius = radius === -1 ? 50 : radius
      const sources = ['kleinanzeigen', ...(includeEbay ? ['ebay'] : [])]
      onSearch(query, effectiveLocation, effectiveRadius, sources)
    }
  }

  /* ---------------------------------------------------------------- Render */
  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Kategorie-Badge */}
      {activeCategory && (
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 bg-[#7c3aed]/15 border border-[#7c3aed]/25 text-[#a78bfa] text-[11px] font-semibold rounded-full px-3 py-1">
            {activeCategory.benchmarkType && <Zap className="w-3 h-3 text-amber-400" />}
            {activeCategory.label}
            <button
              type="button"
              onClick={onClearCategory}
              className="ml-1 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          </span>
          {activeCategory.benchmarkType && (
            <span className="text-[10px] text-amber-400/60">Preis-Leistungs-Analyse aktiv</span>
          )}
        </div>
      )}

      {/* Hero Search Input */}
      <div
        className={`relative rounded-2xl border transition-all duration-300 ${
          isFocused
            ? 'border-[rgba(0,229,255,0.3)] shadow-[inset_0_2px_20px_rgba(0,0,0,0.4),0_0_40px_rgba(0,229,255,0.08)] bg-[rgba(255,255,255,0.04)]'
            : 'border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.02)]'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-stretch gap-0">
          {/* Suchfeld */}
          <div className="relative flex-1 flex items-center">
            <Search
              className={`absolute left-4 w-4 h-4 transition-colors duration-200 ${isFocused ? 'text-[#00e5ff]' : 'text-white/30'}`}
            />
            <input
              ref={inputRef}
              type="text"
              placeholder={activeCategory ? `Suche in ${activeCategory.label}…` : 'Was suchst du?'}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full bg-transparent py-4 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none"
            />
          </div>

          {/* Trennlinie */}
          <div className="hidden sm:block w-px bg-[rgba(255,255,255,0.08)] self-stretch my-2" />

          {/* Ort */}
          <div className="relative flex items-center sm:w-44">
            <MapPin className="absolute left-4 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="PLZ oder Ort"
              value={location}
              onChange={handleLocationChange}
              className="w-full bg-transparent py-4 pl-11 pr-4 text-sm text-white placeholder-white/30 outline-none"
            />
          </div>

          {/* Umkreis */}
          <div className="hidden sm:block w-px bg-[rgba(255,255,255,0.08)] self-stretch my-2" />
          <div className="flex items-center sm:w-36">
            <select
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              disabled={!location.trim()}
              className={`w-full bg-transparent py-4 px-4 text-sm outline-none appearance-none cursor-pointer ${!location.trim() ? 'text-white/20 cursor-not-allowed' : 'text-white/70'}`}
            >
              {RADIUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#0a0a0a] text-white">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Such-Button */}
          <div className="p-2 flex items-center">
            <button
              type="submit"
              disabled={loading || (!query.trim() && !activeCategory?.categoryId)}
              className="flex items-center justify-center gap-2 w-full sm:w-auto bg-[#00e5ff] hover:bg-[#00e5ff]/90 active:scale-95 text-black font-semibold rounded-xl py-2.5 px-5 text-sm transition-all duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.25)]"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>Finden</span>
            </button>
          </div>
        </div>
      </div>

      {/* Popular Searches — nur wenn noch nicht gesucht */}
      {!hasSearched && !activeCategory && (
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-[11px] text-white/30">Beliebt:</span>
          {POPULAR_SEARCHES.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => { setQuery(term); inputRef.current?.focus() }}
              className="text-[11px] text-white/40 hover:text-[#00e5ff] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,229,255,0.2)] rounded-full px-2.5 py-1 transition-all duration-200 cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>
      )}

      {/* Filter + Alert */}
      <div className="flex items-center justify-between mt-3">
        <FilterPanel
          minPrice={minPrice}
          maxPrice={maxPrice}
          onMinPriceChange={onMinPriceChange}
          onMaxPriceChange={onMaxPriceChange}
          showImages={showImages}
          onShowImagesChange={onShowImagesChange}
          includeEbay={includeEbay}
          onIncludeEbayChange={onIncludeEbayChange}
        />
        {hasSearched && (
          <button
            type="button"
            onClick={onSearchAlert}
            className="flex items-center gap-1.5 text-xs text-white/40 hover:text-[#00e5ff] transition-colors cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5" />
            Suchalarm einrichten
          </button>
        )}
      </div>
    </form>
  )
}
