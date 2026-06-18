import React, { lazy, Suspense } from 'react'

// react-markdown is loaded ONLY inside this component, which is only used in DossierLayout
// This ensures it does NOT leak into the / or /walk-in initial bundles.
const ReactMarkdown = lazy(() => import('react-markdown'))

function MarkdownFallback({ prose }) {
  // Plain text fallback while markdown loads
  return (
    <div className="text-body text-gray-700 leading-relaxed whitespace-pre-line">
      {prose}
    </div>
  )
}

/**
 * MarkdownSection
 * Renders markdown prose via react-markdown (lazy-loaded, only in dossier chunk).
 * Applies Tailwind prose styling via className overrides.
 */
export function MarkdownSection({ content = '', className = '' }) {
  if (!content.trim()) return null

  return (
    <div className={`prose prose-sm max-w-none ${className}`}>
      <Suspense fallback={<MarkdownFallback prose={content.slice(0, 300)} />}>
        <ReactMarkdownWrapper content={content} />
      </Suspense>
    </div>
  )
}

function ReactMarkdownWrapper({ content }) {
  // Import remark-gfm and rehype-sanitize lazily
  const [plugins, setPlugins] = React.useState(null)

  React.useEffect(() => {
    Promise.all([
      import('remark-gfm'),
      import('rehype-sanitize'),
    ]).then(([gfm, sanitize]) => {
      setPlugins({ gfm: gfm.default, sanitize: sanitize.default })
    })
  }, [])

  if (!plugins) {
    return (
      <div className="text-body text-gray-700 leading-relaxed whitespace-pre-line">
        {content.slice(0, 500)}
      </div>
    )
  }

  return (
    <Suspense fallback={<div className="text-body text-gray-700">{content.slice(0, 300)}</div>}>
      <ReactMarkdown
        remarkPlugins={[plugins.gfm]}
        rehypePlugins={[plugins.sanitize]}
        components={{
          h1: ({children}) => <h1 className="text-section font-display text-navy mt-6 mb-3">{children}</h1>,
          h2: ({children}) => <h2 className="text-subsection font-display text-navy mt-5 mb-2">{children}</h2>,
          h3: ({children}) => <h3 className="text-body-lg font-semibold text-navy mt-4 mb-2">{children}</h3>,
          p: ({children}) => <p className="text-body text-gray-700 leading-relaxed mb-3">{children}</p>,
          strong: ({children}) => <strong className="font-semibold text-navy">{children}</strong>,
          ul: ({children}) => <ul className="list-disc pl-5 space-y-1 mb-3 text-gray-700">{children}</ul>,
          ol: ({children}) => <ol className="list-decimal pl-5 space-y-1 mb-3 text-gray-700">{children}</ol>,
          li: ({children}) => <li className="text-body">{children}</li>,
          a: ({href, children}) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-editorial underline hover:text-navy transition-colors"
            >
              {children}
            </a>
          ),
          table: ({children}) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full text-small border-collapse">{children}</table>
            </div>
          ),
          th: ({children}) => <th className="px-3 py-2 bg-navy/5 text-navy font-semibold text-left border border-gray-200">{children}</th>,
          td: ({children}) => <td className="px-3 py-2 text-gray-700 border border-gray-200">{children}</td>,
          blockquote: ({children}) => (
            <blockquote className="border-l-2 border-gold pl-4 italic text-gray-600 my-3">{children}</blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Suspense>
  )
}
