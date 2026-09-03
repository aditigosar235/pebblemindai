# DEV / Hashnode adaptation — 2026-09-10

## Title

Why we built a private AI app for iPhone

## Copy

Pebble Mind is an iOS workspace for trying supported Apple and GGUF models locally without starting with an account or API key. The product decision was to make the first step understandable to a non-developer: choose a model, inspect its size and readiness information, let it prepare on-device, and begin with a small prompt.

The local workflow and optional web search are deliberately separate. Supported local-model conversations run on the device. When web search is enabled, the query goes to the configured search service so the app can retrieve current information and show sources.

The first version includes local chat, model browsing and readiness information, model download and storage management, and additional Pro controls. It does not promise universal model compatibility or a particular speed result. Large models can use significant storage, memory, battery, and heat, and generated answers can be inaccurate.

The goal is a clear iPhone/iPad workflow for people who want more control over where everyday AI conversations happen. Full explanation: https://aditigosar235.github.io/pebblemindai/blog-why-we-built-private-ai.html

App: https://apps.apple.com/us/app/pebble-mind/id6799536766

Disclosure: Official Pebble Mind brand account; no sponsored endorsement.
