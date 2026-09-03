# Organic attribution runbook

## Before publishing

1. In App Store Connect → Analytics → Acquisition → Campaigns, create a campaign token for the channel/content pair.
2. Copy Apple’s generated campaign link into `growth/campaign-link-map.csv`; do not invent `pt` or `ct` values.
3. Replace the matching CTA in the draft with that exact generated link.
4. Record the campaign link and content ID in `growth/content-log.csv`.

## After publishing

1. Record the real post/profile URL, publication timestamp, country/language, and platform-reported impressions/reach.
2. In App Analytics, record product-page views and first-time downloads attributed to the campaign.
3. Record activated users only from the app’s agreed definition: install → ready model → first local message.
4. Record D7 retention when the cohort is old enough; leave it blank rather than estimating.
5. Update the campaign row and add a note to the content log. Never count followers, views without a platform metric, or duplicated syndication as unique users.

## Expansion rule

At the end of each reporting cycle, rank campaigns by verified reach and activated-user rate. Produce a new, meaningfully different adaptation of the top two ideas. Pause campaigns that create impressions but no qualified visits after two cycles. Keep country and language separate so a worldwide total is auditable.

## Current state

All campaign links are `PENDING_APP_STORE_CONNECT` because the generated Apple campaign tokens and authenticated channel URLs are not available in this workspace. The App Store URL remains the fallback CTA until campaign links are created.
