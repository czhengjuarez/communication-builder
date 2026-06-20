# Iteration Notes — Data Layer

## Question: Do we actually need D1 at all, or can we go pure JSON?

**Updated answer after deeper study: D1 can be dropped entirely. KV + static JSON is sufficient.**

The previous analysis assumed the SQL filtering/sorting was load-bearing. It isn't.

---

### What the code actually does (key findings)

**All filtering and sorting is done client-side**, not in SQL.

`TemplateList.jsx` uses `useMemo` to filter by category, search, and group by category in the browser. The Worker's `ORDER BY category, title` in `getTemplates` is dead weight — the client re-sorts and re-groups regardless.

**`GET /api/templates` always returns everything.** There is no paginated, server-side filtered, or partial fetch. The entire dataset is dumped to the client on load. The SQL queries might as well be "give me all rows."

**`GET /api/templates/:id` is not called from the frontend.** `useTemplates.js` has no `fetchTemplate(id)` function. When the user selects a template from the list, they already have the full object. The single-template endpoint exists in the Worker but is unused by the UI.

**`ai_enhancements` is write-only from the UI.** The table is never read — there's no API route or UI for viewing enhancement history. It's an analytics dead end.

**`user_id` is stored but never set.** The `user_templates` table has a `user_id` column but auth is not implemented — all inserts pass `null`. Currently all users share one global pool of custom templates.

---

### What each table actually needs

| Table | Operations | Real requirement |
|---|---|---|
| `system_templates` | read all, read by id | Static data — never changes via API |
| `user_templates` | list all, get by id, insert, update by id, delete by id | Key-value CRUD, no server-side query |
| `ai_enhancements` | insert only (best-effort, errors swallowed) | Never read; logging with no consumer |

---

### The simplified architecture: no D1

**`system_templates` → JS constant in the Worker**

11 templates, ~15 KB of text. Bundle directly as a JS array. No infrastructure, no round-trip, no migration. Zero cost.

**`user_templates` → KV namespace**

Every operation maps cleanly to KV primitives:
- `GET /api/templates` → `kv.list()` + parallel `kv.get()` per key, concat with system constant
- `GET /api/templates/:id` → check system array, then `kv.get(id)`
- `POST /api/templates` → `kv.put(id, JSON.stringify(template))`
- `PUT /api/templates/:id` → `kv.put(id, JSON.stringify(merged))`
- `DELETE /api/templates/:id` → `kv.delete(id)`

No SQL. No schema. No migrations. The API surface to the frontend stays identical.

**`ai_enhancements` → drop it**

Nothing reads it. Remove the insert in `enhanceTemplate()` and delete the table. If analytics are wanted later, Workers Analytics Engine is the right tool (not a SQL table nobody queries).

---

### Trade-offs to be aware of

- **KV eventual consistency**: after a write, reads may briefly return stale data. For a template manager with no real-time collaboration, this is acceptable.
- **No atomic updates**: KV has no transactions. Two simultaneous `PUT` calls could race. With no auth and single-user context, this is not a real risk right now.
- **Listing all KV keys is an extra round-trip**: `kv.list()` returns keys, then you fetch each value. For tens of templates this is fine; for thousands it would need rethinking. Not a concern here.

---

### Files to change when implementing

| File | Change |
|---|---|
| [worker/wrangler.toml](worker/wrangler.toml) | Remove `[[d1_databases]]`, add `[[kv_namespaces]]` |
| [worker/src/index.js](worker/src/index.js) | Replace all `env.DB` calls with `env.KV` + system JSON constant |
| [worker/schema.sql](worker/schema.sql) | Delete (no longer needed) |
| [worker/seed.sql](worker/seed.sql) | Convert to a JS module (`system_templates.js`) |

Frontend (`useTemplates.js`, components) — **no changes needed**. API contract is identical.

---

### Previous (now superseded) conclusion

> "D1 is the right tool because of `ORDER BY category, title`, filtering, and partial `UPDATE`."

This was wrong. The SQL ORDER BY is ignored (client re-sorts). Filtering is entirely client-side. "Partial UPDATE" is 3 lines of KV read-merge-write. The assumption that SQL was doing real work didn't survive reading the frontend code.
