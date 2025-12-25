import { useTheme } from '../contexts/ThemeContext'

const TemplateCard = ({ template, onSelect, onDelete }) => {
  const { isDarkMode } = useTheme()
  const isUserTemplate = template.is_user_template

  return (
    <div
      className={`${
        isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
      } rounded-lg p-4 shadow-sm border ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      } transition-all cursor-pointer group`}
      onClick={() => onSelect(template)}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} group-hover:text-primary transition-colors`}>
          {template.title}
        </h3>
        {isUserTemplate && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(template.id)
            }}
            className={`p-1 rounded ${
              isDarkMode
                ? 'text-gray-400 hover:text-red-400 hover:bg-gray-700'
                : 'text-gray-400 hover:text-red-600 hover:bg-gray-100'
            } transition-colors`}
            title="Delete template"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>
      
      <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {template.scenario}
      </p>

      <div className="flex items-center justify-between">
        <span className={`text-xs px-2 py-1 rounded ${
          isUserTemplate
            ? 'bg-secondary/20 text-secondary'
            : isDarkMode
            ? 'bg-gray-700 text-gray-300'
            : 'bg-gray-100 text-gray-700'
        }`}>
          {isUserTemplate ? 'Custom' : 'System'}
        </span>

        <div className="flex items-center gap-2">
          <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            Email & Chat
          </span>
          <svg
            className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'} group-hover:text-primary transition-colors`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default TemplateCard
