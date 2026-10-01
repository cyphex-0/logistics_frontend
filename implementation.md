
# Courier & Logistics Platform — Frontend Implementation Blueprint

> **Merged-plan status:** This final roadmap preserves the stronger backend-contract discipline and secure session architecture from the GPT blueprint, while incorporating the alternate plan's useful concrete setup sequence, reusable component catalog, service/hook inventory, page-level UI detail, smoke tests, and commit matrix. Conflicting or unsupported items were deliberately excluded rather than merged blindly.

## 0. Purpose and Scope

This document is the master, dependency-ordered implementation roadmap for the **B7A7 Frontend (Fullstack) assignment** for the **Courier & Logistics Platform**.

The backend is treated as **already implemented and frozen for frontend work**. The provided API documentation states that the backend implementation and documentation match the documented implementation, and the provided Postman collection contains 40 request entries. fileciteturn0file1L1138-L1148 After normalizing role-specific login examples, the collection represents **38 unique HTTP method + path contracts**. The frontend must consume these APIs rather than redesigning the backend.

### Source-of-truth order

1. Explicit B7A7 project requirements.
2. Existing API documentation and the provided Postman collection.
3. Existing backend behavior described in the API documentation.
4. Existing project/codebase conventions, once the frontend repository exists.
5. Reasonable engineering conventions only where the sources leave a gap.

### Repository-local agent instructions and design-skill requirement

Before the coding agent performs **any frontend design, UI/UX work, component design, visual implementation, page implementation, styling, responsive-layout work, or frontend refactor**, it MUST first inspect the actual project repository for:

1. `AGENTS.md`
2. the `.agents/` directory and its available skills/instructions
3. any repository-local skill documentation referenced by `AGENTS.md`

The coding agent MUST read `AGENTS.md` before implementation and MUST use the **necessary/relevant skill(s) from `.agents` for the specific frontend design or implementation task** instead of bypassing those skills. If the repository contains skills equivalent to the alternate plan's `modern-web-design`, `motion-framer`, `scroll-reveal-libraries`, or `animated-component-libraries`, use them for the matching work; otherwise select the repository's actual equivalent skill names. For example, if the repository provides a dedicated UI/UX, design-system, responsive-design, accessibility, component, or frontend-architecture skill, the agent must apply it to the corresponding phase.

This is a mandatory execution rule, not an optional recommendation. The agent should select the smallest relevant set of skills for each task, follow their instructions, and keep the resulting implementation consistent with the repository's existing conventions. Do not invent a replacement process when an applicable repository skill already exists. If `AGENTS.md` or `.agents/` provides more specific instructions, those instructions must be followed for the affected work.

### Explicit assignment constraints

- Next.js App Router + TypeScript.
- Tailwind CSS + shadcn/ui.
- TanStack Query for server-state; Zustand only where client/global state is justified.
- React Hook Form + Zod for forms.
- Custom JWT session handling + Next.js Middleware.
- Stripe Test Mode as the primary payment flow.
- Recharts or Chart.js for admin analytics.
- `next/image` for real images.
- Lucide React for icons.
- Sonner for toast notifications.
- Mobile-first responsive design.
- At least 18 meaningful, functional pages; this plan targets 29 actual routes/pages including utility and payment routes, plus route-level loading/error files.
- Three fixed roles: CUSTOMER, COURIER, ADMIN.
- One-click demo login for all three roles.
- URL synchronization for search, filters, sorting, and pagination.
- Real API only for core workflows; no mocked shipment/user/payment data.
- `loading.tsx` for every data-fetching route.
- `error.tsx` boundaries for recoverable page failures.
- No `any` types.
- At least 20 meaningful frontend commits.
- Production deployment and demo documentation.

The assignment explicitly requires role checks at both middleware/route level and UI level, a mandatory real payment flow, real backend API integration, URL-synchronized list state, skeleton loading states, graceful error handling, and a multi-step form.

## Merged Engineering Conventions Adopted from the Alternate Implementation

The alternate implementation plan contained several useful implementation-level conventions. The following are intentionally incorporated here **after removing or correcting anything that conflicts with the frozen backend contract or assignment rules**.

### Repository structure baseline

Use this structure as a concrete starting point when the repository does not already define a stronger convention:

```text
src/
├── app/
│   ├── (public)/
│   ├── (auth)/
│   ├── (customer)/
│   ├── (courier)/
│   ├── (admin)/
│   ├── api/
│   │   └── auth/
│   ├── error.tsx
│   ├── not-found.tsx
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── layouts/
│   ├── shared/
│   ├── forms/
│   └── features/
├── hooks/
├── lib/
│   ├── api/
│   ├── auth/
│   ├── errors/
│   └── query/
├── services/
├── stores/
├── types/
└── tests/
```

If `AGENTS.md` or the existing repository uses a different structure, preserve the repository's established convention rather than forcing this example.

### Dependency baseline

Install only dependencies actually required by the implementation and only after checking `package.json` and repository instructions. The intended stack is:

- Next.js App Router + TypeScript.
- Tailwind CSS + shadcn/ui.
- TanStack Query.
- Zustand only for justified client/UI state.
- React Hook Form + Zod.
- Recharts.
- Lucide React.
- Sonner.
- `next-themes` only if the repository/design system uses it.
- `date-fns` only where date formatting/relative-time utilities are needed.

Do not install duplicate libraries for the same purpose.

### Reusable component baseline

The shared component layer should cover, where needed:

`StatCard`, `StatusBadge`, `DataTable`, `SearchInput`, `PaginationControls`, `EmptyState`, `ConfirmDialog`, `NotificationBell`, `ShipmentTimeline`, `PriceCalculator`, `LoadingSkeleton`, `FormField`, `PageHeader`.

These are responsibilities, not instructions to create every component unconditionally. Create a component when it has genuine reuse across multiple pages.

### Concrete API service baseline

Implement one centralized typed service boundary with domain modules such as:

- `auth.service`
- `user.service`
- `shipment.service`
- `payment.service`
- `zone.service`
- `pricing.service`
- `admin.service`

All browser-originated authenticated calls should pass through the Next.js BFF/session boundary. Do not copy the alternate plan's client-side token-in-Zustand architecture into this project.

### Concrete hook baseline

Create typed TanStack Query hooks for the documented services, plus small utilities such as:

`useAuth`, `useDebounce`, `usePaginationParams`, `useShipments`, `useShipment`, `useTracking`, `useNotifications`, `useZones`, `usePricing`, and corresponding mutation hooks.

Use query invalidation deliberately after mutations. Do not use global state as a duplicate server cache.

### UI/UX skill execution baseline

For every visual/frontend phase, first inspect the actual `.agents` skill inventory. When matching skills exist, use them. The alternate plan referenced skills for modern web design, motion, scroll reveal, and animated components; those patterns may be used **only when those exact or equivalent skills exist in the repository**. Do not invent a skill path or assume a skill exists.

Animations are progressive enhancement. They must never block content, break reduced-motion preferences, or replace semantic feedback.

### Concrete verification baseline

Every phase must include a runnable verification step. Where appropriate, prefer the concrete checks used in the alternate plan:

- `npm run dev`
- `npm run build`
- `tsc --noEmit`
- lint
- targeted unit/component tests
- role-specific smoke tests
- mobile widths such as 375px/768px/1280px
- production smoke test after deployment

Never mark a phase complete from visual inspection alone when that phase changes API behavior, authentication, data state, forms, or routing.

### Merged decision register

The following decisions are locked unless the actual repository instructions or backend contract prove otherwise:

1. **Stripe is the assignment payment gateway.** bKash is not required for assignment completion because the requirement is Stripe or SSLCommerz. The existing backend's Stripe flow is the primary implemented path.
2. **Google OAuth is optional.** Implement it only when the repository has the required Google client configuration and the backend contract can be exercised end-to-end. Never add fake Google sign-in.
3. **Public tracking is not invented.** Tracking uses authenticated ownership-scoped APIs. The track-by-number experience lives inside an authenticated customer area unless the backend is explicitly verified to expose a public search contract.
4. **Contact is informational.** Because the backend has no documented contact-submission endpoint, do not simulate a successful submission.
5. **Admin user detail may be implemented as a route or drawer.** Prefer the pattern that matches the repository's navigation conventions. The real `GET /admin/users/:id` contract must still be consumed when user detail is shown.
6. **Sorting must not become an undocumented API query parameter.** When the backend does not document server-side sorting, a sort control may operate on the currently loaded dataset and synchronize its state in the URL, while the UI clearly avoids claiming that the server performed the sort.
7. **No invented public statistics.** Marketing pages may use documented product capabilities, but must not display fabricated shipment counts, delivery rates, zone counts, testimonials, or operational KPIs as if they were real.
 fileciteturn0file2L24-L33 fileciteturn0file2L80-L101

## 1. Backend Contract Baseline

### API base URL

The provided Postman collection defines:

```text
https://logistics-backend-jyz7.onrender.com/api/v1
```

as `baseUrl`. fileciteturn0file0L6-L25

For the frontend, this becomes an environment variable and is never hardcoded in application components.

### Canonical response contract

Success:

```json
{
  "success": true,
  "message": "Human readable message",
  "data": {},
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

Error:

```json
{
  "success": false,
  "message": "Error reason",
  "errors": [
    { "field": "email", "message": "Invalid format" }
  ]
}
```

The backend documentation explicitly defines this response convention and structured validation errors. fileciteturn0file1L1027-L1036 fileciteturn0file1L1054-L1075

### Role model

| Role | Core responsibilities |
|---|---|
| CUSTOMER | Calculate price, create shipments, pay, track, cancel pending shipments, manage own profile/notifications |
| COURIER | View assigned shipments, update lifecycle status, record delivery/failure context, manage own profile/notifications |
| ADMIN | Dashboard, users, shipments, courier assignment, zones, pricing rules, refunds, audit logs |

The API documentation states these role responsibilities directly. fileciteturn0file1L19-L35

### Shipment lifecycle

```text
PENDING
  ↓
CONFIRMED
  ↓
PICKUP_ASSIGNED
  ↓
PICKED_UP
  ↓
IN_TRANSIT
  ↓
OUT_FOR_DELIVERY
  ├──→ DELIVERED
  └──→ FAILED_DELIVERY
          ├──→ OUT_FOR_DELIVERY (reattempt, max 3)
          └──→ RETURNED (max attempts reached)

PENDING → CANCELLED
CONFIRMED → CANCELLED (Admin refund)
```

The client must **display** and **request** only backend-valid transitions; it must never implement its own conflicting state machine. The backend enforces transitions and a three-attempt delivery cap. fileciteturn0file1L950-L971

### Payment lifecycle

```text
Customer creates PENDING shipment
        ↓
POST /payments/initiate
        ↓
paymentUrl
        ↓
Stripe Checkout
        ↓
Stripe webhook
        ↓
Payment = PAID
Shipment = CONFIRMED
        ↓
Admin dispatches courier
```

The backend specifically states that price is calculated server-side, payment must be initiated for a PENDING shipment, and the Stripe webhook confirms the shipment asynchronously. fileciteturn0file1L3-L7 fileciteturn0file1L1244-L1259

## 2. Known Backend Limitations / Do-Not-Invent Rules

The current API surface does **not** implement the following, and the frontend must not fake them:

- Email verification.
- OTP verification.
- Password reset endpoint.
- Customer review/rating endpoint.
- Dedicated courier earnings/settlement endpoint.
- Discrete proof-of-delivery file/signature upload endpoint.
- Dedicated customer payment-history endpoint.
- Public contact-form submission endpoint.

The API documentation explicitly marks reviews and courier settlement as unimplemented and explains that payment history is inferred from shipment details rather than a dedicated transaction-history route. fileciteturn0file1L1261-L1273 fileciteturn0file1L1311-L1315

Accordingly:

- The customer payment page will use available shipment/payment information returned by existing shipment endpoints.
- The courier analytics page will show delivery-performance analytics derived from assigned shipment data; it must not invent monetary earnings.
- The contact page will be a static support/information page rather than a fake form submission workflow.
- No frontend screen may advertise functionality that the backend cannot actually execute.

## 3. Security Session Architecture Decision

Because the backend returns access and refresh tokens in JSON and does not document an HTTP-only cookie session contract, the frontend will use a **Next.js BFF/proxy layer** for authenticated browser traffic:

```text
Browser
  ↓
Next.js App / Route Handlers
  ↓
HttpOnly accessToken + refreshToken cookies
  ↓
External Courier API
```

Rules:

- Browser JavaScript must not directly store long-lived refresh tokens.
- Access and refresh tokens are stored in secure, `HttpOnly` cookies by frontend server-side auth handlers.
- A lightweight signed frontend session cookie contains the authenticated role/session metadata needed by Middleware.
- Middleware protects role route groups.
- Authenticated API proxy code reads the access token server-side.
- On a backend `401`, the proxy refreshes once using `/auth/refresh-token`, rotates both cookies, retries the original request once, and then forces logout on refresh failure.
- Proxy paths are allowlisted; no arbitrary URL forwarding is permitted.
- CSRF-sensitive mutation routes use same-site cookies and an application-origin check in route handlers.
- The external backend remains the source of truth for authorization and ownership.

This architecture satisfies the assignment's middleware requirement while respecting the actual token contract.

## 4. Frontend Page Inventory

### Public

| Route | Purpose |
|---|---|
| `/` | Logistics landing page and primary conversion points |
| `/about` | Platform purpose, workflow, roles, operational model |
| `/services` | Customer, courier, and admin capabilities |
| `/pricing` | Authenticated price-estimation entry point plus service/pricing explanation |
| `/contact` | Static support/help information; no fake submission endpoint |

### Authentication

| Route | Purpose |
|---|---|
| `/login` | Credential login, Google login where configured, three demo-login buttons |
| `/register` | CUSTOMER/COURIER account registration |

### Customer / Shared authenticated

| Route | Purpose |
|---|---|
| `/dashboard` | Customer overview and recent shipment activity |
| `/dashboard/shipments` | Customer shipment list with search/filter/sort/pagination |
| `/dashboard/shipments/new` | Multi-step create-shipment wizard |
| `/dashboard/shipments/[id]` | Shipment details, edit/cancel/pay/tracking entry |
| `/dashboard/track` | Search by tracking number, then open authorized shipment |
| `/dashboard/payments` | Payment-related shipment history using existing shipment data |
| `/profile` | Shared authenticated profile/settings |
| `/notifications` | Shared authenticated notifications |

### Courier

| Route | Purpose |
|---|---|
| `/courier` | Courier operational dashboard |
| `/courier/shipments` | Assigned shipments with filters/search/pagination |
| `/courier/shipments/[id]` | Shipment details and valid status-transition actions |
| `/courier/analytics` | Delivery-performance analytics derived from assigned shipments |

### Admin

| Route | Purpose |
|---|---|
| `/admin` | Platform statistics and operational overview |
| `/admin/shipments` | All shipments, dispatch queue, URL filters/search/pagination |
| `/admin/shipments/[id]` | Shipment operations, assignment, status/refund/edit controls |
| `/admin/users` | User administration, role management, search, pagination |
| `/admin/users/[id]` | Individual user profile/administration |
| `/admin/zones` | Delivery-zone management |
| `/admin/pricing` | Pricing-rule management |
| `/admin/audit-logs` | Immutable system audit history |

### Payment / utility

| Route | Purpose |
|---|---|
| `/payment/success` | Stripe success return state |
| `/payment/cancel` | Stripe cancellation return state |
| `not-found.tsx` | Custom 404 experience |
| `error.tsx` | Global error boundary |

## 5. Page Count

This plan targets **29 actual routes/pages** plus shared `loading.tsx` and `error.tsx` files across route segments, exceeding the assignment minimum of 18 functional pages.

---

# Phase 00 — Repository Instructions and Frontend Skill Discovery

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 00, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for repository instructions, agent workflow, frontend design, and task-specific UI/UX skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective

Establish the repository-local execution rules before any implementation or frontend design work begins.

## Depends On
- None

## Why This Phase Exists

The project repository contains an `AGENTS.md` file and a large `.agents/` skill set. The coding agent must use those repository-provided instructions and the relevant frontend/design skills so that implementation follows the intended project workflow rather than introducing a parallel process.

## Scope
### IN SCOPE
- Locate and read the root `AGENTS.md`.
- Locate the `.agents/` directory and inspect its available skills/instructions.
- Identify the skills relevant to frontend architecture, UI/UX design, visual design, responsive behavior, accessibility, reusable components, forms, and any other frontend work required by this roadmap.
- Record which skills are applicable to which implementation phases.
- Preserve any repository-specific coding, naming, architecture, testing, or design conventions discovered in `AGENTS.md`.

### OUT OF SCOPE
- Writing application code.
- Designing pages before the relevant skill guidance has been read.
- Replacing repository-provided skills with generic assumptions.
- Changing backend behavior.

## Backend Work
No backend implementation.

## Database Work
No database implementation.

## API Work
No API implementation.

## Frontend Work
No production frontend implementation yet. This phase establishes the instructions and skill references that all later frontend phases must use.

For **every later phase involving frontend design or implementation**, the coding agent must re-check the applicable `.agents` skill(s) and follow them for that phase. Do not assume a skill was read once and therefore applies automatically to every future task if the repository instructions require per-task or per-phase use.

## Pages
No pages implemented.

## Components
No production components implemented.

## Security
Do not expose or commit repository instruction contents that contain secrets or private operational data.

## Testing
No feature tests yet. Verify that `AGENTS.md` and `.agents/` can be found and that the relevant skill references are identified before proceeding.

## Documentation
Add the discovered repository instruction/skill references to the coding agent's working context. Do not modify `AGENTS.md` or existing skills unless a later task explicitly requires it.

## Files Expected To Change
Normally none. This phase is an inspection/discovery gate for the coding agent.

## Completion Criteria
- [ ] `AGENTS.md` has been read.
- [ ] `.agents/` has been inspected.
- [ ] Relevant frontend/design skills have been identified.
- [ ] The agent knows which skill(s) must be used for UI/UX and frontend implementation phases.
- [ ] No frontend design or application code was started before completing this gate.

## Verification
Before moving to Phase 01, explicitly confirm in the implementation notes or agent working context that the repository-local instructions and relevant skills were consulted.

## Output
A repository-aware execution context for all subsequent implementation phases.

---


# Phase 01 — Requirement and API Contract Freeze

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 01, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for requirements analysis, API-contract review, and frontend architecture/UX planning skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Create the immutable frontend contract baseline from the provided assignment requirements, API overview, and Postman collection before any UI implementation begins.

## Depends On
- None

## Why This Phase Exists
Freeze role definitions, endpoint paths, request bodies, known response structures, lifecycle rules, assignment requirements, and backend limitations. Reconcile Postman and API documentation without changing the backend.

## Scope
### IN SCOPE
Freeze role definitions, endpoint paths, request bodies, known response structures, lifecycle rules, assignment requirements, and backend limitations. Reconcile Postman and API documentation without changing the backend.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
- Contract reference only: all 38 core application endpoints plus the two public diagnostics are enumerated later.
- Confirm base URL from the Postman collection.
- Confirm canonical response/error shapes.
- Confirm auth header contract: `Authorization: Bearer <access_token>`.
- Confirm pagination contract: `page`, `limit`, `meta.total`, `meta.totalPages`.
- Confirm no client-supplied shipment price field.


## Frontend Work
Create the written contract map that later frontend modules must follow. Define exact TypeScript enum values for roles, service types, shipment states, and payment methods based on documentation rather than guessing.

## Pages
No route yet.

## Components
No UI components yet; create only contract/domain type boundaries.

## User Journey
All three role journeys are captured before UI implementation: customer create→pay→track, courier assigned→status transitions, admin monitor→assign→audit/refund.

## Security
Document token, role, ownership, and state-transition constraints as non-negotiable client rules while keeping backend authorization authoritative.

## Error Handling
Document known 400/401/403/404/409 behaviors and structured field errors.

## Testing
Validate the contract list against all Postman request names and API documentation endpoint index.

## Documentation
Add a source-of-truth section to the implementation plan; do not rewrite backend docs.

## Environment Variables
`API_BASE_URL` (server-only) and `NEXT_PUBLIC_APP_URL` (browser/deployment return URL) will be introduced later. Do not expose the backend API URL unnecessarily to the client because authenticated traffic is routed through the Next.js BFF.

## Files Expected To Change
`implementation.md` only for planning; no application files.

## Completion Criteria
- [ ] Phase scope is implemented without changing unrelated functionality.
- [ ] TypeScript remains strict and no `any` types are introduced.
- [ ] Relevant lint/type/build checks pass.
- [ ] All phase-specific verification steps succeed.

## Verification
Compare all 40 Postman requests against the final API inventory. Confirm no frontend-only feature requires an undocumented backend mutation.

## Output
A frozen contract baseline that every later phase can implement without inventing endpoints.

## API Contract Baseline & Enums (Added via Phase 01)

### 1. Source of Truth
- The backend API documentation (`API_overview.md`) and the Postman collection are the authoritative source of truth.
- Do not rewrite backend docs; only map the established contracts.
- Frontend MUST consume these APIs and must NOT invent undocumented endpoints.

### 2. TypeScript Enums
```typescript
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  COURIER = 'COURIER',
  ADMIN = 'ADMIN'
}

export enum ServiceType {
  STANDARD = 'STANDARD',
  EXPRESS = 'EXPRESS'
}

export enum ShipmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PICKUP_ASSIGNED = 'PICKUP_ASSIGNED',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  FAILED_DELIVERY = 'FAILED_DELIVERY',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED'
}

export enum PaymentMethod {
  STRIPE = 'STRIPE',
  BKASH = 'BKASH'
}
```

### 3. Postman Reconciliation & API Inventory
- Verified all 40 Postman requests against the 38 unique backend endpoints documented in `API_overview.md`.
- The 2 extra Postman requests arise from multiple login examples for different roles (Customer, Admin, Courier).
- No frontend-only feature requires an undocumented backend mutation. All operations (tracking, pricing, user management) map directly to existing contracts.

### 4. Confirmed Contracts & Limitations
- **Base URL**: `https://logistics-backend-jyz7.onrender.com/api/v1` (Confirmed via Postman).
- **Auth Header**: `Authorization: Bearer <access_token>`
- **Pagination**: Defined via query parameters `page` and `limit`, with a standard `meta` response object containing `total` and `totalPages`.
- **Pricing**: Client MUST NOT supply `estimatedPrice`. Calculated strictly server-side using `/pricing/calculate`.
- **State Machine**: Frontend must request valid status transitions only. The backend enforces maximum 3 delivery attempts.
- **Backend Limitations**: No email verification, OTP, password reset, or public contact-form submission endpoints. Frontend must not simulate these.

### 5. Response Shapes & Error Behaviors
**Canonical Response Structure**:
```json
{
  "success": boolean,
  "message": string,
  "data"?: any,
  "meta"?: { "page": number, "limit": number, "total": number, "totalPages": number }
}
```

**Canonical Error Structure**:
```json
{
  "success": false,
  "message": string,
  "errors": [{ "field": string, "message": string }]
}
```

**Known HTTP Status Behaviors**:
- **400 Bad Request**: Structured field errors from Zod validation, or business logic violations (e.g., negative weight).
- **401 Unauthorized**: Missing/invalid access token, or expired refresh token. Triggers frontend logout mechanism.
- **403 Forbidden**: Role-based access control rejection.
- **404 Not Found**: Resource not found.
- **409 Conflict**: Resource conflict (e.g., email already in use).

### 6. Security & Ownership Constraints
- **Tokens**: Long-lived refresh tokens must be kept in HttpOnly cookies by the Next.js BFF proxy.
- **Ownership**: The backend strictly scopes lists (e.g., `GET /shipments`) to the authenticated `customerId` or `courierId`. Frontend role checks are for UX, backend authorization is authoritative.

---


# Phase 02 — Frontend Repository and App Router Foundation

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 02, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for Next.js App Router, project structure, TypeScript, and frontend architecture skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Initialize the Next.js App Router frontend using TypeScript and the assignment's required stack without adding unnecessary frameworks.

## Depends On
- Phase 01

## Why This Phase Exists
Establish the base Next.js application structure, strict TypeScript, Tailwind, shadcn/ui, and foundational App Router conventions.

## Scope
### IN SCOPE
Establish the base Next.js application structure, strict TypeScript, Tailwind, shadcn/ui, and foundational App Router conventions.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
- No new backend endpoint is introduced. Refer only to already implemented endpoints listed in the final API inventory.

## Frontend Work
Set up `app/`, route groups, shared `components/`, `lib/`, `hooks/`, `store/`, `types/`, and test folders. Keep Server Components as the default.

### Concrete setup sequence

If the repository is empty and `AGENTS.md` does not prescribe a different bootstrap, initialize the App Router application with TypeScript and Tailwind using the official `create-next-app` flow. Do not recreate an existing app or overwrite an established repository.

Create/confirm:
- `src/app/layout.tsx`
- `src/app/error.tsx`
- `src/app/not-found.tsx`
- `src/components/`
- `src/lib/`
- `src/hooks/`
- `src/services/`
- `src/stores/`
- `src/types/`
- `src/tests/`
- `.env.example`
- `.gitignore`

TypeScript should use strict mode; add `noUncheckedIndexedAccess` only if compatible with the repository's existing configuration and without unrelated churn.

Do not lock a Next.js version or dependency version merely because the alternate plan named one. Preserve an existing repository version; otherwise choose a supported version compatible with the assignment and repository instructions.


## Pages
Route skeletons only; no feature logic.

## Components
Base shadcn/ui primitives, typography, layout containers, and provider mounting.

## User Journey


## Security
Do not put secrets in client bundles. Separate `NEXT_PUBLIC_*` from server-only environment variables.

## Error Handling
Add root `error.tsx` and `not-found.tsx` structure without embedding business logic yet.

## Testing
Run TypeScript, lint, and production build on the empty application shell.

## Documentation
Document installation and supported Node/Next.js version once selected.

## Environment Variables
`API_BASE_URL` (server-only), `NEXT_PUBLIC_APP_URL`.

## Files Expected To Change
`app/layout.tsx`, `app/error.tsx`, `app/not-found.tsx`, `app/globals.css`, `components/ui/*`, `lib/*`, configuration files.

## Completion Criteria
- [ ] Next.js App Router starts successfully.
- [ ] Tailwind and shadcn/ui render a test component.
- [ ] Strict TypeScript is enabled.
- [ ] Root error and 404 boundaries compile.
- [ ] No secret is committed.

## Verification
Run development server, `tsc --noEmit`, lint, and production build.

## Output
A clean, deployable Next.js foundation.

---


# Phase 03 — Environment and API Client Architecture

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 03, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for API client architecture, authentication transport, TypeScript, and integration skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Build typed server/client API infrastructure around the frozen backend contract.

## Depends On
- Phase 02

## Why This Phase Exists
Centralize URL construction, request headers, JSON parsing, timeout/abort behavior, canonical response parsing, and typed errors.

## Scope
### IN SCOPE
Centralize URL construction, request headers, JSON parsing, timeout/abort behavior, canonical response parsing, and typed errors.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
- All frontend API calls must go through centralized API infrastructure.
- Protected calls attach `Authorization: Bearer <access_token>` server-side.
- JSON mutations use `Content-Type: application/json`.
- Convert backend error responses into a typed `ApiError` with status, message, field errors, and retryability.


## Frontend Work
Create separate server-safe and client-safe API access patterns. Add one request helper rather than page-specific fetch wrappers.

### Concrete service-module map

Create one implementation per backend domain, or the repository-equivalent naming:

```text
lib/api/
├── client.ts
├── response.ts
└── errors.ts

services/
├── auth.service.ts
├── user.service.ts
├── shipment.service.ts
├── payment.service.ts
├── zone.service.ts
├── pricing.service.ts
└── admin.service.ts
```

The service boundary should expose typed functions corresponding to every documented frontend-consumable operation:
- auth register/login/google/refresh/logout
- profile/notifications
- zones
- pricing calculation/rules
- shipment CRUD/status/cancel/assign/tracking/search/list
- payment initiation/refund
- admin stats/users/role/delete/audit logs

Health is a diagnostic check, not a user-facing feature. Keep it available for deployment verification.


## Pages


## Components
No visible page components; `ApiError`, response helpers, request utilities.

## User Journey


## Security
Never log tokens, passwords, refresh tokens, or full authorization headers.

## Error Handling
Handle malformed JSON, network timeout, non-JSON backend failures, and canonical backend error bodies.

## Testing
Unit-test response parsing and error normalization using real response shapes from documentation.

## Documentation
Document where API calls belong and prohibit direct `fetch` duplication in page components.

## Environment Variables
`API_BASE_URL` server-side; `NEXT_PUBLIC_APP_URL` for browser-return URLs.

## Files Expected To Change
`lib/api/*`, `lib/errors/*`, `types/api.ts`, `.env.example`.

## Completion Criteria
- [ ] All API requests use the centralized client.
- [ ] Canonical success/error envelopes parse correctly.
- [ ] No `any` types are used.
- [ ] Environment variables are documented.

## Verification
Test GET `/health` server-side and a protected request with a valid demo token without exposing the token.

## Output
A reusable typed API layer.

---


# Phase 04 — Design System, Theme, and Application Shell

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 04, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for UI/UX design system, shadcn/ui, Tailwind, typography, responsive design, and accessibility skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Create the shared visual language and responsive shell before feature pages are built.

## Depends On
- Phase 02, Phase 03

## Why This Phase Exists
Define typography, spacing, surface treatment, semantic status colors, navigation patterns, cards, tables, buttons, dialogs, and mobile breakpoints. Since the sources do not prescribe exact brand colors, select a restrained logistics-oriented palette and keep it centralized.

## Scope
### IN SCOPE
Define typography, spacing, surface treatment, semantic status colors, navigation patterns, cards, tables, buttons, dialogs, and mobile breakpoints. Since the sources do not prescribe exact brand colors, select a restrained logistics-oriented palette and keep it centralized.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
- No new backend endpoint is introduced. Refer only to already implemented endpoints listed in the final API inventory.

## Frontend Work
Before implementing the shell, consult `AGENTS.md` and the relevant `.agents` frontend/UI/UX/design-system/responsive-design skills. Apply those skills while creating the public header/footer and authenticated dashboard shells with reusable navigation slots. Use shadcn/ui and Lucide.

### Concrete design-system checklist

Establish one source for:
- typography scale
- spacing and radius conventions
- container widths
- button/input variants
- surface/elevation patterns
- semantic shipment-status presentation
- focus-visible states
- table density
- mobile navigation behavior

Create the reusable component baseline from the merged architecture where genuine reuse exists: `DataTable`, `SearchInput`, `PaginationControls`, `NotificationBell`, `ShipmentTimeline`, `PriceCalculator`, `FormField`, `LoadingSkeleton`, `EmptyState`, `ConfirmDialog`, `StatCard`, `StatusBadge`, and `PageHeader`.

When the relevant `.agents` skills exist, use the repository's modern-design and animation guidance. Prefer subtle motion, and respect reduced-motion preferences.


## Pages
/, /about, /services, /pricing, /contact shell only; authenticated shell placeholders.

## Components
AppHeader, AppFooter, DashboardShell, Sidebar, MobileNav, PageHeader, Breadcrumbs, StatusBadge, StatCard, EmptyState, LoadingSkeleton, ErrorPanel, ConfirmDialog.

## User Journey


## Security
Render role-specific navigation only after authenticated user data is available.

## Error Handling
Shell-level fallback should remain usable if a secondary widget fails.

## Testing
Visual/manual checks at mobile, tablet, and desktop widths.

## Documentation
Document the shared component naming convention and layout rules.

## Environment Variables
No new environment variables.

## Files Expected To Change
`components/layout/*`, `components/shared/*`, `app/(public)/*`, `app/(protected)/layout.tsx`, theme files.

## Completion Criteria
- [ ] Shared shell is responsive.
- [ ] StatusBadge covers every known shipment state without inventing states.
- [ ] All new icons come from Lucide.
- [ ] No duplicate navigation markup across roles.

## Verification
Open the shell at 320px, tablet, and desktop widths; verify no horizontal overflow.

## Output
The reusable design system and responsive shell.

---


# Phase 05 — Typed Domain Models and Query Keys

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 05, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for TypeScript domain modeling, API typing, and frontend data architecture skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Define strict TypeScript models and TanStack Query key conventions for the entire platform.

## Depends On
- Phase 03

## Why This Phase Exists
Create types for User, Zone, PricingRule, Parcel, Shipment, Payment-related shipment data, TrackingEvent, Notification, AuditLog, pagination meta, and admin stats using only fields supported by the API docs.

## Scope
### IN SCOPE
Create types for User, Zone, PricingRule, Parcel, Shipment, Payment-related shipment data, TrackingEvent, Notification, AuditLog, pagination meta, and admin stats using only fields supported by the API docs.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
- Use typed wrappers for:
  - `/users/me`
  - `/users/me/notifications`
  - `/zones`
  - `/pricing/calculate`
  - `/pricing/rules`
  - `/shipments`
  - `/shipments/search`
  - `/shipments/:id`
  - `/shipments/:id/tracking`
  - admin endpoints
  - payment initiation/refund


## Frontend Work
Add query-key factories and mutation invalidation rules.

## Pages


## Components
No visible UI; domain types and query key helpers.

## User Journey


## Security
Keep privileged types and admin query keys inaccessible to unauthorized routes.

## Error Handling
Type the optional/conditional `failureReason` field and nullable values rather than using loose objects.

## Testing
Compile all types and add schema-level unit tests for domain enum narrowing.

## Documentation
Document which fields are guaranteed, optional, conditional, or intentionally unknown because the backend docs do not expose a response sample.

## Environment Variables
No new environment variables.

## Files Expected To Change
`types/domain.ts`, `types/api.ts`, `lib/query-keys.ts`, `lib/constants.ts`.

## Completion Criteria
- [ ] No `any` exists in domain types.
- [ ] All 38 core endpoints can be represented by typed request/response contracts.
- [ ] Shipment status and service type enums exactly match documentation.

## Verification
Run TypeScript build and inspect inferred types in IDE/tsc output.

## Output
A single typed domain model shared by every page.

---


# Phase 06 — Secure JWT Session and Auth BFF

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 06, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for authentication/session architecture, secure cookie handling, JWT, and Next.js security skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Implement login/session infrastructure that keeps backend tokens server-side while still enabling browser route protection.

## Depends On
- Phase 03, Phase 05

## Why This Phase Exists
Add Next.js auth route handlers or server actions that call the real backend auth endpoints and set secure HttpOnly cookies.

## Scope
### IN SCOPE
Add Next.js auth route handlers or server actions that call the real backend auth endpoints and set secure HttpOnly cookies.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### POST /api/v1/auth/login
- Purpose: authenticate email/password.
- Authentication: Public.
- Headers: `Content-Type: application/json`.
- Body: `email`, `password`.
- Success: `data.user`, `data.accessToken`, `data.refreshToken`.
- Error: `401` invalid credentials.

### POST /api/v1/auth/refresh-token
- Purpose: rotate access and refresh tokens.
- Authentication: Public with `refreshToken` body.
- Body: `refreshToken`.
- Success: new access/refresh tokens.
- Error: `401` invalid/expired refresh token.

### POST /api/v1/auth/logout
- Purpose: invalidate backend refresh token.
- Authentication: authenticated user.
- Header: `Authorization: Bearer <access_token>`.
- Success: logged-out message.


## Frontend Work
Implement `/api/auth/login`, `/api/auth/logout`, `/api/auth/refresh` internally as thin BFF handlers. Store backend tokens in secure HttpOnly cookies and create a signed session metadata cookie.

## Pages


## Components
AuthResult, SessionUser, AuthProvider only where client state is necessary.

## User Journey
Login response → set session cookies → redirect by role; logout → backend logout → clear cookies.

## Security
Use `Secure` in production, `SameSite=Lax` or stricter where compatible, short access-token lifetime, server-only refresh token, and no token in URL/localStorage.

## Error Handling
Invalid login shows form error; failed refresh clears session; logout is idempotent.

## Testing
Integration-test login success, bad credentials, refresh rotation, and logout cookie clearing.

## Documentation
Document cookie/session behavior and local development HTTPS caveats if any.

## Environment Variables
`SESSION_SECRET`, `API_BASE_URL`.

## Files Expected To Change
`app/api/auth/*`, `lib/auth/*`, `middleware.ts`, auth type files.

## Completion Criteria
- [ ] Login returns a server-managed session.
- [ ] Refresh rotates tokens once and does not loop.
- [ ] Logout invalidates backend session and frontend cookies.
- [ ] No token is persisted in localStorage.

## Verification
Inspect browser storage and confirm tokens are HttpOnly; expire access token artificially in a controlled test and verify refresh.

## Output
Secure browser session infrastructure.

---


# Phase 07 — Middleware and Three-Role Authorization

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 07, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for Next.js Middleware, RBAC, route protection, and role-based UI architecture skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Enforce protected route access by role before page rendering.

## Depends On
- Phase 06

## Why This Phase Exists
Build role-aware Middleware and server-side authorization utilities for CUSTOMER, COURIER, and ADMIN.

## Scope
### IN SCOPE
Build role-aware Middleware and server-side authorization utilities for CUSTOMER, COURIER, and ADMIN.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
- No new backend endpoint is introduced. Refer only to already implemented endpoints listed in the final API inventory.

## Frontend Work
Define route guards for `/dashboard/*`, `/courier/*`, `/admin/*`, `/profile`, `/notifications`; redirect unauthenticated users to `/login`; redirect authenticated users away from login/register; send wrong-role users to their own dashboard or a controlled forbidden view.

## Pages
Protected route groups and forbidden handling.

## Components
RoleGate, PermissionGate, AccessDeniedPanel.

## User Journey


## Security
Middleware is a convenience layer; backend RBAC remains authoritative. UI-only hiding is never treated as sufficient security.

## Error Handling
401 → refresh/logout path; 403 → role-specific access denied; invalid session cookie → clear and redirect.

## Testing
Automate customer→admin route denial, courier→customer route denial, admin→customer route denial, and unauthenticated access.

## Documentation
Document route matrix.

## Environment Variables
No new environment variables.

## Files Expected To Change
`middleware.ts`, `lib/auth/authorize.ts`, protected layouts.

## Completion Criteria
- [ ] All three roles have explicit route groups.
- [ ] Wrong-role navigation is blocked before page content renders.
- [ ] UI navigation also hides unauthorized actions.

## Verification
Log in as each role and manually open every protected route group.

## Output
Working three-role route authorization.

---


# Phase 08 — TanStack Query, Zustand, Toasts, and Error Infrastructure

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 08, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for TanStack Query, Zustand, error handling, toast UX, and client-state architecture skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Create the cross-cutting client-state infrastructure used by all data-heavy pages.

## Depends On
- Phase 05, Phase 06

## Why This Phase Exists
Mount QueryClientProvider, define cache defaults, mutation invalidation patterns, optional Zustand session/UI store, and Sonner.

## Scope
### IN SCOPE
Mount QueryClientProvider, define cache defaults, mutation invalidation patterns, optional Zustand session/UI store, and Sonner.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
- No new backend endpoint is introduced. Refer only to already implemented endpoints listed in the final API inventory.

## Frontend Work
Prefer server components for initial read-only page shells; use TanStack Query only for interactive/refetching client sections. Use Zustand for ephemeral UI state such as mobile-nav state and pending demo-login state, not as a duplicate server cache.

### Concrete hook baseline

Implement typed hooks where the corresponding documented service exists:

```text
useLogin
useRegister
useLogout
useProfile
useUpdateProfile
useNotifications
useMarkNotificationRead
useShipments
useShipment
useCreateShipment
useUpdateShipment
useCancelShipment
useUpdateShipmentStatus
useAssignCourier
useTracking
useInitiatePayment
useRefundPayment
useZones
useCreateZone
useUpdateZone
useDeleteZone
useCalculatePrice
usePricingRules
useUpsertPricingRule
useDashboardStats
useAdminUsers
useGetAdminUser
useUpdateUserRole
useDeleteUser
useAuditLogs
```

Not every hook must live in one file or barrel; preserve repository conventions.

Do not create a dedicated `usePaymentsHistory` API hook because the backend does not document a standalone payment-history endpoint.


## Pages


## Components
QueryProvider, ToastProvider, ErrorToastMapper, GlobalLoadingIndicator only for local transitions.

## User Journey


## Security
Do not put access/refresh tokens in Zustand.

## Error Handling
Centralize handling of 401/403/409/422/network failures.

## Testing
Verify query invalidation after mutations and no duplicate requests on stable pages.

## Documentation
Document server-state vs client-state boundary.

## Environment Variables
No new environment variables.

## Files Expected To Change
`providers/*`, `store/*`, `lib/query/*`, `components/feedback/*`.

## Completion Criteria
- [ ] TanStack Query cache works.
- [ ] Sonner is mounted once.
- [ ] No server state is duplicated in global state.
- [ ] API mutation errors become human-readable toasts.

## Verification
Open two pages that share shipment data, mutate one, and verify the other invalidates/refetches correctly.

## Output
Cross-cutting client infrastructure.

---


# Phase 09 — Public Landing and Informational Pages

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 09, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for public-page UI/UX, responsive marketing layouts, SEO metadata, and accessibility skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Implement the public-facing website using only information supported by the platform contract.

## Depends On
- Phase 04, Phase 08

## Why This Phase Exists
Build polished public pages: home, about, services, pricing, contact/support.

## Scope
### IN SCOPE
Build polished public pages: home, about, services, pricing, contact/support.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
- No new backend endpoint is introduced. Refer only to already implemented endpoints listed in the final API inventory.

## Frontend Work
Use static source-derived content for platform capabilities; do not fabricate pricing numbers or business contact data. The pricing page may show a login CTA because actual price calculation requires authentication.

### Concrete public-page composition

`/`:
- Hero focused on documented logistics capabilities.
- Service/capability cards.
- Three-step explanation: create shipment → pay → track.
- Clear registration/login CTAs.
- No fabricated shipment counts, delivery rates, testimonials, or other KPIs.

`/about`:
- Platform purpose, roles, workflow, and accountability.

`/services`:
- Standard/Express service explanation and other documented capabilities.

`/pricing`:
- Explain that authoritative pricing is calculated by the backend.
- If an interactive calculator is provided, use the authentication required by the backend and call the real pricing endpoint through the BFF.
- Never compute or hardcode authoritative prices in the browser.

`/contact`:
- Static support/contact information only unless a real backend submission contract is verified.


## Pages
- `/`: hero, service overview, lifecycle explainer, role pathways, tracking CTA.
- `/about`: platform purpose and accountability model.
- `/services`: customer, courier, admin capabilities.
- `/pricing`: STANDARD/EXPRESS explanation plus authenticated calculator CTA.
- `/contact`: support/information page explaining available account-based notification support and platform health; no fake submission form.


## Components
FeatureCard, RoleCard, LifecycleStepper, PricingInfoCard, CTASection.

## User Journey
Visitor → understand platform → choose login/register → authenticated workflow.

## Security
Public pages do not expose tokens, internal IDs, or private operational data.

## Error Handling
Static pages should not fail due to API downtime.

## Testing
Metadata and link checks; responsive checks.

## Documentation
Add Metadata title, description, and Open Graph for every public page.

## Environment Variables
No new environment variables.

## Files Expected To Change
`app/(public)/*`.

## Completion Criteria
- [ ] Five public pages are complete and non-placeholder.
- [ ] No fictitious pricing/contact details are presented.
- [ ] SEO metadata is present.

## Verification
Run through all public links at mobile and desktop widths and confirm every CTA has a valid destination.

## Output
Portfolio-quality public website.

---


# Phase 10 — Login and One-Click Demo Access

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 10, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for authentication UI/UX, form design, shadcn/ui, responsive layouts, and accessibility skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Implement the mandatory login page with manual login and distinct one-click demo login for all three roles.

## Depends On
- Phase 06, Phase 07, Phase 09

## Why This Phase Exists
Create email/password login, Google login where configured, and dedicated Admin/Customer/Courier demo-login buttons.

## Scope
### IN SCOPE
Create email/password login, Google login where configured, and dedicated Admin/Customer/Courier demo-login buttons.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### POST /api/v1/auth/login
- Body: `email`, `password`.
- Auth: Public.
- Success: user + accessToken + refreshToken.

### POST /api/v1/auth/google
- Body: `idToken`.
- Auth: Public.
- Success: authenticated user/token response as provided by backend.


## Frontend Work
Demo buttons submit known demo credentials through the same auth handler as normal login. Use the Postman sample accounts as defaults only after verifying they are real seeded accounts; otherwise replace with dedicated evaluator accounts supplied by the backend owner. Redirect based on returned `user.role`.

### Concrete login composition

The login screen must include:
- email and password fields using React Hook Form + Zod
- standard Login submit action
- distinct one-click Demo Login actions for CUSTOMER, COURIER, and ADMIN
- per-action loading/disabled states
- backend validation/authentication error mapping
- role-based redirect after successful authentication
- registration link
- optional Google sign-in only when the real backend/frontend configuration exists

Demo buttons may use only credentials supplied by the project/repository. Never invent or expose secrets in source.


## Pages
`/login`.

## Components
LoginForm, PasswordInput, DemoLoginCard, RoleIcon, GoogleLoginButton.

## User Journey
Select role → automatic credential submission → session established → role dashboard.

## Security
Never hardcode a production secret; demo credentials belong in public-safe environment configuration only if they are explicitly intended for evaluation.

## Error Handling
Wrong demo credentials show an actionable toast; duplicate clicks disable the card while loading.

## Testing
Test all four entry modes: manual login, Admin demo, Customer demo, Courier demo. Test invalid login.

## Documentation
Document actual evaluator credentials separately from implementation source if they are secret.

## Environment Variables
Optional `DEMO_ADMIN_EMAIL`, `DEMO_ADMIN_PASSWORD`, `DEMO_CUSTOMER_EMAIL`, `DEMO_CUSTOMER_PASSWORD`, `DEMO_COURIER_EMAIL`, `DEMO_COURIER_PASSWORD` only for dedicated evaluator accounts.

## Files Expected To Change
`app/(auth)/login/page.tsx`, `components/auth/*`, auth route handlers.

## Completion Criteria
- [ ] All three demo-login buttons are distinct and obvious.
- [ ] Each successful role redirects to the correct dashboard.
- [ ] Manual login works.
- [ ] No plaintext credentials are logged.

## Verification
Click each demo button and confirm route, sidebar, and accessible data differ by role.

## Output
Assignment-compliant login experience.

---


# Phase 11 — Customer and Courier Registration

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 11, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for form UX, React Hook Form, Zod validation, authentication flows, and responsive UI skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Implement real account registration for CUSTOMER and COURIER using the existing backend validation contract.

## Depends On
- Phase 06, Phase 10

## Why This Phase Exists
Build the registration form with role selection limited to CUSTOMER or COURIER.

## Scope
### IN SCOPE
Build the registration form with role selection limited to CUSTOMER or COURIER.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### POST /api/v1/auth/register
- Auth: Public.
- Headers: `Content-Type: application/json`.
- Body: `name` required, `email` required, `password` min 6, `phone` optional, `role` optional but only `CUSTOMER` or `COURIER`.
- Admin self-registration is forbidden.
- Success: `201` with user, accessToken, refreshToken.
- Error: `409` duplicate email; `400` validation failures.


## Frontend Work
Use React Hook Form + Zod. On success, establish server session and redirect by role. Do not create admin registration UI.

## Pages
`/register`.

## Components
RegisterForm, RoleSelect, PasswordStrengthHint, FormField.

## User Journey
Visitor → choose CUSTOMER/COURIER → validate → backend register → logged-in role dashboard.

## Security
Do not offer ADMIN in the role selector. Password never persists in client state after submission.

## Error Handling
Map structured field errors from backend to fields; duplicate email has a top-level alert.

## Testing
Test invalid email, password <6, duplicate email, both roles, optional phone.

## Documentation
Document that verification is not part of the current backend.

## Environment Variables
No new environment variables.

## Files Expected To Change
`app/(auth)/register/page.tsx`, `components/auth/RegisterForm.tsx`, auth API handler.

## Completion Criteria
- [ ] Customer and courier registration both work.
- [ ] Admin role is not selectable.
- [ ] Validation messages are human-readable.
- [ ] Successful registration establishes session.

## Verification
Register one customer and one courier against the actual backend and verify returned roles.

## Output
Functional real-registration flow.

---


# Phase 12 — Customer Dashboard and Shipment Summary

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 12, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for customer dashboard UX, data visualization/card design, responsive layouts, and accessibility skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Implement the authenticated customer landing dashboard using real shipment and profile data.

## Depends On
- Phase 07, Phase 08, Phase 11

## Why This Phase Exists
Create a clear dashboard emphasizing active deliveries, pending payment actions, recent shipments, and tracking entry points.

## Scope
### IN SCOPE
Create a clear dashboard emphasizing active deliveries, pending payment actions, recent shipments, and tracking entry points.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### GET /api/v1/users/me
- Auth: Any role.
- Success: id, name, email, phone, role, avatar, isActive.

### GET /api/v1/shipments
- Auth: Any role.
- Query: `page`, `limit`, optional `status`, optional `trackingNumber`.
- CUSTOMER sees only own shipments.


## Frontend Work
Fetch profile and a small recent shipment page. Derive visible counts from returned data/meta without claiming global statistics.

## Pages
`/dashboard`.

## Components
WelcomeHeader, CustomerStatStrip, RecentShipmentCard, QuickActionCard, TrackingSearchCard.

## User Journey
Customer logs in → sees actual account and shipment state → chooses create, track, pay, or manage shipments.

## Security
Only own shipment results are displayed; backend ownership errors are surfaced rather than bypassed.

## Error Handling
Show independent skeletons for profile and shipments and inline failure panels.

## Testing
Empty state with zero shipments; multiple shipment states; API failure.

## Documentation
Document query keys and dashboard refresh behavior.

## Environment Variables
No new environment variables.

## Files Expected To Change
`app/(customer)/dashboard/page.tsx`, dashboard components.

## Completion Criteria
- [ ] Dashboard shows real profile and shipment data.
- [ ] No fabricated shipment metrics are shown.
- [ ] Loading and empty states exist.

## Verification
Compare visible cards with `/users/me` and `/shipments` network responses.

## Output
Functional customer dashboard.

---


# Phase 13 — Customer Shipment List with URL State

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 13, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for data-table UX, search/filter/pagination patterns, URL state, responsive design, and accessibility skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Build the customer shipment management page with server-state pagination and fully URL-synchronized filters/search/sort.

## Depends On
- Phase 12

## Why This Phase Exists
Implement searchable/filterable/paginated shipment table/card view and preserve the view in the URL.

## Scope
### IN SCOPE
Implement searchable/filterable/paginated shipment table/card view and preserve the view in the URL.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### GET /api/v1/shipments
- Auth: CUSTOMER.
- Query: `page` default 1, `limit` default 10 max 50, `status` optional, `trackingNumber` optional.
- Response includes `meta`.


## Frontend Work
Use `useSearchParams` for `page`, `limit`, `status`, `q`, and `sort`. Map `q` to documented `trackingNumber` when non-empty. `sort` is client-side over the currently fetched page because the backend docs do not expose a sort parameter. Do not invent a server sort parameter.

## Pages
`/dashboard/shipments`.

## Components
ShipmentTable, ShipmentCard, SearchInput, StatusFilter, SortSelect, Pagination, EmptyState.

## User Journey
Customer searches by tracking number → filters status → opens details → returns with URL state preserved.

## Security
Do not allow a customer to request another customer's shipment through URL manipulation; backend must reject unauthorized IDs.

## Error Handling
404/403 on detail navigation becomes a friendly not-found/forbidden state.

## Testing
Pagination, filter reset, search, browser back/forward, bookmarkable URLs.

## Documentation
Document URL parameter contract.

## Environment Variables
No new environment variables.

## Files Expected To Change
`app/(customer)/dashboard/shipments/page.tsx`, list components, query hooks.

## Completion Criteria
- [ ] URL reflects page/filter/search/sort.
- [ ] Pagination consumes backend meta.
- [ ] Empty state is meaningful.
- [ ] No hardcoded shipment records.

## Verification
Bookmark `?page=2&status=PENDING&sort=status` and reload; the same view must restore.

## Output
Book­markable customer shipment management.

---


# Phase 14 — Customer Create Shipment Wizard

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 14, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for multi-step wizard UX, React Hook Form, Zod, form accessibility, and responsive interaction design skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Implement the required multi-step shipment-creation workflow with real zone data and form validation.

## Depends On
- Phase 13

## Why This Phase Exists
Wizard steps: route/zones → addresses/recipient → parcel details → review. Shipment creation happens only after all client validation passes.

## Scope
### IN SCOPE
Wizard steps: route/zones → addresses/recipient → parcel details → review. Shipment creation happens only after all client validation passes.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### GET /api/v1/zones
- Auth: Any role.
- No query/body.
- Returns active/available zones with `id`, `name`, `city`, `isActive`.

### POST /api/v1/shipments
- Auth: CUSTOMER or ADMIN.
- Body:
  - `originZoneId`, `destinationZoneId`
  - `serviceType`: STANDARD or EXPRESS
  - `originAddress`, `originCity`
  - `destinationAddress`, `destinationCity`
  - `recipientName`, `recipientPhone`
  - `parcel`: weight, length, width, height required; description/isFragile optional.
- Parcel numeric values must be at least 0.1.
- Backend calculates `estimatedPrice`.


## Frontend Work
React Hook Form + Zod across a single wizard model. Disable next steps until current fields are valid. Require origin and destination zone, do not permit identical zones if backend/business behavior rejects them, but do not invent a backend restriction; instead allow and let API decide unless documented.

### Concrete wizard steps

Use one React Hook Form model with a clear step indicator:

1. **Route** — origin zone, destination zone, service type.
2. **Addresses & Recipient** — origin/destination addresses and recipient name/phone.
3. **Parcel** — weight, length, width, height, optional description, fragile indicator.
4. **Review & Price** — summarize the exact payload and show the server-calculated estimate when available.

Persist valid step data while navigating backward/forward. Show field-level errors near inputs and map backend validation errors back to the originating step.

Do not add an editable authoritative price field to the shipment submission model.


## Pages
`/dashboard/shipments/new`.

## Components
ShipmentWizard, StepIndicator, ZoneSelect, AddressForm, RecipientForm, ParcelForm, ReviewSummary.

## User Journey
Customer → choose zones/service → enter addresses/recipient → enter parcel → calculate preview → submit shipment → receive tracking number/ID.

## Security
Validate values client-side but treat backend Zod validation as authoritative.

## Error Handling
Preserve form state on step errors; map backend field errors to the correct step.

## Testing
Minimum parcel values, invalid phone/email-like fields if schema requires, missing zones, missing addresses, API rejection.

## Documentation
Document the wizard data shape and backend field mapping.

## Environment Variables
No new environment variables.

## Files Expected To Change
`app/(customer)/dashboard/shipments/new/*`, shipment schemas/hooks/components.

## Completion Criteria
- [ ] Wizard has at least three meaningful steps.
- [ ] All fields map exactly to the backend creation contract.
- [ ] No price is sent in POST body.
- [ ] Success redirects to shipment detail.

## Verification
Create a real shipment and verify response includes `id`, `trackingNumber`, status PENDING, and server-derived estimated price.

## Output
Functional multi-step shipment creation.

---


# Phase 15 — Live Pricing Calculation in Shipment Flow

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 15, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for pricing calculator UX, async form interactions, loading/error states, and responsive UI skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Integrate the server-calculated price preview into the shipment wizard without duplicating backend pricing logic.

## Depends On
- Phase 14

## Why This Phase Exists
Call pricing calculation when destination zone, service type, and weight are sufficiently valid.

## Scope
### IN SCOPE
Call pricing calculation when destination zone, service type, and weight are sufficiently valid.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### POST /api/v1/pricing/calculate
- Auth: Any role.
- Body: `destinationZoneId`, `serviceType`, `weight`.
- Success: `price` plus breakdown (`basePrice`, `pricePerKg`, `weight`, `ruleId`, `isDefaultFallback`).
- Business logic is server-side and uses cached pricing rules.


## Frontend Work
Debounce or manually trigger recalculation after valid input; show price/breakdown in the review step. The final POST `/shipments` does not send price.

## Pages
`/dashboard/shipments/new` modified.

## Components
PriceBreakdownCard, PriceLoadingState.

## User Journey
Customer enters destination/service/weight → request estimate → review price → create shipment.

## Security
Never trust or persist a client-computed price as authoritative.

## Error Handling
Handle overweight/inactive-zone business errors and show retry guidance.

## Testing
STANDARD vs EXPRESS, several weights, max-weight rejection.

## Documentation
Explain why the frontend never calculates the final price.

## Environment Variables
No new environment variables.

## Files Expected To Change
Pricing hooks/components and shipment wizard files.

## Completion Criteria
- [ ] Price preview uses real API.
- [ ] Client does not compute or send final price.
- [ ] Breakdown is displayed when provided.

## Verification
Change weight and confirm a new POST `/pricing/calculate` request uses the new weight.

## Output
Real-time server-backed price estimation.

---


# Phase 16 — Customer Shipment Detail, Edit, and Cancellation

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 16, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for shipment detail UX, dialogs, destructive-action patterns, forms, and responsive accessibility skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Create the customer shipment detail view and implement only backend-supported pending-state mutations.

## Depends On
- Phase 14, Phase 15

## Why This Phase Exists
Display shipment, parcel, price, status, tracking number, and actions allowed by current state.

## Scope
### IN SCOPE
Display shipment, parcel, price, status, tracking number, and actions allowed by current state.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### GET /api/v1/shipments/:id
- Auth: Any role, ownership-scoped.
- Path: UUID.

### PATCH /api/v1/shipments/:id
- Auth: CUSTOMER or ADMIN.
- Body: subset of creation schema.
- Only PENDING shipments may be updated.
- Changing destination zone/service/parcel weight triggers server price recalculation.

### POST /api/v1/shipments/:id/cancel
- Auth: CUSTOMER or ADMIN.
- Body: optional `reason`.
- Allowed only for PENDING shipments.


## Frontend Work
Gate Edit and Cancel buttons by current status. On edit, use the same validated form primitives as creation but only send changed fields. After mutation invalidate detail/list queries.

## Pages
`/dashboard/shipments/[id]`.

## Components
ShipmentDetailGrid, ShipmentStatusHeader, ParcelSummary, ShipmentActions, EditShipmentDialog, CancelShipmentDialog.

## User Journey
Customer opens shipment → reviews details → edits pending fields or cancels → UI immediately reflects backend result.

## Security
Hide unsupported actions and still rely on backend authorization/state rules.

## Error Handling
409/business-rule conflicts must explain that the status changed and the page will refresh.

## Testing
Edit PENDING; attempt edit after confirmation; cancel PENDING; attempt cancel after payment.

## Documentation
Document mutation visibility rules.

## Environment Variables
No new environment variables.

## Files Expected To Change
Detail route and shipment mutation hooks.

## Completion Criteria
- [ ] Only supported actions are shown.
- [ ] Successful mutation invalidates list/detail caches.
- [ ] Price refresh after supported edit changes.

## Verification
Create PENDING shipment, edit it, cancel another PENDING shipment, and verify status responses.

## Output
Complete customer shipment management.

---


# Phase 17 — Stripe Payment Initiation and Gateway Redirect

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 17, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for payment UX, Stripe integration, redirect flows, secure client/server boundaries, and error-state skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Implement the mandatory real payment flow using the backend's Stripe initiation endpoint.

## Depends On
- Phase 16

## Why This Phase Exists
Start payment for an eligible PENDING customer shipment and redirect to the backend-returned Stripe Checkout URL.

## Scope
### IN SCOPE
Start payment for an eligible PENDING customer shipment and redirect to the backend-returned Stripe Checkout URL.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### POST /api/v1/payments/initiate
- Auth: CUSTOMER only.
- Body: `{ shipmentId, method }`.
- `method`: STRIPE or BKASH.
- Shipment must belong to customer and be PENDING.
- Success returns `{ paymentUrl, paymentId }`.


## Frontend Work
Use STRIPE as the assignment's primary gateway. Store a non-sensitive pending-payment reference only if needed for UI recovery; never store payment secrets. Disable double submission and navigate to the returned `paymentUrl`.

## Pages
`/dashboard/shipments/[id]` payment action; payment flow pages later.

## Components
PaymentMethodCard, PayNowButton, PaymentRedirectState.

## User Journey
Customer creates shipment → opens detail → Pay Now → POST initiate → Stripe Checkout.

## Security
Only CUSTOMER role can call payment initiation. Backend remains authoritative for ownership and PENDING state.

## Error Handling
Handle already-paid, non-pending, not-found, unauthorized, and gateway creation errors.

## Testing
Successful initiation, repeated initiation, invalid shipment ID, non-customer call.

## Documentation
Document Stripe Test Mode assumption and gateway handoff.

## Environment Variables
`NEXT_PUBLIC_APP_URL` must be set so the deployment can receive configured Stripe returns.

## Files Expected To Change
Payment hooks/components, BFF payment route or server client.

## Completion Criteria
- [ ] Real backend payment initiation works.
- [ ] Stripe test checkout opens using returned `paymentUrl`.
- [ ] No fake payment success is possible in UI.

## Verification
Run an actual Stripe test transaction against the backend configuration and inspect the backend shipment after webhook processing.

## Output
Mandatory real payment initiation flow.

---


# Phase 18 — Payment Success, Cancel, and Asynchronous Confirmation UX

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 18, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for payment success/cancel UX, asynchronous state handling, polling/status UX, and responsive design skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Complete the required payment success/cancel routes while respecting asynchronous Stripe webhook confirmation.

## Depends On
- Phase 17

## Why This Phase Exists
Implement distinct success and cancellation experiences; show that payment confirmation may lag the redirect and provide safe refresh/tracking actions.

## Scope
### IN SCOPE
Implement distinct success and cancellation experiences; show that payment confirmation may lag the redirect and provide safe refresh/tracking actions.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### POST /api/v1/payments/stripe/webhook
- Public backend endpoint secured by Stripe-Signature.
- Frontend does not call it directly.
- It atomically marks Payment PAID, Shipment CONFIRMED, creates TrackingEvent and AuditLog.

### GET /api/v1/shipments/:id
- Used to refresh the shipment after payment return when its ID is known.


## Frontend Work
The success page must never directly mark a shipment paid. If the backend's configured Stripe success URL provides enough context to associate the shipment, poll/revalidate its detail a small number of times; otherwise show a generic success state and send the user to their shipment list. The cancel page returns the user to the pending shipment.

## Pages
/payment/success, /payment/cancel.

## Components
PaymentResultCard, PaymentPendingNotice, ReturnToShipmentButton.

## User Journey
Stripe redirect → success/cancel page → optional shipment status recheck → customer sees confirmed/pending state.

## Security
Webhook remains server-only; frontend never accepts client input as proof of payment.

## Error Handling
If webhook confirmation is delayed, show a pending message rather than failure.

## Testing
Success redirect, cancel redirect, delayed confirmation simulation.

## Documentation
Document the backend prerequisite: Stripe Checkout must be configured to return to these frontend routes.

## Environment Variables
`NEXT_PUBLIC_APP_URL`.

## Files Expected To Change
`app/payment/success/page.tsx`, `app/payment/cancel/page.tsx`.

## Completion Criteria
- [ ] Success and cancel routes are distinct.
- [ ] No client-side payment confirmation mutation exists.
- [ ] Delayed webhook state is handled gracefully.

## Verification
Complete Stripe test checkout and verify backend-confirmed status eventually appears in frontend.

## Output
Assignment-compliant payment result UX.

---


# Phase 19 — Tracking Timeline and Track-by-Number Search

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 19, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for tracking/timeline UX, search UX, status visualization, responsive layout, and accessibility skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Implement customer tracking with the backend's ownership-scoped tracking endpoint and shipment search endpoint.

## Depends On
- Phase 16, Phase 18

## Why This Phase Exists
Provide both detail-based tracking and a tracking-number discovery flow.

## Scope
### IN SCOPE
Provide both detail-based tracking and a tracking-number discovery flow.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### GET /api/v1/shipments/search
- Auth: Any authenticated role.
- Postman example supports `status`, `page`, `limit`; the frontend may use documented `trackingNumber` where the backend contract exposes it.
- Do not invent undocumented search parameters.

### GET /api/v1/shipments/:id/tracking
- Auth: ownership-scoped.
- Returns chronological tracking events with `status`, `description`, `createdAt`.


## Frontend Work
Build a tracking-number entry form that queries only documented search parameters supported by the actual backend. Once an authorized shipment is identified, fetch its tracking timeline. Use a vertical timeline mapped to shipment states.

Do not add a public `/track` endpoint or page unless the backend contract is explicitly verified to permit unauthenticated tracking. The current documented tracking/search flow is authenticated and ownership-sensitive. The customer-facing search belongs under the protected customer area.


## Pages
/dashboard/track and the tracking section inside /dashboard/shipments/[id].

## Components
TrackingSearchForm, TrackingTimeline, TrackingEvent, TrackingProgress.

## User Journey
Customer enters CLG tracking number → search result → detail/tracking → chronological state history.

## Security
Never expose a shipment by bypassing backend ownership scope.

## Error Handling
No result, unauthorized result, malformed tracking number, API outage.

## Testing
Pending → confirmed → picked up → delivered timeline; failed-delivery path.

## Documentation
Document polling/revalidation limits.

## Environment Variables
No new environment variables.

## Files Expected To Change
Tracking route/components/hooks.

## Completion Criteria
- [ ] Timeline is chronological.
- [ ] Tracking data comes from backend.
- [ ] Search URL can be shared/bookmarked when supported.

## Verification
Use a real shipment ID and inspect tracking response after each backend state change.

## Output
Real shipment tracking experience.

---


# Phase 20 — Notifications, Profile, and Customer Payment History

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 20, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for notifications UX, profile forms, payment-history presentation, and responsive account-settings skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Complete shared account pages and the customer payment-history experience using only existing endpoints.

## Depends On
- Phase 19

## Why This Phase Exists
Implement notifications, profile editing, and payment-related history.

## Scope
### IN SCOPE
Implement notifications, profile editing, and payment-related history.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### GET /api/v1/users/me/notifications
- Auth: Any role.
- Lists the user's notifications.

### PATCH /api/v1/users/me/notifications/:id/read
- Auth: Any role.
- Marks one notification read.

### PATCH /api/v1/users/me
- Auth: Any role.
- Body: optional `name`, `phone`.

### GET /api/v1/shipments and GET /api/v1/shipments/:id
- Customer payment page derives payment-related shipment history from available shipment responses.


## Frontend Work
Create shared notification center with read/unread states, profile form with React Hook Form + Zod, and a customer payments page that clearly labels data as shipment/payment history. Do not invent a transaction endpoint.

## Pages
/notifications, /profile, /dashboard/payments.

## Components
NotificationList, NotificationItem, ProfileForm, AccountHeader, PaymentHistoryTable.

## User Journey
Customer gets delivery/payment notification → opens notification → reads shipment → updates profile → reviews shipment-linked payment records.

## Security
Notifications are user-scoped; profile mutation is self-only.

## Error Handling
Optimistic mark-read is allowed only if rollback is implemented; otherwise refetch after success.

## Testing
Unread/read flow, profile edit, empty notification list, payment-history empty state.

## Documentation
Document the absence of a dedicated transaction history API.

## Environment Variables
No new environment variables.

## Files Expected To Change
Shared profile/notification routes and customer payments route.

## Completion Criteria
- [ ] Notification read state persists through backend.
- [ ] Profile update uses real API.
- [ ] Payment page does not fabricate monetary records.

## Verification
Mark a real notification read and refresh; update name/phone and confirm `/users/me` response.

## Output
Complete customer account management.

---


# Phase 21 — Courier Dashboard and Assigned Shipment Queue

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 21, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for courier dashboard UX, operational queue design, data tables/cards, responsive layouts, and accessibility skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Implement the courier's operational dashboard and assigned shipment list.

## Depends On
- Phase 12, Phase 13, Phase 20

## Why This Phase Exists
Use role-scoped shipment listing so courier sees only assigned shipments.

## Scope
### IN SCOPE
Use role-scoped shipment listing so courier sees only assigned shipments.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### GET /api/v1/shipments
- Auth: COURIER.
- Backend returns only shipments where `courierId === user.id`.
- Supports page, limit, status, trackingNumber.


## Frontend Work
Build courier operational cards, next-action prompts, assigned shipment list, notification count, and route to shipment detail.

## Pages
/courier and /courier/shipments.

## Components
CourierStatStrip, AssignedShipmentCard, NextActionBadge, CourierQueue.

## User Journey
Courier logs in → sees assignment notification/queue → opens shipment → performs next valid status action.

## Security
Do not show unassigned shipments; do not create an 'accept shipment' action because no such endpoint exists.

## Error Handling
Empty queue is normal and gets a meaningful operational empty state.

## Testing
Courier with zero assignments and multiple assignments; unauthorized customer access to courier route.

## Documentation
Document that assignment is Admin-controlled.

## Environment Variables
No new environment variables.

## Files Expected To Change
Courier dashboard/list routes and components.

## Completion Criteria
- [ ] Courier list is backend-scoped.
- [ ] No accept/claim API is invented.
- [ ] Status next-action cues match current state.

## Verification
Assign a shipment as Admin, log in as Courier, and confirm it appears only after assignment.

## Output
Functional courier workspace.

---


# Phase 22 — Courier Shipment Detail and State Transitions

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 22, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for courier workflow UX, state-transition controls, confirmation dialogs, forms, and responsive accessibility skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Implement the courier shipment detail page and all documented operational status transitions.

## Depends On
- Phase 21

## Why This Phase Exists
Allow courier to advance assigned shipments only through backend-valid states and collect required descriptions/failure reasons.

## Scope
### IN SCOPE
Allow courier to advance assigned shipments only through backend-valid states and collect required descriptions/failure reasons.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### PATCH /api/v1/shipments/:id/status
- Auth: COURIER or ADMIN.
- Body: `status`, `description`, optional `failureReason` required when `status=FAILED_DELIVERY`.
- Backend enforces strict transitions and maximum 3 delivery attempts.
- Each valid transition creates TrackingEvent and AuditLog; terminal delivery/failure also affects DeliveryAttempt.


## Frontend Work
Derive available next actions from the current status. When status becomes FAILED_DELIVERY, require a failure reason. When attempting re-delivery, clearly show attempt-related backend errors rather than guessing count.

## Pages
/courier/shipments/[id].

## Components
StatusTransitionDialog, FailureReasonField, TransitionHistory, DeliveryActionBar.

## User Journey
Assigned → Picked Up → In Transit → Out for Delivery → Delivered OR Failed → Reattempt/Return.

## Security
Only show status mutations to COURIER for assigned shipments; Admin controls are separate.

## Error Handling
Invalid transition, assignment mismatch, max-attempt failure, and concurrent update conflicts become specific messages.

## Testing
Happy-path state progression and failed-delivery three-attempt boundary.

## Documentation
Document exact transition UI mapping.

## Environment Variables
No new environment variables.

## Files Expected To Change
Courier shipment detail route/hooks/components.

## Completion Criteria
- [ ] All documented courier transitions are represented.
- [ ] FAILED_DELIVERY requires failureReason.
- [ ] UI never permits arbitrary status selection.

## Verification
Walk one real shipment through the full lifecycle with Postman/backend and verify frontend state after each transition.

## Output
Safe courier state-management workflow.

---


# Phase 23 — Courier Analytics and Profile Context

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 23, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for analytics visualization, profile UI, performance metrics presentation, responsive charts, and accessibility skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Provide the required courier analytics surface without inventing unavailable earnings data.

## Depends On
- Phase 22

## Why This Phase Exists
Build delivery-performance analytics from the courier's assigned shipment data and reuse `/profile`/`/notifications` for account management.

## Scope
### IN SCOPE
Build delivery-performance analytics from the courier's assigned shipment data and reuse `/profile`/`/notifications` for account management.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### GET /api/v1/shipments
- Auth: COURIER.
- Use paginated assigned shipments.
- No courier earnings endpoint is available.

### GET /api/v1/users/me
### PATCH /api/v1/users/me
### GET /api/v1/users/me/notifications


## Frontend Work
Create delivery counts by status, completion rate, failure count from available loaded/queried data. Label monetary earnings as unavailable rather than estimating payment splits. Profile and notification pages remain shared.

## Pages
/courier/analytics.

## Components
AnalyticsCard, StatusDistributionChart, DeliveryTrendCard, AvailabilityInfo.

## User Journey
Courier reviews workload and delivery performance → opens assigned shipment details → manages profile/notifications.

## Security
Never calculate or display private customer information beyond what the courier shipment response legitimately includes.

## Error Handling
Analytics should degrade to partial cards if one data series fails.

## Testing
Status distribution and empty dataset.

## Documentation
Explicitly document the backend limitation on courier earnings.

## Environment Variables
No new environment variables.

## Files Expected To Change
Courier analytics page/components.

## Completion Criteria
- [ ] Analytics uses real shipment records.
- [ ] No fabricated earnings amount appears.
- [ ] Charts are responsive.

## Verification
Compare chart totals to the courier shipment list response.

## Output
Provider-category analytics page grounded in real data.

---


# Phase 24 — Admin Dashboard and Platform Statistics

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 24, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for admin dashboard UX, Recharts/Chart.js visualization, KPI design, responsive grids, and accessibility skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Build the admin overview using the dedicated dashboard statistics API.

## Depends On
- Phase 21, Phase 23

## Why This Phase Exists
Create KPI cards, operational summary, and charts derived from the aggregate admin stats plus real shipment data where appropriate.

## Scope
### IN SCOPE
Create KPI cards, operational summary, and charts derived from the aggregate admin stats plus real shipment data where appropriate.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### GET /api/v1/admin/dashboard-stats
- Auth: ADMIN only.
- Returns `totalUsers`, `totalShipments`, `activeShipments`, `revenue`.


## Frontend Work
Display exact server metrics. Charts must not imply time-series data unless an actual time series endpoint exists. Use distribution/operational views from current shipment data only.

## Pages
/admin.

## Components
AdminStatGrid, RevenueCard, ActivitySummary, AdminChartCard.

## User Journey
Admin logs in → sees platform totals → jumps to shipment operations, user management, zones, pricing, or audit logs.

## Security
Only ADMIN route can fetch dashboard stats.

## Error Handling
Partial failure handling if shipment secondary widgets fail while KPI fetch succeeds.

## Testing
Verify values match API response.

## Documentation
Document which charts are aggregate vs derived.

## Environment Variables
No new environment variables.

## Files Expected To Change
Admin dashboard route/components.

## Completion Criteria
- [ ] Admin-only data is inaccessible to other roles.
- [ ] KPI labels match API fields exactly.
- [ ] No fake time-series data is added.

## Verification
Open Network panel, capture dashboard-stats response, and compare all KPI values.

## Output
Real-data admin overview.

---


# Phase 25 — Admin Shipment Operations, Search, and URL State

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 25, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for admin data-table UX, search/filter/sort/pagination, URL state synchronization, and responsive skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Build the central admin shipment operations page with URL-synchronized filtering, searching, sorting, and pagination.

## Depends On
- Phase 24

## Why This Phase Exists
Admin sees all shipments and can target dispatch-ready CONFIRMED shipments.

## Scope
### IN SCOPE
Admin sees all shipments and can target dispatch-ready CONFIRMED shipments.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### GET /api/v1/shipments
- Auth: ADMIN.
- Query: page, limit, status, trackingNumber.

### GET /api/v1/shipments/search
- Auth: Any authenticated role.
- Use only documented query parameters confirmed by backend/Postman.


## Frontend Work
Use URL state for `page`, `limit`, `status`, `q`, `sort`. The main list maps `q` to `trackingNumber`. Sort current page client-side unless actual backend sort support is verified.

### Concrete admin shipment table

Use the reusable typed `DataTable`. Display only fields confirmed by the real response, such as:
- tracking number
- customer/courier names when returned
- status
- origin/destination
- service type
- estimated/final price when available
- created date
- permitted actions

Search, filter, and page state must be reflected in the URL. Never send unsupported query parameters merely to make the UI appear server-filtered.


## Pages
/admin/shipments.

## Components
AdminShipmentTable, DispatchQueueBadge, ShipmentFilterBar, Bulk-free action toolbar, Pagination.

## User Journey
Admin filters CONFIRMED shipments → opens detail → assigns courier or performs support action.

## Security
Admin data remains protected by route guard and backend RBAC.

## Error Handling
Concurrent changes can cause 409; refresh and explain.

## Testing
Bookmarkable filters, page changes, status filter, search, empty state.

## Documentation
Document current server-supported query params.

## Environment Variables
No new environment variables.

## Files Expected To Change
Admin shipments route and query hooks/components.

## Completion Criteria
- [ ] All filters/pagination/search appear in URL.
- [ ] Admin sees all authorized shipment records.
- [ ] CONFIRMED dispatch queue is visually distinct.

## Verification
Load `/admin/shipments?status=CONFIRMED&page=2` and confirm same backend query.

## Output
Operational shipment control center.

---


# Phase 26 — Admin Shipment Detail, Assignment, Refund, Edit, and Delete

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 26, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for admin detail workflows, assignment dialogs, refund UX, destructive actions, forms, and accessibility skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Implement all admin operations available against a shipment without inventing a courier-selection API.

## Depends On
- Phase 25

## Why This Phase Exists
Admin detail page combines shipment information, current state, assignment action, supported edit/delete/refund/status controls.

## Scope
### IN SCOPE
Admin detail page combines shipment information, current state, assignment action, supported edit/delete/refund/status controls.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### GET /api/v1/shipments/:id
- Auth: ADMIN allowed.

### PATCH /api/v1/shipments/:id
- Auth: CUSTOMER, ADMIN.
- PENDING only.

### DELETE /api/v1/shipments/:id
- Auth: ADMIN only.
- Soft deletes shipment.

### POST /api/v1/shipments/:id/assign
- Auth: ADMIN only.
- Body: `{ courierId }`.
- Shipment must be CONFIRMED or PICKUP_ASSIGNED.
- Courier service area must match shipment origin zone.

### POST /api/v1/payments/refund
- Auth: ADMIN only.
- Body: `{ shipmentId, reason? }`.
- Payment must be PAID; shipment becomes CANCELLED.


## Frontend Work
For assignment, obtain courier IDs only from the real admin user list where role=COURIER; do not create a separate courier endpoint. Confirm destructive actions. Show refund only where payment state in real shipment data indicates a paid state or after backend confirms eligibility.

### Concrete admin operation panels

Reuse the shipment-detail presentation from other role views, then add privileged panels only where the backend supports the action:
- **Courier assignment** — choose from real admin user data and restrict the visible options to COURIER records when the backend exposes that information.
- **Refund** — confirmation dialog before calling the documented refund API.
- **Admin status update** — same backend-valid status and required description/failure fields.
- **Edit/Delete** — visible only for supported role/state combinations.
- **Tracking** — reuse the shared timeline.

Invalidate the affected detail/list queries after each successful mutation.


## Pages
/admin/shipments/[id].

## Components
AdminShipmentDetail, CourierAssignDialog, RefundDialog, AdminEditShipmentDialog, DeleteShipmentDialog, AdminTransitionActions.

## User Journey
Admin opens shipment → may edit pending → assign courier when confirmed → refund when paid/disputed → inspect final state.

## Security
Admin-only operations are hidden from other roles and backend-authorized.

## Error Handling
409 assignment conflict, 400/403 business rules, and 404 missing shipment.

## Testing
Assignment with matching courier, mismatched courier service area rejection, refund, soft delete, edit pending only.

## Documentation
Document that courier assignment is forceful admin action, not courier acceptance.

## Environment Variables
No new environment variables.

## Files Expected To Change
Admin shipment detail route and operations components.

## Completion Criteria
- [ ] All documented admin shipment mutations are represented.
- [ ] Destructive actions require confirmation.
- [ ] No fake payment/refund status is shown.

## Verification
Use a real confirmed shipment, assign a real courier, then inspect courier notifications and shipment state.

## Output
Complete admin shipment operations.

---


# Phase 27 — Admin User Management

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 27, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for admin user-management UX, tables, role controls, confirmations, filters, and accessibility skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Implement administrator user list, user detail, role change, and soft delete using the existing admin endpoints.

## Depends On
- Phase 26

## Why This Phase Exists
Provide searchable/paginated user management with explicit role-change UI and destructive confirmation.

## Scope
### IN SCOPE
Provide searchable/paginated user management with explicit role-change UI and destructive confirmation.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### GET /api/v1/admin/users
- Auth: ADMIN.
- Purpose: list/search users.
- Pagination contract: page, limit, meta.
- Do not invent undocumented filter query fields.

### GET /api/v1/admin/users/:id
- Auth: ADMIN.
- Path: UUID.

### PATCH /api/v1/admin/users/:id/role
- Auth: ADMIN.
- Body: role; Postman also shows optional `serviceArea`.
- Role changes must follow backend validation.

### DELETE /api/v1/admin/users/:id
- Auth: ADMIN.
- Soft delete.


## Frontend Work
Use `q` and `role` in URL for client-side filtering over loaded page data unless backend confirms additional search/filter params. Role mutation dialog optionally asks serviceArea when assigning COURIER if the backend contract accepts it.

## Pages
/admin/users and /admin/users/[id].

## Components
UserTable, UserFilters, UserDetailCard, RoleChangeDialog, UserDeleteDialog.

## User Journey
Admin → user list → user detail → role change or soft delete → list invalidation.

## Security
Never permit an admin UI to self-demote/delete without explicit backend-supported confirmation behavior.

## Error Handling
409 or 403 conflicts become actionable messages; stale user data triggers refetch.

## Testing
Customer→Courier promotion, role display refresh, delete, pagination, empty state.

## Documentation
Document that admin creation is not available through public registration.

## Environment Variables
No new environment variables.

## Files Expected To Change
Admin user routes/components/hooks.

## Completion Criteria
- [ ] CRUD-equivalent admin user operations available through documented endpoints.
- [ ] URL state exists for list controls.
- [ ] Role update UI matches backend request body.

## Verification
Promote a real customer to courier and verify the next login/session reflects the new role after backend processing.

## Output
Working admin user management.

---


# Phase 28 — Admin Zone Management

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 28, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for admin CRUD UX, zone management forms/tables, dialogs, validation, and responsive design skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Implement delivery-zone list, create, active-state update, and delete using the Postman collection.

## Depends On
- Phase 27

## Why This Phase Exists
Create an admin CRUD table centered on active/inactive zone state and backend-supported fields.

## Scope
### IN SCOPE
Create an admin CRUD table centered on active/inactive zone state and backend-supported fields.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### GET /api/v1/zones
- Auth: Any role.

### POST /api/v1/zones
- Auth: ADMIN.
- Body: `name`, `city`, optional `isActive` default true.

### PATCH /api/v1/zones/:id
- Auth: ADMIN.
- Postman demonstrates `{ isActive: false }`.
- Do not add unsupported editable fields until verified against actual backend schema.

### DELETE /api/v1/zones/:id
- Auth: ADMIN.
- Soft delete.


## Frontend Work
Use list data directly from `/zones`. For update, default UI is an active/inactive toggle because that is the documented Postman mutation shape.

## Pages
/admin/zones.

## Components
ZoneTable, ZoneFormDialog, ZoneStatusSwitch, ZoneDeleteDialog.

## User Journey
Admin → creates zone → pricing rules later reference zone → deactivates/deletes obsolete zone.

## Security
Zone mutations admin-only.

## Error Handling
Inactive-zone pricing/shipment business rules must be explained if backend rejects them.

## Testing
Create, deactivate, delete, empty state.

## Documentation
Record that exact PATCH editable fields are constrained by verified backend contract.

## Environment Variables
No new environment variables.

## Files Expected To Change
Admin zones route/components/hooks.

## Completion Criteria
- [ ] Create/list/toggle/delete use real endpoints.
- [ ] No fake zone rows.
- [ ] Zone state is visually consistent.

## Verification
Create a test zone and confirm it appears in a subsequent `/zones` response; deactivate it and inspect API result.

## Output
Functional zone administration.

---


# Phase 29 — Admin Pricing Rules

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 29, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for pricing-rule management UX, complex forms, validation, tabular editing, and accessibility skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Implement administrator pricing-rule visibility and upsert controls while keeping all actual calculation on the backend.

## Depends On
- Phase 28

## Why This Phase Exists
Create a pricing rules table/form for zone-specific and default rules.

## Scope
### IN SCOPE
Create a pricing rules table/form for zone-specific and default rules.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### GET /api/v1/pricing/rules
- Auth: ADMIN.
- Purpose: list pricing rules.

### PUT /api/v1/pricing/rules
- Auth: ADMIN.
- Body: `zoneId?`, `serviceType`, `basePrice`, `pricePerKg`, `maxWeight`.
- `zoneId` may be omitted/null for system-wide fallback rule.


## Frontend Work
Use real zone list to select `zoneId`. Validate positive numeric values. Explain fallback rule semantics. Do not duplicate pricing calculations in frontend.

## Pages
/admin/pricing.

## Components
PricingRuleTable, PricingRuleForm, RuleScopeBadge, NumericField.

## User Journey
Admin → review rates → upsert zone/service rule → customer later sees server-calculated estimate using updated rule.

## Security
Admin-only mutation.

## Error Handling
Invalid weight cap or conflicting rule responses map to field/top-level errors.

## Testing
STANDARD/EXPRESS, zone-specific and fallback rule, numeric validation.

## Documentation
Document rule fields and fallback semantics.

## Environment Variables
No new environment variables.

## Files Expected To Change
Admin pricing route/components/hooks.

## Completion Criteria
- [ ] Rule list uses real API data.
- [ ] Upsert body contains only documented fields.
- [ ] Fallback rule is clearly distinguished.

## Verification
Upsert one rule, call `/pricing/calculate` for the matching zone/service, and compare breakdown to API behavior.

## Output
Real admin pricing management.

---


# Phase 30 — Admin Audit Logs

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 30, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for audit-log UX, dense data-table presentation, filters, pagination, URL state, and responsive skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Implement the immutable audit-log viewer as an admin-only operational history page.

## Depends On
- Phase 26, Phase 29

## Why This Phase Exists
Render audit events as a searchable/chronological operational log using only fields returned by the backend.

## Scope
### IN SCOPE
Render audit events as a searchable/chronological operational log using only fields returned by the backend.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
### GET /api/v1/admin/audit-logs
- Auth: ADMIN only.
- Purpose: review immutable system actions.
- Examples in documentation include shipment status changes, courier assignment, and pricing-rule updates.
- Exact filter/query fields are not documented; do not invent backend query parameters.


## Frontend Work
Prefer a server-loaded table/timeline. If local search/filter controls are added, they operate on currently loaded records and are synchronized in the URL without pretending they are server filters.

## Pages
/admin/audit-logs.

## Components
AuditLogTable, AuditEventBadge, AuditDetailsDrawer, LocalAuditFilter.

## User Journey
Admin investigates a shipment/payment dispute → opens relevant audit entries → follows shipment/user details.

## Security
Admin only; logs are read-only.

## Error Handling
Do not expose internal stack traces or secret-bearing log payloads.

## Testing
Empty logs, large log rendering, malformed/unknown event type fallback.

## Documentation
Document that audit logs are immutable/read-only from frontend.

## Environment Variables
No new environment variables.

## Files Expected To Change
Admin audit route/components.

## Completion Criteria
- [ ] Read-only audit view is functional.
- [ ] No edit/delete controls are present.
- [ ] Unknown event values do not crash the UI.

## Verification
Trigger a real state change and confirm corresponding audit information appears when API exposes it.

## Output
Admin audit trail page.

---


# Phase 31 — Shared Tracking, Status, and Notification UX Hardening

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 31, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for shared component UX, status badges, notification patterns, tracking components, consistency, and accessibility skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Unify state presentation and notification behavior across customer, courier, and admin screens.

## Depends On
- Phase 19, Phase 22, Phase 30

## Why This Phase Exists
Standardize shipment status presentation, transitions, toasts, relative/absolute timestamps, and notification badges.

## Scope
### IN SCOPE
Standardize shipment status presentation, transitions, toasts, relative/absolute timestamps, and notification badges.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
- No new backend endpoint is introduced. Refer only to already implemented endpoints listed in the final API inventory.

## Frontend Work
Create one status mapping source for label, icon, and semantic meaning. Do not create a new state for UI convenience.

## Pages


## Components
StatusBadge, StatusTimeline, NotificationBell, NotificationBadge, Timestamp.

## User Journey


## Security
UI labels never override backend state.

## Error Handling
Unknown backend status renders a safe neutral label and logs a non-sensitive diagnostic.

## Testing
All documented shipment states including CANCELLED, RETURNED, FAILED_DELIVERY.

## Documentation
Document state-display map.

## Environment Variables
No new environment variables.

## Files Expected To Change
`components/shipment/*`, `components/notifications/*`, constants.

## Completion Criteria
- [ ] Every known status has a consistent visual representation.
- [ ] No component has duplicated status label maps.
- [ ] Notifications update across role dashboards.

## Verification
Compare state labels on customer, courier, and admin pages for the same shipment.

## Output
Consistent operational UX.

---


# Phase 32 — Global 404, Error Boundaries, Loading, Empty, and Recovery States

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 32, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for Next.js loading/error/not-found UX, skeletons, empty states, recovery patterns, and accessibility skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Meet the assignment's resilience requirements across every data-fetching route.

## Depends On
- All prior feature phases relevant to routes

## Why This Phase Exists
Add route-segment `loading.tsx`, `error.tsx`, meaningful empty states, and retry/recover actions.

## Scope
### IN SCOPE
Add route-segment `loading.tsx`, `error.tsx`, meaningful empty states, and retry/recover actions.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
- No new backend endpoint is introduced. Refer only to already implemented endpoints listed in the final API inventory.

## Frontend Work
Every data-fetching route gets a skeleton, not a full-page spinner. Every list gets a meaningful empty state. Mutations use toasts; route crashes use error boundaries.

## Pages
All data-fetching routes.

## Components
Skeleton variants, EmptyState variants, ErrorState, RetryButton.

## User Journey


## Security
Error messages must not leak backend stack traces, SQL, tokens, or internal paths.

## Error Handling
Map 400/401/403/404/409/500/network outcomes consistently.

## Testing
Disconnect network, force 401/403/404/409, render empty collections.

## Documentation
Document error UI conventions.

## Environment Variables
No new environment variables.

## Files Expected To Change
Every feature route's `loading.tsx`/`error.tsx`; shared feedback components.

## Completion Criteria
- [ ] Every data-fetching route has a skeleton loader.
- [ ] Every list has an empty state.
- [ ] Unhandled API failure never produces a blank screen.

## Verification
Use browser devtools offline mode and controlled bad IDs to trigger all major states.

## Output
Resilient application-wide loading/error UX.

---


# Phase 33 — Responsive Design Pass

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 33, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for mobile-first responsive design, breakpoint strategy, touch interaction, and responsive testing skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Ensure every page works at mobile, tablet, and desktop breakpoints without losing functionality.

## Depends On
- Phase 32

## Why This Phase Exists
Perform a dedicated responsive pass over tables, sidebars, dialogs, forms, charts, timeline, and status actions.

## Scope
### IN SCOPE
Perform a dedicated responsive pass over tables, sidebars, dialogs, forms, charts, timeline, and status actions.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
- No new backend endpoint is introduced. Refer only to already implemented endpoints listed in the final API inventory.

## Frontend Work
Tables collapse to cards or horizontal scroll where appropriate; mobile navigation becomes a drawer; dialogs use full-width layouts on small screens; shipment timeline remains readable; admin filters wrap into stacked controls.

## Pages


## Components
ResponsiveTable, ResponsiveDialog, MobileSidebar, MobileFilterSheet.

## User Journey
All role journeys remain fully executable on 320px+ screens.

## Security
Responsive variants must preserve the same authorization visibility rules.

## Error Handling
Responsive error/empty states remain accessible.

## Testing
Chrome DevTools mobile/tablet/desktop profiles, orientation changes.

## Documentation
Document responsive behavior of complex screens.

## Environment Variables
No new environment variables.

## Files Expected To Change
Shared layout and affected page/component styles.

## Completion Criteria
- [ ] No critical action is inaccessible on mobile.
- [ ] No horizontal overflow except intentionally scrollable data tables.
- [ ] Charts resize correctly.

## Verification
Manually test 320px, 768px, and desktop widths for all 29 routes.

## Output
Mobile-first responsive frontend.

---


# Phase 34 — Accessibility and Interaction Quality

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 34, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for accessibility, keyboard navigation, focus management, ARIA, color contrast, and interaction-design skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Harden keyboard, focus, labeling, contrast, and status communication across the UI.

## Depends On
- Phase 33

## Why This Phase Exists
Apply semantic HTML, labels, focus-visible styles, keyboard navigation, dialog focus management, accessible status text, and sufficient contrast.

## Scope
### IN SCOPE
Apply semantic HTML, labels, focus-visible styles, keyboard navigation, dialog focus management, accessible status text, and sufficient contrast.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
- No new backend endpoint is introduced. Refer only to already implemented endpoints listed in the final API inventory.

## Frontend Work
Audit shadcn components, forms, tables, dialogs, navigation, and error feedback. Add `aria-live` only where appropriate.

## Pages


## Components
AccessibleFormField, VisuallyHidden labels where needed, Focus utilities.

## User Journey


## Security


## Error Handling


## Testing
Keyboard-only smoke test, screen-reader-friendly labels, automated accessibility audit where tooling is available.

## Documentation
Record any intentional accessibility trade-offs.

## Environment Variables
No new environment variables.

## Files Expected To Change


## Completion Criteria
- [ ] All forms have labels and error associations.
- [ ] Interactive controls are keyboard reachable.
- [ ] Modal focus returns to trigger.

## Verification
Complete key flows without a mouse.

## Output
Accessible interaction layer.

---


# Phase 35 — Performance, Caching, and Rendering Optimization

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 35, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for Next.js performance, rendering strategy, image optimization, caching, code splitting, and frontend performance skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Meet the assignment performance expectations without introducing unnecessary architecture.

## Depends On
- Phase 32, Phase 33

## Why This Phase Exists
Optimize server/client split, TanStack Query caching, image handling, code splitting, and large-list rendering.

## Scope
### IN SCOPE
Optimize server/client split, TanStack Query caching, image handling, code splitting, and large-list rendering.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
Use pagination for shipments/users; do not fetch unbounded collections.

## Frontend Work
Use Server Components by default. Use `next/image` only for real local/remote images actually needed. Avoid fetching the same profile repeatedly. Set sensible query stale times per endpoint class. Lazy-load heavy charts on analytics pages.

## Pages


## Components


## User Journey


## Security
Never cache privileged data in a public shared cache.

## Error Handling


## Testing
Measure repeated navigation/network requests and verify cache reuse.

## Documentation
Document cache policy and which pages are server-first.

## Environment Variables
No new environment variables.

## Files Expected To Change
Query config, dynamic imports, image configuration, page boundaries.

## Completion Criteria
- [ ] Duplicate network requests are reduced.
- [ ] Heavy chart bundle is not loaded on unrelated pages.
- [ ] Paginated endpoints never request >50 items.
- [ ] Public and private caching boundaries are explicit.

## Verification
Use browser Network tab to compare first load vs repeated navigation and inspect loaded chunk behavior.

## Output
Efficient production rendering.

---


# Phase 36 — API Error, Concurrency, and Security Hardening

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 36, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for frontend security, API error handling, concurrency, token refresh, CSRF/origin checks, and secure UX skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Finalize client behavior for all documented failure modes and secure the BFF.

## Depends On
- Phase 35

## Why This Phase Exists
Handle 401 refresh, 403 role violation, 409 assignment concurrency, business-rule failures, structured validation, and network errors consistently.

## Scope
### IN SCOPE
Handle 401 refresh, 403 role violation, 409 assignment concurrency, business-rule failures, structured validation, and network errors consistently.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
Relevant failure contracts:
- 400 validation/business rule failures.
- 401 expired/invalid auth.
- 403 unauthorized role.
- 404 missing resource.
- 409 concurrency/duplicate conflicts.
- Structured `errors` array for field failures.


## Frontend Work
Implement one-retry refresh logic, 401 logout fallback, field-error mapping, toast policies, retry-safe queries, and mutation idempotence controls.

## Pages


## Components


## User Journey


## Security
Apply origin checks, secure cookies, no secrets in source, allowlisted BFF paths, CSRF-safe mutation semantics, redacted logs, dependency audit.

## Error Handling
Never reveal backend stack traces/database details.

## Testing
Controlled 401/403/409/500/network simulations; verify no infinite refresh loop.

## Documentation
Document security assumptions and threat boundaries.

## Environment Variables
`SESSION_SECRET`, API URL variables, optional cookie/domain settings.

## Files Expected To Change
BFF handlers, auth utilities, error mapper, middleware, fetch wrapper.

## Completion Criteria
- [ ] 401 triggers at most one refresh attempt.
- [ ] 403 never retries.
- [ ] 409 is presented as a state conflict, not generic server failure.
- [ ] No sensitive tokens appear in console/network application logs.

## Verification
Use test endpoints/stubs only in automated tests; production UI must still use the real API.

## Output
Hardened authentication and failure handling.

---


# Phase 37 — Unit and Component Test Suite

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 37, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for frontend unit testing, component testing, form validation testing, and testable UI architecture skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Add focused automated tests around the highest-risk frontend logic.

## Depends On
- Phase 36

## Why This Phase Exists
Test schemas, API response mapping, auth state decisions, shipment transition UI rules, pricing form logic, and URL state serialization.

## Scope
### IN SCOPE
Test schemas, API response mapping, auth state decisions, shipment transition UI rules, pricing form logic, and URL state serialization.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
- No new backend endpoint is introduced. Refer only to already implemented endpoints listed in the final API inventory.

## Frontend Work
Use the project's selected React testing tool and keep tests close to the behavior they validate.

## Pages


## Components


## User Journey


## Security


## Error Handling


## Testing
Required coverage:
- Zod registration/shipment/status schemas.
- URL filter serialization/deserialization.
- Role-based navigation visibility.
- Shipment status action availability.
- Pricing form validation.
- API error-to-toast/field error mapping.
- Payment redirect result rendering.


## Documentation
Document test command and scope.

## Environment Variables
No new environment variables.

## Files Expected To Change
`tests/*`, component `*.test.tsx`, utility test files.

## Completion Criteria
- [ ] Critical business/UI logic has automated coverage.
- [ ] Tests do not depend on external production accounts except dedicated E2E configuration.

## Verification
Run the full unit/component test command in CI-like mode.

## Output
Maintainable automated frontend test coverage.

---


# Phase 38 — End-to-End Role Journey Tests

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 38, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for end-to-end testing, role-based journeys, payment flow testing, and browser automation skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Validate the complete real-data user journeys required for evaluation.

## Depends On
- Phase 37

## Why This Phase Exists
Create E2E coverage for Customer, Courier, Admin, payment redirect states, and authorization boundaries.

## Scope
### IN SCOPE
Create E2E coverage for Customer, Courier, Admin, payment redirect states, and authorization boundaries.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
- No new backend endpoint is introduced. Refer only to already implemented endpoints listed in the final API inventory.

## Frontend Work
Seed/use the backend's dedicated demo accounts and realistic data. Do not create mock API responses in the production app.

## Pages


## Components


## User Journey


## Security
Verify route protection and backend rejection with tampered URLs.

## Error Handling


## Testing
Customer:
Registration/login → zones → price → create shipment → payment initiation → tracking → notification → cancellation for pending shipment.

Courier:
Login → notifications → assigned shipments → PICKED_UP → IN_TRANSIT → OUT_FOR_DELIVERY → DELIVERED or FAILED_DELIVERY.

Admin:
Login → dashboard → zones → pricing → shipment queue → assign courier → users → audit → refund flow.

Authorization:
Customer cannot access admin routes.
Courier cannot access customer/admin-only mutation routes.
Admin can access admin operations.


## Documentation
Document test environment assumptions and how to reset test state.

## Environment Variables
No new environment variables.

## Files Expected To Change
`e2e/*`, test config.

## Completion Criteria
- [ ] Critical role journeys are executable end-to-end.
- [ ] Payment flow reaches real or controlled Stripe Test Mode.
- [ ] Role barriers are proven.

## Verification
Run E2E against the deployed backend or a dedicated test environment using evaluator-safe credentials.

## Output
Evidence that the frontend is a real integrated system.

---


# Phase 39 — Production Deployment Configuration

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 39, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for Next.js production deployment, environment configuration, observability, and deployment engineering skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Prepare and deploy the frontend with correct environment variables and production routing.

## Depends On
- Phase 38

## Why This Phase Exists
Configure Vercel/Netlify/Cloudflare-compatible deployment, environment variables, build command, and public URL.

## Scope
### IN SCOPE
Configure Vercel/Netlify/Cloudflare-compatible deployment, environment variables, build command, and public URL.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
- No new backend endpoint is introduced. Refer only to already implemented endpoints listed in the final API inventory.

## Frontend Work
Set production API base URL, app URL, session secret, Google client ID if Google auth is enabled, and demo credentials only when safe for evaluator use.

### Concrete production smoke test

After deployment, verify:
1. Public routes render without console errors.
2. All three demo-login actions work with the dedicated demo accounts.
3. Customer can create a real shipment and initiate Stripe payment.
4. Payment return routes render correctly.
5. Admin dashboard, shipment, user, zone, pricing, and audit data are real API data.
6. Admin can assign a courier and perform documented operations.
7. Courier sees only assigned shipments and can perform valid transitions.
8. No CORS/session failures appear.
9. Refreshing the browser preserves the session without exposing tokens.


## Pages


## Components


## User Journey


## Security
Production secrets are stored in platform secret management, never repository files.

## Error Handling
Verify custom domain/preview URLs route correctly and client error boundaries work after deployment.

## Testing


## Documentation
Write deployment steps and environment-variable table.

## Environment Variables
`API_BASE_URL`, `NEXT_PUBLIC_APP_URL`, `SESSION_SECRET`, optional Google client ID, optional demo credentials.

## Files Expected To Change
Deployment config, `.env.example`, README.

## Completion Criteria
- [ ] Production build succeeds.
- [ ] Deployed frontend reaches backend health/data endpoints.
- [ ] Protected routes work in production.
- [ ] Stripe return URLs match deployed origin if backend checkout is configured accordingly.

## Verification
Open live URL and test all three demo logins plus one full shipment path.

## Output
Working production frontend.

---


# Phase 40 — README, Demo Video, and Evaluator Documentation

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 40, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for documentation, frontend architecture explanation, UI/UX walkthrough, and evaluator-facing presentation skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Prepare the assignment-facing documentation and demonstration materials.

## Depends On
- Phase 39

## Why This Phase Exists
Update README with architecture, setup, live URL, API base, roles, demo credentials, payment test-mode instructions, and known backend limitations.

## Scope
### IN SCOPE
Update README with architecture, setup, live URL, API base, roles, demo credentials, payment test-mode instructions, and known backend limitations.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
- No new backend endpoint is introduced. Refer only to already implemented endpoints listed in the final API inventory.

## Frontend Work
Add clear UI labels and seeded/evaluator-safe demo data only through real backend accounts.

## Pages


## Components


## User Journey


## Security
Never publish real production credentials or secrets; only dedicated evaluation accounts.

## Error Handling


## Testing


## Documentation
Include five-to-ten-minute demo flow: public UI, role demo login, customer shipment/payment/tracking, admin operations, courier status transition, loading/error state, responsive proof.

## Environment Variables
No new environment variables.

## Files Expected To Change


## Completion Criteria
- [ ] README contains complete setup/deployment instructions.
- [ ] Demo flow covers assignment requirements.
- [ ] Evaluator can log in with dedicated demo accounts.

## Verification
Follow the README from a clean checkout as a second-user simulation.

## Output
Submission-ready documentation.

---


# Phase 41 — Meaningful Git Commit Plan and History Audit

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 41, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for Git workflow, commit discipline, repository conventions, and implementation-quality skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Ensure the frontend repository demonstrates incremental, meaningful implementation history.

## Depends On
- Phase 40

## Why This Phase Exists
Use at least 20 meaningful commits aligned with feature phases.

## Scope
### IN SCOPE
Use at least 20 meaningful commits aligned with feature phases.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
- No new backend endpoint is introduced. Refer only to already implemented endpoints listed in the final API inventory.

## Frontend Work


### Concrete commit matrix

Aim for at least 20 meaningful commits. Use the alternate plan's finer-grained commit sequence as a baseline, but create commits only for real work.

```text
chore: initialize app foundation
chore: configure shadcn and providers
feat: add domain types and validation
feat: add typed API services
feat: add secure auth BFF
feat: add role middleware
feat: add query and client-state infrastructure
feat: build shared UI primitives
feat: build public pages
feat: add login and demo access
feat: add registration
feat: add customer dashboard
feat: add shipment list and URL state
feat: add shipment wizard
feat: add server-backed pricing
feat: add shipment detail and mutations
feat: add Stripe payment flow
feat: add payment return UX
feat: add tracking and notifications
feat: add courier workspace
feat: add courier state transitions
feat: add courier analytics
feat: add admin dashboard
feat: add admin shipment operations
feat: add admin users/zones/pricing/audit
fix: responsive and accessibility hardening
perf: rendering and caching improvements
test: add unit and component coverage
test: add E2E role journeys
chore: production deployment
docs: finalize evaluator documentation
```

Do not create empty commits or commits whose only purpose is cosmetic churn.


## Pages


## Components


## User Journey


## Security
Do not commit `.env`, credentials, build artifacts, or temporary files.

## Error Handling


## Testing


## Documentation
Recommended commit boundaries: foundation, API client, session, middleware, design shell, public pages, auth, customer dashboard, shipment list, wizard, pricing, detail/edit/cancel, payment, tracking, courier, admin, error/loading, responsive/accessibility, tests, deployment/docs.

## Environment Variables
No new environment variables.

## Files Expected To Change
.gitignore, Git history only.

## Completion Criteria
- [ ] 20+ meaningful frontend commits exist.
- [ ] Commit messages describe one coherent change.
- [ ] No secrets are present in Git history.

## Verification
Run `git log --oneline` and a repository secret scan before submission.

## Output
Clean, evaluator-friendly Git history.

---


# Phase 42 — Final API → Page → Role → Entity Consistency Audit

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 42, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for frontend/API consistency audit, architecture review, UI/UX consistency, and repository quality skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Cross-check every page and feature against the actual backend contract and remove any unsupported behavior.

## Depends On
- All feature phases

## Why This Phase Exists
Perform a final source-of-truth audit before declaring the project complete.

## Scope
### IN SCOPE
Perform a final source-of-truth audit before declaring the project complete.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
Do not add frontend assumptions about database fields that are not present in documented responses.

## API Work
Every endpoint in the final inventory must have a clearly identified consumer or documented infrastructure reason for not being directly called by the browser.

## Frontend Work
Check every protected page has authorization, every mutation has an existing endpoint, every list uses real data, every URL-state control maps to documented backend query capability or explicitly local-sorts loaded data.

## Pages


## Components


## User Journey


## Security
Confirm no UI action can claim success without corresponding backend success.

## Error Handling


## Testing
Run full lint/type/test/build/E2E suites.

## Documentation
Update known limitations and any confirmed backend behavior discovered during integration.

## Environment Variables
No new environment variables.

## Files Expected To Change


## Completion Criteria
- [ ] No undocumented endpoint is required by a core workflow.
- [ ] No documented core workflow is silently omitted.
- [ ] No page claims unsupported functionality.
- [ ] All routes and APIs appear in final inventories.

## Verification
Review the final mapping tables below line-by-line against the Postman/API sources.

## Output
A contract-consistent implementation blueprint and application.

---


# Phase 43 — Final Submission Readiness Audit

> **Mandatory repository-skill instruction for this phase:** Before executing Phase 43, the coding agent must read `AGENTS.md`, inspect the `.agents/` skills relevant to this phase, and **use the necessary applicable skill(s)** for final frontend QA, responsive/accessibility verification, deployment checks, and release-readiness skills. This is required even if the agent believes it already knows the workflow. When a relevant repository skill exists, follow it instead of inventing a parallel design or implementation process.

## Merged-plan audit

Before declaring the project complete, explicitly confirm that the implementation did **not** import invalid patterns from the alternate plan:

- no access/refresh tokens persisted in localStorage
- no fabricated public tracking endpoint
- no fake contact-form submission
- no fabricated statistics/testimonials presented as real data
- no undocumented API sort/filter/search parameters
- no fake payment success state
- no invented courier earnings/settlement
- no unsupported review/rating workflow
- no payment-history endpoint invented by the frontend


## Backend Source Repository — Use When Required By This Phase

**Actual backend source location:** `G:\programming\PH-assignment\Courier_Logistics_Platform`

- If this phase touches API integration, authentication/session behavior, authorization, request/response shapes, validation, shipment business rules, shipment state transitions, pricing, payment behavior, notifications, error behavior, or integration verification, inspect the **actual backend source code** at the path above before making assumptions.
- Use the backend source to verify implementation details that are missing or unclear in the frontend/API documentation. **Never fill an evidence gap with a guess.**
- Treat the backend source as implementation evidence, while keeping the assignment requirements and documented API/Postman contract as the frontend-facing contract. If the sources appear to conflict, do not silently choose one; verify the conflict and document/stop when it cannot be safely resolved.
- Do **not** modify, migrate, redesign, or reimplement the backend from a frontend phase. Backend source inspection is for understanding and verification unless an explicitly authorized task says otherwise.
- For a purely static/UI-only task with no dependency on backend behavior, backend inspection is not required unless needed to verify displayed data or integration assumptions.
- Do not assume the backend path exists on every machine. If a phase genuinely requires backend inspection and the path is inaccessible, report the exact blocker instead of inventing the missing backend behavior.

## Objective
Verify every assignment requirement is visibly and technically satisfied before submission.

## Depends On
- Phase 42

## Why This Phase Exists
Final checklist covering page count, role login, payment, URL state, skeletons, errors, validation, responsive behavior, deployment, commits, documentation, and demo.

## Scope
### IN SCOPE
Final checklist covering page count, role login, payment, URL state, skeletons, errors, validation, responsive behavior, deployment, commits, documentation, and demo.

### OUT OF SCOPE
Future-phase functionality and unrelated backend changes.

## Backend Work
No backend implementation is planned in this phase. Consume only the already-documented backend contract.

## Database Work
No database change. Existing backend entities remain the source of truth.

## API Work
- No new backend endpoint is introduced. Refer only to already implemented endpoints listed in the final API inventory.

## Frontend Work
Confirm 29 routes/pages, three roles, one-click demo buttons, real APIs, payment redirects, loading/error boundaries, forms with RHF+Zod, reusable components, and metadata.

## Pages


## Components


## User Journey


## Security


## Error Handling


## Testing
Run final production smoke test across public, Customer, Courier, Admin, payment, 404, and error routes.

## Documentation
Freeze submission URLs and evaluator credentials only after final deployment.

## Environment Variables
No new environment variables.

## Files Expected To Change


## Completion Criteria
- [ ] 29 functional routes/pages are implemented.
- [ ] CUSTOMER, COURIER, and ADMIN route/UI authorization works.
- [ ] Three one-click demo-login buttons work with dedicated evaluator accounts.
- [ ] Stripe Test Mode initiation and success/cancel UX are complete.
- [ ] All filtering/search/pagination/sort URL state is bookmarkable.
- [ ] Every data-fetching route has loading skeleton support.
- [ ] Every list has a meaningful empty state.
- [ ] Error boundaries and toasts are demonstrated.
- [ ] At least one multi-step form is implemented.
- [ ] No `any` types remain.
- [ ] 20+ meaningful commits are present.
- [ ] Production frontend is deployed and connected to the real backend.
- [ ] README and demo video are complete.

## Verification
Perform a clean-browser demo from `/login`, use each demo account, execute one end-to-end customer shipment/payment/tracking path and one admin→courier dispatch path, then test mobile layout and failure states.

## Output
Final assignment-ready Courier & Logistics Platform frontend.

---


# 6. Complete API Inventory

The Postman collection is the frontend request reference. It contains role-specific examples for Customer/Admin/Courier login, but those examples all call the same endpoint. The unique method + path set contains 38 contracts. fileciteturn0file0L28-L390

| # | Method | Endpoint | Auth / Role | Frontend Usage | Phase |
|---:|---|---|---|---|---:|
| 1 | POST | `/api/v1/auth/register` | Public; CUSTOMER/COURIER only | Registration | 11 |
| 2 | POST | `/api/v1/auth/login` | Public; all roles | Login + demo login | 6, 10 |
| 3 | POST | `/api/v1/auth/google` | Public | Optional Google login | 10 |
| 4 | POST | `/api/v1/auth/refresh-token` | Public + refreshToken body | BFF refresh | 6 |
| 5 | POST | `/api/v1/auth/logout` | Auth; all roles | BFF logout | 6 |
| 6 | GET | `/api/v1/users/me` | Auth; all roles | Dashboard/profile | 12, 20 |
| 7 | PATCH | `/api/v1/users/me` | Auth; all roles | Profile edit | 20 |
| 8 | GET | `/api/v1/users/me/notifications` | Auth; all roles | Notifications | 20 |
| 9 | PATCH | `/api/v1/users/me/notifications/:id/read` | Auth; all roles | Notification read | 20 |
| 10 | GET | `/api/v1/zones` | Auth; all roles | Zone selection/list | 14, 28 |
| 11 | POST | `/api/v1/zones` | ADMIN | Create zone | 28 |
| 12 | PATCH | `/api/v1/zones/:id` | ADMIN | Update zone state | 28 |
| 13 | DELETE | `/api/v1/zones/:id` | ADMIN | Soft delete zone | 28 |
| 14 | POST | `/api/v1/pricing/calculate` | Auth; all roles | Customer price estimate | 15 |
| 15 | GET | `/api/v1/pricing/rules` | ADMIN | Pricing-rule list | 29 |
| 16 | PUT | `/api/v1/pricing/rules` | ADMIN | Pricing-rule upsert | 29 |
| 17 | POST | `/api/v1/shipments` | CUSTOMER, ADMIN | Create shipment | 14 |
| 18 | GET | `/api/v1/shipments` | Auth; role-scoped | Customer/courier/admin lists | 12, 13, 21, 25 |
| 19 | GET | `/api/v1/shipments/search` | Auth | Tracking/search | 19 |
| 20 | GET | `/api/v1/shipments/:id` | Auth; ownership-scoped | Details | 16, 22, 26 |
| 21 | PATCH | `/api/v1/shipments/:id` | CUSTOMER, ADMIN; PENDING | Edit shipment | 16, 26 |
| 22 | DELETE | `/api/v1/shipments/:id` | ADMIN | Soft delete shipment | 26 |
| 23 | PATCH | `/api/v1/shipments/:id/status` | COURIER, ADMIN | State transitions | 22, 26 |
| 24 | POST | `/api/v1/shipments/:id/cancel` | CUSTOMER, ADMIN; PENDING | Cancel shipment | 16 |
| 25 | POST | `/api/v1/shipments/:id/assign` | ADMIN | Assign courier | 26 |
| 26 | GET | `/api/v1/shipments/:id/tracking` | Auth; ownership-scoped | Tracking timeline | 19 |
| 27 | POST | `/api/v1/payments/initiate` | CUSTOMER; PENDING own shipment | Start checkout | 17 |
| 28 | POST | `/api/v1/payments/refund` | ADMIN; payment must be PAID | Refund | 26 |
| 29 | POST | `/api/v1/payments/stripe/webhook` | Public + Stripe-Signature | Backend async confirmation | 18 |
| 30 | GET | `/api/v1/payments/bkash/callback` | Public | Gateway callback/return support | 18 |
| 31 | GET | `/api/v1/admin/users` | ADMIN | User list | 27 |
| 32 | GET | `/api/v1/admin/users/:id` | ADMIN | User detail | 27 |
| 33 | PATCH | `/api/v1/admin/users/:id/role` | ADMIN | Role/serviceArea update | 27 |
| 34 | DELETE | `/api/v1/admin/users/:id` | ADMIN | Soft delete user | 27 |
| 35 | GET | `/api/v1/admin/dashboard-stats` | ADMIN | Dashboard KPIs | 24 |
| 36 | GET | `/api/v1/admin/audit-logs` | ADMIN | Audit log viewer | 30 |
| 37 | GET | `https://logistics-backend-jyz7.onrender.com/` | Public | Optional backend welcome diagnostic | 3 |
| 38 | GET | `/api/v1/health` | Public | Deployment/health diagnostic | 3 |

### Contract rules the coding agent must preserve

#### Authentication
- Register body: `name`, `email`, `password`, optional `phone`, optional role restricted to CUSTOMER/COURIER.
- Login body: `email`, `password`.
- Google body: `idToken`.
- Refresh body: `refreshToken`.
- Logout requires `Authorization: Bearer <access_token>`.

The Postman collection demonstrates the three seeded login examples and automatic token capture variables. fileciteturn0file0L64-L180

#### Users and notifications
- `GET /users/me` returns user identity/profile fields documented by the backend.
- `PATCH /users/me` updates supported profile fields such as name and phone.
- Notification list and read mutation are user-scoped.

#### Zones
- `GET /zones` supplies the real zone choices used by shipment creation and administration.
- `POST /zones` requires name and city; `isActive` is optional and defaults true.
- `PATCH /zones/:id` must use only backend-confirmed update fields; the Postman example demonstrates `isActive`.
- `DELETE /zones/:id` is a soft-delete operation.

#### Pricing
- `POST /pricing/calculate` accepts destinationZoneId, serviceType, weight and returns a server-calculated price/breakdown.
- `PUT /pricing/rules` accepts zoneId (optional fallback), serviceType, basePrice, pricePerKg, maxWeight.
- The client never sends its own estimated/final shipment price.

#### Shipments
- Create body contains origin/destination zones, service type, addresses/cities, recipient name/phone, and parcel dimensions/details.
- Parcel weight/length/width/height must satisfy the documented minimum of 0.1.
- Shipment list supports page, limit, status, trackingNumber, with pagination metadata.
- Search endpoint is consumed only with documented parameters; do not invent hidden filters.
- Pending update may recalculate server-side price when destination zone, service type, or parcel weight changes.
- Cancellation is only for PENDING shipments.
- Status update requires `status` and `description`, plus `failureReason` when status is `FAILED_DELIVERY`.
- Assignment body is `{ "courierId": "uuid" }`.
- Tracking returns chronological immutable events.

#### Payments
- Initiation body is `{ shipmentId, method }`, with method STRIPE or BKASH.
- Response includes a `paymentUrl` and `paymentId`.
- Stripe webhook is backend infrastructure and must not be called by a customer-facing UI.
- Refund body is `{ shipmentId, reason? }` and is ADMIN-only.

#### Admin
- Dashboard stats returns totalUsers, totalShipments, activeShipments, revenue.
- User role update requires role and may accept serviceArea.
- Audit logs are read-only/immutable from the frontend.

The documented role/ownership rules require customers to see their own shipments, couriers to see assigned shipments, admins to see all shipments, and only valid roles to mutate status/assign/refund. fileciteturn0file1L929-L971

# 7. Final Page Inventory

| Route | Access | Main APIs | Main Purpose | Phase |
|---|---|---|---|---:|
| `/` | Public | None | Landing | 9 |
| `/about` | Public | None | About | 9 |
| `/services` | Public | None | Services | 9 |
| `/pricing` | Public | None until authenticated action | Pricing explanation | 9 |
| `/contact` | Public | None | Support information | 9 |
| `/login` | Public | auth login/google | Login/demo login | 10 |
| `/register` | Public | auth register | Registration | 11 |
| `/dashboard` | CUSTOMER | users/me, shipments | Customer overview | 12 |
| `/dashboard/shipments` | CUSTOMER | shipments | Shipment list | 13 |
| `/dashboard/shipments/new` | CUSTOMER | zones, pricing/calculate, shipments POST | Wizard | 14,15 |
| `/dashboard/shipments/[id]` | CUSTOMER | shipment detail/update/cancel/payment/tracking | Shipment lifecycle | 16,17 |
| `/dashboard/track` | CUSTOMER | shipments/search, tracking | Track by number | 19 |
| `/dashboard/payments` | CUSTOMER | shipments | Shipment-linked payment history | 20 |
| `/profile` | Authenticated | users/me | Shared profile | 20 |
| `/notifications` | Authenticated | notifications APIs | Shared notifications | 20 |
| `/courier` | COURIER | shipments, notifications | Courier dashboard | 21 |
| `/courier/shipments` | COURIER | shipments | Assigned queue | 21 |
| `/courier/shipments/[id]` | COURIER | shipment detail/status/tracking | Delivery operations | 22 |
| `/courier/analytics` | COURIER | shipments | Delivery analytics | 23 |
| `/admin` | ADMIN | admin/dashboard-stats | Admin overview | 24 |
| `/admin/shipments` | ADMIN | shipments/search | Dispatch monitor | 25 |
| `/admin/shipments/[id]` | ADMIN | shipment detail/update/delete/status/assign/refund | Shipment operations | 26 |
| `/admin/users` | ADMIN | admin/users | User management | 27 |
| `/admin/users/[id]` | ADMIN | admin/users/:id, role | User detail | 27 |
| `/admin/zones` | ADMIN | zones CRUD | Zone management | 28 |
| `/admin/pricing` | ADMIN | pricing rules | Pricing configuration | 29 |
| `/admin/audit-logs` | ADMIN | admin/audit-logs | Audit history | 30 |
| `/payment/success` | Payment return | shipment detail if context exists | Success UX | 18 |
| `/payment/cancel` | Payment return | shipment detail if context exists | Cancellation UX | 18 |
| `not-found.tsx` | All | None | 404 | 32 |
| `error.tsx` | All | None | Global error boundary | 32 |


# 8. Database / Domain Entity Inventory

The frontend does not create or modify the database. The following entities are the backend domain objects referenced by the API documentation and are used only to define frontend types and relationships:

| Entity | Purpose | Frontend-Relevant Relationships |
|---|---|---|
| User | Customer, Courier, Admin identity and profile | User → shipments as customer/courier; notifications; audit actor |
| DeliveryZone | Service area | Zone → pricing rules; shipment origin/destination |
| PricingRule | Cost logic | Zone + service type → server price calculation |
| Shipment | Core delivery record | User, Parcel, Payment, TrackingEvent, DeliveryAttempt |
| Parcel | Physical package data | One-to-one with Shipment |
| Payment | Payment state | One-to-one with Shipment |
| TrackingEvent | Immutable state history | Many-to-one with Shipment |
| DeliveryAttempt | Failed/successful delivery attempts | Many-to-one with Shipment |
| Notification | User alerts | User-owned; generated by major lifecycle events |
| AuditLog | Immutable operational history | Actor → entity/action |
| Refresh token/session state | Authentication support | User-associated backend refresh token |

The API documentation explicitly describes the major relationships among these entities. fileciteturn0file1L1041-L1053

No schema changes belong in this frontend assignment.


# 9. Feature → API → Page → Entity → Role Mapping

| Feature | Backend API | Frontend Page | Entity/Domain | Role |
|---|---|---|---|---|
| Registration | POST `/auth/register` | `/register` | User | CUSTOMER/COURIER |
| Login | POST `/auth/login` | `/login` | User/session | All roles |
| Google login | POST `/auth/google` | `/login` | User/session | All roles when configured |
| Session refresh | POST `/auth/refresh-token` | Internal BFF | User/session | Authenticated users |
| Logout | POST `/auth/logout` | Global nav | User/session | All roles |
| Profile | GET/PATCH `/users/me` | `/profile`, `/dashboard` | User | All roles |
| Notifications | GET/PATCH `/users/me/notifications*` | `/notifications` | Notification | All roles |
| Zone selection | GET `/zones` | `/dashboard/shipments/new` | DeliveryZone | CUSTOMER |
| Price estimate | POST `/pricing/calculate` | `/dashboard/shipments/new` | PricingRule + Zone | Authenticated |
| Create shipment | POST `/shipments` | `/dashboard/shipments/new` | Shipment + Parcel | CUSTOMER/ADMIN |
| Customer shipment list | GET `/shipments` | `/dashboard/shipments` | Shipment | CUSTOMER |
| Courier queue | GET `/shipments` | `/courier/shipments` | Shipment | COURIER |
| Admin shipment monitor | GET `/shipments` | `/admin/shipments` | Shipment | ADMIN |
| Shipment detail | GET `/shipments/:id` | Detail routes | Shipment + Parcel + Payment data | Scoped |
| Pending edit | PATCH `/shipments/:id` | Customer/admin detail | Shipment + Parcel | CUSTOMER/ADMIN |
| Pending cancel | POST `/shipments/:id/cancel` | Customer detail | Shipment | CUSTOMER/ADMIN |
| Courier state transition | PATCH `/shipments/:id/status` | Courier detail | Shipment + TrackingEvent + DeliveryAttempt | COURIER |
| Admin state transition | PATCH `/shipments/:id/status` | Admin detail | Shipment + TrackingEvent | ADMIN |
| Courier assignment | POST `/shipments/:id/assign` | Admin detail | Shipment + User | ADMIN |
| Tracking | GET `/shipments/:id/tracking` | `/dashboard/track`, detail | TrackingEvent | Scoped |
| Stripe initiation | POST `/payments/initiate` | Customer detail | Payment + Shipment | CUSTOMER |
| Stripe confirmation | POST `/payments/stripe/webhook` | Backend only | Payment + Shipment + TrackingEvent + AuditLog | System |
| Refund | POST `/payments/refund` | Admin detail | Payment + Shipment | ADMIN |
| Users | GET/PATCH/DELETE `/admin/users*` | Admin users | User | ADMIN |
| Zones | GET/POST/PATCH/DELETE `/zones*` | Admin zones | DeliveryZone | ADMIN |
| Pricing rules | GET/PUT `/pricing/rules` | Admin pricing | PricingRule | ADMIN |
| Dashboard stats | GET `/admin/dashboard-stats` | `/admin` | Aggregate stats | ADMIN |
| Audit | GET `/admin/audit-logs` | `/admin/audit-logs` | AuditLog | ADMIN |
| Health | GET `/health` | Internal/deployment diagnostic | System | Public |


# 10. Final Dependency Graph

```text
Phase 01 — Contract freeze
    ↓
Phase 02 — Next foundation
    ↓
Phase 03 — API client / environment
    ↓
Phase 04 — Design system / shell
    ↓
Phase 05 — Typed domain models
    ↓
Phase 06 — Secure JWT BFF
    ↓
Phase 07 — Middleware / RBAC
    ↓
Phase 08 — Query / Zustand / Toast infrastructure
    ├── Phase 09 Public pages
    ├── Phase 10 Login
    │     ↓
    │   Phase 11 Registration
    │
    └── Phase 12 Customer dashboard
          ↓
        Phase 13 Customer list / URL state
          ↓
        Phase 14 Shipment wizard
          ↓
        Phase 15 Price calculation
          ↓
        Phase 16 Shipment detail/edit/cancel
          ↓
        Phase 17 Stripe initiation
          ↓
        Phase 18 Payment success/cancel
          ↓
        Phase 19 Tracking
          ↓
        Phase 20 Notifications/Profile/Payments
              ↓
          Phase 21 Courier dashboard
              ↓
          Phase 22 Courier state transitions
              ↓
          Phase 23 Courier analytics
              ↓
          Phase 24 Admin dashboard
              ↓
          Phase 25 Admin shipment queue
              ↓
          Phase 26 Admin shipment operations
              ↓
          Phase 27 Admin user management
              ↓
          Phase 28 Admin zones
              ↓
          Phase 29 Admin pricing
              ↓
          Phase 30 Admin audit
              ↓
          Phase 31 Shared status/notification hardening
              ↓
          Phase 32 Error/loading/empty recovery
              ↓
          Phase 33 Responsive pass
              ↓
          Phase 34 Accessibility
              ↓
          Phase 35 Performance
              ↓
          Phase 36 Security/error hardening
              ↓
          Phase 37 Unit/component tests
              ↓
          Phase 38 E2E role journeys
              ↓
          Phase 39 Deployment
              ↓
          Phase 40 Documentation/demo
              ↓
          Phase 41 Git audit
              ↓
          Phase 42 Consistency audit
              ↓
          Phase 43 Submission readiness
```

No phase may depend on a later phase. Backend changes are outside the frontend implementation scope unless the real API is proven to violate its own documented contract.


# 11. Final System Map

### Architecture

```text
Browser / Next.js App Router
        ↓
Server Components + Client Components
        ↓
Next.js Middleware / Route Guards
        ↓
Next.js BFF / API Proxy (authenticated browser calls)
        ↓
Custom JWT Session Cookies
        ↓
Courier & Logistics API
        ↓
PostgreSQL / Prisma + Redis + Stripe/bKash
```

### User Roles

- CUSTOMER
- COURIER
- ADMIN

### Pages

29 routes/pages are defined in the inventory above.

### API Endpoints

The final contract inventory above covers the Postman request set and documented core endpoints.

### Database Entities

User, DeliveryZone, PricingRule, Shipment, Parcel, Payment, TrackingEvent, DeliveryAttempt, Notification, AuditLog, and refresh-token/session state.

### Major Features

- Public logistics product site
- Multi-role authentication
- One-click demo login
- Customer shipment creation
- Server-side pricing calculation
- Stripe test payment initiation
- Payment return states
- Shipment tracking
- Notification center
- Courier operational queue
- Courier lifecycle updates
- Delivery-failure/reattempt UI
- Courier delivery analytics
- Admin dashboard
- Shipment dispatch
- Courier assignment
- Refund
- User role management
- Zone management
- Pricing-rule management
- Audit log viewer
- Responsive/accessibility/performance hardening

### Integrations

- Real Courier & Logistics backend API
- Stripe Test Mode
- Google OAuth only when backend/frontend OAuth configuration is available
- TanStack Query
- Next.js App Router
- Tailwind CSS
- shadcn/ui
- Sonner
- Recharts or Chart.js
- Lucide React


# 12. Implementation Discipline for the Coding Agent

- **Before any frontend design or implementation task, read `AGENTS.md` and use the necessary relevant skill(s) from `.agents/`.**
- **Treat repository-provided frontend/design skills as mandatory execution guidance, not optional suggestions.**
- **For each UI/UX or frontend phase, identify and apply the appropriate `.agents` skill(s) for the work being performed.**
- Do not skip phases.
- Do not implement future-phase functionality early except where a dependency requires a shared primitive.
- Do not invent undocumented backend endpoints, response fields, query parameters, payment states, review systems, courier earnings, or upload workflows.
- Do not redesign the existing backend or database.
- Reuse shared components and hooks.
- Keep Server Components as the default and add `"use client"` only for true interactivity.
- Use React Hook Form + Zod for every non-trivial form.
- Treat backend validation and authorization as authoritative.
- Never trust client-computed price or payment state.
- Keep refresh tokens out of browser JavaScript.
- Do not expose secrets in source, logs, Git history, or UI.
- Every data-fetching page must have loading, empty, and error states.
- Every list search/filter/sort/pagination state must have a URL representation.
- Never mark a phase complete without running its verification steps.
- Keep changes limited to the current phase.
- Preserve working functionality from previous phases.
- Do not duplicate API wrappers or status maps.
- When documentation conflicts with observed runtime behavior, stop the affected feature, document the discrepancy, and use the actual verified backend contract as the new explicit decision.
- Do not silently add features merely to make a page count higher.
- Never use mock shipment/user/payment data for a core workflow.


# 13. Open Questions / Decisions Required Before Final Implementation

1. **Stripe return URLs:** The provided payment-initiation API returns a `paymentUrl`, while the frontend assignment requires success/cancel redirects. The backend must already configure Stripe Checkout return URLs compatible with the deployed frontend origin. The frontend cannot safely invent or override the backend Checkout Session configuration. Confirm the real backend behavior during Phase 17/18 integration.

2. **Demo accounts:** The Postman collection contains sample credentials for customer/admin/courier, but the source does not explicitly guarantee that these exact accounts are seeded in the deployed backend. Verify them before recording the demo. If unavailable, use dedicated evaluator accounts supplied by the backend owner.

3. **Google OAuth frontend client configuration:** The backend exposes `/auth/google`, but the frontend Google client ID/configuration is not specified in the provided documents. Implement the button only when the required Google frontend configuration is available.

4. **Admin user search parameters:** The documentation states that `GET /admin/users` lists/searches users and supports page/limit, but it does not document exact search/filter query fields. Do not invent them. Until verified, client-side search/filter may operate on loaded results and remain synchronized in the URL.

5. **Audit-log query parameters:** The audit endpoint is documented for retrieval but exact filtering/sorting query parameters are not specified. Treat URL filters as local over loaded data unless the backend contract is confirmed.

6. **Pricing-rule response shape:** The write contract defines `zoneId`, `serviceType`, `basePrice`, `pricePerKg`, and `maxWeight`; confirm the exact GET response wrapper/fields from the running backend before finalizing a rigid parser.

7. **Zone PATCH fields:** The Postman collection proves `isActive` as an update field. Do not assume name/city are patchable unless the actual backend schema confirms them.

These are not reasons to block the entire project. They are bounded verification points that prevent the coding agent from inventing backend behavior.


# 14. Final Pre-Implementation Checklist

- [ ] The backend base URL is configured via environment variables.
- [ ] The frontend uses the real API for all core workflows.
- [ ] CUSTOMER, COURIER, ADMIN roles are explicitly modeled.
- [ ] Middleware blocks unauthorized route groups.
- [ ] UI conditionally hides unauthorized actions.
- [ ] Login has three distinct one-click demo-login controls.
- [ ] Admin cannot self-register.
- [ ] JWT refresh rotation is handled.
- [ ] Refresh/access tokens are not stored in localStorage.
- [ ] `/dashboard/shipments/new` is a multi-step form.
- [ ] Shipment price is always server-derived.
- [ ] Stripe Test Mode is the primary payment path.
- [ ] Payment success/cancel routes exist.
- [ ] Stripe webhook is never treated as a client-side confirmation action.
- [ ] Tracking uses the real tracking endpoint.
- [ ] Delivery failure requires a backend-valid failure reason.
- [ ] Maximum three delivery attempts is reflected in the UX without duplicating backend state.
- [ ] Admin can assign a real courier.
- [ ] Admin can manage zones, pricing rules, users, refunds, and audit logs.
- [ ] Customer/courier/admin shipment lists are role-scoped by backend.
- [ ] Search/filter/sort/pagination URL state is implemented.
- [ ] No undocumented sort query is sent to the backend.
- [ ] Every data-fetching page has `loading.tsx`.
- [ ] Every major route segment has `error.tsx`.
- [ ] Every list has a meaningful empty state.
- [ ] Sonner shows mutation/API errors.
- [ ] Forms use React Hook Form + Zod.
- [ ] TypeScript strict mode has no `any`.
- [ ] Reusable DataTable/StatusBadge/StatCard/Search/Pagination patterns are used.
- [ ] Responsive behavior is verified at mobile/tablet/desktop.
- [ ] Public pages contain real source-derived content and no lorem ipsum.
- [ ] No placeholder shipment/user/payment records exist.
- [ ] Public metadata exists for public pages.
- [ ] Images use `next/image` where images are actually used.
- [ ] 20+ meaningful Git commits exist.
- [ ] Production deployment is live.
- [ ] Demo credentials are dedicated/evaluator-safe.
- [ ] README, demo video, live URL, and repository links are ready.

