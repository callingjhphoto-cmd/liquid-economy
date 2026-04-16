// =============================================================================
// SPIRITS DEMOGRAPHICS DATA
// Sources: 5 Gemini Deep Research reports (April 2026)
//   spirits_01_whisky.md       \u2014 IWSR, SWA, DISCUS, Mintel, Shanken's Impact
//   spirits_02_agave.md        \u2014 CRT, IWSR, Nielsen/Circana, Shanken's Impact
//   spirits_03_gin.md          \u2014 IWSR, WSTA, Drinks International, YouGov
//   spirits_04_rum_vodka_cognac.md \u2014 IWSR, BNIC, Drinks International, Nielsen
//   spirits_05_liqueurs_aperitifs.md \u2014 IWSR, Campari AR, Drinks International
//
// Schema per category:
//   marketSizeFigure: string \u2014 headline market size with source
//   cagr: string \u2014 5-year CAGR with source
//   subCategories: array of { name, share, cagr, notes }
//   demographics: {
//     age:    array of { bracket, share, notes }
//     gender: array of { segment, share, notes }
//     income: array of { bracket, notes }
//     region: array of { name, share, notes }
//     occasion: array of { name, notes }
//   }
//   topBrands: array of { rank, name, owner, volumeCases, notes }
//   keyTrends: array of string
//   sources: array of string (publication names)
// =============================================================================

export const SPIRITS_DEMOGRAPHICS = {

  // ---------------------------------------------------------------------------
  // WHISKY
  // Source: spirits_01_whisky.md
  // ---------------------------------------------------------------------------
  whisky: {
    marketSizeFigure: '$69.8B\u2013$77.9B (2025)',
    cagr: '5.1%\u20137.0% CAGR through 2030s',
    source: 'spirits_01_whisky.md \u2014 IWSR, SWA, DISCUS',
    subCategories: [
      {
        name: 'Blended Scotch',
        share: '59.4% of Scotch exports by value',
        cagr: null,
        notes: 'Grew 4.4% in value in 2024 to \u00a33.2B. Resilient amid premium fatigue. Source: SWA 2024 export data.'
      },
      {
        name: 'Single Malt Scotch',
        share: '31% of Scotch exports',
        cagr: null,
        notes: 'Export values plunged 17% in 2024. Premiumization fatigue + US tariff impact. Source: SWA / spirits_01_whisky.md.'
      },
      {
        name: 'American Whiskey (Bourbon/Rye/Tennessee)',
        share: '54% of all US spirits exports',
        cagr: '5.5%\u20137.4% (Bourbon); 6.3%\u20139.6% (Rye)',
        notes: 'US domestic bourbon: 28.4M 9L cases in 2024. EU tariff caused 35% export drop 2025. Source: DISCUS 2024/2025.'
      },
      {
        name: 'Irish Whiskey',
        share: null,
        cagr: '7.9% pre-pandemic CAGR',
        notes: 'Smooth, approachable; ideal entry-point. Jameson dominates volume. Source: IWSR / spirits_01_whisky.md.'
      },
      {
        name: 'Japanese Whisky',
        share: null,
        cagr: '8.1%\u201311.8%',
        notes: 'Market $885.6M in 2023, >$1B by 2025. Supply-constrained. On-trade 67\u201379% of market. Source: spirits_01_whisky.md.'
      },
      {
        name: 'Indian Whisky',
        share: null,
        cagr: null,
        notes: 'Indian market ~$6.38B in 2025. Indian single malts now outselling premium Scotch domestically. Source: spirits_01_whisky.md \u2014 IWSR.'
      }
    ],
    demographics: {
      age: [
        {
          bracket: 'Gen Z (18\u201324)',
          share: '70% drank alcohol in last 6 months (2025)',
          notes: 'Up from 46% in 2023. Prefer flavored whisky, cocktails, RTDs. Reduce categories per occasion from 2.8 to 1.8. Source: IWSR Bevtrac 2025.'
        },
        {
          bracket: 'Millennials (25\u201334)',
          share: '38% of global whisky volume growth',
          notes: 'Primary premiumization driver. Prioritize craft, authenticity, cocktail culture. Source: IWSR / spirits_01_whisky.md.'
        },
        {
          bracket: 'Gen X (35\u201354)',
          share: null,
          notes: 'In Germany 2023\u201324, drove blended Scotch volume gains\u2014seeking value without leaving the category. Source: spirits_01_whisky.md.'
        },
        {
          bracket: 'Boomers (55+)',
          share: null,
          notes: '4.24 drinks/week vs 3.66 for younger cohorts. Loyal to heritage Scotch and Bourbon. Source: Gallup / IWSR via spirits_01_whisky.md.'
        }
      ],
      gender: [
        {
          segment: 'Female',
          share: '36% of all whisky drinkers',
          notes: 'Up from 15% in 1990s. Johnnie Walker\u2013Sabrina Carpenter campaign targets young women. Crown Royal flavored variants. Source: spirits_01_whisky.md \u2014 OurWhisky Foundation data.'
        },
        {
          segment: 'Male',
          share: '64%',
          notes: 'Still majority; strongest in Scotch neat/Bourbon segments. Source: derived from spirits_01_whisky.md.'
        }
      ],
      income: [
        {
          bracket: '$100k+ household income',
          notes: '79% of US adults in this bracket consume alcohol (Gallup). Ultra-premium and luxury whisky segments sustained by top quintiles. In 2024\u201325 high-earners shifted away from $100+ status spirits toward upper-mid-tier single malts. Source: Gallup / spirits_01_whisky.md.'
        }
      ],
      region: [
        {
          name: 'India',
          share: null,
          notes: '220M bottles Scotch in 2025 (+15% YoY). Overtook France as #1 market by volume. Source: SWA 2025 exports.'
        },
        {
          name: 'United States',
          share: '#1 by value (\u00a3933M Scotch in 2025)',
          notes: '10% tariff (April 2025) cut shipments 15% May\u2013Dec. Bourbon domestic market ~$18.3B in 2025. Source: SWA, DISCUS.'
        },
        {
          name: 'China',
          share: null,
          notes: '28\u201331% plunge in Scotch and status spirits value 2024. Economic austerity + deflationary pressure. Source: IWSR via spirits_01_whisky.md.'
        },
        {
          name: 'Europe',
          share: null,
          notes: 'Trading down from single malts to blends amid economic stagnation. EU tariff on American whiskey \u2014 35% drop 2025. Source: DISCUS / spirits_01_whisky.md.'
        }
      ],
      occasion: [
        { name: 'Neat / On the rocks', notes: 'Boomer-dominated; declining as share of occasions. Heritage brands\u2014Scotch, Bourbon.' },
        { name: 'Cocktail / Highball', notes: 'Gen Z + Millennial primary occasion. Espresso whisky sours, Highballs driving category recruitment.' },
        { name: 'Gifting', notes: 'Seasonal. Premium single malts and Japanese whisky as luxury gifts.' },
        { name: 'Online purchase', notes: '15\u201317% of drinkers buy whisky online; IWSR projects strong omnichannel growth to 2029.' }
      ]
    },
    topBrands: [
      { rank: 1, name: 'Johnnie Walker', owner: 'Diageo', volumeCases: null, notes: 'World\'s #1 Scotch; Sabrina Carpenter campaign targeting younger female demographics.' },
      { rank: 2, name: 'Jim Beam', owner: 'Beam Suntory', volumeCases: '~17.5M (2024)', notes: 'Undisputed global Bourbon volume leader.' },
      { rank: 3, name: 'Jack Daniel\'s', owner: 'Brown-Forman', volumeCases: '~14.1M (2024)', notes: 'Core No. 7; presence in 170+ countries.' },
      { rank: 4, name: 'Jameson', owner: 'Pernod Ricard', volumeCases: null, notes: 'Near-monopolistic dominance of Irish Whiskey category globally.' },
      { rank: 5, name: 'The Glenlivet', owner: 'Pernod Ricard', volumeCases: null, notes: 'World\'s top-selling single malt by volume.' },
      { rank: 6, name: 'Yamazaki', owner: 'Suntory', volumeCases: null, notes: 'Pioneer Japanese single malt; highly allocated, globally revered.' },
      { rank: 7, name: 'Crown Royal', owner: 'Diageo', volumeCases: null, notes: 'Canadian titan. Flavored variants (Peach, Apple) drive female + younger demo.' },
      { rank: 8, name: 'Woodford Reserve', owner: 'Brown-Forman', volumeCases: null, notes: 'One of few brands showing positive volume growth in 2024.' },
      { rank: 9, name: 'Redbreast', owner: 'Pernod Ricard', volumeCases: null, notes: 'Standard-bearer for ultra-premium Irish Single Pot Still.' },
      { rank: 10, name: 'Kavalan', owner: 'King Car Group', volumeCases: null, notes: 'Taiwan. Consistently wins top blind-tasting awards globally.' }
    ],
    keyTrends: [
      'Selective premiumisation: consumers drinking less but trading up to premium blends and upper-mid single malts.',
      'Scotch blended resilience \u2014 blended Scotch grew 4.4% in value 2024 while single malt plunged 17%.',
      'Female whisky consumer share reached 36% in 2024\u201325; brands pivoting marketing to capture this demographic.',
      'US tariffs (April 2025) and EU retaliatory tariffs created severe export volatility for Scotch and American whiskey.',
      'Rare whisky auction values fell 18% in late 2024; ultra-premium secondary market undergoing structural correction.',
      'Gen Z entering legal drinking age preferring flavored, cocktail-friendly expressions over traditional neat consumption.',
      'Indian single malts (Amrut, Paul John, Indri) disrupting global market at favorable price-to-quality ratios.'
    ],
    sources: ['SWA 2024/2025 Export Statistics', 'DISCUS 2024/2025 Annual Briefing', 'IWSR Bevtrac 2025', 'Gallup US Alcohol Consumption Survey', 'Shanken\'s Impact Databank', 'OurWhisky Foundation', 'spirits_01_whisky.md']
  },

  // ---------------------------------------------------------------------------
  // TEQUILA (agave)
  // Source: spirits_02_agave.md
  // ---------------------------------------------------------------------------
  tequila: {
    marketSizeFigure: '$25.7B (2025)',
    cagr: '9.1% CAGR to $51.6B by 2033',
    source: 'spirits_02_agave.md \u2014 CRT, IWSR, Nielsen/Circana',
    subCategories: [
      {
        name: 'Blanco / Plata',
        share: '63.5% of tequila revenue',
        cagr: null,
        notes: 'Volume and financial anchor. Primary cocktail base (Margarita, Paloma). Source: IWSR via spirits_02_agave.md.'
      },
      {
        name: 'Reposado',
        share: null,
        cagr: null,
        notes: 'Surge in consumer preference for quality-to-price ratio. Aged 2 months\u20131 year. Source: spirits_02_agave.md.'
      },
      {
        name: 'A\u00f1ejo & Extra A\u00f1ejo',
        share: null,
        cagr: null,
        notes: 'Competing directly with premium whiskies and cognac as sipping spirits. Source: spirits_02_agave.md.'
      },
      {
        name: 'Cristalino',
        share: null,
        cagr: null,
        notes: 'Highest volume growth of all tequila segments. Bridge for premium vodka consumers entering tequila. Source: IWSR via spirits_02_agave.md.'
      },
      {
        name: 'Mezcal (Espadin)',
        share: null,
        cagr: null,
        notes: 'Overall mezcal US retail sales declined 8.2% revenue in 2024. Craft/other brands grew 28.5%. Source: Nielsen via spirits_02_agave.md.'
      },
      {
        name: 'Premium & Super-Premium tier',
        share: '68.2% of total tequila revenue',
        cagr: null,
        notes: 'High-end premium + super-premium combined revenue share. Source: spirits_02_agave.md \u2014 IWSR.'
      }
    ],
    demographics: {
      age: [
        {
          bracket: 'Millennials (25\u201334)',
          share: '24.2% consumption share',
          notes: 'Most highly concentrated consumer base. Key driver of RTD agave and elevated cocktail culture. Source: spirits_02_agave.md \u2014 CRT/IWSR data.'
        },
        {
          bracket: 'Gen X (35\u201344)',
          share: '20.6%\u201324.6%',
          notes: 'High purchasing power; bridge between casual and premium occasions. Source: spirits_02_agave.md.'
        },
        {
          bracket: 'Gen Z (18\u201324)',
          share: null,
          notes: 'Heavy RTD agave and celebrity tequila consumers (818, Teremana). Source: spirits_02_agave.md \u2014 IWSR.'
        }
      ],
      gender: [
        {
          segment: 'Female',
          share: '52% of US tequila consumers',
          notes: 'Tequila is majority-female in the US \u2014 unique among spirits categories. Female spirits consumption CAGR 3.46%. Source: spirits_02_agave.md \u2014 Nielsen/Circana.'
        },
        {
          segment: 'Male',
          share: '48%',
          notes: 'Historical male dominance (74.6% of total US spirits demand) reversed in tequila. Source: spirits_02_agave.md.'
        }
      ],
      income: [
        {
          bracket: '$75k+ household income',
          notes: 'Primary target for super-premium labels. Middle-income consumers also purchase "status tequilas" situationally as affordable luxury. Source: spirits_02_agave.md.'
        }
      ],
      region: [
        {
          name: 'United States',
          share: '63% of global exported tequila',
          notes: '52% of US national demand concentrated in CA, TX, FL, NY, IL. ~30.6M 9L cases imported 2024\u201325. Source: CRT data via spirits_02_agave.md.'
        },
        {
          name: 'Mexico (domestic)',
          share: '27% of production',
          notes: '~145M liters consumed domestically. Second-largest market. Source: CRT via spirits_02_agave.md.'
        },
        {
          name: 'Colombia',
          share: null,
          notes: 'Most explosive growth market in LATAM: exports surged 133% to 4.2M liters 2024\u201325. Source: CRT.'
        },
        {
          name: 'Australia',
          share: null,
          notes: '+39% YoY; 3.1M liters. Robust cocktail culture and high disposable income. Source: CRT via spirits_02_agave.md.'
        },
        {
          name: 'Spain',
          share: '1.2% global',
          notes: '6.4M liters. Strong urban on-premise placements driving growth. Source: CRT data.'
        },
        {
          name: 'India',
          share: null,
          notes: '+80% to ~2M liters. Premium urban middle class driving growth. Source: CRT via spirits_02_agave.md.'
        }
      ],
      occasion: [
        { name: 'Nightclub / Premium bars', notes: 'Don Julio 1942 "nightclub luxury" archetype. Heavy marketing in Ibiza and travel retail.' },
        { name: 'Home / Casual premiumization', notes: 'Ranch Water and premium Margarita driving at-home consumption. Source: IWSR via spirits_02_agave.md.' },
        { name: 'Gifting', notes: 'Clase Azul ceramic decanters dominate ultra-premium gifting sector.' },
        { name: 'DTC / Allocation model', notes: 'Independent brands growing DTC; limited allocations build scarcity narrative. 11% of premium segment vs 6% in 2021.' }
      ]
    },
    topBrands: [
      { rank: 1, name: 'Jose Cuervo', owner: 'Proximo Spirits / Becle', volumeCases: '8.9M', notes: '-6.4% YoY in 2024. Source: Shanken\'s Impact / spirits_02_agave.md.' },
      { rank: 2, name: 'Don Julio', owner: 'Diageo', volumeCases: '4.4M', notes: '+28.2% YoY. Nightclub luxury archetype. Source: spirits_02_agave.md.' },
      { rank: 3, name: 'Patr\u00f3n', owner: 'Bacardi', volumeCases: '2.8\u20133.2M', notes: '-8.0% to -11.8% YoY. Source: spirits_02_agave.md.' },
      { rank: 4, name: '1800 Tequila', owner: 'Proximo Spirits / Becle', volumeCases: '2.8M', notes: 'Stable. Source: spirits_02_agave.md.' },
      { rank: 5, name: 'Casamigos', owner: 'Diageo', volumeCases: '2.4M', notes: '-20.7% YoY. Celebrity saturation and distributor destocking. Source: spirits_02_agave.md.' },
      { rank: 6, name: 'Espolon', owner: 'Campari Group', volumeCases: '~1.3M+', notes: '+14.6% YoY. Source: spirits_02_agave.md.' },
      { rank: 7, name: 'Clase Azul', owner: 'Independent', volumeCases: null, notes: 'Artisanal ceramic decanters; ultra-premium gifting leader. Source: spirits_02_agave.md.' },
      { rank: 8, name: 'Cincoro', owner: 'NBA investors (Jordan + partners)', volumeCases: null, notes: '1.5M bottles in 3 years; top-20 US by retail value. Source: spirits_02_agave.md.' },
      { rank: 9, name: 'Teremana', owner: 'Dwayne Johnson / UDV', volumeCases: null, notes: 'Accessible premium tier; strong Gen Z + female demos. Source: spirits_02_agave.md.' },
      { rank: 10, name: '818 Tequila', owner: 'Kendall Jenner / private', volumeCases: null, notes: 'Targets Gen Z and female demographics. Source: spirits_02_agave.md.' }
    ],
    keyTrends: [
      'US volume growth decelerating but value growing: agave achieved +2% volume in US in 2024, sole positive-growth spirits category.',
      'Tequila is majority-female in US (52%) \u2014 decisive break from spirits\u2019 male-dominated history.',
      'Celebrity tequila boom shows saturation signals: Casamigos -20.7%, many newer entrants struggling.',
      'Agave price crash: blue Weber agave fell from 32 MXP/kg (2022 peak) to 5 MXP/kg (Feb 2024). Margin windfall for majors.',
      'Additive-free movement growing: CRT crackdown on Tequila Matchmaker amplified consumer awareness and brand loyalty to certified producers.',
      'Cristalino sub-category driving cross-over from premium vodka consumers into tequila premium tier.',
      'Colombia (+133%), Australia (+39%), India (+80%) are the fastest-growing export markets outside the US.'
    ],
    sources: ['CRT (Consejo Regulador del Tequila) export data', 'IWSR 2024/2025', 'Nielsen/Circana US data', 'Shanken\'s Impact Databank', 'Drinks International', 'DISCUS', 'spirits_02_agave.md']
  },

  // ---------------------------------------------------------------------------
  // GIN
  // Source: spirits_03_gin.md
  // ---------------------------------------------------------------------------
  gin: {
    marketSizeFigure: '$26.0B (2025)',
    cagr: '4.72% CAGR to $30.87B by 2031',
    source: 'spirits_03_gin.md \u2014 IWSR, WSTA, Mordor Intelligence',
    subCategories: [
      {
        name: 'London Dry',
        share: '52.02% of global volume',
        cagr: null,
        notes: 'Bedrock of the category. Bartender preference for clean, juniper canvas. Source: Mordor Intelligence via spirits_03_gin.md.'
      },
      {
        name: 'Flavoured / Pink Gin',
        share: '30% of UK category volume at 2020 peak',
        cagr: null,
        notes: 'Plummeted by nearly half since 2020 in UK. Declining >2x faster than traditional gins. Source: IWSR via spirits_03_gin.md.'
      },
      {
        name: 'Old Tom Gin',
        share: null,
        cagr: '5.12% through 2031',
        notes: 'Fastest-growing traditional sub-category. Tied to pre-Prohibition cocktail revival (Martinez, Tom Collins). Source: spirits_03_gin.md.'
      },
      {
        name: 'Contemporary / New Western',
        share: null,
        cagr: null,
        notes: 'De-emphasizes juniper. Japanese gins (Roku, Ukiyo) leading. Aligns with Asian highball palate. Source: spirits_03_gin.md.'
      },
      {
        name: 'Navy Strength',
        share: null,
        cagr: null,
        notes: 'Niche but critical credential builder for premium craft brands. Higher ABV (57%). Source: spirits_03_gin.md.'
      }
    ],
    demographics: {
      age: [
        {
          bracket: 'Under 34 (Gen Z + Millennials)',
          share: '42% of all US gin drinkers under 34',
          notes: 'In Italy and New Zealand, 74%+ of on-premise gin audience under 44. Drawn to artisanal craft + cocktail versatility. Source: CGA by Nielsen IQ via spirits_03_gin.md.'
        },
        {
          bracket: '55+ (Boomers)',
          share: null,
          notes: 'UK: 55+ consumed highest volume of gin over past 12 months. Prefer drinking at home while relaxing (46%). Source: Atomik Research / YouGov via spirits_03_gin.md.'
        },
        {
          bracket: '25\u201334 (Millennials)',
          share: null,
          notes: 'Prefer on-trade social occasions with gin. Source: spirits_03_gin.md.'
        },
        {
          bracket: '35\u201354 (Gen X)',
          share: '62% of Canadian gin drinkers',
          notes: 'High disposable income, key premium segment. Source: Atomik Research via spirits_03_gin.md.'
        }
      ],
      gender: [
        {
          segment: 'Female (UK & Oceania)',
          share: '70% of UK/NZ on-premise gin audience',
          notes: 'UK: twice as many women choose gin as favourite spirit vs men (26% vs 13%). 2 in 5 choose flavoured expressions. Source: YouGov / Atomik Research via spirits_03_gin.md.'
        },
        {
          segment: 'Male (United States)',
          share: '68% of US gin drinkers',
          notes: 'US anomaly: gin skews male, tied to classic spirit-forward cocktail culture (Martini, Negroni). Source: CGA by Nielsen IQ via spirits_03_gin.md.'
        },
        {
          segment: 'Balanced (Italy)',
          share: '~50/50',
          notes: 'Balanced split driven by aperitivo culture. Source: CGA via spirits_03_gin.md.'
        }
      ],
      income: [
        {
          bracket: 'Above-average household income',
          notes: 'US gin drinkers: HHI ~$20k above national average. Canadian gin drinkers: $48k above national average. Source: spirits_03_gin.md \u2014 CGA data.'
        }
      ],
      region: [
        {
          name: 'United Kingdom',
          share: null,
          notes: 'Total gin volume dropped 13% 2023\u201324. Premium+ gin CAGR of -5% forecast 2023\u201328. Excise duty hikes (10.1% Aug 2023 + 3.65% 2024) claimed 70%+ of average bottle cost. Source: WSTA, HMRC via spirits_03_gin.md.'
        },
        {
          name: 'Spain',
          share: null,
          notes: 'Premium+ gin volumes fell 16% in 2023. Traditional engine of gin boom facing sharp contraction. Source: IWSR via spirits_03_gin.md.'
        },
        {
          name: 'Japan',
          share: null,
          notes: 'Gin volumes +14% CAGR 2020\u201324. Premium+ surged 18% in same period. 7% CAGR forecast 2024\u201329. Source: IWSR via spirits_03_gin.md.'
        },
        {
          name: 'India',
          share: null,
          notes: 'Premium+ gin volumes +8% in 2023; +5% CAGR forecast 2023\u201328. Source: IWSR via spirits_03_gin.md.'
        },
        {
          name: 'United States (Texas)',
          share: null,
          notes: 'IWSR identifies Texas as most significant growth opportunity for premium+ gin; national market broadly flat. Source: IWSR US Navigator via spirits_03_gin.md.'
        }
      ],
      occasion: [
        { name: 'G&T (classic)', notes: 'Classic but facing headwinds in saturated European markets. Remains global cocktail staple.' },
        { name: 'Gin Spritz / Aperitivo', notes: 'Dominant trend in Europe + UK. Co-consumption with Fever-Tree. Hugo Spritz and Aperol Spritz cannibalizing G&T occasion.' },
        { name: 'Gin Highball', notes: 'Japan-led. Botanical gins + sparkling water or soda. Driving +14% CAGR in Japan premium segment.' },
        { name: 'At-home cocktail mixing', notes: 'UK 55+ demographic: 46% prefer gin while relaxing at home. Source: YouGov via spirits_03_gin.md.' }
      ]
    },
    topBrands: [
      { rank: 1, name: 'Ginebra San Miguel', owner: 'Ginebra San Miguel Inc.', volumeCases: '31.2M+', notes: 'Global volume leader. Philippines domestic dominance. Source: Drinks International via spirits_03_gin.md.' },
      { rank: 2, name: 'Gordon\'s', owner: 'Diageo', volumeCases: null, notes: 'Global standard-bearer London Dry. Significant growth 2025. Source: spirits_03_gin.md.' },
      { rank: 3, name: 'Bombay Sapphire', owner: 'Bacardi', volumeCases: '4M+', notes: 'Consistent global mover. Source: Drinks International.' },
      { rank: 4, name: 'Tanqueray', owner: 'Diageo', volumeCases: '4M+', notes: 'Juggernaut in both on- and off-trade. Source: Drinks International.' },
      { rank: 5, name: 'Beefeater', owner: 'Pernod Ricard', volumeCases: '~2.7M', notes: 'Top-five despite ABV reduction controversy. Source: Drinks International.' },
      { rank: 6, name: 'Hendrick\'s', owner: 'William Grant & Sons', volumeCases: null, notes: 'Pioneer of contemporary cucumber/rose profile; super-premium share leader.' },
      { rank: 7, name: 'Roku', owner: 'Beam Suntory', volumeCases: null, notes: 'Driving Japanese botanical gin movement. Highball serve alignment.' },
      { rank: 8, name: 'Monkey 47', owner: 'Pernod Ricard', volumeCases: null, notes: 'Cult favorite Black Forest gin. Elite bar staple.' },
      { rank: 9, name: 'The Botanist', owner: 'R\u00e9my Cointreau', volumeCases: null, notes: 'Islay dry gin; 22-botanical profile; mixologist favorite.' },
      { rank: 10, name: 'Fords Gin', owner: 'Brown-Forman', volumeCases: null, notes: '2026 Drinks International: top 3 most-used gins in elite bars; 20% of top venues. Source: spirits_03_gin.md.' }
    ],
    keyTrends: [
      'Ginaissance over in mature markets: UK premium+ gin CAGR -5% forecast; Spain also contracting sharply.',
      'Flavoured/pink gin collapse: volumes fell nearly 50% from 2020 UK peak; retailers rationalising SKUs.',
      'London Dry and Old Tom resurgence: classicism returning as craft novelty fades.',
      'UK craft distillery crisis: 70%+ of average gin bottle cost now goes to Exchequer; over 600 UK distilleries face existential pressure.',
      'Japan and India driving global volume growth (Japan: +14% CAGR 2020\u201324).',
      'Spritz and Highball serves are the new G&T for younger, health-conscious consumers.',
      'Premium mixer co-consumption (Fever-Tree) now integral to gin positioning strategy.'
    ],
    sources: ['IWSR 2024/2025', 'WSTA (Wine & Spirit Trade Association)', 'CGA by Nielsen IQ', 'YouGov / Atomik Research', 'Drinks International 2024/2026 Brands Reports', 'HMRC UK Excise Data', 'Mordor Intelligence', 'spirits_03_gin.md']
  },

  // ---------------------------------------------------------------------------
  // RUM
  // Source: spirits_04_rum_vodka_cognac.md
  // ---------------------------------------------------------------------------
  rum: {
    marketSizeFigure: null,
    cagr: '5.2% value CAGR 2024\u20132028; premium-plus US 8% CAGR',
    source: 'spirits_04_rum_vodka_cognac.md \u2014 IWSR, Spirits Business',
    subCategories: [
      {
        name: 'White / Silver Rum',
        share: null,
        cagr: null,
        notes: 'Highest volume driver. Classic cocktail base. Brands attempting to premiumise this space. Source: spirits_04_rum_vodka_cognac.md.'
      },
      {
        name: 'Dark Rum',
        share: null,
        cagr: null,
        notes: 'UK on-trade value increased 5% recently. Primary premiumization driver within broader category. Source: spirits_04_rum_vodka_cognac.md.'
      },
      {
        name: 'Spiced & Flavoured Rum',
        share: '>56% of US rum sales',
        cagr: '4.5% to $9.67B by 2030',
        notes: 'Global spiced rum market ~$7B in 2024. Gen Z + young Millennial entry point. Source: spirits_04_rum_vodka_cognac.md.'
      },
      {
        name: 'Aged Premium & Super-Premium',
        share: '7% of US market (2024)',
        cagr: '10% (super-premium) 2018\u20132023',
        notes: 'Fastest-growing in value terms. Premium rum +7% and super-premium +10% between 2018\u20132023. Source: IWSR via spirits_04_rum_vodka_cognac.md.'
      },
      {
        name: 'Rhum Agricole',
        share: null,
        cagr: null,
        notes: 'Distilled from fresh sugarcane juice. French market traditional dominance now diversifying. Source: spirits_04_rum_vodka_cognac.md.'
      }
    ],
    demographics: {
      age: [
        {
          bracket: 'Gen Z + Millennials (21\u201334)',
          share: '54% choose premium spirits',
          notes: 'Nearly 50% of spiced rum market. "Drink less, drink better" movement. Source: spirits_04_rum_vodka_cognac.md \u2014 US survey data.'
        },
        {
          bracket: 'Gen X + Boomers (35\u201365+)',
          share: null,
          notes: '4.24 drinks/week average for 55+. Backbone of standard blended and traditional consumption. Source: spirits_04_rum_vodka_cognac.md.'
        }
      ],
      gender: [
        {
          segment: 'Male',
          share: '74.6% of overall US spirits demand',
          notes: 'Men statistically more likely to consume dark rum and craft spirits. Source: spirits_04_rum_vodka_cognac.md.'
        },
        {
          segment: 'Female',
          share: null,
          notes: 'Higher propensity for white rum over dark rum. Fastest-growing cohort at 3.46% CAGR. Source: spirits_04_rum_vodka_cognac.md.'
        }
      ],
      income: [
        {
          bracket: '$75k\u2013$200k+',
          notes: 'Core premium and super-premium segment. UHNWI population grew 5.1% in 2024 \u2014 expanding addressable market for vintage aged rums. Source: spirits_04_rum_vodka_cognac.md.'
        }
      ],
      region: [
        {
          name: 'Caribbean',
          share: '56% of local spirits volume is rum',
          notes: 'WIRSPA reported 2024 dip in premium Caribbean rum sales. Dominican and Guatemalan rums gaining prestige. Source: WIRSPA / spirits_04_rum_vodka_cognac.md.'
        },
        {
          name: 'United Kingdom',
          share: null,
          notes: 'Strong affinity for premium dark and spiced rums in on-trade (pubs, bars). Dark rum value +5%. Source: spirits_04_rum_vodka_cognac.md.'
        },
        {
          name: 'France',
          share: null,
          notes: 'Rapid diversification from traditional agricultural rhums to premium imported molasses rums. Source: spirits_04_rum_vodka_cognac.md.'
        },
        {
          name: 'United States',
          share: null,
          notes: 'Off-trade dominates (53.6%). Premium-plus rum CAGR 7% (volume) / 8% (value) 2021\u20132026 forecast. Source: IWSR via spirits_04_rum_vodka_cognac.md.'
        }
      ],
      occasion: [
        { name: 'On-premise cocktail', notes: 'White rum: utilitarian cocktail modifier for high-energy nightlife.' },
        { name: 'Sipping / digestif', notes: 'Aged rum + VSOP Cognac increasingly positioned for intimate gatherings and corporate gifting.' },
        { name: 'Travel retail souvenir', notes: 'Distilleries becoming cultural heritage centers; DTC tourism sales growing. Caribbean + LATAM.' }
      ]
    },
    topBrands: [
      { rank: 1, name: 'Bacardi', owner: 'Bacardi', volumeCases: null, notes: '24.9% of rum category by value in Global Travel Retail. Source: spirits_04_rum_vodka_cognac.md.' },
      { rank: 2, name: 'Captain Morgan', owner: 'Diageo', volumeCases: null, notes: 'Legacy brand; massive global volumes. Source: spirits_04_rum_vodka_cognac.md.' },
      { rank: 3, name: 'Havana Club', owner: 'Pernod Ricard', volumeCases: null, notes: 'Strong premium growth in Mexico, China, GTR. Iconic Collection restaged 2024. Source: spirits_04_rum_vodka_cognac.md.' },
      { rank: 4, name: 'Bumbu', owner: 'Sovereign Brands', volumeCases: null, notes: 'Fastest-growing super-premium rum globally; +40% growth 2024; 27% intl market share in segment. Source: IWSR/Nielsen via spirits_04_rum_vodka_cognac.md.' },
      { rank: 5, name: 'Diplomat\u00edco', owner: 'Brown-Forman', volumeCases: null, notes: 'Pinnacle of sipping rum boom. Brown-Forman acquisition signals major conglomerate bet on premium rum. Source: spirits_04_rum_vodka_cognac.md.' },
      { rank: 6, name: 'Zacapa', owner: 'Diageo', volumeCases: null, notes: 'Guatemalan high-altitude aging. XO redesign 2024 redefines luxury travel retail. Source: spirits_04_rum_vodka_cognac.md.' },
      { rank: 7, name: 'Mount Gay', owner: 'R\u00e9my Cointreau', volumeCases: null, notes: 'Terroir-driven premiumization: Single Estate Series using own 2016/2017 harvest. Source: spirits_04_rum_vodka_cognac.md.' },
      { rank: 8, name: 'Appleton Estate', owner: 'Campari Group', volumeCases: null, notes: 'Champions Jamaican GI and aged complexity. Source: spirits_04_rum_vodka_cognac.md.' },
      { rank: 9, name: 'Plantation', owner: 'R\u00e9my Cointreau', volumeCases: null, notes: 'Cask finishing and age statements. Source: spirits_04_rum_vodka_cognac.md.' },
      { rank: 10, name: 'Flor de Ca\u00f1a', owner: 'Pellas Group', volumeCases: null, notes: 'Aged portfolio targeting experimental consumers. Source: spirits_04_rum_vodka_cognac.md.' }
    ],
    keyTrends: [
      '"Barbell" market structure: value and super-premium both growing; core premium softening.',
      'Bumbu is fastest-growing super-premium rum globally with 40% growth in 2024.',
      'Premium+ share in US remains small (7%) but growing rapidly \u2014 massive untapped potential.',
      'Dark rum outperforming white in UK on-trade; category reframing from mixer to sipping spirit.',
      'Caribbean GDP contribution from rum declining short-term (Barbados: $87.7M to ~$64.4M 2023\u201324) despite long 20-year investment horizon.',
      'Dominican and Guatemalan rums gaining global prestige through wine-cask finishes and high-altitude aging.',
      'Rum tourism as DTC growth vector: distilleries becoming cultural heritage centers.'
    ],
    sources: ['IWSR 2024/2025', 'WIRSPA', 'Shanken\'s Impact', 'Spirits Business', 'Nielsen/Circana', 'spirits_04_rum_vodka_cognac.md']
  },

  // ---------------------------------------------------------------------------
  // VODKA
  // Source: spirits_04_rum_vodka_cognac.md
  // ---------------------------------------------------------------------------
  vodka: {
    marketSizeFigure: null,
    cagr: null,
    source: 'spirits_04_rum_vodka_cognac.md \u2014 IWSR, Nielsen/Circana, Shanken\'s Impact',
    subCategories: [
      {
        name: 'Standard / Sub-premium',
        share: null,
        cagr: null,
        notes: 'Hemorrhaging volume. Former 55% of US vodka bracket ($10\u2013$25) now ~65% almost entirely driven by Tito\'s. Source: spirits_04_rum_vodka_cognac.md.'
      },
      {
        name: 'Premium / Super-premium',
        share: null,
        cagr: null,
        notes: 'Grey Goose, Ketel One, Belvedere. Lifts during holidays/social gatherings; everyday volume softened. Source: spirits_04_rum_vodka_cognac.md.'
      },
      {
        name: 'Flavoured Vodka',
        share: '21% of US vodkas sold (2023)',
        cagr: null,
        notes: '56% of 22\u201334 age bracket consume flavoured vodka vs 21% of 55+. Pivoting from artificial to natural botanical/citrus. Source: Mintel via spirits_04_rum_vodka_cognac.md.'
      }
    ],
    demographics: {
      age: [
        {
          bracket: '22\u201334',
          share: '56% consume flavoured vodka',
          notes: 'Primary flavoured vodka + RTD consumer. "Drink less, drink better" with premium authentic brands. Source: Mintel via spirits_04_rum_vodka_cognac.md.'
        },
        {
          bracket: '35\u201365+',
          share: null,
          notes: 'Backbone of standard and non-flavoured vodka consumption. 4.24 drinks/week for 55+. Source: spirits_04_rum_vodka_cognac.md.'
        }
      ],
      gender: [
        {
          segment: 'Female',
          share: null,
          notes: 'Historical female preference for vodka and gin; RTD formats neutralising gender splits. CAGR 3.46% in female spirits consumption. Source: spirits_04_rum_vodka_cognac.md.'
        },
        {
          segment: 'Male',
          share: '74.6% of overall US spirits demand',
          notes: 'But vodka historically more balanced than dark spirits categories. Source: spirits_04_rum_vodka_cognac.md.'
        }
      ],
      income: [
        {
          bracket: 'Middle to High Income ($75k\u2013$200k)',
          notes: 'Core premium Tito\'s, Grey Goose, Ketel One consumer. During economic downturns reduces frequency rather than trading down. Source: spirits_04_rum_vodka_cognac.md.'
        }
      ],
      region: [
        {
          name: 'United States',
          share: null,
          notes: 'Largest vodka market. Peak 80M+ cases 2021; fell to 75.4M cases in 2024 (-3.5%). Tito\'s: 12M cases, ~25% of some retailers\u2019 total vodka sales. Source: Shanken\'s Impact via spirits_04_rum_vodka_cognac.md.'
        },
        {
          name: 'Russia / Eastern Europe',
          share: null,
          notes: 'Geopolitical impact on brands with Russian branding in Western markets. Stoli pivoting to Latvian production. Russian Standard impacted. Source: spirits_04_rum_vodka_cognac.md.'
        }
      ],
      occasion: [
        { name: 'At-home / off-trade', notes: '53.6% US market share off-trade. At-home cocktail mixing solidified during pandemic.' },
        { name: 'Vodka soda / casual mixer', notes: 'Being cannibalized by RTDs and hard seltzers among Gen Z.' },
        { name: 'Premium cocktail', notes: 'Grey Goose and Belvedere positioning in upscale on-trade against tequila incursion.' }
      ]
    },
    topBrands: [
      { rank: 1, name: 'Tito\'s Handmade Vodka', owner: 'Fifth Generation Inc.', volumeCases: '12M (2024)', notes: 'First volume decline in 2024 (-1.5%). $2.5\u20132.6B retail sales. Up to 25% of individual retailers\u2019 total vodka. Source: Shanken\'s Impact via spirits_04_rum_vodka_cognac.md.' },
      { rank: 2, name: 'Smirnoff', owner: 'Diageo', volumeCases: '~7.9\u20138M (2024)', notes: '-4.8% to -6% decline in 2024. Consistent global sub-premium driver. Source: spirits_04_rum_vodka_cognac.md.' },
      { rank: 3, name: 'Absolut', owner: 'Pernod Ricard', volumeCases: null, notes: '#3 in US market. Aggressive flavor innovation strategy. Source: Impact Databank via spirits_04_rum_vodka_cognac.md.' },
      { rank: 4, name: 'Grey Goose', owner: 'Bacardi', volumeCases: null, notes: 'Super-premium retail leader. Faces pressure from tequila premiumisation. Source: spirits_04_rum_vodka_cognac.md.' },
      { rank: 5, name: 'Ketel One', owner: 'Diageo', volumeCases: null, notes: 'Premium well-drink space; competing with Tito\'s. Source: spirits_04_rum_vodka_cognac.md.' },
      { rank: 6, name: 'Belvedere', owner: 'LVMH', volumeCases: null, notes: 'Super-premium alongside Grey Goose. Source: spirits_04_rum_vodka_cognac.md.' },
      { rank: 7, name: 'Svedka', owner: 'Constellation Brands', volumeCases: null, notes: '#4 in US market; built targeting younger consumers with mid-tier pricing. Source: Impact Databank.' },
      { rank: 8, name: 'Stoli', owner: 'SPI Group', volumeCases: null, notes: 'Severing Russian state associations; leaning into Latvian production. Source: spirits_04_rum_vodka_cognac.md.' },
      { rank: 9, name: 'New Amsterdam', owner: 'E. & J. Gallo', volumeCases: null, notes: '#5 US market. Source: Impact Databank.' },
      { rank: 10, name: 'Russian Standard', owner: 'Roust Corporation', volumeCases: null, notes: 'Heavily impacted by geopolitical tensions in Western markets. Source: spirits_04_rum_vodka_cognac.md.' }
    ],
    keyTrends: [
      'Vodka in systemic volume decline: US market fell from 80M+ cases (2021 peak) to 75.4M cases in 2024.',
      'Tito\'s anomaly: single brand sustained entire category; its first volume decline in 2024 is a critical warning signal.',
      'RTD cocktails and hard seltzers are cannibalising traditional vodka-soda occasions among Gen Z.',
      'Flavoured vodka pivoting from artificial confectionary (early 2010s) to natural botanical/citrus to attract Gen Z authenticity demands.',
      'Geopolitical fallout: Russian-branded vodkas losing Western market share. Stoli pivoting to Latvian production narrative.',
      'Category remains #1 by volume in the US despite declines \u2014 too massive to write off.',
      'Premium vodka faces identity crisis as tequila, gin, and rum aggressively recruit vodka\u2019s core premium consumer.'
    ],
    sources: ['IWSR 2025', 'Shanken\'s Impact Databank', 'Nielsen/Circana', 'Mintel', 'Impact Databank', 'spirits_04_rum_vodka_cognac.md']
  },

  // ---------------------------------------------------------------------------
  // COGNAC
  // Source: spirits_04_rum_vodka_cognac.md
  // ---------------------------------------------------------------------------
  cognac: {
    marketSizeFigure: '$4.8B (2025)',
    cagr: '6.0% CAGR to $8.1B by 2034',
    source: 'spirits_04_rum_vodka_cognac.md \u2014 IWSR, BNIC',
    subCategories: [
      {
        name: 'VS (Very Special)',
        share: '49%\u201354% of global volume',
        cagr: null,
        notes: 'Minimum 2 years aging. Engine of US market driven by affordability and mixability. Source: BNIC data via spirits_04_rum_vodka_cognac.md.'
      },
      {
        name: 'VSOP (Very Superior Old Pale)',
        share: '33%\u201341% of global market',
        cagr: null,
        notes: 'Minimum 4 years. Primary vehicle for premium gifting (41% of consumers prefer VSOP for gifts). Source: spirits_04_rum_vodka_cognac.md.'
      },
      {
        name: 'XO (Extra Old) & Prestige',
        share: '8%\u201310% of volume',
        cagr: null,
        notes: 'Minimum 10 years. Vastly disproportionate share of value. 52% of HNWIs prefer XO for luxury consumption. Source: spirits_04_rum_vodka_cognac.md.'
      }
    ],
    demographics: {
      age: [
        {
          bracket: 'Gen Z + Millennials (21\u201334)',
          share: null,
          notes: 'Primary target of hip-hop and cultural marketing (D\'Uss\u00e9 / Jay-Z). "Drink less, drink better" cohort. Source: spirits_04_rum_vodka_cognac.md.'
        },
        {
          bracket: 'Gen X + Boomers (35+)',
          share: null,
          notes: 'HNWI in this bracket drive ultra-luxury XO and Louis XIII purchases. Corporate gifting and banquet occasions. Source: spirits_04_rum_vodka_cognac.md.'
        }
      ],
      gender: [
        {
          segment: 'Female (growing)',
          share: null,
          notes: 'Research shows US and Western European female consumers increasingly purchasing premium Cognac (2024/2025 data). Source: spirits_04_rum_vodka_cognac.md.'
        },
        {
          segment: 'Male (dominant)',
          share: '74.6% of overall US spirits demand',
          notes: 'Cognac historically male-dominated. Hip-hop cultural alignment maintains relevance with urban male demographics. Source: spirits_04_rum_vodka_cognac.md.'
        }
      ],
      income: [
        {
          bracket: 'Ultra-High-Net-Worth Individuals (UHNWI)',
          notes: 'HNWI population grew 5.1% in 2024, expanding addressable luxury market. Louis XIII $4,800 holiday coffret targets this tier. Source: spirits_04_rum_vodka_cognac.md.'
        },
        {
          bracket: 'Middle to High Income ($75k\u2013$200k)',
          notes: 'Core VS/VSOP consumer. Reduces frequency during downturns rather than trading down. Source: spirits_04_rum_vodka_cognac.md.'
        }
      ],
      region: [
        {
          name: 'United States',
          share: '34.5% of global Cognac revenue',
          notes: 'Largest national market. US volume declined 20% in 2022 and 16% further in H1 2023. Continued decline from 5.1M cases 2024 base. Cultural alignment with hip-hop driving engagement. Source: spirits_04_rum_vodka_cognac.md.'
        },
        {
          name: 'China',
          share: null,
          notes: 'Vital for VSOP/XO profitable shipments. TBA value in China -12% in 2025. Anti-dumping duties on European brandy. BNIC and houses fighting minimum price commitments. Source: spirits_04_rum_vodka_cognac.md.'
        },
        {
          name: 'Asia-Pacific',
          share: null,
          notes: 'Emerging growth region. Business gifting and banquet occasions remain critical channel. Source: spirits_04_rum_vodka_cognac.md.'
        }
      ],
      occasion: [
        { name: 'Corporate gifting / banquet', notes: 'VSOP dominant (41% consumer preference for gifts). China business culture critical channel. Source: spirits_04_rum_vodka_cognac.md.' },
        { name: 'Ultra-luxury sipping', notes: 'XO and Louis XIII. HNWIs seeking localized, exclusive narratives (Louis XIII destination editions: Paris, Hong Kong, Singapore). Source: spirits_04_rum_vodka_cognac.md.' },
        { name: 'Nightlife / Hip-hop culture', notes: 'VS and VSOP mixed or neat in urban nightlife. Hennessy, D\'Uss\u00e9, and Courvoisier cultural alignment. Source: spirits_04_rum_vodka_cognac.md.' }
      ]
    },
    topBrands: [
      { rank: 1, name: 'Hennessy', owner: 'LVMH', volumeCases: null, notes: '~48% of global Cognac volumes shipped from region. Deep cultural hegemony in African American and hip-hop culture. Source: spirits_04_rum_vodka_cognac.md.' },
      { rank: 2, name: 'Martell', owner: 'Pernod Ricard', volumeCases: null, notes: 'Second-largest house. Source: spirits_04_rum_vodka_cognac.md.' },
      { rank: 3, name: 'R\u00e9my Martin', owner: 'R\u00e9my Cointreau', volumeCases: null, notes: '13.6% total market volume. 28% share in superior quality (VSOP + XO). Source: BNIC data.' },
      { rank: 4, name: 'Courvoisier', owner: 'Campari Group', volumeCases: '400k (US)', notes: '"Bring Your Own Courvoisier" campaign with Karrueche Tran. Source: spirits_04_rum_vodka_cognac.md.' },
      { rank: 5, name: 'D\'Uss\u00e9', owner: 'Bacardi / Jay-Z', volumeCases: '525k (US)', notes: 'Jay-Z association capturing Gen Z Cognac discovery. Source: spirits_04_rum_vodka_cognac.md.' },
      { rank: 6, name: 'Louis XIII', owner: 'R\u00e9my Cointreau', volumeCases: null, notes: 'Apex ultra-luxury. $4,800 holiday coffret 2024/25. Destination GTR editions (Paris, HK, Singapore SG60). Source: spirits_04_rum_vodka_cognac.md.' }
    ],
    keyTrends: [
      'Big Four houses (Hennessy, Martell, R\u00e9my, Courvoisier) control 84\u201385% of volume and 88\u201390% of value.',
      'US market severe correction: -20% volume 2022, -16% H1 2023, continued decline 2024.',
      'China crisis: TBA value -12% in 2025, anti-dumping duties on European brandy significantly restricting market access.',
      'Hip-hop cultural strategy remains critical for US Gen Z engagement (D\'Uss\u00e9, Courvoisier, Hennessy).',
      'Ultra-luxury assets (Louis XIII) robust even as mainstream premiumization slows.',
      'Category overexposed to geopolitical and macroeconomic volatility from US-China dependency.',
      'Female consumers increasingly purchasing premium Cognac in US and Western Europe \u2014 new growth vector.'
    ],
    sources: ['BNIC (Bureau National Interprofessionnel du Cognac)', 'IWSR 2024/2025', 'LVMH / R\u00e9my Cointreau Annual Reports', 'Shanken\'s Impact', 'spirits_04_rum_vodka_cognac.md']
  },

  // ---------------------------------------------------------------------------
  // NOLO (Non/Low Alcohol) \u2014 mapped to aperitifs & liqueurs data where relevant
  // Source: spirits_05_liqueurs_aperitifs.md
  // ---------------------------------------------------------------------------
  nolo: {
    marketSizeFigure: '$1.12B\u2013$4.1B (non-alcoholic aperitif/spirits segment, 2024)',
    cagr: '7.8%\u20138.9% CAGR',
    source: 'spirits_05_liqueurs_aperitifs.md \u2014 IWSR, Campari Group AR',
    subCategories: [
      {
        name: 'Non-Alcoholic RTD Aperitifs',
        share: '52% of N/A segment revenue',
        cagr: null,
        notes: 'RTD formats dominate. Source: spirits_05_liqueurs_aperitifs.md.'
      },
      {
        name: 'Zero-Proof Botanical Spirits (Halal)',
        share: null,
        cagr: null,
        notes: 'Brands like ALCONOT: vacuum distillation without fermentation, 0.0% ABV from inception. Middle East + global Muslim population targeting. Source: spirits_05_liqueurs_aperitifs.md.'
      },
      {
        name: 'Vegan Cream Liqueurs',
        share: null,
        cagr: '8.6% CAGR to $1.23B by 2033',
        notes: 'Market $582M in 2024. Almond, coconut, oat, soy bases. ~21% of global adults lactose intolerant. Source: spirits_05_liqueurs_aperitifs.md.'
      }
    ],
    demographics: {
      age: [
        {
          bracket: 'Gen Z (LDA+)',
          share: '73% drank alcohol in 6 months (March 2025)',
          notes: 'Up from 66% in 2023. But 60% engage in intermittent abstinence vs 40% of total adults. Key N/A occasion driver. Source: IWSR Bevtrac 2025 via spirits_05_liqueurs_aperitifs.md.'
        },
        {
          bracket: 'Millennials (25\u201334)',
          share: '57% of RTD consumers in US',
          notes: 'Together with Gen Z, driving RTD and N/A spritz occasions. Source: spirits_05_liqueurs_aperitifs.md.'
        }
      ],
      gender: [
        {
          segment: 'Female',
          share: '33% of female consumers prefer low-ABV cream liqueurs',
          notes: 'RTD formats neutralizing gender splits; broad appeal. Source: spirits_05_liqueurs_aperitifs.md.'
        }
      ],
      income: [
        {
          bracket: 'Middle income',
          notes: 'Cost-of-living crisis drove much of Gen Z N/A adoption \u2014 cyclical rather than structural rejection. Source: IWSR via spirits_05_liqueurs_aperitifs.md.'
        }
      ],
      region: [
        {
          name: 'Middle East',
          share: null,
          notes: 'Key target market for Halal-certified zero-proof botanical distillates. Strictly 0.0% from inception, no cross-contamination. Source: spirits_05_liqueurs_aperitifs.md.'
        },
        {
          name: 'Asia-Pacific',
          share: null,
          notes: 'Fastest-growing region for N/A and vegan cream liqueurs (11.2% CAGR). Rising middle class + urbanization. Source: spirits_05_liqueurs_aperitifs.md.'
        },
        {
          name: 'North America',
          share: '34% of global cream liqueur volume',
          notes: 'Super-premium light aperitifs growing at +7% CAGR in US. Source: spirits_05_liqueurs_aperitifs.md.'
        }
      ],
      occasion: [
        { name: 'Sober social occasions', notes: 'Growing acceptance of N/A at events. "Dry January" and "Sober October" normalising N/A purchase across all demographics.' },
        { name: 'Pre-dinner Aperitivo', notes: 'Spritz format at aperitivo hour. Lower ABV (15\u201322%) appealing to health-conscious consumers.' },
        { name: 'Halal social settings', notes: 'Zero-proof botanical spirits enabling full cocktail participation in Muslim-majority events.' }
      ]
    },
    topBrands: [
      { rank: 1, name: 'Aperol', owner: 'Campari Group', volumeCases: '9.3M+ H1 2024', notes: '+5% organic 2024. Double-digit growth Americas. #1 spirit-based aperitif globally. Source: Campari Group FY2024 / spirits_05_liqueurs_aperitifs.md.' },
      { rank: 2, name: 'Campari', owner: 'Campari Group', volumeCases: null, notes: '+9% organic 2024. #1 best-selling liqueur globally since 2016. Source: Drinks International / spirits_05_liqueurs_aperitifs.md.' },
      { rank: 3, name: 'St Germain', owner: 'Bacardi', volumeCases: null, notes: '#2 best-selling liqueur globally 2026. Hugo Spritz viral phenomenon. Source: Drinks International via spirits_05_liqueurs_aperitifs.md.' },
      { rank: 4, name: 'Cointreau', owner: 'R\u00e9my Cointreau', volumeCases: null, notes: '#3 best-selling liqueur globally 2024/2026. Indispensable in Margarita, Sidecar, Cosmopolitan. Source: Drinks International.' },
      { rank: 5, name: 'Baileys', owner: 'Diageo', volumeCases: '8.2M (2023)', notes: '-6.3% dip in 2023. Rapid NPD: Vanilla Mint Shake, Cinnamon Churros. Source: spirits_05_liqueurs_aperitifs.md.' }
    ],
    keyTrends: [
      'Aperol Spritz: single biggest growth driver for spirit-based aperitifs; US premium bitters +18% CAGR 2018\u20132023.',
      'Gen Z paradox resolved: participation rebounding (73% 2025) but intermittent abstinence at 60% vs 40% total adults.',
      'Aperitivo hour export: Italian pre-dinner ritual now global, driving lower-ABV, early-evening occasions.',
      'Hugo Spritz + St Germain: viral cocktail drove single brand to #2 global liqueur ranking in 2026.',
      'Vegan cream liqueurs accelerating: $582M market growing at 8.6% CAGR to 2033.',
      'Halal zero-proof spirits: technical innovation (vacuum distillation, no fermentation) opening Middle East + global Muslim market.',
      'Campari Group \u20ac3.07B net sales FY2024; House of Aperitifs = 43% of total group sales at +6% organic growth.'
    ],
    sources: ['Campari Group FY2024 Annual Report', 'IWSR Bevtrac 2025', 'Drinks International 2024/2026 Brands Reports', 'Pernod Ricard FY24', 'spirits_05_liqueurs_aperitifs.md']
  },

  // ---------------------------------------------------------------------------
  // RTD \u2014 broader context from spirits_04 + spirits_05 cross-category data
  // Source: spirits_04_rum_vodka_cognac.md + spirits_05_liqueurs_aperitifs.md
  // ---------------------------------------------------------------------------
  rtd: {
    marketSizeFigure: null,
    cagr: null,
    source: 'spirits_04_rum_vodka_cognac.md + spirits_05_liqueurs_aperitifs.md \u2014 IWSR, Nielsen',
    subCategories: [],
    demographics: {
      age: [
        {
          bracket: 'Gen Z + Millennials (21\u201334)',
          share: '57% of RTD consumers in US are Millennials or Gen Z',
          notes: 'Primary RTD occasion driver. Hard seltzers cannibalizing vodka-soda traditional occasion. Source: spirits_04+05 research files.'
        }
      ],
      gender: [
        {
          segment: 'Broadly balanced',
          share: null,
          notes: 'RTD formats neutralizing historical gender splits in spirits categories. Source: spirits_05_liqueurs_aperitifs.md.'
        }
      ],
      income: [],
      region: [
        {
          name: 'United States',
          share: null,
          notes: 'RTD / hard seltzer proliferation cannibalizing vodka-soda occasion. Source: spirits_04_rum_vodka_cognac.md.'
        }
      ],
      occasion: [
        { name: 'Casual social / convenience', notes: 'Primary RTD occasion. Convenience channels and off-trade shelf. Agave RTDs +45% in convenience channels.' },
        { name: 'Aperitivo / Spritz', notes: 'Lillet + Absolut RTD formats. Fever-Tree canned Gin Spritz collaboration with Papa Salt.' }
      ]
    },
    topBrands: [],
    keyTrends: [
      'RTDs cannibalizing vodka-soda and traditional mixing occasions across Gen Z.',
      'Agave-based RTD cocktails: +45% in convenience channels.',
      'Premium mixer brands (Fever-Tree) entering RTD with celebrity gin collaborations.',
      '57% of US RTD consumers are Millennials or Gen Z.',
      'RTD formats are neutralizing historical gender splits across spirits categories.'
    ],
    sources: ['IWSR', 'Nielsen/Circana', 'spirits_04_rum_vodka_cognac.md', 'spirits_05_liqueurs_aperitifs.md']
  }
}

// Helper: get demographics data for a category key
export function getCategoryDemographics(categoryKey) {
  return SPIRITS_DEMOGRAPHICS[categoryKey] || null
}
