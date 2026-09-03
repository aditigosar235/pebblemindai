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
| Planned federated profiles | pebblemindpro+bluesky@gmail.com / pebblemindpro+mastodon@gmail.com | `pebblemind/bluesky` and `pebblemind/mastodon` after creation | BLUESKY_CODE_REQUIRED / MASTODON_EMAIL_REQUIRED | Bluesky signup has an invalid verification-code checkpoint; Mastodon signup accepted and is waiting for email confirmation; no new secrets stored |
| Planned developer profiles | pebblemindpro+devto@gmail.com / pebblemindpro+hashnode@gmail.com | `pebblemind/devto` and `pebblemind/hashnode` after creation | NOT CREATED | Publish useful article adaptation before promotional CTA |
| DEV Community | pebblemindpro+devto@gmail.com / @pebblemindai | `pebblemind/devto` | STORED | Account authenticated; profile completed; public article https://dev.to/pebblemindai/private-ai-on-iphone-what-local-first-actually-means-4hmb |
| Mastodon | pebblemindpro+mastodon@gmail.com / @PebbleMindAI | `pebblemind/mastodon` | STORED | Account confirmed; public status https://mastodon.social/@PebbleMindAI/117209465466588093 |
| X | pebblemindpro+x@gmail.com / @PebbleMindAI | `pebblemind/x` after phone verification | PHONE_REQUIRED | Email signup reached phone/SMS verification; no account claimed |
| Bluesky | pebblemindpro+bluesky@gmail.com / PebbleMindAI | `pebblemind/bluesky` after fresh code | EMAIL_CODE_REQUIRED | Existing signup tab reports invalid verification code; no account claimed |
| Quora | pebblemindpro+quora@gmail.com / Pebble Mind | `pebblemind/quora` after confirmation | SECURITY_CHECKPOINT | Email code accepted; final password step stopped by Quora Turnstile; no credential stored |
| Pinterest | pebblemindpro+pinterest@gmail.com / pebblemindpropinterest | `pebblemind/pinterest` | STORED | Business account active; public Pin https://www.pinterest.com/pin/1125829606880772922/ |
| Instagram | pebblemindpro+instagram@gmail.com / @pebblemindai | `pebblemind/instagram` | STORED | Account confirmed; public post https://www.instagram.com/pebblemindai/p/Dc17NNyj7-K/ |
| TikTok | pebblemindpro+tiktok@gmail.com / PebbleMindAI | `pebblemind/tiktok` | PENDING_EMAIL | Signup fields accepted but TikTok did not advance after Send code; no post published |

## Secure store

- Password manager: `pass`
- GPG key ID: `E131880AF95B9C61`
- Entry: `pebblemind/google`
- Password store path: `/Users/aditi/.password-store`

Do not run `pass show` in logs, screenshots, automation output, or a repository. Account creation and email verification remain pending for each platform in `../MARKETING_ACCOUNT_INVENTORY.md`.
