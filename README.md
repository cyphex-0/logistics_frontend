# Shiply Frontend

## Requirements
- Node.js: v24.21.0 or higher
- Next.js: v16.3.6
- Package Manager: npm

## Installation & Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   Copy `.env.example` to `.env.local` and update the values.
   ```bash
   cp .env.example .env.local
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Tech Stack
- Next.js App Router (TypeScript)
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Zustand
- React Hook Form + Zod
- Recharts
- Lucide React
- Sonner

## Testing

### End-to-End (E2E) Testing
The project uses Playwright for E2E testing to ensure all critical role journeys are covered and functional.

**Running Tests:**
```bash
npx playwright test
```

**Viewing Reports:**
```bash
npx playwright show-report
```

**Test Environment Assumptions:**
- E2E tests are configured to point to `http://localhost:3000` (by default in Playwright config) and assume the frontend is running locally.
- Tests mock the backend APIs to ensure stability and isolate frontend functionality from backend state changes. Mocks include successful authentication, role-based boundaries, and entity data operations.
- The tests assume that `auth-token` and `user-role` cookies can be manipulated for simulating different authenticated states.
- If you need to reset the test state, there is no physical database state to clear for the frontend tests due to the mocks. Simply rerun the test suite. If connecting to a live staging backend instead of mocked endpoints in the future, a backend test reset endpoint would be required.

## Production Deployment

This project is built using Next.js App Router and can be easily deployed to Vercel, Netlify, or Cloudflare Pages without any special configuration.

### Deployment Steps
1. Push the code to a Git repository (e.g., GitHub, GitLab).
2. Connect your repository to your chosen hosting provider (e.g., Vercel).
3. The hosting provider will automatically detect Next.js and use the `npm run build` command and standard output directory.
4. **Important**: Add all required Environment Variables in the project settings on the hosting provider before the first build.

### Environment Variables

For production, configure the following environment variables on your deployment platform:

| Variable Name | Description | Required for Production |
|---------------|-------------|-------------------------|
| `API_BASE_URL` | The base URL of the deployed backend. e.g. `https://logistics-backend-jyz7.onrender.com/api/v1` | Yes |
| `NEXT_PUBLIC_APP_URL` | The public base URL of the deployed frontend. e.g. `https://your-frontend-domain.com` | Yes |
| `SESSION_SECRET` | A secure, random 32+ character string used for signing JWTs and session cookies. | Yes |
| `NEXT_PUBLIC_DEMO_CUSTOMER_EMAIL` | Optional email for demo customer login. | Optional |
| `NEXT_PUBLIC_DEMO_CUSTOMER_PASSWORD` | Optional password for demo customer login. | Optional |
| `NEXT_PUBLIC_DEMO_COURIER_EMAIL` | Optional email for demo courier login. | Optional |
| `NEXT_PUBLIC_DEMO_COURIER_PASSWORD` | Optional password for demo courier login. | Optional |
| `NEXT_PUBLIC_DEMO_ADMIN_EMAIL` | Optional email for demo admin login. | Optional |
| `NEXT_PUBLIC_DEMO_ADMIN_PASSWORD` | Optional password for demo admin login. | Optional |
