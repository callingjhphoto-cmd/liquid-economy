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
        }
      }
    }
  }
})
