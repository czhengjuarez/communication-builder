-- Seed data: Original templates from HTML file

-- DesignOps Intro Templates
INSERT INTO system_templates (id, category, scenario, title, email_content, chat_content) VALUES
('team-intro', 'designops-intro', 'Team Introduction', 'Team Introduction (New DesignOps Role)', 
'Subject: Hello from [Your Name] – DesignOps for [Team Name]

Hi [Team],

I''m [Your Name], and I''m excited to officially introduce myself as your new Design Operations partner here at [Company Name].

My role is focused on supporting and enabling our design team to do their best work — whether that means streamlining tools and workflows, improving cross-functional collaboration, or helping to scale systems as we grow.

Here''s what you can expect from me in the coming weeks:
• Learning about how the team currently works
• Partnering with you to remove friction and amplify what''s working
• Sharing transparent updates and inviting feedback

Looking forward to working with you!

Best,
[Your Name]',
'👋 **Quick intro from DesignOps!**

Hi everyone! I''m [Your Name], your new DesignOps partner at [Company Name].

**My focus:** Making your design work smoother by handling tools, workflows, and team coordination.

**What''s next:**
• Learning how you currently work
• Finding friction points to fix
• Setting up quick 1:1s

Excited to work with you all! 💬');

INSERT INTO system_templates (id, category, scenario, title, email_content, chat_content) VALUES
('quick-hello', 'designops-intro', 'Quick Hello + 1:1 Request', 'Quick Hello + 1:1 Request',
'Subject: Quick intro + 1:1 request

Hi [Name],

I''m reaching out to introduce myself — I''m [Your Name], supporting DesignOps here at [Company Name]. I''d love to set up a quick 1:1 to learn more about your work and how I can best support or partner with you.

Hope it''s okay if I send over a calendar invite for a short chat sometime this week or next. Let me know if you have a preferred time!

Looking forward to connecting.

Best,
[Your Name]',
'👋 Hi [Name]! I''m [Your Name], your new DesignOps partner at [Company Name].

Would love a quick 1:1 to learn about your work and see how I can support you best.

Mind if I send a calendar invite for sometime this week? Let me know your preference!

Looking forward to connecting! 😊');

INSERT INTO system_templates (id, category, scenario, title, email_content, chat_content) VALUES
('xfn-intro', 'designops-intro', 'Cross-Functional Leaders', 'Cross-Functional Leaders Introduction',
'Subject: Introduction + collaboration opportunity

Hi [Name],

I''m [Your Name] — I recently joined [Team Name, e.g. DesignOps] and I am supporting [Your Manager''s Name]. I''m reaching out to introduce myself and learn more about your area and how DesignOps might be able to support or collaborate.

If you''re open to a quick 20-min 1:1, I''d love to hear about your team''s priorities and how we might stay aligned. Let me know if there''s a good time, or I''m happy to send a placeholder your way.

Looking forward to connecting!

Best,
[Your Name]',
'👋 Hi [Name]! I''m [Your Name] from DesignOps, supporting [Your Manager''s Name].

**Quick intro:** I help teams collaborate better and want to learn about your priorities.

Free for a 20-min chat this week to see how we can stay aligned?

Happy to work around your schedule! 📅');

INSERT INTO system_templates (id, category, scenario, title, email_content, chat_content) VALUES
('role-shift', 'designops-intro', 'Role Shift Announcement', 'Role Shift to DesignOps (Known Colleagues)',
'Subject: Quick update on my new role + catch up?

Hi [Name],

I wanted to give you a heads up — as you may have heard, I''ve recently shifted into a new role in DesignOps and will be supporting [mention relevant teams/functions].

I''d love to schedule a short 20-min 1:1 to catch up, hear more about your current priorities, and see how we can stay better connected moving forward. Let me know if there''s a time that works for you, or I''m happy to send over a placeholder.

Appreciate your time and looking forward to chatting!

Best,
[Your Name]',
'👋 Hey [Name]! Quick update — I''ve moved into DesignOps and will be supporting [mention relevant teams/functions].

Would love to catch up and hear about your current priorities!

**Available for:** 20-min chat to see how we can stay connected moving forward.

Let me know what works for your schedule! 📅');

-- Project Updates Templates
INSERT INTO system_templates (id, category, scenario, title, email_content, chat_content) VALUES
('status-update', 'project-updates', 'Project Status Update', 'Project Status Update',
'Subject: [Project Name] Update - [Status/Milestone]

Hi [Team/Stakeholders],

Quick update on [Project Name]:

**Current Status:** [On track / Ahead of schedule / Behind schedule / Blocked]

**This Week''s Progress:**
• [Key accomplishment 1]
• [Key accomplishment 2]
• [Key accomplishment 3]

**Next Week''s Focus:**
• [Priority task 1]
• [Priority task 2]
• [Priority task 3]

**Blockers/Concerns:**
[None at this time / List any blockers or concerns]

**Timeline Update:**
[On track for [date] / New target date is [date] due to [reason]]

Feel free to reach out with any questions.

Best,
[Your Name]',
'📊 **[Project Name] Update**

**Status:** [On track / Ahead / Behind / Blocked]

**This week:**
• [Key accomplishment 1]
• [Key accomplishment 2]

**Next week:**
• [Priority task 1]
• [Priority task 2]

**Blockers:** [None / List blockers]
**Timeline:** [On track for [date] / New date: [date]]

Questions? Drop me a message! 💬');

INSERT INTO system_templates (id, category, scenario, title, email_content, chat_content) VALUES
('milestone-reached', 'project-updates', 'Milestone Reached', 'Milestone Reached',
'Subject: 🎉 [Project Name] Milestone: [Milestone Name] Complete

Hi [Team/Stakeholders],

Great news! We''ve successfully completed [Milestone Name] for [Project Name].

**What We Accomplished:**
• [Achievement 1]
• [Achievement 2]
• [Achievement 3]

**Team Shoutouts:**
Special thanks to [Team Member(s)] for [specific contribution].

**What''s Next:**
Our next milestone is [Next Milestone] with a target completion of [Date].

Thanks for all your support in reaching this milestone!

Best,
[Your Name]',
'🎉 **Milestone Hit: [Milestone Name]!**

We just completed [Milestone Name] for [Project Name]!

**Highlights:**
• [Achievement 1]
• [Achievement 2]

**Shoutout:** [Team Member(s)] for [contribution]

**Up next:** [Next Milestone] by [Date]

Thanks everyone! 🙌');

-- Feedback Requests Templates
INSERT INTO system_templates (id, category, scenario, title, email_content, chat_content) VALUES
('design-review', 'feedback-requests', 'Design Review Request', 'Design Review Request',
'Subject: Design Review Request - [Project/Feature Name]

Hi [Reviewer Name/Team],

I''d love to get your feedback on [Project/Feature Name]. Your expertise would be incredibly valuable as we finalize this design.

**Project Context:**
[Brief description of the project and goals]

**What I''m Looking For:**
• [Specific feedback area 1]
• [Specific feedback area 2]
• [Specific feedback area 3]

**Review Materials:**
• Design files: [Link to Figma/Sketch/etc.]
• Prototype: [Link if available]

**Timeline:**
• **Feedback needed by:** [Date]

Thanks in advance for your time and insights!

Best,
[Your Name]',
'🎨 **Design Review Request**

Hi [Name]! Could use your feedback on [Project Name].

**Looking for input on:**
• [Feedback area 1]
• [Feedback area 2]

**Materials:**
• Designs: [Figma link]
• Prototype: [Link]

**Need feedback by:** [Date]

Thanks! 🙏');

INSERT INTO system_templates (id, category, scenario, title, email_content, chat_content) VALUES
('user-testing', 'feedback-requests', 'User Testing Feedback', 'User Testing Feedback Request',
'Subject: User Testing Results - Need Your Input on [Project Name]

Hi [Team/Stakeholders],

We''ve completed user testing for [Project/Feature Name] and I''d love to get your perspective on the findings and next steps.

**Key Findings:**
• **Positive:** [What worked well]
• **Pain points:** [Main usability issues identified]
• **Insights:** [Unexpected learnings]

**Recommendations:**
• **High priority:** [Critical fixes needed]
• **Medium priority:** [Important improvements]

**Full Report:**
[Link to detailed research report]

I''d love to discuss these findings and align on next steps.

Best,
[Your Name]',
'📊 **User Testing Results - [Project Name]**

Just wrapped testing with [X] users!

**Key takeaways:**
✅ **Worked well:** [Positive finding]
⚠️ **Pain point:** [Main issue]
💡 **Insight:** [Surprising learning]

**Recommendations:**
🔴 **Must fix:** [Critical issue]
🟡 **Should fix:** [Important improvement]

**Full report:** [Link]

Let''s chat about prioritization! 📅');

-- Change Management Templates
INSERT INTO system_templates (id, category, scenario, title, email_content, chat_content) VALUES
('general-change', 'change-management', 'General Change Notification', 'General Change Notification',
'Subject: Important Update: [Change/Initiative Name]

Hi [Team/Everyone],

I wanted to share an important update about [Change/Initiative Name] that will be taking effect [timeframe].

**What This Is:**
[Brief description of what is changing]

**What Will Change:**
• [Specific change 1]
• [Specific change 2]
• [Specific change 3]

**What Will Stay the Same:**
• [Unchanged element 1]
• [Unchanged element 2]
• [Unchanged element 3]

**How This Might Impact You:**
• [Impact 1]
• [Impact 2]
• [Impact 3]

**Timeline:**
• [Date]: [Milestone]
• [Date]: [Implementation]

**Questions & Information:**
For any questions, please reach out to [Contact Name] at [email/slack handle].

**Your Feedback Matters:**
[Optional: Feedback form: [Feedback Form Link]]

Thank you for your flexibility as we implement these improvements together.

Best,
[Your Name]',
'📢 **Important Update: [Change/Initiative Name]**

Hi team! Sharing an update about [Change/Initiative Name] taking effect [timeframe].

**What this is:**
[Brief description of the change]

**What will change:**
• [Specific change 1]
• [Specific change 2]

**What stays the same:**
• [Unchanged element 1]
• [Unchanged element 2]

**How this might impact you:**
• [Impact 1]
• [Impact 2]

**Timeline:**
• [Date]: [Milestone]
• [Date]: [Implementation]

**Questions?** Contact [Contact Name] - [slack handle/email]

**Feedback:** [Optional: [Feedback Form Link]]

Thanks for your flexibility! 🤝');

INSERT INTO system_templates (id, category, scenario, title, email_content, chat_content) VALUES
('process-change', 'change-management', 'Process Change Announcement', 'Process Change Announcement',
'Subject: Important Update: [Process/System Name] Changes

Hi [Team/Everyone],

I wanted to inform you about some important changes coming to [Process/System Name].

**What This Is About:**
We''re updating [Process/System Name] to [brief reason].

**What''s Changing:**
• [Change 1] → [Impact]
• [Change 2] → [Impact]

**Timeline:**
• [Date]: [Milestone]
• [Date]: [Full implementation]

**What You Need to Do:**
• [Action item 1]
• [Action item 2]

**Support Available:**
• Training sessions: [When/Where]
• Documentation: [Link]

Please don''t hesitate to reach out with any questions.

Best,
[Your Name]',
'📢 **Important Update: [Process/System Name] Changes**

Hi team! We''re updating [Process/System Name] to [brief reason].

**What''s changing:**
• [Change 1] → [Impact]
• [Change 2] → [Impact]

**Timeline:** [Start date] → [Full implementation]

**Need to know:**
• [Key action item]
• Training: [When]

Questions? DM me anytime! 🤝');

INSERT INTO system_templates (id, category, scenario, title, email_content, chat_content) VALUES
('tool-migration', 'change-management', 'Tool Migration Notice', 'Tool Migration Notice',
'Subject: [Old Tool] to [New Tool] Migration - Action Required

Hi [Team/Everyone],

We''re migrating from [Old Tool] to [New Tool] to better support our workflow needs.

**What This Is About:**
We''re moving to [New Tool] because [reason].

**Timeline:**
• [Date]: Migration begins
• [Date]: Training sessions start
• [Date]: [Old Tool] becomes read-only
• [Date]: Full migration complete

**What You Need to Do:**
• Attend training session: [Date/Time]
• Create [New Tool] account
• Test access by [date]

**Support:**
• Training: [Schedule]
• Documentation: [Link]

Best,
[Your Name]',
'🔄 **Tool Migration: [Old Tool] → [New Tool]**

We''re switching to [New Tool] for [brief reason].

**Timeline:**
• [Date]: Training starts
• [Date]: Migration complete

**Action needed:**
• Attend training: [Date]
• Create new account
• Test access by [date]

Questions? DM me! 🚀');
