#!/usr/bin/env python3
"""Transform recon page.html into self-contained static HTML for the Studio clone."""
import re, os, sys, html, urllib.parse

ROOT = os.path.dirname(os.path.abspath(__file__))
REF = os.path.join(ROOT, ".reference")

# slug -> output filename mapping (also defines the URL-path -> file mapping)
PAGES = {
    "home": ("index.html", "/"),
    "about": ("about.html", "/about"),
    "work": ("work.html", "/work"),
    "process": ("process.html", "/process"),
    "blog": ("blog.html", "/blog"),
    "contact": ("contact.html", "/contact"),
    "work-family-fund": ("work/family-fund.html", "/work/family-fund"),
    "work-unseal": ("work/unseal.html", "/work/unseal"),
    "work-phobia": ("work/phobia.html", "/work/phobia"),
    "blog-future-of-web-development": ("blog/future-of-web-development.html", "/blog/future-of-web-development"),
    "blog-3-lessons": ("blog/3-lessons-we-learned-going-back-to-the-office.html", "/blog/3-lessons-we-learned-going-back-to-the-office"),
    "blog-component-naming": ("blog/a-short-guide-to-component-naming.html", "/blog/a-short-guide-to-component-naming"),
}

# URL-path (on studio.tailwindui.com) -> output file (root-relative, no leading slash)
PATH_TO_FILE = {
    "/": "index.html",
    "/about": "about.html",
    "/work": "work.html",
    "/process": "process.html",
    "/blog": "blog.html",
    "/contact": "contact.html",
    "/work/family-fund": "work/family-fund.html",
    "/work/unseal": "work/unseal.html",
    "/work/phobia": "work/phobia.html",
    "/blog/future-of-web-development": "blog/future-of-web-development.html",
    "/blog/3-lessons-we-learned-going-back-to-the-office": "blog/3-lessons-we-learned-going-back-to-the-office.html",
    "/blog/a-short-guide-to-component-naming": "blog/a-short-guide-to-component-naming.html",
}


def rel_prefix(outfile):
    """Return the relative prefix to reach project root from an output file."""
    depth = outfile.count("/")
    return "../" * depth


def media_basename_from_next_image(url):
    # url like /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flaptop.22dcb094.jpg&w=...&q=...
    m = re.search(r"url=([^&]+)", url)
    if not m:
        return None
    decoded = urllib.parse.unquote(m.group(1))
    return os.path.basename(decoded)


def transform(slug, outfile):
    src = os.path.join(REF, slug, "page.html")
    doc = open(src, encoding="utf-8").read()
    prefix = rel_prefix(outfile)

    # 1) strip all <script>...</script>
    doc = re.sub(r"<script[^>]*>.*?</script>", "", doc, flags=re.DOTALL)
    doc = re.sub(r"<script[^>]*/>", "", doc)

    # 2) replace the compiled-CSS <link> with our local CSS + fonts.css
    doc = re.sub(
        r'<link rel="stylesheet" href="/_next/static/css/[^"]+"[^>]*>',
        f'<link rel="stylesheet" href="{prefix}assets/css/studio.css">',
        doc,
    )
    # remove next preload/prefetch link tags
    doc = re.sub(r'<link[^>]*rel="(preload|prefetch|preconnect|dns-prefetch)"[^>]*>', "", doc)
    doc = re.sub(r'<link[^>]*as="(script|style|font)"[^>]*>', "", doc)
    # remove next font preloads pointing to _next
    doc = re.sub(r'<link[^>]*href="/_next/[^"]*"[^>]*>', "", doc)

    # 3) rewrite _next/image?url=... (in src and srcset) -> assets/media/<basename>
    def repl_next_image(m):
        full = m.group(0)
        # handle srcset: many comma-separated entries
        def one(u):
            bn = media_basename_from_next_image(u)
            return f"{prefix}assets/media/{bn}" if bn else u
        # src="..."
        return full
    # src attribute
    def fix_src(m):
        attr, url = m.group(1), m.group(2)
        url = html.unescape(url)
        if "_next/image" in url:
            bn = media_basename_from_next_image(url)
            if bn:
                return f'{attr}="{prefix}assets/media/{bn}"'
        if "_next/static/media" in url:
            bn = os.path.basename(url)
            return f'{attr}="{prefix}assets/media/{bn}"'
        return m.group(0)
    doc = re.sub(r'(src)="([^"]*_next[^"]*)"', fix_src, doc)

    # srcset: rewrite each candidate
    def fix_srcset(m):
        val = html.unescape(m.group(1))
        out = []
        for part in val.split(","):
            part = part.strip()
            if not part:
                continue
            bits = part.split()
            u = bits[0]
            if "_next/image" in u:
                bn = media_basename_from_next_image(u)
                if bn:
                    bits[0] = f"{prefix}assets/media/{bn}"
            elif "_next/static/media" in u:
                bits[0] = f"{prefix}assets/media/{os.path.basename(u)}"
            out.append(" ".join(bits))
        return 'srcset="' + ", ".join(out) + '"'
    doc = re.sub(r'srcset="([^"]*)"', fix_srcset, doc)

    # 4) rewrite direct _next/static/media occurrences anywhere left (e.g. inline svg <use>, style url())
    doc = doc.replace("/_next/static/media/", f"{prefix}assets/media/")

    # 4b) vendored favicon (the Next.js streamed head leaks a /favicon.ico link)
    doc = re.sub(r'href="/favicon\.ico[^"]*"', f'href="{prefix}assets/favicon.ico"', doc)

    # 5) rewrite internal navigation hrefs (path -> local file)
    def fix_href(m):
        url = html.unescape(m.group(1))
        # absolute studio links
        url2 = url
        if url2.startswith("https://studio.tailwindui.com"):
            url2 = url2[len("https://studio.tailwindui.com"):] or "/"
        if url2 in PATH_TO_FILE:
            return f'href="{prefix}{PATH_TO_FILE[url2]}"'
        return m.group(0)
    doc = re.sub(r'href="([^"]+)"', fix_href, doc)

    # 5b) drop lazy-loading so all images render in a static full-page capture
    #     (the original lazy-loads on scroll; eager loading is visually identical
    #     once scrolled and guarantees images appear in screenshots/offline use).
    doc = doc.replace(' loading="lazy"', "")

    # 6) drop any leftover data-next / nextjs attributes noise is harmless; ensure mobile-nav + fadein JS injected before </body>
    inject = f'<script src="{prefix}assets/js/studio.js" defer></script>'
    doc = doc.replace("</body>", inject + "</body>")

    out_path = os.path.join(ROOT, outfile)
    os.makedirs(os.path.dirname(out_path) or ROOT, exist_ok=True)
    open(out_path, "w", encoding="utf-8").write(doc)
    return out_path


if __name__ == "__main__":
    only = sys.argv[1] if len(sys.argv) > 1 else None
    for slug, (outfile, _) in PAGES.items():
        if only and slug != only:
            continue
        p = transform(slug, outfile)
        print("wrote", p)
