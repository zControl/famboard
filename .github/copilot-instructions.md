# Copilot Instructions for FamBoard

## Overview

FamBoard is a monorepo with a NestJS backend and a Vite/React frontend. It helps families track chores, rewards, and more. The backend uses TypeORM with Postgres, while the frontend leverages Tanstack Router/Query, TailwindCSS, and Shadcn/UI.

## Architecture

- **backend/**: NestJS REST API, organized by modules (auth, users, rewards, tasks, etc.).
  - `src/modules/`: Feature modules (CRUD, business logic)
  - `src/database/`: TypeORM setup, migrations
  - `src/config/`: Database and app config
- **frontend/**: Vite/React app, modularized by features and UI components.
  - `src/features/`: Feature folders (auth, dashboard, rewards, etc.)
  - `src/components/`: Shared UI and composite components
  - `src/api/`: API client and endpoint definitions

## Developer Workflows

### Backend

- **Install**: `npm install` in `backend/`
- **Run (dev)**: `npm run start:dev`
- **Test**: `npm run test` (unit), `npm run test:e2e` (e2e), `npm run test:cov` (coverage)
- **Build**: `npm run build`
- **Migrations**:
  - Generate: `npm run typeorm migration:generate src/database/migrations/MigrationNameHere`
  - Run: `npm run typeorm migration:run`

### Frontend

- **Install**: `npm install` in `frontend/`
- **Run (dev)**: `npm run dev`
- **Build**: `npm run build`
- **Test**: (see project for details)

## Project-Specific Patterns

- **Backend**: Follows NestJS module/controller/service pattern. Database config is in `src/config/`. Migrations live in `src/database/migrations/`.
- **Frontend**: Feature-first folder structure. API calls use `src/api/apiClient.ts` and endpoint definitions in `src/api/apiEndpoints.ts`. UI components are in `src/components/ui/` and composites in `src/components/composites/`.
- **Styling**: TailwindCSS and Shadcn/UI for consistent design.
- **Routing**: Tanstack Router for typesafe navigation.

## Integration Points

- **API**: Frontend communicates with backend via REST endpoints defined in `src/api/apiEndpoints.ts`.
- **Database**: TypeORM entities and migrations in backend.
- **Shared conventions**: Use feature folders for scalability; keep business logic in services (backend) and hooks (frontend).

## Examples

- To add a new backend feature: create a module in `backend/src/modules/`, add controller/service, update `app.module.ts`.
- To add a new frontend feature: create a folder in `frontend/src/features/`, add routes/components, update navigation in Tanstack Router.

---

For questions or unclear patterns, check the respective `README.md` files or ask for clarification.
