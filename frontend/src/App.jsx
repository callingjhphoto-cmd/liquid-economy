import React, { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { LayoutDashboard, TrendingUp, DollarSign, Building2, LogOut, Menu, FileText, Package, Globe, Wine, MapPin, CloudRain, ShoppingBag, Crosshair, ChevronDown, ChevronRight, Target, Loader2, Search, BarChart3, Calculator, MoreHorizontal, Rocket, Activity, Calendar, Eye, ShieldAlert, Crown, Compass, Lock } from 'lucide-react'
import { useLiveData } from './context/LiveDataContext'
import { api, getToken, setToken, clearToken } from './lib/api'
// ChatPanel disabled — backend not deployed; gated as "Coming Soon"
// import ChatPanel from './components/ChatPanel'
import GlobalSearch from './components/GlobalSearch'
import { LiveDataProvider } from './context/LiveDataContext'
import { StatusNotice, ErrorBoundary } from './components/ui'
import { GuestProvider, useGuest } from './context/GuestContext'
import GuestLockedPage from './pages/GuestLockedPage'

const CommandCentre = lazy(() => import('./pages/CommandCentre'))
const MarketOverview = lazy(() => import('./pages/MarketOverview'))
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
const Financials = lazy(() => import('./pages/Financials'))
const MarketEntryWizard = lazy(() => import('./pages/MarketEntryWizard'))
const DistributorDirectory = lazy(() => import('./pages/DistributorDirectory'))
const PricePositioning = lazy(() => import('./pages/PricePositioning'))
const BrandHealth = lazy(() => import('./pages/BrandHealth'))
const TradeShows = lazy(() => import('./pages/TradeShows'))
const RegulatoryCompliance = lazy(() => import('./pages/RegulatoryCompliance'))
const DepletionForecasting = lazy(() => import('./pages/DepletionForecasting'))
const CompetitorMonitor = lazy(() => import('./pages/CompetitorMonitor'))
const PitchGenerator = lazy(() => import('./pages/PitchGenerator'))
const SubscriptionTiers = lazy(() => import('./pages/SubscriptionTiers'))
const ProfileChorusCocktails = lazy(() => import('./pages/ProfileChorusCocktails'))
const ClientProfile = lazy(() => import('./pages/ClientProfile'))
const ProfilesIndex = lazy(() => import('./pages/ProfilesIndex'))
const CocktailDetail = lazy(() => import('./pages/CocktailDetail'))
const BrandDossier = lazy(() => import('./pages/BrandDossier'))
const GroupDossier = lazy(() => import('./pages/GroupDossier'))
const WalkIn = lazy(() => import('./pages/WalkIn'))
const DossierProposal = lazy(() => import('./pages/DossierProposal'))
const MarketingDossier = lazy(() => import('./pages/MarketingDossier'))

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
  '/financials': { label: 'Financials', group: 'Reports' },
  '/climate': { label: 'Climate & Yield', group: 'Tools' },
  '/pos': { label: 'POS Manufacturing', group: 'Tools' },
  '/market-entry': { label: 'Market Entry Wizard', group: 'Planning' },
  '/distributors': { label: 'Distributors', group: 'Planning' },
  '/price-positioning': { label: 'Price Positioning', group: 'Intelligence' },
  '/brand-health': { label: 'Brand Health', group: 'Intelligence' },
  '/trade-shows': { label: 'Trade Shows', group: 'Tools' },
  '/regulatory': { label: 'Regulatory', group: 'Tools' },
  '/depletions': { label: 'Depletions', group: 'Planning' },
  '/competitors': { label: 'Competitors', group: 'Intelligence' },
  '/pitch-generator': { label: 'Pitch Generator', group: 'Reports' },
  '/contact': { label: 'Contact', group: 'Tools' },
  '/profiles': { label: 'Client Profiles', group: 'Reports' },
  '/marketing': { label: 'Marketing Thesis', group: 'Intelligence' },
}

function FocusManager() {
  const location = useLocation()
  useEffect(() => {
    const main = document.getElementById('main-content')
    if (main) {
      main.focus({ preventScroll: true })
    }
  }, [location.pathname])
  return null
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
    { to: '/categories', icon: BarChart3, label: 'Intelligence', match: ['/categories', '/companies', '/pricing', '/venues', '/geographic', '/price-positioning', '/brand-health', '/competitors'] },
    { to: '/supply-chain', icon: Rocket, label: 'Planning', match: ['/supply-chain', '/scenario', '/margin', '/campaigns', '/market-entry', '/distributors', '/depletions'] },
    { to: '/reports', icon: FileText, label: 'Reports', match: ['/reports', '/valuations', '/financials', '/pitch-generator'] },
    { to: '/climate', icon: MoreHorizontal, label: 'Tools', match: ['/climate', '/pos', '/trade-shows', '/regulatory', '/contact'] },
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
  const { isGuest } = useGuest()
  const active = location.pathname === to

  if (isGuest) {
    return (
      <div className="group relative">
        <span
          className="flex items-center gap-3 px-3 py-2 min-h-[44px] rounded-lg text-[13px] font-medium text-gray-300 cursor-default select-none"
          onClick={(e) => e.preventDefault()}
        >
          <Lock size={13} className="text-gray-300 shrink-0" />
          <span className="opacity-60">{label}</span>
        </span>
        <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 hidden group-hover:flex items-center whitespace-nowrap bg-navy text-white text-xs px-2.5 py-1.5 rounded-lg shadow-lg">
          Available in full Liquid Economy
          <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-navy" />
        </div>
      </div>
    )
  }

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
  const { isGuest, guestProfile, guestToken } = useGuest()

  /* Close mobile sidebar on navigation */
  useEffect(() => { setSidebarOpen(false) }, [location.pathname])

  useEffect(() => {
    if (isGuest) return // block Cmd+K in guest mode
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isGuest])

  // Route guard: if guest, only /p/<guestProfile> and children are allowed
  const isGuestAllowed = !isGuest || location.pathname.startsWith(`/p/${guestProfile}`)

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

          {/* Guest mode banner in sidebar */}
          {isGuest && (
            <div className="mx-3 mb-2 px-3 py-2 rounded-lg bg-navy/5 border border-navy/10">
              <p className="text-xs font-semibold text-navy tracking-wide uppercase">Guest Preview</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Chorus Cocktails profile only</p>
            </div>
          )}

          {/* Live status pulse — hidden in guest mode */}
          {!isGuest && <LivePulse />}

          <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
            {/* Intelligence — core data pages */}
            <NavGroup title="Intelligence">
              <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
              <NavItem to="/marketing" icon={TrendingUp} label="Thesis" />
              <NavItem to="/categories" icon={Wine} label="Categories" />
              <NavItem to="/companies" icon={Building2} label="Companies" />
              <NavItem to="/pricing" icon={DollarSign} label="Pricing" />
              <NavItem to="/price-positioning" icon={Target} label="Price Positioning" />
              <NavItem to="/venues" icon={MapPin} label="Venues" />
              <NavItem to="/geographic" icon={Globe} label="Geographic" />
              <NavItem to="/brand-health" icon={Activity} label="Brand Health" />
              <NavItem to="/competitors" icon={Eye} label="Competitors" />
            </NavGroup>

            {/* Planning — action-oriented tools */}
            <NavGroup title="Planning">
              <NavItem to="/supply-chain" icon={Package} label="Supply Chain" />
              <NavItem to="/market-entry" icon={Compass} label="Market Entry Wizard" />
              <NavItem to="/scenario" icon={Crosshair} label="Scenario Modeling" />
              <NavItem to="/distributors" icon={Building2} label="Distributors" />
              <NavItem to="/depletions" icon={BarChart3} label="Depletions" />
              <NavItem to="/margin" icon={Calculator} label="Margin Calculator" />
              <NavItem to="/campaigns" icon={Target} label="Campaign Planner" />
            </NavGroup>

            {/* Reports — output */}
            <NavGroup title="Reports">
              <NavItem to="/reports" icon={FileText} label="Report Builder" />
              <NavItem to="/valuations" icon={TrendingUp} label="Valuations" />
              <NavItem to="/financials" icon={DollarSign} label="Financials" />
              <NavItem to="/pitch-generator" icon={Rocket} label="Pitch Generator" />
            </NavGroup>

            {/* Tools — specialist utilities */}
            <NavGroup title="Tools" defaultOpen={false}>
              <NavItem to="/climate" icon={CloudRain} label="Climate & Yield" />
              <NavItem to="/pos" icon={ShoppingBag} label="POS Manufacturing" />
              <NavItem to="/trade-shows" icon={Calendar} label="Trade Shows" />
              <NavItem to="/regulatory" icon={ShieldAlert} label="Regulatory" />
              <NavItem to="/contact" icon={Crown} label="Contact" />
            </NavGroup>
          </nav>

          <div className="p-2 border-t border-gray-100 space-y-0.5">
            {!isGuest && (
              <button onClick={() => setSearchOpen(true)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:text-navy hover:bg-gray-50 w-full text-left text-[13px] font-medium">
                <Search size={15} />
                <span>Search</span>
                <kbd className="ml-auto text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded font-mono">{'⌘'}K</kbd>
              </button>
            )}
            {!isGuest && (
              <NavGroup title="Coming Soon" defaultOpen={false}>
                <div className="px-3 py-2 text-xs text-gray-500">
                  <p>Analyst Chat and Export Tracker are in development.</p>
                  <a href="mailto:james@huertas.co.uk" className="text-navy hover:underline">Join the waitlist {'→'}</a>
                </div>
              </NavGroup>
            )}
            {!isGuest && (
              <button onClick={onLogout} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 w-full text-left text-[13px] font-medium">
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            )}
            {isGuest && (
              <a
                href="mailto:james@huertas.co.uk?subject=Liquid Economy - Full Access Request"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-navy hover:bg-navy/5 w-full text-left text-[13px] font-medium"
              >
                <Crown size={15} />
                <span>Request full access</span>
              </a>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <main id="main-content" tabIndex={-1} className="flex-1 overflow-auto outline-none">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation">
            <Menu size={24} className="text-navy" />
          </button>
          <h1 className="font-display text-section text-navy">Liquid Economy</h1>
          {isGuest ? (
            <span className="text-[10px] font-bold tracking-widest text-navy bg-navy/10 px-2 py-1 rounded-lg uppercase">
              Guest
            </span>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation">
              <Search size={20} className="text-navy" />
            </button>
          )}
        </header>

        {/* Desktop guest badge — top-right of content area */}
        {isGuest && (
          <div className="hidden lg:flex justify-end px-8 pt-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-navy bg-navy/8 border border-navy/15 px-3 py-1.5 rounded-full uppercase">
              <Lock size={10} />
              Chorus Preview &middot; Guest
            </span>
          </div>
        )}

        <div className="px-4 pb-20 pt-4 lg:px-8 lg:pb-8 lg:pt-8 flex flex-col min-h-full">
          {!isGuest && <Breadcrumb />}
          <ErrorBoundary message="This page encountered an error. Try refreshing or navigating to another section.">
          <Suspense fallback={<PageLoader />}>
            {!isGuestAllowed ? (
              <GuestLockedPage profile={guestProfile} />
            ) : (
            <Routes>
              <Route path="/" element={<CommandCentre />} />
              <Route path="/market-overview" element={<MarketOverview />} />
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
              <Route path="/financials" element={<Financials />} />
              <Route path="/reports" element={<ReportBuilder />} />
              <Route path="/market-entry" element={<MarketEntryWizard />} />
              <Route path="/distributors" element={<DistributorDirectory />} />
              <Route path="/price-positioning" element={<PricePositioning />} />
              <Route path="/brand-health" element={<BrandHealth />} />
              <Route path="/trade-shows" element={<TradeShows />} />
              <Route path="/regulatory" element={<RegulatoryCompliance />} />
              <Route path="/depletions" element={<DepletionForecasting />} />
              <Route path="/competitors" element={<CompetitorMonitor />} />
              <Route path="/pitch-generator" element={<PitchGenerator />} />
              <Route path="/contact" element={<SubscriptionTiers />} />
              <Route path="/subscription" element={<Navigate to="/contact" />} />
              <Route path="/profiles" element={<ProfilesIndex />} />
              <Route path="/p/khorus-cocktails" element={<Navigate to="/p/chorus-cocktails" replace />} />
              <Route path="/p/chorus-cocktails/cocktail/:cocktailSlug" element={<CocktailDetail />} />
              <Route path="/p/:slug" element={<ProfileRoute />} />
              {/* Dossier spine — Group, Brand, Walk-in, Proposal, Marketing */}
              <Route path="/group/:slug" element={<GroupDossier />} />
              <Route path="/brand/:slug" element={<BrandDossier />} />
              <Route path="/walk-in/:slug" element={<WalkIn />} />
              <Route path="/proposal/:slug" element={<DossierProposal />} />
              <Route path="/marketing" element={<MarketingDossier />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            )}
          </Suspense>
          </ErrorBoundary>
        </div>
      </main>

      {/* Chat Panel — disabled, backend not deployed */}

      {/* Global Search (Cmd+K) — hidden in guest mode */}
      {!isGuest && <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />}

      {/* Bottom Tab Bar — Mobile Only, hidden in guest mode */}
      {!isGuest && <BottomTabBar />}
    </div>
  )
}

// Profile loader: lazy-loads the profile data module for the given slug
// then passes it to ClientProfile renderer.
// Falls back to ProfileChorusCocktails for backwards compat during transition.
function ProfileRoute() {
  const { slug } = useParams()
  const [profile, setProfile] = React.useState(undefined)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setLoading(true)
    setProfile(undefined)
    import(`./data/profiles/${slug}.js`)
      .then((mod) => {
        setProfile(mod.default || null)
        setLoading(false)
      })
      .catch(() => {
        setProfile(null)
        setLoading(false)
      })
  }, [slug])

  if (loading) return <PageLoader />
  return (
    <Suspense fallback={<PageLoader />}>
      <ClientProfile profile={profile} slug={slug} />
    </Suspense>
  )
}

// AppRouter: all routes flow through Layout so sidebar appears on every page including /p/*
// GuestProvider must be inside BrowserRouter (needs useLocation)
function AppRouter({ onLogout }) {
  return (
    <GuestProvider>
      <Routes>
        <Route path="*" element={<Layout onLogout={onLogout} />} />
      </Routes>
    </GuestProvider>
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
      <FocusManager />
      <LiveDataProvider>
        <AppRouter onLogout={handleLogout} />
      </LiveDataProvider>
    </BrowserRouter>
  )
}
