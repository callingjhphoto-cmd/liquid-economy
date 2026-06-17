import React from 'react'
import {
  Mail, MapPin, ArrowRight, Crown, BarChart3, Target, Users, Briefcase
} from 'lucide-react'
import {
  Card, PageHeader, SubPageNav
} from '../components/ui'

const CAPABILITIES = [
  {
    icon: BarChart3,
    title: 'Market Intelligence',
    description: 'Deep category analysis across 11 spirits, wine and beer categories with five-year historical data, brand tiering, channel splits, and growth market drill-downs.',
  },
  {
    icon: Target,
    title: 'Brand Strategy',
    description: 'Price positioning, competitor monitoring, brand health tracking, and pitch generation — everything a new-to-market brand needs to compete.',
  },
  {
    icon: Briefcase,
    title: 'Go-to-Market Planning',
    description: 'Market entry playbooks, distributor directories, scenario modelling, campaign planning, and margin calculators tailored to your category and target markets.',
  },
  {
    icon: Users,
    title: 'Venue & On-Trade',
    description: 'Intelligence on 50 Best Bars, London venue profiles, parent company analysis, sponsor tracking, and budget benchmarks for on-trade activation.',
  },
]

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <SubPageNav group="tools" />
      <PageHeader
        title="Contact"
        subtitle="Get in touch about Liquid Economy"
        icon={<Crown size={20} />}
      />

      {/* Hero */}
      <Card className="p-8 mb-8 bg-gradient-to-br from-navy to-navy/90 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl font-bold mb-3 font-display">Glass-to-Glass Intelligence</h2>
          <p className="text-white/80 text-sm leading-relaxed mb-4">
            Liquid Economy provides bespoke intelligence dashboards, market entry strategies, and data-driven brand plans for drinks businesses entering or expanding in competitive markets.
          </p>
          <p className="text-white/80 text-sm leading-relaxed mb-6">
            Whether you are a craft spirits startup seeking your first distributor or an established brand evaluating a new territory, our intelligence platform gives you an unfair advantage.
          </p>
          <a
            href="mailto:james@huertas.co.uk"
            className="inline-flex items-center gap-2 bg-gold text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gold/90 transition-colors"
          >
            <Mail size={16} />
            Get in Touch
            <ArrowRight size={14} />
          </a>
        </div>
      </Card>

      {/* Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {CAPABILITIES.map((cap) => (
          <Card key={cap.title} className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-navy/5 rounded-lg flex items-center justify-center flex-shrink-0">
                <cap.icon size={20} className="text-navy" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-navy mb-1">{cap.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{cap.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* How it works */}
      <Card className="p-6 mb-8">
        <h3 className="text-lg font-bold text-navy mb-4">How It Works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'Discovery Call', desc: 'We learn about your brand, category, target markets, and business objectives.' },
            { step: '02', title: 'Intelligence Brief', desc: 'We deliver a tailored intelligence package covering your category landscape, competitor positioning, and market entry options.' },
            { step: '03', title: 'Ongoing Support', desc: 'Quarterly updates, campaign planning support, and access to the full Liquid Economy platform for your team.' },
          ].map((item) => (
            <div key={item.step}>
              <div className="text-gold font-bold text-2xl font-display mb-2">{item.step}</div>
              <h4 className="text-sm font-bold text-navy mb-1">{item.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Contact */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Get in Touch</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <a href="mailto:james@huertas.co.uk" className="flex items-center gap-3 text-sm text-gray-700 hover:text-navy transition-colors">
              <Mail size={16} className="text-gold" />
              james@huertas.co.uk
            </a>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <MapPin size={16} className="text-gold" />
              London, UK
            </div>
          </div>
          <div className="text-xs text-gray-500 leading-relaxed">
            <p>Liquid Economy specialises in drinks industry intelligence for emerging and established brands across spirits, wine, beer, and no/low categories.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
