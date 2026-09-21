# SilkGrow — Antigravity Open Questions

**Created:** 2026-09-20  
**Agent:** Antigravity  
**Phase:** 0 — Understanding Gate

---

## 1. Documentation File Naming

The architecture document in the repository is named `ARCHITECTURE(1).md` (with parentheses and a number suffix), while all other documentation references it as `ARCHITECTURE.md`. This appears to be a file-naming artifact rather than a content conflict. All references in other docs point to `ARCHITECTURE.md`.

**Impact:** Minor. The content is intact and readable. Should be renamed to `ARCHITECTURE.md` during Phase 1 or when the docs are moved into a `docs/` subdirectory.

**Blocking:** No.

---

## 2. Documentation Directory Location

The approved documentation references a `docs/` subdirectory (e.g., `docs/PROGRESS.md`, `docs/ANTIGRAVITY_UNDERSTANDING.md`), but the actual files currently sit at the repository root alongside the future Next.js project. During Phase 1 when the Next.js project is initialized, these files should be organized into a `docs/` subdirectory as the architecture document recommends.

**Impact:** Minor organizational concern. New Phase 0 deliverables have been created in `docs/` as specified.

**Blocking:** No.

---

## 3. Source-of-Truth Priority List Minor Discrepancy

The `AGENT_RULES.md` priority list (§3) places `DESIGN_REGISTRY.md` at position 9 and `TASKS.md` at position 10, while the user's initial instruction places them in a different order (STITCH_WORKFLOW at 8, DESIGN_REGISTRY at 9, TASKS at 10, AGENT_RULES at 11). The user's explicit instruction takes priority per the priority system itself.

**Impact:** None. The user instruction supersedes.

**Blocking:** No.

---

## Conclusion

No blocking contradictions found.

The documentation is internally consistent. The architecture, requirements, data model, implementation plan, and Stitch workflow all align. The Stitch MCP is verified and operational. The minor issues above are organizational and do not affect the ability to proceed with implementation.
