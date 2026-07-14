import { useEffect, useState } from 'react'
import { CloudSun, Droplets, Wind } from 'lucide-react'

// Free, key-less forecast from Open-Meteo (Colombo by default — edit lat/lon)
export default function WeatherWidget() {
  const [w, setW] = useState(null)
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=6.93&longitude=79.86&current=temperature_2m,relative_humidity_2m,wind_speed_10m')
      .then(r => r.json()).then(d => setW(d.current)).catch(() => {})
  }, [])

  return (
    <div className="glass flex items-center gap-4 px-5 py-3 text-sm">
      <CloudSun className="text-gold" size={26} />
      {w ? (
        <>
          <span className="font-display text-2xl font-semibold">{Math.round(w.temperature_2m)}°C</span>
          <span className="muted flex items-center gap-1"><Droplets size={14} /> {w.relative_humidity_2m}%</span>
          <span className="muted flex items-center gap-1"><Wind size={14} /> {Math.round(w.wind_speed_10m)} km/h</span>
          <span className="muted max-sm:hidden">Campus weather</span>
        </>
      ) : <span className="muted">Loading campus weather…</span>}
    </div>
  )
}
