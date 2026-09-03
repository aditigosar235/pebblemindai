# Pebble Mind credential index

This file contains references only. It must never contain passwords, GPG passphrases, recovery codes, cookies, tokens, or verification links.

| Account | Username/email | Secure credential reference | Status | Notes |
|---|---|---|---|---|
| Base marketing email | pebblemindpro@gmail.com | `pass show pebblemind/google` | STORED | Password is encrypted in the local password store; rotate immediately if exposed |
| Planned YouTube account | pebblemindpro+youtube@gmail.com | `pebblemind/youtube` after creation | NOT CREATED | Same password only if owner explicitly accepts reuse; never record it here |
| Planned X account | pebblemindpro+x@gmail.com | `pebblemind/x` after creation | NOT CREATED | Handle and profile URL must be recorded after verification |
| Reddit | pebblemindpro+reddit@gmail.com / u/PebbleMind | `pebblemind/reddit` | STORED | Email verified; profile https://www.reddit.com/user/PebbleMind/; 2FA still required |
| Hacker News | PebbleMindXYZ | `pebblemind/hackernews` | STORED | Account creation and authenticated submit page verified; public profile URL https://news.ycombinator.com/user?id=PebbleMindXYZ; no post published yet |
| Planned LinkedIn Page | pebblemindpro+linkedin@gmail.com | `pebblemind/linkedin` after creation | NOT CREATED | Private admin must be a real authorized person |
| Planned Meta profiles | pebblemindpro+instagram@gmail.com / pebblemindpro+tiktok@gmail.com | `pebblemind/instagram` and `pebblemind/tiktok` after creation | NOT CREATED | Record each profile separately after verification |
| Planned federated profiles | pebblemindpro+bluesky@gmail.com / pebblemindpro+mastodon@gmail.com | `pebblemind/bluesky` and `pebblemind/mastodon` after creation | NOT CREATED | Mastodon instance must be selected after rules review |
| Planned developer profiles | pebblemindpro+devto@gmail.com / pebblemindpro+hashnode@gmail.com | `pebblemind/devto` and `pebblemind/hashnode` after creation | NOT CREATED | Publish useful article adaptation before promotional CTA |
| DEV Community | pebblemindpro+devto@gmail.com / @pebblemindai | `pebblemind/devto` | STORED | Account authenticated; profile completed; public article https://dev.to/pebblemindai/private-ai-on-iphone-what-local-first-actually-means-4hmb |

## Secure store

- Password manager: `pass`
- GPG key ID: `E131880AF95B9C61`
- Entry: `pebblemind/google`
- Password store path: `/Users/aditi/.password-store`

Do not run `pass show` in logs, screenshots, automation output, or a repository. Account creation and email verification remain pending for each platform in `../MARKETING_ACCOUNT_INVENTORY.md`.
