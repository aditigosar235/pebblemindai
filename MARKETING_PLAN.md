# Pebble Mind post-launch content execution plan

## Brief for the executing subagent

The launch is complete. Promote the published iOS app through useful, honest content. Do not invent features, benchmarks, users, reviews, partnerships, press coverage, or testimonials. If a fact is not in the app, App Store listing, or source code, mark it `[VERIFY]` and do not publish it.

The app is iOS-only for this campaign. Do not describe Pebble Mind as an Android, Mac, visionOS, or multi-platform app.

The source material is in this repository and the related mobile repositories:

- Website: this directory.
- iOS source: `../PrivateAI`.
- Android source: `../PebbleMindAndroid` — do not use it for this campaign.

Primary CTA for every public post: the live iOS App Store URL, supplied in `growth/product-facts.md`. Secondary CTA: a useful article, benchmark, or GitHub source link. Do not use an early-access or email-list CTA.

## Approved product message

Use this as the base description and adapt it to each audience:

> Pebble Mind is a private, local-first AI workspace for iPhone and iPad. It lets users chat with supported Apple and GGUF models on-device, browse model details, and keep conversations local. No account or API key is required. Web search is optional and opt-in. Pebble Mind is free to start, with a one-time Pro unlock for additional local-model controls.

Before each batch, the subagent must update the bracketed facts from the live app and store listing:

- `[APP_STORE_URL]`
- `[CURRENT_VERSION]`
- `[SUPPORTED_IOS_VERSION]`
- `[SUPPORTED_DEVICES]`
- `[CURRENT_PRO_PRICE]`
- `[VERIFIED_MODEL_NAMES]`
- `[VERIFIED_BENCHMARK]`
- `[WEBSITE_URL]`

Do not state that all inference is offline if the user chooses web search. Say: “local inference by default; web search is a separate opt-in.” Do not publish “no data leaves your device” unless the exact context and exception are stated.

## Where to publish and how often

Use the same underlying idea across channels, but rewrite the opening and format for each destination.

| Destination | Cadence | Content to publish | Link policy |
|---|---:|---|---|
| Website blog in this repo | 1 substantial post/week | Technical explanation, benchmark, privacy explainer, or tutorial | Link to App Store and two related articles |
| Dev.to | 1/week, 2–3 days after the blog | Developer-focused adaptation of the blog | Canonical link back to website; App Store CTA |
| Hashnode or Medium | 1/week, alternating | Longer technical adaptation, not duplicate copy | Canonical link and App Store CTA |
| Reddit | 3 helpful comments/week; 1 self-post every 2 weeks | Answer questions in local LLM, iOS, Apple, and privacy communities | Link only when directly relevant; disclose affiliation |
| Hacker News | 1 Show HN post for a genuinely new technical finding; comments as needed | Engineering result, benchmark, or open-source tool | Lead with the technical result; app link at end |
| Product Hunt | 1 launch/update post now; comment replies until activity stops | Product update, new model support, or meaningful release | Ask for feedback, never ask for votes |
| X | 5 posts/week; 1 thread/week | Short demos, charts, build notes, privacy explanations | One tracked App Store link per post |
| Bluesky/Mastodon | 3 posts/week | Adapted technical notes and discussions | Avoid link-only posts; join conversations |
| LinkedIn | 2 posts/week | Privacy-at-work, developer workflow, founder/build story | One clear CTA; no hype claims |
| YouTube Shorts/TikTok/Reels | 3 videos/week | Screen recordings with captions and one idea each | App Store link in profile/pinned comment |
| Direct outreach | 5 individualized notes/week | Offer a test, benchmark collaboration, or honest review | One follow-up maximum; no mass DMs |

If the subagent cannot access a platform account, it creates a ready-to-paste draft in `growth/outbox/YYYY-MM-DD/` and records the destination and URL. It must never claim that a post was published.

## Repository output structure

Create and maintain these files:

```text
growth/
  product-facts.md
  editorial-calendar.md
  keyword-backlog.md
  content-log.csv
  outbox/YYYY-MM-DD/
    reddit.md
    hn.md
    x.md
    linkedin.md
    short-video.md
  blog/
    YYYY-MM-DD-slug.md
  outreach/
    prospects.csv
    YYYY-MM-DD-notes.md
```

Each draft must include: destination, audience, objective, exact copy/script, CTA URL, disclosure, source/fact links, suggested visual, and a “claims to verify” section. `content-log.csv` must record `date, channel, URL, content_id, CTA, status, impressions, clicks, installs, notes`.

## Website blog queue

Write these as complete Markdown posts under `growth/blog/`, then link them from the website’s blog/index page if one exists. If the site has no blog index, add a simple one rather than leaving the files undiscoverable.

### Post 1: What actually runs locally on an iPhone?

Slug: `what-runs-locally-on-iphone`

Structure: explain model size, quantization, memory, context length, and generation speed in plain language; test only `[VERIFIED_MODEL_NAMES]` on `[SUPPORTED_DEVICES]`; show the test prompt and conditions; publish a results table; explain that results vary by device; finish with “Try the same models in Pebble Mind.”

Opening draft:

> Local AI on an iPhone is less about finding the biggest model and more about finding the model that fits the device well enough to use. This guide records what we tested, what memory/readiness tells you, and where the tradeoffs appear.

### Post 2: Apple Foundation Models or a GGUF model?

Slug: `apple-foundation-models-vs-gguf-iphone`

Structure: explain the two choices, give concrete use cases, list limits, avoid winner language, and show how the user selects a model. End with the App Store CTA.

Opening draft:

> “Local AI” is not one model or one experience. On iPhone, the useful choice depends on the task, device, model availability, and how much control you want. Here is how Pebble Mind presents that choice.

### Post 3: A privacy threat model for local AI on iOS

Slug: `privacy-threat-model-local-ai-ios`

Structure: define local inference, local conversation history, attachments, model metadata, logs, reset/export, and optional web search; clearly identify what is and is not sent over the network; link to the app’s privacy documentation and App Store privacy label.

Opening draft:

> Privacy is easier to evaluate when it is described as a data flow instead of a slogan. This is the boundary we designed for Pebble Mind: what happens on the device, what requires an explicit search action, and what users can inspect or reset.

### Post 4: Choosing a GGUF quantization for your device

Slug: `choose-gguf-quantization-iphone`

Structure: define quantization, compare size/quality/speed, show the supported model workflow, include a decision table, and link only to models whose licenses and compatibility are verified.

### Post 5: The local AI starter prompt pack

Slug: `local-ai-prompt-pack-iphone`

Structure: provide 20 useful prompts for summarization, rewriting, extraction, coding, and vision where supported; explain what makes a prompt testable; invite readers to share results without sharing private chats.

### Post 6: Monthly compatibility report

Slug pattern: `iphone-local-model-compatibility-[YYYY-MM]`

Structure: changed models, devices tested, version, readiness, measured speed, known failures, and next tests. Never backfill missing measurements.

## Ready-to-adapt social posts

The subagent should use one post from each group per week, substituting only verified facts.

### Developer / local-LLM post

> A useful local-LLM question on iPhone is not “what is the biggest model?” It is “what fits this device and remains usable?” Pebble Mind shows model readiness and device-fit details before you commit to a workflow. I documented the tradeoffs here: [BLOG_URL]. iOS app: [APP_STORE_URL]

### Privacy post

> “Private AI” should describe a data flow. In Pebble Mind, local chat and model work happen on-device; web search is a separate, explicit opt-in. Here is the boundary and what users can reset: [PRIVACY_URL]. [APP_STORE_URL]

### Apple power-user post

> If you want to try local AI on iPhone without creating another account or adding an API key, Pebble Mind is free to start. Choose a supported model, see whether it fits your device, and keep the conversation local. [APP_STORE_URL]

### Build-note post

> Today’s local-AI lesson: [ONE VERIFIED OBSERVATION]. We tested [MODEL] on [DEVICE] with [CONDITION]. Result: [VERIFIED_RESULT]. Method and limitations: [BLOG_URL].

### Feature post

> New in Pebble Mind: [FEATURE]. It helps with [USER PROBLEM]. Here is a 20-second demonstration and the exact device/model context: [VIDEO_URL]. iOS download: [APP_STORE_URL]

### Question post

> For people running local models on Apple hardware: which matters most to you—model choice, memory visibility, context length, generation controls, or exportability? I’m collecting real workflows for the next compatibility report: [BLOG_URL]

## Platform-specific Reddit drafts

The subagent must select the subreddit only after reading its current rules and recent posts. It must customize the first paragraph to the actual discussion and include “I’m the developer” where self-promotion is relevant.

### Helpful reply

> The practical constraint is usually memory and sustained usability, not just whether a model technically loads. Check the model’s size/quantization against the device, then test a fixed prompt and record speed and output quality. I’m the developer of Pebble Mind, which surfaces model readiness before download; this benchmark explains the method: [BLOG_URL].

### Self-post for a local-LLM community

> I built Pebble Mind to make local model testing on iPhone less opaque. It supports [VERIFIED_MODEL_NAMES], shows readiness/memory details, and lets users chat without an account or API key. Web search is opt-in. I measured [VERIFIED_BENCHMARK] on [DEVICE]. Full method, limitations, and results: [BLOG_URL]. I’m looking for corrections from people running other models on iOS. [APP_STORE_URL]

### Self-post for a privacy community

> I’m the developer of an iOS app built around local inference. Rather than make a broad privacy claim, I documented the data boundary: local chat/history/model work, plus the separate opt-in web-search path. The privacy explanation is here: [PRIVACY_URL]. I welcome questions about the threat model and limitations. [APP_STORE_URL]

## Hacker News, Product Hunt, and press copy

### Hacker News title and post

Title: `Show HN: Pebble Mind – a local-first AI workspace for iPhone`

> I built an iOS app for running supported Apple and GGUF models locally. The technical problem I focused on is [VERIFIED_PROBLEM]. We tested [VERIFIED_BENCHMARK] on [DEVICE] and documented the method, limitations, and model tradeoffs here: [BLOG_URL]. No account or API key is required; optional web search is separate and opt-in. App: [APP_STORE_URL]. I’m especially interested in corrections from people working with local inference on Apple hardware.

### Product Hunt maker comment

> Hi, I’m [NAME], the developer of Pebble Mind. I built it for people who want to explore local AI on iPhone without starting with a hosted API account. The app shows model/device readiness, supports [VERIFIED_MODEL_NAMES], and keeps the local workflow simple. The most useful feedback so far has been about [VERIFIED_LEARNING]. Try it here: [APP_STORE_URL]. Ask me anything about the tradeoffs or limitations.

### Individual editorial pitch

Subject: `A measured look at local AI models on iPhone`

> Hi [NAME] — I’m the developer of Pebble Mind, an iOS app for local Apple and GGUF models. I published a reproducible comparison of [VERIFIED_BENCHMARK] on [DEVICE], including failures and limitations. If local AI on Apple hardware is relevant to your readers, I can provide the app, test conditions, screenshots, and direct answers without claiming Apple endorsement. Details: [BLOG_URL]. App: [APP_STORE_URL].

## Short-video scripts

All videos: vertical, captions on-screen, show the actual app, name the device/model, avoid “offline” unless verified, and finish with `[APP_STORE_URL]` in the profile/pinned comment.

1. **Model fit, 15 sec:** “Before downloading a local model, check whether it fits. In Pebble Mind: open Models → select [MODEL] → read readiness/memory → start a chat. Results depend on device. Link in profile.”
2. **Local chat, 20 sec:** “One prompt, one local model, one iPhone. Here is [MODEL] answering [SAFE DEMO PROMPT]. The point is not a benchmark claim; it is seeing the workflow. Pebble Mind for iOS.”
3. **Privacy boundary, 25 sec:** “Local inference and web search are different actions. This chat stays in the local workflow; this toggle is the optional search path. Read the full data boundary at [PRIVACY_URL].”
4. **Quantization, 30 sec:** “Same model family, different quantization. Smaller may fit more comfortably; larger may preserve more quality. Here is the measured result on [DEVICE]. Full table: [BLOG_URL].”
5. **Developer controls, 30 sec:** “For local-LLM developers, Pebble Mind exposes [VERIFIED_CONTROLS]. Here is where to inspect them and what changes when you adjust [CONTROL].”

## Outreach list and cadence

Each cycle, find five real prospects: model authors, iOS/local-AI developers, privacy educators, accessibility creators, and newsletters that have recently discussed the topic. Record name, URL, relevant post, audience, proposed angle, and contact method in `growth/outreach/prospects.csv`.

Send this individualized note:

> Hi [NAME] — I saw your [POST/PROJECT] about [SPECIFIC TOPIC]. I’m building Pebble Mind, an iOS local-AI workspace, and I’m testing [SPECIFIC MODEL/DEVICE/QUESTION]. Would you be interested in reviewing the method or contributing a result for the compatibility guide? No sponsored endorsement or scripted review—just attribution, the app link, and the limitations. Details: [BLOG_URL].

Send no more than five per cycle, follow up once after seven days, and stop. Never scrape addresses, add people to a list, or send bulk DMs.

## Repeatable execution instructions for the subagent

For every publishing cycle:

1. Read `growth/product-facts.md`, the latest iOS source changes, and the last 10 entries in `growth/content-log.csv`.
2. Choose one topic from the blog queue and one audience: local-LLM developer, privacy-conscious user, or Apple power user.
3. Create the complete blog post in `growth/blog/` with verified facts and source links.
4. Create the corresponding Reddit, X, LinkedIn, and short-video adaptations in `growth/outbox/YYYY-MM-DD/`.
5. Add platform-specific disclosure and the correct UTM link to every draft.
6. Check subreddit rules, HN relevance, Product Hunt rules, model licenses, and privacy wording.
7. Update `growth/editorial-calendar.md` and `growth/content-log.csv`.
8. Stop and mark `[VERIFY]` rather than guessing when source code, App Store metadata, or measurements disagree.

The subagent may create or edit website blog content in this repository. It may draft posts and maintain the outbox. It may publish only if the environment explicitly provides authenticated access to that platform and the human owner has approved the draft. Otherwise, report `DRAFTED — HUMAN PUBLISH REQUIRED`.

## Measurement

Track each post by its UTM link. Record impressions, clicks, App Store views, installs, first model ready, first local message, D1/D7 retention, country, and qualitative feedback. The key metric is activated users, not impressions or followers. Keep posts that produce activated users, useful replies, or credible distribution partners; rewrite or stop posts that produce only vanity reach or generate privacy/accuracy complaints.

## Do not do

Do not fabricate traction, reviews, benchmarks, press, or user stories. Do not buy ads, followers, votes, reviews, email lists, or influencer placements. Do not use fake accounts, mass-DMs, automated replies, vote rings, or repetitive cross-posting. Do not hide affiliation or omit the optional web-search exception.
