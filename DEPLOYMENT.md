# Deployment Guide

Complete step-by-step guide to deploy Communication Builder to production.

## Prerequisites

- Cloudflare account (sign up at https://dash.cloudflare.com/sign-up)
- Wrangler CLI installed: `npm install -g wrangler`
- Wrangler authenticated: `wrangler login`

## Step 1: Set Up Cloudflare D1 Database

### Create Database

```bash
cd worker
wrangler d1 create communication-builder-db
```

**Output:**
```
✅ Successfully created DB 'communication-builder-db'!

[[d1_databases]]
binding = "DB"
database_name = "communication-builder-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

### Update wrangler.toml

Copy the `database_id` from the output and update `worker/wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "communication-builder-db"
database_id = "YOUR_DATABASE_ID_HERE"  # Replace with your actual ID
```

### Run Database Migrations

```bash
# Create schema
wrangler d1 execute communication-builder-db --file=schema.sql

# Seed with templates
wrangler d1 execute communication-builder-db --file=seed.sql
```

**Verify:**
```bash
wrangler d1 execute communication-builder-db --command="SELECT COUNT(*) FROM system_templates"
```

Should return: `12` (12 system templates)

## Step 2: Deploy Backend Worker

### Deploy Worker

```bash
cd worker
wrangler deploy
```

**Output:**
```
✨ Built successfully!
✨ Uploaded successfully!
✨ Deployment complete!

https://communication-builder-api.YOUR_SUBDOMAIN.workers.dev
```

### Test Worker

```bash
# Health check
curl https://communication-builder-api.YOUR_SUBDOMAIN.workers.dev/api/health

# Get templates
curl https://communication-builder-api.YOUR_SUBDOMAIN.workers.dev/api/templates
```

## Step 3: Deploy Frontend

### Option A: Cloudflare Pages (Recommended)

1. **Build frontend**
   ```bash
   cd frontend
   
   # Create production env
   echo "VITE_API_URL=https://communication-builder-api.YOUR_SUBDOMAIN.workers.dev" > .env.production
   
   # Build
   npm run build
   ```

2. **Deploy to Pages**
   ```bash
   wrangler pages deploy dist --project-name=communication-builder
   ```

3. **Access your app**
   ```
   https://communication-builder.pages.dev
   ```

### Option B: Cloudflare Workers Site

1. **Create frontend worker**
   ```bash
   cd frontend
   npm run build
   
   # Create worker for static assets
   wrangler init frontend-worker
   ```

2. **Configure wrangler.toml**
   ```toml
   name = "communication-builder"
   main = "worker.js"
   compatibility_date = "2024-01-01"
   
   [site]
   bucket = "./dist"
   ```

3. **Create worker.js**
   ```javascript
   import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
   
   export default {
     async fetch(request, env, ctx) {
       try {
         return await getAssetFromKV(
           {
             request,
             waitUntil: ctx.waitUntil.bind(ctx),
           },
           {
             ASSET_NAMESPACE: env.__STATIC_CONTENT,
             ASSET_MANIFEST: __STATIC_CONTENT_MANIFEST,
           }
         )
       } catch (e) {
         return new Response('Not Found', { status: 404 })
       }
     }
   }
   ```

4. **Deploy**
   ```bash
   wrangler deploy
   ```

### Option C: Vercel/Netlify

1. **Build frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy dist folder** to your preferred platform

3. **Set environment variable**
   ```
   VITE_API_URL=https://communication-builder-api.YOUR_SUBDOMAIN.workers.dev
   ```

## Step 4: Configure CORS (if needed)

If your frontend and backend are on different domains, update CORS in `worker/src/index.js`:

```javascript
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://your-frontend-domain.com',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}
```

## Step 5: Set Up Custom Domain (Optional)

### For Worker (Backend)

1. Go to Cloudflare Dashboard → Workers & Pages
2. Select your worker → Settings → Triggers
3. Add Custom Domain: `api.yourdomain.com`

### For Pages (Frontend)

1. Go to Cloudflare Dashboard → Workers & Pages
2. Select your Pages project → Custom domains
3. Add Custom Domain: `app.yourdomain.com`

## Step 6: Monitor & Maintain

### View Logs

```bash
# Worker logs
wrangler tail communication-builder-api

# Real-time logs
wrangler tail communication-builder-api --format=pretty
```

### Database Queries

```bash
# Check template count
wrangler d1 execute communication-builder-db --command="SELECT COUNT(*) FROM system_templates"

# View user templates
wrangler d1 execute communication-builder-db --command="SELECT * FROM user_templates"

# Check AI usage
wrangler d1 execute communication-builder-db --command="SELECT enhancement_type, COUNT(*) as count FROM ai_enhancements GROUP BY enhancement_type"
```

### Update Templates

To add/modify system templates:

1. Edit `worker/seed.sql`
2. Run migration:
   ```bash
   wrangler d1 execute communication-builder-db --file=seed.sql
   ```

## Troubleshooting

### Issue: "Database not found"

**Solution:** Make sure you've created the database and updated `wrangler.toml` with the correct `database_id`.

### Issue: "AI binding not found"

**Solution:** Cloudflare AI is automatically available. Make sure your account has AI enabled (free tier includes 10,000 neurons/day).

### Issue: CORS errors

**Solution:** Update CORS headers in `worker/src/index.js` to match your frontend domain.

### Issue: Templates not loading

**Solution:** 
1. Check worker is deployed: `curl https://YOUR_WORKER_URL/api/health`
2. Check database has data: `wrangler d1 execute communication-builder-db --command="SELECT COUNT(*) FROM system_templates"`
3. Check frontend env variable: `VITE_API_URL` is set correctly

### Issue: AI enhancement fails

**Solution:**
1. Check AI usage: Cloudflare Dashboard → AI → Usage
2. Free tier limit: 10,000 neurons/day (~10-15 enhancements)
3. Upgrade to paid plan if needed ($5/month)

## Cost Monitoring

### Free Tier Limits
- Workers: 100,000 requests/day
- D1: 5M reads/day, 100K writes/day
- AI: 10,000 neurons/day
- Pages: Unlimited bandwidth

### Paid Plan ($5/month)
- Workers: 10M requests/month
- D1: Unlimited reads, 1M writes
- AI: 10,000 neurons/day (same)
- Pages: Unlimited bandwidth

### Monitor Usage

1. Go to Cloudflare Dashboard
2. Workers & Pages → Analytics
3. Check request count, CPU time, AI usage

## Rollback

If deployment fails:

```bash
# Rollback worker
wrangler rollback communication-builder-api

# Rollback database (restore from backup)
wrangler d1 execute communication-builder-db --file=backup.sql
```

## Security Checklist

- [ ] Environment variables set correctly
- [ ] CORS configured for production domain
- [ ] Database ID not exposed in public repos
- [ ] Rate limiting enabled (if needed)
- [ ] Error messages don't expose sensitive info
- [ ] API endpoints validated and sanitized

## Next Steps

After deployment:

1. Test all features in production
2. Set up monitoring/alerts
3. Configure custom domain
4. Enable analytics
5. Plan for user authentication (future)

---

**Deployment complete! 🎉**

Your Communication Builder is now live and ready to use.
