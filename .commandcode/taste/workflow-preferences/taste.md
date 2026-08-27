# Workflow preferences
- Asks that plans be presented and explicitly approved before touching any files — plans should be structured in phases with verification checklists (act as an architect/planner, not just a coder). Confidence: 0.9
- Prefers to be asked clarifying questions before moving to implementation of a design/solution. Confidence: 0.7
- Organizes work into multiple logical conventional commits (e.g. feat/fix/style/refactor/chore) grouped by concern, committing locally and continuing on the current branch without pushing until asked. Confidence: 0.9
- For bug fixes, prefers minimal, atomic diffs ("fixes puntuales") over broad refactors; declares scope risks rather than expanding scope on own initiative. Confidence: 0.8
- Runs build and lint checks after changes and keeps the worktree clean before committing. Confidence: 0.6
- Commit message format: return only the message text (no preamble, quotes, or code fences); first line imperative mood, ≤72 chars, no trailing period; optional body after a blank line with short bullets or prose explaining WHY; capture the primary user-visible/developer-visible change; no "Co-authored-by" or other git trailers. Confidence: 0.8
- Communicates in Spanish. Confidence: 0.9
- Preview-first iteration on visual/design changes: wants the change applied and running for visual review (portfolio dev server at localhost:3000), then gives suggestions before further polishing. Confidence: 0.8
