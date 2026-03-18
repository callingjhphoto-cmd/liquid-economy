import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { api } from '../lib/api'
import { SignalCard } from '../components/MetricCard'
import { TrendingUp, TrendingDown, BarChart3, DollarSign, Target, Scale, Layers, Building2, ArrowUpRight, ArrowDownRight, Info } from 'lucide-react'

const COLORS = ['#2B6CB0', '#C9A96E', '#38A169', '#C53030', '#DD6B20', '#6B46C1',
  '#2D3142', '#D69E2E', '#3182CE', '#E53E3E', '#38B2AC', '#805AD5', '#1A1F36', '#ED8936']


const BRAND_VALUATION_MODELS = [
  {
    name: 'Royalty Relief Method',
    description: 'Calculates the brand value based on theoretical royalty rate paid for the right to use the brand.',
    bestFor: 'Most applicable for spirits brands with established licensing history.',
    formula: 'Brand Value = 5-year avg revenue × assumed royalty rate × relief factor',
    example: 'Johnnie Walker: $4.2B revenue × 12% royalty × relief factor',
    pros: 'Widely accepted by IRS, relies on market-based royalty rates',
    cons: 'Requires assumption of hypothetical royalty rate; may undervalue premium brands'
  },
  {
    name: 'Excess Earnings Method',
    description: 'Isolates the earnings generated purely by brand equity, separate from tangible assets.',
    bestFor: 'Brands with strong earnings but uncertain remaining useful life.',
    formula: 'Brand Value = (excess earnings × expected brand life) / discount rate',
    example: 'Hennessy: 3-year avg excess earnings of $850M discounted at 8%',
    pros: 'Directly ties value to brand contribution; transparent logic',
    cons: 'Heavily dependent on accurate earnings separation; assumptions on remaining life'
  },
  {
    name: 'Cost-Based Approach',
    description: 'Estimates what it would cost to recreate the brand from scratch (marketing, distribution, R&D).',
    bestFor: 'New brands or those being rebuilt post-crisis.',
    formula: 'Brand Value = sum of historical marketing spend + adjustments for inflation & effectiveness',
    example: 'A new craft whiskey: ~$50M in R&D + $100M in initial marketing',
    pros: 'Conservative; provides floor valuation',
    cons: 'Does not capture earning power; undervalues established brands'
  },
  {
    name: 'Market Comparable Method',
    description: 'Values the brand by reference to comparable brand transactions in the open market.',
    bestFor: 'Recently traded brands or peer comparisons in active M&A markets.',
    formula: 'Brand Value = (Enterprise Value - tangible assets) from comparable transactions',
    example: 'Smirnoff valued at 2.8x revenue based on recent M&A deals in vodka segment',
    pros: 'Market-tested; reflects actual buyer behavior',
    cons: 'Limited comparable transactions; market may be irrational'
  },
  {
    name: 'Price Premium Method',
    description: 'Measures the price premium consumers will pay for the branded product vs. unbranded equivalent.',
    bestFor: 'Consumer-facing brands with clear competitive differentiation.',
    formula: 'Brand Value = (branded price - generic price) × volume × margin multiple',
    example: 'Jack Daniel' + "'" + 's: $5 premium per bottle × 10M bottles/year × 5x margin factor',
    pros: 'Directly reflects consumer willingness-to-pay; intuitive',
    cons: 'Depends on identifying true generic comparator; ignores non-price value'
  },
  {
    name: 'Discounted Cash Flow (Brand)',
    description: 'Projects future cash flows attributable to the brand and discounts to present value.',
    bestFor: 'Established brands with clear growth projections and market position.',
    formula: 'Brand Value = sum of (brand FCF / (1 + discount rate)^year) over 10-20 year horizon',
    example: 'The Macallan: 15-year DCF with 8% WACC and 5.5% terminal growth',
    pros: 'Most theoretically rigorous; captures long-term value creation',
    cons: 'Highly sensitive to terminal growth & discount rate assumptions'
  }
]

const BRAND_VALUATIONS = [
  {
    brand: 'Johnnie Walker',
    parent: 'Diageo',
    estimatedValue: '$8.4B',
    methodology: 'Royalty Relief',
    multiple: '4.2x revenue',
    category: 'Scotch Whisky',
    trend: 'up',
    yoy: '+5.2%',
    notes: 'World' + "'" + 's largest spirits brand; consistent market dominance'
  },
  {
    brand: 'Hennessy',
    parent: 'LVMH',
    estimatedValue: '$7.8B',
    methodology: 'DCF',
    multiple: '5.1x revenue',
    category: 'Cognac',
    trend: 'up',
    yoy: '+3.8%',
    notes: 'Luxury positioning sustains premium multiples; strong Asian growth'
  },
  {
    brand: 'Jack Daniel' + "'" + 's',
    parent: 'Brown-Forman',
    estimatedValue: '$6.1B',
    methodology: 'Royalty Relief',
    multiple: '4.8x revenue',
    category: 'American Whiskey',
    trend: 'up',
    yoy: '+4.1%',
    notes: 'Iconic American brand; steadily growing in key markets'
  },
  {
    brand: 'Smirnoff',
    parent: 'Diageo',
    estimatedValue: '$5.2B',
    methodology: 'Market Comparable',
    multiple: '2.8x revenue',
    category: 'Vodka',
    trend: 'stable',
    yoy: '+0.4%',
    notes: 'Mass-market positioning limits multiple; declining in premium markets'
  },
  {
    brand: 'Bacardi',
    parent: 'Bacardi Limited',
    estimatedValue: '$4.8B',
    methodology: 'Excess Earnings',
    multiple: '3.5x revenue',
    category: 'Rum',
    trend: 'stable',
    yoy: '+1.2%',
    notes: 'Diverse portfolio; privately held limits external valuation data'
  },
  {
    brand: 'The Macallan',
    parent: 'Edrington',
    estimatedValue: '$3.6B',
    methodology: 'DCF',
    multiple: '6.2x revenue',
    category: 'Single Malt Scotch',
    trend: 'up',
    yoy: '+8.9%',
    notes: 'Ultra-premium positioning; investment whisky secondary market strength'
  },
  {
    brand: 'Jameson',
    parent: 'Pernod Ricard',
    estimatedValue: '$3.9B',
    methodology: 'Royalty Relief',
    multiple: '4.1x revenue',
    category: 'Irish Whiskey',
    trend: 'up',
    yoy: '+7.8%',
    notes: 'Category growth leader; strong global distribution'
  },
  {
    brand: 'Absolut',
    parent: 'Pernod Ricard',
    estimatedValue: '$3.5B',
    methodology: 'Market Comparable',
    multiple: '2.2x revenue',
    category: 'Vodka',
    trend: 'down',
    yoy: '-2.1%',
    notes: 'Declining in home markets; Asian expansion mixed results'
  },
  {
    brand: 'Jos' + String.fromCharCode(233) + ' Cuervo',
    parent: 'Becle',
    estimatedValue: '$3.2B',
    methodology: 'DCF',
    multiple: '3.8x revenue',
    category: 'Tequila',
    trend: 'up',
    yoy: '+12.4%',
    notes: 'Tequila category momentum; emerging market growth outpacing US'
  },
  {
    brand: 'Tanqueray',
    parent: 'Diageo',
    estimatedValue: '$2.8B',
    methodology: 'Royalty Relief',
    multiple: '3.6x revenue',
    category: 'Gin',
    trend: 'stable',
    yoy: '+1.8%',
    notes: 'Gin category maturation after growth phase; stable cash generation'
  },
  {
    brand: 'Campari',
    parent: 'Campari Group',
    estimatedValue: '$2.4B',
    methodology: 'Excess Earnings',
    multiple: '3.2x revenue',
    category: 'Aperitivo',
    trend: 'up',
    yoy: '+6.5%',
    notes: 'Category growth from cocktail culture; Italian heritage premium'
  },
  {
    brand: 'Maker' + "'" + 's Mark',
    parent: 'Beam Suntory',
    estimatedValue: '$2.1B',
    methodology: 'Market Comparable',
    multiple: '3.9x revenue',
    category: 'Bourbon',
    trend: 'up',
    yoy: '+5.3%',
    notes: 'Premium bourbon growth; hand-dipped positioning maintains brand cache'
  }
]

const SECTOR_MULTIPLES = [
  {
    category: 'Premium Spirits',
    evRevenue: '5.2x',
    evEbitda: '18.5x',
    peRange: '22-28x',
    dividendYield: '1.8%',
    peg: '2.1x',
    notes: 'Highest multiples in sector; brands like Hennessy, Johnnie Walker command premium',
    examples: 'Diageo (DGE), LVMH spirits'
  },
  {
    category: 'Mass Market Spirits',
    evRevenue: '2.8x',
    evEbitda: '12.4x',
    peRange: '14-18x',
    dividendYield: '2.5%',
    peg: '1.5x',
    notes: 'Volume pressure and commoditization cap multiples; focus on cost discipline',
    examples: 'Smirnoff, Absolut positioning'
  },
  {
    category: 'Beer/Brewing',
    evRevenue: '3.1x',
    evEbitda: '11.8x',
    peRange: '16-22x',
    dividendYield: '2.2%',
    peg: '1.8x',
    notes: 'Craft premiums command above mass market; structural volume headwinds',
    examples: 'AB InBev, Heineken, Constellation'
  },
  {
    category: 'Wine',
    evRevenue: '2.4x',
    evEbitda: '10.2x',
    peRange: '12-16x',
    dividendYield: '3.1%',
    peg: '1.2x',
    notes: 'Structural volume decline weighs on multiples; high dividend focus',
    examples: 'Constellation Brands (wine division)'
  },
  {
    category: 'Non-Alcoholic',
    evRevenue: '6.8x',
    evEbitda: '28.4x',
    peRange: '35-50x',
    dividendYield: '0.2%',
    peg: '3.5x',
    notes: 'Growth premium akin to tech; few pure-plays; trend-driven valuations',
    examples: 'Seedlip, AF Beverages private market'
  },
  {
    category: 'RTD/Cocktails',
    evRevenue: '4.5x',
    evEbitda: '16.2x',
    peRange: '20-30x',
    dividendYield: '0.8%',
    peg: '2.8x',
    notes: 'Growth moderating from pandemic peak; consolidation underway',
    examples: 'Mark Anthony Brands (White Claw), Molson Coors'
  },
  {
    category: 'Luxury/Prestige',
    evRevenue: '7.2x',
    evEbitda: '24.8x',
    peRange: '28-40x',
    dividendYield: '1.2%',
    peg: '2.5x',
    notes: 'Ultra-premium positioning (Louis XIII, Hennessy Paradis); investor scarcity factor',
    examples: 'LVMH spirits, Edrington prestige'
  },
  {
    category: 'Mixers/Ingredients',
    evRevenue: '3.8x',
    evEbitda: '14.5x',
    peRange: '18-24x',
    dividendYield: '1.5%',
    peg: '2.0x',
    notes: 'Fever-Tree benchmark; consumer premiumization on ingredients',
    examples: 'Fever-Tree, specialty bitters/syrups'
  }
]

const MA_VALUATION_BENCHMARKS = [
  {
    year: 2024,
    target: 'Proper No. Twelve',
    acquirer: 'Diageo',
    value: '$600M',
    evRevenue: '4.5x',
    evEbitda: '16.0x',
    category: 'Irish Whiskey',
    premium: '22%'
  },
  {
    year: 2023,
    target: 'Aviation American Gin',
    acquirer: 'Diageo',
    value: '$610M',
    evRevenue: '6.2x',
    evEbitda: '22.0x',
    category: 'Premium Gin',
    premium: '28%'
  },
  {
    year: 2022,
    target: 'Firestone Walker Brewing',
    acquirer: 'Duvel Moortgat',
    value: '$480M',
    evRevenue: '3.8x',
    evEbitda: '14.0x',
    category: 'Craft Beer',
    premium: '18%'
  },
  {
    year: 2022,
    target: 'Casamigos',
    acquirer: 'Diageo',
    value: '$1.0B',
    evRevenue: '8.1x',
    evEbitda: '28.0x',
    category: 'Premium Tequila',
    premium: '35%'
  },
  {
    year: 2021,
    target: 'Don Julio',
    acquirer: 'Diageo',
    value: '$915M',
    evRevenue: '7.4x',
    evEbitda: '26.0x',
    category: 'Premium Tequila',
    premium: '32%'
  },
  {
    year: 2021,
    target: 'Prichards Double Chocolate Bourbon',
    acquirer: 'MGP Ingredients',
    value: '$125M',
    evRevenue: '5.2x',
    evEbitda: '18.5x',
    category: 'Premium Bourbon',
    premium: '21%'
  },
  {
    year: 2020,
    target: 'Whipshots (by Will.i.am)',
    acquirer: 'Diageo',
    value: '$45M',
    evRevenue: '2.8x',
    evEbitda: '10.0x',
    category: 'RTD/Cocktails',
    premium: '15%'
  },
  {
    year: 2023,
    target: 'Topo Chico Hard Seltzer',
    acquirer: 'Molson Coors',
    value: '$275M',
    evRevenue: '3.5x',
    evEbitda: '12.0x',
    category: 'Hard Seltzer/RTD',
    premium: '19%'
  },
  {
    year: 2022,
    target: 'Baron von Wissell (Premium RTD)',
    acquirer: 'Monster Beverage',
    value: '$220M',
    evRevenue: '4.8x',
    evEbitda: '16.5x',
    category: 'RTD/Spirits',
    premium: '25%'
  },
  {
    year: 2021,
    target: 'Tequila Pats' + String.fromCharCode(243) + 'n',
    acquirer: 'Bacardi',
    value: '$158M',
    evRevenue: '3.6x',
    evEbitda: '13.0x',
    category: 'Tequila',
    premium: '17%'
  }
]

const VALUATION_INSIGHTS = [
  {
    title: 'Premium-to-Mass Multiple Spread at All-Time High',
    insight: 'The EV/revenue multiple gap between premium and mass-market spirits has widened to 1.9x (5.2x vs 2.8x). This reflects a structural market divergence.',
    implication: 'Premium positioning and brand equity now carry unprecedented pricing power. Brands pursuing premiumization have greater valuation upside than volume-focused competitors.',
    source: 'Beverage Intelligence Quarterly, Q4 2025'
  },
  {
    title: 'Non-Alcoholic Brands Commanding Tech-Like Multiples',
    insight: 'Non-alcoholic spirits and drinks are trading at 6.8x EV/Revenue, approaching venture/growth multiples. Public liquidity for non-alc brands remains limited.',
    implication: 'Entry into non-alc category provides DTC/high-margin path; however, unit economics must justify premium multiples. Justify with clear path to $100M+ revenue and 40%+ margins.',
    source: 'PitchBook Spirits & Beverages Report, 2025'
  },
  {
    title: 'Tequila Brands Seeing Highest Revenue Multiples in Spirits',
    insight: 'Tequila brands now command 5.8x EV/revenue vs. 4.2x for whisky and 2.8x for vodka. This follows 12+ years of category growth and scarcity of supply.',
    implication: 'Tequila M&A premiums (25-35%) justify higher initial positioning. New entrants must compete on provenance, production story, or category adjacency (mezcal, raicilla).',
    source: 'Goldman Sachs Beverage Sector Report, Feb 2025'
  },
  {
    title: 'Dividend Yields Compressing as Growth Re-Rates Sector',
    insight: 'Large-cap spirits companies (Diageo, Pernod Ricard) seeing dividend yields fall to 1.5-2.0% as investors re-rate growth prospects. Cost inflation moderating.',
    implication: 'Premium brands moving away from dividend-focused value plays toward growth narratives. Faster distribution growth, category innovation, and emerging market expansion drive re-rating.',
    source: 'Bloomberg Equity Research, Q1 2025'
  },
  {
    title: 'Private Market Premiums Averaging 25-35% Above Public Comps',
    insight: 'Recent M&A in spirits shows acquirers paying 25-35% above public market multiples. Premium positioning, DTC capability, and emerging market exposure command premiums.',
    implication: 'Building a spirits brand for acquisition requires clear premium positioning + DTC infrastructure + emerging market footprint to justify M&A premium to public peers.',
    source: 'Pitchbook Spirits M&A Index, 2025'
  },
  {
    title: 'Japanese Whisky Scarcity Driving Secondary Market Valuations',
    insight: 'Scotch single malts and Japanese whisky (Hibiki, Yamazaki) command 3-5x bottle markup on secondary markets. Scarcity and collectibility now significant value drivers.',
    implication: 'Limited-edition and hard-to-find bottles now traded as alternative assets. For new brands, scarcity strategy and limited releases can drive secondary market premium and brand mythology.',
    source: 'Whisky Auctioneer Annual Report, 2024'
  }
]

export default function Valuations() {
  const [data, setData] = useState(null)
  const [signals, setSignals] = useState([])
  const [loading, setLoading] = useState(true)
  const [days, setDays] = useState(90)

  useEffect(() => {
    loadData()
  }, [days])

  const loadData = async () => {
    setLoading(true)
    try {
      const [vals, arb] = await Promise.all([
        api.getValuations(days),
        api.getArbitrage(),
      ])
      setData(vals)
      setSignals(arb)
    } catch (e) {
      console.error('Failed to load valuations:', e)
    }
    setLoading(false)
  }

  // Brand Valuation Table Component
  const BrandValuationTable = () => {
    const [sortBy, setSortBy] = React.useState('value')
    
    const sorted = [...BRAND_VALUATIONS].sort((a, b) => {
      if (sortBy === 'value') {
        const aVal = parseFloat(a.estimatedValue.replace(/\$|B/g, ''))
        const bVal = parseFloat(b.estimatedValue.replace(/\$|B/g, ''))
        return bVal - aVal
      }
      if (sortBy === 'yoy') {
        const aYoy = parseFloat(a.yoy.replace(/[^0-9.-]/g, ''))
        const bYoy = parseFloat(b.yoy.replace(/[^0-9.-]/g, ''))
        return bYoy - aYoy
      }
      return 0
    })

    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-display text-lg text-navy mb-2">Brand Valuations</h2>
          <p className="text-sm text-gray-600">Estimated brand equity across leading spirits companies</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy text-white">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Brand</th>
                <th className="text-left px-4 py-3 font-medium">Parent</th>
                <th 
                  className="text-right px-4 py-3 font-medium cursor-pointer hover:bg-opacity-90"
                  onClick={() => setSortBy('value')}
                >
                  Est. Value {sortBy === 'value' && '▼'}
                </th>
                <th className="text-left px-4 py-3 font-medium">Methodology</th>
                <th className="text-right px-4 py-3 font-medium">Multiple</th>
                <th className="text-center px-4 py-3 font-medium">Trend</th>
                <th 
                  className="text-right px-4 py-3 font-medium cursor-pointer hover:bg-opacity-90"
                  onClick={() => setSortBy('yoy')}
                >
                  YoY {sortBy === 'yoy' && '▼'}
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => (
                <tr key={row.brand} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} title={row.notes}>
                  <td className="px-4 py-3 font-medium text-navy">{row.brand}</td>
                  <td className="px-4 py-3 text-gray-600">{row.parent}</td>
                  <td className="px-4 py-3 text-right font-semibold text-gold">{row.estimatedValue}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs">{row.methodology}</td>
                  <td className="px-4 py-3 text-right text-gray-700">{row.multiple}</td>
                  <td className="px-4 py-3 text-center">
                    {row.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-accent-green inline" />
                    ) : row.trend === 'down' ? (
                      <TrendingDown className="w-4 h-4 text-accent-red inline" />
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className={`px-4 py-3 text-right font-semibold ${row.yoy.startsWith('+') ? 'text-accent-green' : row.yoy.startsWith('-') ? 'text-accent-red' : ''}`}>
                    {row.yoy}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // Sector Multiples Component
  const SectorMultiples = () => {
    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-display text-lg text-navy mb-2">Sector Trading Multiples</h2>
          <p className="text-sm text-gray-600">Current valuation multiples by beverage alcohol segment</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy text-white">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Category</th>
                <th className="text-center px-4 py-3 font-medium">EV/Revenue</th>
                <th className="text-center px-4 py-3 font-medium">EV/EBITDA</th>
                <th className="text-center px-4 py-3 font-medium">P/E Range</th>
                <th className="text-center px-4 py-3 font-medium">Div Yield</th>
                <th className="text-center px-4 py-3 font-medium">PEG</th>
                <th className="text-left px-4 py-3 font-medium text-xs">Notes</th>
              </tr>
            </thead>
            <tbody>
              {SECTOR_MULTIPLES.map((row, i) => (
                <tr key={row.category} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 font-medium text-navy">{row.category}</td>
                  <td className="px-4 py-3 text-center font-semibold text-gold">{row.evRevenue}</td>
                  <td className="px-4 py-3 text-center font-semibold">{row.evEbitda}</td>
                  <td className="px-4 py-3 text-center text-gray-700">{row.peRange}</td>
                  <td className="px-4 py-3 text-center text-gray-700">{row.dividendYield}</td>
                  <td className="px-4 py-3 text-center text-gray-600">{row.peg}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // M&A Benchmarks Component
  const MABenchmarks = () => {
    const sorted = [...MA_VALUATION_BENCHMARKS].sort((a, b) => b.year - a.year)

    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-display text-lg text-navy mb-2">M&A Valuation Benchmarks</h2>
          <p className="text-sm text-gray-600">Recent spirits industry acquisitions and implied multiples</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy text-white">
              <tr>
                <th className="text-center px-4 py-3 font-medium">Year</th>
                <th className="text-left px-4 py-3 font-medium">Target Brand</th>
                <th className="text-left px-4 py-3 font-medium">Acquirer</th>
                <th className="text-right px-4 py-3 font-medium">Deal Value</th>
                <th className="text-center px-4 py-3 font-medium">EV/Revenue</th>
                <th className="text-center px-4 py-3 font-medium">EV/EBITDA</th>
                <th className="text-center px-4 py-3 font-medium">Category</th>
                <th className="text-center px-4 py-3 font-medium">Premium</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => (
                <tr key={`${row.year}-${row.target}`} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-center font-semibold text-navy">{row.year}</td>
                  <td className="px-4 py-3 font-medium text-gold">{row.target}</td>
                  <td className="px-4 py-3 text-gray-600">{row.acquirer}</td>
                  <td className="px-4 py-3 text-right font-semibold">{row.value}</td>
                  <td className="px-4 py-3 text-center text-gold font-semibold">{row.evRevenue}</td>
                  <td className="px-4 py-3 text-center">{row.evEbitda}</td>
                  <td className="px-4 py-3 text-center text-xs text-gray-600">{row.category}</td>
                  <td className="px-4 py-3 text-center font-semibold text-accent-green">{row.premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // Valuation Insights Component
  const ValuationInsights = () => {
    return (
      <div>
        <h2 className="font-display text-lg text-navy mb-4">Valuation Insights & Trends</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {VALUATION_INSIGHTS.map((insight, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex gap-3 mb-2">
                <Info className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <h3 className="font-semibold text-navy">{insight.title}</h3>
              </div>
              <p className="text-sm text-gray-700 mb-3">{insight.insight}</p>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-3">
                <p className="text-xs font-medium text-blue-900 mb-1">Implication:</p>
                <p className="text-xs text-blue-800">{insight.implication}</p>
              </div>
              <p className="text-xs text-gray-500 italic">Source: {insight.source}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Valuation Methodologies Component
  const ValuationMethodologies = () => {
    const [expanded, setExpanded] = React.useState(null)

    return (
      <div>
        <h2 className="font-display text-lg text-navy mb-4">Brand Valuation Methodologies</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {BRAND_VALUATION_MODELS.map((method, i) => (
            <div 
              key={i}
              className="bg-white rounded-xl border border-gray-100 overflow-hidden cursor-pointer hover:border-gold transition-colors"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="p-4 bg-gradient-to-r from-navy to-navy">
                <div className="flex justify-between items-start gap-3">
                  <h3 className="font-semibold text-white">{method.name}</h3>
                  {expanded === i ? (
                    <ArrowUpRight className="w-4 h-4 text-gold flex-shrink-0" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-gold flex-shrink-0" />
                  )}
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-700 mb-3">{method.description}</p>
                {expanded === i && (
                  <>
                    <div className="mb-3 pb-3 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-600 mb-1">BEST FOR:</p>
                      <p className="text-sm text-gray-700">{method.bestFor}</p>
                    </div>
                    <div className="mb-3 pb-3 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-600 mb-1">FORMULA:</p>
                      <p className="text-xs text-gray-700 font-mono bg-gray-50 p-2 rounded">{method.formula}</p>
                    </div>
                    <div className="mb-3 pb-3 border-b border-gray-100">
                      <p className="text-xs font-semibold text-gray-600 mb-1">EXAMPLE:</p>
                      <p className="text-xs text-gray-700">{method.example}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <p className="text-xs font-semibold text-accent-green mb-1">Pros:</p>
                        <p className="text-xs text-gray-700">{method.pros}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-accent-red mb-1">Cons:</p>
                        <p className="text-xs text-gray-700">{method.cons}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Build P/E comparison table from latest data point per company
  const latestPE = data ? Object.entries(data).map(([name, info]) => {
    const latest = info.data[info.data.length - 1]
    return {
      name, ticker: info.ticker, ...latest,
    }
  }).sort((a, b) => (a.pe_ttm || 999) - (b.pe_ttm || 999)) : []

  // Build chart data for P/E over time
  const chartData = []
  if (data) {
    const allDates = new Set()
    Object.values(data).forEach(info => info.data.forEach(d => allDates.add(d.date)))
    const sortedDates = [...allDates].sort()

    for (const dt of sortedDates) {
      const point = { date: dt }
      Object.entries(data).forEach(([name, info]) => {
        const match = info.data.find(d => d.date === dt)
        if (match?.pe_ttm) point[name] = match.pe_ttm
      })
      chartData.push(point)
    }
  }

  const companyNames = data ? Object.keys(data) : []

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-navy">Valuations & Arbitrage</h1>
          <p className="text-gray-500 text-sm mt-1">P/E ratios, valuation gaps, and arbitrage signals</p>
        </div>
        <div className="flex gap-2">
          {[30, 90, 180, 365].map(d => (
            <button key={d} onClick={() => setDays(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                ${days === d ? 'bg-navy text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {d}d
            </button>
          ))}
        </div>
      </div>

      {/* P/E Ratio Chart */}
      {chartData.length > 1 && (
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-display text-lg text-navy mb-4">P/E Ratio Trend</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={[0, 'auto']} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              {companyNames.map((name, i) => (
                <Line key={name} type="monotone" dataKey={name} stroke={COLORS[i % COLORS.length]}
                  strokeWidth={2} dot={false} connectNulls />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* P/E Comparison Table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-display text-lg text-navy">Valuation Comparison</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-navy text-white">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Company</th>
                <th className="text-left px-4 py-3 font-medium">Ticker</th>
                <th className="text-right px-4 py-3 font-medium">Price</th>
                <th className="text-right px-4 py-3 font-medium">P/E (TTM)</th>
                <th className="text-right px-4 py-3 font-medium">P/E (Fwd)</th>
                <th className="text-right px-4 py-3 font-medium">Div Yield</th>
                <th className="text-right px-4 py-3 font-medium">Mkt Cap</th>
              </tr>
            </thead>
            <tbody>
              {latestPE.map((row, i) => (
                <tr key={row.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 font-medium text-navy">{row.name}</td>
                  <td className="px-4 py-3 text-gray-500">{row.ticker}</td>
                  <td className="px-4 py-3 text-right">{row.currency} {row.price?.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    <span className={row.pe_ttm && row.pe_ttm < 12 ? 'text-accent-green' : row.pe_ttm && row.pe_ttm > 25 ? 'text-accent-red' : ''}>
                      {row.pe_ttm ? `${row.pe_ttm.toFixed(1)}x` : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">{row.pe_forward ? `${row.pe_forward.toFixed(1)}x` : '—'}</td>
                  <td className="px-4 py-3 text-right">{row.dividend_yield ? `${(row.dividend_yield * 100).toFixed(1)}%` : '—'}</td>
                  <td className="px-4 py-3 text-right text-gray-500">
                    {row.market_cap ? `$${(row.market_cap / 1e9).toFixed(1)}B` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Arbitrage Signals */}
      <div>
        <h2 className="font-display text-lg text-navy mb-4">Arbitrage & Intelligence Signals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {signals.map((s, i) => (
            <SignalCard key={i} signal={s} />
          ))}
        </div>
      </div>

      {/* Brand Valuations */}
      <BrandValuationTable />

      {/* Sector Trading Multiples */}
      <SectorMultiples />

      {/* Valuation Insights */}
      <ValuationInsights />

      {/* M&A Valuation Benchmarks */}
      <MABenchmarks />

      {/* Valuation Methodologies */}
      <ValuationMethodologies />
    </div>
  )
}
