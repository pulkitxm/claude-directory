#!/bin/bash
set -e
cd "$(dirname "$0")"
BASE=https://nextspace-nextjs.vercel.app
OUT=../../templates/premium/themefisher/nextspace-nextjs/.reference

SLUGS=(home about services projects project-1 project-2 project-3 project-4 project-5 project-6 project-7 blog blog-page-2 blog-post-1 blog-post-2 blog-post-3 blog-post-4 blog-post-5 blog-post-6 reviews faqs gallery contact career elements terms privacy p404)
URLS=("$BASE/" "$BASE/about" "$BASE/services" "$BASE/projects" "$BASE/projects/project-1" "$BASE/projects/project-2" "$BASE/projects/project-3" "$BASE/projects/project-4" "$BASE/projects/project-5" "$BASE/projects/project-6" "$BASE/projects/project-7" "$BASE/blog" "$BASE/blog/page/2" "$BASE/blog/post-1" "$BASE/blog/post-2" "$BASE/blog/post-3" "$BASE/blog/post-4" "$BASE/blog/post-5" "$BASE/blog/post-6" "$BASE/reviews" "$BASE/faqs" "$BASE/gallery" "$BASE/contact" "$BASE/career" "$BASE/elements" "$BASE/terms-and-conditions" "$BASE/privacy-policy" "$BASE/404")

n=${#SLUGS[@]}
for ((i=0; i<n; i++)); do
  slug="${SLUGS[$i]}"
  url="${URLS[$i]}"
  echo "=== $slug ==="
  node scrape-ref.mjs "$url" "$OUT/$slug" > "$OUT/$slug.log" 2>&1 &
  if [ $(( (i+1) % 6 )) -eq 0 ]; then wait; fi
done
wait
echo DONE
for slug in "${SLUGS[@]}"; do
  if grep -q "^nodes:" "$OUT/$slug.log"; then echo "$slug OK"; else echo "$slug FAIL"; fi
done
