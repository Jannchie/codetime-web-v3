-- 0009_agent_sessions_project_name_idx.sql
--
-- Composite index on agent_sessions (user_id, project, last_event_at).
--
-- Serves the two reads keyed on the raw project string, neither of which
-- can use agent_sessions_project_idx (that indexes the resolved
-- project_id UUID):
--
--   1. GET /v3/users/shield?metric=tokens — public badge endpoint, hit on
--      every README view; sums total_tokens over user + optional project
--      + optional last_event_at window. Without this index it scans every
--      session row of the user per hit.
--   2. GET /v3/agent/projects — the badge configurator's project picker;
--      groups by project ordered by max(last_event_at) on every keystroke.
--
-- Safe on a live database: CREATE INDEX CONCURRENTLY takes no write lock.
-- CONCURRENTLY cannot run inside a transaction block — apply this file
-- without wrapping it in BEGIN/COMMIT.

CREATE INDEX CONCURRENTLY IF NOT EXISTS agent_sessions_project_name_idx
  ON agent_sessions (user_id, project, last_event_at);
