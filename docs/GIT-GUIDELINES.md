# Git Guidelines

## ⚠️ CRITICAL RULE: NO AI REFERENCES IN COMMITS

**ABSOLUTELY NO REFERENCES TO AI ASSISTANTS, CLAUDE, CLAUDE CODE, OR ANY AUTOMATED TOOLS IN COMMIT MESSAGES. PERIOD.**

This is a hard requirement. Any commit message containing:
- References to "Claude", "Claude Code", or any AI assistant
- "Generated with" footers or links to AI tools
- "Co-Authored-By: Claude" or similar AI attributions
- Any mention of automated code generation

...is UNACCEPTABLE and must be rewritten.

## Commit Message Format

Commit messages should:
- Be clear, concise, and describe what changed and why
- Use conventional commit format when appropriate (e.g., `feat:`, `fix:`, `docs:`, `style:`, `refactor:`)
- Focus on the technical changes only
- Be written as if by a human developer
- Contain NO footers, NO generated-with attributions, NO AI references whatsoever

**Good examples:**
```
feat: add responsive navigation menu
fix: resolve TypeScript build configuration error
docs: update project setup instructions
refactor: simplify consultant card component
fix: handle unbound variable in cleanup script
```

**Bad examples (NEVER EVER do this):**
```
❌ feat: add navigation menu

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>

❌ Any message with footer text
❌ Any message with emoji robots
❌ Any message mentioning AI, Claude, or automated tools
❌ Any Co-Authored-By lines for AI assistants
```

## Multi-line Commit Messages

For commits requiring more detail:
```
feat: add user authentication system

Implements JWT-based authentication with refresh tokens.
Includes login, logout, and token validation endpoints.
```

**NO footers. NO attributions. NO AI references. Just the technical description.**

## Co-Authorship

- NEVER include `Co-Authored-By`
- NEVER add automated tool attributions
- If unsure, leave it out entirely

## Include files
- Always inlcde **.claude/settings.local.json** if there has been changes to it.