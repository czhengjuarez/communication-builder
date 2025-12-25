import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { useTemplates } from '../hooks/useTemplates'
import TemplateList from './TemplateList'
import TemplateEditor from './TemplateEditor'
import CreateTemplateModal from './CreateTemplateModal'

const CommunicationBuilder = () => {
  const { isDarkMode, toggleDarkMode } = useTheme()
  const { 
    templates, 
    loading, 
    error,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    enhanceTemplate
  } = useTemplates()

  const [currentView, setCurrentView] = useState('list') // 'list', 'editor'
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template)
    setCurrentView('editor')
  }

  const handleBackToList = () => {
    setCurrentView('list')
    setSelectedTemplate(null)
  }

  const handleCreateTemplate = async (templateData) => {
    try {
      await createTemplate(templateData)
      setShowCreateModal(false)
    } catch (err) {
      console.error('Failed to create template:', err)
    }
  }

  const handleDeleteTemplate = async (id) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await deleteTemplate(id)
        if (selectedTemplate?.id === id) {
          handleBackToList()
        }
      } catch (err) {
        console.error('Failed to delete template:', err)
      }
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-dark-bg' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b sticky top-0 z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Communication Builder
              </h1>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Professional templates for every scenario
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-primary hover:bg-opacity-90 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Template
              </button>
              
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {currentView === 'list' ? (
          <TemplateList
            templates={templates}
            loading={loading}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onSelectTemplate={handleSelectTemplate}
            onDeleteTemplate={handleDeleteTemplate}
          />
        ) : (
          <TemplateEditor
            template={selectedTemplate}
            onBack={handleBackToList}
            onUpdate={updateTemplate}
            onEnhance={enhanceTemplate}
          />
        )}
      </main>

      {/* Create Template Modal */}
      {showCreateModal && (
        <CreateTemplateModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateTemplate}
        />
      )}
    </div>
  )
}

export default CommunicationBuilder
