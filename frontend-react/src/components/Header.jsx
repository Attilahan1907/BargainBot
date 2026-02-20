import { Heart, Settings, Bell } from 'lucide-react'
import { useFavorites } from '../hooks/useFavorites'

export function Header({ onLogoClick, onWatchlistClick, onSettingsClick, onAlertsClick }) {
  const { favorites } = useFavorites()
  const favoritesCount = favorites.length

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <nav className="w-full max-w-4xl flex items-center justify-between gap-4 rounded-full border border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,10,0.7)] backdrop-blur-xl px-4 py-2.5">
        {/* Logo */}
        <button
          onClick={onLogoClick}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <img
            src="/logo.png"
            alt="BargainBot"
            className="w-8 h-8 rounded-xl object-cover"
          />
          <span className="text-sm font-semibold text-white/90 hidden sm:block">BargainBot</span>
        </button>

        {/* Rechte Seite: Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onSettingsClick}
            className="flex items-center justify-center w-9 h-9 rounded-full text-white/50 hover:text-white hover:bg-white/8 transition-all"
            title="Einstellungen"
          >
            <Settings className="w-4 h-4" />
          </button>

          <button
            onClick={onAlertsClick}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white hover:bg-white/8 transition-all"
            title="Meine Alerts"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="hidden sm:block">Alerts</span>
          </button>

          <button
            onClick={onWatchlistClick}
            className="relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium bg-[rgba(0,229,255,0.08)] border border-[rgba(0,229,255,0.15)] text-[#00e5ff] hover:bg-[rgba(0,229,255,0.15)] transition-all"
          >
            <Heart className="w-3.5 h-3.5" />
            <span className="hidden sm:block">Watchlist</span>
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  )
}
