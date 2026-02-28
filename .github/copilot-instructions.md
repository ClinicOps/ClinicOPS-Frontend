# ClinicOPS Frontend - AI Coding Agent Instructions

## Project Overview
**Type:** Angular 20 SSR application (clinic management system)  
**Architecture:** Standalone components with RxJS, Angular Signals, and domain-driven design  
**Backend:** Java Springboot API at `http://localhost:8080`  
**Key Focus:** Modular domain structure, reactive state management, permission-based access control

---

## Architecture & Key Patterns

### Domain-Driven Structure
```
domains/ops/
  ├─ appointments/      (core domain feature)
  ├─ doctors/          (data & lifecycle management)
  ├─ patients/         (supporting domain)
  └─ availability/     (scheduling feature)
```

Each domain follows: **API → Facade → Store** pattern.

### State Management Pattern: Facade + Store
- **Store** (`{feature}.store.ts`): Pure signals-based state holder using Angular Signals (`signal()`)
- **Facade** (`{feature}.facade.ts`): Injects API client + Store, orchestrates data flow and user actions
- **Example:** `DoctorsStore` holds `doctors`, `loading`, `filters`, `page` signals; `DoctorsFacade` calls `api.list()` then updates store via `setDoctors()`
- Reactive effects in facades automatically reload data when permissions or dependencies change

### Permission System
- **Model:** Role-based permissions as strings (`'OPS:APPOINTMENT:VIEW'`, `'OPS:DOCTOR:UPDATE'`)
- **Defined per domain:** `{domain}/permissions.ts` exports `*_PERMISSIONS` constants
- **Loaded via:** `PermissionService` (uses `effects()` to load when user/clinic context ready)
- **Guard usage:** `permissionGuard(APPOINTMENT_PERMISSIONS.VIEW)` protects routes; on fail, redirects to `/forbidden`
- **Computed checks:** Facades expose `canCreate`, `canView` computed signals that reactively control UI

### Reactive Data Flow with Signals
- **Core pattern:** Components read from facade's computed signals (`facade.appointments()`, `facade.canCreate()`)
- **State updates:** Facades use `subscribe()` to API calls, then mutate store signals; no manual component subscriptions
- **App readiness:** `AppStateService.ready()` computed waits for `/me` bootstrap + `PermissionService.loaded()` before rendering protected routes

---

## Critical Files & Workflows

### Authentication & Bootstrap
- **`auth.service.ts`:** Login/logout, stores `accessToken` in localStorage, provides `getAccessToken()`
- **`auth.interceptor.ts`:** Injects `Authorization: Bearer` header on all HTTP requests
- **`me.service.ts`:** Loaded on first navigation (see `app.ts` NgOnInit logic), fetches user profile + clinic context
- **Bootstrap flow:** App → MeService.bootstrap() → PermissionService.loadPermissions() → Ready signal flips true

### API Client
- **`api-client.ts`:** Centralized HTTP wrapper, base URL `http://localhost:8080`
- **Domain-specific APIs:** `{feature}.api.ts` (e.g., `appointment.api.ts`) extend it with typed endpoints
- **Interceptor chain:** AuthInterceptor → API response → Facade consumes

### Routing & Lazy Loading
- **App routes:** `app.routes.ts` defines main paths
- **Domain routes:** Lazy-loaded via `loadChildren` (e.g., doctors at `/ops/doctors` loads `doctors.routes.ts`)
- **Route structure per domain:** Empty path = list, `/create` = create, `/:id/edit` = edit

### Standalone Components (Angular 20)
- All components are standalone; no NgModules
- **Decorator pattern:** `@Component({ standalone: true, imports: [...], templateUrl, styleUrl })`
- **Inject pattern:** Use `inject()` to retrieve dependencies instead of constructor params

---

## Development Commands & Debugging

### Essential Commands
```bash
ng serve              # Start dev server (http://localhost:4200)
ng build              # Production build (outputs to dist/)
ng test               # Run Karma unit tests
npm run watch         # Watch mode build
```

### Backend API
- Ensure backend runs on `http://localhost:8080` (hardcoded in `api-client.ts`)
- Key endpoints: `/auth/login`, `/auth/register`, `/me`, `/me/permissions`, `/appointments`, `/doctors`, `/availability`, `/patients`

### SSR Server
- Built with Express (`express.ts`), runs at `/` on server
- Assets served from `public/`; app bundle from `dist/clinicops-frontend/server`
- Command: `npm run serve:ssr:clinicops-frontend`

---

## Common Implementation Patterns

### Adding a New Feature Domain
1. Create `domains/ops/{feature}/` with subdirs: `pages/`, `services/`, `components/`
2. Define `{feature}.api.ts` (inject `ApiClient`, expose typed methods)
3. Define `{feature}.store.ts` (signals for state)
4. Define `{feature}.facade.ts` (inject API + Store, add effects/computeds)
5. Create `{feature}.permissions.ts` with permission constants
6. Create `{feature}.routes.ts` (lazy-loaded from `app.routes.ts`)

### Displaying Data in a Component
```typescript
private facade = inject(MyFacade);
readonly data = computed(() => this.facade.data());  // Reactive read
readonly canEdit = computed(() => this.facade.canEdit());
```

### Handling Permissions in Routes
```typescript
// app.routes.ts
{
  path: 'ops/feature',
  component: FeaturePage,
  canActivate: [permissionGuard(FEATURE_PERMISSIONS.VIEW)]
}
```

### Loading Data on Permission Change
- Wrap `facade.load()` call in `effect()` that depends on permission computed
- Example: `AppointmentFacade` re-loads when `canView()` becomes true

### Form Submissions
- Forms use `[formControl]` or `formGroup` (from `@angular/forms`)
- Call `facade.create(data)` or `facade.update(id, data)`, which:
  1. Calls `api.post/put()`
  2. On success, refreshes state via `this.load()`

---

## Code Style & TypeScript Strictness

### TypeScript Config
- **Strict mode:** Enabled (`"strict": true`)
- **No implicit returns:** Required (`noImplicitReturns: true`)
- **No index signature access without key:** Required (`noPropertyAccessFromIndexSignature: true`)
- **Target:** ES2022 with module preservation

### Angular Best Practices
- Use `inject()` for dependencies (no constructor injection needed)
- Use `computed()` + `effect()` for reactive chains
- Avoid manual subscriptions in components; use `async` pipe or direct signal reads
- Use `standalone: true` on all components

### Styling
- **SCSS:** Default for all components (configured in `angular.json`)
- **Global styles:** `styles.scss`
- **Component styles:** `{component}.scss` colocated with `.ts` file

---

## Debugging Tips
- **Permission issues:** Check `PermissionService.loaded()` computed and verify `/me/permissions` endpoint responds
- **Blank pages:** Verify `AppStateService.ready()` in browser DevTools (should be true after bootstrap)
- **API failures:** Check backend is running on port 8080; inspect network tab in browser
- **State not updating:** Ensure facade is injected properly and `load()`/`subscribe()` is called after data mutation
