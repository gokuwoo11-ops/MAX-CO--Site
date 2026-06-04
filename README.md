# MAX & Co Final Upgraded Project

Final upgraded version with:

- MAX & Co branding
- Premium dark design
- Fixed order transition animation
- Student login/signup
- Student account dashboard
- Private order brief form
- Private website chat
- Hidden studio inbox
- Browser notification setup for owner
- Supabase database setup SQL

## Public pages

- `/` — Landing page
- `/details` — Details page
- `/start` — Start order page
- `/login` — Student login/signup
- `/account` — Student dashboard
- `/brief` — Project brief form
- `/order/[code]` — Private chat room

## Hidden studio page

- `/studio-desk-7q4`

Keep this route private.

## Local run

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Supabase setup

1. Create Supabase project.
2. Run `DATABASE_SETUP.sql` in Supabase SQL Editor.
3. Go to Authentication → Providers → Email.
4. For testing, you may disable email confirmation.
5. Add Supabase Auth URL config:
   - Site URL: your Vercel URL
   - Redirect URLs:
     - `http://localhost:3000/**`
     - `https://your-vercel-url.vercel.app/**`

## Env setup

Create `.env.local` from `.env.example`.

Required:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OWNER_PIN=
```

For browser notifications:

```env
NEXT_PUBLIC_VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
VAPID_SUBJECT=mailto:yourmail@example.com
```

Generate VAPID keys:

```bash
npx web-push generate-vapid-keys
```

## Deploy

Push to GitHub, import into Vercel, add the same environment variables in Vercel, then deploy.
