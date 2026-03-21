import React, { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, TrendingUp, DollarSign, Building2, Download, LogOut, Menu, MessageCircle, FileText, Package, Globe, Wine, MapPin, CloudRain, ShoppingBag, Crosshair, ChevronDown, ChevronRight, Target, Loader2, Search, BarChart3, Store, Lightbulb, Calculator } from 'lucide-react'
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
const MarginCalculator = lazy(() => import('./pages/MarginCalculator'))

/* Route metadata for breadcrumbs */
const routeMeta = {
  '/': { label: 'Dashboard', group: 'Dashboard' },
  '/categories': { label: 'Category Intelligence', group: 'Market' },
  '/companies': { label: 'Company Intelligence', group: 'Market' },
  '/valuations': { label: 'Valuations & Arbitrage', group: 'Market' },
  '/pricing': { label: 'Brand Pricing', group: 'Market' },
  '/supply-chain': { label: 'Supply Chain & COGS', group: 'Operations' },
  '/geographic': { label: 'Geographic Intelligence', group: 'Operations' },
  '/climate': { label: 'Climate & Yield', group: 'Operations' },
  '/pos': { label: 'POS Manufacturing', group: 'Operations' },
  '/venues': { label: 'Venue Intelligence', group: 'Retail' },
  '/scenario': { label: 'Scenario Modelling', group: 'Retail' },
  '/campaigns': { label: 'Campaign Planner', group: 'Retail' },
  '/margin': { label: 'Margin Calculator', group: 'Tools' },
  '/reports': { label: 'Report Builder', group: 'Intelligence' },
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="animate-spin text-gray-400" size={32} />
    </div>
  )
}

function Breadcrumb() {
  const location = useLocation()
  const path = location.pathname

  /* Handle dynamic routes like /category/:id */
  const isCategory = path.startsWith('/category/')
  const meta = routeMeta[path]

  if (path === '/') return null

  const crumbs = [{ label: 'Dashboard', to: '/' }]

  if (isCategory) {
    const slug = path.split('/').pop()
    const name = slug.charAt(0).toUpperCase() + slug.slice(1)
    crumbs.push({ label: 'Category Intelligence', to: '/categories' })
    crumbs.push({ label: name, to: path })
  } else if (meta) {
    if (meta.group !== 'Dashboard') {
      crumbs.push({ label: meta.group })
    }
    crumbs.push({ label: meta.label, to: path })
  }

  return (
    <nav className="hidden lg:flex items-center gap-1.5 text-[12px] text-gray-400 mb-4">
      {crumbs.map((crumb, i) => (
        <React.Fragment key={i}>
          {i > 0 && <ChevronRight size={10} className="text-gray-300" />}
          {crumb.to && i < crumbs.length - 1 ? (
            <Link to={crumb.to} className="hover:text-navy transition-colors">{crumb.label}</Link>
          ) : (
            <span className={i === crumbs.length - 1 ? 'text-navy font-medium' : ''}>{crumb.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

function BottomTabBar() {
  const location = useLocation()
  const path = location.pathname

  const tabs = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard', match: ['/'] },
    { to: '/categories', icon: BarChart3, label: 'Market', match: ['/categories', '/companies', '/valuations', '/pricing'] },
    { to: '/supply-chain', icon: Package, label: 'Operations', match: ['/supply-chain', '/geographic', '/climate', '/pos'] },
    { to: '/venues', icon: Store, label: 'Retail', match: ['/venues', '/scenario', '/campaigns'] },
    { to: '/reports', icon: Lightbulb, label: 'Intelligence', match: ['/reports'] },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200/80 lg:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-14">
        {tabs.map(tab => {
          const active = tab.match.includes(path) || (tab.match[0] === '/categories' && path.startsWith('/category/'))
          return (
            <Link key={tab.label} to={tab.to} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors ${active ? 'text-navy' : 'text-gray-400'}`}>
              <tab.icon size={20} strokeWidth={active ? 2 : 1.5} />
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
          <h1 className="font-display text-page text-navy mb-1">Liquid Economy</h1>
          <p className="text-caption text-gray-400">Glass-to-Glass Intelligence Platform</p>
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

function NavGroup({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(() => {
    try { const v = localStorage.getItem('le_nav_' + title); return v !== null ? v === '1' : defaultOpen } catch { return defaultOpen }
  })
  const toggle = () => {
    const next = !open
    setOpen(next)
    try { localStorage.setItem('le_nav_' + title, next ? '1' : '0') } catch {}
  }
  return (
    <div className="mb-0.5">
      <button onClick={toggle} className="flex items-center justify-between w-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-400 hover:text-navy transition-colors">
        <span>{title}</span>
        <ChevronDown size={10} className={`transition-transform duration-200 ${open ? '' : '-rotate-90'}`} />
      </button>
      <div className={`space-y-0.5 overflow-hidden transition-all duration-200 ${open ? 'max-h-96 opacity-100 mt-0.5' : 'max-h-0 opacity-0'}`}>
        {children}
      </div>
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
  const location = useLocation()

  /* Close mobile sidebar on navigation */
  useEffect(() => { setSidebarOpen(false) }, [location.pathname])

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
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-white border-r border-gray-200/80 transform transition-transform duration-300 ease-out lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="px-5 pt-5 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
                <Wine size={16} className="text-white" />
              </div>
              <div>
                <h1 className="font-display text-body text-navy font-bold leading-tight">Liquid Economy</h1>
                <p className="text-micro text-gray-400 tracking-wide">Glass-to-Glass Intelligence</p>
              </div>
            </div>
          </div>

          {/* Live status pulse */}
          <LivePulse />

          <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
            {/* Dashboard */}
            <div className="mb-1">
              <NavItem to="/" icon={LayoutDashboard} label="Command Centre" />
            </div>

            {/* Market */}
            <NavGroup title="Market">
              <NavItem to="/categories" icon={Wine} label="Category Intelligence" />
              <NavItem to="/companies" icon={Building2} label="Company Intelligence" />
              <NavItem to="/valuations" icon={TrendingUp} label="Valuations & Arbitrage" />
              <NavItem to="/pricing" icon={DollarSign} label="Brand Pricing" />
            </NavGroup>

            {/* Operations */}
            <NavGroup title="Operations">
              <NavItem to="/supply-chain" icon={Package} label="Supply Chain & COGS" />
              <NavItem to="/geographic" icon={Globe} label="Geographic Intelligence" />
              <NavItem to="/climate" icon={CloudRain} label="Climate & Yield" />
              <NavItem to="/pos" icon={ShoppingBag} label="POS Manufacturing" />
            </NavGroup>

            {/* Retail */}
            <NavGroup title="Retail">
              <NavItem to="/venues" icon={MapPin} label="Venue Intelligence" />
              <NavItem to="/scenario" icon={Crosshair} label="Scenario Modelling" />
              <NavItem to="/campaigns" icon={Target} label="Campaign Planner" />
            </NavGroup>

            {/* Tools */}
            <NavGroup title="Tools">
              <NavItem to="/margin" icon={Calculator} label="Margin Calculator" />
            </NavGroup>

            {/* Intelligence */}
            <NavGroup title="Intelligence">
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
          <h1 className="font-display text-section text-navy">Liquid Economy</h1>
          <button onClick={() => setSearchOpen(true)}>
            <Search size={20} className="text-navy" />
          </button>
        </header>
        <div className="p-6 pb-20 lg:p-8 lg:pb-8">
          <Breadcrumb />
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
              <Route path="/margin" element={<MarginCalculator />} />
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
