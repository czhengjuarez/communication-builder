import { useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'

export const useTemplates = () => {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTemplates = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_URL}/api/templates`)
      if (!response.ok) throw new Error('Failed to fetch templates')
      const data = await response.json()
      setTemplates(data)
      setError(null)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching templates:', err)
    } finally {
      setLoading(false)
    }
  }

  const createTemplate = async (templateData) => {
    try {
      const response = await fetch(`${API_URL}/api/templates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templateData)
      })
      if (!response.ok) throw new Error('Failed to create template')
      const newTemplate = await response.json()
      setTemplates(prev => [...prev, newTemplate])
      return newTemplate
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const updateTemplate = async (id, templateData) => {
    try {
      const response = await fetch(`${API_URL}/api/templates/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templateData)
      })
      if (!response.ok) throw new Error('Failed to update template')
      const updatedTemplate = await response.json()
      setTemplates(prev => prev.map(t => t.id === id ? updatedTemplate : t))
      return updatedTemplate
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const deleteTemplate = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/templates/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete template')
      setTemplates(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const enhanceTemplate = async (content, enhancementType, context = '') => {
    try {
      const response = await fetch(`${API_URL}/api/ai/enhance-template`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, enhancementType, context })
      })
      if (!response.ok) throw new Error('Failed to enhance template')
      const data = await response.json()
      return data.enhanced
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  useEffect(() => {
    fetchTemplates()
  }, [])

  return {
    templates,
    loading,
    error,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    enhanceTemplate,
    refreshTemplates: fetchTemplates
  }
}
