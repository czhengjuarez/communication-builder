# Communication Builder

> **AI-powered communication template manager for professional scenarios**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://communication-builder.coscient.workers.dev)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange)](https://workers.cloudflare.com/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)

**Live App:** https://communication-builder.coscient.workers.dev  
**Backend API:** https://communication-builder-api.coscient.workers.dev

A modern React application with Cloudflare Workers AI that helps you create, customize, and enhance communication templates for various professional scenarios. Transformed from a flat HTML file into a full-stack, production-ready application.

---

## ✨ Features

### 🎯 Core Template System
- **12 Pre-built System Templates** across 4 categories:
  - **DesignOps Intro** (4 templates): Team introductions, 1:1 requests, cross-functional intros, role shifts
  - **Project Updates** (2 templates): Status updates, milestone announcements
  - **Feedback Requests** (2 templates): Design reviews, user testing feedback
  - **Change Management** (4 templates): General changes, process changes, tool migrations
- **Dual Format Support**: Every template has both Email and Chat versions
- **Editable Templates**: Customize any template inline with live preview
- **Copy to Clipboard**: One-click copy for easy pasting into email/chat
- **Placeholder Highlighting**: Visual indicators for customizable fields `[like this]`

### 🔍 Search & Filter
- **Full-text Search**: Search across titles, scenarios, and content
- **Category Filter**: Filter templates by category
- **Smart Results**: See template count and grouped results

### 🤖 AI Enhancement (Cloudflare Workers AI)
- **8 Enhancement Types**:
  - Make More Formal 👔
  - Make More Casual 😊
  - Add Empathy 💙
  - Make Shorter ✂️
  - Add More Detail 📝
  - Simplify Language 💡
  - Improve Clarity 🎯
  - Fix Grammar & Style ✅
- **Context-Aware**: Add custom context for better results
- **Powered by Llama 3.1 8B**

### 📝 User-Generated Templates
- **Create Custom Templates**: Build your own templates from scratch with full form validation
- **Persistent Storage**: All custom templates saved in Cloudflare D1 database
- **Full CRUD Operations**: Create, read, update, and delete your templates
- **System Template Reference**: Optionally link custom templates to system templates
- **Unlimited Templates**: No limit on custom template creation
- **Category Organization**: Organize custom templates into existing categories

### 🎨 Design System
- **Consistent with AgentBriefing**:
  - Primary: `#8E1F5A` (maroon)
  - Secondary: `#DD388B` (pink)
  - Dark Background: `#0D1533` (navy)
- **Dark Mode**: Full dark mode support with persistence
- **Responsive**: Mobile-first design
- **Modern UI**: Tailwind CSS with smooth transitions

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│         Cloudflare Global Network            │
├─────────────────────────────────────────────┤
│                                               │
│  Frontend (React + Vite)                     │
│  ↓                                            │
│  Backend API Worker                           │
│  ├── GET /api/templates                      │
│  ├── POST /api/templates                     │
│  ├── PUT /api/templates/:id                  │
│  ├── DELETE /api/templates/:id               │
│  └── POST /api/ai/enhance-template           │
│  ↓                                            │
│  Cloudflare AI (Llama 3.1 8B)                │
│  ↓                                            │
│  D1 Database (SQLite)                         │
│  ├── system_templates (12 templates)         │
│  ├── user_templates (custom)                 │
│  └── ai_enhancements (analytics)             │
│                                               │
└─────────────────────────────────────────────┘
```

## 📦 Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite 7** - Build tool & dev server
- **Tailwind CSS 3.4** - Styling
- **Modern JavaScript** - ES modules

### Backend
- **Cloudflare Workers** - Serverless compute
- **Cloudflare D1** - SQLite database
- **Cloudflare AI** - Llama 3.1 8B model
- **REST API** - JSON endpoints

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Cloudflare account (free tier works)
- Wrangler CLI: `npm install -g wrangler`

### Installation

1. **Clone and navigate**
   ```bash
   cd CommunicationBuilder
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install worker dependencies**
   ```bash
   cd ../worker
   npm install
   ```

4. **Set up Cloudflare D1 Database**
   ```bash
   # Create database
   wrangler d1 create communication-builder-db
   
   # Copy the database_id from output and update worker/wrangler.toml
   
   # Run schema
   wrangler d1 execute communication-builder-db --file=schema.sql
   
   # Seed with templates
   wrangler d1 execute communication-builder-db --file=seed.sql
   ```

5. **Create frontend .env file**
   ```bash
   cd ../frontend
   cp .env.example .env
   # Edit .env and set VITE_API_URL=http://localhost:8787
   ```

### Local Development

1. **Start the worker (in worker directory)**
   ```bash
   cd worker
   npm run dev
   ```
   Worker runs at `http://localhost:8787`

2. **Start the frontend (in new terminal, in frontend directory)**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs at `http://localhost:5173`

3. **Open browser**
   Navigate to `http://localhost:5173`

## 📊 Database Schema

### system_templates
- `id` - Unique identifier
- `category` - Template category
- `scenario` - Scenario name
- `title` - Display title
- `email_content` - Email format template
- `chat_content` - Chat format template
- `created_at` - Timestamp

### user_templates
- `id` - Unique identifier
- `user_id` - User identifier (future)
- `category` - Template category
- `scenario` - Scenario name
- `title` - Display title
- `email_content` - Email format template
- `chat_content` - Chat format template
- `based_on_template_id` - Reference to system template
- `created_at` - Timestamp
- `updated_at` - Timestamp

### ai_enhancements
- `id` - Unique identifier
- `template_id` - Reference to template
- `original_content` - Original text
- `enhanced_content` - AI-enhanced text
- `enhancement_type` - Type of enhancement
- `context` - User-provided context
- `user_feedback` - Feedback (future)
- `created_at` - Timestamp

## 🔌 API Endpoints

### Templates

**GET /api/templates**
- Returns all templates (system + user)
- Response: `Array<Template>`

**GET /api/templates/:id**
- Returns single template
- Response: `Template`

**POST /api/templates**
- Creates user template
- Body: `{ title, category, scenario, email_content, chat_content }`
- Response: `Template`

**PUT /api/templates/:id**
- Updates user template (system templates cannot be edited)
- Body: `{ title?, category?, scenario?, email_content?, chat_content? }`
- Response: `Template`

**DELETE /api/templates/:id**
- Deletes user template (system templates cannot be deleted)
- Response: `{ success: true }`

### AI Enhancement

**POST /api/ai/enhance-template**
- Enhances template using AI
- Body: `{ content, enhancementType, context? }`
- Enhancement types: `make_formal`, `make_casual`, `make_empathetic`, `shorten`, `expand`, `simplify`, `improve_clarity`, `fix_grammar`
- Response: `{ enhanced: string }`

## 🚀 Deployment

### Backend Worker

1. **Update wrangler.toml with your database ID**
   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "communication-builder-db"
   database_id = "YOUR_DATABASE_ID_HERE"
   ```

2. **Deploy worker**
   ```bash
   cd worker
   wrangler deploy
   ```

3. **Note your worker URL** (e.g., `https://communication-builder-api.YOUR_SUBDOMAIN.workers.dev`)

### Frontend

1. **Update production API URL**
   ```bash
   cd frontend
   # Create .env.production
   echo "VITE_API_URL=https://communication-builder-api.YOUR_SUBDOMAIN.workers.dev" > .env.production
   ```

2. **Build frontend**
   ```bash
   npm run build
   ```

3. **Deploy to Cloudflare Pages** (or any static host)
   ```bash
   wrangler pages deploy dist
   ```

## 💰 Cost Estimate

### Cloudflare Workers Free Tier
- ✅ 100,000 requests/day
- ✅ 10ms CPU time per request
- ✅ 5GB D1 storage
- ✅ 5M D1 reads/day
- ✅ 100K D1 writes/day
- ✅ 10,000 AI neurons/day (~10-15 enhancements)

**Expected Cost**: $0/month for moderate usage

### Cloudflare Workers Paid ($5/month)
- ✅ 10M requests/month
- ✅ 50ms CPU time per request
- ✅ Unlimited D1 storage
- ✅ Unlimited D1 reads
- ✅ 1M D1 writes
- ✅ 10,000 AI neurons/day

**Expected Cost**: $5/month for heavy usage

## 📁 Project Structure

```
CommunicationBuilder/
├── frontend/                    # React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── CommunicationBuilder.jsx  # Main app
│   │   │   ├── TemplateList.jsx          # List with search
│   │   │   ├── TemplateCard.jsx          # Template preview
│   │   │   ├── TemplateEditor.jsx        # Edit & copy
│   │   │   ├── AIEnhancer.jsx            # AI enhancement UI
│   │   │   └── CreateTemplateModal.jsx   # Create custom
│   │   ├── contexts/
│   │   │   └── ThemeContext.jsx          # Dark mode
│   │   ├── hooks/
│   │   │   └── useTemplates.js           # API integration
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── worker/                      # Cloudflare Worker API
│   ├── src/
│   │   └── index.js                      # API routes
│   ├── schema.sql                        # Database schema
│   ├── seed.sql                          # Template data
│   ├── package.json
│   └── wrangler.toml
│
├── index.html                   # Original flat HTML (archived)
└── README.md
```

## 🎯 Key Improvements Over Original HTML

| Feature | Original HTML | New React App |
|---------|---------------|---------------|
| **Architecture** | Single file | Modular components |
| **Styling** | Inline CSS | Tailwind + Theme |
| **Data Storage** | Hardcoded | D1 Database |
| **User Templates** | ❌ None | ✅ Full CRUD |
| **Search** | ❌ None | ✅ Full-text search |
| **AI Features** | ❌ None | ✅ 8 enhancement types |
| **Dark Mode** | ❌ None | ✅ Full support |
| **Mobile** | Basic | Fully responsive |
| **Deployment** | Static file | Cloudflare Workers |
| **Scalability** | Limited | Production-ready |

## 🔮 Future Enhancements

- [ ] User authentication (Google OAuth)
- [ ] Template sharing via URL
- [ ] Template versioning & history
- [ ] Analytics dashboard
- [ ] Template marketplace
- [ ] Team collaboration
- [ ] Export to multiple formats (PDF, DOCX)
- [ ] Template categories management
- [ ] AI-powered template suggestions
- [ ] Integration with email clients

## 📝 License

MIT License

## 🙏 Acknowledgments

- Design system inspired by [AgentBriefing](../AgentBriefing)
- Built with [Cloudflare Workers](https://workers.cloudflare.com/)
- AI powered by [Cloudflare AI](https://ai.cloudflare.com/)
- Original templates from Communication Builder HTML

---

**Made with ❤️ for better professional communication**
