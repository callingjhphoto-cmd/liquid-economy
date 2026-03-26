import React, { useState } from 'react'
import {
  Crown, Check, X, Zap, Star, Building2, Code, Lock,
  ChevronRight, ExternalLink, ArrowRight
} from 'lucide-react'
import {
  Card, PageHeader, SubPageNav
} from '../components/ui'
import { CHART_COLORS } from '../data/chartColors'

const TIERS = [
  {
    name: 'Free',
    price: '\u00a30',
    period: 'forever',
    description: 'Overview data and platform preview',
    color: '#475569',
    icon: Zap,
    popular: false,
    features: [
      { text: 'Dashboard overview', included: true },
      { text: 'Category summaries (top-level)', included: true },
      { text: 'Company directory (basic)', included: true },
      { text: 'Trade show calendar', included: true },
      { text: 'Regulatory overview', included: true },
      { text: 'Category deep dives', included: false },
      { text: 'Market entry wizard', included: false },
      { text: 'Brand health monitor', included: false },
      { text: 'Competitor tracking', included: false },
      { text: 'Depletion forecasting', included: false },
      { text: 'Pitch generator', included: false },
      { text: 'API access', included: false },
      { text: 'Custom reports', included: false },
      { text: 'Data export', included: false },
    ],
    cta: 'Current Plan',
    ctaStyle: 'bg-gray-200 text-gray-600 cursor-default',
  },
  {
    name: 'Pro',
    price: '\u00a399',
    period: '/month',
    description: 'Full intelligence platform for growing brands',
    color: CHART_COLORS.accent,
    icon: Star,
    popular: true,
    features: [
      { text: 'Everything in Free', included: true },
      { text: 'Category deep dives (all 11 categories)', included: true },
      { text: 'Market entry wizard (10 markets)', included: true },
      { text: 'Brand health monitor (15 brands)', included: true },
      { text: 'Competitor tracking (5 categories)', included: true },
      { text: 'Depletion forecasting', included: true },
      { text: 'Price positioning tool', included: true },
      { text: 'Distributor directory (50+)', included: true },
      { text: 'Pitch generator', included: true },
      { text: 'Data export (CSV)', included: true },
      { text: 'Monthly intelligence briefing', included: true },
      { text: 'API access', included: false },
      { text: 'Custom reports', included: false },
      { text: 'White-label reports', included: false },
    ],
    cta: 'Start Pro Trial',
    ctaStyle: 'bg-gold text-white hover:bg-gold/90',
  },
  {
    name: 'Enterprise',
    price: '\u00a3499',
    period: '/month',
    description: 'Full platform + API + custom intelligence',
    color: CHART_COLORS.primary,
    icon: Crown,
    popular: false,
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Full API access (REST + webhooks)', included: true },
      { text: 'Custom reports & dashboards', included: true },
      { text: 'White-label intelligence reports', included: true },
      { text: 'Unlimited brand tracking', included: true },
      { text: 'All markets (10+ countries)', included: true },
      { text: 'Real-time competitor alerts', included: true },
      { text: 'Data export (CSV, JSON, PDF)', included: true },
      { text: 'Priority support', included: true },
      { text: 'Custom data integrations', included: true },
      { text: 'Quarterly strategy call', included: true },
      { text: 'Early access to new features', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'SLA guarantee (99.9%)', included: true },
    ],
    cta: 'Contact Sales',
    ctaStyle: 'bg-navy text-white hover:bg-navy/90',
  },
]

const FAQ = [
  { q: 'Can I switch plans at any time?', a: 'Yes. Upgrade instantly, downgrade at end of billing period. No lock-in contracts.' },
  { q: 'Is there a free trial for Pro?', a: 'Yes \u2014 14-day free trial with full Pro features. No credit card required to start.' },
  { q: 'What payment methods do you accept?', a: 'Credit/debit cards (Visa, Mastercard, Amex) and bank transfer for Enterprise annual plans.' },
  { q: 'Can I get a custom plan?', a: 'Enterprise plans can be tailored. Contact us to discuss your specific needs.' },
  { q: 'What\u2019s the API rate limit?', a: 'Enterprise API: 10,000 requests/day. Higher limits available on custom plans.' },
  { q: 'Do you offer annual billing?', a: 'Yes \u2014 annual billing saves 20%. Pro annual: \u00a3948/year (vs \u00a31,188). Enterprise annual: \u00a34,790/year (vs \u00a35,988).' },
]

const COMPARISON_FEATURES = [
  { feature: 'Categories covered', free: 'Summaries only', pro: 'All 11 deep dives', enterprise: 'All 11 + custom' },
  { feature: 'Markets', free: 'Overview', pro: '10 markets', enterprise: 'All markets + custom' },
  { feature: 'Brand tracking', free: '\u2014', pro: '15 brands', enterprise: 'Unlimited' },
  { feature: 'Competitor monitoring', free: '\u2014', pro: '5 categories', enterprise: 'All + real-time alerts' },
  { feature: 'Data export', free: '\u2014', pro: 'CSV', enterprise: 'CSV, JSON, PDF' },
  { feature: 'API access', free: '\u2014', pro: '\u2014', enterprise: 'Full REST API' },
  { feature: 'Support', free: 'Community', pro: 'Email (48h)', enterprise: 'Priority (4h SLA)' },
  { feature: 'Custom reports', free: '\u2014', pro: '\u2014', enterprise: 'Unlimited' },
]

export default function SubscriptionTiers() {
  const [annual, setAnnual] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState(null)

  return (
    <div className="max-w-7xl mx-auto">
      <SubPageNav group="tools" />
      <PageHeader
        title="Pricing"
        subtitle="Intelligence that pays for itself"
        icon={<Crown size={20} />}
      />

      {/* Billing toggle */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setAnnual(false)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!annual ? 'bg-white text-navy shadow-sm' : 'text-gray-600'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${annual ? 'bg-white text-navy shadow-sm' : 'text-gray-600'}`}
          >
            Annual <span className="text-green-600 text-xs font-bold ml-1">Save 20%</span>
          </button>
        </div>
      </div>

      {/* Tier cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {TIERS.map((tier) => {
          const displayPrice = annual && tier.price !== '\u00a30'
            ? '\u00a3' + Math.round(parseInt(tier.price.replace('\u00a3', '')) * 0.8)
            : tier.price

          return (
            <div
              key={tier.name}
              className={`relative rounded-2xl border ${tier.popular ? 'border-gold ring-2 ring-gold/20' : 'border-gray-200'} bg-white overflow-hidden`}
            >
              {tier.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gold text-white text-center text-xs font-bold py-1">
                  Most Popular
                </div>
              )}
              <div className={`p-6 ${tier.popular ? 'pt-10' : ''}`}>
                <div className="flex items-center gap-2 mb-2">
                  <tier.icon size={20} style={{ color: tier.color }} />
                  <h3 className="text-lg font-bold text-navy">{tier.name}</h3>
                </div>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-navy">{displayPrice}</span>
                  <span className="text-sm text-gray-500">{tier.period}</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">{tier.description}</p>

                <button className={`w-full py-3 rounded-xl text-sm font-medium transition-colors ${tier.ctaStyle}`}>
                  {tier.cta}
                </button>

                <div className="mt-6 space-y-2">
                  {tier.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {f.included ? (
                        <Check size={14} className="text-green-500 flex-shrink-0" />
                      ) : (
                        <X size={14} className="text-gray-300 flex-shrink-0" />
                      )}
                      <span className={`text-xs ${f.included ? 'text-gray-700' : 'text-gray-400'}`}>{f.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Feature comparison table */}
      <Card className="p-6 mb-8">
        <h3 className="text-lg font-bold text-navy mb-4">Feature Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-xs font-semibold text-gray-500">Feature</th>
                <th className="text-center py-3 text-xs font-semibold text-gray-500">Free</th>
                <th className="text-center py-3 text-xs font-semibold text-gold">Pro</th>
                <th className="text-center py-3 text-xs font-semibold text-navy">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_FEATURES.map((row, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-2.5 font-medium text-navy">{row.feature}</td>
                  <td className="py-2.5 text-center text-gray-600">{row.free}</td>
                  <td className="py-2.5 text-center text-gray-600">{row.pro}</td>
                  <td className="py-2.5 text-center text-gray-600">{row.enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* FAQ */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-navy mb-4">Frequently Asked Questions</h3>
        <div className="space-y-2">
          {FAQ.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-navy">{faq.q}</span>
                <ChevronRight size={14} className={`text-gray-400 transition-transform ${expandedFaq === i ? 'rotate-90' : ''}`} />
              </button>
              {expandedFaq === i && (
                <div className="px-4 pb-3 text-sm text-gray-600">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
