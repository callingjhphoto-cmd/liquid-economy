import React from 'react'
import { AlertTriangle, RefreshCw, SkipForward } from 'lucide-react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
          <AlertTriangle className="mx-auto text-amber-500 mb-3" size={32} />
          <h3 className="text-body-lg font-semibold text-gray-800 mb-1">Something went wrong</h3>
          <p className="text-small text-gray-500 mb-4">
            {this.props.message || 'This section encountered an error while loading.'}
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg text-small font-medium min-h-[44px] hover:bg-navy/90 transition-colors"
            >
              <RefreshCw size={14} /> Retry
            </button>
            {this.props.onSkip && (
              <button
                onClick={this.props.onSkip}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-small font-medium min-h-[44px] hover:bg-gray-200 transition-colors"
              >
                <SkipForward size={14} /> Skip Section
              </button>
            )}
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
