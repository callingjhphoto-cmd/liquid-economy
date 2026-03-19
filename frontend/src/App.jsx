import React, { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, TrendingUp, DollarSign, Building2, Download, Settings, LogOut, Menu, MessageCircle, FileText, Package, Globe, Wine, MapPin, CloudRain, ShoppingBag, Crosshair, ChevronDown, ChevronRight, Radio, Target, Loader2, Search } from 'lucide-react'
import { useLiveData } from './context/LiveDataContext'
import { api, getToken, setToken, clearToken } from './lib/api'
import ChatPanel from './components/ChatPanel'
import GlobalSearch from './components/GlobalSearch'
import { LiveDataProvider } from './context/LiveDataContext'

const CommandCentre = lazy(() => import('./pages/CommandCentre'))
const Valuations = lazy(() => import('./pages/Valuations'))
const BrandPricing = lazy(() => import('./pages/BrandPricing'))
const Companies = lazy(() => import('./pages/Companies'))
const ReportBuilder = lazy(() => import('./pages/ReportBuilder'))
const SupplyChain = lazy(() => import('./pages/SupplyChain'))
const GeographicIntelligence = lazy(() => import('./pages/GeographicIntelligence'))
const CategoryIntelligence = lazy(() => import('./pages/CategoryIntelligence'))
const VenueIntelligence = lazy(() => import('./pages/VenueIntelligence'))
const ClimateYield = lazy(() => import('./pages/ClimateYield'))
const POSIntelligence = lazy(() => import('./pages/POSIntelligence'))
const CategoryCommandView = lazy(() => import('./pages/CategoryCommandView'))
const ScenarioModeling = lazy(() => import('./pages/ScenarioModeling'))
const CampaignPlanner = lazy(() => import('./pages/CampaignPlanner'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="animate-spin text-gray-400" size={32} />
    </div>
  )
}

function BottomTabBar() {
  const location = useLocation()
  const tabs = [
    { to: '/', icon: LayoutDashboard, label: 'Home' },
    { to: '/categories', icon: Wine, label: 'Categories' },
    { to: '/venues', icon: MapPin, label: 'Venues' },
    { to: '/pricing', icon: DollarSign, label: 'Pricing' },
    { to: '/companies', icon: Building2, label: 'Companies' },
  ]
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 lg:hidden">
      <div className="flex items-center justify-around h-14">
        {tabs.map(tab => {
          const active = location.pathname === tab.to
          return (
            <Link key={tab.to} to={tab.to} className={`flex flex-col items-center gap-0.5 px-3 py-1 ${active ? 'text-navy' : 'text-gray-400'}`}>
              <tab.icon size={20} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

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
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center mx-auto mb-4">
            <Wine size={24} className="text-white" />
          </div>
          <h1 className="font-display text-2xl text-navy mb-1">Liquid Economy</h1>
          <p className="text-gray-400 text-xs">Glass-to-Glass Intelligence Platform</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold focus:bg-white transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gold/50 focus:border-gold focus:bg-white transition-colors"
          />
          {error && <p className="text-accent-red text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy text-white py-3 rounded-xl text-sm font-medium hover:bg-navy-light transition-colors disabled:opacity-50"
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
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-[13px] font-medium ${active ? 'bg-navy/5 text-navy' : 'text-gray-500 hover:text-navy hover:bg-gray-50'}`}
    >
      <Icon size={15} />
      <span>{label}</span>
    </Link>
  )
}

function NavGroup({ title, emoji, children, defaultOpen = true }) {
  const [open, setOpen] = useState(() => {
    try { const v = localStorage.getItem('le_nav_' + title); return v !== null ? v === '1' : defaultOpen } catch { return defaultOpen }
  })
  const toggle = () => {
    const next = !open
    setOpen(next)
    try { localStorage.setItem('le_nav_' + title, next ? '1' : '0') } catch {}
  }
  return (
    <div className="mb-1">
      <button onClick={toggle} className="flex items-center justify-between w-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400 hover:text-navy transition-colors">
        <span className="flex items-center gap-1.5">{emoji} {title}</span>
        {open ? <ChevronDown size={10} /> : <ChevronRight size={10} />}
      </button>
      {open && <div className="space-y-0.5 mt-0.5">{children}</div>}
    </div>
  )
}

function LivePulse() {
  const { connected, feedItems, mode } = useLiveData()
  const criticals = feedItems.filter(i => i.severity === 'critical').length
  return (
    <div className="mx-3 mb-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {connected ? (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
          ) : (
            <span className="h-2 w-2 rounded-full bg-gray-400" />
          )}
          <span className="text-[10px] text-gray-500 font-medium">
            {connected ? (mode === 'sse' ? 'LIVE' : 'POLLING') : 'OFFLINE'}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          {criticals > 0 && (
            <span className="text-red-500 font-bold">{criticals} critical</span>
          )}
          <span className="text-gray-400">{feedItems.length} items</span>
        </div>
      </div>
    </div>
  )
}

function Layout({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar — Clean Apple-style */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="px-5 pt-5 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
                <Wine size={16} className="text-white" />
              </div>
              <div>
                <h1 className="font-display text-base text-navy font-bold leading-tight">Liquid Economy</h1>
                <p className="text-[10px] text-gray-400 tracking-wide">Glass-to-Glass Intelligence</p>
              </div>
            </div>
          </div>

          {/* Live status pulse */}
          <LivePulse />

          <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
            {/* Hub */}
            <NavItem to="/" icon={LayoutDashboard} label="Command Centre" />

            {/* Production & Sourcing */}
            <NavGroup title="Production & Sourcing" emoji={'\u2b06\ufe0f'}>
              <NavItem to="/climate" icon={CloudRain} label="Climate & Yield" />
              <NavItem to="/supply-chain" icon={Package} label="Supply Chain & COGS" />
              <NavItem to="/pos" icon={ShoppingBag} label="POS Manufacturing" />
            </NavGroup>

            {/* Distribution */}
            <NavGroup title="Distribution" emoji={'\ud83c\udf0d'}>
              <NavItem to="/categories" icon={Wine} label="Category Intelligence" />
              <NavItem to="/geographic" icon={Globe} label="Geographic Intelligence" />
              <NavItem to="/valuations" icon={TrendingUp} label="Valuations & Arbitrage" />
              <NavItem to="/companies" icon={Building2} label="Company Intelligence" />
            </NavGroup>

            {/* Retail */}
            <NavGroup title="Retail" emoji={'\ud83c\udf7e'}>
              <NavItem to="/venues" icon={MapPin} label="Venue Intelligence" />
              <NavItem to="/pricing" icon={DollarSign} label="Brand Pricing" />
              <NavItem to="/scenario" icon={Crosshair} label="Scenario Modelling" />
              <NavItem to="/campaigns" icon={Target} label="Campaign Planner" />
            </NavGroup>

            {/* Output */}
            <NavGroup title="Output" emoji={'\ud83d\udcca'} defaultOpen={false}>
              <NavItem to="/reports" icon={FileText} label="Report Builder" />
            </NavGroup>
          </nav>

          <div className="p-2 border-t border-gray-100 space-y-0.5">
            <button onClick={() => setSearchOpen(true)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:text-navy hover:bg-gray-50 w-full text-left text-[13px] font-medium">
              <Search size={15} />
              <span>Search</span>
              <kbd className="ml-auto text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded font-mono">{'\u2318'}K</kbd>
            </button>
            <button onClick={() => setChatOpen(true)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:text-navy hover:bg-gray-50 w-full text-left text-[13px] font-medium">
              <MessageCircle size={15} />
              <span>Analyst Chat</span>
            </button>
            <button onClick={() => api.downloadExcel()} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:text-navy hover:bg-gray-50 w-full text-left text-[13px] font-medium">
              <Download size={15} />
              <span>Export Tracker</span>
            </button>
            <button onClick={onLogout} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 w-full text-left text-[13px] font-medium">
              <LogOut size={15} />
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
          <button onClick={() => setSearchOpen(true)}>
            <Search size={20} className="text-navy" />
          </button>
        </header>
        <div className="p-6 pb-20 lg:p-8 lg:pb-8">
          <Suspense fallback={<PageLoader />}>
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
              <Route path="/scenario" element={<ScenarioModeling />} />
              <Route path="/campaigns" element={<CampaignPlanner />} />
              <Route path="/reports" element={<ReportBuilder />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </div>
      </main>

      {/* Chat Panel */}
      <ChatPanel isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      {/* Global Search (Cmd+K) */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Bottom Tab Bar — Mobile Only */}
      <BottomTabBar />
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
      <LiveDataProvider>
        <Layout onLogout={handleLogout} />
      </LiveDataProvider>
    </BrowserRouter>
  )
}
