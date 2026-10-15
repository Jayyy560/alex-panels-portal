# Alex Panels — Gift Allocation & Distribution Portal

## Current workflow
- `/admin`: single configured administrator email/password. Manage users, gift catalogue, 3–5 gift categories, customer categories, campaigns, allocations, dispatch and reports.
- `/`: individual user login. Users see only their own allocations and customer distributions.
- Admin generates a unique username and random password for each dealer, distributor or sales team member. Passwords are shown only when generated; resets revoke existing sessions. Disabling a user blocks access immediately.
- Admin allocates gift quantities, then sets dispatch status, vehicle details and tentative delivery time (IST). “Delivered” means delivered to the user.
- Users record customer name, contact, category, quantity and optional JPG/PNG/WebP photograph (5 MB maximum). Submissions require delivered allocations and cannot exceed the unreported quantity.
- Reports include allocated, distributed, pending submission quantities and dispatch status, with Excel XLSX and CSV exports. Import these files in Google Sheets using File → Import; direct Google Sheets sync is not configured.
- Previous delivery records remain at `/admin/legacy`. They are not counted as new allocation-based distributions. The previous anonymous submission endpoint is retired.

## Runtime
Node.js 22.13+ (24+ to run SQLite integration tests), pnpm 11.25.0, Cloudflare Workers/D1/R2 through Sites.

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm run dev
corepack pnpm exec tsc --noEmit
node scripts/test-admin-auth.cjs
node scripts/test-tracking.cjs
corepack pnpm run build
```

Apply all tracked SQL migrations in `drizzle/` to your local D1 before development (see README.md). Never rewrite applied migrations. Hosted and local data are separate. Sites applies pending migrations when publishing.

Bindings: `DB` for D1 and `BUCKET` for R2. Private photographs are served through an authorization-checked API.

Admin runtime secrets: `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `ADMIN_PASSWORD_SALT`. Hash = PBKDF2-HMAC-SHA256, 100,000 iterations, random 16-byte salt and 32-byte output; salt/hash stored as hex. No real password is included in source. User password hashes and sessions are stored in D1.

## Main files
- `app/workspace.tsx`: new admin/user interfaces
- `app/user-login.tsx`, `app/admin/login.tsx`: login screens
- `app/api/tracking/route.ts`: user management, allocations, dispatch, configuration reads
- `app/api/distribute/route.ts`: atomic quantity-limited distribution and photo uploads
- `app/api/photo/route.ts`: private photo access
- `app/api/user/`: individual user login/logout
- `lib/admin-auth.ts`, `lib/user-auth.ts`: password and session validation
- `lib/export.ts`: Excel XLSX and CSV exports
- `app/api/portal/route.ts`: legacy history and gift catalogue configuration
- `db/schema.ts`, `drizzle/`: schema and migrations
- `public/alex-panels-logo.png`: supplied original logo

For independent hosting, retain the Worker/D1/R2 runtime or adapt these server APIs and storage bindings. Keep HTTPS enabled for secure cookies. No ChatGPT login is required. The source does not contain live database records, credentials or uploaded photographs.
