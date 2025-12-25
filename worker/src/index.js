/**
 * Communication Builder API
 * Cloudflare Worker with D1 Database and AI
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    const path = url.pathname

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    try {
      // Health check
      if (path === '/api/health') {
        return jsonResponse({ status: 'ok', timestamp: new Date().toISOString() }, corsHeaders)
      }

      // Get all templates (system + user)
      if (path === '/api/templates' && request.method === 'GET') {
        return await getTemplates(env, corsHeaders)
      }

      // Get single template
      if (path.match(/^\/api\/templates\/[^/]+$/) && request.method === 'GET') {
        const id = path.split('/').pop()
        return await getTemplate(env, id, corsHeaders)
      }

      // Create user template
      if (path === '/api/templates' && request.method === 'POST') {
        const data = await request.json()
        return await createTemplate(env, data, corsHeaders)
      }

      // Update user template
      if (path.match(/^\/api\/templates\/[^/]+$/) && request.method === 'PUT') {
        const id = path.split('/').pop()
        const data = await request.json()
        return await updateTemplate(env, id, data, corsHeaders)
      }

      // Delete user template
      if (path.match(/^\/api\/templates\/[^/]+$/) && request.method === 'DELETE') {
        const id = path.split('/').pop()
        return await deleteTemplate(env, id, corsHeaders)
      }

      // AI Enhancement
      if (path === '/api/ai/enhance-template' && request.method === 'POST') {
        const data = await request.json()
        return await enhanceTemplate(env, data, corsHeaders)
      }

      return jsonResponse({ error: 'Not found' }, corsHeaders, 404)
    } catch (error) {
      console.error('Error:', error)
      return jsonResponse({ error: error.message }, corsHeaders, 500)
    }
  }
}

// Helper function for JSON responses
function jsonResponse(data, headers = {}, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  })
}

// Generate unique ID
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Get all templates (system + user)
 */
async function getTemplates(env, corsHeaders) {
  try {
    // Get system templates
    const systemTemplates = await env.DB.prepare(
      'SELECT *, 0 as is_user_template FROM system_templates ORDER BY category, title'
    ).all()

    // Get user templates
    const userTemplates = await env.DB.prepare(
      'SELECT *, 1 as is_user_template FROM user_templates ORDER BY category, title'
    ).all()

    // Combine and return
    const allTemplates = [
      ...systemTemplates.results,
      ...userTemplates.results
    ]

    return jsonResponse(allTemplates, corsHeaders)
  } catch (error) {
    console.error('Error fetching templates:', error)
    throw error
  }
}

/**
 * Get single template by ID
 */
async function getTemplate(env, id, corsHeaders) {
  try {
    // Try system templates first
    let template = await env.DB.prepare(
      'SELECT *, 0 as is_user_template FROM system_templates WHERE id = ?'
    ).bind(id).first()

    // If not found, try user templates
    if (!template) {
      template = await env.DB.prepare(
        'SELECT *, 1 as is_user_template FROM user_templates WHERE id = ?'
      ).bind(id).first()
    }

    if (!template) {
      return jsonResponse({ error: 'Template not found' }, corsHeaders, 404)
    }

    return jsonResponse(template, corsHeaders)
  } catch (error) {
    console.error('Error fetching template:', error)
    throw error
  }
}

/**
 * Create user template
 */
async function createTemplate(env, data, corsHeaders) {
  try {
    const { title, category, scenario, email_content, chat_content, based_on_template_id } = data

    // Validate required fields
    if (!title || !category || !scenario || !email_content || !chat_content) {
      return jsonResponse(
        { error: 'Missing required fields: title, category, scenario, email_content, chat_content' },
        corsHeaders,
        400
      )
    }

    const id = generateId()
    const now = new Date().toISOString()

    await env.DB.prepare(
      `INSERT INTO user_templates 
       (id, category, scenario, title, email_content, chat_content, based_on_template_id, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id,
      category,
      scenario,
      title,
      email_content,
      chat_content,
      based_on_template_id || null,
      now,
      now
    ).run()

    // Fetch and return the created template
    const template = await env.DB.prepare(
      'SELECT *, 1 as is_user_template FROM user_templates WHERE id = ?'
    ).bind(id).first()

    return jsonResponse(template, corsHeaders, 201)
  } catch (error) {
    console.error('Error creating template:', error)
    throw error
  }
}

/**
 * Update user template
 */
async function updateTemplate(env, id, data, corsHeaders) {
  try {
    // Check if template exists and is a user template
    const existing = await env.DB.prepare(
      'SELECT * FROM user_templates WHERE id = ?'
    ).bind(id).first()

    if (!existing) {
      return jsonResponse(
        { error: 'Template not found or is a system template (cannot be edited)' },
        corsHeaders,
        404
      )
    }

    const { title, category, scenario, email_content, chat_content } = data
    const now = new Date().toISOString()

    await env.DB.prepare(
      `UPDATE user_templates 
       SET title = ?, category = ?, scenario = ?, email_content = ?, chat_content = ?, updated_at = ?
       WHERE id = ?`
    ).bind(
      title || existing.title,
      category || existing.category,
      scenario || existing.scenario,
      email_content || existing.email_content,
      chat_content || existing.chat_content,
      now,
      id
    ).run()

    // Fetch and return the updated template
    const template = await env.DB.prepare(
      'SELECT *, 1 as is_user_template FROM user_templates WHERE id = ?'
    ).bind(id).first()

    return jsonResponse(template, corsHeaders)
  } catch (error) {
    console.error('Error updating template:', error)
    throw error
  }
}

/**
 * Delete user template
 */
async function deleteTemplate(env, id, corsHeaders) {
  try {
    // Check if template exists and is a user template
    const existing = await env.DB.prepare(
      'SELECT * FROM user_templates WHERE id = ?'
    ).bind(id).first()

    if (!existing) {
      return jsonResponse(
        { error: 'Template not found or is a system template (cannot be deleted)' },
        corsHeaders,
        404
      )
    }

    await env.DB.prepare('DELETE FROM user_templates WHERE id = ?').bind(id).run()

    return jsonResponse({ success: true, message: 'Template deleted' }, corsHeaders)
  } catch (error) {
    console.error('Error deleting template:', error)
    throw error
  }
}

/**
 * AI Enhancement using Cloudflare Workers AI
 */
async function enhanceTemplate(env, data, corsHeaders) {
  try {
    const { content, enhancementType, context } = data

    if (!content || !enhancementType) {
      return jsonResponse(
        { error: 'Missing required fields: content, enhancementType' },
        corsHeaders,
        400
      )
    }

    // Build prompt based on enhancement type
    const prompts = {
      make_formal: 'Rewrite the following communication template to be more formal and professional. Maintain all placeholders in [brackets].',
      make_casual: 'Rewrite the following communication template to be more casual and friendly. Maintain all placeholders in [brackets].',
      make_empathetic: 'Rewrite the following communication template to be more empathetic and understanding. Maintain all placeholders in [brackets].',
      shorten: 'Shorten the following communication template while keeping the key message. Maintain all placeholders in [brackets].',
      expand: 'Expand the following communication template with more detail and context. Maintain all placeholders in [brackets].',
      simplify: 'Simplify the language in the following communication template to make it easier to understand. Maintain all placeholders in [brackets].',
      improve_clarity: 'Improve the clarity and structure of the following communication template. Maintain all placeholders in [brackets].',
      fix_grammar: 'Fix grammar, spelling, and style issues in the following communication template. Maintain all placeholders in [brackets].'
    }

    const basePrompt = prompts[enhancementType] || prompts.improve_clarity
    const fullPrompt = context 
      ? `${basePrompt}\n\nAdditional context: ${context}\n\nTemplate:\n${content}`
      : `${basePrompt}\n\nTemplate:\n${content}`

    // Call Cloudflare AI
    const response = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
      messages: [
        {
          role: 'system',
          content: 'You are a professional communication expert. Your task is to improve communication templates while preserving all placeholders in [brackets]. Return only the improved template without explanations.'
        },
        {
          role: 'user',
          content: fullPrompt
        }
      ]
    })

    const enhanced = response.response || content

    // Log enhancement for analytics (optional)
    const enhancementId = generateId()
    try {
      await env.DB.prepare(
        `INSERT INTO ai_enhancements 
         (id, original_content, enhanced_content, enhancement_type, context, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`
      ).bind(
        enhancementId,
        content.substring(0, 1000), // Limit stored content
        enhanced.substring(0, 1000),
        enhancementType,
        context || null,
        new Date().toISOString()
      ).run()
    } catch (logError) {
      console.error('Failed to log enhancement:', logError)
      // Don't fail the request if logging fails
    }

    return jsonResponse({ enhanced }, corsHeaders)
  } catch (error) {
    console.error('Error enhancing template:', error)
    throw error
  }
}
