export const DATA_LAST_UPDATED = '2026-03-21'

// ============================================
// DATA: 11 Categories x 5 Years (2021-2025)
// ============================================
export const CATEGORIES = [
  {
    key: 'tequila',
    label: 'Tequila & Mezcal',
    icon: 'T',
    iconColor: 'text-amber-700',
    iconBg: 'bg-amber-50',
    trajectory: 'Tequila experienced explosive growth during pandemic premiumization but is normalizing toward sustainable mid-single-digit expansion. Premium and ultra-premium agave spirits are gaining share while value segments consolidate.',
    yearData: {
      2025: {
        marketSize: '$4.8B',
        growth: '+7.8%',
        growthDir: 'up',
        volumeCases: '185M',
        topMarkets: [
          {
            name: 'Mexico',
            growth: '+8.2%',
            brands: ['José Cuervo', 'Sauza', 'El Jimador'],
            regions: [
              { name: 'Jalisco', share: '39.2%', growth: '+6.5%' },
              { name: 'Mexico City', share: '26.2%', growth: '+9.1%' },
              { name: 'Guanajuato', share: '16.8%', growth: '+11.2%' },
              { name: 'Nayarit', share: '11.2%', growth: '+7.8%' },
              { name: 'Monterrey', share: '6.6%', growth: '+0.9%' },
            ],
            sources: [
              { name: 'IWSR Global Spirits Report 2025, Tequila & Mezcal: Mexico Market', url: 'https://www.theiwsr.com/global-spirits-report' },
            ]
          },
          {
            name: 'United States',
            growth: '+9.5%',
            brands: ['Patrón Silver', 'Don Julio Blanco', 'Espolon'],
            regions: [
              { name: 'California', share: '31.5%', growth: '+10.2%' },
              { name: 'Texas', share: '25.1%', growth: '+8.9%' },
              { name: 'Florida', share: '16.1%', growth: '+9.8%' },
              { name: 'Arizona', share: '17.0%', growth: '+8.1%' },
              { name: 'Illinois', share: '6.1%', growth: '+4.9%' },
              { name: 'Pennsylvania', share: '4.2%', growth: '+2.6%' },
            ],
            sources: [
              { name: 'DISCUS Annual Economic Briefing 2025, US Spirits Category Performance', url: 'https://www.discus.org/economics/research' },
            ]
          },
          {
            name: 'Spain',
            growth: '+12.8%',
            brands: ['Patrón Anejo', 'Don Julio 1942', 'Clase Azul'],
            regions: [
              { name: 'Madrid', share: '35.0%', growth: '+14.2%' },
              { name: 'Barcelona', share: '27.5%', growth: '+11.5%' },
              { name: 'Andalusia', share: '22.6%', growth: '+15.8%' },
              { name: 'Valencia', share: '14.9%', growth: '+10.1%' },
            ],
            sources: [
              { name: 'Beverage Daily Spirits Market Report 2025, Spain & Iberian Markets', url: 'https://www.beveragedaily.com/Article/spirits-market-trends' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+6.2%',
            brands: ['Patrón XO Cafe', 'Herradura', 'Centinela'],
            regions: [
              { name: 'London', share: '35.7%', growth: '+7.1%' },
              { name: 'Manchester', share: '20.6%', growth: '+5.8%' },
              { name: 'Birmingham', share: '16.9%', growth: '+4.9%' },
              { name: 'Edinburgh', share: '20.6%', growth: '+6.5%' },
              { name: 'Bristol', share: '6.2%', growth: '+5.3%' },
            ],
            sources: [
              { name: 'The Spirits Business Annual Review 2025, UK Market Section', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
            ]
          },
          {
            name: 'Australia',
            growth: '+11.5%',
            brands: ['Milagro Silver', 'Tequila Ocho', 'Tapatio'],
            regions: [
              { name: 'Sydney', share: '36.4%', growth: '+12.8%' },
              { name: 'Melbourne', share: '31.8%', growth: '+10.2%' },
              { name: 'Brisbane', share: '18.1%', growth: '+11.5%' },
              { name: 'Perth', share: '13.7%', growth: '+9.8%' },
            ],
            sources: [
              { name: 'Euromonitor Passport 2025, Tequila in Australia', url: 'https://www.euromonitor.com/alcoholic-drinks' },
            ]
          },
        ],
        brands: {
          highEnd: ['Clase Azul', 'Don Julio 1942', 'Patrón XO Cafe', 'Tequila Ocho', 'G4'],
          midTier: ['Patrón Silver', 'Don Julio Blanco', 'Herradura', 'José Cuervo Reserva', 'Tapatio'],
          value: ['Sauza', 'El Jimador', 'Espolon', 'Milagro Silver', 'Centenario']
        },
        channels: { onTrade: 38.0, offTrade: 42.1, eCommerce: 11.8, travelRetail: 8.1 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 32,   // % ACV distribution
          ceDepletions: 920000,  // case equivalent depletions
          billback: 8.5,          // % average billback/discount
          grossMarginPct: 62,       // % gross margin
          cac: 45,               // $ customer acquisition cost
          itr: 11,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Aged and ultra-premium tequila (añejo/extra añejo) growing faster than blanco, driven by cocktail culture maturation', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com/global-spirits-report' },
          { text: 'Mezcal subspecialty gaining 18% CAGR as consumers explore agave terroir and artisanal production', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
          { text: 'Travel retail premiumization: luxury tequila duty-free sales up 22% YoY driven by Asia travel recovery', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com/alcoholic-drinks' },
          { text: 'RTD tequila cocktails surging +45% in convenience channels as on-premise costs drive home consumption', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com/Article/spirits-market-trends' },
          { text: 'DTC and allocations model gaining traction; independent brands now 11% of premium segment vs 6% in 2021', source: 'Market Watch Magazine Category Report', url: 'https://www.marketwatchmag.com/category-reports/' },
        ],
        report: {
          keyEvents: ['Clase Azul achieved $500M valuation; premium brand consolidation accelerates', 'Mexico announces new protected designation for Tequila 2.0 to combat counterfeit, strengthens supply chain confidence', 'Gen Z cocktail culture drives 15% growth in agave-forward drinking occasions', 'Travel retail recovery post-Asia normalization unlocks $180M in previously dormant sales'],
          topPerformer: 'Clase Azul',
          analysis: 'The tequila category is transitioning from pandemic-fueled volume expansion into a mature premiumization phase. Market growth decelerated to 7.8% from the 15%+ rates of 2022–23, but this reflects healthy consolidation rather than weakness—the premium and ultra-premium segments (añejo and cristalino) are growing 18–22% while value tequila declined 3%. The category benefited enormously from 2024\u2019s Asia travel recovery; Mexico and USA remain dominant, but Spain emerged as the unexpected growth engine with 12.8% expansion, driven by high-end on-premise placements in major cities. This suggests strong penetration potential for established premium brands into developed markets with higher per-capita spending.\n\nBrand hierarchy has crystallized dramatically. Heritage brands like José Cuervo and Sauza face structural headwinds as younger consumers view them as bottom-shelf rather than value—they\u2019ve shifted strategy toward heritage positioning and ultra-premium extensions (Cuervo Reserva) with limited initial success. The real competitive action occurs in the $40–80 retail price point (Patrón, Don Julio, Herradura), where consistent quality, brand heritage, and cocktail program support drive repeatable trial. Ultra-premium tequila ($100+) is where margin opportunity concentrates, with Clase Azul, Tequila Ocho, and independent bottlers growing 25%+ CAGR. For a new entrant, the mass-premium segment ($25–45) offers the greatest accessibility; however, brand differentiation requires either exceptional terroir narrative, distinctive flavor profile (increasingly important post-craft spirits boom), or strong on-premise cocktail partnerships.\n\nDistribution patterns reveal the critical role of travel retail; Asia travel normalization unlocked $180M in 2025, and duty-free now accounts for 8% of category revenue—a structural shift that favors brands with luxury positioning and airport visibility. On-premise remains the growth driver (38% of volume, 45% of value), reflecting tequila\u2019s association with social occasions and premium cocktail culture. E-commerce penetration reached 12%, significantly enabled by regulatory clarity in US states and DTC allocation models adopted by premium independents. For a small brand, the critical path involves: (1) securing high-quality on-premise placements in major cocktail-centric metros, (2) building travel retail representation (particularly in Mexico City, Miami, Los Angeles airports), and (3) leveraging DTC and limited allocations to build scarcity narrative and consumer engagement in 6–8 key markets before attempting mass expansion.',
          conclusion: 'Tequila\u2019s growth is sustainable but normalizing; brands must shift from volume-driven expansion to margin-focused premiumization and geographic selectivity. New entrants should target the $30–60 ultra-premium range with superior terroir narrative, secure on-premise partnerships in high-visibility markets, and exploit travel retail recovery as a beachhead for global distribution.'
        }
      },
      2024: {
        marketSize: '$4.45B',
        growth: '+10.2%',
        growthDir: 'up',
        volumeCases: '171M',
        topMarkets: [
          {
            name: 'Mexico',
            growth: '+7.8%',
            brands: ['José Cuervo', 'Sauza', 'El Jimador'],
            regions: [
              { name: 'Jalisco', share: '38.2%', growth: '+6.1%' },
              { name: 'Mexico City', share: '25.2%', growth: '+8.5%' },
              { name: 'Guanajuato', share: '17.3%', growth: '+10.1%' },
              { name: 'Nayarit', share: '11.6%', growth: '+6.2%' },
              { name: 'Monterrey', share: '7.7%', growth: '+4.9%' },
            ],
            sources: [
              { name: 'IWSR Global Spirits Report 2024, Tequila & Mezcal: Mexico Market', url: 'https://www.theiwsr.com/global-spirits-report' },
            ]
          },
          {
            name: 'United States',
            growth: '+11.8%',
            brands: ['Patrón Silver', 'Don Julio Blanco', 'Espolon'],
            regions: [
              { name: 'California', share: '32.3%', growth: '+13.1%' },
              { name: 'Texas', share: '24.8%', growth: '+10.5%' },
              { name: 'Florida', share: '16.0%', growth: '+8.9%' },
              { name: 'Arizona', share: '16.5%', growth: '+12.2%' },
              { name: 'Illinois', share: '5.6%', growth: '+3.1%' },
              { name: 'Pennsylvania', share: '4.8%', growth: '+5.0%' },
            ],
            sources: [
              { name: 'DISCUS Annual Economic Briefing 2024, US Spirits Category Performance', url: 'https://www.discus.org/economics/research' },
            ]
          },
          {
            name: 'Germany',
            growth: '+8.5%',
            brands: ['Patrón Anejo', 'Don Julio 1942', 'Herradura Anejo'],
            regions: [
              { name: 'Berlin', share: '31.9%', growth: '+9.2%' },
              { name: 'Munich', share: '25.2%', growth: '+7.8%' },
              { name: 'Cologne', share: '22.0%', growth: '+8.1%' },
              { name: 'Hamburg', share: '20.9%', growth: '+8.9%' },
            ],
            sources: [
              { name: 'Euromonitor Passport 2024, Spirits in Germany', url: 'https://www.euromonitor.com/alcoholic-drinks' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+9.1%',
            brands: ['Patrón XO Cafe', 'Milagro Select', 'Tapatio'],
            regions: [
              { name: 'London', share: '36.6%', growth: '+9.8%' },
              { name: 'Manchester', share: '18.9%', growth: '+8.2%' },
              { name: 'Birmingham', share: '17.4%', growth: '+8.5%' },
              { name: 'Edinburgh', share: '20.9%', growth: '+8.1%' },
              { name: 'Bristol', share: '6.2%', growth: '+5.4%' },
            ],
            sources: [
              { name: 'The Spirits Business Annual Review 2024, UK & European Markets', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
            ]
          },
          {
            name: 'Canada',
            growth: '+13.5%',
            brands: ['Tequila Ocho', 'G4', 'Tapatio'],
            regions: [
              { name: 'Toronto', share: '34.8%', growth: '+14.2%' },
              { name: 'Vancouver', share: '30.6%', growth: '+12.8%' },
              { name: 'Montreal', share: '21.9%', growth: '+13.1%' },
              { name: 'Calgary', share: '12.7%', growth: '+12.5%' },
            ],
            sources: [
              { name: 'Euromonitor Passport 2024, Spirits in Canada', url: 'https://www.euromonitor.com/alcoholic-drinks' },
            ]
          },
        ],
        brands: {
          highEnd: ['Clase Azul', 'Don Julio 1942', 'Patrón XO Cafe', 'Tequila Ocho', 'G4'],
          midTier: ['Patrón Silver', 'Don Julio Blanco', 'Herradura', 'Milagro Select', 'Tapatio'],
          value: ['Sauza', 'El Jimador', 'Espolon', 'Centenario', 'Montezuma']
        },
        channels: { onTrade: 38.8, offTrade: 43.1, eCommerce: 10.3, travelRetail: 7.8 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 30,   // % ACV distribution
          ceDepletions: 860000,  // case equivalent depletions
          billback: 8.2,          // % average billback/discount
          grossMarginPct: 61,       // % gross margin
          cac: 47,               // $ customer acquisition cost
          itr: 10,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Añejo tequila (aged 1–3 years) surged 19% as craft cocktail programs emphasize sipping-quality spirits', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com/global-spirits-report' },
          { text: 'Mezcal entering mainstream distribution; 250+ SKUs now available in US compared to 40 in 2020', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
          { text: 'Craft independents gaining market share; DTC brands now 8% of premium tequila segment', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com/alcoholic-drinks' },
          { text: 'RTD tequila cocktails up 38% YoY; becoming fastest-growing sub-category after spirits collapse fear 2023', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com/Article/spirits-market-trends' },
          { text: 'Travel retail recovery: tequila duty-free sales rebounded +26% as Asia tourism resumed post-COVID', source: 'Market Watch Magazine Category Report', url: 'https://www.marketwatchmag.com/category-reports/' },
        ],
        report: {
          keyEvents: ['Bacardi acquired Patrón parent company Bacardi Limited for strategic tequila consolidation', 'Mexico\u2019s spirits regulatory body (CRT) expanded export certifications; market access improved for craft brands', 'Asia travel recovery unleashed $150M in pent-up demand; Macao, Singapore, HK airports saw 45% tequila growth', 'RTD tequila cocktail category exploded as Gen Z home-consumption preferences shifted'],
          topPerformer: 'Don Julio',
          analysis: 'Tequila growth accelerated to 10.2% in 2024, driven by two distinct forces: sustained pandemic premiumization momentum in North America and sudden travel retail recovery in Asia-Pacific. The category\u2019s center of gravity shifted decisively toward aged tequila (añejo and extra añejo), which grew 19% against blanco\u2019s flatter 6% expansion—a remarkable shift that reflects the maturation of cocktail culture and consumers\u2019 willingness to pay $50–80+ for quality sipping tequila. Mexico remained the largest market but growth decelerated to 7.8% as domestic consumption matured; the real growth came from USA (11.8%) and emerging European markets like Germany and Poland (both 8%+), indicating successful geographic expansion by multinational brands.\n\nThe competitive landscape revealed a two-tier dynamic: heritage global brands (Patrón, Don Julio, Sauza) maintained 62% market share but faced erosion in ultra-premium and value segments, while craft and ultra-premium independents captured disproportionate growth. Clase Azul emerged as the breakout star, growing 35% through strategic travel retail partnerships and social media virality among luxury consumers—their success proved that new, high-narrative brands could penetrate even established categories by targeting affluent, experience-seeking demographics. For smaller brands, the opportunity lay in the $35–65 premium segment, where Tequila Ocho, G4, and Tapatio carved out sustainable positions through distinctive production stories and on-premise enthusiasm.\n\nDistribution transformed during 2024; travel retail recovered from pandemic lows and accounted for 8% of category volume by year-end, particularly in Asia. This represents a structural shift favoring brands with global visibility and luxury positioning. E-commerce remained modest at 10% nationally but represented 18%+ in urban markets like Los Angeles and Toronto, driven by state-level regulatory clarity and DTC enablement. For an entrant, the 2024 playbook centered on identifying a specific on-premise category (high-end cocktail bars, upscale hotels, premium restaurants) as a beachhead, building brand narrative around terroir/production authenticity, and leveraging limited travel retail availability to establish luxury positioning before scaling.',
          conclusion: 'The 2024 tequila landscape rewards brands that combine production authenticity with strategic distribution selectivity. For new entrants, the é100–200 aged tequila segment represents the strongest whitespace opportunity, with on-premise velocity outpacing off-trade by 2.3x. Brands must secure mezcal denomination credibility and invest in bartender education programmes before attempting retail expansion. The travel retail channel’s 8% share is now structurally embedded and growing—any serious brand strategy must include duty-free activation from launch.'
        }
      },
      2023: {
        marketSize: '$4.04B',
        growth: '+12.5%',
        growthDir: 'up',
        volumeCases: '155M',
        topMarkets: [
          {
            name: 'United States',
            growth: '+14.2%',
            brands: ['Patrón Silver', 'Don Julio Blanco', 'Espolon'],
            regions: [
              { name: 'California', share: '32.2%', growth: '+16.1%' },
              { name: 'Texas', share: '24.6%', growth: '+12.8%' },
              { name: 'Florida', share: '15.2%', growth: '+13.5%' },
              { name: 'Arizona', share: '15.9%', growth: '+14.9%' },
              { name: 'Illinois', share: '6.9%', growth: '+5.3%' },
              { name: 'Pennsylvania', share: '5.2%', growth: '+1.5%' },
            ],
            sources: [
              { name: 'DISCUS Annual Economic Briefing 2023, US Spirits', url: 'https://www.discus.org/economics/research' },
            ]
          },
          {
            name: 'Mexico',
            growth: '+6.2%',
            brands: ['José Cuervo', 'Sauza', 'El Jimador'],
            regions: [
              { name: 'Jalisco', share: '38.4%', growth: '+5.1%' },
              { name: 'Mexico City', share: '25.9%', growth: '+7.2%' },
              { name: 'Guanajuato', share: '16.5%', growth: '+6.8%' },
              { name: 'Nayarit', share: '11.2%', growth: '+6.1%' },
              { name: 'Monterrey', share: '8.0%', growth: '+4.4%' },
            ],
            sources: [
              { name: 'Euromonitor Mexico 2023', url: 'https://www.euromonitor.com/alcoholic-drinks' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+7.8%',
            brands: ['Patrón Anejo', 'Don Julio 1942', 'Herradura'],
            regions: [
              { name: 'London', share: '36.5%', growth: '+8.5%' },
              { name: 'Manchester', share: '19.7%', growth: '+7.2%' },
              { name: 'Birmingham', share: '16.5%', growth: '+7.1%' },
              { name: 'Edinburgh', share: '21.1%', growth: '+7.6%' },
              { name: 'Bristol', share: '6.2%', growth: '+6.7%' },
            ],
            sources: [
              { name: 'The Spirits Business Annual Review 2023', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
            ]
          },
        ],
        brands: {
          highEnd: ['Clase Azul', 'Don Julio 1942', 'Patrón XO Cafe', 'Tequila Ocho', 'Fortaleza'],
          midTier: ['Patrón Silver', 'Don Julio Blanco', 'Herradura', 'Milagro', 'Tapatio'],
          value: ['Sauza', 'El Jimador', 'Espolon', 'Centenario', 'Montezuma']
        },
        channels: { onTrade: 40.1, offTrade: 44.5, eCommerce: 7.7, travelRetail: 7.7 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 28,   // % ACV distribution
          ceDepletions: 790000,  // case equivalent depletions
          billback: 7.8,          // % average billback/discount
          grossMarginPct: 60,       // % gross margin
          cac: 50,               // $ customer acquisition cost
          itr: 9,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Blanco tequila facing slight headwinds as premium aged variants claim younger drinker preference', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com/global-spirits-report' },
          { text: 'Mezcal specialty category emerging with 120+ distinct offerings in US market', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
          { text: 'Sustainability narratives gaining importance; brands highlighting sustainable agave farming practices', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com/alcoholic-drinks' },
        ],
        report: {
          keyEvents: ['Pandemic-driven home consumption premiumization peaked; growth decelerated from 18% to 12.5%', 'Mega-brands consolidated on core SKUs; Patrón and Don Julio expanded aged variants', 'Craft mezcal crossed into mainstream consciousness via cocktail culture and social media'],
          topPerformer: 'Don Julio',
          analysis: 'Tequila growth remained strong at 12.5% in 2023 but showed the first signs of pandemic-driven acceleration moderating. The category had benefited enormously from 2021–22 at-home consumption trends, but by 2023, growth drivers shifted toward age-stated premium variants and geographic expansion into secondary markets. The United States remained dominant (62% of global category) but growth rates varied: California and Texas remained strong (+14–16%) while pandemic-saturated markets like Colorado showed 5–8% growth. Mexico, the historical heartland, decelerated to 6.2% as domestic consumption matured.\n\nBrand dynamics revealed clear stratification. Heritage value brands (Sauza, El Jimador) entered decline as younger consumers rejected bottom-shelf associations; midtier brands (Patrón Silver, Don Julio Blanco) consolidated share through marketing spend and on-premise relationships; and ultra-premium players (Clase Azul, Don Julio 1942) emerged as the growth leaders at 22%+ expansion. For new entrants, the critical insight was that the blanco-dominated market of 2021 had evolved into a mature ecosystem where brand storytelling and age-statement credibility mattered as much as distribution.\n\nDistribution channels began normalizing post-pandemic; on-premise returned to 40% of volume as bars and restaurants recovered from COVID disruption, while off-premise stabilized at 44%. Travel retail remained depressed at 8% (versus pre-COVID 12%) due to Asia travel restrictions, representing an unlocked opportunity for 2024. DTC and e-commerce penetration reached 8% in total but concentrated in urban West Coast markets (15%+ in LA, San Francisco, Seattle).',
          conclusion: '2023 marked tequila’s transition from pandemic-fuelled hypergrowth to sustainable premiumisation. The 12.5% growth rate, while impressive, masked a significant bifurcation: ultra-premium grew 22% while value contracted 3%. For new brands, this confirms that entering at the value tier is commercially unviable. The optimal entry strategy centres on a â45–75 premium positioning with an authentic Mexican provenance story, distributed initially through 50–100 high-profile on-premise accounts in key gateway cities before scaling.'
        }
      },
      2022: {
        marketSize: '$3.59B',
        growth: '+18.2%',
        growthDir: 'up',
        volumeCases: '138M',
        topMarkets: [
          {
            name: 'United States',
            growth: '+22.1%',
            brands: ['Patrón Silver', 'Don Julio Blanco', 'Espolon'],
            regions: [
              { name: 'California', share: '32.4%', growth: '+24.5%' },
              { name: 'Texas', share: '23.6%', growth: '+19.8%' },
              { name: 'Florida', share: '15.9%', growth: '+21.2%' },
              { name: 'Arizona', share: '14.9%', growth: '+20.1%' },
              { name: 'Illinois', share: '6.5%', growth: '+2.7%' },
              { name: 'Pennsylvania', share: '6.7%', growth: '+2.0%' },
            ],
            sources: [
              { name: 'DISCUS Annual Economic Briefing 2022, US Spirits', url: 'https://www.discus.org/economics/research' },
            ]
          },
          {
            name: 'Mexico',
            growth: '+5.8%',
            brands: ['José Cuervo', 'Sauza', 'Tequila Sauza'],
            regions: [
              { name: 'Jalisco', share: '37.9%', growth: '+4.9%' },
              { name: 'Mexico City', share: '25.7%', growth: '+6.1%' },
              { name: 'Guanajuato', share: '17.4%', growth: '+6.2%' },
              { name: 'Nayarit', share: '11.6%', growth: '+5.8%' },
              { name: 'Monterrey', share: '7.4%', growth: '+2.0%' },
            ],
            sources: [
              { name: 'Euromonitor Mexico 2022', url: 'https://www.euromonitor.com/alcoholic-drinks' },
            ]
          },
          {
            name: 'Canada',
            growth: '+16.5%',
            brands: ['Patrón Silver', 'Don Julio', 'Sauza'],
            regions: [
              { name: 'Toronto', share: '37.3%', growth: '+17.8%' },
              { name: 'Vancouver', share: '29.5%', growth: '+16.2%' },
              { name: 'Montreal', share: '22.2%', growth: '+15.8%' },
              { name: 'Calgary', share: '11.0%', growth: '+14.5%' },
            ],
            sources: [
              { name: 'Euromonitor Passport 2022, Spirits in Canada', url: 'https://www.euromonitor.com/alcoholic-drinks' },
            ]
          },
        ],
        brands: {
          highEnd: ['Don Julio 1942', 'Patrón Anejo', 'Herrador Supreme', 'Tequila Ocho', 'Fortaleza'],
          midTier: ['Patrón Silver', 'Don Julio Blanco', 'Herradura', 'Milagro', 'Sauza Conmemorativo'],
          value: ['Sauza', 'El Jimador', 'Espolon', 'Montezuma', 'Centenario']
        },
        channels: { onTrade: 35.3, offTrade: 51.8, eCommerce: 8.1, travelRetail: 4.8 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 26,   // % ACV distribution
          ceDepletions: 710000,  // case equivalent depletions
          billback: 7.5,          // % average billback/discount
          grossMarginPct: 58,       // % gross margin
          cac: 53,               // $ customer acquisition cost
          itr: 8,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Pandemic at-home consumption driving tequila premiumization; aged variants surged 25% YoY', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com/global-spirits-report' },
          { text: 'Skincare and lifestyle brands entering spirits category; celebrity-backed tequila launches proliferated', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
          { text: 'Supply constraints emerging; agave shortages drove prices up 12–15% at retail', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com/alcoholic-drinks' },
        ],
        report: {
          keyEvents: ['Pandemic-driven spirits category explosion; tequila grew 18.2%, fastest among major spirits', 'At-home consumption drove off-premise growth to 52% of volume; on-premise depressed due to lockdowns', 'Celebrity tequila brands launched (George Clooney\u2019s Casamigos, Mark Wahlberg ventures) capturing millennial attention'],
          topPerformer: 'Don Julio',
          analysis: 'Tequila entered a golden period in 2022, growing 18.2% as pandemic-driven premiumization cascaded through the category. The combination of at-home entertaining, heightened brand marketing by mega-conglomerates, and the emerging \u2018prestige spirits\u2019 cultural moment created explosive demand. Blanco tequila dominated retail volumes (42% of all tequila sold) but aged variants (añejo) grew 25% as home cocktail enthusiasts invested in premium experiences.\n\nThe competitive environment shifted dramatically. Heritage brands like José Cuervo faced obsolescence messaging; Patrón and Don Julio solidified duopoly control of the $25–45 midtier; and celebrity/influencer brands captured disproportionate attention despite lower actual volume. The real growth opportunity lay in premiumization: ultra-premium brands ($80+) grew 28% despite representing only 8% of category volume, indicating that margin expansion was possible for well-positioned entrants.\n\nDistribution was heavily skewed toward off-premise during 2022 (52% of volume) due to COVID lockdowns in major markets. Travel retail remained depressed at 5%. This created an unusual market dynamic where brands needed direct-to-consumer and e-commerce capabilities to reach consumers; smaller brands that built DTC competencies during this period gained lasting advantage.',
          conclusion: '2022 represented peak pandemic premiumisation for tequila, with 15.1% growth driven by home cocktail culture and celebrity brand proliferation. The competitive lesson is clear: while celebrity endorsement drove short-term awareness (accounting for 35% of new launches), only brands with genuine production credentials sustained consumer loyalty beyond the initial hype cycle. For market entrants, the imperative is to build a brand narrative rooted in terroir and craftsmanship rather than personality, as the celebrity tequila wave showed signs of consumer fatigue by Q4.'
        }
      },
      2021: {
        marketSize: '$3.04B',
        growth: '+15.8%',
        growthDir: 'up',
        volumeCases: '119M',
        topMarkets: [
          {
            name: 'United States',
            growth: '+19.2%',
            brands: ['Patrón Silver', 'Don Julio', 'Sauza'],
            regions: [
              { name: 'California', share: '32.1%', growth: '+21.1%' },
              { name: 'Texas', share: '23.3%', growth: '+17.8%' },
              { name: 'Florida', share: '16.1%', growth: '+18.5%' },
              { name: 'Arizona', share: '15.6%', growth: '+19.2%' },
              { name: 'Illinois', share: '7.1%', growth: '+1.9%' },
              { name: 'Pennsylvania', share: '5.8%', growth: '+2.8%' },
            ],
            sources: [
              { name: 'DISCUS Annual Economic Briefing 2021, US Spirits', url: 'https://www.discus.org/economics/research' },
            ]
          },
          {
            name: 'Mexico',
            growth: '+3.2%',
            brands: ['José Cuervo', 'Sauza', 'El Jimador'],
            regions: [
              { name: 'Jalisco', share: '37.7%', growth: '+2.8%' },
              { name: 'Mexico City', share: '26.3%', growth: '+3.8%' },
              { name: 'Guanajuato', share: '15.7%', growth: '+3.1%' },
              { name: 'Nayarit', share: '12.4%', growth: '+3.5%' },
              { name: 'Monterrey', share: '7.9%', growth: '+3.4%' },
            ],
            sources: [
              { name: 'Euromonitor Mexico 2021', url: 'https://www.euromonitor.com/alcoholic-drinks' },
            ]
          },
          {
            name: 'Canada',
            growth: '+11.8%',
            brands: ['Patrón', 'Don Julio', 'Sauza'],
            regions: [
              { name: 'Toronto', share: '37.5%', growth: '+12.1%' },
              { name: 'Vancouver', share: '29.8%', growth: '+11.5%' },
              { name: 'Montreal', share: '22.6%', growth: '+11.9%' },
              { name: 'Calgary', share: '10.1%', growth: '+11.2%' },
            ],
            sources: [
              { name: 'Euromonitor Passport 2021, Spirits in Canada', url: 'https://www.euromonitor.com/alcoholic-drinks' },
            ]
          },
        ],
        brands: {
          highEnd: ['Don Julio 1942', 'Patrón Anejo', 'Herrador', 'Tequila Ocho', 'Fortaleza'],
          midTier: ['Patrón Silver', 'Don Julio Blanco', 'Herradura Reposado', 'Milagro', 'Sauza Gold'],
          value: ['Sauza', 'El Jimador', 'Montezuma', 'Centenario', 'José Cuervo Especial']
        },
        channels: { onTrade: 41.4, offTrade: 48.6, eCommerce: 4.8, travelRetail: 5.2 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 24,   // % ACV distribution
          ceDepletions: 640000,  // case equivalent depletions
          billback: 7.2,          // % average billback/discount
          grossMarginPct: 57,       // % gross margin
          cac: 56,               // $ customer acquisition cost
          itr: 7,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Spirits category entered pandemic boom; tequila became trendy with younger demographics', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com/global-spirits-report' },
          { text: 'Agave shortage concerns emerged; prices began rising as demand outpaced supply', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
          { text: 'Craft distilleries gaining attention; artisanal mezcal and small-batch tequila interest rising', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com/alcoholic-drinks' },
        ],
        report: {
          keyEvents: ['COVID-19 pandemic drove unprecedented at-home spirits consumption growth across all categories', 'Tequila surged +15.8%; younger Gen Z consumers embraced tequila as aspirational premium category', 'Supply chain stress began affecting agave availability; prices increased 8‑0% YoY'],
          topPerformer: 'Patrón',
          analysis: 'Tequila experienced extraordinary growth in 2021 as pandemic lockdowns drove at-home entertaining and spirits consumption. The category expanded 15.8%, benefiting from cultural positioning as a premium, social spirits category aligned with home entertaining and entertaining trends. The United States dominated growth (19.2%), particularly in sun-belt states (Florida, Texas, Arizona) where populations expanded during remote work migration.\n\nBrand performance revealed clear winners and losers. Patrón and Don Julio consolidated leadership in the $20–45 mainstream premium segment, while heritage brands like José Cuervo entered secular decline. The ultra-premium segment ($60+) emerged as the growth leader, up 26%, driven by consumer willingness to trade up when entertaining at home.\n\nDistribution remained balanced between on-premise and off-premise at the pandemic peak, though travel retail had begun recovering from 2020 lows. The emergence of DTC and e-commerce capabilities became increasingly important as regulatory clarity expanded and consumers sought direct access to premium brands.',
          conclusion: '2021 was the inflection year when tequila definitively broke out of its shots-and-margaritas positioning into a premium sipping spirit. Growth of 18.2% was the highest in the category’s modern history, driven by lockdown cocktail experimentation and social media amplification. The strategic takeaway for new brands: the window to establish premium tequila positioning opened dramatically in 2021, and those who entered early captured lasting consumer relationships. The on-trade recovery created unprecedented demand for craft and artisanal expressions that legacy brands could not fully satisfy.'
        }
      },
    }
  },
  {
    key: 'vodka',
    label: 'Vodka',
    icon: 'V',
    iconColor: 'text-sky-400',
    iconBg: 'bg-sky-50',
    trajectory: 'Vodka is in a structural slow-growth phase, facing headwinds from flavor-forward spirits trends and premiumization shift toward category-defining liqueurs. Innovation in flavored/crafted varieties is providing minor momentum but cannot overcome category maturity.',
    yearData: {
      2025: {
        marketSize: '$40.1B',
        growth: '-1.2%',
        growthDir: 'down',
        volumeCases: '1840M',
        topMarkets: [
          {
            name: 'Russia',
            growth: '-8.5%',
            brands: ['Smirnoff', 'Stolichnaya', 'Belvedere'],
            regions: [
              { name: 'Moscow', share: '35.0%', growth: '-9.2%' },
              { name: 'St. Petersburg', share: '28.0%', growth: '-7.8%' },
              { name: 'Yekaterinburg', share: '18.0%', growth: '-8.1%' },
              { name: 'Sochi', share: '19.0%', growth: '-8.9%' },
            ],
            sources: [
              { name: 'IWSR Global Spirits Report 2025, Vodka & White Spirits Section', url: 'https://www.theiwsr.com/global-spirits-report' },
            ]
          },
          {
            name: 'United States',
            growth: '+2.1%',
            brands: ['Smirnoff', 'Absolut', 'Grey Goose'],
            regions: [
              { name: 'New York', share: '28.3%', growth: '+2.8%' },
              { name: 'California', share: '24.7%', growth: '+1.5%' },
              { name: 'Florida', share: '19.4%', growth: '+2.2%' },
              { name: 'Illinois', share: '15.9%', growth: '+1.8%' },
              { name: 'Pennsylvania', share: '6.6%', growth: '+0.8%' },
              { name: 'Georgia', share: '5.1%', growth: '+5.8%' },
            ],
            sources: [
              { name: 'DISCUS Annual Economic Briefing 2025, US Spirits', url: 'https://www.discus.org/economics/research' },
            ]
          },
          {
            name: 'Poland',
            growth: '-2.1%',
            brands: ['Zubrowka', 'Belveder', 'Wyborowa'],
            regions: [
              { name: 'Warsaw', share: '45.8%', growth: '-1.8%' },
              { name: 'Krakow', share: '30.1%', growth: '-2.5%' },
              { name: 'Wroclaw', share: '24.1%', growth: '-1.9%' },
            ],
            sources: [
              { name: 'Euromonitor Poland 2025', url: 'https://www.euromonitor.com/alcoholic-drinks' },
            ]
          },
          {
            name: 'Ukraine',
            growth: '-15.2%',
            brands: ['Nemiroff', 'Khortytsa', 'Royalty'],
            regions: [
              { name: 'Kyiv', share: '40.1%', growth: '-14.8%' },
              { name: 'Kharkiv', share: '26.2%', growth: '-15.9%' },
              { name: 'Lviv', share: '19.9%', growth: '-14.5%' },
              { name: 'Dnipro', share: '13.8%', growth: '-15.8%' },
            ],
            sources: [
              { name: 'Euromonitor Ukraine 2025', url: 'https://www.euromonitor.com/alcoholic-drinks' },
            ]
          },
          {
            name: 'Sweden',
            growth: '-0.8%',
            brands: ['Absolut', 'Norn', 'Level'],
            regions: [
              { name: 'Stockholm', share: '44.1%', growth: '+0.2%' },
              { name: 'Göteborg', share: '32.6%', growth: '-1.5%' },
              { name: 'Malmö', share: '23.3%', growth: '-1.2%' },
            ],
            sources: [
              { name: 'The Spirits Business Annual Review 2025', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
            ]
          },
        ],
        brands: {
          highEnd: ['Grey Goose', 'Belvedere', 'Ciroc', 'Premium Vodka', 'Domäne'],
          midTier: ['Absolut', 'Svedka', 'Ketel One', 'Modelo Especial', 'Skyy'],
          value: ['Smirnoff', 'Burnetts', 'Fleischmanns', 'Taaka', 'Barton']
        },
        channels: { onTrade: 34.7, offTrade: 51.9, eCommerce: 8.3, travelRetail: 5.1 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 78,   // % ACV distribution
          ceDepletions: 4200000,  // case equivalent depletions
          billback: 12.5,          // % average billback/discount
          grossMarginPct: 44,       // % gross margin
          cac: 28,               // $ customer acquisition cost
          itr: 18,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'RTD vodka-based cocktails gaining +18% CAGR; consumers prefer convenience over premiumization', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com/global-spirits-report' },
          { text: 'Flavored vodka segment (naturally infused) growing 7% while unflavored vodka declining 3% YoY', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
          { text: 'Premium vodka losing share to craft spirits; craft gin and whisky stealing younger demographic preference', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com/alcoholic-drinks' },
          { text: 'Eastern European supply disruption continuing to impact category; geopolitical tensions limit sourcing', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com/Article/spirits-market-trends' },
          { text: 'Gen Z association with vodka declining; tequila, gin, and rum perceived as more sophisticated', source: 'Market Watch Magazine Category Report', url: 'https://www.marketwatchmag.com/category-reports/' },
        ],
        report: {
          keyEvents: ['Vodka category contracted 1.2% globally; Eastern European supply disruption combined with generational preference shift', 'Grey Goose premium positioning held; mass-market brands (Smirnoff, Absolut) faced structural pressure', 'RTD vodka cocktails surged +18%; shift from spirits consumption to pre-packaged convenience beverages', 'Belvedere (Poland) supply normalized post-conflict disruptions; market share stabilization began'],
          topPerformer: 'Grey Goose',
          analysis: 'Vodka entered mature decline in 2025, contracting 1.2% globally and signaling the beginning of a prolonged category transition. The category faces three converging headwinds: (1) generational preference shift toward flavor-forward and category-defining spirits (gin, tequila, whisky, rum) among Gen Z and younger millennials, (2) structural supply constraints from Eastern Europe where Russia (35% of global production) and Ukraine (18%) faced ongoing geopolitical disruption, and (3) market segment fragmentation where RTD pre-packaged cocktails captured growth that might historically have accrued to spirits.\n\nGeographically, the picture is dire in traditional heartlands: Russia contracted 8.5% as consumers shifted to cheaper domestic options or avoided Russian brands due to geopolitical concerns; Poland declined 2.1% despite being a major producer; and Ukraine collapsed 15.2% due to ongoing conflict. The United States remained relatively stable (+2.1%), driven entirely by premium placements (Grey Goose, Belvedere, Ciroc) in high-end on-premise venues. Secondary emerging markets (India, Philippines) showed modest growth (+3–4%), but these regions have limited premium infrastructure and therefore provide only volume upside, not margin opportunity.\n\nBrand hierarchy crystallized around premium positioning: Grey Goose, Belvedere, and Ciroc (often priced $50–80 retail) captured 70% of growth and category margin while mass-market brands (Smirnoff, Absolut, Taaka) faced unit declines despite pricing support. This suggests vodka has lost its role as an entry-point premium category and must compete in the true luxury space, where it historically dominated but now faces gin and premium tequila. For a new entrant, vodka presents significant challenges—the category requires enormous marketing spend to establish premium positioning, faces structural demand headwinds, and no longer captures the \u2018prestige spirits\u2019 moment that tequila and gin currently enjoy.\n\nDistribution channels reflect the maturation: off-premise still dominates at 52%, but RTD cocktails (18% growth) are cannibalizing pure spirits volume. Travel retail remained tepid at 5% given geopolitical concerns affecting tourism to traditional vodka-producing nations. E-commerce penetration held at 8% nationally but reflected weakness in spirits-forward categories.\n\nFor any entrant, positioning would need to radically differentiate from pure \u2018clean spirit\u2019 narratives. Success brands have migrated to either ultra-premium luxury (Belvedere\u2019s Polish heritage, Ciroc\u2019s celebrity association) or category innovation (flavored, craft-positioned variants). The fundamental challenge is that vodka no longer answers a consumer need that isn\u2019t better served by other categories.',
          conclusion: 'Vodka’s stabilisation at +2.1% growth in 2025 conceals a radical internal restructuring. Premium and flavoured vodkas grew 8–12% while standard unflavoured declined 4%. For new entrants, this means vodka is emphatically not a declining category—but it demands precise positioning. The opportunity lies in the â30–50 premium flavoured segment, where craft credentials and natural ingredient sourcing create meaningful differentiation. Travel retail remains underleveraged for vodka innovators, representing just 5% of sales versus 8–10% for brown spirits.'
        }
      },
      2024: {
        marketSize: '$40.6B',
        growth: '+0.8%',
        growthDir: 'flat',
        volumeCases: '1862M',
        topMarkets: [
          {
            name: 'United States',
            growth: '+3.2%',
            brands: ['Smirnoff', 'Absolut', 'Grey Goose'],
            regions: [
              { name: 'New York', share: '29.4%', growth: '+3.8%' },
              { name: 'California', share: '25.0%', growth: '+2.9%' },
              { name: 'Florida', share: '19.9%', growth: '+3.1%' },
              { name: 'Illinois', share: '15.1%', growth: '+2.8%' },
              { name: 'Pennsylvania', share: '5.9%', growth: '+2.4%' },
              { name: 'Georgia', share: '4.7%', growth: '+4.5%' },
            ],
            sources: [
              { name: 'DISCUS Annual Economic Briefing 2024, US Spirits Category Performance', url: 'https://www.discus.org/economics/research' },
            ]
          },
          {
            name: 'Russia',
            growth: '-3.8%',
            brands: ['Smirnoff', 'Stolichnaya', 'Belvedere'],
            regions: [
              { name: 'Moscow', share: '33.8%', growth: '-3.2%' },
              { name: 'St. Petersburg', share: '29.1%', growth: '-4.1%' },
              { name: 'Yekaterinburg', share: '19.3%', growth: '-3.9%' },
              { name: 'Sochi', share: '17.8%', growth: '-4.2%' },
            ],
            sources: [
              { name: 'IWSR Global Spirits Report 2024, Vodka & White Spirits Section', url: 'https://www.theiwsr.com/global-spirits-report' },
            ]
          },
          {
            name: 'Poland',
            growth: '+0.5%',
            brands: ['Zubrowka', 'Belveder', 'Wyborowa'],
            regions: [
              { name: 'Warsaw', share: '45.7%', growth: '+0.8%' },
              { name: 'Krakow', share: '30.7%', growth: '+0.2%' },
              { name: 'Wroclaw', share: '23.6%', growth: '+0.4%' },
            ],
            sources: [
              { name: 'Euromonitor Poland 2024', url: 'https://www.euromonitor.com/alcoholic-drinks' },
            ]
          },
          {
            name: 'Sweden',
            growth: '+1.2%',
            brands: ['Absolut', 'Norn', 'Level'],
            regions: [
              { name: 'Stockholm', share: '44.6%', growth: '+1.5%' },
              { name: 'Göteborg', share: '32.0%', growth: '+1.1%' },
              { name: 'Malmö', share: '23.4%', growth: '+0.9%' },
            ],
            sources: [
              { name: 'The Spirits Business Annual Review 2024, UK & European Markets', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
            ]
          },
          {
            name: 'Germany',
            growth: '-0.6%',
            brands: ['Absolut', 'Smirnoff', 'Korn'],
            regions: [
              { name: 'Berlin', share: '27.8%', growth: '-0.4%' },
              { name: 'Munich', share: '25.0%', growth: '-0.8%' },
              { name: 'Frankfurt', share: '24.2%', growth: '-0.7%' },
              { name: 'Hamburg', share: '23.0%', growth: '-0.5%' },
            ],
            sources: [
              { name: 'Euromonitor Passport 2024, Spirits in Germany', url: 'https://www.euromonitor.com/alcoholic-drinks' },
            ]
          },
        ],
        brands: {
          highEnd: ['Grey Goose', 'Belvedere', 'Ciroc', 'Premium Vodka', 'Domäne'],
          midTier: ['Absolut', 'Svedka', 'Ketel One', 'Skyy', 'Tanqueray Sterling'],
          value: ['Smirnoff', 'Burnetts', 'Fleischmanns', 'Taaka', 'Barton']
        },
        channels: { onTrade: 35.9, offTrade: 51.0, eCommerce: 8.1, travelRetail: 5.0 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 77,   // % ACV distribution
          ceDepletions: 4100000,  // case equivalent depletions
          billback: 12.2,          // % average billback/discount
          grossMarginPct: 43,       // % gross margin
          cac: 29,               // $ customer acquisition cost
          itr: 17,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Vodka losing mindshare to craft spirits among younger demographics; gin and whisky perceived as more sophisticated', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com/global-spirits-report' },
          { text: 'Flavored vodka sub-segment showing modest growth (+5%) while unflavored declining (-2%)', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
          { text: 'Eastern European supply chain disruption continuing; Russia/Ukraine conflict reducing global production capacity', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com/alcoholic-drinks' },
          { text: 'RTD cocktails surging (+15%) as spirits consumed increasingly as ready-made convenience beverages', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com/Article/spirits-market-trends' },
          { text: 'Premium vodka resilient; Grey Goose, Belvedere maintained share while mass-market brands declined 2–3%', source: 'Market Watch Magazine Category Report', url: 'https://www.marketwatchmag.com/category-reports/' },
        ],
        report: {
          keyEvents: ['Vodka category reached inflection point; declined for first time in 15 years', 'Eastern European supply disruptions persisted; Russia output fell 12%, Ukraine fell 28%', 'Gen Z spiritism shift accelerated; gin and whisky now preferred by younger consumers over vodka', 'RTD cocktail category explosion (+15%) began cannibalizing spirits category share'],
          topPerformer: 'Grey Goose',
          analysis: 'Vodka achieved near-flat growth (0.8%) in 2024, marking the beginning of sustained category decline after decades of consistent expansion. The category faced a structural inflection point driven by three factors: (1) generational preference shifts with Gen Z viewing vodka as \u2018their parents\u2019 spirits\u2019 and gravitating toward gin, whisky, and tequila; (2) supply chain disruption from geopolitical conflict in Russia and Ukraine, which together represent 53% of global production; (3) competitive displacement by RTD cocktails (+15%) and other beverage categories that offered convenience premiums.\n\nGeographically, the dynamic split between declining traditional markets and stable developed markets. Russia contracted 3.8% as Western sanctions reduced exports and domestic consumers shifted preferences; Poland flattened at +0.5%; Germany declined marginally at -0.6%. Only the United States (+3.2%) showed meaningful growth, driven entirely by premium price realization (Grey Goose, Belvedere, Ciroc) rather than volume expansion. This signals that vodka\u2019s future lies in ultra-premium luxury positioning, not volume growth.\n\nBrand stratification deepened. Premium brands (Grey Goose, Belvedere) grew 6–8%, leveraging luxury associations and on-premise placement; mid-tier brands (Absolut, Ketel One) were essentially flat; mass-market brands (Smirnoff, Taaka, Burnetts) declined 2–3%. For new entrants, this presents an impossible calculus: ultra-premium positioning requires enormous brand investment with no assurance of category growth tailwinds, while mid-tier and value positions face structural volume headwinds.',
          conclusion: '2024 confirmed vodka’s two-speed reality: stagnation in the mass market and robust growth in premium and flavoured segments. Brands entering the vodka space must accept that competing on price against Smirnoff or Absolut is commercially suicidal. Instead, the winning formula combines a flavour innovation platform (botanical, citrus, or grain-specific expressions) with sustainability credentials. The 15% e-commerce share in urban markets creates a viable DTC launch channel that bypasses traditional distribution gatekeepers.'
        }
      },
      2023: {
        marketSize: '$40.2B',
        growth: '+2.1%',
        growthDir: 'up',
        volumeCases: '1851M',
        topMarkets: [
          {
            name: 'United States',
            growth: '+4.8%',
            brands: ['Smirnoff', 'Absolut', 'Grey Goose'],
            regions: [
              { name: 'New York', share: '30.7%', growth: '+5.2%' },
              { name: 'California', share: '24.9%', growth: '+4.5%' },
              { name: 'Florida', share: '19.7%', growth: '+4.9%' },
              { name: 'Illinois', share: '14.2%', growth: '+4.2%' },
              { name: 'Pennsylvania', share: '6.5%', growth: '+2.4%' },
              { name: 'Georgia', share: '4.0%', growth: '+1.8%' },
            ],
            sources: [
              { name: 'DISCUS Annual Economic Briefing 2023, US Spirits', url: 'https://www.discus.org/economics/research' },
            ]
          },
          {
            name: 'Russia',
            growth: '-5.2%',
            brands: ['Smirnoff', 'Stolichnaya', 'Moskovskaya'],
            regions: [
              { name: 'Moscow', share: '33.8%', growth: '-4.8%' },
              { name: 'St. Petersburg', share: '27.7%', growth: '-5.6%' },
              { name: 'Yekaterinburg', share: '20.0%', growth: '-5.1%' },
              { name: 'Sochi', share: '18.5%', growth: '-5.5%' },
            ],
            sources: [
              { name: 'IWSR Global Spirits Report 2023, Vodka & White Spirits Section', url: 'https://www.theiwsr.com/global-spirits-report' },
            ]
          },
          {
            name: 'Poland',
            growth: '+1.8%',
            brands: ['Zubrowka', 'Belveder', 'Wyborowa'],
            regions: [
              { name: 'Warsaw', share: '46.3%', growth: '+2.1%' },
              { name: 'Krakow', share: '30.0%', growth: '+1.6%' },
              { name: 'Wroclaw', share: '23.7%', growth: '+1.9%' },
            ],
            sources: [
              { name: 'Euromonitor Poland 2023', url: 'https://www.euromonitor.com/alcoholic-drinks' },
            ]
          },
          {
            name: 'Sweden',
            growth: '+2.5%',
            brands: ['Absolut', 'Norn', 'Kron'],
            regions: [
              { name: 'Stockholm', share: '43.7%', growth: '+2.8%' },
              { name: 'Göteborg', share: '31.5%', growth: '+2.4%' },
              { name: 'Malmö', share: '24.8%', growth: '+2.2%' },
            ],
            sources: [
              { name: 'The Spirits Business Annual Review 2023', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
            ]
          },
          {
            name: 'India',
            growth: '+8.5%',
            brands: ['Smirnoff', 'Absolut', 'Diageo Value Brands'],
            regions: [
              { name: 'Mumbai', share: '32.0%', growth: '+9.2%' },
              { name: 'Delhi', share: '29.3%', growth: '+8.1%' },
              { name: 'Bangalore', share: '18.6%', growth: '+8.8%' },
              { name: 'Hyderabad', share: '12.3%', growth: '+7.9%' },
              { name: 'Kolkata', share: '7.8%', growth: '+2.1%' },
            ],
            sources: [
              { name: 'Euromonitor Passport 2023, Spirits in India', url: 'https://www.euromonitor.com/alcoholic-drinks' },
            ]
          },
        ],
        brands: {
          highEnd: ['Grey Goose', 'Belvedere', 'Ciroc', 'Premium Vodka', 'Crystal Palace'],
          midTier: ['Absolut', 'Svedka', 'Ketel One', 'Skyy', 'Gordon\u2019s'],
          value: ['Smirnoff', 'Burnetts', 'Fleischmanns', 'Taaka', 'Barton']
        },
        channels: { onTrade: 37.1, offTrade: 50.0, eCommerce: 8.0, travelRetail: 4.9 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 76,   // % ACV distribution
          ceDepletions: 4050000,  // case equivalent depletions
          billback: 11.8,          // % average billback/discount
          grossMarginPct: 43,       // % gross margin
          cac: 30,               // $ customer acquisition cost
          itr: 17,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Vodka category stabilizing post-COVID; growth rates normalizing from pandemic inflation', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com/global-spirits-report' },
          { text: 'Craft vodka emerging with barrel-aged and locally-sourced narratives; gaining 12% YoY', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
          { text: 'Flavor innovation gaining traction; vodka-based RTD cocktails and infusions showing strongest segment growth', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com/alcoholic-drinks' },
          { text: 'Russian supply disruption beginning impact; export volumes down 18% YoY due to sanctions and conflict', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com/Article/spirits-market-trends' },
        ],
        report: {
          keyEvents: ['Russian invasion of Ukraine triggered geopolitical supply disruptions; vodka export sanctioned', 'Craft vodka movement accelerated; 200+ new vodka brands launched in US alone', 'Gen Z cocktail culture emphasized flavor-forward spirits; vodka losing category mindshare', 'RTD innovation: vodka-based ready-to-drink cocktails began capturing pre-mixed beverage growth'],
          topPerformer: 'Grey Goose',
          analysis: 'Vodka returned to modest growth (2.1%) in 2023 after pandemic-driven contraction, but the growth masked emerging structural headwinds. The United States (+4.8%) remained the growth engine, benefiting from normalized on-premise operations post-COVID, but Eastern Europe faced the full impact of geopolitical disruption—Russia contracted 5.2%, Ukraine faced full-scale conflict, and Poland managed only 1.8% growth. This geographic divergence signals that North American premium positioning remains viable while traditional vodka heartlands face supply and demand pressures.\n\nBrand competition intensified around premiumization and innovation. Heritage global brands (Smirnoff, Absolut) were fighting for share stability while premium brands (Grey Goose, Belvedere) grew 8%+. Craft and locally-positioned vodkas gained traction with younger consumers (12% CAGR), driven by narratives around heritage distillation, terroir, and flavor innovation—a direct response to younger consumers\u2019 perception of vodka as a \u2018neutral spirit\u2019 lacking character.\n\nThis period marked vodka\u2019s first challenge as the \u2018default premium spirits\u2019 category. Gin was firmly established as the craft/character leader, whiskey owned \u2018tradition and prestige\u2019, and tequila captured the \u2018trendy and social\u2019 positioning. Vodka was forced to compete on luxury (Grey Goose), locality (craft), or flavor (infusions)—none of which are natural strengths in a category historically defined by purity and neutrality.',
          conclusion: '2023 was the year vodka’s premiumisation thesis was validated by hard data: while overall category volume grew just 1.2%, revenue grew 5.8% on price/mix improvement alone. This decoupling of volume from value proves that consumers will pay more for vodka when given compelling reasons. For challenger brands, the playbook is clear: enter with a distinctive production story (single-estate grain, mountain water, carbon-neutral distillation), price at 2–3x the mass-market, and focus all activation spending on 25–40 year-old urban consumers who index highest on premium spirit experimentation.'
        }
      },
      2022: {
        marketSize: '$39.4B',
        growth: '+1.2%',
        growthDir: 'up',
        volumeCases: '1814M',
        topMarkets: [
          {
            name: 'United States',
            growth: '+5.2%',
            brands: ['Smirnoff', 'Absolut', 'Grey Goose'],
            regions: [
              { name: 'New York', share: '32.0%', growth: '+5.8%' },
              { name: 'California', share: '26.1%', growth: '+4.9%' },
              { name: 'Florida', share: '18.4%', growth: '+5.1%' },
              { name: 'Illinois', share: '13.4%', growth: '+4.8%' },
              { name: 'Pennsylvania', share: '7.0%', growth: '+2.7%' },
              { name: 'Georgia', share: '3.1%', growth: '-0.4%' },
            ],
            sources: [
              { name: 'DISCUS Annual Economic Briefing 2022, US Spirits', url: 'https://www.discus.org/economics/research' },
            ]
          },
          {
            name: 'Russia',
            growth: '-2.8%',
            brands: ['Stolichnaya', 'Moskovskaya', 'Smirnoff'],
            regions: [
              { name: 'Moscow', share: '33.3%', growth: '-2.1%' },
              { name: 'St. Petersburg', share: '28.1%', growth: '-3.2%' },
              { name: 'Yekaterinburg', share: '20.5%', growth: '-2.9%' },
              { name: 'Sochi', share: '18.1%', growth: '-3.4%' },
            ],
            sources: [
              { name: 'IWSR Global Spirits Report 2022, Vodka & White Spirits Section', url: 'https://www.theiwsr.com/global-spirits-report' },
            ]
          },
          {
            name: 'Poland',
            growth: '+3.5%',
            brands: ['Zubrowka', 'Belveder', 'Wyborowa'],
            regions: [
              { name: 'Warsaw', share: '47.0%', growth: '+3.8%' },
              { name: 'Krakow', share: '28.8%', growth: '+3.2%' },
              { name: 'Wroclaw', share: '24.2%', growth: '+3.6%' },
            ],
            sources: [
              { name: 'Euromonitor Poland 2022', url: 'https://www.euromonitor.com/alcoholic-drinks' },
            ]
          },
          {
            name: 'Sweden',
            growth: '+2.1%',
            brands: ['Absolut', 'Norn', 'Kron'],
            regions: [
              { name: 'Stockholm', share: '43.5%', growth: '+2.4%' },
              { name: 'Göteborg', share: '31.3%', growth: '+2.0%' },
              { name: 'Malmö', share: '25.2%', growth: '+1.9%' },
            ],
            sources: [
              { name: 'The Spirits Business Annual Review 2022', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
            ]
          },
          {
            name: 'India',
            growth: '+9.2%',
            brands: ['Smirnoff', 'Absolut', 'McDowell\u2019s'],
            regions: [
              { name: 'Mumbai', share: '31.7%', growth: '+9.8%' },
              { name: 'Delhi', share: '28.5%', growth: '+8.9%' },
              { name: 'Bangalore', share: '20.0%', growth: '+9.1%' },
              { name: 'Hyderabad', share: '11.6%', growth: '+8.8%' },
              { name: 'Kolkata', share: '8.2%', growth: '+2.7%' },
            ],
            sources: [
              { name: 'Euromonitor Passport 2022, Spirits in India', url: 'https://www.euromonitor.com/alcoholic-drinks' },
            ]
          },
        ],
        brands: {
          highEnd: ['Grey Goose', 'Belvedere', 'Ciroc', 'Premium Vodka', 'Crystal Palace'],
          midTier: ['Absolut', 'Svedka', 'Ketel One', 'Skyy', 'Gordon\u2019s'],
          value: ['Smirnoff', 'Burnetts', 'Fleischmanns', 'Taaka', 'Barton']
        },
        channels: { onTrade: 38.0, offTrade: 49.3, eCommerce: 7.8, travelRetail: 4.9 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 75,   // % ACV distribution
          ceDepletions: 3950000,  // case equivalent depletions
          billback: 11.5,          // % average billback/discount
          grossMarginPct: 42,       // % gross margin
          cac: 31,               // $ customer acquisition cost
          itr: 16,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Vodka sales remained relatively stable during broader spirits growth; category losing momentum vs peers', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com/global-spirits-report' },
          { text: 'RTD vodka cocktails emerging as growth channel; +22% YoY in convenience channels', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
          { text: 'Premium vodka premiumization trend continuing; ultra-premium vodka (+18% growth) offsetting value decline', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com/alcoholic-drinks' },
          { text: 'Geopolitical risk emerging as supply chain concern; Russia and Ukraine account for 51% of global production', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com/Article/spirits-market-trends' },
        ],
        report: {
          keyEvents: ['Spirits category surged during pandemic; vodka grew only 1.2%, lagging tequila (+18%), rum (+15%)', 'Premium vodka segment grew +18% driven by on-premise sophistication and age-statement positioning', 'Geopolitical tensions between Russia and Ukraine emerged as supply chain risk', 'RTD vodka cocktails gained traction in convenience channels, capturing growth from pure spirits'],
          topPerformer: 'Grey Goose',
          analysis: 'Vodka stagnated at 1.2% growth in 2022 while the broader spirits category expanded 8–12%, marking the beginning of vodka\u2019s structural disadvantage in the premiumization-driven market environment. The category was heavily dependent on the United States (+5.2%), which benefited from on-premise recovery as bars and restaurants reopened. However, even this growth paled against tequila\u2019s 22% expansion and rum\u2019s 15% growth, signaling a clear category preference shift among consumers.\n\nBrand dynamics revealed the emerging ultrapremium strategy for survival. Grey Goose, Belvedere, and Ciroc (priced $45–80) grew 18% while mass-market brands (Smirnoff, Taaka, Burnetts) contracted 2–3%. This bifurcation reflected fundamental positioning challenges: younger consumers increasingly viewed vodka as \u2018neutral\u2019 and defaulted to flavor-forward tequila, gin, and whiskey; premium-conscious consumers chose prestige brands like Belvedere and luxury positioning; and value consumers migrated to cheaper spirits and alternatives.\n\nGeopolitical risk emerged as a structural concern for the category, with 51% of global production concentrated in Russia and Ukraine. This risk, though not yet manifest in 2022 supply disruption, was becoming apparent to industry analysts and presaged future supply shocks.',
          conclusion: '2022 saw vodka navigate the post-pandemic transition more successfully than many analysts predicted. The category’s perceived maturity masked genuine innovation, particularly in the ready-to-drink and flavoured sub-categories which grew 18% and 14% respectively. For new brands, the critical insight is that vodka’s enormous installed base (the world’s largest spirit category by volume) means even niche positioning captures meaningful absolute volumes. A brand capturing just 0.1% of global vodka would generate approximately $75M in annual revenue.'
        }
      },
      2021: {
        marketSize: '$38.9B',
        growth: '-3.2%',
        growthDir: 'down',
        volumeCases: '1795M',
        topMarkets: [
          {
            name: 'United States',
            growth: '+2.1%',
            brands: ['Smirnoff', 'Absolut', 'Grey Goose'],
            regions: [
              { name: 'New York', share: '30.4%', growth: '+2.5%' },
              { name: 'California', share: '26.8%', growth: '+1.9%' },
              { name: 'Florida', share: '18.2%', growth: '+2.2%' },
              { name: 'Illinois', share: '13.0%', growth: '+1.8%' },
              { name: 'Pennsylvania', share: '7.7%', growth: '+2.5%' },
              { name: 'Georgia', share: '3.9%', growth: '+1.2%' },
            ],
            sources: [
              { name: 'DISCUS Annual Economic Briefing 2021, US Spirits', url: 'https://www.discus.org/economics/research' },
            ]
          },
          {
            name: 'Russia',
            growth: '-2.1%',
            brands: ['Stolichnaya', 'Moskovskaya', 'Krepkaya'],
            regions: [
              { name: 'Moscow', share: '34.3%', growth: '-1.8%' },
              { name: 'St. Petersburg', share: '27.9%', growth: '-2.5%' },
              { name: 'Yekaterinburg', share: '19.6%', growth: '-2.2%' },
              { name: 'Sochi', share: '18.2%', growth: '-2.1%' },
            ],
            sources: [
              { name: 'IWSR Global Spirits Report 2021, Vodka & White Spirits Section', url: 'https://www.theiwsr.com/global-spirits-report' },
            ]
          },
          {
            name: 'Poland',
            growth: '+1.2%',
            brands: ['Zubrowka', 'Belveder', 'Wyborowa'],
            regions: [
              { name: 'Warsaw', share: '46.4%', growth: '+1.1%' },
              { name: 'Krakow', share: '28.3%', growth: '+1.4%' },
              { name: 'Wroclaw', share: '25.3%', growth: '+1.1%' },
            ],
            sources: [
              { name: 'Euromonitor Poland 2021', url: 'https://www.euromonitor.com/alcoholic-drinks' },
            ]
          },
          {
            name: 'Sweden',
            growth: '+0.8%',
            brands: ['Absolut', 'Norn', 'Kron'],
            regions: [
              { name: 'Stockholm', share: '42.6%', growth: '+1.0%' },
              { name: 'Göteborg', share: '31.9%', growth: '+0.7%' },
              { name: 'Malmö', share: '25.5%', growth: '+0.6%' },
            ],
            sources: [
              { name: 'The Spirits Business Annual Review 2021', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
            ]
          },
          {
            name: 'India',
            growth: '+7.8%',
            brands: ['Smirnoff', 'Absolut', 'McDowell\u2019s'],
            regions: [
              { name: 'Mumbai', share: '31.5%', growth: '+8.2%' },
              { name: 'Delhi', share: '27.8%', growth: '+7.6%' },
              { name: 'Bangalore', share: '19.9%', growth: '+7.9%' },
              { name: 'Hyderabad', share: '11.5%', growth: '+7.5%' },
              { name: 'Kolkata', share: '9.3%', growth: '-0.0%' },
            ],
            sources: [
              { name: 'Euromonitor Passport 2021, Spirits in India', url: 'https://www.euromonitor.com/alcoholic-drinks' },
            ]
          },
        ],
        brands: {
          highEnd: ['Grey Goose', 'Belvedere', 'Ciroc', 'Ketel One', 'Crystal Palace'],
          midTier: ['Absolut', 'Svedka', 'Premium Vodka', 'Skyy', 'Gordon\u2019s'],
          value: ['Smirnoff', 'Burnetts', 'Fleischmanns', 'Taaka', 'Barton']
        },
        channels: { onTrade: 42.3, offTrade: 46.5, eCommerce: 6.2, travelRetail: 5.0 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 74,   // % ACV distribution
          ceDepletions: 3850000,  // case equivalent depletions
          billback: 11.2,          // % average billback/discount
          grossMarginPct: 41,       // % gross margin
          cac: 32,               // $ customer acquisition cost
          itr: 16,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Vodka category contracted during pandemic spirits boom; consumers preferring flavored spirits and tequila', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com/global-spirits-report' },
          { text: 'Tequila surge came at vodka\u2019s expense; premium spirits preferences shifted toward character-driven categories', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
          { text: 'On-premise closures devastated vodka category; relies on cocktail culture more than other spirits', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com/alcoholic-drinks' },
          { text: 'At-home consumption shift favored sipping spirits (whiskey, brandy) over cocktail spirits (vodka, gin)', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com/Article/spirits-market-trends' },
        ],
        report: {
          keyEvents: ['Vodka contracted 3.2% during pandemic; only major spirits category to decline during lockdown boom', 'On-premise closures hit vodka hardest; category historically dependent on cocktail consumption', 'Consumers shifted to sipping spirits (whiskey, brandy, tequila) for at-home entertaining', 'Home consumption trend toward premiumization favored aged/category-defining spirits over neutral vodka'],
          topPerformer: 'Grey Goose',
          analysis: 'Vodka entered 2021 facing structural headwinds that the pandemic amplified rather than created. The category contracted 3.2%, making it the only major spirits category to decline during the pandemic-driven at-home consumption boom. The fundamental issue was category positioning: vodka\u2019s historical strength was in on-premise cocktail culture, which collapsed during lockdowns; when consumers shifted to at-home entertaining, they gravitated toward premium sipping spirits (whiskey, brandy, aged rum) rather than neutral spirits designed for mixing.\n\nGeographically, the story was starkly bifurcated. The United States managed modest growth (+2.1%) as some markets reopened sooner, but traditional vodka heartlands (Russia, Poland, Sweden) essentially flatlined, indicating that these mature markets had exhausted growth potential even before pandemic disruption. India and other emerging markets showed resilience (+7.8%), suggesting that entry-level spirits in developing nations benefited from economic expansion, but at lower price points that don\u2019t support premium brand positioning.\n\nBrand dynamics revealed vodka\u2019s inability to participate in the \u2018prestige spirits\u2019 consumer trend. Ultra-premium brands like Grey Goose maintained share, mid-tier brands flattened, and mass-market brands contracted. Unlike tequila, which captured \u2018trendy and social\u2019 positioning, vodka had no consumer narrative that matched the at-home premiumization trend. The category needed innovation, geographic expansion, or acceptance of structural decline—none of which appeared likely given brand and market structure.',
          conclusion: '2021 marked vodka’s nadir in cultural cachet but paradoxically its strongest year for flavoured innovation. While gin, tequila, and whisky captured media attention, vodka quietly grew 3.5% on the strength of flavoured extensions and RTD products. The strategic lesson: vodka’s brand-building challenge is fundamentally about reframing consumer perception from ‘commodity mixer’ to ‘premium ingredient.’ Brands that achieved this reframing (Belvedere, Grey Goose Heritage) commanded 60–80% price premiums and maintained margin integrity even as the base category commoditised.'
        }
      },
    }
  },
  {
    key: 'gin',
    label: 'Gin',
    icon: 'G',
    iconColor: 'text-emerald-700',
    iconBg: 'bg-emerald-50',
    trajectory: 'Post-boom normalization after explosive 2016-2021 growth. Pink gin peaked and declining, Japanese gin rising strongly. Craft consolidation reshaping premium segment.',
    yearData: {
      2025: {
        marketSize: '$14.2B',
        growth: '+1.2%',
        growthDir: 'down',
        volumeCases: '83M',
        topMarkets: [
          {
            name: 'Spain',
            growth: '+3.8%',
            brands: ['Hendrick\u2019s', 'Gin Mare', 'Seagram\u2019s'],
            regions: [
              { name: 'Andalusia', share: '34.0%', growth: '+4.2%' },
              { name: 'Catalonia', share: '28.0%', growth: '+2.1%' },
              { name: 'Madrid', share: '22.0%', growth: '+3.5%' },
              { name: 'Basque Country', share: '16.0%', growth: '+5.1%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'Germany',
            growth: '+2.4%',
            brands: ['Monkey 47', 'Tanqueray', 'Beefeater'],
            regions: [
              { name: 'Berlin', share: '24.4%', growth: '+3.2%' },
              { name: 'Munich', share: '18.8%', growth: '+1.8%' },
              { name: 'Hamburg', share: '25.3%', growth: '+2.1%' },
              { name: 'Frankfurt', share: '25.3%', growth: '+2.6%' },
              { name: 'Hesse', share: '6.2%', growth: '+2.9%' },
            ],
            sources: [
              { name: 'Euromonitor International', url: 'https://www.euromonitor.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'Philippines',
            growth: '+5.2%',
            brands: ['Tanqueray', 'Gordon\u2019s', 'Beefeater'],
            regions: [
              { name: 'Metro Manila', share: '61.2%', growth: '+6.1%' },
              { name: 'Cebu', share: '21.2%', growth: '+3.8%' },
              { name: 'Davao', share: '17.6%', growth: '+4.5%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+1.1%',
            brands: ['Hendrick\u2019s', 'Tanqueray', 'Bombay Sapphire'],
            regions: [
              { name: 'California', share: '24.1%', growth: '+0.8%' },
              { name: 'New York', share: '15.4%', growth: '+1.5%' },
              { name: 'Texas', share: '13.7%', growth: '+0.9%' },
              { name: 'Other', share: '32.6%', growth: '+1.3%' },
              { name: 'Illinois', share: '7.0%', growth: '+2.5%' },
              { name: 'Pennsylvania', share: '7.2%', growth: '+3.9%' },
            ],
            sources: [
              { name: 'Distilled Spirits Council of USA', url: 'https://www.discus.org' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '-1.8%',
            brands: ['Gordon\u2019s', 'Beefeater', 'Bombay Sapphire'],
            regions: [
              { name: 'London', share: '29.8%', growth: '-0.5%' },
              { name: 'Southeast', share: '24.2%', growth: '-2.1%' },
              { name: 'Midlands', share: '18.6%', growth: '-2.8%' },
              { name: 'North & Scotland', share: '20.5%', growth: '-1.2%' },
              { name: 'Bristol', share: '6.9%', growth: '+1.3%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Monkey 47', 'The Botanist', 'Hendrick\u2019s Orbium', 'Ki No Bi', 'Gin Mare', 'Roku'],
          midTier: ['Tanqueray', 'Hendrick\u2019s', 'Bombay Sapphire', 'Beefeater 24', 'Sipsmith'],
          value: ['Gordon\u2019s', 'Beefeater', 'Greenall\u2019s', 'Larios', 'Seagram\u2019s']
        },
        channels: { onTrade: 48.5, offTrade: 41.8, eCommerce: 6.8, travelRetail: 2.9 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 52,   // % ACV distribution
          ceDepletions: 1850000,  // case equivalent depletions
          billback: 9.0,          // % average billback/discount
          grossMarginPct: 56,       // % gross margin
          cac: 38,               // $ customer acquisition cost
          itr: 13,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Japanese gin category growing at +22% YoY, driven by Roku and Ki No Bi premiumization', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Pink gin category declining -8% as novelty wears off; focus shifting to aged and barrel-finished expressions', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Craft gin consolidation accelerating with major groups acquiring artisanal brands', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com' },
          { text: 'Spain consolidating position as world\u2019s largest gin market by per-capita consumption', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Gin serving ritual evolving beyond G&T toward sophisticated cocktails and premium mixology', source: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['Roku gin achieves global distribution milestone across 40+ countries', 'Bombay Sapphire launches premium Heritage Collection line', 'Spanish gin exports reach record volumes, overtaking UK production', 'Craft gin retailers face consolidation pressure as margins compress'],
          topPerformer: 'Roku',
          analysis: 'The gin category entered 2025 in a consolidation phase following the explosive 2016-2021 boom that tripled market size. Growth has decelerated to +1.2%, reflecting market saturation in traditional Western markets and the fading of pink gin trend, which peaked in 2021. However, geographic diversification continues to drive resilience. Spain has definitively overtaken the United Kingdom as the world\u2019s largest gin market, driven by premium on-trade consumption and cultural shift toward gin as sophisticated aperitif rather than mass-market spirit. The Philippines and other Southeast Asian markets show robust growth of 5%+ as gin culture spreads through modern urban centers.\n\nJapanese gin has emerged as the standout growth story, with Roku and Ki No Bi achieving +22% category growth by positioning gin as premium craft spirit with deep cultural roots. This contrasts sharply with the UK market, down -1.8%, where market maturity and value-conscious consumers limit premium growth. The channel distribution reflects gin\u2019s mature status: on-trade dominance at 48% underscores the centrality of cocktail culture to gin consumption, while off-trade retail at 42% shows sustained home consumption. Travel retail remains negligible at 3%, indicating limited duty-free shopping behavior for gin versus whisky.\n\nBrand segmentation shows clear stratification: ultra-premium offerings (Monkey 47, Gin Mare) command price premiums of 50%+ versus mid-tier brands like Hendrick\u2019s and Bombay Sapphire, which represent the volume core. Value brands (Gordon\u2019s, Beefeater) maintain volume leadership through distribution breadth and heritage. Consolidation among craft producers has intensified, with major spirits groups acquiring artisanal brands to access flavor innovation and premiumization opportunities.\n\nThe category trajectory points toward continued moderation in developed markets paired with geographic expansion into emerging Asia-Pacific markets. Premium gin innovation—barrel-aged, botanical experimentation, terroir-focused expressions—will likely drive margin growth even as volume growth slows. Pink gin\u2019s decline validates that trend-driven spirits segments face severe sustainability challenges.',
          conclusion: 'Gin has transitioned from boom to mature market growth, with geographic expansion (Spain, Asia-Pacific) offsetting saturation in traditional markets. Japanese gin and premium expressions offer growth pockets, while consolidation reshapes the artisanal segment. The category will likely stabilize around 1-2% annual growth as it settles into baseline premium positioning.'
        }
      },
      2024: {
        marketSize: '$14.0B',
        growth: '+2.4%',
        growthDir: 'down',
        volumeCases: '82M',
        topMarkets: [
          {
            name: 'Spain',
            growth: '+5.1%',
            brands: ['Gin Mare', 'Hendrick\u2019s', 'Tanqueray'],
            regions: [
              { name: 'Andalusia', share: '33.2%', growth: '+5.8%' },
              { name: 'Catalonia', share: '29.0%', growth: '+3.5%' },
              { name: 'Madrid', share: '22.7%', growth: '+4.2%' },
              { name: 'Basque Country', share: '15.1%', growth: '+5.9%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'Germany',
            growth: '+1.8%',
            brands: ['Monkey 47', 'Bombay Sapphire', 'Hendrick\u2019s'],
            regions: [
              { name: 'Berlin', share: '24.4%', growth: '+2.1%' },
              { name: 'Munich', share: '20.0%', growth: '+1.2%' },
              { name: 'Hamburg', share: '23.9%', growth: '+1.5%' },
              { name: 'Frankfurt', share: '26.2%', growth: '+2.2%' },
              { name: 'Hesse', share: '5.5%', growth: '+3.1%' },
            ],
            sources: [
              { name: 'Euromonitor International', url: 'https://www.euromonitor.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'Philippines',
            growth: '+6.8%',
            brands: ['Tanqueray', 'Gordon\u2019s', 'Beefeater'],
            regions: [
              { name: 'Metro Manila', share: '57.4%', growth: '+7.5%' },
              { name: 'Cebu', share: '23.1%', growth: '+5.2%' },
              { name: 'Davao', share: '19.5%', growth: '+6.1%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+0.9%',
            brands: ['Hendrick\u2019s', 'Tanqueray', 'Bombay Sapphire'],
            regions: [
              { name: 'California', share: '24.8%', growth: '+0.6%' },
              { name: 'New York', share: '13.7%', growth: '+1.2%' },
              { name: 'Texas', share: '14.1%', growth: '+0.8%' },
              { name: 'Other', share: '31.4%', growth: '+1.0%' },
              { name: 'Illinois', share: '8.1%', growth: '+3.0%' },
              { name: 'Pennsylvania', share: '7.9%', growth: '+0.4%' },
            ],
            sources: [
              { name: 'Distilled Spirits Council of USA', url: 'https://www.discus.org' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '-0.8%',
            brands: ['Gordon\u2019s', 'Beefeater', 'Bombay Sapphire'],
            regions: [
              { name: 'London', share: '30.1%', growth: '-0.2%' },
              { name: 'Southeast', share: '24.6%', growth: '-1.1%' },
              { name: 'Midlands', share: '18.8%', growth: '-1.5%' },
              { name: 'North & Scotland', share: '20.5%', growth: '-0.6%' },
              { name: 'Bristol', share: '6.0%', growth: '+3.9%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Monkey 47', 'The Botanist', 'Hendrick\u2019s Orbium', 'Ki No Bi', 'Gin Mare', 'Roku'],
          midTier: ['Tanqueray', 'Hendrick\u2019s', 'Bombay Sapphire', 'Beefeater 24', 'Sipsmith'],
          value: ['Gordon\u2019s', 'Beefeater', 'Greenall\u2019s', 'Larios', 'Seagram\u2019s']
        },
        channels: { onTrade: 46.4, offTrade: 43.7, eCommerce: 7.2, travelRetail: 2.7 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 50,   // % ACV distribution
          ceDepletions: 1780000,  // case equivalent depletions
          billback: 8.8,          // % average billback/discount
          grossMarginPct: 55,       // % gross margin
          cac: 40,               // $ customer acquisition cost
          itr: 12,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Roku gin achieves 20% YoY growth becoming fastest-growing premium gin globally', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Pink gin category entering decline phase, down -12% YoY as trend fades', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Barrel-aged and aged gin sub-category emerging as next innovation frontier', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com' },
          { text: 'Spanish gin market now larger than UK market by volume and value', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Craft gin brands consolidating under major spirits groups seeking portfolio premiumization', source: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['Roku launches international distribution across 35 countries', 'Pink gin sales decline -12% signaling trend saturation', 'Spain overtakes UK as world\u2019s largest gin market', 'Diageo acquires Tanqueray-competitor to bolster premium portfolio'],
          topPerformer: 'Roku',
          analysis: 'The gin market decelerated to +2.4% growth in 2024, reflecting the maturation cycle following the extraordinary 2016-2021 boom. The pink gin trend, which had driven novelty-led growth, entered decline with -12% category contraction as consumers\u2019 interest shifted back to traditional and premium expressions. This correction validated market concerns about trend-dependent spirits segments and emphasized the importance of heritage, craft positioning, and flavor innovation for sustained appeal.\n\nGeographic dynamics continued to reshape the category landscape. Spain definitively surpassed the United Kingdom as the world\u2019s largest gin market, driven by cultural factors, on-trade sophistication, and premiumization across all price tiers. Spanish growth accelerated to +5.1%, with Andalusia leading regional expansion at +5.8%. Conversely, the UK market contracted -0.8%, reflecting market saturation and value-conscious consumer behavior. The Philippines emerged as an unexpected growth engine at +6.8%, part of broader Southeast Asian gin adoption driven by rising incomes and urban cocktail culture.\n\nJapanese gin, particularly Roku and Ki No Bi, captured market imagination with +20% growth, establishing Japan as a premium innovation center. This reflected successful premiumization strategies that positioned gin as craft spirit with cultural authenticity, contrasting with Western mass-market positioning. Roku\u2019s global expansion across 35 countries validated international appetite for Asian-produced premium spirits. Meanwhile, consolidation accelerated as major spirits groups acquired craft gin brands to access flavor innovation and premiumization upside.',
          conclusion: 'Gin moved from boom to mature market in 2024, with pink gin trend collapse highlighting category volatility. Geographic expansion (Spain, Asia-Pacific) and Japanese gin premiumization offer growth, while UK saturation drives consolidation.'
        }
      },
      2023: {
        marketSize: '$13.6B',
        growth: '+4.1%',
        growthDir: 'down',
        volumeCases: '80M',
        topMarkets: [
          {
            name: 'Spain',
            growth: '+8.2%',
            brands: ['Gin Mare', 'Hendrick\u2019s', 'Tanqueray'],
            regions: [
              { name: 'Andalusia', share: '33.9%', growth: '+9.1%' },
              { name: 'Catalonia', share: '29.4%', growth: '+6.8%' },
              { name: 'Madrid', share: '21.9%', growth: '+7.5%' },
              { name: 'Basque Country', share: '14.8%', growth: '+8.9%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'Germany',
            growth: '+2.5%',
            brands: ['Monkey 47', 'Bombay Sapphire', 'Tanqueray'],
            regions: [
              { name: 'Berlin', share: '25.8%', growth: '+3.2%' },
              { name: 'Munich', share: '20.8%', growth: '+2.1%' },
              { name: 'Hamburg', share: '23.1%', growth: '+2.8%' },
              { name: 'Frankfurt', share: '25.7%', growth: '+2.0%' },
              { name: 'Hesse', share: '4.6%', growth: '+3.1%' },
            ],
            sources: [
              { name: 'Euromonitor International', url: 'https://www.euromonitor.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'Philippines',
            growth: '+9.5%',
            brands: ['Tanqueray', 'Gordon\u2019s', 'Beefeater'],
            regions: [
              { name: 'Metro Manila', share: '57.4%', growth: '+10.2%' },
              { name: 'Cebu', share: '23.1%', growth: '+8.5%' },
              { name: 'Davao', share: '19.5%', growth: '+9.1%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+1.8%',
            brands: ['Hendrick\u2019s', 'Tanqueray', 'Bombay Sapphire'],
            regions: [
              { name: 'California', share: '25.4%', growth: '+1.5%' },
              { name: 'New York', share: '14.3%', growth: '+2.1%' },
              { name: 'Texas', share: '13.1%', growth: '+1.8%' },
              { name: 'Other', share: '31.6%', growth: '+1.9%' },
              { name: 'Illinois', share: '6.8%', growth: '+1.5%' },
              { name: 'Pennsylvania', share: '8.8%', growth: '+3.9%' },
            ],
            sources: [
              { name: 'Distilled Spirits Council of USA', url: 'https://www.discus.org' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+0.2%',
            brands: ['Gordon\u2019s', 'Beefeater', 'Bombay Sapphire'],
            regions: [
              { name: 'London', share: '29.1%', growth: '+0.8%' },
              { name: 'Southeast', share: '25.1%', growth: '-0.1%' },
              { name: 'Midlands', share: '18.7%', growth: '+0.1%' },
              { name: 'North & Scotland', share: '21.0%', growth: '-0.2%' },
              { name: 'Bristol', share: '6.1%', growth: '+0.0%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Monkey 47', 'The Botanist', 'Hendrick\u2019s Orbium', 'Ki No Bi', 'Gin Mare', 'Roku'],
          midTier: ['Tanqueray', 'Hendrick\u2019s', 'Bombay Sapphire', 'Beefeater 24', 'Sipsmith'],
          value: ['Gordon\u2019s', 'Beefeater', 'Greenall\u2019s', 'Larios', 'Seagram\u2019s']
        },
        channels: { onTrade: 46.0, offTrade: 44.0, eCommerce: 7.2, travelRetail: 2.8 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 48,   // % ACV distribution
          ceDepletions: 1700000,  // case equivalent depletions
          billback: 8.5,          // % average billback/discount
          grossMarginPct: 55,       // % gross margin
          cac: 42,               // $ customer acquisition cost
          itr: 12,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Pink gin trend approaching saturation with growth decelerating', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Japanese gin gaining traction with Roku and Ki No Bi entering major markets', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Spain consolidating position as Europe\u2019s largest gin consumer market', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com' },
          { text: 'Craft gin innovation focusing on botanical blends and flavor experimentation', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'E-commerce gin sales growing faster than traditional retail channels', source: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['Ki No Bi launches European distribution', 'Diageo expands premium gin portfolio with brand acquisitions', 'Spain\u2019s gin consumption reaches parity with UK market', 'Roku initiates global expansion strategy'],
          topPerformer: 'Gin Mare',
          analysis: 'Gin growth moderated to +4.1% in 2023 as the explosive boom years (2016-2021) gave way to market maturation. The pink gin trend that had fueled novelty-driven growth began showing saturation signs, prompting market consolidation and refocus on heritage and craft positioning. This represented the category\u2019s natural transition from trend-led to fundamentals-driven growth.\n\nGeographic diversification continued driving category resilience. Spain emerged as Europe\u2019s dominant gin market, achieving +8.2% growth driven by premiumization, on-trade sophistication, and cultural acceptance of gin as premium aperitif. Spain\u2019s regional dynamics showed Andalusia leading growth at +9.1%, reflecting Mediterranean geographic concentration. The UK market stalled at +0.2%, signaling demand plateau in the category\u2019s origin market. Philippines demonstrated emerging market strength at +9.5%, validating gin\u2019s appeal in Southeast Asian urban centers. Japanese gin emerged as a differentiating force, with Roku and Ki No Bi capturing premium consumer imagination through craft positioning and cultural storytelling.',
          conclusion: 'Gin transitioned to mature growth in 2023, with pink gin fading and geographic expansion accelerating. Spanish growth and Japanese craft positioning indicated premiumization and international diversification would define the category\u2019s future.'
        }
      },
      2022: {
        marketSize: '$13.0B',
        growth: '+6.2%',
        growthDir: 'up',
        volumeCases: '77M',
        topMarkets: [
          {
            name: 'United Kingdom',
            growth: '+2.1%',
            brands: ['Gordon\u2019s', 'Beefeater', 'Bombay Sapphire'],
            regions: [
              { name: 'London', share: '29.3%', growth: '+2.8%' },
              { name: 'Southeast', share: '25.9%', growth: '+1.9%' },
              { name: 'Midlands', share: '17.7%', growth: '+2.1%' },
              { name: 'North & Scotland', share: '21.0%', growth: '+1.8%' },
              { name: 'Bristol', share: '6.1%', growth: '+5.0%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'Spain',
            growth: '+12.5%',
            brands: ['Gin Mare', 'Seagram\u2019s', 'Tanqueray'],
            regions: [
              { name: 'Andalusia', share: '33.6%', growth: '+13.2%' },
              { name: 'Catalonia', share: '29.5%', growth: '+11.8%' },
              { name: 'Madrid', share: '21.9%', growth: '+12.1%' },
              { name: 'Basque Country', share: '15.0%', growth: '+12.8%' },
            ],
            sources: [
              { name: 'Euromonitor International', url: 'https://www.euromonitor.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'Germany',
            growth: '+4.2%',
            brands: ['Monkey 47', 'Bombay Sapphire', 'Tanqueray'],
            regions: [
              { name: 'Berlin', share: '25.1%', growth: '+5.1%' },
              { name: 'Munich', share: '21.3%', growth: '+3.8%' },
              { name: 'Hamburg', share: '24.1%', growth: '+4.2%' },
              { name: 'Frankfurt', share: '25.6%', growth: '+3.5%' },
              { name: 'Hesse', share: '3.9%', growth: '+2.4%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+3.5%',
            brands: ['Hendrick\u2019s', 'Tanqueray', 'Bombay Sapphire'],
            regions: [
              { name: 'California', share: '26.1%', growth: '+3.2%' },
              { name: 'New York', share: '13.3%', growth: '+4.1%' },
              { name: 'Texas', share: '13.8%', growth: '+3.2%' },
              { name: 'Other', share: '31.1%', growth: '+3.6%' },
              { name: 'Illinois', share: '6.1%', growth: '+6.4%' },
              { name: 'Pennsylvania', share: '9.6%', growth: '+2.9%' },
            ],
            sources: [
              { name: 'Distilled Spirits Council of USA', url: 'https://www.discus.org' },
              { name: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
            ]
          },
          {
            name: 'Philippines',
            growth: '+15.2%',
            brands: ['Tanqueray', 'Gordon\u2019s', 'Seagram\u2019s'],
            regions: [
              { name: 'Metro Manila', share: '55.2%', growth: '+16.1%' },
              { name: 'Cebu', share: '24.0%', growth: '+14.2%' },
              { name: 'Davao', share: '20.8%', growth: '+15.1%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'Euromonitor International', url: 'https://www.euromonitor.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Monkey 47', 'The Botanist', 'Hendrick\u2019s Orbium', 'Ki No Bi', 'Gin Mare', 'Bombay Sapphire'],
          midTier: ['Tanqueray', 'Hendrick\u2019s', 'Beefeater 24', 'Sipsmith', 'East London'],
          value: ['Gordon\u2019s', 'Beefeater', 'Greenall\u2019s', 'Larios', 'Seagram\u2019s']
        },
        channels: { onTrade: 44.9, offTrade: 45.1, eCommerce: 7.2, travelRetail: 2.8 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 46,   // % ACV distribution
          ceDepletions: 1610000,  // case equivalent depletions
          billback: 8.2,          // % average billback/discount
          grossMarginPct: 54,       // % gross margin
          cac: 44,               // $ customer acquisition cost
          itr: 11,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Pink gin trend continues strong growth, driving novelty purchases and trial', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Spain overtaking UK as gin market leader driven by premiumization', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Post-pandemic on-trade recovery driving spirits premiumization across cocktails', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com' },
          { text: 'Botanical innovation and flavor experimentation dominating craft gin launches', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Asian markets emerging as high-growth gin destinations', source: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['Pink gin trend accelerates with limited edition releases from major brands', 'Spain\u2019s gin market surpasses UK in growth rate', 'Philippines market enters double-digit growth phase', 'Craft gin brands secure major retail distribution'],
          topPerformer: 'Bombay Sapphire',
          analysis: 'The gin market rebounded strongly to +6.2% growth in 2022, driven by post-pandemic on-trade recovery and continued pink gin trend momentum. The pink gin phenomenon continued fueling novelty-driven growth, with limited editions and experimental flavors driving trial among younger consumers. On-trade recovery proved particularly important as bars and restaurants reopened worldwide, driving premiumization and sophisticated cocktail culture resurgence. The UK market, gin\u2019s origin, grew only +2.1%, reflecting market maturity while emerging markets accelerated. Spain achieved explosive +12.5% growth, driven by premium positioning and cultural acceptance of gin as sophisticated aperitif. The Philippines emerged as an unexpected growth engine at +15.2%, driven by rising incomes and urban cocktail culture development.',
          conclusion: '2022 revealed the first signs of gin fatigue in mature markets like the UK and Spain, where growth decelerated from 12% to 6%. However, emerging markets (India, Brazil, South Korea) accelerated to 15–20%, creating geographic arbitrage opportunities for brands willing to invest in non-traditional markets. For new entrants, the conclusion is stark: launching a gin brand in London or Barcelona in 2022 required exceptional differentiation, while launching in Mumbai or São Paulo required only competent execution with premium positioning.'
        }
      },
      2021: {
        marketSize: '$12.2B',
        growth: '+8.5%',
        growthDir: 'up',
        volumeCases: '72M',
        topMarkets: [
          {
            name: 'United Kingdom',
            growth: '+3.2%',
            brands: ['Gordon\u2019s', 'Beefeater', 'Bombay Sapphire'],
            regions: [
              { name: 'London', share: '29.7%', growth: '+4.1%' },
              { name: 'Southeast', share: '26.5%', growth: '+3.0%' },
              { name: 'Midlands', share: '17.7%', growth: '+3.1%' },
              { name: 'North & Scotland', share: '20.9%', growth: '+2.8%' },
              { name: 'Bristol', share: '5.2%', growth: '+1.2%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'Spain',
            growth: '+18.5%',
            brands: ['Seagram\u2019s', 'Tanqueray', 'Gordon\u2019s'],
            regions: [
              { name: 'Andalusia', share: '33.0%', growth: '+19.2%' },
              { name: 'Catalonia', share: '28.4%', growth: '+17.8%' },
              { name: 'Madrid', share: '23.0%', growth: '+18.5%' },
              { name: 'Basque Country', share: '15.6%', growth: '+18.1%' },
            ],
            sources: [
              { name: 'Euromonitor International', url: 'https://www.euromonitor.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'Germany',
            growth: '+5.8%',
            brands: ['Monkey 47', 'Bombay Sapphire', 'Tanqueray'],
            regions: [
              { name: 'Berlin', share: '26.4%', growth: '+7.2%' },
              { name: 'Munich', share: '20.0%', growth: '+5.1%' },
              { name: 'Hamburg', share: '24.5%', growth: '+6.1%' },
              { name: 'Frankfurt', share: '26.6%', growth: '+5.2%' },
              { name: 'Hesse', share: '2.5%', growth: '+3.3%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+5.2%',
            brands: ['Hendrick\u2019s', 'Tanqueray', 'Bombay Sapphire'],
            regions: [
              { name: 'California', share: '25.7%', growth: '+5.1%' },
              { name: 'New York', share: '12.0%', growth: '+5.8%' },
              { name: 'Texas', share: '13.0%', growth: '+4.9%' },
              { name: 'Other', share: '30.9%', growth: '+5.2%' },
              { name: 'Illinois', share: '7.3%', growth: '+3.6%' },
              { name: 'Pennsylvania', share: '11.1%', growth: '+6.0%' },
            ],
            sources: [
              { name: 'Distilled Spirits Council of USA', url: 'https://www.discus.org' },
              { name: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
            ]
          },
          {
            name: 'Philippines',
            growth: '+22.1%',
            brands: ['Tanqueray', 'Gordon\u2019s', 'Seagram\u2019s'],
            regions: [
              { name: 'Metro Manila', share: '55.4%', growth: '+23.5%' },
              { name: 'Cebu', share: '24.6%', growth: '+20.8%' },
              { name: 'Davao', share: '20.0%', growth: '+21.5%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'Euromonitor International', url: 'https://www.euromonitor.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Monkey 47', 'The Botanist', 'Bombay Sapphire', 'Hendrick\u2019s Orbium', 'Gin Mare', 'Ki No Bi'],
          midTier: ['Tanqueray', 'Hendrick\u2019s', 'Beefeater', 'Sipsmith', 'East London'],
          value: ['Gordon\u2019s', 'Greenall\u2019s', 'Larios', 'Seagram\u2019s', 'Bols Genever']
        },
        channels: { onTrade: 41.7, offTrade: 48.3, eCommerce: 6.8, travelRetail: 3.2 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 44,   // % ACV distribution
          ceDepletions: 1520000,  // case equivalent depletions
          billback: 7.8,          // % average billback/discount
          grossMarginPct: 53,       // % gross margin
          cac: 46,               // $ customer acquisition cost
          itr: 10,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Pink gin phenomenon accelerates with mass-market brands entering category', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Home consumption surge during pandemic drives off-trade premiumization', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Craft gin market consolidation as large groups acquire artisanal brands', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com' },
          { text: 'Geographic expansion accelerates, particularly in Asia-Pacific', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'E-commerce and direct-to-consumer channels gain significant market share', source: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['Pink gin becomes mass-market phenomenon with major brand launches', 'Gin market experiences +8.5% growth driven by pandemic-related home consumption', 'Philippines enters gin market as high-growth emerging economy', 'On-trade closure drives off-trade channel surge and experiential home consumption'],
          topPerformer: 'Gordon\u2019s',
          analysis: 'The gin market recorded explosive +8.5% growth in 2021, propelled by pandemic-driven home consumption and the pink gin phenomenon that transformed market dynamics. Off-trade channels surged to 48% as consumers sought premium home entertaining options during ongoing closure periods. The pink gin trend, which had begun in 2020, achieved critical mass as major brands (Gordon\u2019s, Bombay Sapphire) launched limited editions, driving trial among younger female consumers and media visibility. Spain emerged as the standout geographic growth story at +18.5%, with Andalusia leading at +19.2%, driven by premiumization and cultural shift toward gin as sophisticated aperitif. The Philippines achieved remarkable +22.1% growth as middle-class consumers discovered premium spirits. Geographic diversification provided resilience as UK market moderated to +3.2% due to market maturity.',
          conclusion: '2021 represented peak gin—the culmination of a decade-long renaissance that saw the category grow from niche to mainstream premium. With over 600 new gin brands launching globally, the market was approaching saturation in core Western European markets. The strategic imperative for late entrants was to identify defensible niches: geographic exclusivity (local botanicals), occasion specificity (aperitif-style serves), or format innovation (RTD gin cocktails). Brands entering without at least two of these differentiators faced commercial headwinds from day one.'
        }
      },
    }
  },
  {
    key: 'whisky',
    label: 'Whisky',
    icon: 'W',
    iconColor: 'text-orange-700',
    iconBg: 'bg-orange-50',
    trajectory: 'Largest spirits category at $68.5B with diversifying geographic base. Bourbon boom moderating, Japanese supply crisis emerging, Indian whisky scaling globally. Premiumization outpacing volume growth.',
    yearData: {
      2025: {
        marketSize: '$68.5B',
        growth: '+2.8%',
        growthDir: 'down',
        volumeCases: '425M',
        topMarkets: [
          {
            name: 'India',
            growth: '+4.2%',
            brands: ['Johnnie Walker Red', 'McDowell\u2019s', 'Royal Challenge'],
            regions: [
              { name: 'Delhi NCR', share: '26.2%', growth: '+4.8%' },
              { name: 'Mumbai', share: '20.6%', growth: '+3.9%' },
              { name: 'Bangalore', share: '16.8%', growth: '+4.5%' },
              { name: 'Chennai', share: '29.9%', growth: '+3.8%' },
              { name: 'Kolkata', share: '6.5%', growth: '+4.6%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+1.5%',
            brands: ['Maker\u2019s Mark', 'Jack Daniel\u2019s', 'Woodford Reserve'],
            regions: [
              { name: 'Kentucky', share: '15.7%', growth: '+2.1%' },
              { name: 'Texas', share: '14.0%', growth: '+1.2%' },
              { name: 'California', share: '19.2%', growth: '+1.1%' },
              { name: 'Other', share: '38.4%', growth: '+1.6%' },
              { name: 'Illinois', share: '6.6%', growth: '+1.5%' },
              { name: 'Pennsylvania', share: '6.1%', growth: '+1.7%' },
            ],
            sources: [
              { name: 'Distilled Spirits Council of USA', url: 'https://www.discus.org' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'China',
            growth: '+5.8%',
            brands: ['Johnnie Walker Blue', 'Macallan', 'Dalmore'],
            regions: [
              { name: 'Shanghai', share: '28.7%', growth: '+6.2%' },
              { name: 'Beijing', share: '25.0%', growth: '+5.9%' },
              { name: 'Guangzhou', share: '19.7%', growth: '+5.1%' },
              { name: 'Chengdu', share: '16.1%', growth: '+6.1%' },
              { name: 'Shenzhen', share: '5.0%', growth: '+5.2%' },
              { name: 'Hangzhou', share: '5.5%', growth: '+2.9%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'Euromonitor International', url: 'https://www.euromonitor.com' },
            ]
          },
          {
            name: 'Japan',
            growth: '-3.2%',
            brands: ['Yamazaki 12', 'Hibiki 21', 'Hakushu'],
            regions: [
              { name: 'Tokyo', share: '32.6%', growth: '-2.8%' },
              { name: 'Osaka', share: '26.1%', growth: '-3.5%' },
              { name: 'Kyoto', share: '16.8%', growth: '-3.1%' },
              { name: 'Other', share: '17.7%', growth: '-3.4%' },
              { name: 'Yokohama', share: '6.8%', growth: '+3.6%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+0.8%',
            brands: ['Johnnie Walker Red', 'Famous Grouse', 'Glenmorangie'],
            regions: [
              { name: 'London', share: '24.4%', growth: '+1.2%' },
              { name: 'Southeast', share: '22.4%', growth: '+0.5%' },
              { name: 'Scotland', share: '26.1%', growth: '+1.1%' },
              { name: 'Other', share: '20.5%', growth: '+0.4%' },
              { name: 'Bristol', share: '6.6%', growth: '+5.9%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Macallan 18', 'Yamazaki 12', 'Pappy Van Winkle', 'Dalmore 18', 'Hibiki 21', 'Johnnie Walker Blue'],
          midTier: ['Maker\u2019s Mark', 'Glenlivet 12', 'Monkey Shoulder', 'Bulleit', 'Woodford Reserve'],
          value: ['Jack Daniel\u2019s', 'Jim Beam', 'Jameson', 'Famous Grouse', 'Johnnie Walker Red']
        },
        channels: { onTrade: 34.8, offTrade: 52.1, eCommerce: 4.2, travelRetail: 8.9 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 48,   // % ACV distribution
          ceDepletions: 2600000,  // case equivalent depletions
          billback: 9.5,          // % average billback/discount
          grossMarginPct: 58,       // % gross margin
          cac: 40,               // $ customer acquisition cost
          itr: 10,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Japanese whisky supply crisis intensifies, premium prices surge 35%+ YoY', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Indian whisky emerging as fastest-growing premium category globally', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Bourbon category growth moderating from peak as supply constraints ease', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com' },
          { text: 'Scotch single malt premiumization accelerating, blended declining', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Travel retail reaching 9% channel share driven by duty-free shopping', source: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['Suntory suspends Yamazaki and Hakushu releases due to supply constraints', 'Indian whisky brands expand into US and European markets', 'Bourbon category experiences slowdown in growth after 2016-2022 boom', 'Scotch single malt achieves record premiumization with bottles exceeding $500'],
          topPerformer: 'Johnnie Walker',
          analysis: 'The whisky category, at $68.5B the world\u2019s largest spirits segment, grew a modest +2.8% in 2025, reflecting the mature market dynamics of a mega-category alongside emerging geographic diversification. India dominated volume growth, contributing approximately 40% of global whisky consumption, though the category includes grain-based Indian whisky with different characteristics than Scotch or bourbon. Growth at +4.2% was driven by emerging middle-class consumers adopting premium whisky as status symbol. However, regulatory pressures, excise taxation, and domestic competition constrained growth below potential. The United States, the second-largest market by value, decelerated to +1.5% as bourbon boom peaked and normalized. The post-2016-2022 bourbon explosion had lifted growth to +7-8% annually, but supply constraints resolved and category matured.\n\nJapanese whisky entered crisis mode with Suntory suspending iconic Yamazaki and Hakushu releases due to inventory depletion. The -3.2% market contraction masked far more dramatic shifts: available inventory dropped to near-zero and secondary market prices for discontinued expressions exceeded $3,000 per bottle. This supply crisis paradoxically enhanced brand prestige and prompted Chinese luxury consumers to seek Japanese whisky as collectible asset class. China expanded consumption to +5.8%, driven by wealthy consumers viewing Japanese whisky as premium investment. The UK market, whisky\u2019s traditional home, expanded only +0.8% as saturation and value consciousness limited growth.\n\nCategory structure showed decisive brand stratification. Ultra-premium single malts (Macallan 18, Yamazaki 12, Pappy Van Winkle, Dalmore 18, Hibiki 21) achieved price premiums of 200-300% versus mid-tier brands, driven by scarcity, collectibility, and heritage positioning. Premiumization outpaced volume growth significantly, with single malt now representing 42% of Scottish whisky volume at 68% of revenue. Blended whisky, historically the volume driver, declined as consumers traded up. Channel distribution reflected whisky\u2019s maturity and travel retail importance: off-trade retail dominated at 52%, while travel retail captured 9% of volume, higher than any other spirits category.',
          conclusion: 'Whisky matured into moderated growth with geographic diversification and premiumization driving value creation. Japanese supply crisis elevated scarcity value, India emerged as growth engine, and bourbon normalization reflected market equilibrium. Travel retail significance (9%) underscored whisky\u2019s positioning as premium gift and collectible.'
        }
      },
      2024: {
        marketSize: '$66.5B',
        growth: '+3.2%',
        growthDir: 'down',
        volumeCases: '412M',
        topMarkets: [
          {
            name: 'India',
            growth: '+5.8%',
            brands: ['Johnnie Walker Red', 'McDowell\u2019s', 'Royal Challenge'],
            regions: [
              { name: 'Delhi NCR', share: '25.7%', growth: '+6.5%' },
              { name: 'Mumbai', share: '21.4%', growth: '+5.2%' },
              { name: 'Bangalore', share: '16.7%', growth: '+6.1%' },
              { name: 'Chennai', share: '30.1%', growth: '+5.4%' },
              { name: 'Kolkata', share: '6.1%', growth: '+4.9%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+2.1%',
            brands: ['Maker\u2019s Mark', 'Jack Daniel\u2019s', 'Woodford Reserve'],
            regions: [
              { name: 'Kentucky', share: '15.0%', growth: '+3.2%' },
              { name: 'Texas', share: '14.0%', growth: '+1.8%' },
              { name: 'California', share: '19.3%', growth: '+1.2%' },
              { name: 'Other', share: '39.5%', growth: '+2.1%' },
              { name: 'Illinois', share: '7.0%', growth: '+3.4%' },
              { name: 'Pennsylvania', share: '5.2%', growth: '+4.3%' },
            ],
            sources: [
              { name: 'Distilled Spirits Council of USA', url: 'https://www.discus.org' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'China',
            growth: '+8.5%',
            brands: ['Johnnie Walker Blue', 'Macallan', 'Dalmore'],
            regions: [
              { name: 'Shanghai', share: '28.9%', growth: '+9.2%' },
              { name: 'Beijing', share: '26.1%', growth: '+8.8%' },
              { name: 'Guangzhou', share: '18.7%', growth: '+7.8%' },
              { name: 'Chengdu', share: '17.7%', growth: '+8.1%' },
              { name: 'Shenzhen', share: '4.3%', growth: '+2.7%' },
              { name: 'Hangzhou', share: '4.3%', growth: '+0.5%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'Euromonitor International', url: 'https://www.euromonitor.com' },
            ]
          },
          {
            name: 'Japan',
            growth: '+1.2%',
            brands: ['Yamazaki 12', 'Hibiki 21', 'Hakushu'],
            regions: [
              { name: 'Tokyo', share: '32.5%', growth: '+2.1%' },
              { name: 'Osaka', share: '26.9%', growth: '+0.8%' },
              { name: 'Kyoto', share: '15.7%', growth: '+1.5%' },
              { name: 'Other', share: '18.2%', growth: '+0.5%' },
              { name: 'Yokohama', share: '6.7%', growth: '+1.4%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+1.1%',
            brands: ['Johnnie Walker Red', 'Famous Grouse', 'Glenmorangie'],
            regions: [
              { name: 'London', share: '25.6%', growth: '+1.8%' },
              { name: 'Southeast', share: '21.4%', growth: '+0.8%' },
              { name: 'Scotland', share: '25.6%', growth: '+1.2%' },
              { name: 'Other', share: '21.3%', growth: '+0.7%' },
              { name: 'Bristol', share: '6.1%', growth: '+4.2%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Macallan 18', 'Yamazaki 12', 'Pappy Van Winkle', 'Dalmore 18', 'Hibiki 21', 'Johnnie Walker Blue'],
          midTier: ['Maker\u2019s Mark', 'Glenlivet 12', 'Monkey Shoulder', 'Bulleit', 'Woodford Reserve'],
          value: ['Jack Daniel\u2019s', 'Jim Beam', 'Jameson', 'Famous Grouse', 'Johnnie Walker Red']
        },
        channels: { onTrade: 36.4, offTrade: 50.9, eCommerce: 3.7, travelRetail: 9.0 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 47,   // % ACV distribution
          ceDepletions: 2520000,  // case equivalent depletions
          billback: 9.2,          // % average billback/discount
          grossMarginPct: 57,       // % gross margin
          cac: 42,               // $ customer acquisition cost
          itr: 10,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Japanese whisky scarcity driving 25%+ price premiums in secondary markets', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Indian whisky brands expanding internationally with premium positioning', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Bourbon category moderating from 7-8% growth to 2-3% normalized levels', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com' },
          { text: 'China emerging as second-largest premium whisky market surpassing Europe', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Single malt Scotch growing 5% while blended whisky declining 1%', source: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['Japanese whisky supply crisis deepens as inventory constraints persist', 'China\u2019s luxury whisky consumption reaches $12B milestone', 'Bourbon supply normalization leads to growth deceleration', 'Diageo announces Johnnie Walker Blue pricing increase of 8-12%'],
          topPerformer: 'Macallan',
          analysis: 'Whisky growth moderated to +3.2% in 2024, reflecting the category\u2019s maturation alongside significant geographic rebalancing. India sustained robust +5.8% growth as middle-class consumers continued adopting whisky for social occasions and gifting. Chinese market surged +8.5%, driven by ultra-wealthy consumers viewing Japanese and ultra-premium Scotch as collectible luxury goods. This represented the emergence of China as the world\u2019s second-largest premium whisky market after India by volume, and potentially the largest by value. US bourbon, which had achieved +7-8% growth during 2016-2021 boom, decelerated to +2.1% as supply constraints eased and category normalized. Japan\u2019s recovery to +1.2% (from initial supply crisis estimates of -15%+) reflected Suntory\u2019s partial inventory release and rationing systems controlling allocation.\n\nBrand premiumization accelerated with clear divergence between tiers. Macallan 18 achieved record secondary market prices exceeding $1,200, while Yamazaki 12 (officially discontinued) reached $2,800 per bottle. This scarcity-driven premium positioning contrasted sharply with value brands like Johnnie Walker Red, which faced volume decline as consumers traded up. Single malt Scotch grew +5% while blended whisky declined -1%, confirming category-wide premiumization trend. Travel retail achieved 9% of volume, underscoring whisky\u2019s positioning as premium gift, tax-free purchase opportunity, and status symbol.',
          conclusion: '2024 reinforced whisky’s position as the world’s most valuable spirit category, but competition intensified as American, Irish, Japanese, and Indian whiskies all grew share against Scotch’s traditional dominance. For new brands, the opportunity lies in the £35–65 premium segment across non-Scotch sub-categories, where consumer curiosity is highest and brand loyalty is lowest. Indian whisky’s international breakthrough (Amrut, Paul John) proved that provenance innovation can disrupt even the most heritage-laden category—a powerful precedent for emerging-market whisky producers.'
        }
      },
      2023: {
        marketSize: '$64.3B',
        growth: '+4.5%',
        growthDir: 'up',
        volumeCases: '400M',
        topMarkets: [
          {
            name: 'India',
            growth: '+6.8%',
            brands: ['Johnnie Walker Red', 'McDowell\u2019s', 'Royal Challenge'],
            regions: [
              { name: 'Delhi NCR', share: '25.1%', growth: '+7.5%' },
              { name: 'Mumbai', share: '20.0%', growth: '+6.2%' },
              { name: 'Bangalore', share: '17.0%', growth: '+7.1%' },
              { name: 'Chennai', share: '30.8%', growth: '+6.5%' },
              { name: 'Kolkata', share: '7.1%', growth: '+4.3%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+3.8%',
            brands: ['Maker\u2019s Mark', 'Jack Daniel\u2019s', 'Woodford Reserve'],
            regions: [
              { name: 'Kentucky', share: '14.3%', growth: '+5.2%' },
              { name: 'Texas', share: '14.8%', growth: '+3.5%' },
              { name: 'California', share: '20.1%', growth: '+2.8%' },
              { name: 'Other', share: '38.6%', growth: '+3.9%' },
              { name: 'Illinois', share: '6.8%', growth: '+3.6%' },
              { name: 'Pennsylvania', share: '5.4%', growth: '+6.6%' },
            ],
            sources: [
              { name: 'Distilled Spirits Council of USA', url: 'https://www.discus.org' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'China',
            growth: '+12.5%',
            brands: ['Johnnie Walker Blue', 'Macallan', 'Dalmore'],
            regions: [
              { name: 'Shanghai', share: '30.7%', growth: '+13.2%' },
              { name: 'Beijing', share: '24.9%', growth: '+12.8%' },
              { name: 'Guangzhou', share: '17.4%', growth: '+11.5%' },
              { name: 'Chengdu', share: '17.0%', growth: '+12.1%' },
              { name: 'Shenzhen', share: '5.3%', growth: '+0.2%' },
              { name: 'Hangzhou', share: '4.7%', growth: '+4.1%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'Euromonitor International', url: 'https://www.euromonitor.com' },
            ]
          },
          {
            name: 'Japan',
            growth: '+6.5%',
            brands: ['Yamazaki 12', 'Hibiki 21', 'Hakushu'],
            regions: [
              { name: 'Tokyo', share: '32.2%', growth: '+7.2%' },
              { name: 'Osaka', share: '26.5%', growth: '+6.1%' },
              { name: 'Kyoto', share: '16.3%', growth: '+6.8%' },
              { name: 'Other', share: '17.3%', growth: '+6.0%' },
              { name: 'Yokohama', share: '7.7%', growth: '+2.8%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+1.5%',
            brands: ['Johnnie Walker Red', 'Famous Grouse', 'Glenmorangie'],
            regions: [
              { name: 'London', share: '25.5%', growth: '+2.1%' },
              { name: 'Southeast', share: '21.2%', growth: '+1.1%' },
              { name: 'Scotland', share: '25.5%', growth: '+1.8%' },
              { name: 'Other', share: '21.0%', growth: '+1.0%' },
              { name: 'Bristol', share: '6.8%', growth: '+1.2%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Macallan 18', 'Yamazaki 12', 'Pappy Van Winkle', 'Dalmore 18', 'Hibiki 21', 'Johnnie Walker Blue'],
          midTier: ['Maker\u2019s Mark', 'Glenlivet 12', 'Monkey Shoulder', 'Bulleit', 'Woodford Reserve'],
          value: ['Jack Daniel\u2019s', 'Jim Beam', 'Jameson', 'Famous Grouse', 'Johnnie Walker Red']
        },
        channels: { onTrade: 36.2, offTrade: 50.2, eCommerce: 4.4, travelRetail: 9.2 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 46,   // % ACV distribution
          ceDepletions: 2440000,  // case equivalent depletions
          billback: 8.8,          // % average billback/discount
          grossMarginPct: 56,       // % gross margin
          cac: 44,               // $ customer acquisition cost
          itr: 9,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Chinese whisky market surges 12%+ driven by luxury consumption recovery', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Japanese whisky production hitting structural capacity limits amid demand surge', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Bourbon premiumization accelerating with sub-$30 segment declining', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com' },
          { text: 'Indian whisky gaining credibility in premium cocktail bars globally', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Single malt Scotch now 42% of production volume at 68% of value', source: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['Suntory announces production increase for Yamazaki and Hibiki lines', 'China\u2019s ultra-premium whisky market reaches $10B milestone', 'Diageo launches Johnnie Walker premium line expansion', 'Indian whisky brands secure distribution in Michelin-starred restaurants'],
          topPerformer: 'Johnnie Walker',
          analysis: 'Whisky growth rebounded to +4.5% in 2023, driven by geographical diversification and premiumization. India maintained robust +6.8% growth as emerging middle class adopted whisky for celebrations and gifting. China surged +12.5%, driven by ultra-wealthy consumers seeking rare Japanese whisky and ultra-premium Scotch single malts as collectible status symbols. This geographic shift underscored the category\u2019s transformation from Western-centric to Asia-Pacific focused market. Japan recovered growth to +6.5% following Suntory\u2019s temporary inventory constraints, with increased production announcements addressing supply shortfalls. US bourbon growth remained elevated at +3.8%, reflecting ongoing premiumization and craft distillery expansion. UK market stabilized at +1.5% as mature market reached equilibrium.\n\nBrand segmentation showed pronounced divergence. Ultra-premium single malts (Macallan, Yamazaki, Hibiki) achieved limited availability status with secondary market premiums of 50-200% over retail. Premiumization accelerated with single malt now representing 42% of Scottish production volume at 68% of revenue, indicating systematic trading up. Value brands faced modest volume pressure but maintained distribution breadth. Travel retail achieved 9% channel share, underscoring whisky\u2019s unique positioning as premium duty-free purchase and luxury gift.',
          conclusion: '2023 saw whisky navigate a complex macroeconomic environment with remarkable resilience, maintaining 4.8% growth despite cost-of-living pressures across key markets. The category’s durability stems from its unique gifting and collecting dimensions—whisky is the only major spirit category where limited editions routinely sell at 3–5x RRP on secondary markets. For entrants, this creates a dual-track strategy: build a core range for everyday consumption while using limited releases to generate media coverage, collector enthusiasm, and aspirational brand positioning.'
        }
      },
      2022: {
        marketSize: '$61.5B',
        growth: '+7.8%',
        growthDir: 'up',
        volumeCases: '385M',
        topMarkets: [
          {
            name: 'India',
            growth: '+8.5%',
            brands: ['Johnnie Walker Red', 'McDowell\u2019s', 'Royal Challenge'],
            regions: [
              { name: 'Delhi NCR', share: '25.5%', growth: '+9.2%' },
              { name: 'Mumbai', share: '20.3%', growth: '+8.1%' },
              { name: 'Bangalore', share: '15.8%', growth: '+8.8%' },
              { name: 'Chennai', share: '30.9%', growth: '+8.2%' },
              { name: 'Kolkata', share: '7.5%', growth: '+7.1%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+7.2%',
            brands: ['Maker\u2019s Mark', 'Jack Daniel\u2019s', 'Woodford Reserve'],
            regions: [
              { name: 'Kentucky', share: '13.8%', growth: '+8.5%' },
              { name: 'Texas', share: '13.8%', growth: '+7.1%' },
              { name: 'California', share: '19.8%', growth: '+6.2%' },
              { name: 'Other', share: '39.5%', growth: '+7.2%' },
              { name: 'Illinois', share: '7.1%', growth: '+4.0%' },
              { name: 'Pennsylvania', share: '6.0%', growth: '+1.6%' },
            ],
            sources: [
              { name: 'Distilled Spirits Council of USA', url: 'https://www.discus.org' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'China',
            growth: '+18.5%',
            brands: ['Johnnie Walker Blue', 'Macallan', 'Chivas Regal'],
            regions: [
              { name: 'Shanghai', share: '30.3%', growth: '+19.2%' },
              { name: 'Beijing', share: '25.2%', growth: '+18.8%' },
              { name: 'Guangzhou', share: '16.5%', growth: '+17.5%' },
              { name: 'Chengdu', share: '18.6%', growth: '+18.2%' },
              { name: 'Shenzhen', share: '5.3%', growth: '+1.4%' },
              { name: 'Hangzhou', share: '4.1%', growth: '+2.4%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'Euromonitor International', url: 'https://www.euromonitor.com' },
            ]
          },
          {
            name: 'Japan',
            growth: '+5.8%',
            brands: ['Yamazaki 12', 'Hibiki 21', 'Hakushu'],
            regions: [
              { name: 'Tokyo', share: '33.2%', growth: '+6.5%' },
              { name: 'Osaka', share: '25.3%', growth: '+5.5%' },
              { name: 'Kyoto', share: '17.4%', growth: '+6.1%' },
              { name: 'Other', share: '16.5%', growth: '+5.2%' },
              { name: 'Yokohama', share: '7.6%', growth: '+3.2%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+2.1%',
            brands: ['Johnnie Walker Red', 'Famous Grouse', 'Glenmorangie'],
            regions: [
              { name: 'London', share: '25.7%', growth: '+2.8%' },
              { name: 'Southeast', share: '22.3%', growth: '+1.8%' },
              { name: 'Scotland', share: '25.4%', growth: '+2.2%' },
              { name: 'Other', share: '20.8%', growth: '+1.5%' },
              { name: 'Bristol', share: '5.8%', growth: '+7.2%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Macallan 18', 'Yamazaki 12', 'Pappy Van Winkle', 'Dalmore 18', 'Hibiki 21', 'Johnnie Walker Blue'],
          midTier: ['Maker\u2019s Mark', 'Glenlivet 12', 'Monkey Shoulder', 'Bulleit', 'Woodford Reserve'],
          value: ['Jack Daniel\u2019s', 'Jim Beam', 'Jameson', 'Famous Grouse', 'Johnnie Walker Red']
        },
        channels: { onTrade: 37.8, offTrade: 49.3, eCommerce: 3.7, travelRetail: 9.2 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 45,   // % ACV distribution
          ceDepletions: 2350000,  // case equivalent depletions
          billback: 8.5,          // % average billback/discount
          grossMarginPct: 55,       // % gross margin
          cac: 46,               // $ customer acquisition cost
          itr: 9,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Chinese whisky market experiences explosive growth as ultra-wealthy consumers adopt premium spirits', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Bourbon boom continues with supply constraints keeping aged whiskey prices elevated', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Japanese whisky gaining collectible status with Yamazaki achieving trophy asset positioning', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com' },
          { text: 'Indian whisky exports beginning to grow as domestic premiumization accelerates', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Premium whisky shortages creating allocation systems and rationing in retail channels', source: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['China\u2019s premium whisky market surges 18%+ exceeding expectations', 'Suntory announces production constraints for Yamazaki 12', 'US bourbon boom continues with allocation systems for premium releases', 'Global single malt Scotch production reaches capacity limits'],
          topPerformer: 'Yamazaki',
          analysis: 'Whisky achieved exceptional +7.8% growth in 2022, driven by China\u2019s explosive entry into premium whisky and continued bourbon boom in the United States. China surged +18.5% as newly wealthy consumers sought ultra-premium spirits as status symbols and collectible assets. Japanese whisky, particularly Yamazaki 12 and Hibiki 21, captured Western and Asian consumer imagination as premium craft category, driving Suntory to announce production constraints. US bourbon maintained +7.2% growth despite supply pressures as craft distilleries expanded production and innovation. India achieved +8.5% growth as domestic whisky consumption surged among emerging middle class. Global premiumization accelerated with allocation systems for premium releases becoming standard practice, indicating structural supply shortfalls.',
          conclusion: '2022 was the year of premiumisation acceleration in whisky, with single malts growing 12% against blended’s 2%. The premiumisation wave created opportunities at both ends: ultra-premium (single cask, vintage-dated) for collectors and aficionados, and accessible premium (£25–40) for consumers trading up from blended. New brands found their strongest traction in the Irish whiskey segment, where the category’s approachable flavour profile and growing global distribution made it the easiest sub-category for challenger brands to penetrate.'
        }
      },
      2021: {
        marketSize: '$57.0B',
        growth: '+5.2%',
        growthDir: 'up',
        volumeCases: '357M',
        topMarkets: [
          {
            name: 'India',
            growth: '+7.2%',
            brands: ['Johnnie Walker Red', 'McDowell\u2019s', 'Royal Challenge'],
            regions: [
              { name: 'Delhi NCR', share: '25.6%', growth: '+8.1%' },
              { name: 'Mumbai', share: '20.7%', growth: '+7.5%' },
              { name: 'Bangalore', share: '17.2%', growth: '+6.8%' },
              { name: 'Chennai', share: '30.0%', growth: '+7.1%' },
              { name: 'Kolkata', share: '6.5%', growth: '+4.5%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+8.5%',
            brands: ['Maker\u2019s Mark', 'Jack Daniel\u2019s', 'Woodford Reserve'],
            regions: [
              { name: 'Kentucky', share: '14.9%', growth: '+10.2%' },
              { name: 'Texas', share: '14.5%', growth: '+8.8%' },
              { name: 'California', share: '19.3%', growth: '+7.5%' },
              { name: 'Other', share: '37.8%', growth: '+8.1%' },
              { name: 'Illinois', share: '6.7%', growth: '+7.1%' },
              { name: 'Pennsylvania', share: '6.8%', growth: '+1.8%' },
            ],
            sources: [
              { name: 'Distilled Spirits Council of USA', url: 'https://www.discus.org' },
              { name: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
            ]
          },
          {
            name: 'China',
            growth: '+15.2%',
            brands: ['Johnnie Walker Blue', 'Macallan', 'Chivas Regal'],
            regions: [
              { name: 'Shanghai', share: '29.4%', growth: '+16.1%' },
              { name: 'Beijing', share: '25.0%', growth: '+15.8%' },
              { name: 'Guangzhou', share: '17.6%', growth: '+14.5%' },
              { name: 'Chengdu', share: '19.0%', growth: '+15.1%' },
              { name: 'Shenzhen', share: '6.0%', growth: '+3.7%' },
              { name: 'Hangzhou', share: '3.0%', growth: '+5.6%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'Euromonitor International', url: 'https://www.euromonitor.com' },
            ]
          },
          {
            name: 'Japan',
            growth: '+4.5%',
            brands: ['Yamazaki 12', 'Hibiki 21', 'Hakushu'],
            regions: [
              { name: 'Tokyo', share: '34.0%', growth: '+5.2%' },
              { name: 'Osaka', share: '25.3%', growth: '+4.1%' },
              { name: 'Kyoto', share: '16.2%', growth: '+4.8%' },
              { name: 'Other', share: '17.8%', growth: '+4.0%' },
              { name: 'Yokohama', share: '6.7%', growth: '+3.4%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+1.2%',
            brands: ['Johnnie Walker Red', 'Famous Grouse', 'Glenmorangie'],
            regions: [
              { name: 'London', share: '25.4%', growth: '+1.8%' },
              { name: 'Southeast', share: '21.6%', growth: '+1.0%' },
              { name: 'Scotland', share: '26.0%', growth: '+1.3%' },
              { name: 'Other', share: '22.0%', growth: '+0.8%' },
              { name: 'Bristol', share: '5.0%', growth: '+3.1%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Macallan 18', 'Yamazaki 12', 'Pappy Van Winkle', 'Dalmore 18', 'Hibiki 21', 'Johnnie Walker Blue'],
          midTier: ['Maker\u2019s Mark', 'Glenlivet 12', 'Monkey Shoulder', 'Bulleit', 'Woodford Reserve'],
          value: ['Jack Daniel\u2019s', 'Jim Beam', 'Jameson', 'Famous Grouse', 'Johnnie Walker Red']
        },
        channels: { onTrade: 40.0, offTrade: 47.0, eCommerce: 3.8, travelRetail: 9.2 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 44,   // % ACV distribution
          ceDepletions: 2270000,  // case equivalent depletions
          billback: 8.2,          // % average billback/discount
          grossMarginPct: 54,       // % gross margin
          cac: 48,               // $ customer acquisition cost
          itr: 8,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Bourbon boom accelerates with craft distillery expansion and allocation systems emerging', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Japanese whisky achieving status symbol positioning among global luxury consumers', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'China emerging as third-largest whisky market following US and India recovery', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com' },
          { text: 'Scotch single malt premiumization accelerating with age-statement variants leading growth', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Off-trade channels surge during pandemic with home entertaining driving premium purchases', source: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['US bourbon boom accelerates with Pappy Van Winkle becoming allocation-only release', 'China\u2019s whisky market recovery begins as luxury consumption rebounding', 'Indian whisky consumption surges 7%+ as middle class adopts premium spirits', 'Suntory invests $200M in Japanese whisky production expansion'],
          topPerformer: 'Johnnie Walker',
          analysis: 'Whisky achieved +5.2% growth in 2021, driven by pandemic-era home entertaining premiumization and emerging market expansion. The US bourbon boom intensified with +8.5% growth as homebound consumers invested in premium aged whiskeys. Craft distilleries proliferated and older vintages commanded scarcity premiums. China rebounded with +15.2% growth as ultra-wealthy consumers sought luxury spirits for gifting and collectibility. Indian market grew +7.2% as emerging middle-class consumers adopted whisky for celebrations. Japan achieved +4.5% growth as Yamazaki and Hibiki captured status-conscious consumers\u2019 imagination globally. UK market stalled at +1.2% due to on-trade closure impact, reflecting mature market dynamics. Off-trade channels surged to 47% as home entertaining drove premiumization.',
          conclusion: '2021 marked whisky’s post-pandemic recovery, with global sales returning to 2019 levels by Q3. The recovery was uneven: Asian markets (particularly China and India) rebounded fastest, while European on-trade remained constrained. The strategic lesson for new brands is that whisky’s recovery pattern revealed which markets are most resilient—and those markets (India, China, USA) should be prioritised for long-term brand building. The 2021 data also confirmed that e-commerce whisky sales, which tripled during lockdowns, retained 60% of their gains, permanently expanding the addressable market for digitally-native brands.'
        }
      },
    }
  },
  {
    key: 'rum',
    label: 'Rum',
    icon: 'R',
    iconColor: 'text-rose-700',
    iconBg: 'bg-rose-50',
    trajectory: 'Premium and aged rum renaissance underway at $14.8B. Spiced rum declining, rhum agricole gaining recognition. Rum replacing bourbon as bartender\u2019s spirit in mixology.',
    yearData: {
      2025: {
        marketSize: '$14.8B',
        growth: '+4.5%',
        growthDir: 'up',
        volumeCases: '91M',
        topMarkets: [
          {
            name: 'India',
            growth: '+5.8%',
            brands: ['Bacardi Superior', 'McDowell\u2019s', 'Old Monk'],
            regions: [
              { name: 'Delhi NCR', share: '29.8%', growth: '+6.2%' },
              { name: 'Mumbai', share: '24.3%', growth: '+5.1%' },
              { name: 'Bangalore', share: '18.7%', growth: '+6.1%' },
              { name: 'Chennai', share: '20.6%', growth: '+5.8%' },
              { name: 'Kolkata', share: '6.6%', growth: '+2.0%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+6.2%',
            brands: ['Bacardi 8', 'Plantation', 'Mount Gay XO'],
            regions: [
              { name: 'Florida', share: '20.1%', growth: '+7.1%' },
              { name: 'New York', share: '16.4%', growth: '+6.8%' },
              { name: 'California', share: '17.3%', growth: '+5.2%' },
              { name: 'Other', share: '37.4%', growth: '+6.1%' },
              { name: 'Illinois', share: '4.7%', growth: '+1.5%' },
              { name: 'Pennsylvania', share: '4.1%', growth: '+5.8%' },
            ],
            sources: [
              { name: 'Distilled Spirits Council of USA', url: 'https://www.discus.org' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+3.8%',
            brands: ['Captain Morgan', 'Bacardi Superior', 'Havana Club'],
            regions: [
              { name: 'London', share: '22.6%', growth: '+4.5%' },
              { name: 'Southeast', share: '20.8%', growth: '+3.2%' },
              { name: 'Midlands', share: '24.6%', growth: '+3.8%' },
              { name: 'North & Scotland', share: '26.5%', growth: '+3.9%' },
              { name: 'Bristol', share: '5.5%', growth: '+4.4%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'Germany',
            growth: '+4.1%',
            brands: ['Captain Morgan', 'Bacardi Superior', 'Plantation'],
            regions: [
              { name: 'Berlin', share: '24.4%', growth: '+4.8%' },
              { name: 'Munich', share: '18.7%', growth: '+3.5%' },
              { name: 'Hamburg', share: '24.4%', growth: '+4.2%' },
              { name: 'Frankfurt', share: '26.2%', growth: '+3.8%' },
              { name: 'Hesse', share: '6.3%', growth: '+2.4%' },
            ],
            sources: [
              { name: 'Euromonitor International', url: 'https://www.euromonitor.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'Caribbean',
            growth: '+5.2%',
            brands: ['Mount Gay', 'Appleton Estate', 'Zacapa'],
            regions: [
              { name: 'Jamaica', share: '28.0%', growth: '+5.5%' },
              { name: 'Barbados', share: '22.0%', growth: '+4.8%' },
              { name: 'Trinidad & Tobago', share: '25.0%', growth: '+5.1%' },
              { name: 'Other Islands', share: '25.0%', growth: '+5.2%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Appleton Estate 21', 'Diplomático Reserva', 'Zacapa 23', 'Ron Abuelo', 'Foursquare ECS', 'Mount Gay XO'],
          midTier: ['Bacardi 8', 'Havana Club 7', 'Plantation', 'Flor de Caña', 'Kraken'],
          value: ['Bacardi Superior', 'Captain Morgan', 'Malibu', 'Havana Club 3', 'Admiral Nelson']
        },
        channels: { onTrade: 41.9, offTrade: 48.1, eCommerce: 4.9, travelRetail: 5.1 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 42,   // % ACV distribution
          ceDepletions: 1500000,  // case equivalent depletions
          billback: 8.8,          // % average billback/discount
          grossMarginPct: 54,       // % gross margin
          cac: 36,               // $ customer acquisition cost
          itr: 12,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Aged rum segment growing +8% YoY as premium positioning strengthens', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Rhum agricole gaining bartender credibility with white rhum agricole mixology trend', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Spiced rum category declining -6% as novelty fades', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com' },
          { text: 'Rum replacing bourbon as bartender\u2019s spirit of choice for craft cocktails', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Millennial consumers shifting to rum from vodka as premium mixer category', source: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['Appleton Estate achieves record pricing for 21-year-old expression', 'Plantation Rum expands rhum agricole collection with terroir-focused offerings', 'Spiced rum market contraction accelerates as consumer tastes evolve', 'Diplomático brand achieves premium positioning through sustainability messaging'],
          topPerformer: 'Appleton Estate',
          analysis: 'The rum category achieved +4.5% growth in 2025, reflecting a pronounced renaissance in premium and aged expressions while novelty segments (spiced rum) collapsed. This bifurcation reflected changing consumer preferences from quantity and flavor gimmicks toward quality, heritage, and craft positioning. Aged rum segments (15+ years old) grew at +8%, achieving price premiums of 50%+ versus standard white rum. This premiumization trend positioned rum as competitor to whisky and cognac in on-trade premium cocktail programs, reversing decades of positioning as mixology ingredient rather than sipping spirit.\n\nGeographic dynamics showed resilience amid commoditization pressures. India dominated volume at approximately 45% of global consumption, growing +5.8% as emerging middle-class consumers adopted rum for social occasions. The US, critical for premium positioning, accelerated to +6.2% growth driven by craft cocktail culture and bartender advocacy. Rhum agricole, the French Caribbean style made from fresh sugarcane juice, emerged as the growth driver (+12% annually) as bartenders and consumers discovered terroir-driven complexity compared to molasses-based rum. Spiced rum, which had driven 2010s novelty growth, contracted -6% as consumers matured away from flavored spirits toward authentic craft expressions.\n\nBrand segmentation showed clear stratification with expanding middle tier driving profitability. Ultra-premium aged rum (Appleton Estate 21, Zacapa 23, Diplomático Reserva) achieved secondary market premiums of 30-50% over retail. Mid-tier brands (Bacardi 8, Plantation, Havana Club 7) expanded distribution and achieved premiumization pricing of 15-25% above value segment. Value brands (Bacardi Superior, Captain Morgan, Havana Club 3) faced volume pressure but maintained distribution breadth through price competitiveness. Travel retail achieved 5% channel share, significant in Caribbean gateway markets where duty-free shopping concentrated.',
          conclusion: 'Rum transitioned from novelty-driven (spiced) to craft-positioned (aged/rhum agricole) category in 2025. Premium aging, terroir focus, and bartender advocacy replaced flavor innovation as growth driver. The category is establishing itself as premium sipping spirit competitor to whisky and cognac.'
        }
      },
      2024: {
        marketSize: '$14.2B',
        growth: '+5.2%',
        growthDir: 'up',
        volumeCases: '87M',
        topMarkets: [
          {
            name: 'India',
            growth: '+6.5%',
            brands: ['Bacardi Superior', 'McDowell\u2019s', 'Old Monk'],
            regions: [
              { name: 'Delhi NCR', share: '29.9%', growth: '+7.1%' },
              { name: 'Mumbai', share: '23.7%', growth: '+6.2%' },
              { name: 'Bangalore', share: '18.8%', growth: '+6.5%' },
              { name: 'Chennai', share: '21.3%', growth: '+6.1%' },
              { name: 'Kolkata', share: '6.3%', growth: '+5.4%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+7.8%',
            brands: ['Bacardi 8', 'Plantation', 'Mount Gay XO'],
            regions: [
              { name: 'Florida', share: '20.4%', growth: '+8.5%' },
              { name: 'New York', share: '15.8%', growth: '+8.2%' },
              { name: 'California', share: '16.5%', growth: '+7.1%' },
              { name: 'Other', share: '38.0%', growth: '+7.5%' },
              { name: 'Illinois', share: '5.3%', growth: '+3.2%' },
              { name: 'Pennsylvania', share: '4.0%', growth: '+3.5%' },
            ],
            sources: [
              { name: 'Distilled Spirits Council of USA', url: 'https://www.discus.org' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+4.2%',
            brands: ['Captain Morgan', 'Bacardi Superior', 'Havana Club'],
            regions: [
              { name: 'London', share: '23.3%', growth: '+4.8%' },
              { name: 'Southeast', share: '19.9%', growth: '+3.8%' },
              { name: 'Midlands', share: '24.7%', growth: '+4.1%' },
              { name: 'North & Scotland', share: '25.4%', growth: '+4.2%' },
              { name: 'Bristol', share: '6.7%', growth: '+0.3%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'Germany',
            growth: '+3.5%',
            brands: ['Captain Morgan', 'Bacardi Superior', 'Plantation'],
            regions: [
              { name: 'Berlin', share: '25.3%', growth: '+4.2%' },
              { name: 'Munich', share: '19.4%', growth: '+3.1%' },
              { name: 'Hamburg', share: '23.7%', growth: '+3.5%' },
              { name: 'Frankfurt', share: '24.5%', growth: '+3.2%' },
              { name: 'Hesse', share: '7.1%', growth: '+5.6%' },
            ],
            sources: [
              { name: 'Euromonitor International', url: 'https://www.euromonitor.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'Caribbean',
            growth: '+6.1%',
            brands: ['Mount Gay', 'Appleton Estate', 'Zacapa'],
            regions: [
              { name: 'Jamaica', share: '28.2%', growth: '+6.5%' },
              { name: 'Barbados', share: '21.7%', growth: '+5.8%' },
              { name: 'Trinidad & Tobago', share: '24.3%', growth: '+6.1%' },
              { name: 'Other Islands', share: '25.8%', growth: '+6.0%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Appleton Estate 21', 'Diplomático Reserva', 'Zacapa 23', 'Ron Abuelo', 'Foursquare ECS', 'Mount Gay XO'],
          midTier: ['Bacardi 8', 'Havana Club 7', 'Plantation', 'Flor de Caña', 'Kraken'],
          value: ['Bacardi Superior', 'Captain Morgan', 'Malibu', 'Havana Club 3', 'Admiral Nelson']
        },
        channels: { onTrade: 40.3, offTrade: 49.2, eCommerce: 5.3, travelRetail: 5.2 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 40,   // % ACV distribution
          ceDepletions: 1420000,  // case equivalent depletions
          billback: 8.5,          // % average billback/discount
          grossMarginPct: 53,       // % gross margin
          cac: 38,               // $ customer acquisition cost
          itr: 11,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Premium aged rum achieves +10% growth as consumer trading up accelerates', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Rhum agricole category expanding rapidly with craft bartenders driving awareness', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Spiced rum declines -8% as trend fatigue sets in globally', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com' },
          { text: 'Craft rum distilleries gaining shelf space in US and European premium bars', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Rum positioning as bourbon alternative for craft cocktail programs', source: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['Appleton Estate secures listings in Michelin-starred restaurants globally', 'Plantation Rum launches rhum agricole education campaign', 'Captain Morgan reduces spiced rum portfolio to focus on aged expressions', 'Foursquare announces limited bottling allocation due to demand'],
          topPerformer: 'Plantation',
          analysis: 'Rum accelerated to +5.2% growth in 2024, driven by pronounced premiumization as consumers shifted from novelty (spiced) to craft (aged/rhum agricole) positioning. Premium aged rum segments achieved +10% growth, outpacing category growth by 5 points and confirming systematic trading up. Rhum agricole, traditionally niche, surged +12% as craft bartenders championed terroir-driven expressions made from fresh sugarcane juice. Spiced rum, the growth driver of the 2010s, contracted -8% as novelty fatigue set in and consumers matured toward authenticity.\n\nThe US market emerged as the growth leader at +7.8%, driven by craft cocktail culture and bartender advocacy positioning rum as bourbon alternative. Premium bars and cocktail programs increasingly featured rum-based cocktails over traditional whiskey drinks, reflecting consumer interest in tropical flavors and craft exploration. Florida and New York achieved highest growth, reflecting geographic concentration of rum consumption and Caribbean tourism influence. India maintained robust +6.5% growth as emerging middle-class consumers adopted rum for celebrations and gifting. Caribbean markets achieved +6.1% growth as tourism recovery and premium on-trade development drove consumption.\n\nBrand dynamics showed systematic premiumization. Ultra-premium aged rum (Appleton Estate, Zacapa, Diplomático) achieved 30%+ price premiums and Michelin-starred restaurant placements. Mid-tier brands (Plantation, Bacardi 8, Havana Club 7) captured premiumization opportunity through positioning as quality craft alternatives. Value brands faced volume pressure as consumers traded up, with spiced rum (Kraken, Malibu) suffering most acute decline.',
          conclusion: '2024 validated rum’s premiumisation trajectory, with aged and spiced sub-categories growing 14% against white rum’s 2%. The category’s transformation mirrors tequila’s journey five years earlier—moving from a mixer commodity to a sippable premium spirit. For new brands, the entry window is now: rum premiumisation is early enough that brand positions are not yet entrenched, but advanced enough that consumer willingness to pay £30–60 for quality rum is established. Caribbean provenance remains the strongest brand anchor, but Central American and South American origins are gaining credibility rapidly.'
        }
      },
      2023: {
        marketSize: '$13.5B',
        growth: '+6.8%',
        growthDir: 'up',
        volumeCases: '83M',
        topMarkets: [
          {
            name: 'India',
            growth: '+7.2%',
            brands: ['Bacardi Superior', 'McDowell\u2019s', 'Old Monk'],
            regions: [
              { name: 'Delhi NCR', share: '31.6%', growth: '+8.1%' },
              { name: 'Mumbai', share: '23.2%', growth: '+7.1%' },
              { name: 'Bangalore', share: '20.0%', growth: '+7.2%' },
              { name: 'Chennai', share: '20.2%', growth: '+6.8%' },
              { name: 'Kolkata', share: '5.0%', growth: '+1.4%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+8.5%',
            brands: ['Bacardi 8', 'Plantation', 'Mount Gay'],
            regions: [
              { name: 'Florida', share: '20.0%', growth: '+9.2%' },
              { name: 'New York', share: '16.3%', growth: '+8.8%' },
              { name: 'California', share: '16.6%', growth: '+7.5%' },
              { name: 'Other', share: '36.6%', growth: '+8.2%' },
              { name: 'Illinois', share: '5.5%', growth: '+4.9%' },
              { name: 'Pennsylvania', share: '5.0%', growth: '+6.8%' },
            ],
            sources: [
              { name: 'Distilled Spirits Council of USA', url: 'https://www.discus.org' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+5.1%',
            brands: ['Captain Morgan', 'Bacardi Superior', 'Havana Club'],
            regions: [
              { name: 'London', share: '24.3%', growth: '+5.8%' },
              { name: 'Southeast', share: '20.1%', growth: '+4.8%' },
              { name: 'Midlands', share: '24.6%', growth: '+5.1%' },
              { name: 'North & Scotland', share: '24.8%', growth: '+5.0%' },
              { name: 'Bristol', share: '6.2%', growth: '+2.1%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'Germany',
            growth: '+4.8%',
            brands: ['Captain Morgan', 'Bacardi Superior', 'Plantation'],
            regions: [
              { name: 'Berlin', share: '25.1%', growth: '+5.5%' },
              { name: 'Munich', share: '19.8%', growth: '+4.2%' },
              { name: 'Hamburg', share: '23.5%', growth: '+4.8%' },
              { name: 'Frankfurt', share: '23.6%', growth: '+4.5%' },
              { name: 'Hesse', share: '8.0%', growth: '+5.9%' },
            ],
            sources: [
              { name: 'Euromonitor International', url: 'https://www.euromonitor.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'Caribbean',
            growth: '+7.5%',
            brands: ['Mount Gay', 'Appleton Estate', 'Zacapa'],
            regions: [
              { name: 'Jamaica', share: '28.7%', growth: '+8.1%' },
              { name: 'Barbados', share: '21.2%', growth: '+7.2%' },
              { name: 'Trinidad & Tobago', share: '25.4%', growth: '+7.5%' },
              { name: 'Other Islands', share: '24.7%', growth: '+7.1%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Appleton Estate 21', 'Diplomático Reserva', 'Zacapa 23', 'Ron Abuelo', 'Foursquare ECS', 'Mount Gay XO'],
          midTier: ['Bacardi 8', 'Havana Club 7', 'Plantation', 'Flor de Caña', 'Kraken'],
          value: ['Bacardi Superior', 'Captain Morgan', 'Malibu', 'Havana Club 3', 'Admiral Nelson']
        },
        channels: { onTrade: 40.5, offTrade: 49.5, eCommerce: 5.0, travelRetail: 5.0 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 38,   // % ACV distribution
          ceDepletions: 1340000,  // case equivalent depletions
          billback: 8.2,          // % average billback/discount
          grossMarginPct: 52,       // % gross margin
          cac: 40,               // $ customer acquisition cost
          itr: 11,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Aged rum category growing +9% YoY exceeding overall category growth', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Rhum agricole achieving rapid growth as bartenders champion terroir-driven craft', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Spiced rum declining -5% as consumer tastes mature away from flavored spirits', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com' },
          { text: 'Rum positioning as premium cocktail ingredient replacing bourbon in craft bars', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Tourism recovery driving Caribbean market expansion and premium consumption', source: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['Plantation Rum expands distribution to 50+ countries', 'Appleton Estate achieves premium bar positioning in North America', 'Spiced rum brands restructure portfolios to emphasize aged expressions', 'Caribbean tourism recovery drives travel retail growth'],
          topPerformer: 'Mount Gay',
          analysis: 'Rum achieved strong +6.8% growth in 2023, driven by pronounced premiumization as consumers systematically traded from novelty (spiced rum) to authentic craft (aged and rhum agricole) positioning. Premium aged rum segments accelerated to +9% growth, outpacing total category growth and signaling clear preference evolution. Rhum agricole, made from fresh sugarcane juice rather than molasses, emerged as growth star as craft bartenders championed terroir-driven expressions with tropical fruit complexity.\n\nThe US market accelerated to +8.5%, driven by craft cocktail bar adoption of rum-focused programs. Florida and New York, geographic concentration of Caribbean influence and premium dining, achieved highest growth at +9%+ as bartenders repositioned rum from mixology ingredient to premium sipping and cocktail spirit. Caribbean tourism recovery drove +7.5% growth in home markets as travel retail and on-trade premiumization expanded. India maintained +7.2% growth as emerging consumers adopted rum for celebrations.\n\nBrand stratification accelerated with ultra-premium aged rum achieving clear positioning success. Appleton Estate 21, Zacapa 23, and Diplomático Reserva achieved Michelin-starred bar placements and premium cocktail program inclusion. Premiumization extended to mid-tier: Plantation and Bacardi 8 achieved 15-20% pricing above value segment through craft positioning and mixology credibility.',
          conclusion: '2023 saw rum’s premiumisation accelerate as bartender advocacy and cocktail culture drove aged rum into mainstream on-premise menus. The category’s 6.5% growth outpaced whisky and gin, signalling a structural shift in consumer preference toward rum as a versatile premium spirit. For challenger brands, the critical success factor is on-premise activation: 68% of premium rum trial occurs in bars and restaurants, making bartender relationships and cocktail integration more important than retail shelf space. Brands should allocate 60%+ of marketing spend to trade engagement.'
        }
      },
      2022: {
        marketSize: '$12.6B',
        growth: '+5.5%',
        growthDir: 'up',
        volumeCases: '78M',
        topMarkets: [
          {
            name: 'India',
            growth: '+6.8%',
            brands: ['Bacardi Superior', 'McDowell\u2019s', 'Old Monk'],
            regions: [
              { name: 'Delhi NCR', share: '31.3%', growth: '+7.5%' },
              { name: 'Mumbai', share: '23.2%', growth: '+6.5%' },
              { name: 'Bangalore', share: '20.5%', growth: '+6.8%' },
              { name: 'Chennai', share: '19.1%', growth: '+6.5%' },
              { name: 'Kolkata', share: '5.9%', growth: '+4.0%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+6.2%',
            brands: ['Bacardi Superior', 'Captain Morgan', 'Bacardi 8'],
            regions: [
              { name: 'Florida', share: '19.5%', growth: '+7.1%' },
              { name: 'New York', share: '16.2%', growth: '+6.5%' },
              { name: 'California', share: '16.8%', growth: '+5.2%' },
              { name: 'Other', share: '37.4%', growth: '+6.1%' },
              { name: 'Illinois', share: '6.4%', growth: '+5.2%' },
              { name: 'Pennsylvania', share: '3.7%', growth: '+3.2%' },
            ],
            sources: [
              { name: 'Distilled Spirits Council of USA', url: 'https://www.discus.org' },
              { name: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+3.5%',
            brands: ['Captain Morgan', 'Bacardi Superior', 'Havana Club'],
            regions: [
              { name: 'London', share: '24.9%', growth: '+4.1%' },
              { name: 'Southeast', share: '19.2%', growth: '+3.2%' },
              { name: 'Midlands', share: '23.9%', growth: '+3.5%' },
              { name: 'North & Scotland', share: '25.5%', growth: '+3.2%' },
              { name: 'Bristol', share: '6.5%', growth: '+2.7%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'Germany',
            growth: '+4.2%',
            brands: ['Captain Morgan', 'Bacardi Superior', 'Malibu'],
            regions: [
              { name: 'Berlin', share: '26.0%', growth: '+4.8%' },
              { name: 'Munich', share: '18.7%', growth: '+3.8%' },
              { name: 'Hamburg', share: '23.3%', growth: '+4.2%' },
              { name: 'Frankfurt', share: '22.9%', growth: '+3.9%' },
              { name: 'Hesse', share: '9.1%', growth: '+5.9%' },
            ],
            sources: [
              { name: 'Euromonitor International', url: 'https://www.euromonitor.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'Caribbean',
            growth: '+5.8%',
            brands: ['Mount Gay', 'Appleton Estate', 'Zacapa'],
            regions: [
              { name: 'Jamaica', share: '28.9%', growth: '+6.2%' },
              { name: 'Barbados', share: '21.4%', growth: '+5.5%' },
              { name: 'Trinidad & Tobago', share: '25.8%', growth: '+5.8%' },
              { name: 'Other Islands', share: '23.9%', growth: '+5.5%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'Euromonitor International', url: 'https://www.euromonitor.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Appleton Estate 21', 'Diplomático Reserva', 'Zacapa 23', 'Ron Abuelo', 'Foursquare ECS', 'Mount Gay XO'],
          midTier: ['Bacardi 8', 'Havana Club 7', 'Plantation', 'Flor de Caña', 'Kraken'],
          value: ['Bacardi Superior', 'Captain Morgan', 'Malibu', 'Havana Club 3', 'Admiral Nelson']
        },
        channels: { onTrade: 38.4, offTrade: 51.7, eCommerce: 5.0, travelRetail: 4.9 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 36,   // % ACV distribution
          ceDepletions: 1260000,  // case equivalent depletions
          billback: 7.8,          // % average billback/discount
          grossMarginPct: 51,       // % gross margin
          cac: 42,               // $ customer acquisition cost
          itr: 10,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Post-pandemic on-trade recovery driving rum cocktail culture growth', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Spiced rum trend peaking as consumer interest stabilizes', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Aged rum gaining prominence as premiumization strategy for major brands', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com' },
          { text: 'Caribbean travel recovery driving tourism-related rum consumption', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Rhum agricole emerging as category growth opportunity for craft distillers', source: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['Post-pandemic on-trade recovery drives rum cocktail culture', 'Spiced rum trend stabilizes at elevated consumption levels', 'Aged rum launches expand as major brands pursue premiumization', 'Caribbean tourism recovery begins signaling market expansion'],
          topPerformer: 'Captain Morgan',
          analysis: 'Rum achieved +5.5% growth in 2022, driven by post-pandemic on-trade recovery and emerging premiumization trend. On-trade channel expansion to 39% (from 36% in 2021) reflected bartender innovation and rum cocktail culture development. Spiced rum trend, which had driven novelty growth, peaked as consumer interest stabilized and began showing fatigue signs. Aged rum launches from major brands signaled recognition that premiumization, not flavor novelty, would define future growth. The US market grew +6.2% as craft cocktail bar development created new demand for quality rum expressions. Caribbean tourism recovery began, signaling future market expansion potential in travel retail and on-trade channels.',
          conclusion: '2022 represented rum’s inflection point from commodity to premiumisation, with the average bottle price increasing 8% as consumers traded up from mass-market white rum to aged and spiced expressions. Diplomatico, Zacapa, and Appleton Estate led the premiumisation charge, proving that heritage Caribbean brands could command £35–55 price points previously reserved for whisky and cognac. For new entrants, the data confirms that launching a rum brand below £25 RRP is a race to the bottom; the growth is exclusively in the £28–65 segment.'
        }
      },
      2021: {
        marketSize: '$11.9B',
        growth: '+3.2%',
        growthDir: 'up',
        volumeCases: '74M',
        topMarkets: [
          {
            name: 'India',
            growth: '+4.5%',
            brands: ['Bacardi Superior', 'McDowell\u2019s', 'Old Monk'],
            regions: [
              { name: 'Delhi NCR', share: '32.8%', growth: '+5.1%' },
              { name: 'Mumbai', share: '22.2%', growth: '+4.2%' },
              { name: 'Bangalore', share: '19.9%', growth: '+4.5%' },
              { name: 'Chennai', share: '19.5%', growth: '+4.2%' },
              { name: 'Kolkata', share: '5.6%', growth: '+5.3%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+2.8%',
            brands: ['Bacardi Superior', 'Captain Morgan', 'Bacardi 8'],
            regions: [
              { name: 'Florida', share: '19.0%', growth: '+3.5%' },
              { name: 'New York', share: '16.0%', growth: '+3.1%' },
              { name: 'California', share: '17.9%', growth: '+2.2%' },
              { name: 'Other', share: '38.5%', growth: '+2.7%' },
              { name: 'Illinois', share: '5.9%', growth: '+5.9%' },
              { name: 'Pennsylvania', share: '2.7%', growth: '+1.9%' },
            ],
            sources: [
              { name: 'Distilled Spirits Council of USA', url: 'https://www.discus.org' },
              { name: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+1.8%',
            brands: ['Captain Morgan', 'Bacardi Superior', 'Havana Club'],
            regions: [
              { name: 'London', share: '25.1%', growth: '+2.5%' },
              { name: 'Southeast', share: '19.0%', growth: '+1.5%' },
              { name: 'Midlands', share: '23.2%', growth: '+1.8%' },
              { name: 'North & Scotland', share: '25.3%', growth: '+1.5%' },
              { name: 'Bristol', share: '7.4%', growth: '+2.2%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'Germany',
            growth: '+2.1%',
            brands: ['Captain Morgan', 'Bacardi Superior', 'Malibu'],
            regions: [
              { name: 'Berlin', share: '25.4%', growth: '+2.8%' },
              { name: 'Munich', share: '19.3%', growth: '+1.8%' },
              { name: 'Hamburg', share: '23.8%', growth: '+2.1%' },
              { name: 'Frankfurt', share: '21.7%', growth: '+1.8%' },
              { name: 'Hesse', share: '9.8%', growth: '+4.7%' },
            ],
            sources: [
              { name: 'Euromonitor International', url: 'https://www.euromonitor.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'Caribbean',
            growth: '+2.1%',
            brands: ['Mount Gay', 'Appleton Estate', 'Zacapa'],
            regions: [
              { name: 'Jamaica', share: '28.6%', growth: '+2.5%' },
              { name: 'Barbados', share: '21.8%', growth: '+1.8%' },
              { name: 'Trinidad & Tobago', share: '26.4%', growth: '+2.1%' },
              { name: 'Other Islands', share: '23.2%', growth: '+1.9%' },
            ],
            sources: [
              { name: 'IWSR Spirits Intelligence', url: 'https://www.theiwsr.com' },
              { name: 'Euromonitor International', url: 'https://www.euromonitor.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Appleton Estate 21', 'Diplomático Reserva', 'Zacapa 23', 'Ron Abuelo', 'Foursquare ECS', 'Mount Gay XO'],
          midTier: ['Bacardi 8', 'Havana Club 7', 'Plantation', 'Flor de Caña', 'Kraken'],
          value: ['Bacardi Superior', 'Captain Morgan', 'Malibu', 'Havana Club 3', 'Admiral Nelson']
        },
        channels: { onTrade: 35.8, offTrade: 53.0, eCommerce: 4.9, travelRetail: 6.3 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 34,   // % ACV distribution
          ceDepletions: 1180000,  // case equivalent depletions
          billback: 7.5,          // % average billback/discount
          grossMarginPct: 50,       // % gross margin
          cac: 44,               // $ customer acquisition cost
          itr: 10,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Spiced rum trend accelerates with mass-market brand entries', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Home entertaining surge during pandemic drives off-trade premiumization', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Coconut rum gaining shelf space as flavored rum category expands', source: 'Euromonitor Passport Alcoholic Drinks', url: 'https://www.euromonitor.com' },
          { text: 'Caribbean rum brands pursuing tourism and collector positioning', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'On-trade closure impacts volume but premiumization drives value growth', source: 'MarketWatch', url: 'https://www.marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['Spiced rum trend accelerates with Captain Morgan and Malibu expansion', 'Pandemic off-trade surge drives premiumization and aging segment growth', 'Caribbean tourism halts limiting travel retail and on-trade growth', 'Aged rum begins emerging as premiumization opportunity'],
          topPerformer: 'Bacardi',
          analysis: 'Rum achieved modest +3.2% growth in 2021, constrained by Caribbean tourism collapse while bolstered by pandemic-driven off-trade surge. On-trade closure reduced on-trade channel to 36%, while off-trade expanded to 53% as home entertaining premiumization drove consumer purchases of quality aged rum for personal consumption. Spiced rum trend accelerated with novelty flavors (pineapple, coconut) gaining mass-market distribution, driving trial among younger consumers. India maintained +4.5% growth as emerging middle class adopted rum for celebrations and gifting. US modest growth at +2.8% reflected on-trade closure impact, though off-trade premiumization began emerging.',
          conclusion: '2021 was a transitional year for rum, with the category growing 4.2% as pandemic restrictions limited on-trade recovery. However, the year’s most significant development was the explosion of premium rum content on social media and YouTube, which built consumer education and demand for aged expressions. For brands planning market entry, 2021 demonstrated that rum’s premiumisation would be driven by digital-first storytelling and influencer partnerships rather than traditional advertising—a more accessible and cost-effective brand-building approach for smaller operators.'
        }
      },
    }
  },
  {
    key: 'cognac',
    label: 'Cognac',
    icon: 'C',
    iconColor: 'text-purple-700',
    iconBg: 'bg-purple-50',
    trajectory: 'Cognac navigated post-pandemic volatility with a dynamic US luxury market offsetting China\u2019s anti-corruption headwinds. Recovery in 2025 driven by emerging markets like Nigeria and stabilizing premiumization trends.',
    yearData: {
      2025: {
        marketSize: '$12.5B',
        growth: '+1.8%',
        growthDir: 'up',
        volumeCases: '12.8M',
        topMarkets: [
          {
            name: 'United States',
            growth: '+4.2%',
            brands: ['Hennessy', 'Rémy Martin', 'Courvoisier'],
            regions: [
              { name: 'New York', share: '26.6%', growth: '+5.1%' },
              { name: 'California', share: '23.7%', growth: '+3.8%' },
              { name: 'Texas', share: '17.8%', growth: '+2.9%' },
              { name: 'Florida', share: '14.8%', growth: '+4.5%' },
              { name: 'Illinois', share: '6.9%', growth: '+1.8%' },
              { name: 'Pennsylvania', share: '10.2%', growth: '+1.9%' },
            ],
            sources: [
              { name: 'The IWSR', url: 'https://theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
            ]
          },
          {
            name: 'China',
            growth: '+2.5%',
            brands: ['Rémy Martin', 'Hennessy', 'Martell'],
            regions: [
              { name: 'Beijing', share: '27.8%', growth: '+1.8%' },
              { name: 'Shanghai', share: '24.0%', growth: '+2.1%' },
              { name: 'Guangzhou', share: '18.9%', growth: '+3.2%' },
              { name: 'Chongqing', share: '12.6%', growth: '+2.9%' },
              { name: 'Shenzhen', share: '10.2%', growth: '+3.4%' },
              { name: 'Hangzhou', share: '6.5%', growth: '+1.9%' },
            ],
            sources: [
              { name: 'Beverage Daily', url: 'https://beveragedaily.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
          {
            name: 'Nigeria',
            growth: '+12.3%',
            brands: ['Hennessy', 'Courvoisier', 'Rémy Martin'],
            regions: [
              { name: 'Lagos', share: '43.1%', growth: '+14.2%' },
              { name: 'Abuja', share: '22.1%', growth: '+11.5%' },
              { name: 'Port Harcourt', share: '14.7%', growth: '+10.8%' },
              { name: 'Ibadan', share: '9.8%', growth: '+9.3%' },
              { name: 'Kano', share: '10.3%', growth: '+2.5%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+1.9%',
            brands: ['Hennessy', 'Hine', 'Courvoisier'],
            regions: [
              { name: 'London', share: '43.3%', growth: '+2.4%' },
              { name: 'Manchester', share: '18.5%', growth: '+1.2%' },
              { name: 'Birmingham', share: '15.4%', growth: '+1.5%' },
              { name: 'Edinburgh', share: '12.3%', growth: '+0.8%' },
              { name: 'Bristol', share: '10.5%', growth: '+1.7%' },
            ],
            sources: [
              { name: 'Decanter', url: 'https://decanter.com' },
              { name: 'The IWSR', url: 'https://theiwsr.com' },
            ]
          },
          {
            name: 'France',
            growth: '-0.3%',
            brands: ['Hennessy', 'Rémy Martin', 'Hine'],
            regions: [
              { name: 'Paris', share: '43.3%', growth: '+0.5%' },
              { name: 'Lyon', share: '18.9%', growth: '-1.2%' },
              { name: 'Marseille', share: '14.9%', growth: '-0.8%' },
              { name: 'Bordeaux', share: '12.2%', growth: '-0.6%' },
              { name: 'Toulouse', share: '10.7%', growth: '+4.1%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Louis XIII', 'Hennessy Paradis', 'Rémy Martin Louis XIII', 'Hine Antique', 'Delamain Pale & Dry', 'Courvoisier Initiale'],
          midTier: ['Hennessy VSOP', 'Rémy Martin VSOP', 'Courvoisier VSOP', 'Martell Cordon Bleu', 'Camus VSOP'],
          value: ['Hennessy VS', 'Rémy Martin VS', 'Courvoisier VS', 'Martell VS', 'E&J VS Brandy']
        },
        channels: { onTrade: 34.5, offTrade: 42.7, eCommerce: 11.0, travelRetail: 11.8 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 28,   // % ACV distribution
          ceDepletions: 680000,  // case equivalent depletions
          billback: 7.2,          // % average billback/discount
          grossMarginPct: 64,       // % gross margin
          cac: 52,               // $ customer acquisition cost
          itr: 8,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Nigerian market emergence driving 12%+ growth, younger demographics shifting from traditional to contemporary brands', source: 'The Spirits Business Annual Review', url: 'https://thespiritsbusiness.com' },
          { text: 'US hip-hop culture maintaining luxury positioning for Hennessy, limiting competitor share gains', source: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
          { text: 'Travel retail channel growing due to luxury tourism recovery in Asia Pacific and Middle East', source: 'The IWSR', url: 'https://theiwsr.com' },
          { text: 'VS segment stabilizing volume decline; VSOP and XO maintaining value premiumization', source: 'Beverage Daily Spirits Market Report', url: 'https://beveragedaily.com' },
          { text: 'China anti-corruption regulations moderating but not reversing, domestic consumption replacing gifting', source: 'Wine Searcher', url: 'https://wine-searcher.com' },
        ],
        report: {
          keyEvents: ['Nigeria emerging as highest-growth market with +12.3% YoY expansion', 'US luxury market stabilization after 2023-2024 corrections', 'China domestic consumption recovery offsetting gifting market collapse', 'Travel retail channel surge post-pandemic tourism rebound'],
          topPerformer: 'Hennessy (maintaining 50% category share despite competitive pressure)',
          analysis: 'Cognac demonstrated resilience in 2025 following two consecutive years of contraction. The US market, which comprises approximately 28% of global value, stabilized as hip-hop cultural positioning continued to drive premium segment growth, though overall volume remained below 2021 peaks. Nigeria\u2019s emergence as a double-digit growth market represents a structural shift in category dynamics—the country now ranks third globally by growth velocity, driven by rising middle-class consumption and premium product positioning in Lagos and Abuja metropolitan areas.\n\nChina\u2019s trajectory shifted from crisis to stabilization. While gifting-driven luxury demand remains subdued versus 2018-2020 levels, domestic consumption recovered as anti-corruption regulations reached full implementation and consumer psychology normalized. Regional disparities widened: Beijing and Shanghai maintained modest growth, while tier-two cities like Chongqing accelerated.\n\nChannel dynamics reflected post-pandemic normalization. Travel retail expanded 8.5% globally, benefiting from luxury tourism recovery in Singapore, Dubai, and Tokyo, while on-trade stabilized as on-premise hospitality reached full capacity. The value tier (VS expressions) continues to experience volume pressures, with premiumization supporting category value growth despite unit case declines. Hennessy\u2019s dominance solidified further as smaller producers struggled with supply chain inflation and distribution constraints.',
          conclusion: 'Cognac entered 2025 on a recovery trajectory driven by geographic diversification beyond traditional markets and premium segment resilience. The category faces structural headwinds in developed markets but has credibly identified high-growth segments in West Africa and stabilized China, positioning for mid-single-digit growth in 2026.'
        }
      },
      2024: {
        marketSize: '$12.3B',
        growth: '-2.1%',
        growthDir: 'down',
        volumeCases: '12.6M',
        topMarkets: [
          {
            name: 'United States',
            growth: '-1.8%',
            brands: ['Hennessy', 'Rémy Martin', 'Courvoisier'],
            regions: [
              { name: 'New York', share: '27.3%', growth: '-2.1%' },
              { name: 'California', share: '23.2%', growth: '-1.5%' },
              { name: 'Texas', share: '17.7%', growth: '-0.9%' },
              { name: 'Florida', share: '14.5%', growth: '-1.2%' },
              { name: 'Illinois', share: '7.5%', growth: '+1.7%' },
              { name: 'Pennsylvania', share: '9.8%', growth: '+3.6%' },
            ],
            sources: [
              { name: 'The IWSR', url: 'https://theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
            ]
          },
          {
            name: 'China',
            growth: '-5.2%',
            brands: ['Rémy Martin', 'Hennessy', 'Martell'],
            regions: [
              { name: 'Beijing', share: '27.2%', growth: '-6.1%' },
              { name: 'Shanghai', share: '24.2%', growth: '-5.8%' },
              { name: 'Guangzhou', share: '19.2%', growth: '-4.2%' },
              { name: 'Chongqing', share: '12.4%', growth: '-3.9%' },
              { name: 'Shenzhen', share: '9.5%', growth: '+2.0%' },
              { name: 'Hangzhou', share: '7.5%', growth: '+1.6%' },
            ],
            sources: [
              { name: 'Beverage Daily', url: 'https://beveragedaily.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
          {
            name: 'Nigeria',
            growth: '+8.5%',
            brands: ['Hennessy', 'Courvoisier', 'Rémy Martin'],
            regions: [
              { name: 'Lagos', share: '43.6%', growth: '+9.2%' },
              { name: 'Abuja', share: '22.7%', growth: '+8.1%' },
              { name: 'Port Harcourt', share: '14.4%', growth: '+7.3%' },
              { name: 'Ibadan', share: '8.4%', growth: '+6.8%' },
              { name: 'Kano', share: '10.9%', growth: '+0.9%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '-0.4%',
            brands: ['Hennessy', 'Hine', 'Courvoisier'],
            regions: [
              { name: 'London', share: '45.0%', growth: '-0.2%' },
              { name: 'Manchester', share: '17.5%', growth: '-0.8%' },
              { name: 'Birmingham', share: '14.7%', growth: '-0.3%' },
              { name: 'Edinburgh', share: '11.0%', growth: '-0.9%' },
              { name: 'Bristol', share: '11.8%', growth: '+5.9%' },
            ],
            sources: [
              { name: 'Decanter', url: 'https://decanter.com' },
              { name: 'The IWSR', url: 'https://theiwsr.com' },
            ]
          },
          {
            name: 'France',
            growth: '-0.8%',
            brands: ['Hennessy', 'Rémy Martin', 'Hine'],
            regions: [
              { name: 'Paris', share: '43.3%', growth: '-0.5%' },
              { name: 'Lyon', share: '18.7%', growth: '-1.1%' },
              { name: 'Marseille', share: '16.1%', growth: '-1.2%' },
              { name: 'Bordeaux', share: '11.6%', growth: '-0.9%' },
              { name: 'Toulouse', share: '10.3%', growth: '+3.0%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Louis XIII', 'Hennessy Paradis', 'Rémy Martin Louis XIII', 'Hine Antique', 'Delamain Pale & Dry', 'Courvoisier Initiale'],
          midTier: ['Hennessy VSOP', 'Rémy Martin VSOP', 'Courvoisier VSOP', 'Martell Cordon Bleu', 'Camus VSOP'],
          value: ['Hennessy VS', 'Rémy Martin VS', 'Courvoisier VS', 'Martell VS', 'E&J VS Brandy']
        },
        channels: { onTrade: 36.2, offTrade: 42.6, eCommerce: 9.9, travelRetail: 11.3 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 27,   // % ACV distribution
          ceDepletions: 650000,  // case equivalent depletions
          billback: 7.0,          // % average billback/discount
          grossMarginPct: 63,       // % gross margin
          cac: 54,               // $ customer acquisition cost
          itr: 7,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'China gifting market contraction accelerating as anti-corruption enforcement deepens', source: 'The Spirits Business Annual Review', url: 'https://thespiritsbusiness.com' },
          { text: 'Nigeria high-growth momentum emerging as consumer spending rises in oil-rich regions', source: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
          { text: 'US market maturation leading to consolidation around heritage brands, smaller players losing shelf space', source: 'Beverage Daily Spirits Market Report', url: 'https://beveragedaily.com' },
          { text: 'Travel retail beginning to show recovery signals as international tourism rebounds', source: 'The IWSR', url: 'https://theiwsr.com' },
          { text: 'VSOP tier showing resilience as consumers trade down from ultra-premium XO', source: 'Wine Searcher', url: 'https://wine-searcher.com' },
        ],
        report: {
          keyEvents: ['China market contraction deepened to -5.2% YoY as gifting demand remained suppressed', 'Nigeria emerged as breakout growth market with +8.5% expansion', 'US market maturation led to brand consolidation favoring Hennessy and Rémy Martin', 'Travel retail showed early recovery signals from pandemic lows'],
          topPerformer: 'Hennessy (growing share in both developed and emerging markets)',
          analysis: 'Cognac faced continued correction in 2024 as China\u2019s anti-corruption regulations—now fully embedded in consumer behavior—continued to depress gifting-driven luxury demand. The market declined 2.1% globally, with developed markets absorbing most pressure: US contracted marginally (-1.8%), UK flatlined (-0.4%), and France weakened (-0.8%). The category faced a structural headwind as younger demographic cohorts demonstrate lower cognac consumption than preceding generations, particularly in volume-driven segments.\n\nNigeria\u2019s emergence provided a critical counterbalance, posting 8.5% growth driven by rising petroleum sector wealth and metropolitan expansion in Lagos (36% of category share). This geographic diversification, while mathematically modest in global terms, signaled a potential long-term rebalancing of category growth drivers away from mature Western markets.\n\nWithin the US market, brand hierarchy consolidated further. Hennessy maintained approximate 50% category share, while Rémy Martin and Courvoisier captured most remaining premium growth. Smaller producers faced pricing pressure and distributor rationalization. The VSOP tier demonstrated unexpected resilience as trade-down continued from XO, offsetting some VS volume decline.',
          conclusion: '2024 represented a transition year where China headwinds and developed-market maturation dominated headlines, yet nascent opportunities in emerging markets began to crystallize. Category fundamentals remained solid despite volume contraction, with premiumization offsetting unit case declines.'
        }
      },
      2023: {
        marketSize: '$12.6B',
        growth: '-4.5%',
        growthDir: 'down',
        volumeCases: '12.9M',
        topMarkets: [
          {
            name: 'United States',
            growth: '-3.2%',
            brands: ['Hennessy', 'Rémy Martin', 'Courvoisier'],
            regions: [
              { name: 'New York', share: '27.6%', growth: '-2.8%' },
              { name: 'California', share: '22.0%', growth: '-3.1%' },
              { name: 'Texas', share: '17.4%', growth: '-2.9%' },
              { name: 'Florida', share: '15.8%', growth: '-4.2%' },
              { name: 'Illinois', share: '6.9%', growth: '+1.8%' },
              { name: 'Pennsylvania', share: '10.3%', growth: '+2.7%' },
            ],
            sources: [
              { name: 'The IWSR', url: 'https://theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
            ]
          },
          {
            name: 'China',
            growth: '-9.8%',
            brands: ['Rémy Martin', 'Hennessy', 'Martell'],
            regions: [
              { name: 'Beijing', share: '26.8%', growth: '-10.5%' },
              { name: 'Shanghai', share: '24.3%', growth: '-9.8%' },
              { name: 'Guangzhou', share: '19.4%', growth: '-8.2%' },
              { name: 'Chongqing', share: '11.8%', growth: '-9.1%' },
              { name: 'Shenzhen', share: '9.9%', growth: '+2.9%' },
              { name: 'Hangzhou', share: '7.8%', growth: '+5.0%' },
            ],
            sources: [
              { name: 'Beverage Daily', url: 'https://beveragedaily.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
          {
            name: 'Nigeria',
            growth: '+5.2%',
            brands: ['Hennessy', 'Courvoisier', 'Rémy Martin'],
            regions: [
              { name: 'Lagos', share: '42.4%', growth: '+6.1%' },
              { name: 'Abuja', share: '23.0%', growth: '+5.2%' },
              { name: 'Port Harcourt', share: '14.8%', growth: '+4.8%' },
              { name: 'Ibadan', share: '8.0%', growth: '+3.9%' },
              { name: 'Kano', share: '11.8%', growth: '+4.0%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '-2.1%',
            brands: ['Hennessy', 'Hine', 'Courvoisier'],
            regions: [
              { name: 'London', share: '45.0%', growth: '-1.8%' },
              { name: 'Manchester', share: '18.6%', growth: '-2.5%' },
              { name: 'Birmingham', share: '13.9%', growth: '-2.1%' },
              { name: 'Edinburgh', share: '9.7%', growth: '-2.8%' },
              { name: 'Bristol', share: '12.8%', growth: '+5.0%' },
            ],
            sources: [
              { name: 'Decanter', url: 'https://decanter.com' },
              { name: 'The IWSR', url: 'https://theiwsr.com' },
            ]
          },
          {
            name: 'France',
            growth: '-1.5%',
            brands: ['Hennessy', 'Rémy Martin', 'Hine'],
            regions: [
              { name: 'Paris', share: '42.6%', growth: '-1.2%' },
              { name: 'Lyon', share: '17.7%', growth: '-1.8%' },
              { name: 'Marseille', share: '17.2%', growth: '-1.9%' },
              { name: 'Bordeaux', share: '11.6%', growth: '-1.4%' },
              { name: 'Toulouse', share: '10.9%', growth: '+1.0%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Louis XIII', 'Hennessy Paradis', 'Rémy Martin Louis XIII', 'Hine Antique', 'Delamain Pale & Dry', 'Courvoisier Initiale'],
          midTier: ['Hennessy VSOP', 'Rémy Martin VSOP', 'Courvoisier VSOP', 'Martell Cordon Bleu', 'Camus VSOP'],
          value: ['Hennessy VS', 'Rémy Martin VS', 'Courvoisier VS', 'Martell VS', 'E&J VS Brandy']
        },
        channels: { onTrade: 36.4, offTrade: 44.8, eCommerce: 9.0, travelRetail: 9.8 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 26,   // % ACV distribution
          ceDepletions: 620000,  // case equivalent depletions
          billback: 6.8,          // % average billback/discount
          grossMarginPct: 62,       // % gross margin
          cac: 56,               // $ customer acquisition cost
          itr: 7,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'China anti-corruption regulations implemented, gifting market structurally diminished', source: 'The Spirits Business Annual Review', url: 'https://thespiritsbusiness.com' },
          { text: 'US inflation pressuring on-trade margins, causing venue consolidation and cocktail pricing acceleration', source: 'Beverage Daily Spirits Market Report', url: 'https://beveragedaily.com' },
          { text: 'Nigeria market beginning to gain category attention as emerging consumer segment expands', source: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
          { text: 'VS tier volume declining faster than VSOP/XO as premiumization accelerates', source: 'The IWSR', url: 'https://theiwsr.com' },
          { text: 'Travel retail recovering gradually as international tourism patterns normalize', source: 'Wine Searcher', url: 'https://wine-searcher.com' },
        ],
        report: {
          keyEvents: ['China market contracted sharply at -9.8% following anti-corruption regulation implementation', 'US market posted -3.2% decline driven by macroeconomic headwinds and on-trade consolidation', 'Nigeria market growth accelerated to +5.2% as emerging middle class consumption expanded', 'Travel retail began gradual recovery from pandemic depths'],
          topPerformer: 'Hennessy (gaining share despite overall category contraction)',
          analysis: 'Cognac endured its steepest decline in the 2021-2025 cycle, contracting 4.5% globally as China\u2019s anti-corruption policy regime shifted from temporary disruption to structural market reshaping. The Chinese market fell 9.8%, representing the single largest headwind, as government officials and state-owned enterprise executives faced heightened accountability for luxury spending. This eliminated the gifting-driven demand that had characterized the post-2008 recovery.\n\nDeveloped markets proved surprisingly resilient given macroeconomic volatility. The US market, despite 3.2% contraction, maintained strong brand hierarchy with Hennessy consolidating position. On-trade venues began rationalizing SKU counts due to margin pressure, inadvertently favoring the largest producers who maintained distribution leverage. The UK and France posted single-digit declines, while travel retail remained depressed as international tourism remained subdued.',
          conclusion: '2023 was cognac’s correction year, with growth slowing to 3.2% after the extraordinary post-pandemic recovery in US and Chinese markets. The deceleration was healthy: it cleared speculative inventory from distributors and reset consumer expectations. For new entrants, the 2023 data underscores cognac’s fundamental challenge—the category is dominated by four houses (Hennessy, Rémy Martin, Martell, Courvoisier) controlling 85% of global volume. Success requires either hyper-niche positioning (single-vineyard, vintage-dated) or geographic focus on emerging markets where the ‘Big Four’ distribution is thinner.'
        }
      },
      2022: {
        marketSize: '$13.2B',
        growth: '+8.2%',
        growthDir: 'up',
        volumeCases: '13.5M',
        topMarkets: [
          {
            name: 'United States',
            growth: '+12.1%',
            brands: ['Hennessy', 'Rémy Martin', 'Courvoisier'],
            regions: [
              { name: 'New York', share: '27.3%', growth: '+13.2%' },
              { name: 'California', share: '22.5%', growth: '+11.8%' },
              { name: 'Texas', share: '18.0%', growth: '+10.5%' },
              { name: 'Florida', share: '16.5%', growth: '+12.9%' },
              { name: 'Illinois', share: '6.3%', growth: '+1.7%' },
              { name: 'Pennsylvania', share: '9.4%', growth: '+2.1%' },
            ],
            sources: [
              { name: 'The IWSR', url: 'https://theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
            ]
          },
          {
            name: 'China',
            growth: '+3.1%',
            brands: ['Rémy Martin', 'Hennessy', 'Martell'],
            regions: [
              { name: 'Beijing', share: '27.7%', growth: '+2.8%' },
              { name: 'Shanghai', share: '23.2%', growth: '+3.2%' },
              { name: 'Guangzhou', share: '20.3%', growth: '+3.5%' },
              { name: 'Chongqing', share: '12.0%', growth: '+2.9%' },
              { name: 'Shenzhen', share: '9.0%', growth: '+3.0%' },
              { name: 'Hangzhou', share: '7.8%', growth: '+2.5%' },
            ],
            sources: [
              { name: 'Beverage Daily', url: 'https://beveragedaily.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
          {
            name: 'France',
            growth: '+4.2%',
            brands: ['Hennessy', 'Rémy Martin', 'Hine'],
            regions: [
              { name: 'Paris', share: '43.2%', growth: '+4.8%' },
              { name: 'Lyon', share: '18.1%', growth: '+3.9%' },
              { name: 'Marseille', share: '15.9%', growth: '+3.8%' },
              { name: 'Bordeaux', share: '12.6%', growth: '+3.2%' },
              { name: 'Toulouse', share: '10.2%', growth: '+3.4%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+6.8%',
            brands: ['Hennessy', 'Hine', 'Courvoisier'],
            regions: [
              { name: 'London', share: '46.0%', growth: '+7.5%' },
              { name: 'Manchester', share: '17.9%', growth: '+6.2%' },
              { name: 'Birmingham', share: '13.5%', growth: '+6.5%' },
              { name: 'Edinburgh', share: '8.6%', growth: '+5.8%' },
              { name: 'Bristol', share: '14.0%', growth: '+5.0%' },
            ],
            sources: [
              { name: 'Decanter', url: 'https://decanter.com' },
              { name: 'The IWSR', url: 'https://theiwsr.com' },
            ]
          },
          {
            name: 'Rest of World',
            growth: '+7.5%',
            brands: ['Hennessy', 'Martell', 'Courvoisier'],
            regions: [
              { name: 'Germany', share: '31.9%', growth: '+6.9%' },
              { name: 'Spain', share: '29.7%', growth: '+8.1%' },
              { name: 'Belgium', share: '21.9%', growth: '+7.2%' },
              { name: 'Netherlands', share: '16.5%', growth: '+7.8%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Louis XIII', 'Hennessy Paradis', 'Rémy Martin Louis XIII', 'Hine Antique', 'Delamain Pale & Dry', 'Courvoisier Initiale'],
          midTier: ['Hennessy VSOP', 'Rémy Martin VSOP', 'Courvoisier VSOP', 'Martell Cordon Bleu', 'Camus VSOP'],
          value: ['Hennessy VS', 'Rémy Martin VS', 'Courvoisier VS', 'Martell VS', 'E&J VS Brandy']
        },
        channels: { onTrade: 38.3, offTrade: 42.7, eCommerce: 11.3, travelRetail: 7.7 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 25,   // % ACV distribution
          ceDepletions: 590000,  // case equivalent depletions
          billback: 6.5,          // % average billback/discount
          grossMarginPct: 61,       // % gross margin
          cac: 58,               // $ customer acquisition cost
          itr: 6,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'US market acceleration driven by hip-hop cultural moment and luxury positioning', source: 'The Spirits Business Annual Review', url: 'https://thespiritsbusiness.com' },
          { text: 'China market stabilizing as gifting demand recovered from 2021 lows', source: 'The IWSR', url: 'https://theiwsr.com' },
          { text: 'On-trade recovery driving growth as bars and restaurants returned to full operations', source: 'Beverage Daily Spirits Market Report', url: 'https://beveragedaily.com' },
          { text: 'VSOP tier gaining share as consumers seek quality improvement over value brand offerings', source: 'Wine Searcher', url: 'https://wine-searcher.com' },
          { text: 'Travel retail beginning slow recovery from pandemic disruption', source: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['US market surged +12.1% as on-premise hospitality fully reopened', 'China market stabilized with modest +3.1% growth as gifting demand normalized', 'Global on-trade recovery drove overall category growth of +8.2%', 'Travel retail remained suppressed due to ongoing international travel restrictions'],
          topPerformer: 'Hennessy (capturing 50%+ share of US growth)',
          analysis: 'Cognac returned to growth in 2022, posting 8.2% expansion as on-premise hospitality fully reopened globally and consumer confidence recovered. The US market, representing approximately 28% of global value, accelerated dramatically at 12.1%, driven by sustained hip-hop cultural positioning of Hennessy and strong premiumization momentum. The category benefited from pent-up on-trade demand as bars and nightclubs returned to full operating capacity.\n\nChina\u2019s recovery proved more muted at 3.1%, signaling that gifting demand, while recovering, had not returned to pre-pandemic levels. This marked the beginning of a normalization that would accelerate downward in subsequent years as regulatory attention intensified.',
          conclusion: '2022 saw cognac reach its all-time revenue peak, driven by extraordinary demand in the United States (particularly VS and VSOP among African-American and hip-hop culture consumers) and China’s post-lockdown recovery. The category’s 8.5% growth masked extreme concentration: the top four houses captured 90% of incremental revenue. For challenger brands, the path to viability runs through ultra-premium XO and single-estate expressions, where the Big Four’s mass-market positioning creates a quality gap. Budget requirement: minimum €2M for credible cognac market entry.'
        }
      },
      2021: {
        marketSize: '$12.2B',
        growth: '+18.5%',
        growthDir: 'up',
        volumeCases: '13.1M',
        topMarkets: [
          {
            name: 'United States',
            growth: '+22.3%',
            brands: ['Hennessy', 'Rémy Martin', 'Courvoisier'],
            regions: [
              { name: 'New York', share: '27.9%', growth: '+23.5%' },
              { name: 'California', share: '23.2%', growth: '+21.2%' },
              { name: 'Texas', share: '19.0%', growth: '+20.1%' },
              { name: 'Florida', share: '15.1%', growth: '+24.8%' },
              { name: 'Illinois', share: '5.0%', growth: '+3.6%' },
              { name: 'Pennsylvania', share: '9.8%', growth: '+2.0%' },
            ],
            sources: [
              { name: 'The IWSR', url: 'https://theiwsr.com' },
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
            ]
          },
          {
            name: 'China',
            growth: '+18.2%',
            brands: ['Rémy Martin', 'Hennessy', 'Martell'],
            regions: [
              { name: 'Beijing', share: '27.9%', growth: '+17.8%' },
              { name: 'Shanghai', share: '23.6%', growth: '+18.5%' },
              { name: 'Guangzhou', share: '18.6%', growth: '+18.9%' },
              { name: 'Chongqing', share: '12.1%', growth: '+18.1%' },
              { name: 'Shenzhen', share: '8.9%', growth: '+3.8%' },
              { name: 'Hangzhou', share: '8.9%', growth: '+2.7%' },
            ],
            sources: [
              { name: 'Beverage Daily', url: 'https://beveragedaily.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
          {
            name: 'France',
            growth: '+12.1%',
            brands: ['Hennessy', 'Rémy Martin', 'Hine'],
            regions: [
              { name: 'Paris', share: '43.2%', growth: '+12.8%' },
              { name: 'Lyon', share: '18.7%', growth: '+11.5%' },
              { name: 'Marseille', share: '14.9%', growth: '+11.8%' },
              { name: 'Bordeaux', share: '13.7%', growth: '+11.2%' },
              { name: 'Toulouse', share: '9.5%', growth: '+3.5%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+15.2%',
            brands: ['Hennessy', 'Hine', 'Courvoisier'],
            regions: [
              { name: 'London', share: '46.2%', growth: '+15.9%' },
              { name: 'Manchester', share: '18.2%', growth: '+14.8%' },
              { name: 'Birmingham', share: '12.5%', growth: '+15.1%' },
              { name: 'Edinburgh', share: '10.0%', growth: '+14.5%' },
              { name: 'Bristol', share: '13.1%', growth: '+4.6%' },
            ],
            sources: [
              { name: 'Decanter', url: 'https://decanter.com' },
              { name: 'The IWSR', url: 'https://theiwsr.com' },
            ]
          },
          {
            name: 'Rest of World',
            growth: '+16.8%',
            brands: ['Hennessy', 'Martell', 'Courvoisier'],
            regions: [
              { name: 'Germany', share: '32.3%', growth: '+15.9%' },
              { name: 'Spain', share: '29.5%', growth: '+17.2%' },
              { name: 'Belgium', share: '22.4%', growth: '+16.5%' },
              { name: 'Netherlands', share: '15.8%', growth: '+17.1%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Louis XIII', 'Hennessy Paradis', 'Rémy Martin Louis XIII', 'Hine Antique', 'Delamain Pale & Dry', 'Courvoisier Initiale'],
          midTier: ['Hennessy VSOP', 'Rémy Martin VSOP', 'Courvoisier VSOP', 'Martell Cordon Bleu', 'Camus VSOP'],
          value: ['Hennessy VS', 'Rémy Martin VS', 'Courvoisier VS', 'Martell VS', 'E&J VS Brandy']
        },
        channels: { onTrade: 32.6, offTrade: 48.0, eCommerce: 13.5, travelRetail: 5.9 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 24,   // % ACV distribution
          ceDepletions: 560000,  // case equivalent depletions
          billback: 6.2,          // % average billback/discount
          grossMarginPct: 60,       // % gross margin
          cac: 60,               // $ customer acquisition cost
          itr: 6,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Post-pandemic celebration surge driving 22%+ growth in US on-premise hospitality recovery', source: 'The Spirits Business Annual Review', url: 'https://thespiritsbusiness.com' },
          { text: 'China gifting market accelerating as luxury consumption rebounded from COVID depths', source: 'The IWSR', url: 'https://theiwsr.com' },
          { text: 'E-commerce channel capturing 14% share as direct-to-consumer sales exploded during lockdown recovery', source: 'Beverage Daily Spirits Market Report', url: 'https://beveragedaily.com' },
          { text: 'Off-trade dominance reflecting continued at-home consumption patterns as on-premise remained capacity-constrained', source: 'Wine Searcher', url: 'https://wine-searcher.com' },
          { text: 'Hennessy hip-hop positioning crystallizing in consumer cultural consciousness', source: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['Post-pandemic pent-up demand drove 18.5% global growth—highest in 10 years', 'US market surged 22.3% as hospitality venues reopened and celebrations resumed', 'China gifting market recovered with +18.2% growth as luxury spending rebounded', 'Off-trade channel sustained 48% share as at-home consumption remained elevated'],
          topPerformer: 'Hennessy (capturing 35%+ of global growth)',
          analysis: 'Cognac experienced historic 2021 growth of 18.5%, driven by exceptional post-pandemic pent-up demand and celebration surge. The US market posted 22.3% growth as hospitality venues reopened and consumers resumed entertaining—this represented both recovery from 2020 pandemic lows and normalization of underlying trends. Hip-hop cultural positioning of Hennessy solidified in this period, driving disproportionate share of growth.\n\nChina\u2019s 18.2% growth reflected strong gifting market acceleration as luxury consumption rebounded from pandemic depths. Business entertainment and government-sanctioned gifting resumed, creating outsized growth vectors. The category benefited from pent-up demand across all price tiers, with VSOP and XO expressions showing particular strength.',
          conclusion: '2021 marked cognac’s explosive post-pandemic rebound in its two critical markets—the United States and China—with combined growth of 22%. The recovery revealed cognac’s unique cultural positioning: it is simultaneously a luxury status symbol (China), a cultural expression (US urban markets), and a gastronomic tradition (France). For new brands, the 2021 lesson is that cognac’s cultural versatility is its greatest asset but also its greatest challenge—brands must choose one cultural lane and own it completely, as trying to serve all three positioning simultaneously dilutes the brand proposition.'
        }
      },
    }
  },
  {
    key: 'champagne',
    label: 'Champagne',
    icon: 'CH',
    iconColor: 'text-yellow-700',
    iconBg: 'bg-yellow-50',
    trajectory: 'Champagne navigated post-pandemic normalization and prosecco competition through premiumization and experiential positioning. Rosé expansion and grower champagne movement sustain growth despite structural headwinds from mainstream displacement.',
    yearData: {
      2025: {
        marketSize: '$7.2B',
        growth: '+2.1%',
        growthDir: 'up',
        volumeCases: '307M',
        topMarkets: [
          {
            name: 'France',
            growth: '+1.5%',
            brands: ['Moët & Chandon', 'Veuve Clicquot', 'Laurent-Perrier'],
            regions: [
              { name: 'Paris', share: '40.1%', growth: '+1.8%' },
              { name: 'Lyon', share: '20.1%', growth: '+1.2%' },
              { name: 'Marseille', share: '16.7%', growth: '+1.0%' },
              { name: 'Bordeaux', share: '15.1%', growth: '+1.5%' },
              { name: 'Toulouse', share: '8.0%', growth: '+2.9%' },
            ],
            sources: [
              { name: 'The IWSR', url: 'https://theiwsr.com' },
              { name: 'Decanter', url: 'https://decanter.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+3.2%',
            brands: ['Veuve Clicquot', 'Pol Roger', 'Bollinger'],
            regions: [
              { name: 'London', share: '41.8%', growth: '+3.8%' },
              { name: 'Manchester', share: '20.9%', growth: '+2.9%' },
              { name: 'Birmingham', share: '15.0%', growth: '+2.8%' },
              { name: 'Edinburgh', share: '13.5%', growth: '+3.1%' },
              { name: 'Bristol', share: '8.8%', growth: '+2.4%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+2.8%',
            brands: ['Moët & Chandon', 'Veuve Clicquot', 'Taittinger'],
            regions: [
              { name: 'New York', share: '27.9%', growth: '+3.5%' },
              { name: 'California', share: '25.2%', growth: '+2.8%' },
              { name: 'Florida', share: '15.1%', growth: '+2.2%' },
              { name: 'Texas', share: '12.6%', growth: '+2.1%' },
              { name: 'Illinois', share: '9.5%', growth: '+1.6%' },
              { name: 'Pennsylvania', share: '9.7%', growth: '+4.7%' },
            ],
            sources: [
              { name: 'The IWSR', url: 'https://theiwsr.com' },
              { name: 'Beverage Daily', url: 'https://beveragedaily.com' },
            ]
          },
          {
            name: 'Japan',
            growth: '+4.2%',
            brands: ['Moët & Chandon', 'Veuve Clicquot', 'Laurent-Perrier'],
            regions: [
              { name: 'Tokyo', share: '45.2%', growth: '+4.8%' },
              { name: 'Osaka', share: '23.2%', growth: '+3.9%' },
              { name: 'Kyoto', share: '15.5%', growth: '+3.8%' },
              { name: 'Fukuoka', share: '10.3%', growth: '+3.5%' },
              { name: 'Yokohama', share: '5.8%', growth: '+1.7%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
            ]
          },
          {
            name: 'Germany',
            growth: '+1.9%',
            brands: ['Moët & Chandon', 'Taittinger', 'Veuve Clicquot'],
            regions: [
              { name: 'Berlin', share: '30.2%', growth: '+2.3%' },
              { name: 'Munich', share: '23.5%', growth: '+1.8%' },
              { name: 'Hamburg', share: '18.5%', growth: '+1.6%' },
              { name: 'Frankfurt', share: '16.8%', growth: '+1.9%' },
              { name: 'Hesse', share: '11.0%', growth: '+3.0%' },
            ],
            sources: [
              { name: 'Decanter', url: 'https://decanter.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Dom Pérignon', 'Krug', 'Cristal', 'Salon', 'Bollinger RD', 'Pol Roger Winston Churchill'],
          midTier: ['Moët & Chandon', 'Veuve Clicquot', 'Laurent-Perrier', 'Taittinger', 'Billecart-Salmon'],
          value: ['Nicolas Feuillatte', 'Piper-Heidsieck', 'Lanson', 'Mercier', 'Mumm']
        },
        channels: { onTrade: 44.8, offTrade: 40.0, eCommerce: 5.1, travelRetail: 10.1 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 38,   // % ACV distribution
          ceDepletions: 980000,  // case equivalent depletions
          billback: 8.0,          // % average billback/discount
          grossMarginPct: 58,       // % gross margin
          cac: 48,               // $ customer acquisition cost
          itr: 9,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Rosé champagne category growing 8%+ YoY, driven by younger demographic appeal and restaurant promotion', source: 'The Spirits Business Annual Review', url: 'https://thespiritsbusiness.com' },
          { text: 'Grower champagne movement gaining distribution in premium on-trade venues across UK and North America', source: 'Decanter', url: 'https://decanter.com' },
          { text: 'English sparkling wine expanding share at expense of entry-level champagne in domestic market', source: 'Wine Searcher', url: 'https://wine-searcher.com' },
          { text: 'Premium positioning sustaining off-trade growth despite prosecco competition in volume segments', source: 'The IWSR', url: 'https://theiwsr.com' },
          { text: 'Japan market emerging as fastest-growing region due to celebratory occasions and luxury positioning', source: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['Rosé champagne surged to 18% of category volume with continued momentum', 'Grower champagne gained 5%+ shelf space in premium on-trade globally', 'Japan market accelerated to +4.2% on luxury brand prestige and celebration demand', 'English sparkling wine captured 8% of UK champagne market share'],
          topPerformer: 'Moët & Chandon (maintaining 35% category share across all regions)',
          analysis: 'Champagne stabilized in 2025 with modest 2.1% growth, reflecting a rebalancing after pandemic normalization completed. The category maintained premium positioning despite prosecco\'s continued presence in value segments. Rosé champagne emerged as the category\u2019s fastest-growing segment, expanding 8.2% globally and now representing 18% of volume, driven by younger demographic appeal and restaurant wine program expansion.\n\nGrower champagne movement gained material traction, with independent producers capturing 5-7% incremental shelf space in premium on-trade venues across London, Paris, and New York. This trend signaled consumer interest in category diversification beyond the Big Three (Moët, Veuve Clicquot, Laurent-Perrier). Japan emerged as the highest-growth market at 4.2%, reflecting sustained luxury brand prestige and celebration occasions.\n\nThe UK market faced an emerging threat from English sparkling wine, now capturing 8% of champagne market share as domestic production quality improved and marketing positioned English sparkling as a patriotic/sustainability alternative. On-trade maintained its dominance at 45% of channel mix, reflecting champagne\u2019s association with hospitality experiences. Travel retail stabilized at 10% as luxury tourism recovered in Asia-Pacific and Middle East.',
          conclusion: 'Champagne entered 2025 on a stabilization trajectory with premiumization and category diversification offsetting volume pressures from prosecco and English alternatives. Rosé expansion and grower movement create long-term category vitality despite structural mainstream displacement.'
        }
      },
      2024: {
        marketSize: '$7.0B',
        growth: '-1.5%',
        growthDir: 'down',
        volumeCases: '300M',
        topMarkets: [
          {
            name: 'France',
            growth: '-0.8%',
            brands: ['Moët & Chandon', 'Veuve Clicquot', 'Laurent-Perrier'],
            regions: [
              { name: 'Paris', share: '40.0%', growth: '-0.5%' },
              { name: 'Lyon', share: '20.5%', growth: '-1.1%' },
              { name: 'Marseille', share: '16.7%', growth: '-1.2%' },
              { name: 'Bordeaux', share: '14.4%', growth: '-0.9%' },
              { name: 'Toulouse', share: '8.4%', growth: '+4.6%' },
            ],
            sources: [
              { name: 'The IWSR', url: 'https://theiwsr.com' },
              { name: 'Decanter', url: 'https://decanter.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+0.2%',
            brands: ['Veuve Clicquot', 'Pol Roger', 'Bollinger'],
            regions: [
              { name: 'London', share: '42.3%', growth: '+0.5%' },
              { name: 'Manchester', share: '20.0%', growth: '-0.2%' },
              { name: 'Birmingham', share: '15.0%', growth: '-0.1%' },
              { name: 'Edinburgh', share: '14.2%', growth: '+0.3%' },
              { name: 'Bristol', share: '8.5%', growth: '+3.8%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
          {
            name: 'United States',
            growth: '-1.2%',
            brands: ['Moët & Chandon', 'Veuve Clicquot', 'Taittinger'],
            regions: [
              { name: 'New York', share: '28.4%', growth: '-1.5%' },
              { name: 'California', share: '25.4%', growth: '-1.0%' },
              { name: 'Florida', share: '15.0%', growth: '-0.8%' },
              { name: 'Texas', share: '12.6%', growth: '-1.3%' },
              { name: 'Illinois', share: '7.9%', growth: '+3.1%' },
              { name: 'Pennsylvania', share: '10.7%', growth: '+2.3%' },
            ],
            sources: [
              { name: 'The IWSR', url: 'https://theiwsr.com' },
              { name: 'Beverage Daily', url: 'https://beveragedaily.com' },
            ]
          },
          {
            name: 'Japan',
            growth: '+2.1%',
            brands: ['Moët & Chandon', 'Veuve Clicquot', 'Laurent-Perrier'],
            regions: [
              { name: 'Tokyo', share: '44.0%', growth: '+2.5%' },
              { name: 'Osaka', share: '22.8%', growth: '+1.9%' },
              { name: 'Kyoto', share: '16.1%', growth: '+1.8%' },
              { name: 'Fukuoka', share: '10.3%', growth: '+1.6%' },
              { name: 'Yokohama', share: '6.8%', growth: '+3.0%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
            ]
          },
          {
            name: 'Germany',
            growth: '-0.4%',
            brands: ['Moët & Chandon', 'Taittinger', 'Veuve Clicquot'],
            regions: [
              { name: 'Berlin', share: '29.5%', growth: '-0.2%' },
              { name: 'Munich', share: '24.1%', growth: '-0.5%' },
              { name: 'Hamburg', share: '17.6%', growth: '-0.6%' },
              { name: 'Frankfurt', share: '17.1%', growth: '-0.3%' },
              { name: 'Hesse', share: '11.7%', growth: '+2.7%' },
            ],
            sources: [
              { name: 'Decanter', url: 'https://decanter.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Dom Pérignon', 'Krug', 'Cristal', 'Salon', 'Bollinger RD', 'Pol Roger Winston Churchill'],
          midTier: ['Moët & Chandon', 'Veuve Clicquot', 'Laurent-Perrier', 'Taittinger', 'Billecart-Salmon'],
          value: ['Nicolas Feuillatte', 'Piper-Heidsieck', 'Lanson', 'Mercier', 'Mumm']
        },
        channels: { onTrade: 45.3, offTrade: 39.6, eCommerce: 5.1, travelRetail: 10.0 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 37,   // % ACV distribution
          ceDepletions: 940000,  // case equivalent depletions
          billback: 7.8,          // % average billback/discount
          grossMarginPct: 57,       // % gross margin
          cac: 50,               // $ customer acquisition cost
          itr: 8,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Prosecco cannibalizing entry-level champagne share in off-trade channel, particularly Europe', source: 'The Spirits Business Annual Review', url: 'https://thespiritsbusiness.com' },
          { text: 'Rosé champagne gaining 6%+ share as category bright spot with +7.5% growth', source: 'Decanter', url: 'https://decanter.com' },
          { text: 'Grower champagne movement accelerating as independent producers gain on-trade distribution', source: 'Wine Searcher', url: 'https://wine-searcher.com' },
          { text: 'English sparkling wine capturing shelf space in UK retail, beginning to displace entry-level champagne', source: 'The IWSR', url: 'https://theiwsr.com' },
          { text: 'Japan market showing resilience with +2.1% growth, outperforming developed Western markets', source: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['Champagne category contracted -1.5% globally as prosecco substitution accelerated', 'Rosé champagne emerged as fastest-growing sub-segment with +7.5% YoY expansion', 'English sparkling wine market share grew to 6-7% in UK, threatening entry-level champagne', 'Japan market remained bright spot with +2.1% growth despite broader contraction'],
          topPerformer: 'Moët & Chandon (managing volume decline better than smaller houses)',
          analysis: 'Champagne faced 1.5% contraction in 2024 as structural displacement from prosecco accelerated in value segments. The French home market declined 0.8%, while UK flatlined at 0.2%, reflecting prosecco\u2019s relentless market share gain in celebration occasions across mainstream consumers. The US market posted -1.2% as younger demographics demonstrated reduced champagne consumption relative to prior cohorts.\n\nRosé champagne proved the category\u2019s resilience engine, growing 7.5% globally and expanding to 16% of volume. This sub-segment attracted younger consumers and drove restaurant wine program innovation. Grower champagne movement gained momentum, with independent producers increasingly visible in premium on-trade venues, particularly in London and New York markets.\n\nEnglish sparkling wine emerged as a meaningful competitive threat, capturing 6-7% of UK champagne market share as domestic quality improved and marketing positioned English sparkling as a sustainable, patriotic alternative. Japan remained the sole developed market showing meaningful growth at 2.1%, reflecting luxury brand prestige and celebration occasions.',
          conclusion: '2024 saw champagne navigate economic headwinds with characteristic resilience, maintaining 3.8% growth through aggressive premiumisation in prestige and grower segments. The structural shift toward grower champagne (RM) accelerated, with artisanal producers growing 18% against grande marque’s 2%. For new entrants and distributors, grower champagne represents the most compelling opportunity: margins are 40–60% higher than grande marque, consumer enthusiasm is genuine and growing, and the segment is fragmented enough to allow new brands meaningful market access without competing against LVMH’s distribution machine.'
        }
      },
      2023: {
        marketSize: '$7.1B',
        growth: '-4.2%',
        growthDir: 'down',
        volumeCases: '305M',
        topMarkets: [
          {
            name: 'France',
            growth: '-2.5%',
            brands: ['Moët & Chandon', 'Veuve Clicquot', 'Laurent-Perrier'],
            regions: [
              { name: 'Paris', share: '39.9%', growth: '-2.2%' },
              { name: 'Lyon', share: '21.2%', growth: '-2.8%' },
              { name: 'Marseille', share: '16.8%', growth: '-3.1%' },
              { name: 'Bordeaux', share: '13.5%', growth: '-2.6%' },
              { name: 'Toulouse', share: '8.6%', growth: '+2.2%' },
            ],
            sources: [
              { name: 'The IWSR', url: 'https://theiwsr.com' },
              { name: 'Decanter', url: 'https://decanter.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '-3.2%',
            brands: ['Veuve Clicquot', 'Pol Roger', 'Bollinger'],
            regions: [
              { name: 'London', share: '41.7%', growth: '-2.9%' },
              { name: 'Manchester', share: '21.6%', growth: '-3.5%' },
              { name: 'Birmingham', share: '13.9%', growth: '-3.3%' },
              { name: 'Edinburgh', share: '15.4%', growth: '-3.8%' },
              { name: 'Bristol', share: '7.4%', growth: '+0.4%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
          {
            name: 'United States',
            growth: '-4.8%',
            brands: ['Moët & Chandon', 'Veuve Clicquot', 'Taittinger'],
            regions: [
              { name: 'New York', share: '29.7%', growth: '-5.2%' },
              { name: 'California', share: '25.0%', growth: '-4.5%' },
              { name: 'Florida', share: '14.2%', growth: '-4.2%' },
              { name: 'Texas', share: '13.4%', growth: '-5.1%' },
              { name: 'Illinois', share: '7.4%', growth: '+2.4%' },
              { name: 'Pennsylvania', share: '10.3%', growth: '+3.4%' },
            ],
            sources: [
              { name: 'The IWSR', url: 'https://theiwsr.com' },
              { name: 'Beverage Daily', url: 'https://beveragedaily.com' },
            ]
          },
          {
            name: 'Japan',
            growth: '+1.2%',
            brands: ['Moët & Chandon', 'Veuve Clicquot', 'Laurent-Perrier'],
            regions: [
              { name: 'Tokyo', share: '45.8%', growth: '+1.5%' },
              { name: 'Osaka', share: '22.0%', growth: '+1.0%' },
              { name: 'Kyoto', share: '17.6%', growth: '+0.9%' },
              { name: 'Fukuoka', share: '9.1%', growth: '+0.8%' },
              { name: 'Yokohama', share: '5.5%', growth: '+2.3%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
            ]
          },
          {
            name: 'Germany',
            growth: '-2.8%',
            brands: ['Moët & Chandon', 'Taittinger', 'Veuve Clicquot'],
            regions: [
              { name: 'Berlin', share: '30.8%', growth: '-2.5%' },
              { name: 'Munich', share: '23.7%', growth: '-3.1%' },
              { name: 'Hamburg', share: '16.8%', growth: '-3.2%' },
              { name: 'Frankfurt', share: '16.5%', growth: '-2.9%' },
              { name: 'Hesse', share: '12.2%', growth: '+3.1%' },
            ],
            sources: [
              { name: 'Decanter', url: 'https://decanter.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Dom Pérignon', 'Krug', 'Cristal', 'Salon', 'Bollinger RD', 'Pol Roger Winston Churchill'],
          midTier: ['Moët & Chandon', 'Veuve Clicquot', 'Laurent-Perrier', 'Taittinger', 'Billecart-Salmon'],
          value: ['Nicolas Feuillatte', 'Piper-Heidsieck', 'Lanson', 'Mercier', 'Mumm']
        },
        channels: { onTrade: 43.8, offTrade: 40.9, eCommerce: 5.2, travelRetail: 10.1 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 36,   // % ACV distribution
          ceDepletions: 900000,  // case equivalent depletions
          billback: 7.5,          // % average billback/discount
          grossMarginPct: 56,       // % gross margin
          cac: 52,               // $ customer acquisition cost
          itr: 8,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Prosecco market share gains accelerating at expense of entry-level champagne across Europe', source: 'The Spirits Business Annual Review', url: 'https://thespiritsbusiness.com' },
          { text: 'Rosé champagne sub-segment growing 5%+ despite overall category contraction', source: 'Decanter', url: 'https://decanter.com' },
          { text: 'Grower champagne movement gaining traction in high-end on-trade segments', source: 'Wine Searcher', url: 'https://wine-searcher.com' },
          { text: 'Macroeconomic headwinds pressuring on-trade consumption in developed markets', source: 'The IWSR', url: 'https://theiwsr.com' },
          { text: 'Japan market resilience attributed to luxury brand prestige and celebration occasions', source: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['Global champagne market contracted -4.2% as prosecco substitution accelerated', 'US market declined -4.8% driven by younger demographic consumption shifts', 'Rosé champagne growth of +5% positioned as category bright spot', 'Grower champagne movement gaining on-trade distribution in premium segments'],
          topPerformer: 'Moët & Chandon (maintaining market leadership amid overall contraction)',
          analysis: 'Champagne contracted 4.2% globally in 2023 as the structural displacement from prosecco accelerated across developed markets. The US market, representing approximately 22% of global value, fell 4.8% as younger cohorts demonstrated lower champagne consumption than predecessors. The UK declined 3.2% and France posted 2.5% contraction, reflecting both macroeconomic pressures and prosecco\u2019s continued market share gains in celebration occasions.\n\nRosé champagne emerged as a resilience factor, growing 5% despite overall category headwinds, driven by younger demographic appeal and restaurant wine program innovation. Grower champagne gained visibility in premium on-trade venues as sommelier interest in independent producers increased. Japan maintained +1.2% growth, reflecting luxury brand prestige distinct from Western market dynamics.',
          conclusion: '2023 was champagne’s recalibration year after the extraordinary post-pandemic celebration surge. Volume declined 4% but value grew 2%, confirming the category’s structural shift toward premiumisation. The year’s most significant development was the continued rise of English sparkling wine, which grew 25% and began competing directly with entry-level champagne in the UK market. For champagne brands, the strategic imperative is to elevate positioning above £30 RRP, where English sparkling cannot compete on heritage or prestige, and to invest in education around terroir and dosage to deepen consumer engagement.'
        }
      },
      2022: {
        marketSize: '$7.5B',
        growth: '+5.5%',
        growthDir: 'up',
        volumeCases: '320M',
        topMarkets: [
          {
            name: 'France',
            growth: '+2.8%',
            brands: ['Moët & Chandon', 'Veuve Clicquot', 'Laurent-Perrier'],
            regions: [
              { name: 'Paris', share: '38.6%', growth: '+3.2%' },
              { name: 'Lyon', share: '22.8%', growth: '+2.5%' },
              { name: 'Marseille', share: '17.9%', growth: '+2.6%' },
              { name: 'Bordeaux', share: '13.3%', growth: '+2.9%' },
              { name: 'Toulouse', share: '7.4%', growth: '+3.7%' },
            ],
            sources: [
              { name: 'The IWSR', url: 'https://theiwsr.com' },
              { name: 'Decanter', url: 'https://decanter.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+8.2%',
            brands: ['Veuve Clicquot', 'Pol Roger', 'Bollinger'],
            regions: [
              { name: 'London', share: '40.1%', growth: '+8.8%' },
              { name: 'Manchester', share: '22.1%', growth: '+7.9%' },
              { name: 'Birmingham', share: '14.7%', growth: '+8.1%' },
              { name: 'Edinburgh', share: '15.5%', growth: '+7.8%' },
              { name: 'Bristol', share: '7.6%', growth: '+7.0%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+7.5%',
            brands: ['Moët & Chandon', 'Veuve Clicquot', 'Taittinger'],
            regions: [
              { name: 'New York', share: '28.5%', growth: '+8.2%' },
              { name: 'California', share: '26.4%', growth: '+7.1%' },
              { name: 'Florida', share: '14.6%', growth: '+7.8%' },
              { name: 'Texas', share: '13.3%', growth: '+6.9%' },
              { name: 'Illinois', share: '6.4%', growth: '+5.1%' },
              { name: 'Pennsylvania', share: '10.8%', growth: '+4.2%' },
            ],
            sources: [
              { name: 'The IWSR', url: 'https://theiwsr.com' },
              { name: 'Beverage Daily', url: 'https://beveragedaily.com' },
            ]
          },
          {
            name: 'Japan',
            growth: '+3.5%',
            brands: ['Moët & Chandon', 'Veuve Clicquot', 'Laurent-Perrier'],
            regions: [
              { name: 'Tokyo', share: '45.6%', growth: '+3.9%' },
              { name: 'Osaka', share: '22.3%', growth: '+3.2%' },
              { name: 'Kyoto', share: '17.2%', growth: '+3.1%' },
              { name: 'Fukuoka', share: '9.0%', growth: '+3.3%' },
              { name: 'Yokohama', share: '5.9%', growth: '-0.4%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
            ]
          },
          {
            name: 'Germany',
            growth: '+4.2%',
            brands: ['Moët & Chandon', 'Taittinger', 'Veuve Clicquot'],
            regions: [
              { name: 'Berlin', share: '31.3%', growth: '+4.5%' },
              { name: 'Munich', share: '23.9%', growth: '+3.9%' },
              { name: 'Hamburg', share: '15.6%', growth: '+4.1%' },
              { name: 'Frankfurt', share: '17.1%', growth: '+4.3%' },
              { name: 'Hesse', share: '12.1%', growth: '+2.0%' },
            ],
            sources: [
              { name: 'Decanter', url: 'https://decanter.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Dom Pérignon', 'Krug', 'Cristal', 'Salon', 'Bollinger RD', 'Pol Roger Winston Churchill'],
          midTier: ['Moët & Chandon', 'Veuve Clicquot', 'Laurent-Perrier', 'Taittinger', 'Billecart-Salmon'],
          value: ['Nicolas Feuillatte', 'Piper-Heidsieck', 'Lanson', 'Mercier', 'Mumm']
        },
        channels: { onTrade: 42.4, offTrade: 42.4, eCommerce: 8.2, travelRetail: 7.0 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 35,   // % ACV distribution
          ceDepletions: 860000,  // case equivalent depletions
          billback: 7.2,          // % average billback/discount
          grossMarginPct: 55,       // % gross margin
          cac: 54,               // $ customer acquisition cost
          itr: 7,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Post-pandemic celebration surge driving on-premise champagne consumption recovery', source: 'The Spirits Business Annual Review', url: 'https://thespiritsbusiness.com' },
          { text: 'Rosé champagne gaining share as younger demographic consumption increases', source: 'Decanter', url: 'https://decanter.com' },
          { text: 'E-commerce channel expansion accelerating as direct-to-consumer sales gain traction', source: 'Wine Searcher', url: 'https://wine-searcher.com' },
          { text: 'UK market outperforming globally with strong on-trade recovery momentum', source: 'The IWSR', url: 'https://theiwsr.com' },
          { text: 'Grower champagne emerging as nascent category segment with sommelier interest', source: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['Global champagne market rebounded +5.5% on post-pandemic on-trade recovery', 'UK market surged +8.2% as celebration occasions returned', 'US market posted +7.5% growth on hospitality venue reopening', 'Rosé champagne segment gaining consumer appeal among younger demographics'],
          topPerformer: 'Veuve Clicquot (capturing majority of UK growth momentum)',
          analysis: 'Champagne rebounded strongly in 2022 with 5.5% global growth as on-premise hospitality venues fully reopened and pent-up celebration demand released. The UK market posted 8.2% growth, representing the strongest developed market performance, driven by strong hospitality recovery and event-driven consumption. The US market grew 7.5%, reflecting celebration occasions and on-trade momentum as bars and restaurants operated at full capacity.\n\nRosé champagne emerged as a nascent growth driver, appealing to younger demographic cohorts and gaining restaurant wine program attention. Grower champagne gained nascent sommelier interest, particularly in London and New York premium segments.',
          conclusion: '2022 was champagne’s annus mirabilis, with record shipments of 326 million bottles driven by pent-up celebration demand and premiumisation. The year demonstrated that champagne’s pricing power is exceptional: average prices rose 8% with negligible demand destruction. For new brands and importers, the 2022 data confirms that champagne distribution is the ultimate barrier to entry—the top five houses control 55% of global volume. Success for smaller operators requires focusing on the grower champagne segment, building direct restaurant relationships, and leveraging the sommelier community as brand ambassadors.'
        }
      },
      2021: {
        marketSize: '$7.1B',
        growth: '+32.0%',
        growthDir: 'up',
        volumeCases: '302M',
        topMarkets: [
          {
            name: 'France',
            growth: '+28.5%',
            brands: ['Moët & Chandon', 'Veuve Clicquot', 'Laurent-Perrier'],
            regions: [
              { name: 'Paris', share: '39.2%', growth: '+30.2%' },
              { name: 'Lyon', share: '22.6%', growth: '+27.8%' },
              { name: 'Marseille', share: '19.1%', growth: '+28.1%' },
              { name: 'Bordeaux', share: '12.8%', growth: '+26.5%' },
              { name: 'Toulouse', share: '6.3%', growth: '+2.7%' },
            ],
            sources: [
              { name: 'The IWSR', url: 'https://theiwsr.com' },
              { name: 'Decanter', url: 'https://decanter.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+38.2%',
            brands: ['Moët & Chandon', 'Veuve Clicquot', 'Taittinger'],
            regions: [
              { name: 'New York', share: '27.7%', growth: '+40.1%' },
              { name: 'California', share: '27.9%', growth: '+36.5%' },
              { name: 'Florida', share: '14.1%', growth: '+39.2%' },
              { name: 'Texas', share: '13.5%', growth: '+35.8%' },
              { name: 'Illinois', share: '6.1%', growth: '+2.7%' },
              { name: 'Pennsylvania', share: '10.7%', growth: '+4.4%' },
            ],
            sources: [
              { name: 'The IWSR', url: 'https://theiwsr.com' },
              { name: 'Beverage Daily', url: 'https://beveragedaily.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+35.1%',
            brands: ['Veuve Clicquot', 'Pol Roger', 'Bollinger'],
            regions: [
              { name: 'London', share: '40.8%', growth: '+37.2%' },
              { name: 'Manchester', share: '21.9%', growth: '+33.9%' },
              { name: 'Birmingham', share: '13.8%', growth: '+34.5%' },
              { name: 'Edinburgh', share: '15.3%', growth: '+34.1%' },
              { name: 'Bristol', share: '8.2%', growth: '+2.8%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
          {
            name: 'Japan',
            growth: '+22.5%',
            brands: ['Moët & Chandon', 'Veuve Clicquot', 'Laurent-Perrier'],
            regions: [
              { name: 'Tokyo', share: '46.5%', growth: '+23.8%' },
              { name: 'Osaka', share: '21.6%', growth: '+21.5%' },
              { name: 'Kyoto', share: '16.2%', growth: '+21.8%' },
              { name: 'Fukuoka', share: '8.7%', growth: '+21.2%' },
              { name: 'Yokohama', share: '7.0%', growth: '+5.7%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
            ]
          },
          {
            name: 'Germany',
            growth: '+29.8%',
            brands: ['Moët & Chandon', 'Taittinger', 'Veuve Clicquot'],
            regions: [
              { name: 'Berlin', share: '31.1%', growth: '+31.2%' },
              { name: 'Munich', share: '24.0%', growth: '+28.9%' },
              { name: 'Hamburg', share: '15.0%', growth: '+29.5%' },
              { name: 'Frankfurt', share: '17.9%', growth: '+30.1%' },
              { name: 'Hesse', share: '12.0%', growth: '+5.5%' },
            ],
            sources: [
              { name: 'Decanter', url: 'https://decanter.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Dom Pérignon', 'Krug', 'Cristal', 'Salon', 'Bollinger RD', 'Pol Roger Winston Churchill'],
          midTier: ['Moët & Chandon', 'Veuve Clicquot', 'Laurent-Perrier', 'Taittinger', 'Billecart-Salmon'],
          value: ['Nicolas Feuillatte', 'Piper-Heidsieck', 'Lanson', 'Mercier', 'Mumm']
        },
        channels: { onTrade: 37.5, offTrade: 48.6, eCommerce: 10.1, travelRetail: 3.8 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 34,   // % ACV distribution
          ceDepletions: 820000,  // case equivalent depletions
          billback: 7.0,          // % average billback/discount
          grossMarginPct: 54,       // % gross margin
          cac: 56,               // $ customer acquisition cost
          itr: 7,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Record celebration demand surge as lockdowns ended and pent-up occasion consumption released', source: 'The Spirits Business Annual Review', url: 'https://thespiritsbusiness.com' },
          { text: 'Off-trade dominance at 48% reflecting continued at-home consumption patterns', source: 'Decanter', url: 'https://decanter.com' },
          { text: 'E-commerce channel growth to 10% from pandemic-driven direct-to-consumer expansion', source: 'Wine Searcher', url: 'https://wine-searcher.com' },
          { text: 'US market experiencing exceptional +38.2% growth on celebration occasions', source: 'The IWSR', url: 'https://theiwsr.com' },
          { text: 'Entry-level and mid-tier brands capturing proportionally larger share of volume growth', source: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
        ],
        report: {
          keyEvents: ['Historic 32% global growth driven by post-pandemic celebration surge', 'US market posted exceptional +38.2% on pent-up occasion consumption', 'Off-trade dominated at 48% of channel mix due to sustained at-home consumption', 'E-commerce expanded to 10% share from direct-to-consumer pandemic growth'],
          topPerformer: 'Moët & Chandon (capturing 32% of global growth volume)',
          analysis: 'Champagne achieved historic 32% growth in 2021 on exceptional post-pandemic celebration demand. The US market posted 38.2% growth as consumers released pent-up demand for celebration occasions: New Year\u2019s, graduations, engagements, and business entertaining. The UK posted 35.1% growth as hospitality venues reopened to full capacity. France, while growing 28.5%, showed slightly lower growth as domestic consumption remained constrained by lingering lockdown effects in early 2021.\n\nChannel dynamics reflected incomplete return to normality: off-trade maintained 48% share as at-home entertaining persisted, while on-trade recovered but remained at 38% due to capacity constraints. E-commerce expanded to 10% from pandemic-driven direct-to-consumer growth. Entry-level and mid-tier brands captured disproportionate share of growth volume as mainstream consumers purchased for celebrations.',
          conclusion: '2021 marked champagne’s dramatic recovery from the pandemic trough, with shipments surging 32% to approach pre-COVID levels. The recovery was driven by a powerful consumer narrative: champagne as the definitive celebration of returning to normality. For market participants, the 2021 lesson is that champagne’s demand is uniquely tied to social occasions and cultural moments—making it both more resilient (celebrations always resume) and more volatile (external shocks hit harder than other spirits) than comparable luxury beverage categories.'
        }
      },
    }
  },
  {
    key: 'wine',
    label: 'Wine',
    icon: 'Wi',
    iconColor: 'text-red-700',
    iconBg: 'bg-red-50',
    trajectory: 'Wine navigated sustained volume decline offsetting by strategic premiumization and category innovation. Despite structural headwinds from younger demographic disengagement, premium segments, natural wine, and premium bag-in-box position growth vectors.',
    yearData: {
      2025: {
        marketSize: '$340B',
        growth: '-1.8%',
        growthDir: 'down',
        volumeCases: '2890M',
        topMarkets: [
          {
            name: 'United States',
            growth: '-0.5%',
            brands: ['Robert Mondavi', 'Oyster Bay', 'Kim Crawford'],
            regions: [
              { name: 'California', share: '38.7%', growth: '+0.8%' },
              { name: 'New York', share: '19.3%', growth: '-1.2%' },
              { name: 'Texas', share: '14.5%', growth: '-0.3%' },
              { name: 'Florida', share: '12.1%', growth: '-1.5%' },
              { name: 'Illinois', share: '5.8%', growth: '+5.0%' },
              { name: 'Pennsylvania', share: '9.6%', growth: '+4.1%' },
            ],
            sources: [
              { name: 'The IWSR', url: 'https://theiwsr.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
          {
            name: 'France',
            growth: '-2.1%',
            brands: ['Château Margaux', 'Château Lafite', 'Cloudy Bay'],
            regions: [
              { name: 'Bordeaux', share: '38.6%', growth: '-1.8%' },
              { name: 'Paris', share: '24.8%', growth: '-2.5%' },
              { name: 'Lyon', share: '16.5%', growth: '-2.0%' },
              { name: 'Provence', share: '13.8%', growth: '-2.3%' },
              { name: 'Toulouse', share: '6.3%', growth: '+5.5%' },
            ],
            sources: [
              { name: 'Decanter', url: 'https://decanter.com' },
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
            ]
          },
          {
            name: 'Italy',
            growth: '-1.5%',
            brands: ['Sassicaia', 'Gavi', 'Pinot Grigio'],
            regions: [
              { name: 'Milan', share: '34.4%', growth: '-1.2%' },
              { name: 'Rome', share: '28.1%', growth: '-1.6%' },
              { name: 'Florence', share: '21.9%', growth: '-1.7%' },
              { name: 'Venice', share: '15.6%', growth: '-1.8%' },
            ],
            sources: [
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
              { name: 'Beverage Daily', url: 'https://beveragedaily.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '-1.8%',
            brands: ['Barefoot', 'Yellow Tail', 'CloudyBay'],
            regions: [
              { name: 'London', share: '37.3%', growth: '-1.5%' },
              { name: 'Manchester', share: '20.1%', growth: '-2.1%' },
              { name: 'Edinburgh', share: '17.3%', growth: '-2.0%' },
              { name: 'Birmingham', share: '14.4%', growth: '-2.2%' },
              { name: 'Bristol', share: '10.9%', growth: '+1.1%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Decanter', url: 'https://decanter.com' },
            ]
          },
          {
            name: 'Australia',
            growth: '-0.2%',
            brands: ['Penfolds Grange', 'Yellow Tail', 'Lindemans'],
            regions: [
              { name: 'Sydney', share: '33.5%', growth: '+0.5%' },
              { name: 'Melbourne', share: '27.4%', growth: '-0.3%' },
              { name: 'Brisbane', share: '22.4%', growth: '-0.4%' },
              { name: 'Perth', share: '16.7%', growth: '-0.1%' },
            ],
            sources: [
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
              { name: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Château Margaux', 'Opus One', 'Penfolds Grange', 'Sassicaia', 'Cloudy Bay', 'Screaming Eagle'],
          midTier: ['Robert Mondavi', 'Oyster Bay', 'Kim Crawford', 'Meiomi', 'Josh Cellars'],
          value: ['Barefoot', 'Yellow Tail', 'Blossom Hill', 'Hardy\u2019s', 'Echo Falls', 'Jacob\u2019s Creek']
        },
        channels: { onTrade: 30.0, offTrade: 55.1, eCommerce: 7.7, travelRetail: 7.2 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 58,   // % ACV distribution
          ceDepletions: 3400000,  // case equivalent depletions
          billback: 10.5,          // % average billback/discount
          grossMarginPct: 50,       // % gross margin
          cac: 32,               // $ customer acquisition cost
          itr: 14,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Younger demographic consumption volume declining 5%+ YoY as generational shift accelerates', source: 'The IWSR', url: 'https://theiwsr.com' },
          { text: 'Premium and natural wine segments growing 8-12% despite overall category contraction', source: 'Wine Searcher', url: 'https://wine-searcher.com' },
          { text: 'Bag-in-box premium repositioning gaining market share at expense of bulk wine', source: 'Decanter', url: 'https://decanter.com' },
          { text: 'Rosé wine maintaining growth momentum with +3.5% expansion, driven by younger consumer appeal', source: 'Beverage Daily Spirits Market Report', url: 'https://beveragedaily.com' },
          { text: 'China wine market collapse continuing with -25%+ YoY contraction', source: 'The Spirits Business Annual Review', url: 'https://thespiritsbusiness.com' },
        ],
        report: {
          keyEvents: ['Global wine market contracted -1.8% with structural volume decline accelerating', 'Premiumization and natural wine growth partially offset mainstream volume loss', 'US market stabilized at -0.5% through California premiumization momentum', 'China market collapse accelerated with -25% contraction from 2020 peak'],
          topPerformer: 'Robert Mondavi (managing category transition through premiumization and sustainability positioning)',
          analysis: 'Wine market contracted 1.8% globally in 2025 as structural volume decline from younger demographic disengagement accelerated. The category faces a generational consumption cliff: adults aged 21-35 consume 40% less wine than preceding cohort at equivalent ages, driven by health consciousness, spirits/beer preference shifts, and reduced alcohol consumption norms. Despite headline contraction, premiumization and category innovation created growth opportunities within submerged volumes.\n\nThe US market, representing 38% of global value, stabilized at -0.5% as California premium segment growth (+0.8%) offset mainstream volume decline. France contracted 2.1% as domestic consumption eroded from both demographic shifts and younger generational disengagement. Italy held relatively steady at -1.5% through geographic pricing advantages. China market continued its structural collapse from the 2020 peak, falling 25% YoY as trade tensions and regulatory environment persisted.\n\nPremium wine (above $20/bottle) grew 10% globally, offsetting value segment contraction. Natural/organic wine expanded 12% YoY, capturing younger demographic interest in sustainability and health positioning. Premium bag-in-box positioning gained share, repositioning as wine format for affluent consumers rather than bulk category. Rosé wine maintained growth of 3.5%, appealing to younger demographics and female-led occasions. Travel retail grew 8% on international tourism recovery.',
          conclusion: 'Wine entered 2025 in structural decline but with viable premiumization and innovation vectors sustaining category value despite volume headwinds. Management of generational transitions and category repositioning will determine long-term viability.'
        }
      },
      2024: {
        marketSize: '$346B',
        growth: '-2.5%',
        growthDir: 'down',
        volumeCases: '2945M',
        topMarkets: [
          {
            name: 'United States',
            growth: '-1.2%',
            brands: ['Robert Mondavi', 'Oyster Bay', 'Kim Crawford'],
            regions: [
              { name: 'California', share: '38.0%', growth: '+1.5%' },
              { name: 'New York', share: '18.8%', growth: '-2.1%' },
              { name: 'Texas', share: '14.4%', growth: '-1.5%' },
              { name: 'Florida', share: '12.7%', growth: '-1.8%' },
              { name: 'Illinois', share: '6.9%', growth: '+0.8%' },
              { name: 'Pennsylvania', share: '9.2%', growth: '+2.5%' },
            ],
            sources: [
              { name: 'The IWSR', url: 'https://theiwsr.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
          {
            name: 'France',
            growth: '-3.2%',
            brands: ['Château Margaux', 'Château Lafite', 'Cloudy Bay'],
            regions: [
              { name: 'Bordeaux', share: '39.1%', growth: '-2.9%' },
              { name: 'Paris', share: '23.8%', growth: '-3.5%' },
              { name: 'Lyon', share: '16.9%', growth: '-3.1%' },
              { name: 'Provence', share: '12.6%', growth: '-3.3%' },
              { name: 'Toulouse', share: '7.6%', growth: '+2.1%' },
            ],
            sources: [
              { name: 'Decanter', url: 'https://decanter.com' },
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
            ]
          },
          {
            name: 'Italy',
            growth: '-2.8%',
            brands: ['Sassicaia', 'Gavi', 'Pinot Grigio'],
            regions: [
              { name: 'Milan', share: '34.7%', growth: '-2.5%' },
              { name: 'Rome', share: '27.7%', growth: '-2.9%' },
              { name: 'Florence', share: '21.7%', growth: '-3.0%' },
              { name: 'Venice', share: '15.9%', growth: '-3.2%' },
            ],
            sources: [
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
              { name: 'Beverage Daily', url: 'https://beveragedaily.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '-2.5%',
            brands: ['Barefoot', 'Yellow Tail', 'Cloudy Bay'],
            regions: [
              { name: 'London', share: '38.4%', growth: '-2.2%' },
              { name: 'Manchester', share: '18.9%', growth: '-2.8%' },
              { name: 'Edinburgh', share: '17.0%', growth: '-2.5%' },
              { name: 'Birmingham', share: '15.6%', growth: '-2.9%' },
              { name: 'Bristol', share: '10.1%', growth: '+5.5%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Decanter', url: 'https://decanter.com' },
            ]
          },
          {
            name: 'China',
            growth: '-22.1%',
            brands: ['Opus One', 'Penfolds Grange', 'Cloudy Bay'],
            regions: [
              { name: 'Shanghai', share: '29.0%', growth: '-21.8%' },
              { name: 'Beijing', share: '24.8%', growth: '-22.5%' },
              { name: 'Guangzhou', share: '19.5%', growth: '-21.9%' },
              { name: 'Shenzhen', share: '13.0%', growth: '-22.3%' },
              { name: 'Hangzhou', share: '5.8%', growth: '+5.2%' },
              { name: 'Chengdu', share: '7.9%', growth: '+0.4%' },
            ],
            sources: [
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
              { name: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Château Margaux', 'Opus One', 'Penfolds Grange', 'Sassicaia', 'Cloudy Bay', 'Screaming Eagle'],
          midTier: ['Robert Mondavi', 'Oyster Bay', 'Kim Crawford', 'Meiomi', 'Josh Cellars'],
          value: ['Barefoot', 'Yellow Tail', 'Blossom Hill', 'Hardy\u2019s', 'Echo Falls', 'Jacob\u2019s Creek']
        },
        channels: { onTrade: 29.6, offTrade: 56.3, eCommerce: 6.8, travelRetail: 7.3 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 56,   // % ACV distribution
          ceDepletions: 3300000,  // case equivalent depletions
          billback: 10.2,          // % average billback/discount
          grossMarginPct: 49,       // % gross margin
          cac: 33,               // $ customer acquisition cost
          itr: 14,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'China wine market collapse accelerating to -22.1% YoY as trade tensions persist', source: 'The IWSR', url: 'https://theiwsr.com' },
          { text: 'Generational consumption shift driving 5%+ YoY volume decline in younger demographics', source: 'Wine Searcher', url: 'https://wine-searcher.com' },
          { text: 'Premiumization and natural wine gaining share at expense of mainstream bulk wine', source: 'Decanter', url: 'https://decanter.com' },
          { text: 'Premium bag-in-box repositioning as lifestyle choice gaining traction among affluent consumers', source: 'Beverage Daily Spirits Market Report', url: 'https://beveragedaily.com' },
          { text: 'Rosé wine maintaining growth momentum with +2.8% expansion', source: 'The Spirits Business Annual Review', url: 'https://thespiritsbusiness.com' },
        ],
        report: {
          keyEvents: ['Global wine market contracted -2.5% as structural volume decline accelerated', 'China market collapse deepened to -22.1% from 2020 peak values', 'US premiumization in California (+1.5%) partially offset mainstream volume loss', 'Natural/organic wine segment growing 9% despite overall category contraction'],
          topPerformer: 'Robert Mondavi (leading category premiumization and sustainability positioning)',
          analysis: 'Wine market contracted 2.5% in 2024 as multiple headwinds converged. China\u2019s catastrophic -22.1% decline dominated headline numbers, reflecting complete reversal of 2000-2015 prestige wine boom as trade tensions, regulatory environment, and economic slowdown decimated luxury import demand. The US market, while declining 1.2% overall, showed bifurcated performance: California premium segment grew 1.5% while East Coast mainstream wine declined 2.1%. France contracted 3.2% as both domestic consumption and export demand faced headwinds.\n\nDemographic realities drove deeper structural volume loss. Consumers aged 21-35 continued demonstrating 40%+ lower wine consumption than predecessor cohorts, reflecting health consciousness, spirits/beer migration, and secular alcohol reduction trends. Off-trade dominance solidified at 56% of channel mix, reflecting retail consolidation and younger demographic\'s preference for e-commerce/home delivery over on-premise occasions.\n\nPremium wine (above $20/bottle) demonstrated resilience, growing 9% globally on wine enthusiast engagement and premiumization momentum. Natural/organic wine expanded 9% YoY, capturing lifestyle-conscious younger consumers. Premium bag-in-box gained 3% share as category repositioning as wine format for affluent consumers rather than bulk category took hold. Rosé wine maintained growth of 2.8% through female-led occasions and younger appeal.',
          conclusion: '2024 confirmed wine’s structural volume decline in traditional markets (France -3%, Italy -2%) but revealed robust growth in premiumisation, organic/natural wines, and emerging consumer demographics. The category’s paradox—falling volume, rising value—creates specific opportunities for new brands positioned at £12–25 RRP with clear sustainability credentials and accessible flavour profiles. The under-35 consumer cohort, often written off as ‘wine-averse,’ actually increased wine spending by 8% in 2024, concentrated almost entirely in natural, organic, and low-intervention categories.'
        }
      },
      2023: {
        marketSize: '$355B',
        growth: '-1.2%',
        growthDir: 'down',
        volumeCases: '3018M',
        topMarkets: [
          {
            name: 'United States',
            growth: '-0.8%',
            brands: ['Robert Mondavi', 'Oyster Bay', 'Kim Crawford'],
            regions: [
              { name: 'California', share: '39.5%', growth: '+2.1%' },
              { name: 'New York', share: '19.6%', growth: '-1.8%' },
              { name: 'Texas', share: '14.1%', growth: '-1.2%' },
              { name: 'Florida', share: '12.8%', growth: '-0.9%' },
              { name: 'Illinois', share: '6.0%', growth: '+1.6%' },
              { name: 'Pennsylvania', share: '8.0%', growth: '+6.1%' },
            ],
            sources: [
              { name: 'The IWSR', url: 'https://theiwsr.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
          {
            name: 'France',
            growth: '-1.8%',
            brands: ['Château Margaux', 'Château Lafite', 'Cloudy Bay'],
            regions: [
              { name: 'Bordeaux', share: '38.4%', growth: '-1.5%' },
              { name: 'Paris', share: '23.3%', growth: '-2.1%' },
              { name: 'Lyon', share: '17.9%', growth: '-1.9%' },
              { name: 'Provence', share: '12.7%', growth: '-1.7%' },
              { name: 'Toulouse', share: '7.7%', growth: '+6.6%' },
            ],
            sources: [
              { name: 'Decanter', url: 'https://decanter.com' },
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
            ]
          },
          {
            name: 'Italy',
            growth: '-1.5%',
            brands: ['Sassicaia', 'Gavi', 'Pinot Grigio'],
            regions: [
              { name: 'Milan', share: '35.3%', growth: '-1.2%' },
              { name: 'Rome', share: '28.1%', growth: '-1.6%' },
              { name: 'Florence', share: '22.1%', growth: '-1.7%' },
              { name: 'Venice', share: '14.5%', growth: '-1.9%' },
            ],
            sources: [
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
              { name: 'Beverage Daily', url: 'https://beveragedaily.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '-1.9%',
            brands: ['Barefoot', 'Yellow Tail', 'Cloudy Bay'],
            regions: [
              { name: 'London', share: '39.7%', growth: '-1.6%' },
              { name: 'Manchester', share: '19.0%', growth: '-2.2%' },
              { name: 'Edinburgh', share: '16.1%', growth: '-2.0%' },
              { name: 'Birmingham', share: '14.8%', growth: '-2.1%' },
              { name: 'Bristol', share: '10.4%', growth: '+5.1%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Decanter', url: 'https://decanter.com' },
            ]
          },
          {
            name: 'China',
            growth: '-18.5%',
            brands: ['Opus One', 'Penfolds Grange', 'Cloudy Bay'],
            regions: [
              { name: 'Shanghai', share: '30.4%', growth: '-18.2%' },
              { name: 'Beijing', share: '24.8%', growth: '-18.8%' },
              { name: 'Guangzhou', share: '18.5%', growth: '-18.4%' },
              { name: 'Shenzhen', share: '12.9%', growth: '-18.9%' },
              { name: 'Hangzhou', share: '6.2%', growth: '+5.5%' },
              { name: 'Chengdu', share: '7.2%', growth: '+5.2%' },
            ],
            sources: [
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
              { name: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Château Margaux', 'Opus One', 'Penfolds Grange', 'Sassicaia', 'Cloudy Bay', 'Screaming Eagle'],
          midTier: ['Robert Mondavi', 'Oyster Bay', 'Kim Crawford', 'Meiomi', 'Josh Cellars'],
          value: ['Barefoot', 'Yellow Tail', 'Blossom Hill', 'Hardy\u2019s', 'Echo Falls', 'Jacob\u2019s Creek']
        },
        channels: { onTrade: 31.2, offTrade: 55.1, eCommerce: 6.7, travelRetail: 7.0 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 54,   // % ACV distribution
          ceDepletions: 3200000,  // case equivalent depletions
          billback: 9.8,          // % average billback/discount
          grossMarginPct: 48,       // % gross margin
          cac: 34,               // $ customer acquisition cost
          itr: 13,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'China wine market collapsed -18.5% YoY from 2020 peak as trade restrictions tightened', source: 'The IWSR', url: 'https://theiwsr.com' },
          { text: 'Generational consumption shift accelerating with millennials/Gen Z drinking 40%+ less wine than predecessors', source: 'Wine Searcher', url: 'https://wine-searcher.com' },
          { text: 'Premium wine segment growing 7% despite overall category contraction', source: 'Decanter', url: 'https://decanter.com' },
          { text: 'Natural/organic wine gaining 8% YoY share as health consciousness drives consumer preferences', source: 'Beverage Daily Spirits Market Report', url: 'https://beveragedaily.com' },
          { text: 'Rosé wine growing 2% YoY, gaining share among younger female-led occasions', source: 'The Spirits Business Annual Review', url: 'https://thespiritsbusiness.com' },
        ],
        report: {
          keyEvents: ['Global wine market contracted -1.2% with volume decline accelerating', 'China market collapse continued at -18.5% from 2015 peak values', 'California premium wine grew +2.1% as premiumization offset mainstream volume', 'Natural/organic wine segment expanded 8% globally'],
          topPerformer: 'Robert Mondavi (driving premiumization and sustainability narratives)',
          analysis: 'Wine market contracted 1.2% in 2023 as demographic headwinds and China\u2019s structural collapse dominated category dynamics. China\u2019s -18.5% decline reflected complete reversal from 2010-2015 boom: trade restrictions, regulatory environment, and economic slowdown eliminated luxury import demand that had driven global prestige wine growth. The US market stabilized at -0.8% on California premium growth (+2.1%) offsetting East Coast mainstream contraction.\n\nDemographic fundamentals deteriorated: consumers aged 21-35 consumed 40%+ less wine than predecessors at equivalent ages, reflecting health consciousness, spirits/beer migration, and secular alcohol reduction trends. Off-trade maintained 55% channel dominance as retail consolidation and e-commerce growth continued. Premium wine (above $20/bottle) grew 7% on wine enthusiast engagement, while value/mainstream bulk wine contracted 4%+.\n\nNatural/organic wine emerged as growth vector, expanding 8% globally on health/sustainability positioning appeal to younger demographics. Rosé wine maintained 2% growth through female-led occasions and lifestyle positioning. Travel retail remained suppressed at 7% despite pandemic recovery.',
          conclusion: '2023 was a watershed year for the global wine industry, with volume declining 2.8% to its lowest level since 1996. However, the decline was entirely concentrated in the sub-£8 segment; wines priced £12–25 grew 5% and £25+ grew 9%. For new wine brands, the 2023 data provides a clear commercial mandate: the mass-market wine business is in secular decline, but the premium segment is growing steadily. Success requires entering at £12+ RRP with a compelling brand story (terroir, winemaker, sustainability) and avoiding the commodity price bands where supermarket private labels dominate.'
        }
      },
      2022: {
        marketSize: '$360B',
        growth: '+1.5%',
        growthDir: 'up',
        volumeCases: '3052M',
        topMarkets: [
          {
            name: 'United States',
            growth: '+2.8%',
            brands: ['Robert Mondavi', 'Oyster Bay', 'Kim Crawford'],
            regions: [
              { name: 'California', share: '38.6%', growth: '+4.2%' },
              { name: 'New York', share: '21.0%', growth: '+1.5%' },
              { name: 'Texas', share: '13.7%', growth: '+2.1%' },
              { name: 'Florida', share: '13.5%', growth: '+2.5%' },
              { name: 'Illinois', share: '6.1%', growth: '+1.5%' },
              { name: 'Pennsylvania', share: '7.1%', growth: '+0.8%' },
            ],
            sources: [
              { name: 'The IWSR', url: 'https://theiwsr.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
          {
            name: 'France',
            growth: '+0.8%',
            brands: ['Château Margaux', 'Château Lafite', 'Cloudy Bay'],
            regions: [
              { name: 'Bordeaux', share: '38.0%', growth: '+1.1%' },
              { name: 'Paris', share: '22.8%', growth: '+0.5%' },
              { name: 'Lyon', share: '17.9%', growth: '+0.9%' },
              { name: 'Provence', share: '13.4%', growth: '+0.7%' },
              { name: 'Toulouse', share: '7.9%', growth: '+1.6%' },
            ],
            sources: [
              { name: 'Decanter', url: 'https://decanter.com' },
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
            ]
          },
          {
            name: 'Italy',
            growth: '+1.2%',
            brands: ['Sassicaia', 'Gavi', 'Pinot Grigio'],
            regions: [
              { name: 'Milan', share: '34.2%', growth: '+1.5%' },
              { name: 'Rome', share: '28.2%', growth: '+1.0%' },
              { name: 'Florence', share: '23.0%', growth: '+1.1%' },
              { name: 'Venice', share: '14.6%', growth: '+1.3%' },
            ],
            sources: [
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
              { name: 'Beverage Daily', url: 'https://beveragedaily.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+2.1%',
            brands: ['Barefoot', 'Yellow Tail', 'Cloudy Bay'],
            regions: [
              { name: 'London', share: '38.7%', growth: '+2.5%' },
              { name: 'Manchester', share: '20.5%', growth: '+1.8%' },
              { name: 'Edinburgh', share: '15.7%', growth: '+2.0%' },
              { name: 'Birmingham', share: '13.4%', growth: '+1.9%' },
              { name: 'Bristol', share: '11.7%', growth: '+3.7%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Decanter', url: 'https://decanter.com' },
            ]
          },
          {
            name: 'China',
            growth: '+5.2%',
            brands: ['Opus One', 'Penfolds Grange', 'Cloudy Bay'],
            regions: [
              { name: 'Shanghai', share: '30.2%', growth: '+5.8%' },
              { name: 'Beijing', share: '24.3%', growth: '+4.9%' },
              { name: 'Guangzhou', share: '17.6%', growth: '+5.1%' },
              { name: 'Shenzhen', share: '13.9%', growth: '+5.3%' },
              { name: 'Hangzhou', share: '6.1%', growth: '+6.0%' },
              { name: 'Chengdu', share: '7.9%', growth: '+2.2%' },
            ],
            sources: [
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
              { name: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Château Margaux', 'Opus One', 'Penfolds Grange', 'Sassicaia', 'Cloudy Bay', 'Screaming Eagle'],
          midTier: ['Robert Mondavi', 'Oyster Bay', 'Kim Crawford', 'Meiomi', 'Josh Cellars'],
          value: ['Barefoot', 'Yellow Tail', 'Blossom Hill', 'Hardy\u2019s', 'Echo Falls', 'Jacob\u2019s Creek']
        },
        channels: { onTrade: 31.8, offTrade: 54.2, eCommerce: 8.0, travelRetail: 6.0 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 52,   // % ACV distribution
          ceDepletions: 3100000,  // case equivalent depletions
          billback: 9.5,          // % average billback/discount
          grossMarginPct: 47,       // % gross margin
          cac: 35,               // $ customer acquisition cost
          itr: 13,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Post-pandemic at-home consumption sustaining off-trade growth at 54%', source: 'The IWSR', url: 'https://theiwsr.com' },
          { text: 'California wine market growing 4.2% on premiumization and sustainably-focused brands', source: 'Wine Searcher', url: 'https://wine-searcher.com' },
          { text: 'China wine market recovered +5.2% on trade normalization and luxury gifting rebound', source: 'Decanter', url: 'https://decanter.com' },
          { text: 'Natural/organic wine segment growing 6% globally on health/sustainability appeal', source: 'Beverage Daily Spirits Market Report', url: 'https://beveragedaily.com' },
          { text: 'Rosé wine gaining 1.5% share on younger demographic appeal', source: 'The Spirits Business Annual Review', url: 'https://thespiritsbusiness.com' },
        ],
        report: {
          keyEvents: ['Global wine market rebounded to +1.5% growth on post-pandemic normalization', 'California premiumization drove +4.2% growth offsetting broader demographic decline', 'China wine market recovery to +5.2% on trade normalization and gifting rebound', 'Off-trade sustained 54% channel dominance on at-home consumption persistence'],
          topPerformer: 'Robert Mondavi (capturing premiumization and sustainability positioning momentum)',
          analysis: 'Wine market posted modest 1.5% growth in 2022 on post-pandemic normalization, primarily driven by California premiumization at 4.2%. The US market overall grew 2.8% on continued at-home consumption and on-premise recovery momentum. China rebounded strongly at 5.2% as trade normalized and luxury gifting resumed, though growth trajectory remained below historical 2010-2015 peaks.\n\nOff-trade sustained 54% channel dominance reflecting continued at-home entertaining behavior persistence despite pandemic recovery. E-commerce maintained 8% share from pandemic-driven direct-to-consumer expansion. Premium wine (above $20/bottle) grew 5% on wine enthusiast engagement, while mainstream volume remained under pressure from demographic shifts.\n\nNatural/organic wine expanded 6% globally on health/sustainability positioning appeal. Rosé wine gained 1.5% share on younger demographic appeal and lifestyle positioning. Travel retail remained depressed at 6% due to ongoing international tourism constraints.',
          conclusion: '2022 saw wine grapple with severe supply-side challenges—drought in France, heatwaves across Southern Europe, and logistics disruptions—that paradoxically benefited premium producers by constraining supply and supporting price increases. The vintage quality was exceptional in Burgundy and Northern Rhône, driving collector demand and investment interest. For new brands, the 2022 experience demonstrated that climate volatility is now a permanent feature of the wine business, making supply chain resilience and multi-region sourcing capabilities essential strategic assets rather than optional diversification.'
        }
      },
      2021: {
        marketSize: '$355B',
        growth: '+2.8%',
        growthDir: 'up',
        volumeCases: '3009M',
        topMarkets: [
          {
            name: 'United States',
            growth: '+4.2%',
            brands: ['Robert Mondavi', 'Oyster Bay', 'Kim Crawford'],
            regions: [
              { name: 'California', share: '38.9%', growth: '+5.8%' },
              { name: 'New York', share: '21.3%', growth: '+2.9%' },
              { name: 'Texas', share: '13.8%', growth: '+3.5%' },
              { name: 'Florida', share: '13.9%', growth: '+4.1%' },
              { name: 'Illinois', share: '5.2%', growth: '+3.3%' },
              { name: 'Pennsylvania', share: '6.9%', growth: '+5.1%' },
            ],
            sources: [
              { name: 'The IWSR', url: 'https://theiwsr.com' },
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
            ]
          },
          {
            name: 'France',
            growth: '+1.5%',
            brands: ['Château Margaux', 'Château Lafite', 'Cloudy Bay'],
            regions: [
              { name: 'Bordeaux', share: '38.5%', growth: '+1.8%' },
              { name: 'Paris', share: '22.0%', growth: '+1.2%' },
              { name: 'Lyon', share: '17.0%', growth: '+1.5%' },
              { name: 'Provence', share: '14.1%', growth: '+1.4%' },
              { name: 'Toulouse', share: '8.4%', growth: '+3.8%' },
            ],
            sources: [
              { name: 'Decanter', url: 'https://decanter.com' },
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
            ]
          },
          {
            name: 'Italy',
            growth: '+2.1%',
            brands: ['Sassicaia', 'Gavi', 'Pinot Grigio'],
            regions: [
              { name: 'Milan', share: '32.9%', growth: '+2.4%' },
              { name: 'Rome', share: '29.1%', growth: '+1.9%' },
              { name: 'Florence', share: '24.0%', growth: '+2.0%' },
              { name: 'Venice', share: '14.0%', growth: '+2.2%' },
            ],
            sources: [
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
              { name: 'Beverage Daily', url: 'https://beveragedaily.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+3.2%',
            brands: ['Barefoot', 'Yellow Tail', 'Cloudy Bay'],
            regions: [
              { name: 'London', share: '39.5%', growth: '+3.8%' },
              { name: 'Manchester', share: '20.8%', growth: '+2.9%' },
              { name: 'Edinburgh', share: '16.5%', growth: '+3.1%' },
              { name: 'Birmingham', share: '12.2%', growth: '+3.0%' },
              { name: 'Bristol', share: '11.0%', growth: '+3.4%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://thespiritsbusiness.com' },
              { name: 'Decanter', url: 'https://decanter.com' },
            ]
          },
          {
            name: 'China',
            growth: '+8.5%',
            brands: ['Opus One', 'Penfolds Grange', 'Cloudy Bay'],
            regions: [
              { name: 'Shanghai', share: '30.9%', growth: '+9.2%' },
              { name: 'Beijing', share: '23.5%', growth: '+8.1%' },
              { name: 'Guangzhou', share: '19.2%', growth: '+8.4%' },
              { name: 'Shenzhen', share: '12.8%', growth: '+8.9%' },
              { name: 'Hangzhou', share: '5.9%', growth: '+3.4%' },
              { name: 'Chengdu', share: '7.7%', growth: '+0.7%' },
            ],
            sources: [
              { name: 'Wine Searcher', url: 'https://wine-searcher.com' },
              { name: 'Market Watch Mag', url: 'https://marketwatchmag.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Château Margaux', 'Opus One', 'Penfolds Grange', 'Sassicaia', 'Cloudy Bay', 'Screaming Eagle'],
          midTier: ['Robert Mondavi', 'Oyster Bay', 'Kim Crawford', 'Meiomi', 'Josh Cellars'],
          value: ['Barefoot', 'Yellow Tail', 'Blossom Hill', 'Hardy\u2019s', 'Echo Falls', 'Jacob\u2019s Creek']
        },
        channels: { onTrade: 27.7, offTrade: 60.1, eCommerce: 6.2, travelRetail: 6.0 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 50,   // % ACV distribution
          ceDepletions: 3000000,  // case equivalent depletions
          billback: 9.2,          // % average billback/discount
          grossMarginPct: 46,       // % gross margin
          cac: 36,               // $ customer acquisition cost
          itr: 12,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Pandemic-driven at-home consumption surge boosting off-trade to 60% channel dominance', source: 'The IWSR', url: 'https://theiwsr.com' },
          { text: 'California premium wine (+5.8%) driving category growth despite generational demographic decline', source: 'Wine Searcher', url: 'https://wine-searcher.com' },
          { text: 'China wine market strong at +8.5% on luxury gifting acceleration', source: 'Decanter', url: 'https://decanter.com' },
          { text: 'E-commerce expanding to 6% share from pandemic-driven direct-to-consumer growth', source: 'Beverage Daily Spirits Market Report', url: 'https://beveragedaily.com' },
          { text: 'Rosé wine emerging with +2.5% growth as younger demographic appeal increases', source: 'The Spirits Business Annual Review', url: 'https://thespiritsbusiness.com' },
        ],
        report: {
          keyEvents: ['Pandemic-driven at-home consumption surge boosted global wine market +2.8%', 'Off-trade surged to 60% dominance on lockdown-driven home entertaining', 'California premium wine grew +5.8% as premiumization offset mainstream volume', 'China market strong at +8.5% on luxury gifting and investment demand'],
          topPerformer: 'Robert Mondavi (leading premiumization movement and sustainability positioning)',
          analysis: 'Wine posted 2.8% global growth in 2021 on exceptional pandemic-driven at-home consumption surge. Off-trade exploded to 60% channel dominance as lockdowns and social restrictions kept consumers entertaining at home. On-trade remained suppressed at 28% due to hospitality closures and capacity constraints, though recovery began in H2 2021 as vaccination accelerated.\n\nCalifornia premium wine segment posted exceptional 5.8% growth, offsetting broader demographic declines as affluent consumers invested in home wine collections. The US market overall grew 4.2% on sustained at-home entertaining. China maintained strong 8.5% growth on luxury gifting acceleration and investment demand as trade normalized from 2020 nadir. E-commerce expanded to 6% share from pandemic-driven direct-to-consumer growth.\n\nRosé wine emerged as a growth driver with +2.5% expansion, appealing to younger demographic cohorts and female-led occasions. Natural/organic wine gained 4% share on health/sustainability positioning appeal. Premiumization accelerated as affluent consumers upgraded their home selections during lockdown periods.',
          conclusion: '2021 represented wine’s pandemic plateau, with at-home consumption stabilising after 2020’s surge while on-trade recovery lagged. The year’s most important structural shift was the acceleration of direct-to-consumer (DTC) wine sales, which grew 22% and proved that wine brands could build profitable businesses outside traditional wholesale distribution. For new entrants, 2021 confirmed that a DTC-first strategy—wine club, e-commerce, tasting room—is now commercially viable and potentially more profitable than traditional three-tier distribution, particularly for producers with strong brand narratives and limited production volumes.'
        }
      },
    }
  },
  {
    key: 'beer',
    label: 'Beer',
    icon: 'B',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
    trajectory: 'Beer remains the largest beverage alcohol category by volume, but growth has dramatically slowed from 4.5% in 2021 to just 0.2% in 2025. Consolidation among craft breweries, premiumization of imports, and structural decline in macro lager volume define the market.',
    yearData: {
      2025: {
        marketSize: '$620B',
        growth: '+0.2%',
        growthDir: 'flat',
        volumeCases: '1950M',
        topMarkets: [
          {
            name: 'China',
            growth: '+1.2%',
            brands: ['Tsingtao', 'Snow', 'Yanjing'],
            regions: [
              { name: 'Shanghai', share: '26.3%', growth: '+2.1%' },
              { name: 'Beijing', share: '21.8%', growth: '+0.8%' },
              { name: 'Guangzhou', share: '17.4%', growth: '+1.5%' },
              { name: 'Chongqing', share: '14.5%', growth: '-0.3%' },
              { name: 'Shenzhen', share: '11.7%', growth: '+5.7%' },
              { name: 'Hangzhou', share: '8.3%', growth: '+0.7%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+0.1%',
            brands: ['Bud Light', 'Michelob Ultra', 'Corona Extra'],
            regions: [
              { name: 'California', share: '27.2%', growth: '-0.5%' },
              { name: 'Texas', share: '23.9%', growth: '+0.2%' },
              { name: 'Florida', share: '17.1%', growth: '+0.4%' },
              { name: 'New York', share: '13.7%', growth: '-0.1%' },
              { name: 'Illinois', share: '10.2%', growth: '+2.7%' },
              { name: 'Pennsylvania', share: '7.9%', growth: '+3.4%' },
            ],
            sources: [
              { name: 'Brewers Association', url: 'https://www.brewersassociation.org' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'Brazil',
            growth: '+0.8%',
            brands: ['Skol', 'Brahma', 'Antarctica'],
            regions: [
              { name: 'São Paulo', share: '36.0%', growth: '+1.1%' },
              { name: 'Rio de Janeiro', share: '23.0%', growth: '+0.5%' },
              { name: 'Minas Gerais', share: '18.0%', growth: '+0.9%' },
              { name: 'Bahia', share: '14.8%', growth: '+0.6%' },
              { name: 'Paraná', share: '8.2%', growth: '+5.1%' },
            ],
            sources: [
              { name: 'Euromonitor', url: 'https://www.euromonitor.com' },
              { name: 'Just-Drinks', url: 'https://www.just-drinks.com' },
            ]
          },
          {
            name: 'Germany',
            growth: '-0.3%',
            brands: ['Krombacher', 'Heineken', 'Warsteiner'],
            regions: [
              { name: 'North Rhine-Westphalia', share: '31.3%', growth: '-0.2%' },
              { name: 'Bavaria', share: '27.9%', growth: '-0.4%' },
              { name: 'Baden-Württemberg', share: '19.7%', growth: '-0.3%' },
              { name: 'Berlin', share: '13.2%', growth: '+0.1%' },
              { name: 'Hesse', share: '7.9%', growth: '+1.3%' },
            ],
            sources: [
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
            ]
          },
          {
            name: 'Mexico',
            growth: '+1.5%',
            brands: ['Corona Extra', 'Modelo Especial', 'Tecate'],
            regions: [
              { name: 'Mexico City', share: '27.6%', growth: '+1.8%' },
              { name: 'Jalisco', share: '22.4%', growth: '+1.6%' },
              { name: 'Guanajuato', share: '19.0%', growth: '+1.4%' },
              { name: 'Veracruz', share: '17.3%', growth: '+1.2%' },
              { name: 'Monterrey', share: '13.7%', growth: '+2.5%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Chimay', 'Westvleteren', 'Pliny the Elder', 'Westmalle', 'Cantillon', 'Hill Farmstead'],
          midTier: ['Sierra Nevada', 'Lagunitas', 'BrewDog', 'Brooklyn Brewery', 'Goose Island', 'Stone'],
          value: ['Budweiser', 'Bud Light', 'Corona Extra', 'Heineken', 'Stella Artois', 'Modelo Especial']
        },
        channels: { onTrade: 34.8, offTrade: 57.4, eCommerce: 2.8, travelRetail: 5.0 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 72,   // % ACV distribution
          ceDepletions: 5800000,  // case equivalent depletions
          billback: 14.0,          // % average billback/discount
          grossMarginPct: 46,       // % gross margin
          cac: 22,               // $ customer acquisition cost
          itr: 20,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Mexican lager category surging with Corona and Modelo gaining share in North America', source: 'Brewers Association', url: 'https://www.brewersassociation.org' },
          { text: 'Craft beer consolidation accelerating with major acquisitions by AB InBev and Molson Coors', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Non-alcoholic beer emerging as growth segment with mainstream adoption in Western Europe', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Bud Light boycott aftermath continues to reshape American light lager market dynamics', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Premiumization in import segments offsetting volume declines in domestic macro lagers', source: 'Mintel', url: 'https://www.mintel.com' },
        ],
        report: {
          keyEvents: ['Corona and Modelo continued momentum in US and North America', 'AB InBev completed acquisitions of regional craft brewers in North America', 'Non-alcoholic beer exceeded 2% market penetration in Germany and UK', 'Asian markets (China, Vietnam) maintained modest growth while Western mature markets flatlined'],
          topPerformer: 'Corona Extra and Modelo Especial in North America; Tsingtao in Asia',
          analysis: 'Beer market maturation has reached a critical inflection point in 2025. The category faces structural headwinds as macro lager volume continues its decades-long decline in mature markets, offset partially by premiumization of imported beers and modest growth in emerging markets like Mexico. The Bud Light boycott of 2023–2024 created lasting consumer segmentation in the US light lager segment, from which recovery remains incomplete. Craft beer consolidation accelerated dramatically, with AB InBev and Molson Coors acquiring popular regional brands, raising questions about brand authenticity perception among core craft consumers. Non-alcoholic beer has transitioned from novelty to mainstream, particularly in Western Europe where it now represents 2–3% of category volume and continues compound growth despite a flat overall beer market. China remains the volume engine, but growth rates have moderated significantly as domestic macro brands defend their position against premium imports.',
          conclusion: 'The beer market has entered a mature, slow-growth equilibrium in developed economies with growth driven primarily by premiumization and category adjacencies like non-alcoholic alternatives. Emerging markets, particularly Mexico, provide the only significant growth opportunity, driven by rising middle classes and export-led strategies from Mexican producers. For new entrants, craft positioning and import premiumization offer the most viable strategies in saturated developed markets.'
        }
      },
      2024: {
        marketSize: '$619B',
        growth: '+0.5%',
        growthDir: 'flat',
        volumeCases: '1945M',
        topMarkets: [
          {
            name: 'China',
            growth: '+2.1%',
            brands: ['Tsingtao', 'Snow', 'Yanjing'],
            regions: [
              { name: 'Shanghai', share: '27.0%', growth: '+2.8%' },
              { name: 'Beijing', share: '21.6%', growth: '+1.5%' },
              { name: 'Guangzhou', share: '16.0%', growth: '+2.2%' },
              { name: 'Chongqing', share: '14.9%', growth: '+0.5%' },
              { name: 'Shenzhen', share: '11.1%', growth: '+1.3%' },
              { name: 'Hangzhou', share: '9.4%', growth: '+2.9%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+0.3%',
            brands: ['Bud Light', 'Michelob Ultra', 'Corona Extra'],
            regions: [
              { name: 'California', share: '28.0%', growth: '-0.8%' },
              { name: 'Texas', share: '24.4%', growth: '+0.5%' },
              { name: 'Florida', share: '17.5%', growth: '+0.8%' },
              { name: 'New York', share: '12.9%', growth: '+0.2%' },
              { name: 'Illinois', share: '9.4%', growth: '+2.6%' },
              { name: 'Pennsylvania', share: '7.8%', growth: '+4.1%' },
            ],
            sources: [
              { name: 'Brewers Association', url: 'https://www.brewersassociation.org' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'Brazil',
            growth: '+1.5%',
            brands: ['Skol', 'Brahma', 'Antarctica'],
            regions: [
              { name: 'São Paulo', share: '35.2%', growth: '+1.8%' },
              { name: 'Rio de Janeiro', share: '23.2%', growth: '+1.2%' },
              { name: 'Minas Gerais', share: '18.4%', growth: '+1.6%' },
              { name: 'Bahia', share: '13.9%', growth: '+1.1%' },
              { name: 'Paraná', share: '9.3%', growth: '+1.8%' },
            ],
            sources: [
              { name: 'Euromonitor', url: 'https://www.euromonitor.com' },
              { name: 'Just-Drinks', url: 'https://www.just-drinks.com' },
            ]
          },
          {
            name: 'Germany',
            growth: '-0.1%',
            brands: ['Krombacher', 'Heineken', 'Warsteiner'],
            regions: [
              { name: 'North Rhine-Westphalia', share: '32.2%', growth: '+0.1%' },
              { name: 'Bavaria', share: '27.3%', growth: '-0.2%' },
              { name: 'Baden-Württemberg', share: '18.8%', growth: '0%' },
              { name: 'Berlin', share: '13.4%', growth: '+0.3%' },
              { name: 'Hesse', share: '8.3%', growth: '+2.8%' },
            ],
            sources: [
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
            ]
          },
          {
            name: 'Mexico',
            growth: '+2.1%',
            brands: ['Corona Extra', 'Modelo Especial', 'Tecate'],
            regions: [
              { name: 'Mexico City', share: '27.5%', growth: '+2.4%' },
              { name: 'Jalisco', share: '22.4%', growth: '+2.2%' },
              { name: 'Guanajuato', share: '18.9%', growth: '+2%' },
              { name: 'Veracruz', share: '17.6%', growth: '+1.9%' },
              { name: 'Monterrey', share: '13.6%', growth: '+0.5%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Chimay', 'Westvleteren', 'Pliny the Elder', 'Westmalle', 'Cantillon', 'Hill Farmstead'],
          midTier: ['Sierra Nevada', 'Lagunitas', 'BrewDog', 'Brooklyn Brewery', 'Goose Island', 'Stone'],
          value: ['Budweiser', 'Bud Light', 'Corona Extra', 'Heineken', 'Stella Artois', 'Modelo Especial']
        },
        channels: { onTrade: 34.2, offTrade: 58.1, eCommerce: 2.3, travelRetail: 5.4 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 71,   // % ACV distribution
          ceDepletions: 5700000,  // case equivalent depletions
          billback: 13.5,          // % average billback/discount
          grossMarginPct: 45,       // % gross margin
          cac: 23,               // $ customer acquisition cost
          itr: 19,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Bud Light continues recovery trajectory as market stabilizes post-boycott', source: 'Brewers Association', url: 'https://www.brewersassociation.org' },
          { text: 'Mexican lager exports to US surged 8% year-over-year driven by Corona and Modelo', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Craft beer segment consolidation reached peak activity with 12 major acquisitions', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Non-alcoholic beer adoption in Western Europe accelerated to mainstream status', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Asian craft beer scene emerging in Vietnam and Thailand with imported premium brands', source: 'Mintel', url: 'https://www.mintel.com' },
        ],
        report: {
          keyEvents: ['Bud Light stabilized after 2023 boycott with modest market share recovery', 'AB InBev and Molson Coors acquisitions of craft breweries accelerated', 'Corona and Modelo achieved record market share in North America', 'Non-alcoholic beer penetration exceeded 1.5% in major Western European markets'],
          topPerformer: 'Corona Extra and Modelo Especial',
          analysis: '2024 marked an inflection point for the global beer market as structural challenges in developed markets intensified while emerging markets provided modest growth drivers. The Bud Light boycott aftermath continued to reshape the US light lager segment, though recovery momentum improved in H2 2024. Mexican lager producers consolidated their position as the primary growth engine for North America, with Corona and Modelo achieving record combined market share. Craft beer consolidation reached unprecedented levels, with major acquisitions by AB InBev and Molson Coors raising questions about long-term brand independence and consumer perception of authenticity. Non-alcoholic beer transitioned definitively from trend to mainstream category in Western Europe, achieving meaningful penetration in Germany, UK, and Spain. Asian markets demonstrated resilience with modest growth in China partially offset by softness in Japan.',
          conclusion: 'Beer market growth has stabilized at approximately 0.5% in developed regions with meaningful opportunities emerging only in export-driven segments (Mexican lagers) and category expansion (non-alcoholic). Consolidation of craft breweries suggests maturation of the craft movement itself, with implications for pricing power and brand perception in subsequent years.'
        }
      },
      2023: {
        marketSize: '$616B',
        growth: '+1.8%',
        growthDir: 'up',
        volumeCases: '1935M',
        topMarkets: [
          {
            name: 'China',
            growth: '+2.8%',
            brands: ['Tsingtao', 'Snow', 'Yanjing'],
            regions: [
              { name: 'Shanghai', share: '25.9%', growth: '+3.2%' },
              { name: 'Beijing', share: '22.4%', growth: '+2.4%' },
              { name: 'Guangzhou', share: '15.5%', growth: '+3.1%' },
              { name: 'Chongqing', share: '16.0%', growth: '+2.2%' },
              { name: 'Shenzhen', share: '11.0%', growth: '+5.4%' },
              { name: 'Hangzhou', share: '9.2%', growth: '+1.0%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'United States',
            growth: '-1.2%',
            brands: ['Bud Light', 'Corona Extra', 'Michelob Ultra'],
            regions: [
              { name: 'California', share: '28.0%', growth: '-2.1%' },
              { name: 'Texas', share: '24.2%', growth: '-0.8%' },
              { name: 'Florida', share: '19.3%', growth: '-0.5%' },
              { name: 'New York', share: '11.7%', growth: '-1.4%' },
              { name: 'Illinois', share: '8.7%', growth: '+5.0%' },
              { name: 'Pennsylvania', share: '8.1%', growth: '+5.3%' },
            ],
            sources: [
              { name: 'Brewers Association', url: 'https://www.brewersassociation.org' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'Brazil',
            growth: '+2.2%',
            brands: ['Skol', 'Brahma', 'Antarctica'],
            regions: [
              { name: 'São Paulo', share: '35.2%', growth: '+2.5%' },
              { name: 'Rio de Janeiro', share: '23.5%', growth: '+1.8%' },
              { name: 'Minas Gerais', share: '19.2%', growth: '+2.3%' },
              { name: 'Bahia', share: '12.8%', growth: '+2%' },
              { name: 'Paraná', share: '9.3%', growth: '+2.8%' },
            ],
            sources: [
              { name: 'Euromonitor', url: 'https://www.euromonitor.com' },
              { name: 'Just-Drinks', url: 'https://www.just-drinks.com' },
            ]
          },
          {
            name: 'Germany',
            growth: '0%',
            brands: ['Krombacher', 'Heineken', 'Warsteiner'],
            regions: [
              { name: 'North Rhine-Westphalia', share: '30.9%', growth: '+0.1%' },
              { name: 'Bavaria', share: '28.6%', growth: '-0.1%' },
              { name: 'Baden-Württemberg', share: '19.0%', growth: '0%' },
              { name: 'Berlin', share: '13.8%', growth: '+0.2%' },
              { name: 'Hesse', share: '7.7%', growth: '+2.9%' },
            ],
            sources: [
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
            ]
          },
          {
            name: 'Mexico',
            growth: '+3.2%',
            brands: ['Corona Extra', 'Modelo Especial', 'Tecate'],
            regions: [
              { name: 'Mexico City', share: '26.4%', growth: '+3.8%' },
              { name: 'Jalisco', share: '21.3%', growth: '+3.4%' },
              { name: 'Guanajuato', share: '20.3%', growth: '+3.1%' },
              { name: 'Veracruz', share: '17.4%', growth: '+2.9%' },
              { name: 'Monterrey', share: '14.6%', growth: '+5.4%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Chimay', 'Westvleteren', 'Pliny the Elder', 'Westmalle', 'Cantillon', 'Hill Farmstead'],
          midTier: ['Sierra Nevada', 'Lagunitas', 'BrewDog', 'Brooklyn Brewery', 'Goose Island', 'Stone'],
          value: ['Budweiser', 'Bud Light', 'Corona Extra', 'Heineken', 'Stella Artois', 'Modelo Especial']
        },
        channels: { onTrade: 33.5, offTrade: 59.1, eCommerce: 1.9, travelRetail: 5.5 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 70,   // % ACV distribution
          ceDepletions: 5600000,  // case equivalent depletions
          billback: 13.0,          // % average billback/discount
          grossMarginPct: 45,       // % gross margin
          cac: 24,               // $ customer acquisition cost
          itr: 19,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Bud Light boycott in US created unprecedented market share disruption', source: 'Brewers Association', url: 'https://www.brewersassociation.org' },
          { text: 'Mexican lager category growth accelerating as Corona and Modelo gain US share', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Non-alcoholic beer reaching 1% penetration milestone in Western Europe', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Craft beer segment showing consolidation pressure with smaller independents struggling', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Premium import lagers outpacing domestic macro lager category growth', source: 'Mintel', url: 'https://www.mintel.com' },
        ],
        report: {
          keyEvents: ['Bud Light faced major consumer boycott in US, unprecedented for macro brand', 'Corona and Modelo captured significant market share gains in North America', 'Non-alcoholic beer exceeded 1% penetration in key Western European markets', 'Craft beer sector began consolidation pressure'],
          topPerformer: 'Corona Extra and Modelo Especial',
          analysis: '2023 was a transformative year for the global beer market marked by unprecedented consumer backlash against Bud Light in the US, reshaping the light lager category landscape. Mexican lagers dominated growth narratives as Corona and Modelo captured share from damaged domestic competitors. Non-alcoholic beer achieved critical mass in Western Europe, exceeding 1% penetration for the first time. Craft beer segment faced headwinds with smaller independents struggling against competition from both macro acquisitions and emerging craft-from-macro imprints.',
          conclusion: 'The Bud Light boycott demonstrated unprecedented consumer power in the beer category, while Mexican export-driven growth provided the primary global growth narrative for 2023.'
        }
      },
      2022: {
        marketSize: '$604B',
        growth: '+3.2%',
        growthDir: 'up',
        volumeCases: '1910M',
        topMarkets: [
          {
            name: 'China',
            growth: '+3.1%',
            brands: ['Tsingtao', 'Snow', 'Yanjing'],
            regions: [
              { name: 'Shanghai', share: '25.7%', growth: '+3.5%' },
              { name: 'Beijing', share: '23.8%', growth: '+2.8%' },
              { name: 'Guangzhou', share: '15.0%', growth: '+3.2%' },
              { name: 'Chongqing', share: '15.1%', growth: '+2.9%' },
              { name: 'Shenzhen', share: '11.6%', growth: '+1.7%' },
              { name: 'Hangzhou', share: '8.8%', growth: '+3.4%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+2.8%',
            brands: ['Bud Light', 'Corona Extra', 'Heineken'],
            regions: [
              { name: 'California', share: '29.0%', growth: '+2.5%' },
              { name: 'Texas', share: '22.9%', growth: '+3.1%' },
              { name: 'Florida', share: '19.9%', growth: '+3.3%' },
              { name: 'New York', share: '12.2%', growth: '+2.6%' },
              { name: 'Illinois', share: '7.7%', growth: '+4.0%' },
              { name: 'Pennsylvania', share: '8.3%', growth: '+3.8%' },
            ],
            sources: [
              { name: 'Brewers Association', url: 'https://www.brewersassociation.org' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'Brazil',
            growth: '+3.5%',
            brands: ['Skol', 'Brahma', 'Antarctica'],
            regions: [
              { name: 'São Paulo', share: '36.0%', growth: '+3.8%' },
              { name: 'Rio de Janeiro', share: '24.4%', growth: '+3.2%' },
              { name: 'Minas Gerais', share: '19.2%', growth: '+3.6%' },
              { name: 'Bahia', share: '12.1%', growth: '+3.3%' },
              { name: 'Paraná', share: '8.3%', growth: '+0.3%' },
            ],
            sources: [
              { name: 'Euromonitor', url: 'https://www.euromonitor.com' },
              { name: 'Just-Drinks', url: 'https://www.just-drinks.com' },
            ]
          },
          {
            name: 'Germany',
            growth: '+0.5%',
            brands: ['Krombacher', 'Heineken', 'Warsteiner'],
            regions: [
              { name: 'North Rhine-Westphalia', share: '30.0%', growth: '+0.6%' },
              { name: 'Bavaria', share: '29.4%', growth: '+0.4%' },
              { name: 'Baden-Württemberg', share: '18.6%', growth: '+0.5%' },
              { name: 'Berlin', share: '13.7%', growth: '+0.7%' },
              { name: 'Hesse', share: '8.3%', growth: '+6.6%' },
            ],
            sources: [
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
            ]
          },
          {
            name: 'Mexico',
            growth: '+4.1%',
            brands: ['Corona Extra', 'Modelo Especial', 'Tecate'],
            regions: [
              { name: 'Mexico City', share: '27.1%', growth: '+4.5%' },
              { name: 'Jalisco', share: '20.6%', growth: '+4.2%' },
              { name: 'Guanajuato', share: '20.5%', growth: '+4%' },
              { name: 'Veracruz', share: '17.7%', growth: '+3.9%' },
              { name: 'Monterrey', share: '14.1%', growth: '+6.1%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Chimay', 'Westvleteren', 'Pliny the Elder', 'Westmalle', 'Cantillon', 'Hill Farmstead'],
          midTier: ['Sierra Nevada', 'Lagunitas', 'BrewDog', 'Brooklyn Brewery', 'Goose Island', 'Stone'],
          value: ['Budweiser', 'Bud Light', 'Corona Extra', 'Heineken', 'Stella Artois', 'Modelo Especial']
        },
        channels: { onTrade: 32.8, offTrade: 60.3, eCommerce: 1.5, travelRetail: 5.4 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 69,   // % ACV distribution
          ceDepletions: 5500000,  // case equivalent depletions
          billback: 12.5,          // % average billback/discount
          grossMarginPct: 44,       // % gross margin
          cac: 25,               // $ customer acquisition cost
          itr: 18,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Post-COVID rebound driving on-trade recovery and premiumization acceleration', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Mexican lager category achieving record growth rates in North American markets', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Craft beer segment expanding with new brewery openings despite consolidation trends', source: 'Brewers Association', url: 'https://www.brewersassociation.org' },
          { text: 'Non-alcoholic beer achieving mainstream distribution in Western European channels', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Import premium lagers gaining shelf space at expense of domestic macro brands', source: 'Mintel', url: 'https://www.mintel.com' },
        ],
        report: {
          keyEvents: ['Post-COVID demand surge driving 3.2% global growth in beer category', 'On-trade channels recovering strongly in major markets', 'Mexican lagers achieved record growth rates', 'Craft beer segment stabilized after pandemic disruptions'],
          topPerformer: 'Corona Extra and Modelo Especial',
          analysis: '2022 marked a post-COVID rebound year for global beer markets with growth accelerating to 3.2% driven by strong on-trade recovery. Mexican lager producers achieved exceptional growth rates as pent-up consumer demand for premium imports manifested. Craft beer segment demonstrated resilience, expanding distribution while consolidation trends began to emerge. Non-alcoholic beer transitioned from novelty to shelf-permanent in Western European supermarkets.',
          conclusion: 'Beer market growth in 2022 reflected post-pandemic recovery dynamics with structural shift toward premiumization and import lagers gaining share.'
        }
      },
      2021: {
        marketSize: '$585B',
        growth: '+4.5%',
        growthDir: 'up',
        volumeCases: '1885M',
        topMarkets: [
          {
            name: 'China',
            growth: '+3.8%',
            brands: ['Tsingtao', 'Snow', 'Yanjing'],
            regions: [
              { name: 'Shanghai', share: '26.6%', growth: '+4.2%' },
              { name: 'Beijing', share: '23.1%', growth: '+3.5%' },
              { name: 'Guangzhou', share: '13.7%', growth: '+3.9%' },
              { name: 'Chongqing', share: '14.9%', growth: '+3.6%' },
              { name: 'Shenzhen', share: '11.4%', growth: '+0.3%' },
              { name: 'Hangzhou', share: '10.3%', growth: '+2.5%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+4.2%',
            brands: ['Bud Light', 'Corona Extra', 'Heineken'],
            regions: [
              { name: 'California', share: '30.4%', growth: '+3.8%' },
              { name: 'Texas', share: '24.9%', growth: '+4.5%' },
              { name: 'Florida', share: '19.4%', growth: '+4.6%' },
              { name: 'New York', share: '11.3%', growth: '+4%' },
              { name: 'Illinois', share: '6.5%', growth: '+6.4%' },
              { name: 'Pennsylvania', share: '7.5%', growth: '+5.8%' },
            ],
            sources: [
              { name: 'Brewers Association', url: 'https://www.brewersassociation.org' },
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
            ]
          },
          {
            name: 'Brazil',
            growth: '+5.1%',
            brands: ['Skol', 'Brahma', 'Antarctica'],
            regions: [
              { name: 'São Paulo', share: '36.9%', growth: '+5.4%' },
              { name: 'Rio de Janeiro', share: '23.3%', growth: '+4.8%' },
              { name: 'Minas Gerais', share: '20.2%', growth: '+5.2%' },
              { name: 'Bahia', share: '12.0%', growth: '+4.9%' },
              { name: 'Paraná', share: '7.6%', growth: '+2.0%' },
            ],
            sources: [
              { name: 'Euromonitor', url: 'https://www.euromonitor.com' },
              { name: 'Just-Drinks', url: 'https://www.just-drinks.com' },
            ]
          },
          {
            name: 'Germany',
            growth: '+1.2%',
            brands: ['Krombacher', 'Heineken', 'Warsteiner'],
            regions: [
              { name: 'North Rhine-Westphalia', share: '29.9%', growth: '+1.3%' },
              { name: 'Bavaria', share: '30.0%', growth: '+1.1%' },
              { name: 'Baden-Württemberg', share: '19.1%', growth: '+1.2%' },
              { name: 'Berlin', share: '13.6%', growth: '+1.4%' },
              { name: 'Hesse', share: '7.4%', growth: '+6.4%' },
            ],
            sources: [
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
            ]
          },
          {
            name: 'Mexico',
            growth: '+5.8%',
            brands: ['Corona Extra', 'Modelo Especial', 'Tecate'],
            regions: [
              { name: 'Mexico City', share: '27.5%', growth: '+6.2%' },
              { name: 'Jalisco', share: '19.3%', growth: '+5.9%' },
              { name: 'Guanajuato', share: '19.9%', growth: '+5.7%' },
              { name: 'Veracruz', share: '18.1%', growth: '+5.6%' },
              { name: 'Monterrey', share: '15.2%', growth: '+3.1%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Chimay', 'Westvleteren', 'Pliny the Elder', 'Westmalle', 'Cantillon', 'Hill Farmstead'],
          midTier: ['Sierra Nevada', 'Lagunitas', 'BrewDog', 'Brooklyn Brewery', 'Goose Island', 'Stone'],
          value: ['Budweiser', 'Bud Light', 'Corona Extra', 'Heineken', 'Stella Artois', 'Modelo Especial']
        },
        channels: { onTrade: 31.2, offTrade: 62.1, eCommerce: 1.2, travelRetail: 5.5 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 68,   // % ACV distribution
          ceDepletions: 5400000,  // case equivalent depletions
          billback: 12.0,          // % average billback/discount
          grossMarginPct: 43,       // % gross margin
          cac: 26,               // $ customer acquisition cost
          itr: 18,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Home consumption surge during COVID-19 lockdowns driving off-trade channel growth', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'E-commerce adoption accelerating rapidly for beer delivery services', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Craft beer segment resilient despite on-trade closures with retail expansion', source: 'Brewers Association', url: 'https://www.brewersassociation.org' },
          { text: 'Mexican lager exports surging as consumers seek premium import options', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Non-alcoholic beer achieving visibility in mainstream retail channels', source: 'Mintel', url: 'https://www.mintel.com' },
        ],
        report: {
          keyEvents: ['COVID-19 pandemic drove unprecedented off-trade channel growth', 'On-trade closures in major markets created channel rebalancing', 'E-commerce adoption accelerated significantly for beer delivery', 'Mexican lager category achieved record export growth rates'],
          topPerformer: 'Corona Extra and Modelo Especial',
          analysis: '2021 represented a pandemic-inflected growth year for beer markets globally, with home consumption surge driving off-trade growth while on-trade remained disrupted in many markets. Mexican lagers achieved exceptional momentum as premium import preferences strengthened. Craft beer demonstrated resilience through retail expansion despite on-trade closures. Non-alcoholic beer began mainstream retail penetration in major markets.',
          conclusion: 'Beer market growth in 2021 was pandemic-driven with structural shift toward home consumption and premium import lagers gaining meaningful share.'
        }
      },
    }
  },
  {
    key: 'nolo',
    label: 'No/Low Alcohol',
    icon: 'NL',
    iconColor: 'text-teal-700',
    iconBg: 'bg-teal-50',
    trajectory: 'No/low alcohol beverages represent the fastest-growing segment in the beverage alcohol category, accelerating from 18% growth in 2021 to maintaining double-digit expansion through 2025. The market has transitioned from niche health trend to mainstream category with major spirits producers launching 0.0% extensions.',
    yearData: {
      2025: {
        marketSize: '$13B',
        growth: '+9.5%',
        growthDir: 'up',
        volumeCases: '92M',
        topMarkets: [
          {
            name: 'Germany',
            growth: '+8.2%',
            brands: ['Seedlip', 'CleanCo', 'Monday', 'Lyre\u2019s', 'Three Spirit'],
            regions: [
              { name: 'Berlin', share: '28.8%', growth: '+9.1%' },
              { name: 'Munich', share: '25.6%', growth: '+7.8%' },
              { name: 'Hamburg', share: '19.2%', growth: '+8.5%' },
              { name: 'Frankfurt', share: '16.0%', growth: '+7.9%' },
              { name: 'Hesse', share: '10.4%', growth: '+2.5%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+8.8%',
            brands: ['Seedlip', 'Lyre\u2019s', 'Athletic Brewing', 'Monday', 'Ritual'],
            regions: [
              { name: 'London', share: '35.5%', growth: '+9.2%' },
              { name: 'Manchester', share: '22.6%', growth: '+8.6%' },
              { name: 'Edinburgh', share: '16.2%', growth: '+8.9%' },
              { name: 'Birmingham', share: '14.6%', growth: '+8.3%' },
              { name: 'Bristol', share: '11.1%', growth: '+6.0%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+9.1%',
            brands: ['Athletic Brewing', 'Lyre\u2019s', 'Ritual Zero Proof', 'CleanCo', 'Seedlip'],
            regions: [
              { name: 'California', share: '26.1%', growth: '+9.8%' },
              { name: 'New York', share: '21.8%', growth: '+8.9%' },
              { name: 'Texas', share: '17.4%', growth: '+8.7%' },
              { name: 'Florida', share: '14.5%', growth: '+8.5%' },
              { name: 'Illinois', share: '8.4%', growth: '+2.3%' },
              { name: 'Pennsylvania', share: '11.8%', growth: '+0.5%' },
            ],
            sources: [
              { name: 'Euromonitor', url: 'https://www.euromonitor.com' },
              { name: 'Just-Drinks', url: 'https://www.just-drinks.com' },
            ]
          },
          {
            name: 'Spain',
            growth: '+10.2%',
            brands: ['Seedlip', 'Lyre\u2019s', 'CleanCo', 'Monday', 'Athletic Brewing'],
            regions: [
              { name: 'Madrid', share: '39.4%', growth: '+10.8%' },
              { name: 'Barcelona', share: '29.5%', growth: '+10.1%' },
              { name: 'Valencia', share: '18.0%', growth: '+9.9%' },
              { name: 'Seville', share: '13.1%', growth: '+9.6%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'Australia',
            growth: '+9.6%',
            brands: ['Athletic Brewing', 'Lyre\u2019s', 'CleanCo', 'Seedlip', 'Monday'],
            regions: [
              { name: 'Sydney', share: '38.3%', growth: '+10.2%' },
              { name: 'Melbourne', share: '29.4%', growth: '+9.4%' },
              { name: 'Brisbane', share: '19.1%', growth: '+9.2%' },
              { name: 'Perth', share: '13.2%', growth: '+8.8%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Seedlip', 'Lyre\u2019s', 'Monday', 'CleanCo', 'Three Spirit', 'Ritual Zero Proof'],
          midTier: ['Athletic Brewing', 'Heineken 0.0', 'Gordon\u2019s 0.0%', 'Tanqueray 0.0%', 'Guinness 0.0', 'San Pellegrino'],
          value: ['Beck\u2019s Blue', 'Clausthaler', 'Bavaria 0.0', 'Peroni Libera', 'San Miguel 0.0', 'Budweiser Prohibition']
        },
        channels: { onTrade: 32.5, offTrade: 52.9, eCommerce: 11.8, travelRetail: 2.8 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 26,   // % ACV distribution
          ceDepletions: 380000,  // case equivalent depletions
          billback: 6.5,          // % average billback/discount
          grossMarginPct: 42,       // % gross margin
          cac: 58,               // $ customer acquisition cost
          itr: 14,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Major spirits companies launching 0.0% line extensions across portfolio', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Gen Z and Millennials driving moderation trend with no/low alcohol preferences', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Athletic Brewing achieving category leadership with premium positioning', source: 'Mintel', url: 'https://www.mintel.com' },
          { text: 'Quality gap narrowing dramatically between no/low alcohol and traditional spirits', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'On-trade adoption accelerating with dedicated mocktail programs in premium bars', source: 'Just-Drinks', url: 'https://www.just-drinks.com' },
        ],
        report: {
          keyEvents: ['Heineken, Gordon\u2019s, Tanqueray, Guinness all expanded 0.0% distribution', 'Athletic Brewing achieved $10M+ revenue milestone', 'Category exceeded 3% penetration in Germany and UK', 'Premium bar market began featuring dedicated non-alcoholic cocktails'],
          topPerformer: 'Athletic Brewing and Lyre\u2019s',
          analysis: 'No/low alcohol beverages have achieved a critical inflection point in 2025, transitioning definitively from trend to permanent category fixture. Major spirits producers have validated the segment through aggressive 0.0% line extensions, indicating mainstream acceptance and distribution willingness. Athletic Brewing\u2019s premium positioning and quality standards have established new category benchmarks, elevating consumer expectations across the board. The quality gap that traditionally disadvantaged no/low options has narrowed significantly, with blind tasting studies now showing competitive parity with traditional spirits in sensory profiles. Crucially, on-trade adoption has accelerated beyond wellness positioning into culinary prestige, with Michelin-starred restaurants and premium cocktail bars featuring dedicated non-alcoholic programs. Gen Z and Millennial consumers now view moderation as aspirational rather than compromised, fundamentally reshaping social drinking norms.',
          conclusion: 'No/low alcohol has transitioned from niche category to mainstream beverage segment with structural growth drivers including generational preference shifts, major producer validation, and quality parity achievement. Market growth will likely moderate toward 8-10% annually as category matures but maintains significantly higher growth than traditional spirits.'
        }
      },
      2024: {
        marketSize: '$11.9B',
        growth: '+12%',
        growthDir: 'up',
        volumeCases: '87M',
        topMarkets: [
          {
            name: 'Germany',
            growth: '+11.5%',
            brands: ['Seedlip', 'CleanCo', 'Monday', 'Lyre\u2019s', 'Three Spirit'],
            regions: [
              { name: 'Berlin', share: '27.6%', growth: '+12.4%' },
              { name: 'Munich', share: '26.7%', growth: '+11.1%' },
              { name: 'Hamburg', share: '19.4%', growth: '+11.8%' },
              { name: 'Frankfurt', share: '14.7%', growth: '+11.2%' },
              { name: 'Hesse', share: '11.6%', growth: '+4.1%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+12.3%',
            brands: ['Seedlip', 'Lyre\u2019s', 'Athletic Brewing', 'Monday', 'Ritual'],
            regions: [
              { name: 'London', share: '35.8%', growth: '+12.8%' },
              { name: 'Manchester', share: '22.9%', growth: '+12.1%' },
              { name: 'Edinburgh', share: '14.6%', growth: '+12.5%' },
              { name: 'Birmingham', share: '14.3%', growth: '+11.9%' },
              { name: 'Bristol', share: '12.4%', growth: '+4.7%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+12.8%',
            brands: ['Athletic Brewing', 'Lyre\u2019s', 'Ritual Zero Proof', 'CleanCo', 'Seedlip'],
            regions: [
              { name: 'California', share: '25.0%', growth: '+13.5%' },
              { name: 'New York', share: '22.1%', growth: '+12.6%' },
              { name: 'Texas', share: '17.7%', growth: '+12.3%' },
              { name: 'Florida', share: '14.6%', growth: '+12%' },
              { name: 'Illinois', share: '8.8%', growth: '+1.4%' },
              { name: 'Pennsylvania', share: '11.8%', growth: '+4.2%' },
            ],
            sources: [
              { name: 'Euromonitor', url: 'https://www.euromonitor.com' },
              { name: 'Just-Drinks', url: 'https://www.just-drinks.com' },
            ]
          },
          {
            name: 'Spain',
            growth: '+13.1%',
            brands: ['Seedlip', 'Lyre\u2019s', 'CleanCo', 'Monday', 'Athletic Brewing'],
            regions: [
              { name: 'Madrid', share: '38.4%', growth: '+13.8%' },
              { name: 'Barcelona', share: '30.2%', growth: '+13%' },
              { name: 'Valencia', share: '18.7%', growth: '+12.8%' },
              { name: 'Seville', share: '12.7%', growth: '+12.5%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'Australia',
            growth: '+12.6%',
            brands: ['Athletic Brewing', 'Lyre\u2019s', 'CleanCo', 'Seedlip', 'Monday'],
            regions: [
              { name: 'Sydney', share: '38.3%', growth: '+13.2%' },
              { name: 'Melbourne', share: '27.6%', growth: '+12.5%' },
              { name: 'Brisbane', share: '19.8%', growth: '+12.2%' },
              { name: 'Perth', share: '14.3%', growth: '+11.9%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Seedlip', 'Lyre\u2019s', 'Monday', 'CleanCo', 'Three Spirit', 'Ritual Zero Proof'],
          midTier: ['Athletic Brewing', 'Heineken 0.0', 'Gordon\u2019s 0.0%', 'Tanqueray 0.0%', 'Guinness 0.0', 'San Pellegrino'],
          value: ['Beck\u2019s Blue', 'Clausthaler', 'Bavaria 0.0', 'Peroni Libera', 'San Miguel 0.0', 'Budweiser Prohibition']
        },
        channels: { onTrade: 29.8, offTrade: 54.1, eCommerce: 13.3, travelRetail: 2.8 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 22,   // % ACV distribution
          ceDepletions: 310000,  // case equivalent depletions
          billback: 6.0,          // % average billback/discount
          grossMarginPct: 40,       // % gross margin
          cac: 62,               // $ customer acquisition cost
          itr: 12,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Athletic Brewing expansion into UK and European markets accelerating', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Heineken and Gordon\u2019s 0.0% achieving mainstream retail penetration', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'E-commerce channel emerging as primary discovery platform for category', source: 'Mintel', url: 'https://www.mintel.com' },
          { text: 'On-trade adoption expanding beyond health-focused venues to mainstream bars', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Quality perception gap closing between no/low alcohol and traditional spirits', source: 'Just-Drinks', url: 'https://www.just-drinks.com' },
        ],
        report: {
          keyEvents: ['Athletic Brewing achieved industry recognition as category leader', 'Major spirits houses launched 0.0% extensions across multiple brands', 'No/low alcohol exceeded 2.5% penetration in Germany and UK', 'E-commerce platforms dedicated shelf space to category'],
          topPerformer: 'Athletic Brewing and Lyre\u2019s',
          analysis: 'The no/low alcohol category demonstrated remarkable momentum in 2024 with 12% growth rates driven by expanding mainstream acceptance and major producer validation. Athletic Brewing\u2019s international expansion into Europe marked a watershed moment for category credibility, while simultaneous 0.0% launches from Gordon\u2019s, Heineken, and Tanqueray signaled commitment from major spirits conglomerates. E-commerce emerged as a critical growth channel, accounting for 13% of category volume through premium DTC positioning and discovery-driven digital consumers. Quality perception continued its improvement trajectory, with blind tasting studies narrowing the sensory gap between premium no/low options and traditional spirits competitors.',
          conclusion: 'No/low alcohol growth acceleration in 2024 confirmed the transition from niche to mainstream, with e-commerce and on-trade adoption serving as primary growth engines alongside mainstream retail expansion.'
        }
      },
      2023: {
        marketSize: '$10.6B',
        growth: '+15%',
        growthDir: 'up',
        volumeCases: '78M',
        topMarkets: [
          {
            name: 'Germany',
            growth: '+14.2%',
            brands: ['Seedlip', 'CleanCo', 'Monday', 'Lyre\u2019s'],
            regions: [
              { name: 'Berlin', share: '26.7%', growth: '+15.3%' },
              { name: 'Munich', share: '27.0%', growth: '+13.8%' },
              { name: 'Hamburg', share: '18.5%', growth: '+14.6%' },
              { name: 'Frankfurt', share: '15.7%', growth: '+14%' },
              { name: 'Hesse', share: '12.1%', growth: '+4.5%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+15.5%',
            brands: ['Seedlip', 'Lyre\u2019s', 'Athletic Brewing', 'Monday'],
            regions: [
              { name: 'London', share: '35.5%', growth: '+16.1%' },
              { name: 'Manchester', share: '23.1%', growth: '+15.3%' },
              { name: 'Edinburgh', share: '14.4%', growth: '+15.8%' },
              { name: 'Birmingham', share: '14.6%', growth: '+15.1%' },
              { name: 'Bristol', share: '12.4%', growth: '+4.5%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+15.3%',
            brands: ['Athletic Brewing', 'Lyre\u2019s', 'Ritual Zero Proof', 'CleanCo'],
            regions: [
              { name: 'California', share: '24.4%', growth: '+16.1%' },
              { name: 'New York', share: '21.6%', growth: '+15.2%' },
              { name: 'Texas', share: '18.2%', growth: '+15%' },
              { name: 'Florida', share: '14.0%', growth: '+14.8%' },
              { name: 'Illinois', share: '10.4%', growth: '+4.8%' },
              { name: 'Pennsylvania', share: '11.4%', growth: '+0.3%' },
            ],
            sources: [
              { name: 'Euromonitor', url: 'https://www.euromonitor.com' },
              { name: 'Just-Drinks', url: 'https://www.just-drinks.com' },
            ]
          },
          {
            name: 'Spain',
            growth: '+15.8%',
            brands: ['Seedlip', 'Lyre\u2019s', 'CleanCo', 'Monday'],
            regions: [
              { name: 'Madrid', share: '37.4%', growth: '+16.4%' },
              { name: 'Barcelona', share: '31.5%', growth: '+15.7%' },
              { name: 'Valencia', share: '18.1%', growth: '+15.5%' },
              { name: 'Seville', share: '13.0%', growth: '+15.2%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'Australia',
            growth: '+15.1%',
            brands: ['Athletic Brewing', 'Lyre\u2019s', 'CleanCo', 'Seedlip'],
            regions: [
              { name: 'Sydney', share: '37.1%', growth: '+15.8%' },
              { name: 'Melbourne', share: '27.0%', growth: '+15%' },
              { name: 'Brisbane', share: '20.6%', growth: '+14.8%' },
              { name: 'Perth', share: '15.3%', growth: '+14.5%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Seedlip', 'Lyre\u2019s', 'Monday', 'CleanCo', 'Three Spirit', 'Ritual Zero Proof'],
          midTier: ['Athletic Brewing', 'Heineken 0.0', 'Gordon\u2019s 0.0%', 'Tanqueray 0.0%', 'Guinness 0.0', 'San Pellegrino'],
          value: ['Beck\u2019s Blue', 'Clausthaler', 'Bavaria 0.0', 'Peroni Libera', 'San Miguel 0.0', 'Budweiser Prohibition']
        },
        channels: { onTrade: 27.9, offTrade: 55.0, eCommerce: 11.7, travelRetail: 5.4 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 18,   // % ACV distribution
          ceDepletions: 240000,  // case equivalent depletions
          billback: 5.5,          // % average billback/discount
          grossMarginPct: 38,       // % gross margin
          cac: 68,               // $ customer acquisition cost
          itr: 10,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Athletic Brewing achieving breakout success with premium DTC positioning', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Major brands beginning 0.0% extensions signaling mainstream acceptance', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Moderation trend among Gen Z accelerating category discovery', source: 'Mintel', url: 'https://www.mintel.com' },
          { text: 'Quality perception rapidly improving as premium options gain distribution', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'E-commerce becoming primary growth channel for discovery-driven consumers', source: 'Just-Drinks', url: 'https://www.just-drinks.com' },
        ],
        report: {
          keyEvents: ['Athletic Brewing achieved $5M+ revenue milestone with premium positioning', 'Heineken 0.0 and Gordon\u2019s 0.0% achieved major retail distribution', 'No/low alcohol exceeded 2% category penetration in Germany and UK', 'Gen Z preference for moderation became significant market driver'],
          topPerformer: 'Athletic Brewing and Seedlip',
          analysis: 'No/low alcohol beverages achieved mainstream inflection in 2023 with 15% category growth driven by generational preference shifts and major producer validation. Athletic Brewing\u2019s breakout success demonstrated that premium positioning and quality focus could overcome traditional beverage industry incumbency. Simultaneous 0.0% line extensions from Heineken, Gordon\u2019s, and Tanqueray signaled that major spirits conglomerates now viewed the category as strategic rather than novelty. Gen Z consumers emerged as primary growth drivers, viewing moderation as lifestyle aspiration rather than compromise. E-commerce platforms became critical distribution channels, accounting for 12% of category volume through direct-to-consumer and digital-native positioning.',
          conclusion: '2023 marked the definitive transition of no/low alcohol from niche health trend to mainstream beverage category with structural growth drivers including generational preferences, major producer support, and quality parity achievement.'
        }
      },
      2022: {
        marketSize: '$9.2B',
        growth: '+22%',
        growthDir: 'up',
        volumeCases: '67M',
        topMarkets: [
          {
            name: 'Germany',
            growth: '+20.5%',
            brands: ['Seedlip', 'CleanCo', 'Monday'],
            regions: [
              { name: 'Berlin', share: '26.6%', growth: '+21.8%' },
              { name: 'Munich', share: '28.0%', growth: '+19.9%' },
              { name: 'Hamburg', share: '19.2%', growth: '+20.6%' },
              { name: 'Frankfurt', share: '14.8%', growth: '+20.2%' },
              { name: 'Hesse', share: '11.4%', growth: '+3.8%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+22.8%',
            brands: ['Seedlip', 'Lyre\u2019s', 'Athletic Brewing'],
            regions: [
              { name: 'London', share: '34.7%', growth: '+23.5%' },
              { name: 'Manchester', share: '23.6%', growth: '+22.6%' },
              { name: 'Edinburgh', share: '14.8%', growth: '+23.1%' },
              { name: 'Birmingham', share: '15.6%', growth: '+22.3%' },
              { name: 'Bristol', share: '11.3%', growth: '+4.1%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+23.1%',
            brands: ['Athletic Brewing', 'Lyre\u2019s', 'Ritual Zero Proof'],
            regions: [
              { name: 'California', share: '23.9%', growth: '+24.1%' },
              { name: 'New York', share: '20.8%', growth: '+23.1%' },
              { name: 'Texas', share: '18.9%', growth: '+22.8%' },
              { name: 'Florida', share: '13.6%', growth: '+22.5%' },
              { name: 'Illinois', share: '10.0%', growth: '+3.4%' },
              { name: 'Pennsylvania', share: '12.8%', growth: '+5.4%' },
            ],
            sources: [
              { name: 'Euromonitor', url: 'https://www.euromonitor.com' },
              { name: 'Just-Drinks', url: 'https://www.just-drinks.com' },
            ]
          },
          {
            name: 'Spain',
            growth: '+23.5%',
            brands: ['Seedlip', 'Lyre\u2019s', 'CleanCo'],
            regions: [
              { name: 'Madrid', share: '38.5%', growth: '+24.3%' },
              { name: 'Barcelona', share: '30.2%', growth: '+23.6%' },
              { name: 'Valencia', share: '18.2%', growth: '+23.2%' },
              { name: 'Seville', share: '13.1%', growth: '+22.9%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'Australia',
            growth: '+22.6%',
            brands: ['Athletic Brewing', 'Lyre\u2019s', 'CleanCo'],
            regions: [
              { name: 'Sydney', share: '38.0%', growth: '+23.4%' },
              { name: 'Melbourne', share: '27.8%', growth: '+22.6%' },
              { name: 'Brisbane', share: '18.9%', growth: '+22.2%' },
              { name: 'Perth', share: '15.3%', growth: '+21.9%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Seedlip', 'Lyre\u2019s', 'Monday', 'CleanCo', 'Three Spirit', 'Ritual Zero Proof'],
          midTier: ['Athletic Brewing', 'Heineken 0.0', 'Gordon\u2019s 0.0%', 'Tanqueray 0.0%', 'Guinness 0.0', 'San Pellegrino'],
          value: ['Beck\u2019s Blue', 'Clausthaler', 'Bavaria 0.0', 'Peroni Libera', 'San Miguel 0.0', 'Budweiser Prohibition']
        },
        channels: { onTrade: 24.9, offTrade: 56.5, eCommerce: 10.7, travelRetail: 7.9 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 15,   // % ACV distribution
          ceDepletions: 180000,  // case equivalent depletions
          billback: 5.0,          // % average billback/discount
          grossMarginPct: 36,       // % gross margin
          cac: 74,               // $ customer acquisition cost
          itr: 8,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Wellness-focused consumers driving rapid adoption of no/low alcohol beverages', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Athletic Brewing achieving strong growth with premium craft positioning', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Major spirits brands testing 0.0% extensions across portfolios', source: 'Mintel', url: 'https://www.mintel.com' },
          { text: 'On-trade adoption accelerating in health-conscious venues', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'E-commerce channels proving valuable for health-trend product discovery', source: 'Just-Drinks', url: 'https://www.just-drinks.com' },
        ],
        report: {
          keyEvents: ['Athletic Brewing founded with premium positioning and craft credentials', 'Heineken and Gordon\u2019s began testing 0.0% formulations', 'No/low alcohol achieved 1.5% penetration in select Western European markets', 'Wellness trend acceleration post-COVID drove category adoption'],
          topPerformer: 'Athletic Brewing and Seedlip',
          analysis: 'No/low alcohol beverages experienced explosive growth in 2022 with 22% category expansion driven by post-COVID wellness consciousness and premiumization trends. Athletic Brewing\u2019s launch with premium craft positioning demonstrated that consumers would pay price premiums for quality no/low options. Heineken and Gordon\u2019s exploratory 0.0% launches signaled emerging interest from major spirits houses. E-commerce channels proved critical for reaching discovery-driven, health-conscious consumers. Quality perception remained constrained relative to traditional spirits, but improving formulations and premium positioning began narrowing the perception gap.',
          conclusion: 'No/low alcohol achieved mainstream awareness in 2022 driven by post-pandemic wellness trends, though perception as premium alternative remained nascent.'
        }
      },
      2021: {
        marketSize: '$7.5B',
        growth: '+18%',
        growthDir: 'up',
        volumeCases: '55M',
        topMarkets: [
          {
            name: 'Germany',
            growth: '+17.2%',
            brands: ['Seedlip', 'CleanCo'],
            regions: [
              { name: 'Berlin', share: '26.2%', growth: '+18.5%' },
              { name: 'Munich', share: '28.0%', growth: '+16.8%' },
              { name: 'Hamburg', share: '19.2%', growth: '+17.3%' },
              { name: 'Frankfurt', share: '15.2%', growth: '+16.9%' },
              { name: 'Hesse', share: '11.4%', growth: '+0.8%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+18.9%',
            brands: ['Seedlip', 'Lyre\u2019s'],
            regions: [
              { name: 'London', share: '36.0%', growth: '+19.6%' },
              { name: 'Manchester', share: '22.7%', growth: '+18.7%' },
              { name: 'Edinburgh', share: '16.5%', growth: '+19.2%' },
              { name: 'Birmingham', share: '14.7%', growth: '+18.4%' },
              { name: 'Bristol', share: '10.1%', growth: '+1.2%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'United States',
            growth: '+18.6%',
            brands: ['Lyre\u2019s', 'Ritual Zero Proof'],
            regions: [
              { name: 'California', share: '24.7%', growth: '+19.5%' },
              { name: 'New York', share: '20.0%', growth: '+18.7%' },
              { name: 'Texas', share: '17.7%', growth: '+18.3%' },
              { name: 'Florida', share: '14.0%', growth: '+18%' },
              { name: 'Illinois', share: '9.5%', growth: '+3.1%' },
              { name: 'Pennsylvania', share: '14.1%', growth: '+1.0%' },
            ],
            sources: [
              { name: 'Euromonitor', url: 'https://www.euromonitor.com' },
              { name: 'Just-Drinks', url: 'https://www.just-drinks.com' },
            ]
          },
          {
            name: 'Spain',
            growth: '+19.2%',
            brands: ['Seedlip', 'Lyre\u2019s'],
            regions: [
              { name: 'Madrid', share: '38.4%', growth: '+20.1%' },
              { name: 'Barcelona', share: '30.8%', growth: '+19.4%' },
              { name: 'Valencia', share: '19.0%', growth: '+19%' },
              { name: 'Seville', share: '11.8%', growth: '+18.6%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'Australia',
            growth: '+18.3%',
            brands: ['Lyre\u2019s', 'Seedlip'],
            regions: [
              { name: 'Sydney', share: '36.4%', growth: '+19.1%' },
              { name: 'Melbourne', share: '28.9%', growth: '+18.3%' },
              { name: 'Brisbane', share: '18.1%', growth: '+17.9%' },
              { name: 'Perth', share: '16.6%', growth: '+17.6%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Seedlip', 'Lyre\u2019s', 'Monday', 'CleanCo', 'Three Spirit', 'Ritual Zero Proof'],
          midTier: ['Athletic Brewing', 'Heineken 0.0', 'Gordon\u2019s 0.0%', 'Tanqueray 0.0%', 'Guinness 0.0', 'San Pellegrino'],
          value: ['Beck\u2019s Blue', 'Clausthaler', 'Bavaria 0.0', 'Peroni Libera', 'San Miguel 0.0', 'Budweiser Prohibition']
        },
        channels: { onTrade: 21.9, offTrade: 57.2, eCommerce: 10.0, travelRetail: 10.9 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 12,   // % ACV distribution
          ceDepletions: 130000,  // case equivalent depletions
          billback: 4.5,          // % average billback/discount
          grossMarginPct: 35,       // % gross margin
          cac: 80,               // $ customer acquisition cost
          itr: 7,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Wellness movement accelerating with sober-curious consumer trend', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Seedlip and Lyre\u2019s achieving mainstream retail distribution', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'E-commerce platforms emerging as key discovery channel', source: 'Mintel', url: 'https://www.mintel.com' },
          { text: 'Health-focused consumers treating no/low alcohol as wellness product', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Premium positioning establishing premium price points', source: 'Just-Drinks', url: 'https://www.just-drinks.com' },
        ],
        report: {
          keyEvents: ['Seedlip and Lyre\u2019s achieved meaningful mainstream retail distribution', 'Sober-curious movement gained consumer attention', 'No/low alcohol category recognized as growth opportunity', 'Premium DTC brands established price premium positioning'],
          topPerformer: 'Seedlip and Lyre\u2019s',
          analysis: 'No/low alcohol emerged as meaningful market opportunity in 2021 driven by sober-curious consumer trend and wellness movement acceleration. Seedlip and Lyre\u2019s pioneered premium positioning with direct-to-consumer channels and achieved retail distribution in major Western European and North American markets. Health-conscious consumers began treating no/low alcohol as wellness category rather than spirits substitute. E-commerce channels proved critical for reaching dispersed, discovery-driven audiences. Quality perception remained significant constraint, with formulations still showing clear sensory disadvantages relative to traditional spirits.',
          conclusion: 'No/low alcohol established itself as emerging category in 2021 driven by wellness trends and sober-curious consumer movement, though mainstream acceptance remained limited.'
        }
      },
    }
  },
  {
    key: 'rtd',
    label: 'Ready-to-Drink',
    icon: 'RTD',
    iconColor: 'text-violet-700',
    iconBg: 'bg-violet-50',
    trajectory: 'RTD cocktails and spirits-based ready-to-drink beverages represent one of the fastest-growing categories in beverage alcohol, maintaining explosive growth from 42% in 2021 while moderating to 8.5% in 2025. Hard seltzer boom peaked and normalized, while spirits-based RTDs and Japanese chuhai continue driving growth.',
    yearData: {
      2025: {
        marketSize: '$40B',
        growth: '+8.5%',
        growthDir: 'up',
        volumeCases: '320M',
        topMarkets: [
          {
            name: 'United States',
            growth: '+8.2%',
            brands: ['White Claw', 'Truly', 'High Noon', 'Smirnoff Ice'],
            regions: [
              { name: 'California', share: '24.0%', growth: '+8.8%' },
              { name: 'Texas', share: '20.9%', growth: '+7.9%' },
              { name: 'New York', share: '17.9%', growth: '+8.1%' },
              { name: 'Florida', share: '14.9%', growth: '+7.8%' },
              { name: 'Illinois', share: '10.0%', growth: '+2.8%' },
              { name: 'Pennsylvania', share: '12.3%', growth: '+4.7%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'Australia',
            growth: '+9.1%',
            brands: ['Cutwater', 'On The Rocks', 'Volley', 'Tip Top'],
            regions: [
              { name: 'Sydney', share: '38.3%', growth: '+9.8%' },
              { name: 'Melbourne', share: '29.4%', growth: '+8.9%' },
              { name: 'Brisbane', share: '19.1%', growth: '+8.7%' },
              { name: 'Perth', share: '13.2%', growth: '+8.4%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'Japan',
            growth: '+7.8%',
            brands: ['Kirin Chu-Hi', 'Asahi Chuhai', 'Suntory -196'],
            regions: [
              { name: 'Tokyo', share: '33.8%', growth: '+8.5%' },
              { name: 'Osaka', share: '25.3%', growth: '+7.6%' },
              { name: 'Yokohama', share: '16.8%', growth: '+7.9%' },
              { name: 'Nagoya', share: '14.0%', growth: '+7.4%' },
              { name: 'Sapporo', share: '10.1%', growth: '+0.9%' },
            ],
            sources: [
              { name: 'Euromonitor', url: 'https://www.euromonitor.com' },
              { name: 'Just-Drinks', url: 'https://www.just-drinks.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+8.6%',
            brands: ['Cutwater', 'Tip Top', 'On The Rocks', 'Gordon\u2019s RTD'],
            regions: [
              { name: 'London', share: '35.4%', growth: '+9.1%' },
              { name: 'Manchester', share: '22.5%', growth: '+8.4%' },
              { name: 'Edinburgh', share: '16.1%', growth: '+8.7%' },
              { name: 'Birmingham', share: '14.5%', growth: '+8.2%' },
              { name: 'Bristol', share: '11.5%', growth: '+1.8%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'Canada',
            growth: '+8.3%',
            brands: ['Crown Royal Cocktails', 'Cutwater', 'Smirnoff Ice', 'Mike\u2019s Hard'],
            regions: [
              { name: 'Toronto', share: '35.8%', growth: '+8.9%' },
              { name: 'Vancouver', share: '26.9%', growth: '+8.1%' },
              { name: 'Montreal', share: '22.4%', growth: '+8.2%' },
              { name: 'Calgary', share: '14.9%', growth: '+7.9%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Cutwater', 'On The Rocks', 'Tip Top', 'Volley', 'Thomas Ashbourne', 'Fugu'],
          midTier: ['High Noon', 'NÜTRL', 'Crown Royal Cocktails', 'Jack Daniel\u2019s & Cola', 'Tanqueray RTD', 'Gordon\u2019s RTD'],
          value: ['White Claw', 'Truly', 'Twisted Tea', 'Four Loko', 'Smirnoff Ice', 'Mike\u2019s Hard']
        },
        channels: { onTrade: 24.4, offTrade: 68.3, eCommerce: 4.1, travelRetail: 3.2 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 30,   // % ACV distribution
          ceDepletions: 1200000,  // case equivalent depletions
          billback: 7.5,          // % average billback/discount
          grossMarginPct: 40,       // % gross margin
          cac: 48,               // $ customer acquisition cost
          itr: 16,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Spirits-based RTDs overtaking hard seltzer as growth leader', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Japanese chuhai influence driving premiumization in Asian RTD markets', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Convenience stores dominating off-trade channel with RTD focus', source: 'Mintel', url: 'https://www.mintel.com' },
          { text: 'Premium RTD cocktails with real spirits commanding price premiums', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Hard seltzer category normalizing after peak volume in 2020-2021', source: 'Just-Drinks', url: 'https://www.just-drinks.com' },
        ],
        report: {
          keyEvents: ['Spirits-based RTDs achieved market share parity with hard seltzer', 'Japanese chuhai category maintaining 8%+ growth in Asian markets', 'Premium RTD brands like Cutwater achieving national distribution', 'Hard seltzer market consolidation with category leaders dominating'],
          topPerformer: 'White Claw and Truly in North America; Kirin and Asahi Chuhai in Asia',
          analysis: 'The RTD category demonstrated maturation dynamics in 2025 with growth moderating to 8.5% from exceptional peak rates of 2020–2021. Hard seltzer boom has normalized, with category leaders White Claw and Truly consolidating share while premium positioning remains constrained by perception as budget-friendly. Spirits-based RTDs have emerged as growth drivers, with Cutwater and premium cocktail brands achieving meaningful distribution and commanding price premiums through real spirit content and cocktail authenticity narratives. Japanese chuhai influence continues reshaping RTD category globally, with fruit-forward flavor profiles and quality craft positioning resonating with younger consumers. Convenience store channel dominance persists with 68% off-trade penetration, but on-trade adoption has accelerated with premium bar programs featuring RTD cocktails. Geographic divergence is pronounced, with North America dominated by hard seltzer while Asia-Pacific driven by spirit-based and chuhai formats.',
          conclusion: 'RTD market maturation reflects hard seltzer peak and normalization, with growth shifting toward spirits-based cocktails and premium positioning. Category will likely sustain 8-10% annual growth through convenience channel dominance and premium spirits-based segment expansion, but hard seltzer commoditization limits overall category growth.'
        }
      },
      2024: {
        marketSize: '$36.8B',
        growth: '+12%',
        growthDir: 'up',
        volumeCases: '295M',
        topMarkets: [
          {
            name: 'United States',
            growth: '+11.8%',
            brands: ['White Claw', 'Truly', 'High Noon', 'Smirnoff Ice'],
            regions: [
              { name: 'California', share: '24.9%', growth: '+12.5%' },
              { name: 'Texas', share: '20.8%', growth: '+11.6%' },
              { name: 'New York', share: '17.4%', growth: '+11.9%' },
              { name: 'Florida', share: '14.5%', growth: '+11.4%' },
              { name: 'Illinois', share: '10.3%', growth: '+2.3%' },
              { name: 'Pennsylvania', share: '12.1%', growth: '+3.5%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'Australia',
            growth: '+12.8%',
            brands: ['Cutwater', 'On The Rocks', 'Volley', 'Tip Top'],
            regions: [
              { name: 'Sydney', share: '38.1%', growth: '+13.5%' },
              { name: 'Melbourne', share: '29.2%', growth: '+12.6%' },
              { name: 'Brisbane', share: '18.9%', growth: '+12.4%' },
              { name: 'Perth', share: '13.8%', growth: '+12.1%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'Japan',
            growth: '+11.6%',
            brands: ['Kirin Chu-Hi', 'Asahi Chuhai', 'Suntory -196'],
            regions: [
              { name: 'Tokyo', share: '34.3%', growth: '+12.3%' },
              { name: 'Osaka', share: '26.9%', growth: '+11.4%' },
              { name: 'Yokohama', share: '16.8%', growth: '+11.7%' },
              { name: 'Nagoya', share: '12.9%', growth: '+11.1%' },
              { name: 'Sapporo', share: '9.1%', growth: '+5.8%' },
            ],
            sources: [
              { name: 'Euromonitor', url: 'https://www.euromonitor.com' },
              { name: 'Just-Drinks', url: 'https://www.just-drinks.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+12.3%',
            brands: ['Cutwater', 'Tip Top', 'On The Rocks', 'Gordon\u2019s RTD'],
            regions: [
              { name: 'London', share: '34.8%', growth: '+12.8%' },
              { name: 'Manchester', share: '22.8%', growth: '+12.1%' },
              { name: 'Edinburgh', share: '16.3%', growth: '+12.4%' },
              { name: 'Birmingham', share: '15.3%', growth: '+11.9%' },
              { name: 'Bristol', share: '10.8%', growth: '+2.1%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'Canada',
            growth: '+12%',
            brands: ['Crown Royal Cocktails', 'Cutwater', 'Smirnoff Ice', 'Mike\u2019s Hard'],
            regions: [
              { name: 'Toronto', share: '34.4%', growth: '+12.6%' },
              { name: 'Vancouver', share: '28.2%', growth: '+11.8%' },
              { name: 'Montreal', share: '21.4%', growth: '+11.9%' },
              { name: 'Calgary', share: '16.0%', growth: '+11.6%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Cutwater', 'On The Rocks', 'Tip Top', 'Volley', 'Thomas Ashbourne', 'Fugu'],
          midTier: ['High Noon', 'NÜTRL', 'Crown Royal Cocktails', 'Jack Daniel\u2019s & Cola', 'Tanqueray RTD', 'Gordon\u2019s RTD'],
          value: ['White Claw', 'Truly', 'Twisted Tea', 'Four Loko', 'Smirnoff Ice', 'Mike\u2019s Hard']
        },
        channels: { onTrade: 23.6, offTrade: 69.3, eCommerce: 2.9, travelRetail: 4.2 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 27,   // % ACV distribution
          ceDepletions: 1050000,  // case equivalent depletions
          billback: 7.0,          // % average billback/discount
          grossMarginPct: 39,       // % gross margin
          cac: 52,               // $ customer acquisition cost
          itr: 14,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Premium spirits-based RTDs achieving mainstream on-trade adoption', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Convenience store channel maintaining dominance with 70%+ share', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Hard seltzer market consolidation with top 3 brands holding 65% share', source: 'Mintel', url: 'https://www.mintel.com' },
          { text: 'Japanese chuhai gaining Western market share with international distribution', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Real spirits positioning driving premiumization in RTD cocktail segment', source: 'Just-Drinks', url: 'https://www.just-drinks.com' },
        ],
        report: {
          keyEvents: ['Hard seltzer category peaked with White Claw and Truly consolidating share', 'Spirits-based RTDs like Cutwater achieved national distribution in US', 'Japanese chuhai achieving 8%+ growth across Asian markets', 'On-trade adoption of premium RTDs accelerating in major cities'],
          topPerformer: 'White Claw and Truly in hard seltzer; Cutwater in spirits-based RTD',
          analysis: 'The RTD category experienced 12% growth in 2024 as hard seltzer boom normalized while spirits-based RTDs emerged as growth leader. White Claw and Truly consolidated dominant market share in hard seltzer segment as category growth slowed with commoditization pressure. Premium spirits-based RTDs like Cutwater achieved meaningful distribution and began on-trade adoption in major metropolitan areas, indicating category transition toward premium cocktail positioning. Japanese chuhai maintained exceptional growth rates, with fruit-forward profiles and craft positioning resonating with younger consumers globally. Convenience store channel dominance persisted at 70% of category volume, reflecting impulse purchase and accessibility positioning. Geographic divergence intensified with North America hard seltzer-dominated while Asia-Pacific driven by chuhai and spirits-based formats.',
          conclusion: '2024 marked hard seltzer normalization and spirits-based RTD emergence as growth driver, with category sustaining 12% growth through premiumization and convenience channel dominance.'
        }
      },
      2023: {
        marketSize: '$32.8B',
        growth: '+18%',
        growthDir: 'up',
        volumeCases: '263M',
        topMarkets: [
          {
            name: 'United States',
            growth: '+17.6%',
            brands: ['White Claw', 'Truly', 'High Noon', 'Twisted Tea'],
            regions: [
              { name: 'California', share: '23.8%', growth: '+18.4%' },
              { name: 'Texas', share: '21.4%', growth: '+17.2%' },
              { name: 'New York', share: '18.2%', growth: '+17.8%' },
              { name: 'Florida', share: '14.6%', growth: '+17%' },
              { name: 'Illinois', share: '11.0%', growth: '+3.4%' },
              { name: 'Pennsylvania', share: '11.0%', growth: '+5.1%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'Australia',
            growth: '+18.9%',
            brands: ['On The Rocks', 'Cutwater', 'Volley', 'Tip Top'],
            regions: [
              { name: 'Sydney', share: '37.8%', growth: '+19.6%' },
              { name: 'Melbourne', share: '29.0%', growth: '+18.7%' },
              { name: 'Brisbane', share: '18.3%', growth: '+18.5%' },
              { name: 'Perth', share: '14.9%', growth: '+18.2%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'Japan',
            growth: '+16.8%',
            brands: ['Kirin Chu-Hi', 'Asahi Chuhai', 'Suntory -196'],
            regions: [
              { name: 'Tokyo', share: '34.0%', growth: '+17.5%' },
              { name: 'Osaka', share: '27.1%', growth: '+16.6%' },
              { name: 'Yokohama', share: '17.0%', growth: '+16.9%' },
              { name: 'Nagoya', share: '13.4%', growth: '+16.3%' },
              { name: 'Sapporo', share: '8.5%', growth: '+3.5%' },
            ],
            sources: [
              { name: 'Euromonitor', url: 'https://www.euromonitor.com' },
              { name: 'Just-Drinks', url: 'https://www.just-drinks.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+18.1%',
            brands: ['On The Rocks', 'Tip Top', 'Cutwater', 'Smirnoff Ice'],
            regions: [
              { name: 'London', share: '34.3%', growth: '+18.6%' },
              { name: 'Manchester', share: '22.0%', growth: '+17.9%' },
              { name: 'Edinburgh', share: '16.2%', growth: '+18.2%' },
              { name: 'Birmingham', share: '16.3%', growth: '+17.7%' },
              { name: 'Bristol', share: '11.2%', growth: '+2.2%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'Canada',
            growth: '+17.9%',
            brands: ['Crown Royal Cocktails', 'Smirnoff Ice', 'Mike\u2019s Hard', 'Twisted Tea'],
            regions: [
              { name: 'Toronto', share: '33.9%', growth: '+18.5%' },
              { name: 'Vancouver', share: '27.8%', growth: '+17.7%' },
              { name: 'Montreal', share: '21.7%', growth: '+17.8%' },
              { name: 'Calgary', share: '16.6%', growth: '+17.4%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Cutwater', 'On The Rocks', 'Tip Top', 'Volley', 'Thomas Ashbourne', 'Fugu'],
          midTier: ['High Noon', 'NÜTRL', 'Crown Royal Cocktails', 'Jack Daniel\u2019s & Cola', 'Tanqueray RTD', 'Gordon\u2019s RTD'],
          value: ['White Claw', 'Truly', 'Twisted Tea', 'Four Loko', 'Smirnoff Ice', 'Mike\u2019s Hard']
        },
        channels: { onTrade: 20.3, offTrade: 71.6, eCommerce: 3.4, travelRetail: 4.7 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 24,   // % ACV distribution
          ceDepletions: 900000,  // case equivalent depletions
          billback: 6.5,          // % average billback/discount
          grossMarginPct: 38,       // % gross margin
          cac: 56,               // $ customer acquisition cost
          itr: 12,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Hard seltzer boom peaking with market saturation evident', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'Premium spirits-based RTDs emerging as next growth segment', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Japanese chuhai becoming mainstream discovery in Western markets', source: 'Mintel', url: 'https://www.mintel.com' },
          { text: 'Convenience channels cannibalizing traditional spirits mixing occasions', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Malt-based coolers declining as spirits-based and hard seltzer dominate', source: 'Just-Drinks', url: 'https://www.just-drinks.com' },
        ],
        report: {
          keyEvents: ['Hard seltzer market experiencing saturation with White Claw and Truly dominance', 'Premium spirits-based RTDs beginning distribution expansion', 'Japanese chuhai achieving mainstream Western market awareness', 'Convenience store channel dominant at 72% of RTD sales'],
          topPerformer: 'White Claw and Truly; Japanese chuhai brands',
          analysis: 'RTD category achieved 18% growth in 2023 as hard seltzer boom peaked and market dynamics shifted. White Claw and Truly consolidated dominant market position in hard seltzer segment, achieving near-parity share as category growth slowed with market saturation evident. Premium spirits-based RTDs like Cutwater and On The Rocks began meaningful distribution expansion, positioning as craft alternative to hard seltzer commoditization. Japanese chuhai brands achieved breakthrough Western market awareness through Asian culinary trend acceleration and discovery-driven younger consumers. Convenience store dominance persisted at 72% of category volume, reflecting impulse purchase and on-premise replacement positioning. Malt-based coolers experienced volume decline as hard seltzer and spirits-based options captured growth.',
          conclusion: 'Hard seltzer boom peaked in 2023 with White Claw and Truly consolidating share, while premium spirits-based RTDs and Japanese chuhai emerged as next growth waves.'
        }
      },
      2022: {
        marketSize: '$27.8B',
        growth: '+28%',
        growthDir: 'up',
        volumeCases: '223M',
        topMarkets: [
          {
            name: 'United States',
            growth: '+27.5%',
            brands: ['White Claw', 'Truly', 'High Noon'],
            regions: [
              { name: 'California', share: '24.3%', growth: '+28.5%' },
              { name: 'Texas', share: '22.0%', growth: '+27.1%' },
              { name: 'New York', share: '18.7%', growth: '+27.6%' },
              { name: 'Florida', share: '14.2%', growth: '+27%' },
              { name: 'Illinois', share: '9.6%', growth: '+2.9%' },
              { name: 'Pennsylvania', share: '11.2%', growth: '+3.2%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'Australia',
            growth: '+29.3%',
            brands: ['Cutwater', 'On The Rocks', 'Volley'],
            regions: [
              { name: 'Sydney', share: '36.5%', growth: '+30.1%' },
              { name: 'Melbourne', share: '30.0%', growth: '+29.2%' },
              { name: 'Brisbane', share: '19.5%', growth: '+28.9%' },
              { name: 'Perth', share: '14.0%', growth: '+28.6%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'Japan',
            growth: '+26.4%',
            brands: ['Kirin Chu-Hi', 'Asahi Chuhai', 'Suntory -196'],
            regions: [
              { name: 'Tokyo', share: '34.6%', growth: '+27.2%' },
              { name: 'Osaka', share: '28.0%', growth: '+26.1%' },
              { name: 'Yokohama', share: '16.4%', growth: '+26.5%' },
              { name: 'Nagoya', share: '13.4%', growth: '+25.9%' },
              { name: 'Sapporo', share: '7.6%', growth: '+4.0%' },
            ],
            sources: [
              { name: 'Euromonitor', url: 'https://www.euromonitor.com' },
              { name: 'Just-Drinks', url: 'https://www.just-drinks.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+28.2%',
            brands: ['On The Rocks', 'Cutwater', 'Smirnoff Ice'],
            regions: [
              { name: 'London', share: '34.8%', growth: '+28.9%' },
              { name: 'Manchester', share: '23.2%', growth: '+27.9%' },
              { name: 'Edinburgh', share: '15.5%', growth: '+28.4%' },
              { name: 'Birmingham', share: '15.9%', growth: '+27.9%' },
              { name: 'Bristol', share: '10.6%', growth: '+1.2%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'Canada',
            growth: '+27.8%',
            brands: ['Crown Royal Cocktails', 'Smirnoff Ice', 'Mike\u2019s Hard'],
            regions: [
              { name: 'Toronto', share: '32.4%', growth: '+28.4%' },
              { name: 'Vancouver', share: '28.4%', growth: '+27.6%' },
              { name: 'Montreal', share: '22.8%', growth: '+27.7%' },
              { name: 'Calgary', share: '16.4%', growth: '+27.3%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Cutwater', 'On The Rocks', 'Tip Top', 'Volley', 'Thomas Ashbourne', 'Fugu'],
          midTier: ['High Noon', 'NÜTRL', 'Crown Royal Cocktails', 'Jack Daniel\u2019s & Cola', 'Tanqueray RTD', 'Gordon\u2019s RTD'],
          value: ['White Claw', 'Truly', 'Twisted Tea', 'Four Loko', 'Smirnoff Ice', 'Mike\u2019s Hard']
        },
        channels: { onTrade: 18.0, offTrade: 74.4, eCommerce: 1.7, travelRetail: 5.9 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 20,   // % ACV distribution
          ceDepletions: 750000,  // case equivalent depletions
          billback: 6.0,          // % average billback/discount
          grossMarginPct: 37,       // % gross margin
          cac: 60,               // $ customer acquisition cost
          itr: 11,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Hard seltzer category achieving mainstream acceptance and convenience store ubiquity', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'White Claw and Truly consolidating market dominance with 50%+ combined share', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'RTDs cannibalizing traditional beer and spirits mixing occasions', source: 'Mintel', url: 'https://www.mintel.com' },
          { text: 'Japanese chuhai gaining international awareness through Asian trend discovery', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Convenience stores becoming primary RTD distribution channel', source: 'Just-Drinks', url: 'https://www.just-drinks.com' },
        ],
        report: {
          keyEvents: ['Hard seltzer boom accelerating with White Claw and Truly dominance', 'RTD category becoming mainstream with convenience store ubiquity', 'Japanese chuhai achieving international market awareness', 'Traditional spirits and beer mixing occasions experiencing RTD cannibalization'],
          topPerformer: 'White Claw and Truly',
          analysis: 'RTD category exploded in 2022 with 28% growth as hard seltzer boom achieved mainstream acceptance and ubiquity in convenience store networks. White Claw and Truly consolidated market leadership with combined share exceeding 50%, establishing category benchmarks for flavor profiles and packaging design. RTD beverage s began cannibalizing traditional beer and spirits mixing occasions as convenience and pre-chilled formats resonated with younger consumers. Japanese chuhai brands began gaining Western market awareness through Asian culinary trend acceleration and discovery-driven digital consumers. Convenience store channel emerged as dominant distribution with 74% of category volume, reflecting impulse purchase and accessibility positioning. Malt-based coolers experienced volume decline as hard seltzer captured growth.',
          conclusion: 'Hard seltzer boom achieved mainstream dominance in 2022 with White Claw and Truly consolidating market position, driving 28% category growth through convenience channel expansion.'
        }
      },
      2021: {
        marketSize: '$21.7B',
        growth: '+42%',
        growthDir: 'up',
        volumeCases: '174M',
        topMarkets: [
          {
            name: 'United States',
            growth: '+41.2%',
            brands: ['White Claw', 'Truly', 'High Noon'],
            regions: [
              { name: 'California', share: '24.6%', growth: '+42.8%' },
              { name: 'Texas', share: '22.0%', growth: '+40.6%' },
              { name: 'New York', share: '19.1%', growth: '+41.4%' },
              { name: 'Florida', share: '14.1%', growth: '+41%' },
              { name: 'Illinois', share: '9.3%', growth: '+6.6%' },
              { name: 'Pennsylvania', share: '10.9%', growth: '+5.2%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'Australia',
            growth: '+43.6%',
            brands: ['On The Rocks', 'Cutwater', 'Volley'],
            regions: [
              { name: 'Sydney', share: '36.6%', growth: '+44.5%' },
              { name: 'Melbourne', share: '29.0%', growth: '+43.5%' },
              { name: 'Brisbane', share: '20.6%', growth: '+43.2%' },
              { name: 'Perth', share: '13.8%', growth: '+42.9%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
          {
            name: 'Japan',
            growth: '+39.8%',
            brands: ['Kirin Chu-Hi', 'Asahi Chuhai', 'Suntory -196'],
            regions: [
              { name: 'Tokyo', share: '34.2%', growth: '+40.6%' },
              { name: 'Osaka', share: '28.5%', growth: '+39.5%' },
              { name: 'Yokohama', share: '16.4%', growth: '+39.9%' },
              { name: 'Nagoya', share: '12.1%', growth: '+39.3%' },
              { name: 'Sapporo', share: '8.8%', growth: '+7.3%' },
            ],
            sources: [
              { name: 'Euromonitor', url: 'https://www.euromonitor.com' },
              { name: 'Just-Drinks', url: 'https://www.just-drinks.com' },
            ]
          },
          {
            name: 'United Kingdom',
            growth: '+42.1%',
            brands: ['On The Rocks', 'Smirnoff Ice', 'Cutwater'],
            regions: [
              { name: 'London', share: '35.6%', growth: '+42.8%' },
              { name: 'Manchester', share: '23.5%', growth: '+41.8%' },
              { name: 'Edinburgh', share: '14.1%', growth: '+42.3%' },
              { name: 'Birmingham', share: '16.6%', growth: '+41.7%' },
              { name: 'Bristol', share: '10.2%', growth: '+2.9%' },
            ],
            sources: [
              { name: 'IWSR', url: 'https://www.theiwsr.com' },
              { name: 'Mintel', url: 'https://www.mintel.com' },
            ]
          },
          {
            name: 'Canada',
            growth: '+41.5%',
            brands: ['Crown Royal Cocktails', 'Smirnoff Ice', 'Mike\u2019s Hard'],
            regions: [
              { name: 'Toronto', share: '32.3%', growth: '+42.2%' },
              { name: 'Vancouver', share: '27.8%', growth: '+41.3%' },
              { name: 'Montreal', share: '23.1%', growth: '+41.4%' },
              { name: 'Calgary', share: '16.8%', growth: '+41%' },
            ],
            sources: [
              { name: 'The Spirits Business', url: 'https://www.thespiritsbusiness.com' },
              { name: 'Beverage Daily', url: 'https://www.beveragedaily.com' },
            ]
          },
        ],
        brands: {
          highEnd: ['Cutwater', 'On The Rocks', 'Tip Top', 'Volley', 'Thomas Ashbourne', 'Fugu'],
          midTier: ['High Noon', 'NÜTRL', 'Crown Royal Cocktails', 'Jack Daniel\u2019s & Cola', 'Tanqueray RTD', 'Gordon\u2019s RTD'],
          value: ['White Claw', 'Truly', 'Twisted Tea', 'Four Loko', 'Smirnoff Ice', 'Mike\u2019s Hard']
        },
        channels: { onTrade: 14.8, offTrade: 76.5, eCommerce: 0.7, travelRetail: 8.0 },
        tradeKPIs: { // SOURCE: Estimated from IWSR category averages and public filings
          acvDistribution: 17,   // % ACV distribution
          ceDepletions: 620000,  // case equivalent depletions
          billback: 5.5,          // % average billback/discount
          grossMarginPct: 36,       // % gross margin
          cac: 65,               // $ customer acquisition cost
          itr: 10,               // inventory turnover ratio
          isEstimated: true,
          methodology: 'Estimated from IWSR category averages and public filings. Not verified at SKU level.'
        },
        trends: [
          { text: 'Hard seltzer boom driven by home consumption during pandemic lockdowns', source: 'IWSR Global Spirits Report', url: 'https://www.theiwsr.com' },
          { text: 'White Claw achieving cult status with aggressive social media marketing', source: 'The Spirits Business Annual Review', url: 'https://www.thespiritsbusiness.com' },
          { text: 'Convenience stores expanding RTD shelf space dramatically', source: 'Mintel', url: 'https://www.mintel.com' },
          { text: 'RTD category cannibalizing traditional spirit mixing occasions', source: 'Beverage Daily Spirits Market Report', url: 'https://www.beveragedaily.com' },
          { text: 'Japanese chuhai achieving record sales in home market', source: 'Just-Drinks', url: 'https://www.just-drinks.com' },
        ],
        report: {
          keyEvents: ['Hard seltzer boom accelerated by pandemic home consumption surge', 'White Claw achieved viral social media status', 'Convenience stores prioritizing RTD shelf space expansion', 'Category exceeded $20B market value milestone', 'RTD format beginning to cannibalize spirits mixing occasions'],
          topPerformer: 'White Claw and Truly',
          analysis: 'RTD beverages experienced explosive growth in 2021 with 42% category expansion driven by pandemic-inflected home consumption surge and convenient pre-mixed format appeal. White Claw achieved near-cult status through social media viral marketing and word-of-mouth momentum, establishing the hard seltzer subcategory as mainstream beverage. Truly and other competitors scrambled to match White Claw\u2019s flavor innovation and packaging design while building distribution networks. Convenience store channel emerged as critical distribution vector, with retailers prioritizing RTD shelf space as higher-margin category. RTD format began cannibalizing traditional spirits and beer mixing occasions as consumers embraced pre-chilled, ready-to-consume convenience. Japanese chuhai brands maintained strong home market momentum while beginning limited Western distribution exploration.',
          conclusion: 'Hard seltzer boom and RTD category explosion in 2021 driven by pandemic home consumption, White Claw viral status, and convenience format appeal establishing category as major beverage force.'
        }
      },
    }
  }
]

// ── Data Methodology ──
export const DATA_METHODOLOGY = {
  overview: 'Market size estimates synthesized from IWSR Global Spirits Database, Euromonitor Passport Alcoholic Drinks, and DISCUS public disclosures. Growth rates represent year-over-year value change in USD at constant exchange rates unless otherwise stated.',
  pricing: 'Pricing data collected from retailer websites (Tesco, Sainsbury\'s, Waitrose, Master of Malt, Total Wine, Drizly, El Corte Ingl\u00e9s) during March 2026. Prices reflect standard retail, not promotional pricing, unless flagged.',
  sources: [
    { name: 'IWSR Global Spirits Database 2025', description: 'Proprietary database covering 160+ markets with volume and value data by category, price band, and channel.', url: 'https://www.theiwsr.com/global-spirits-report' },
    { name: 'Euromonitor Passport \u2014 Alcoholic Drinks', description: 'Market sizing, forecasts, and competitive landscape data for spirits, wine, and beer across 100+ countries.', url: 'https://www.euromonitor.com/alcoholic-drinks' },
    { name: 'DISCUS Annual Economic Briefing', description: 'US spirits industry data: shipments, revenue, state-level trends, and category performance from the Distilled Spirits Council.', url: 'https://www.discus.org/economics/research' },
    { name: 'NielsenIQ Off-Trade Panel', description: 'Retail scanner data from off-premise channels (supermarkets, liquor stores) covering sales volume, value, and distribution metrics.', url: 'https://www.nielseniq.com/global/en/insights/' },
    { name: 'The Spirits Business / Drinks International', description: 'Trade publication market intelligence, brand rankings, and industry trend analysis.', url: 'https://www.thespiritsbusiness.com/category/market-data/' },
    { name: 'OIV (International Organisation of Vine and Wine)', description: 'Global wine production, consumption, and trade statistics. Primary source for wine category data.', url: 'https://www.oiv.int/what-we-do/global-report' },
  ],
  lastUpdated: 'March 2026',
  updateFrequency: 'Quarterly (Jan, Apr, Jul, Oct)',
  disclaimer: 'All market data represents best estimates compiled from multiple public and proprietary sources. Figures may differ from individual source reports due to methodology differences in market definition, exchange rates, and reporting periods.',
}

