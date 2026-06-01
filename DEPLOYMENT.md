# Deployment

1. Provision PostgreSQL.
2. Configure `.env` variables on hosting provider.
3. Run `npm run db:push` or migrations.
4. Configure Clerk domain and redirect URLs.
5. Configure Stripe prices and webhook endpoint `/api/stripe/webhook`.
6. Deploy to Vercel or a Node-compatible host.
