#!/usr/bin/env bash
set -euo pipefail

root_dir="$(cd "$(dirname "$0")/.." && pwd)"
app_store_url='https://apps.apple.com/us/app/pebble-mind/id6799536766'
content_log="$root_dir/growth/content-log.csv"

fail=0

for page in index.html blog.html blog-getting-started.html blog-everyday-uses.html blog-privacy-faq.html; do
  if [ ! -f "$root_dir/$page" ]; then
    echo "MISSING page: $page"
    fail=1
  elif ! rg -q "$app_store_url" "$root_dir/$page"; then
    echo "MISSING App Store CTA: $page"
    fail=1
  fi
done

if rg -n '\[(APP_STORE_URL|WEBSITE_URL|BLOG_URL|PRIVACY_URL|VERIFIED_[A-Z_]+|DEVICE|MODEL)\]' "$root_dir/growth" --glob '*.md' --glob '*.csv' >/tmp/pebble-mind-marketing-placeholders.txt; then
  echo 'UNRESOLVED placeholders found:'
  sed -n '1,80p' /tmp/pebble-mind-marketing-placeholders.txt
  fail=1
fi

if rg -n 'nNeWR3Dd3|BEGIN PGP PRIVATE|password[[:space:]]*[:=]|recovery.?code[[:space:]]*[:=]|session.?cookie[[:space:]]*[:=]|api.?token[[:space:]]*[:=]' "$root_dir" ../MARKETING_ACCOUNT_INVENTORY.md ../MARKETING_EXECUTION_PLAN.md --hidden --glob '!*.gpg' --glob '!validate-content.sh' >/tmp/pebble-mind-marketing-secrets.txt; then
  echo 'POSSIBLE secret material found:'
  sed -n '1,80p' /tmp/pebble-mind-marketing-secrets.txt
  fail=1
fi

if [ ! -f "$content_log" ]; then
  echo "MISSING content log: $content_log"
  fail=1
fi

if [ "$fail" -ne 0 ]; then
  exit 1
fi

echo 'Marketing content validation passed.'
