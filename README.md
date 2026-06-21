# Communication Builder

> **AI-powered communication template manager for professional scenarios**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://communication-builder.coscient.workers.dev)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare-Workers-orange)](https://workers.cloudflare.com/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)

**Live App:** https://communication-builder.coscient.workers.dev  
**Backend API:** https://communication-builder-api.coscient.workers.dev

A modern React application with Cloudflare Workers AI that helps you create, customize, and enhance communication templates for various professional scenarios.

---

## ✨ Features

### 🎯 Core Template System
- **11 Pre-built System Templates** across 4 categories:
  - **DesignOps Intro** (4 templates): Team introductions, 1:1 requests, cross-functional intros, role shifts
  - **Project Updates** (2 templates): Status updates, milestone announcements
  - **Feedback Requests** (2 templates): Design reviews, user testing feedback
  - **Change Management** (3 templates): General changes, process changes, tool migrations
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
- **Powered by Llama 3.3 70B fp8-fast**

### 📝 User-Generated Templates
- **Create Custom Templates**: Build your own templates from scratch with full form validation
- **Persistent Storage**: All custom templates saved in Cloudflare KV
- **Full CRUD Operations**: Create, read, update, and delete your templates
- **System Template Reference**: Optionally link custom templates to system templates
- **Unlimited Templates**: No limit on custom template creation
- **Category Organization**: Organize custom templates into existing categories

### 🎨 Design System
- **Keel design tokens** (Ops Forward):
  - Primary: `#80074D` (magenta-600)
  - Secondary: `#A60E64` (magenta-500)
  - Dark Background: `#0B0810` (gray-950)
  - Fonts: Space Grotesk (headings) + Inter (body)
- **Dark Mode**: Full dark mode support with persistence
- **Responsive**: Mobile-first design

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
│  ↓                               ↓           │
│  Cloudflare AI                  KV Storage   │
│  (Llama 3.3 70B fp8-fast)       user_templates│
│                                               │
│  System templates: bundled in Worker (no DB) │
│                                               │
└─────────────────────────────────────────────┘
```

## 📦 Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite 7** - Build tool & dev server
- **Tailwind CSS 3.4** - Styling
- **Space Grotesk + Inter** - Keel design system fonts

### Backend
- **Cloudflare Workers** - Serverless compute
- **Cloudflare KV** - User template storage
- **Cloudflare AI** - Llama 3.3 70B fp8-fast model
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
   cd communication-builder
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

4. **Create a KV namespace**
   ```bash
   cd worker
   wrangler kv namespace create "TEMPLATES"
   # Copy the id from output and update worker/wrangler.toml
   ```

   Update `worker/wrangler.toml`:
   ```toml
   [[kv_namespaces]]
   binding = "TEMPLATES"
   id = "YOUR_KV_NAMESPACE_ID"
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

## 📊 Data Storage

### System templates
Bundled as a static JS constant in [worker/src/index.js](worker/src/index.js) — no database read required. 11 templates across 4 categories. To add or change system templates, edit the `SYSTEM_TEMPLATES` array directly.

### User templates
Stored in Cloudflare KV (`TEMPLATES` namespace). One key per template, value is JSON. Fields:

| Field | Type | Notes |
|---|---|---|
| `id` | string | `{timestamp}-{random}` |
| `category` | string | One of the 4 categories |
| `scenario` | string | Scenario name |
| `title` | string | Display title |
| `email_content` | string | Long-form email version |
| `chat_content` | string | Short Slack/chat version |
| `based_on_template_id` | string \| null | Source system template |
| `is_user_template` | `1` | Always 1 for user templates |
| `created_at` | ISO 8601 | |
| `updated_at` | ISO 8601 | |

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
- Enhances template using Llama 3.3 70B fp8-fast
- Body: `{ content, enhancementType, context? }`
- Enhancement types: `make_formal`, `make_casual`, `make_empathetic`, `shorten`, `expand`, `simplify`, `improve_clarity`, `fix_grammar`
- Response: `{ enhanced: string }`

## 🚀 Deployment

### Backend Worker

1. **Deploy worker**
   ```bash
   cd worker
   wrangler deploy
   ```

2. **Note your worker URL** (e.g., `https://communication-builder-api.YOUR_SUBDOMAIN.workers.dev`)

### Frontend

1. **Update production API URL**
   ```bash
   cd frontend
   echo "VITE_API_URL=https://communication-builder-api.YOUR_SUBDOMAIN.workers.dev" > .env.production
   ```

2. **Build and deploy**
   ```bash
   npm run build
   wrangler pages deploy dist
   ```

## 💰 Cost Estimate

### Cloudflare Workers Free Tier
- ✅ 100,000 requests/day
- ✅ 10ms CPU time per request
- ✅ 1GB KV storage
- ✅ 100K KV reads/day
- ✅ 1K KV writes/day
- ✅ 10,000 AI neurons/day (~10-15 enhancements)

**Expected Cost**: $0/month for moderate usage

### Cloudflare Workers Paid ($5/month)
- ✅ 10M requests/month
- ✅ 50ms CPU time per request
- ✅ Unlimited KV reads
- ✅ 1M KV writes/month
- ✅ 10,000 AI neurons/day

**Expected Cost**: $5/month for heavy usage

## 📁 Project Structure

```
communication-builder/
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
│   │   └── index.js             # API routes + system templates
│   ├── package.json
│   └── wrangler.toml
│
├── AGENT.md                     # Agent usage guide
├── ITERATION_NOTES.md           # Data layer decision log
└── README.md
```

## 🎯 Key Improvements Over Original HTML

| Feature | Original HTML | Current App |
|---------|---------------|-------------|
| **Architecture** | Single file | Modular components |
| **Styling** | Inline CSS | Tailwind + Keel tokens |
| **Data Storage** | Hardcoded | KV (user) + bundled JS (system) |
| **User Templates** | ❌ None | ✅ Full CRUD |
| **Search** | ❌ None | ✅ Full-text search |
| **AI Features** | ❌ None | ✅ 8 enhancement types |
| **Dark Mode** | ❌ None | ✅ Full support |
| **Mobile** | Basic | Fully responsive |
| **Deployment** | Static file | Cloudflare Workers |

## 🔮 Future Enhancements

- [ ] User authentication (Google OAuth)
- [ ] Template sharing via URL
- [ ] Template versioning & history
- [ ] Analytics dashboard
- [ ] Template marketplace
- [ ] Team collaboration
- [ ] Export to multiple formats (PDF, DOCX)
- [ ] AI-powered template suggestions
- [ ] Integration with email clients

## 📝 License

MIT License

---

**Made with ❤️ for better professional communication**
