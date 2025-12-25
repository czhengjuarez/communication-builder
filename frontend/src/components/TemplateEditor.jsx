import { useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import AIEnhancer from './AIEnhancer'

const TemplateEditor = ({ template, onBack, onUpdate, onEnhance }) => {
  const { isDarkMode } = useTheme()
  const [format, setFormat] = useState('email') // 'email' or 'chat'
  const [content, setContent] = useState('')
  const [originalContent, setOriginalContent] = useState('')
  const [hasChanges, setHasChanges] = useState(false)
  const [showAIEnhancer, setShowAIEnhancer] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (template) {
      const initialContent = format === 'email' ? template.email_content : template.chat_content
      setContent(initialContent)
      setOriginalContent(initialContent)
      setHasChanges(false)
    }
  }, [template, format])

  useEffect(() => {
    setHasChanges(content !== originalContent)
  }, [content, originalContent])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleReset = () => {
    if (window.confirm('Reset to original template? Your changes will be lost.')) {
      setContent(originalContent)
    }
  }

  const handleEnhance = async (enhancedContent) => {
    setContent(enhancedContent)
    setShowAIEnhancer(false)
  }

  const highlightPlaceholders = (text) => {
    return text.split(/(\[.*?\])/).map((part, i) => {
      if (part.match(/^\[.*?\]$/)) {
        return (
          <span key={i} className="bg-primary/20 text-primary px-1 rounded">
            {part}
          </span>
        )
      }
      return part
    })
  }

  if (!template) return null

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className={`flex items-center gap-2 ${
          isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
        } transition-colors`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Templates
      </button>

      {/* Template Header */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {template.title}
            </h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {template.scenario}
            </p>
          </div>
          <span className={`text-xs px-3 py-1 rounded ${
            template.is_user_template
              ? 'bg-secondary/20 text-secondary'
              : isDarkMode
              ? 'bg-gray-700 text-gray-300'
              : 'bg-gray-100 text-gray-700'
          }`}>
            {template.is_user_template ? 'Custom Template' : 'System Template'}
          </span>
        </div>

        {/* Format Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setFormat('email')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              format === 'email'
                ? 'bg-primary text-white'
                : isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            Email
          </button>
          <button
            onClick={() => setFormat('chat')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              format === 'chat'
                ? 'bg-primary text-white'
                : isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
            Chat
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-sm`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Edit Template
          </h3>
          <button
            onClick={() => setShowAIEnhancer(true)}
            className="px-3 py-1.5 bg-secondary hover:bg-opacity-90 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI Enhance
          </button>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full min-h-[400px] p-4 rounded-lg border ${
            isDarkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm`}
          placeholder="Edit your template here..."
        />

        {/* Character Count */}
        <div className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {content.length} characters
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleReset}
          disabled={!hasChanges}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
            hasChanges
              ? isDarkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset
        </button>

        <button
          onClick={handleCopy}
          className="px-6 py-2 bg-primary hover:bg-opacity-90 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>

      {/* AI Enhancer Modal */}
      {showAIEnhancer && (
        <AIEnhancer
          content={content}
          onEnhance={handleEnhance}
          onClose={() => setShowAIEnhancer(false)}
          enhanceTemplate={onEnhance}
        />
      )}
    </div>
  )
}

export default TemplateEditor
