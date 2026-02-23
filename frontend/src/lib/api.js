const API_BASE = (import.meta.env.VITE_API_URL || '') + '/api'

let token = localStorage.getItem('le_token')

export function setToken(t) {
  token = t
  localStorage.setItem('le_token', t)
}

export function clearToken() {
  token = null
  localStorage.removeItem('le_token')
}

export function getToken() {
  return token
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const resp = await fetch(`${API_BASE}${path}`, { ...options, headers })

  if (resp.status === 401) {
    clearToken()
    window.location.href = '/login'
    return null
  }

  if (!resp.ok) throw new Error(`API error: ${resp.status}`)

  const ct = resp.headers.get('content-type')
  if (ct && ct.includes('application/json')) return resp.json()
  return resp
}

export const api = {
  // Auth
  login: (username, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),

  // Dashboard
  getSummary: () => request('/dashboard/summary'),
  getValuations: (days = 90) => request(`/dashboard/valuations?days=${days}`),
  getArbitrage: () => request('/dashboard/arbitrage'),
  acknowledgeAlert: (id) => request(`/dashboard/alerts/${id}/acknowledge`, { method: 'POST' }),

  // Companies
  getCompanies: () => request('/companies/'),
  getCompany: (id) => request(`/companies/${id}`),
  getPricing: () => request('/companies/pricing/all'),

  // Collectors
  runCollector: (name) => request(`/collectors/run/${name}`, { method: 'POST' }),

  // Chat
  sendChatMessage: (message) =>
    request('/chat/message', { method: 'POST', body: JSON.stringify({ message }) }),

  // Exports
  downloadExcel: () => {
    const headers = {}
    if (token) headers['Authorization'] = `Bearer ${token}`
    return fetch(`${API_BASE}/exports/excel`, { headers })
      .then(r => r.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `liquid_economy_tracker_${new Date().toISOString().split('T')[0]}.xlsx`
        a.click()
        URL.revokeObjectURL(url)
      })
  },

  // Reports
  generateBrief: (data) =>
    request('/reports/brief', { method: 'POST', body: JSON.stringify(data) }),
  generatePortfolio: (data) =>
    request('/reports/portfolio', { method: 'POST', body: JSON.stringify(data) }),
  getReportHistory: () => request('/reports/history'),
  downloadReport: (reportId) => {
    const headers = {}
    if (token) headers['Authorization'] = `Bearer ${token}`
    return fetch(`${API_BASE}/reports/${reportId}/download`, { headers })
      .then(r => r.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `report_${reportId}.pdf`
        a.click()
        URL.revokeObjectURL(url)
      })
  },

  health: () => request('/health'),
}
