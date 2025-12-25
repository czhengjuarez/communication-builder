import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

const CATEGORIES = [
  { value: 'designops-intro', label: 'DesignOps Intro' },
  { value: 'project-updates', label: 'Project Updates' },
  { value: 'feedback-requests', label: 'Feedback Requests' },
  { value: 'change-management', label: 'Change Management' },
]

const CreateTemplateModal = ({ onClose, onCreate }) => {
  const { isDarkMode } = useTheme()
  const [formData, setFormData] = useState({
    title: '',
    category: 'designops-intro',
    scenario: '',
    email_content: '',
    chat_content: ''
  })
  const [errors, setErrors] = useState({})
  const [creating, setCreating] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.scenario.trim()) newErrors.scenario = 'Scenario is required'
    if (!formData.email_content.trim()) newErrors.email_content = 'Email content is required'
    if (!formData.chat_content.trim()) newErrors.chat_content = 'Chat content is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validate()) return

    setCreating(true)
    try {
      await onCreate(formData)
      onClose()
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to create template' })
    } finally {
      setCreating(false)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className={`sticky top-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Create Custom Template
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${
                isDarkMode
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              } transition-colors`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Template Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="E.g., Quick Team Update"
              className={`w-full px-4 py-2 rounded-lg border ${
                errors.title
                  ? 'border-red-500'
                  : isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>

          {/* Category and Scenario */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              >
                {CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Scenario Name *
              </label>
              <input
                type="text"
                value={formData.scenario}
                onChange={(e) => handleChange('scenario', e.target.value)}
                placeholder="E.g., Weekly Sprint Update"
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.scenario
                    ? 'border-red-500'
                    : isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
              />
              {errors.scenario && <p className="mt-1 text-sm text-red-500">{errors.scenario}</p>}
            </div>
          </div>

          {/* Email Content */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email Format *
            </label>
            <textarea
              value={formData.email_content}
              onChange={(e) => handleChange('email_content', e.target.value)}
              placeholder="Subject: [Subject Line]&#10;&#10;Hi [Name],&#10;&#10;[Your message here]&#10;&#10;Best,&#10;[Your Name]"
              className={`w-full h-48 p-4 rounded-lg border ${
                errors.email_content
                  ? 'border-red-500'
                  : isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm`}
            />
            {errors.email_content && <p className="mt-1 text-sm text-red-500">{errors.email_content}</p>}
            <p className={`mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Use [placeholders] for customizable fields
            </p>
          </div>

          {/* Chat Content */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Chat Format *
            </label>
            <textarea
              value={formData.chat_content}
              onChange={(e) => handleChange('chat_content', e.target.value)}
              placeholder="👋 Hi [Name]!&#10;&#10;[Your message here]&#10;&#10;Let me know if you have questions! 😊"
              className={`w-full h-48 p-4 rounded-lg border ${
                errors.chat_content
                  ? 'border-red-500'
                  : isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm`}
            />
            {errors.chat_content && <p className="mt-1 text-sm text-red-500">{errors.chat_content}</p>}
            <p className={`mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              More casual, emoji-friendly version
            </p>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-200">{errors.submit}</p>
            </div>
          )}
        </form>

        {/* Footer */}
        <div className={`sticky bottom-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}>
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={creating}
              className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                creating
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary hover:bg-opacity-90 text-white'
              }`}
            >
              {creating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Template
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateTemplateModal
