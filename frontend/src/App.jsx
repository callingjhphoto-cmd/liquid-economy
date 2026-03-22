import React, { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { LayoutDashboard, TrendingUp, DollarSign, Building2, LogOut, Menu, FileText, Package, Globe, Wine, MapPin, CloudRain, ShoppingBag, Crosshair, ChevronDown, ChevronRight, Target, Loader2, Search, BarChart3, Calculator, MoreHorizontal, Rocket } from 'lucide-react'
import { useLiveData } from './context/LiveDataContext'
import { api, getToken, setToken, clearToken } from './lib/api'
// ChatPanel disabled — backend not deployed; gated as "Coming Soon"
// import ChatPanel from './components/ChatPanel'
import GlobalSearch from './components/GlobalSearch'
import { LiveDataProvider } from './context/LiveDataContext'
import { StatusNotice } from './components/ui'

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
const ScenarioModeling = lazy(() => import('./pages/ScenarioModeling'))
const CampaignPlanner = lazy(() => import('./pages/CampaignPlanner'))
const MarginCalculator = lazy(() => import('./pages/MarginCalculator'))

/* Route metadata for breadcrumbs */
const routeMeta = {
  '/': { label: 'Dashboard', group: 'Intelligence' },
  '/categories': { label: 'Categories', group: 'Intelligence' },
  '/companies': { label: 'Companies', group: 'Intelligence' },
  '/pricing': { label: 'Pricing', group: 'Intelligence' },
  '/venues': { label: 'Venues', group: 'Intelligence' },
  '/geographic': { label: 'Geographic', group: 'Intelligence' },
  '/supply-chain': { label: 'Supply Chain', group: 'Planning' },
  '/scenario': { label: 'Market Entry', group: 'Planning' },
  '/margin': { label: 'Margin Calculator', group: 'Planning' },
  '/campaigns': { label: 'Campaign Planner', group: 'Planning' },
  '/reports': { label: 'Report Builder', group: 'Reports' },
  '/valuations': { label: 'Valuations', group: 'Reports' },
  '/climate': { label: 'Climate & Yield', group: 'Tools' },
  '/pos': { label: 'POS Manufacturing', group: 'Tools' },
}

/** Redirect legacy /category/:id routes to /categories?category=:id */
function CategoryRedirect() {
  const { categoryId } = useParams()
  return <Navigate to={`/categories?category=${categoryId}`} replace />
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

  const meta = routeMeta[path]

  if (path === '/') return null

  const crumbs = [{ label: 'Dashboard', to: '/' }]

  if (meta) {
    if (meta.group !== 'Dashboard') {
      crumbs.push({ label: meta.group })
    }
    crumbs.push({ label: meta.label, to: path })
  }

  return (
    <nav className="hidden lg:flex items-center gap-1.5 text-[12px] text-gray-500 mb-4">
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
    { to: '/categories', icon: BarChart3, label: 'Intelligence', match: ['/categories', '/companies', '/pricing', '/venues', '/geographic'] },
    { to: '/supply-chain', icon: Rocket, label: 'Planning', match: ['/supply-chain', '/scenario', '/margin', '/campaigns'] },
    { to: '/reports', icon: FileText, label: 'Reports', match: ['/reports', '/valuations'] },
    { to: '/climate', icon: MoreHorizontal, label: 'Tools', match: ['/climate', '/pos'] },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200/80 lg:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
      <div className="flex items-center justify-around h-14">
        {tabs.map(tab => {
          const active = tab.match.includes(path)
          return (
            <Link key={tab.label} to={tab.to} className={`flex flex-col items-center justify-center gap-0.5 min-h-[44px] min-w-[44px] px-3 py-1.5 transition-colors touch-manipulation ${active ? 'text-navy' : 'text-gray-600'}`}>
              <tab.icon size={20} strokeWidth={active ? 2 : 1.5} />
              <span className="text-xs font-medium">{tab.label}</span>
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
          <p className="text-caption text-gray-500">Glass-to-Glass Intelligence Platform</p>
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
      className={`flex items-center gap-3 px-3 py-2 min-h-[44px] rounded-lg transition-colors text-[13px] font-medium touch-manipulation ${active ? 'bg-navy/5 text-navy' : 'text-gray-500 hover:text-navy hover:bg-gray-50'}`}
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
      <button onClick={toggle} className="flex items-center justify-between w-full px-3 py-1.5 min-h-[36px] text-xs font-semibold uppercase tracking-widest text-gray-500 hover:text-navy transition-colors touch-manipulation">
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
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {mode === 'sse' ? 'LIVE' : 'POLLING'}
              </span>
            </>
          ) : (
            <span className="w-full">
              <StatusNotice type="offline" message="Data feed offline. Showing cached data." />
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs">
          {criticals > 0 && (
            <span className="text-red-500 font-bold">{criticals} critical</span>
          )}
          <span className="text-gray-500">{feedItems.length} items</span>
        </div>
      </div>
    </div>
  )
}

function Layout({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // Chat disabled — backend not deployed
  // const [chatOpen, setChatOpen] = useState(false)
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
      {/* Skip to main content — accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-navy focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm">
        Skip to main content
      </a>
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
                <p className="text-micro text-gray-500 tracking-wide">Glass-to-Glass Intelligence</p>
              </div>
            </div>
          </div>

          {/* Live status pulse */}
          <LivePulse />

          <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
            {/* Intelligence — core data pages */}
            <NavGroup title="Intelligence">
              <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
              <NavItem to="/categories" icon={Wine} label="Categories" />
              <NavItem to="/companies" icon={Building2} label="Companies" />
              <NavItem to="/pricing" icon={DollarSign} label="Pricing" />
              <NavItem to="/venues" icon={MapPin} label="Venues" />
              <NavItem to="/geographic" icon={Globe} label="Geographic" />
            </NavGroup>

            {/* Planning — action-oriented tools */}
            <NavGroup title="Planning">
              <NavItem to="/supply-chain" icon={Package} label="Supply Chain" />
              <NavItem to="/scenario" icon={Crosshair} label="Market Entry" />
              <NavItem to="/margin" icon={Calculator} label="Margin Calculator" />
              <NavItem to="/campaigns" icon={Target} label="Campaign Planner" />
            </NavGroup>

            {/* Reports — output */}
            <NavGroup title="Reports">
              <NavItem to="/reports" icon={FileText} label="Report Builder" />
              <NavItem to="/valuations" icon={TrendingUp} label="Valuations" />
            </NavGroup>

            {/* Tools — specialist utilities */}
            <NavGroup title="Tools" defaultOpen={false}>
              <NavItem to="/climate" icon={CloudRain} label="Climate & Yield" />
              <NavItem to="/pos" icon={ShoppingBag} label="POS Manufacturing" />
            </NavGroup>
          </nav>

          <div className="p-2 border-t border-gray-100 space-y-0.5">
            <button onClick={() => setSearchOpen(true)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:text-navy hover:bg-gray-50 w-full text-left text-[13px] font-medium">
              <Search size={15} />
              <span>Search</span>
              <kbd className="ml-auto text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded font-mono">{'\u2318'}K</kbd>
            </button>
            <NavGroup title="Coming Soon" defaultOpen={false}>
              <div className="px-3 py-2 text-xs text-gray-500">
                <p>Analyst Chat and Export Tracker are in development.</p>
                <a href="mailto:james@huertas.co.uk" className="text-navy hover:underline">Join the waitlist {'\u2192'}</a>
              </div>
            </NavGroup>
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
      <main id="main-content" className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation">
            <Menu size={24} className="text-navy" />
          </button>
          <h1 className="font-display text-section text-navy">Liquid Economy</h1>
          <button onClick={() => setSearchOpen(true)} className="min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation">
            <Search size={20} className="text-navy" />
          </button>
        </header>
        <div className="px-4 pb-20 pt-4 lg:px-8 lg:pb-8 lg:pt-8">
          <Breadcrumb />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<CommandCentre />} />
              <Route path="/climate" element={<ClimateYield />} />
              <Route path="/supply-chain" element={<SupplyChain />} />
              <Route path="/geographic" element={<GeographicIntelligence />} />
              <Route path="/categories" element={<CategoryIntelligence />} />
              <Route path="/category/:categoryId" element={<CategoryRedirect />} />
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

      {/* Chat Panel — disabled, backend not deployed */}

      {/* Global Search (Cmd+K) */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Bottom Tab Bar — Mobile Only */}
      <BottomTabBar />
    </div>
  )
}

export default function App() {
  // Auth bypassed — backend not deployed on Railway yet
  const [authenticated, setAuthenticated] = useState(true)

  const handleLogout = () => {
    clearToken()
    setAuthenticated(false)
  }

  // if (!authenticated) {
  //   return <Login onLogin={() => setAuthenticated(true)} />
  // }

  return (
    <BrowserRouter>
      <LiveDataProvider>
        <Layout onLogout={handleLogout} />
      </LiveDataProvider>
    </BrowserRouter>
  )
}
