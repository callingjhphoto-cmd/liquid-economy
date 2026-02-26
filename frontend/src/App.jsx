import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, TrendingUp, DollarSign, Building2, Download, Settings, LogOut, Menu, MessageCircle, FileText, Package, Globe, Wine, MapPin, CloudRain, ShoppingBag, Crosshair } from 'lucide-react'
import { api, getToken, setToken, clearToken } from './lib/api'
import CommandCentre from './pages/CommandCentre'
import Valuations from './pages/Valuations'
import BrandPricing from './pages/BrandPricing'
import Companies from './pages/Companies'
import ReportBuilder from './pages/ReportBuilder'
import SupplyChain from './pages/SupplyChain'
import GeographicIntelligence from './pages/GeographicIntelligence'
import CategoryIntelligence from './pages/CategoryIntelligence'
import VenueIntelligence from './pages/VenueIntelligence'
import ClimateYield from './pages/ClimateYield'
import POSIntelligence from './pages/POSIntelligence'
import CategoryCommandView from './pages/CategoryCommandView'
import ChatPanel from './components/ChatPanel'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await api.login(username, password)
      if (data.access_token) {
        setToken(data.access_token)
        onLogin()
      }
    } catch (err) {
      setError('Invalid credentials')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl text-navy mb-2">Liquid Economy</h1>
          <p className="text-gray-500 text-sm">Intelligence Platform — Palmer Liquid Studios</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
          />
          {error && <p className="text-accent-red text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy text-white py-3 rounded-lg font-medium hover:bg-navy-light transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

function NavItem({ to, icon: Icon, label }) {
  const location = useLocation()
  const active = location.pathname === to
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${active ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </Link>
  )
}

function Layout({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy transform transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="font-display text-xl text-white">Liquid Economy</h1>
            <p className="text-gold text-xs mt-1">Intelligence Platform</p>
          </div>
          <nav className="flex-1 px-3 space-y-1">
            <NavItem to="/" icon={LayoutDashboard} label="Command Centre" />
            <NavItem to="/climate" icon={CloudRain} label="Climate & Yield" />
            <NavItem to="/supply-chain" icon={Package} label="Supply Chain & COGS" />
            <NavItem to="/geographic" icon={Globe} label="Geographic Intelligence" />
            <NavItem to="/categories" icon={Wine} label="Category Intelligence" />
            <NavItem to="/venues" icon={MapPin} label="Venue Intelligence" />
            <NavItem to="/valuations" icon={TrendingUp} label="Valuations & Arbitrage" />
            <NavItem to="/pricing" icon={DollarSign} label="Brand Pricing" />
            <NavItem to="/companies" icon={Building2} label="Company Intelligence" />
            <NavItem to="/pos" icon={ShoppingBag} label="POS Manufacturing" />
            <NavItem to="/reports" icon={FileText} label="Report Builder" />
          </nav>
          <div className="p-3 border-t border-white/10">
            <button onClick={() => setChatOpen(true)} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:text-gold hover:bg-white/5 w-full text-left text-sm font-medium">
              <MessageCircle size={18} />
              <span>Analyst Chat</span>
            </button>
            <button onClick={() => api.downloadExcel()} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 w-full text-left text-sm font-medium">
              <Download size={18} />
              <span>Export Tracker</span>
            </button>
            <button onClick={onLogout} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:text-accent-red hover:bg-white/5 w-full text-left text-sm font-medium">
              <LogOut size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between lg:hidden">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} className="text-navy" />
          </button>
          <h1 className="font-display text-lg text-navy">Liquid Economy</h1>
          <div className="w-6" />
        </header>
        <div className="p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<CommandCentre />} />
            <Route path="/climate" element={<ClimateYield />} />
            <Route path="/supply-chain" element={<SupplyChain />} />
            <Route path="/geographic" element={<GeographicIntelligence />} />
                <Route path="/categories" element={<CategoryIntelligence />} />
            <Route path="/category/:categoryId" element={<CategoryCommandView />} />
            <Route path="/venues" element={<VenueIntelligence />} />
            <Route path="/valuations" element={<Valuations />} />
            <Route path="/pricing" element={<BrandPricing />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/pos" element={<POSIntelligence />} />
            <Route path="/reports" element={<ReportBuilder />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </main>

      {/* Chat Panel */}
      <ChatPanel isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}

export default function App() {
  const [authenticated, setAuthenticated] = useState(!!getToken())

  const handleLogout = () => {
    clearToken()
    setAuthenticated(false)
  }

  if (!authenticated) {
    return <Login onLogin={() => setAuthenticated(true)} />
  }

  return (
    <BrowserRouter>
      <Layout onLogout={handleLogout} />
    </BrowserRouter>
  )
}
