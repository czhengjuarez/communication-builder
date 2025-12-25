# Quick Start Guide

Get Communication Builder running locally in 5 minutes.

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Worker
cd ../worker
npm install
```

### 2. Set Up Database

```bash
cd worker

# Create D1 database
wrangler d1 create communication-builder-db

# Copy the database_id and update wrangler.toml

# Create schema
wrangler d1 execute communication-builder-db --file=schema.sql

# Seed templates
wrangler d1 execute communication-builder-db --file=seed.sql
```

### 3. Configure Environment

```bash
cd ../frontend
cp .env.example .env
# Edit .env: VITE_API_URL=http://localhost:8787
```

### 4. Start Development

**Terminal 1 - Worker:**
```bash
cd worker
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Open Browser

Navigate to `http://localhost:5173`

## ✅ Verify Installation

1. **Templates Load**: You should see 12 system templates
2. **Search Works**: Type in search box
3. **Filter Works**: Select a category
4. **Template Opens**: Click a template card
5. **Copy Works**: Click "Copy to Clipboard"
6. **AI Enhancement**: Click "AI Enhance" (requires Cloudflare AI)
7. **Create Template**: Click "Create Template" button

## 🎯 Try These Features

### Search Templates
- Type "intro" → See all introduction templates
- Type "update" → See project update templates

### Edit Template
1. Click any template card
2. Modify the content
3. Click "Copy to Clipboard"
4. Paste into your email client

### AI Enhancement
1. Open a template
2. Click "AI Enhance"
3. Select enhancement type (e.g., "Make More Formal")
4. Add context (optional)
5. Click "Enhance with AI"

### Create Custom Template
1. Click "Create Template"
2. Fill in all fields
3. Click "Create Template"
4. Find it in the list (marked as "Custom")

## 🐛 Common Issues

### Templates not loading
```bash
# Check worker is running
curl http://localhost:8787/api/health

# Check database
cd worker
wrangler d1 execute communication-builder-db --command="SELECT COUNT(*) FROM system_templates"
```

### AI enhancement fails
- Make sure you're logged into Wrangler: `wrangler login`
- Check AI is enabled in your Cloudflare account
- Free tier: 10,000 neurons/day (~10-15 enhancements)

### Port already in use
```bash
# Frontend (default 5173)
npm run dev -- --port 5174

# Worker (default 8787)
wrangler dev --port 8788
```

## 📚 Next Steps

- Read [README.md](./README.md) for full documentation
- Read [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- Customize templates in `worker/seed.sql`
- Add your own categories

## 💡 Tips

- Use `[placeholders]` in templates for customizable fields
- Dark mode toggle in top-right corner
- Search works across all template content
- System templates cannot be edited (create custom versions instead)
- Custom templates are stored in D1 database

---

**Happy communicating! 🎉**
