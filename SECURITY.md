# Security Checklist

- Authentication via Clerk middleware.
- API validation via Zod.
- Stripe webhook signature verification.
- No secrets in client bundles.
- Add production rate limiting at edge/proxy layer.
- Add moderation and medical disclaimers for AI coaching flows.
- Store progress photos in signed object storage, not local disk.
