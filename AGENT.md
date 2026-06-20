# Agent Guide — Communication Builder

This app is a template manager for DesignOps professionals. It stores reusable email and chat message templates for common workplace scenarios and can AI-enhance them via Workers AI.

## API base URL

```
https://communication-builder-api.coscient.workers.dev
```

---

## Available endpoints

### List all templates
```
GET /api/templates
```
Returns all system templates (read-only) and any user-created templates as a flat JSON array. All filtering and sorting should be done client-side — the endpoint always returns everything.

### Get a single template
```
GET /api/templates/:id
```

### Create a user template
```
POST /api/templates
Content-Type: application/json

{
  "title": "string (required)",
  "category": "string (required)",
  "scenario": "string (required)",
  "email_content": "string (required)",
  "chat_content": "string (required)",
  "based_on_template_id": "string (optional)"
}
```

### Update a user template
```
PUT /api/templates/:id
Content-Type: application/json

{ any subset of the fields above }
```
Only user-created templates can be updated. System templates are read-only.

### Delete a user template
```
DELETE /api/templates/:id
```
Only user-created templates can be deleted.

### AI-enhance a template
```
POST /api/ai/enhance-template
Content-Type: application/json

{
  "content": "string (required) — the template text to rewrite",
  "enhancementType": "string (required) — see options below",
  "context": "string (optional) — additional instructions for the AI"
}
```
Returns `{ "enhanced": "..." }` with the rewritten text. Powered by `@cf/meta/llama-3.3-70b-instruct-fp8-fast`.

**Enhancement types:**
| Value | What it does |
|---|---|
| `make_formal` | More professional and formal |
| `make_casual` | More casual and friendly |
| `make_empathetic` | More empathetic and understanding |
| `shorten` | Shorter while keeping key message |
| `expand` | More detail and context |
| `simplify` | Simpler language, easier to read |
| `improve_clarity` | Better clarity and structure |
| `fix_grammar` | Grammar, spelling, style fixes |

---

## Template schema

```json
{
  "id": "string",
  "category": "string",
  "scenario": "string",
  "title": "string",
  "email_content": "string",
  "chat_content": "string",
  "based_on_template_id": "string | null",
  "is_user_template": 0,
  "created_at": "ISO 8601 timestamp",
  "updated_at": "ISO 8601 timestamp"
}
```

- `email_content` — long-form email with Subject line, paragraphs, sign-off
- `chat_content` — short Slack/chat version, usually with markdown formatting
- `is_user_template` — `0` = system template (read-only), `1` = user-created
- Placeholders in both content fields use `[bracket]` notation e.g. `[Your Name]`, `[Team]`, `[Company Name]`

---

## System templates (built-in, read-only)

### Category: `designops-intro`
| ID | Scenario | Use when |
|---|---|---|
| `team-intro` | Team Introduction | First message to a new design team as DesignOps |
| `quick-hello` | Quick Hello + 1:1 Request | Reaching out to an individual to schedule a 1:1 |
| `xfn-intro` | Cross-Functional Leaders | Introducing yourself to leaders outside design |
| `role-shift` | Role Shift Announcement | You moved into DesignOps from another role |

### Category: `project-updates`
| ID | Scenario | Use when |
|---|---|---|
| `status-update` | Project Status Update | Weekly/regular project status to stakeholders |
| `milestone-reached` | Milestone Reached | Celebrating completing a project milestone |

### Category: `feedback-requests`
| ID | Scenario | Use when |
|---|---|---|
| `design-review` | Design Review Request | Requesting design critique on Figma/prototype |
| `user-testing` | User Testing Feedback | Sharing user research findings |

### Category: `change-management`
| ID | Scenario | Use when |
|---|---|---|
| `general-change` | General Change Notification | Announcing any organizational/process change |
| `process-change` | Process Change Announcement | Specific process or workflow change |
| `tool-migration` | Tool Migration Notice | Moving teams from one tool to another |

---

## How to use these templates as an agent

1. **Pick the right template** — match the user's scenario to a category/ID above, or fetch all templates and filter by `category`.
2. **Fetch the template** — `GET /api/templates/:id` to get `email_content` and `chat_content`.
3. **Fill placeholders** — replace all `[bracket]` tokens with context from the user's situation.
4. **Optionally enhance** — if the user wants a different tone or length, call `/api/ai/enhance-template` with the filled content and the appropriate `enhancementType`.
5. **Save if customized** — if the result is meaningfully different from the original, offer to save it as a new user template via `POST /api/templates` with `based_on_template_id` set to the source template's ID.

---

## Storage

- System templates are bundled in the worker — no DB read required, always available
- User templates are stored in Cloudflare KV (namespace: `TEMPLATES`)
- There is no auth — all users share the same user template pool
