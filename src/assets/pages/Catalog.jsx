import { useState, useMemo } from 'react'
import GUNS from '../data/guns.js'
import GunCard from '../components/GunCard.jsx'

const TYPES = ['All', ...new Set(GUNS.map((g) => g.type))]

function Catalog() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filtered = useMemo(() => {
    return GUNS.filter((gun) => {
      const matchesType = filter === 'All' || gun.type === filter
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        gun.name.toLowerCase().includes(q) ||
        gun.type.toLowerCase().includes(q) ||
        gun.caliber.toLowerCase().includes(q)
      return matchesType && matchesSearch
    })
  }, [search, filter])

  return (
    <>
      <section className="masthead">
        <h1 className="display">Hardware, by the spec sheet.</h1>
        <p className="lede">
          A small armory of pistols, rifles, and shotguns. Every piece listed with its
          type, caliber, and price — nothing else.
        </p>
      </section>

      <section>
        {/* Search & Filter bar */}
        <div className="toolbar">
          <div className="search-box">
            <svg className="search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search by name, type, or caliber…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                className="search-clear"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          <div className="filter-group">
            {TYPES.map((t) => (
              <button
                key={t}
                className={`filter-btn${filter === t ? ' filter-active' : ''}`}
                onClick={() => setFilter(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="list-head">
          <h2>Current stock</h2>
          <span className="count">{filtered.length} pieces</span>
        </div>

        {filtered.length > 0 ? (
          <ul className="stock">
            {filtered.map((gun) => (
              <GunCard key={gun.name} gun={gun} />
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <svg className="empty-icon" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="8" x2="14" y2="14" />
              <line x1="14" y1="8" x2="8" y2="14" />
            </svg>
            <p className="empty-title">No guns match</p>
            <p className="empty-sub">
              Try a different search term or change the type filter.
            </p>
          </div>
        )}
      </section>
    </>
  )
}

export default Catalog
