import React, { useState, useEffect } from 'react'
import { api } from '../lib/api'

const AVAILABLE_SECTIONS = [
  'Market Overview',
  'Valuations',
  'Arbitrage Signals',
  'Brand Pricing',
  'Disclosure Calendar',
  'Key Metrics'
]

export default function ReportBuilder() {
  const [activeTab, setActiveTab] = useState('brief') // 'brief' or 'portfolio'
  const [title, setTitle] = useState('')
  const [generating, setGenerating] = useState(false)
  const [generatingMessage, setGeneratingMessage] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  // Brief tab state
  const [briefSections, setBriefSections] = useState({})

  // Portfolio tab state
  const [portfolioScope, setPortfolioScope] = useState('all')
  const [portfolioSections, setPortfolioSections] = useState({})

  // Initialize section selections
  useEffect(() => {
    const initial = {}
    AVAILABLE_SECTIONS.forEach(s => {
      initial[s] = true
    })
    setBriefSections(initial)
    setPortfolioSections(initial)
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      setLoading(true)
      const reports = await api.getReportHistory()
      setHistory(reports || [])
    } catch (err) {
      console.error('Error loading history:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateBrief = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Please enter a report title')
      return
    }

    const selectedSections = Object.entries(briefSections)
      .filter(([_, selected]) => selected)
      .map(([name, _]) => name)

    if (selectedSections.length === 0) {
      setError('Please select at least one section')
      return
    }

    setError('')
    setGenerating(true)
    setGeneratingMessage('Compiling data...')

    try {
      setGeneratingMessage('Generating narrative...')
      const response = await api.generateBrief({
        title,
        sections: selectedSections,
        company_ids: null,
        signal_ids: null
      })

      // Handle file download
      if (response && response.blob) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `brief_${title.replace(/\s+/g, '_')}.pdf`
        a.click()
        URL.revokeObjectURL(url)
      }

      setSuccess('Brief generated successfully!')
      setTitle('')
      setBriefSections(Object.fromEntries(
        AVAILABLE_SECTIONS.map(s => [s, true])
      ))
      await loadHistory()

      setTimeout(() => setSuccess(''), 5000)
    } catch (err) {
      setError(`Error: ${err.message}`)
      console.error('Generation error:', err)
    } finally {
      setGenerating(false)
      setGeneratingMessage('')
    }
  }

  const handleGeneratePortfolio = async (e) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Please enter a report title')
      return
    }

    const selectedSections = Object.entries(portfolioSections)
      .filter(([_, selected]) => selected)
      .map(([name, _]) => name)

    if (selectedSections.length === 0) {
      setError('Please select at least one section')
      return
    }

    setError('')
    setGenerating(true)
    setGeneratingMessage('Compiling portfolio data...')

    try {
      setGeneratingMessage('Generating narratives...')
      const response = await api.generatePortfolio({
        title,
        scope: portfolioScope,
        include_sections: selectedSections
      })

      // Handle file download
      if (response && response.blob) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `portfolio_${title.replace(/\s+/g, '_')}.pdf`
        a.click()
        URL.revokeObjectURL(url)
      }

      setSuccess('Portfolio report generated successfully!')
      setTitle('')
      setPortfolioSections(Object.fromEntries(
        AVAILABLE_SECTIONS.map(s => [s, true])
      ))
      await loadHistory()

      setTimeout(() => setSuccess(''), 5000)
    } catch (err) {
      setError(`Error: ${err.message}`)
      console.error('Generation error:', err)
    } finally {
      setGenerating(false)
      setGeneratingMessage('')
    }
  }

  const toggleBriefSection = (section) => {
    setBriefSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const togglePortfolioSection = (section) => {
    setPortfolioSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-navy mb-2">Report Builder</h1>
        <p className="text-gray-600">Generate intelligence briefs and portfolio reports with AI-powered analysis</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('brief')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'brief'
                ? 'text-gold border-b-2 border-gold bg-blue-50'
                : 'text-gray-600 hover:text-navy'
            }`}
          >
            Quick Brief
          </button>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex-1 px-6 py-4 font-medium transition-colors ${
              activeTab === 'portfolio'
                ? 'text-gold border-b-2 border-gold bg-blue-50'
                : 'text-gray-600 hover:text-navy'
            }`}
          >
            Portfolio Report
          </button>
        </div>

        <div className="p-6">
          {/* Messages */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
              {success}
            </div>
          )}

          {/* Brief Tab */}
          {activeTab === 'brief' && (
            <form onSubmit={handleGenerateBrief} className="space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Report Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g., Market Brief - Q4 2024"
                  disabled={generating}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none disabled:bg-gray-50"
                />
              </div>

              {/* Sections Selection */}
              <div>
                <label className="block text-sm font-medium text-navy mb-3">Sections to Include</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {AVAILABLE_SECTIONS.map(section => (
                    <label key={section} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={briefSections[section] || false}
                        onChange={() => toggleBriefSection(section)}
                        disabled={generating}
                        className="w-5 h-5 text-gold rounded focus:ring-2 focus:ring-gold cursor-pointer"
                      />
                      <span className="text-sm text-navy">{section}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={generating}
                className="w-full bg-navy text-white py-3 rounded-lg font-medium hover:bg-navy-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generating ? `Generating... (${generatingMessage})` : 'Generate Brief'}
              </button>
            </form>
          )}

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <form onSubmit={handleGeneratePortfolio} className="space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Report Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g., Portfolio Analysis - January 2025"
                  disabled={generating}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none disabled:bg-gray-50"
                />
              </div>

              {/* Scope Selector */}
              <div>
                <label className="block text-sm font-medium text-navy mb-2">Company Scope</label>
                <select
                  value={portfolioScope}
                  onChange={e => setPortfolioScope(e.target.value)}
                  disabled={generating}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent outline-none disabled:bg-gray-50"
                >
                  <option value="all">All Companies</option>
                  <option value="public">Public Companies Only</option>
                  <option value="private">Private Companies Only</option>
                </select>
              </div>

              {/* Sections Selection */}
              <div>
                <label className="block text-sm font-medium text-navy mb-3">Sections to Include</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {AVAILABLE_SECTIONS.map(section => (
                    <label key={section} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={portfolioSections[section] || false}
                        onChange={() => togglePortfolioSection(section)}
                        disabled={generating}
                        className="w-5 h-5 text-gold rounded focus:ring-2 focus:ring-gold cursor-pointer"
                      />
                      <span className="text-sm text-navy">{section}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={generating}
                className="w-full bg-navy text-white py-3 rounded-lg font-medium hover:bg-navy-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generating ? `Generating... (${generatingMessage})` : 'Generate Report'}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Report History */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-navy">Report History</h2>
        </div>

        {loading ? (
          <div className="px-6 py-8 text-center text-gray-500">
            Loading report history...
          </div>
        ) : history.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            No reports generated yet. Create your first report above.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Generated</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {history.map((report, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-navy font-medium">{report.title}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        report.report_type === 'brief'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gold/20 text-gold'
                      }`}>
                        {report.report_type === 'brief' ? 'Brief' : 'Portfolio'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(report.created_at)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => api.downloadReport(report.id)}
                        className="text-gold hover:text-gold-dark font-medium transition-colors"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
