import re, os, glob
from urllib.parse import unquote

PAGES = {
  "home":"index","shop-with-sidebar":"shop-with-sidebar","shop-without-sidebar":"shop-without-sidebar",
  "cart":"cart","checkout":"checkout","wishlist":"wishlist","contact":"contact","signin":"signin",
  "signup":"signup","error":"error","mail-success":"mail-success","blog-grid":"blog-grid",
  "blog-grid-with-sidebar":"blog-grid-with-sidebar","blog-details":"blog-details",
  "blog-details-with-sidebar":"blog-details-with-sidebar","product-details":"product-details",
  "category":"category","popular":"popular",
}

def rewrite_imgs(html):
    # _next/image?url=ENCODED&w=..&q=.. -> local
    def repl_next(m):
        u = unquote(m.group(1))
        u = u.split('?')[0]
        base = os.path.basename(u)
        if 'cdn.sanity.io' in u:
            return 'src="assets/images/products/%s"' % base
        if u.startswith('/images/'):
            return 'src="assets%s"' % u
        return 'src="%s"' % u
    html = re.sub(r'src="/_next/image\?url=([^"&]+)(?:&amp;[^"]*)?"', repl_next, html)
    # plain /images/ -> assets/images/
    html = html.replace('src="/images/', 'src="assets/images/')
    html = html.replace('href="/images/', 'href="assets/images/')
    # direct cdn.sanity references
    def repl_cdn(m):
        return 'src="assets/images/products/%s"' % os.path.basename(m.group(1).split('?')[0])
    html = re.sub(r'src="https://cdn\.sanity\.io/images/[^"]*?/([^"/?]+)(?:\?[^"]*)?"', lambda m: 'src="assets/images/products/%s"' % m.group(1), html)
    # strip srcset entirely (let src do the work)
    html = re.sub(r'\s+srcset="[^"]*"', '', html)
    html = re.sub(r'\s+sizes="[^"]*"', '', html)
    return html

# internal route links -> local .html files
ROUTE_MAP = {
  "/":"index.html","/shop-with-sidebar":"shop-with-sidebar.html","/shop-without-sidebar":"shop-without-sidebar.html",
  "/cart":"cart.html","/checkout":"checkout.html","/wishlist":"wishlist.html","/contact":"contact.html",
  "/signin":"signin.html","/signup":"signup.html","/error":"error.html","/mail-success":"mail-success.html",
  "/blogs/blog-grid":"blog-grid.html","/blogs/blog-grid-with-sidebar":"blog-grid-with-sidebar.html",
  "/blogs/blog-details":"blog-details.html","/blogs/blog-details-with-sidebar":"blog-details-with-sidebar.html",
  "/popular":"popular.html","/popular?sort=popular":"popular.html",
}
def rewrite_links(html):
    # category links -> category.html ; product links -> product-details.html (with or without leading slash)
    html = re.sub(r'href="/?categories/[^"]*"', 'href="category.html"', html)
    html = re.sub(r'href="/?products/[^"]*"', 'href="product-details.html"', html)
    html = re.sub(r'href="/?popular(\?[^"]*)?"', 'href="popular.html"', html)
    html = re.sub(r'href="/?blogs/blog-grid-with-sidebar"', 'href="blog-grid-with-sidebar.html"', html)
    html = re.sub(r'href="/?blogs/blog-grid"', 'href="blog-grid.html"', html)
    html = re.sub(r'href="/?blogs/blog-details-with-sidebar"', 'href="blog-details-with-sidebar.html"', html)
    html = re.sub(r'href="/?blogs/blog-details"', 'href="blog-details.html"', html)
    # exact route map (longest first)
    for r in sorted(ROUTE_MAP, key=len, reverse=True):
        html = html.replace('href="%s"' % r, 'href="%s"' % ROUTE_MAP[r])
    return html

SHELL = '''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<link rel="icon" href="assets/images/logo/logo.svg">
<link rel="stylesheet" href="assets/vendor/swiper-bundle.min.css">
<link rel="stylesheet" href="assets/css/vendor.css">
<link rel="stylesheet" href="assets/css/app.css">
</head>
<body>
{body}
<script src="assets/vendor/swiper-bundle.min.js"></script>
<script src="assets/js/app.js"></script>
</body>
</html>
'''

TITLES = {
  "index":"NextMerce | Next.js E-commerce Boilerplate","shop-with-sidebar":"Shop With Sidebar | NextMerce",
  "shop-without-sidebar":"Shop | NextMerce","cart":"Cart | NextMerce","checkout":"Checkout | NextMerce",
  "wishlist":"Wishlist | NextMerce","contact":"Contact | NextMerce","signin":"Sign In | NextMerce",
  "signup":"Sign Up | NextMerce","error":"404 | NextMerce","mail-success":"Mail Success | NextMerce",
  "blog-grid":"Blog Grid | NextMerce","blog-grid-with-sidebar":"Blog Grid With Sidebar | NextMerce",
  "blog-details":"Blog Details | NextMerce","blog-details-with-sidebar":"Blog Details With Sidebar | NextMerce",
  "product-details":"Shop Details | NextMerce","category":"Category | NextMerce","popular":"Popular | NextMerce",
}

OUT="."
for slug, fname in PAGES.items():
    src = os.path.join(".reference", slug, "page.html")
    if not os.path.exists(src): 
        print("MISSING", slug); continue
    html = open(src).read()
    # extract body inner
    bstart = html.find('<body')
    bopen = html.find('>', bstart)+1
    bend = html.rfind('</body>')
    body = html[bopen:bend]
    # remove next route announcer + scripts
    body = re.sub(r'<next-route-announcer[^>]*>.*?</next-route-announcer>', '', body, flags=re.S)
    body = re.sub(r'<script.*?</script>', '', body, flags=re.S)
    body = re.sub(r'\s+data-nimg="[^"]*"', '', body)
    # eager-load all images (avoids lazy-load gaps in static capture)
    body = body.replace('loading="lazy"', 'loading="eager"')
    # --- swiper runtime cleanup so we can re-init fresh ---
    # remove inline transform/transition on swiper-wrapper
    body = re.sub(r'(<div class="swiper-wrapper[^"]*")\s+style="[^"]*"', r'\1', body)
    # remove inline width/margin on swiper-slide
    body = re.sub(r'(<div class="swiper-slide[^"]*")\s+style="[^"]*"', r'\1', body)
    # strip swiper runtime state classes
    for c in ['swiper-initialized','swiper-horizontal','swiper-vertical','swiper-backface-hidden',
              'swiper-slide-active','swiper-slide-next','swiper-slide-prev','swiper-slide-visible',
              'swiper-slide-fully-visible','swiper-pagination-bullet-active','swiper-pagination-clickable',
              'swiper-pagination-bullets','swiper-pagination-horizontal','swiper-button-disabled',
              'swiper-pointer-events','swiper-watch-progress']:
        body = body.replace(' '+c, '')
    # remove generated pagination bullets / scrollbar drag (let swiper rebuild)
    body = re.sub(r'<span class="swiper-pagination-bullet[^"]*"[^>]*>.*?</span>', '', body, flags=re.S)
    body = re.sub(r'<div class="swiper-scrollbar-drag"[^>]*></div>', '', body)
    body = re.sub(r'aria-label="[^"]*slide \d+[^"]*"', '', body)
    body = rewrite_imgs(body)
    body = rewrite_links(body)
    page = SHELL.format(title=TITLES[fname], body=body)
    open(os.path.join(OUT, fname+".html"), "w").write(page)
    print("wrote", fname+".html", len(page), "bytes")
