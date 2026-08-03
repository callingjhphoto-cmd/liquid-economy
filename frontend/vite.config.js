import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/') || id.includes('node_modules/react-router')) return 'vendor-react'
          if (id.includes('node_modules/recharts') || id.includes('node_modules/d3-')) return 'vendor-charts'
          if (id.includes('node_modules/lucide-react')) return 'vendor-icons'
          if (id.includes('/data/categoryData')) return 'data-categories'
          if (id.includes('/data/brandData')) return 'data-brands'
          if (id.includes('/data/campaignData')) return 'data-campaigns'
          if (id.includes('/data/venueData')) return 'data-venues'
          if (id.includes('/data/companyData')) return 'data-companies'
          if (id.includes('/data/cocktailDetails')) return 'data-cocktails'
          if (id.includes('/data/geographicData')) return 'data-geographic'
          if (id.includes('/data/spiritsDemographicsData')) return 'data-demographics'
          if (id.includes('/data/climateYieldData')) return 'data-climate'
          if (id.includes('/data/profileChorusCocktails')) return 'data-chorus'
          if (id.includes('/data/marketEntryData')) return 'data-market-entry'
          if (id.includes('/data/commandCentreData')) return 'data-command-centre'
          if (id.includes('/data/supplyChainData')) return 'data-supply-chain'
          if (id.includes('/data/posData')) return 'data-pos'
          if (id.includes('/data/w50bMenuIntel')) return 'data-w50b'
          if (id.includes('/data/scenarioData')) return 'data-scenario'
          if (id.includes('/data/distributorData')) return 'data-distributor'
          if (id.includes('/data/valuationsData')) return 'data-valuations'
          if (id.includes('/data/marginCalcData')) return 'data-margin-calc'
          if (id.includes('/data/financialsData')) return 'data-financials'
          if (id.includes('/data/tradeShowData')) return 'data-trade-shows'
          if (id.includes('/data/regulatoryData')) return 'data-regulatory'
          if (id.includes('/data/competitorData')) return 'data-competitor'
          if (id.includes('/data/reportBuilderData')) return 'data-report-builder'
          if (id.includes('/data/brandHealthData')) return 'data-brand-health'
          if (id.includes('/data/pitchGeneratorData')) return 'data-pitch-generator'
        }
      }
    }
  }
})
