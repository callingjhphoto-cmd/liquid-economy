import React, { useState, useMemo } from 'react'
import { ArrowUpDown, ChevronUp, ChevronDown, Search, Download } from 'lucide-react'

/**
 * DataTable — Sortable, filterable table component.
 * Tailwind-styled with navy + gold theme. Supports custom cell renderers.
 *
 * @param {Array<{key: string, label: string, sortable?: boolean, render?: function, align?: string, width?: string}>} columns
 * @param {Array<object>} data - Row data array
 * @param {boolean} [searchable=false] - Show search input
 * @param {string} [searchPlaceholder] - Placeholder for search input
 * @param {string} [searchKey] - Key to search against (defaults to first column key)
 * @param {string} [emptyMessage] - Message when no data
 * @param {boolean} [compact=false] - Compact row height
 * @param {function} [onRowClick] - Row click handler, receives row data
 * @param {boolean} [exportable=false] - Show CSV export button
 * @param {string} [exportFilename] - Custom filename for CSV export
 * @param {string} [className] - Additional wrapper classes
 */
export function DataTable({
  columns,
  data,
  searchable = false,
  searchPlaceholder = 'Search\u2026',
  searchKey,
  emptyMessage = 'No data available',
  compact = false,
  onRowClick,
  exportable = false,
  exportFilename,
  className = '',
}) {
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [search, setSearch] = useState('')

  const effectiveSearchKey = searchKey || (columns[0] && columns[0].key)

  const filteredData = useMemo(() => {
    let rows = [...data]

    // Search filter
    if (search && effectiveSearchKey) {
      const q = search.toLowerCase()
      rows = rows.filter(row => {
        const val = row[effectiveSearchKey]
        return val && String(val).toLowerCase().includes(q)
      })
    }

    // Sort
    if (sortKey) {
      rows.sort((a, b) => {
        const aVal = a[sortKey]
        const bVal = b[sortKey]
        if (aVal == null) return 1
        if (bVal == null) return -1
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDir === 'asc' ? aVal - bVal : bVal - aVal
        }
        const cmp = String(aVal).localeCompare(String(bVal))
        return sortDir === 'asc' ? cmp : -cmp
      })
    }

    return rows
  }, [data, search, effectiveSearchKey, sortKey, sortDir])

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const exportCSV = () => {
    const headers = columns.map(c => c.label).join(',')
    const rows = filteredData.map(row =>
      columns.map(c => {
        const val = row[c.key]
        const str = String(val ?? '')
        return str.includes(',') || str.includes('"') ? `"${str.replace(/"/g, '""')}"` : str
      }).join(',')
    )
    const csv = [headers, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = exportFilename || `liquid_economy_export_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const cellPadding = compact ? 'px-3 py-1.5' : 'px-3 py-2.5'

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
      {/* Toolbar: Search + Export */}
      {(searchable || exportable) && (
        <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
          {searchable && (
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-navy/30 focus:bg-white transition-colors"
              />
            </div>
          )}
          {exportable && (
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-navy bg-navy/5 hover:bg-navy/10 border border-navy/10 rounded-lg transition-colors whitespace-nowrap"
              title="Download CSV"
            >
              <Download size={12} />
              <span className="hidden sm:inline">Download CSV</span>
            </button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50 sticky top-0 bg-white z-10">
              {columns.map(col => (
                <th
                  key={col.key}
                  className={`${cellPadding} text-[10px] font-semibold text-gray-500 uppercase tracking-wider ${col.align === 'right' ? 'text-right' : ''} ${col.width || ''} ${col.sortable !== false ? 'cursor-pointer select-none hover:text-navy' : ''}`}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.label}
                    {col.sortable !== false && (
                      sortKey === col.key ? (
                        sortDir === 'asc' ? <ChevronUp size={10} /> : <ChevronDown size={10} />
                      ) : (
                        <ArrowUpDown size={10} className="opacity-30" />
                      )
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-8 text-center text-xs text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              filteredData.map((row, i) => (
                <tr
                  key={row.id || i}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`border-b border-gray-50 last:border-0 ${onRowClick ? 'cursor-pointer hover:bg-gray-50/50' : ''} transition-colors`}
                >
                  {columns.map(col => (
                    <td
                      key={col.key}
                      className={`${cellPadding} text-xs text-gray-700 ${col.align === 'right' ? 'text-right' : ''}`}
                    >
                      {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '\u2014')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {filteredData.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50/30">
          <span className="text-xs text-gray-500">
            {filteredData.length} {filteredData.length === 1 ? 'row' : 'rows'}
            {search && ` (filtered from ${data.length})`}
          </span>
        </div>
      )}
    </div>
  )
}
