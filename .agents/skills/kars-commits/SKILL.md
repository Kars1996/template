---
name: kars-commits
description: Commit message style guide for Kars. Conventional commits with casual/techbro tone, no periods, imperative mood, and specific allowed types.
---

# Kars Commit Style

> Conventional commits with a casual/technical voice. Structured but not corporate.

---

## 1. Format

Always use this pattern:

```
type(scope): description
```

Omit the scope if the change touches multiple scopes or is repo-wide:

```
type: description
```

### Rules
- **No trailing period** at the end of the description.
- **Lowercase** the first word after the colon (proper nouns like `discord`, `statsfm`, `stripe` stay capitalized).
- **Imperative mood** — write as if you are commanding the code to change.
- **Present tense** — "add", not "added" or "adds".
- **No emoji** in commit messages.
- **No quotes** around the description.

---

## 2. Allowed Types

| Type | Usage |
|------|-------|
| `feat` | New feature, new file, new endpoint, new component. |
| `fix` | Bug fix, correction, typo, broken logic. |
| `chore` | Maintenance, config change, dependency bump, cleanup, docs update. |
| `refactor` | Restructuring code without changing external behavior. |
| `style` | CSS, visual, spacing, formatting, purely cosmetic changes. |
| `del` | Deleting files, removing dead code, dropping features. |
| `imprv` | Improvement to existing feature — faster, cleaner, better UX. |
| `update` | Bumping versions, refreshing data, syncing with upstream. |

### Do NOT use
- `test`, `docs`, `perf`, `build`, `ci` — these exist in standard conventional commits but are not part of this style.
- `wip`, `temp`, `fixme`, `todo` — never commit work-in-progress labels.

---

## 3. Allowed Scopes

Use a scope whenever the change is isolated to one domain. Examples:

- `(api)` — backend routes, handlers, middleware.
- `(db)` — schema, migrations, queries, ORM.
- `(ui)` — components, layouts, styling, frontend visuals.
- `(cli)` — command-line tools, scripts, terminal output.
- `(config)` — env vars, settings, config loaders.

Omit the scope when:
- The change touches three or more scopes.
- It is a repo-wide cleanup or dependency update.

---

## 4. Description Voice

### Tone
- Casual but technical. You can say "shit" or "twin" or "ahhh" if it is part of your natural voice, but the message must still be readable.
- Do not write full sentences. Use comma-separated actions or short phrases.

### Examples of good descriptions
- `feat(cli): add path formatting spinner and feedback update`
- `fix(ui): default bool to yes, replace spinner with kapp style`
- `chore(config): remove recursion between loadConfig and saveConfig`
- `refactor(cli): extract commands into cli folder and add smart update`
- `del: useless stuff`
- `imprv(api): dynamic payment methods for partners`
- `update: gif to png conversion in upload pipeline`

### Examples of bad descriptions
- `Update stuff` — too vague.
- `Fixed a bug` — no type/scope, passive voice.
- `feat: added new feature` — passive voice, trailing period.
- `a` — single letter, meaningless.
- `i forgot to eat today` — not a commit message.
- `Herping the fucking derp right here and now` — not a commit message.
- `feat(api): fix bug.` — trailing period.

---

## 5. Multi-Change Commits

When one commit covers multiple small changes, list them separated by commas or "and".

```
feat(ui): add accent sliders, integrations, voting, and comments
```

Keep it under 72 characters if possible. If it exceeds 72 characters, the second line can expand.

---

## 6. Body and Footer

A body is optional. Use it only when the "why" is not obvious from the subject line.

```
feat(worker): queue slideshow generation instead of synchronous render

The API was blocking for 30+ seconds during FFmpeg assembly.
BullMQ handles retries and progress tracking better.
```

Footer is rarely needed. Use it for:
- `Closes #123`
- `BREAKING CHANGE: ...`

---

## 7. Quick Reference

```
feat(scope): add, create, implement, introduce
fix(scope): correct, prevent, resolve, stop
chore(scope): update, bump, clean, reorganize, rename
refactor(scope): extract, split, merge, simplify, dedupe
style(scope): switch, adjust, improve quality, rounded borders
del(scope): remove, drop, delete, rmv
imprv(scope): optimize, speed up, better ux, smoother
update(scope): sync, refresh, bump version, migrate
```

---

## 8. Pre-Flight Checklist

- [ ] Type is from the allowed list.
- [ ] Scope is present if the change is isolated; omitted if it is wide.
- [ ] Description is lowercase after the colon (except proper nouns).
- [ ] No trailing period.
- [ ] Imperative mood, present tense.
- [ ] Not a sentence — comma-separated actions or short phrases.
- [ ] Not a random thought, joke, or single letter.
- [ ] Under 72 characters for the subject line.
