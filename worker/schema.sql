-- Communication Builder Database Schema

-- System templates (read-only, seeded from migration)
CREATE TABLE IF NOT EXISTS system_templates (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  scenario TEXT NOT NULL,
  title TEXT NOT NULL,
  email_content TEXT NOT NULL,
  chat_content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User custom templates (future: add user_id when auth is implemented)
CREATE TABLE IF NOT EXISTS user_templates (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  category TEXT NOT NULL,
  scenario TEXT NOT NULL,
  title TEXT NOT NULL,
  email_content TEXT NOT NULL,
  chat_content TEXT NOT NULL,
  based_on_template_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI enhancement history (for analytics and improvement)
CREATE TABLE IF NOT EXISTS ai_enhancements (
  id TEXT PRIMARY KEY,
  template_id TEXT,
  original_content TEXT NOT NULL,
  enhanced_content TEXT NOT NULL,
  enhancement_type TEXT NOT NULL,
  context TEXT,
  user_feedback TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_system_templates_category ON system_templates(category);
CREATE INDEX IF NOT EXISTS idx_user_templates_category ON user_templates(category);
CREATE INDEX IF NOT EXISTS idx_user_templates_user_id ON user_templates(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_enhancements_template_id ON ai_enhancements(template_id);
