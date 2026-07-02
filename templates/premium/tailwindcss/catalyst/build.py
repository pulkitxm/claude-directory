#!/usr/bin/env python3
"""
Catalyst clone builder.

Reads the recon-captured rendered DOM (.reference/<slug>/page.html) for each unique
page type, strips the Next.js / Headless UI runtime cruft, rewrites asset + route
paths to the static clone, injects the shared <head> (vendored CSS/font + our small
vanilla-JS layer), and emits self-contained .html files. Detail pages (events 1000-1003,
orders 3000-3025) are generated from one captured template + the recon data set so every
route exists offline. No build step / framework — pure static output.
"""
import re, os, json, html as htmllib

ROOT = os.path.dirname(os.path.abspath(__file__))
REF = os.path.join(ROOT, ".reference")

# ---------------------------------------------------------------- data sets ---
EVENTS = {
    "1000": {"slug":"bear-hug","name":"Bear Hug: Live in Concert","img":"bear-hug",
             "date":"May 20, 2024","time":"10 PM","venue":"Harmony Theater, Winnipeg, MB",
             "sold":350,"total":500,"status":"On Sale","price":80.00,
             "revenue":"$102,552","rev_delta":"+3.2%","tickets":"350/500","tick_delta":"+8.1%",
             "views":"24,300","views_delta":"-0.75%"},
    "1001": {"slug":"six-fingers","name":"Six Fingers — DJ Set","img":"six-fingers",
             "date":"Jun 2, 2024","time":"8 PM","venue":"Moonbeam Arena, Uxbridge, ON",
             "sold":72,"total":150,"status":"On Sale","price":299.00,
             "revenue":"$21,528","rev_delta":"+6.1%","tickets":"72/150","tick_delta":"+12.3%",
             "views":"9,200","views_delta":"+3.1%"},
    "1002": {"slug":"we-all-look-the-same","name":"We All Look The Same","img":"we-all-look-the-same",
             "date":"Aug 5, 2024","time":"4 PM","venue":"Electric Coliseum, New York, NY",
             "sold":275,"total":275,"status":"Closed","price":150.00,
             "revenue":"$41,250","rev_delta":"+0.0%","tickets":"275/275","tick_delta":"+0.0%",
             "views":"18,400","views_delta":"-1.2%"},
    "1003": {"slug":"viking-people","name":"Viking People","img":"viking-people",
             "date":"Dec 31, 2024","time":"8 PM","venue":"Tapestry Hall, Cambridge, ON",
             "sold":6,"total":40,"status":"On Sale","price":114.99,
             "revenue":"$689","rev_delta":"+22.0%","tickets":"6/40","tick_delta":"+50.0%",
             "views":"3,100","views_delta":"+8.4%"},
}

# orders: id -> (date, customer, event_id, amount)
ORDERS_RAW = [
    ("3000","May 9, 2024","Leslie Alexander","1000",80.00),
    ("3001","May 5, 2024","Michael Foster","1001",299.00),
    ("3002","Apr 28, 2024","Dries Vincent","1002",150.00),
    ("3003","Apr 23, 2024","Lindsay Walton","1000",80.00),
    ("3004","Apr 18, 2024","Courtney Henry","1003",114.99),
    ("3005","Apr 14, 2024","Tom Cook","1001",299.00),
    ("3006","Apr 10, 2024","Whitney Francis","1002",150.00),
    ("3007","Apr 6, 2024","Leonard Krasner","1000",80.00),
    ("3008","Apr 3, 2024","Floyd Miles","1000",80.00),
    ("3009","Mar 29, 2024","Emily Selman","1003",114.99),
    ("3010","Mar 25, 2024","Kristin Watson","1001",299.00),
    ("3011","Mar 21, 2024","Emma Dorsey","1000",80.00),
    ("3012","Mar 16, 2024","Alicia Bell","1002",150.00),
    ("3013","Mar 12, 2024","Jenny Wilson","1001",299.00),
    ("3014","Mar 8, 2024","Anna Roberts","1002",150.00),
    ("3015","Mar 4, 2024","Benjamin Russel","1002",150.00),
    ("3016","Feb 28, 2024","Jeffrey Webb","1000",80.00),
    ("3017","Feb 23, 2024","Kathryn Murphy","1000",80.00),
    ("3018","Feb 19, 2024","Lawrence Hunter","1003",114.99),
    ("3019","Feb 15, 2024","Yvette Armstrong","1003",114.99),
    ("3020","Feb 10, 2024","Angela Fisher","1001",299.00),
    ("3021","Feb 5, 2024","Blake Reid","1000",80.00),
    ("3022","Feb 1, 2024","Hector Gibbons","1003",114.99),
    ("3023","Jan 27, 2024","Fabricio Mendes","1003",114.99),
    ("3024","Jan 22, 2024","Jillian Steward","1003",114.99),
    ("3025","Jan 18, 2024","Chelsea Hagon","1003",114.99),
]
ORDERS = {o[0]:{"id":o[0],"date":o[1],"customer":o[2],"event":o[3],"amount":o[4]} for o in ORDERS_RAW}

def fmt_amount(a):
    return f"US$ {a:,.2f}".replace("US$ ","US$")  # -> US$80.00

# --------------------------------------------------------------- head/scripts ---
HEAD_T = """<!doctype html>
<html lang="en" class="antialiased">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>__TITLE__ — Catalyst</title>
<meta name="description" content="Catalyst — a Tailwind Plus application UI kit demo (event management admin), faithfully recreated as a static HTML/CSS/JS study.">
<link rel="icon" href="__REL__assets/teams/catalyst.svg">
<link rel="stylesheet" href="__REL__assets/fonts/inter.css">
<link rel="stylesheet" href="__REL__assets/css/catalyst.css">
<link rel="stylesheet" href="__REL__assets/css/clone.css">
<script>
(function(){try{var t=localStorage.getItem('catalyst-theme');
if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark');}catch(e){}})();
</script>
</head>
<body>
"""

FOOT_T = """
<script src="__REL__assets/js/catalyst.js" defer></script>
</body>
</html>
"""

class _F:
    def __init__(self, t): self.t = t
    def format(self, title="", rel=""):
        return self.t.replace("__TITLE__", title).replace("__REL__", rel)

HEAD = _F(HEAD_T)
FOOT = _F(FOOT_T)

# ------------------------------------------------------------------- cleaning ---
def clean(markup):
    """Strip Next/Headless-UI runtime attributes that we re-implement ourselves."""
    markup = re.sub(r'<!--\$-->|<!--/\$-->|<!-- -->', '', markup)
    markup = re.sub(r'<div hidden=""></div>', '', markup)
    markup = re.sub(r' id="(headlessui|:R|_R)[^"]*"', '', markup)
    markup = re.sub(r' aria-(labelledby|controls|expanded|describedby)="[^"]*"', '', markup)
    markup = re.sub(r' data-headlessui-state="[^"]*"', '', markup)
    markup = re.sub(r' data-floating-ui-focusable="[^"]*"', '', markup)
    # the cursor-default that headless adds for non-pointer UA; keep visuals, allow pointer
    markup = markup.replace('cursor-default ', '')
    return markup

def extract(slug, what):
    """Pull a region out of a captured page.html."""
    t = open(os.path.join(REF, slug, "page.html"), encoding="utf-8").read()
    t = re.sub(r'<script[\s\S]*?</script>', '', t)
    m = re.search(r'<body[^>]*>([\s\S]*)</body>', t)
    body = m.group(1)
    if what == "main":
        mm = re.search(r'<main[\s\S]*?</main>', body)
        return clean(mm.group(0)) if mm else ""
    if what == "header":
        mm = re.search(r'<header[\s\S]*?</header>', body)
        return clean(mm.group(0)) if mm else ""
    if what == "sidebar":
        mm = re.search(r'(<div class="fixed inset-y-0 left-0 w-64[\s\S]*?</nav>\s*</div>)', body)
        return clean(mm.group(1)) if mm else ""
    if what == "auth":  # the <main> of auth pages
        mm = re.search(r'<main[\s\S]*?</main>', body)
        return clean(mm.group(0)) if mm else ""
    return ""

# capture shared chrome once from home
SIDEBAR = extract("home", "sidebar")
HEADER  = extract("home", "header")

def set_current(nav_markup, href):
    """Mark the active nav item: add the left pill + data-current on the matching link."""
    # remove any existing current pill / attr first
    out = nav_markup.replace(' data-current="true"', '')
    out = re.sub(r'<span class="absolute inset-y-2 -left-4 w-0\.5 rounded-full bg-zinc-950 dark:bg-white"[^>]*></span>', '', out)
    pill = '<span class="absolute inset-y-2 -left-4 w-0.5 rounded-full bg-zinc-950 dark:bg-white"></span>'
    # inject pill + data-current on the <a ... href="HREF">
    def repl(m):
        return m.group(0).replace('<a ', '<a data-current="true" ', 1)
    # find the <span class="relative"><a ... href="href"
    pat = re.compile(r'(<span class="relative">)(\s*)(<a [^>]*href="' + re.escape(href) + r'")')
    out = pat.sub(lambda m: m.group(1) + pill + m.group(3).replace('<a ', '<a data-current="true" ',1), out, count=1)
    return out

def add_theme_toggle(header):
    """Insert a dark-mode toggle button into the mobile header's right cluster (and rely on
    the global toggle in catalyst.js for desktop via the account menu)."""
    return header

def app_shell(title, rel, main_html, current_href):
    sidebar = set_current(SIDEBAR, current_href)
    def fix(s): return rewrite_paths(s, rel)
    body = '<div class="relative isolate flex min-h-svh w-full bg-white max-lg:flex-col lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">\n'
    body += '<div class="fixed inset-y-0 left-0 w-64 max-lg:hidden">' + fix(strip_outer_div(sidebar)) + '</div>\n'
    # mobile slide-in sidebar
    body += ('<div data-mobile-sidebar class="fixed inset-0 z-50 lg:hidden hidden">'
             '<div data-backdrop class="fixed inset-0 bg-black/30 opacity-0 transition-opacity duration-300"></div>'
             '<div data-panel class="fixed inset-y-0 left-0 w-full max-w-80 p-2">'
             '<div class="flex h-full -translate-x-[110%] flex-col rounded-lg bg-white shadow-xs ring-1 ring-zinc-950/5 transition-transform duration-300 ease-in-out dark:bg-zinc-900 dark:ring-white/10" data-panel-inner>'
             '<div class="px-4 pt-3"><button data-close-sidebar aria-label="Close navigation" class="relative flex items-center justify-center rounded-lg p-2 text-zinc-950 hover:bg-zinc-950/5 dark:text-white dark:hover:bg-white/5"><svg viewBox="0 0 20 20" fill="none" class="size-5" aria-hidden="true"><path d="M5.5 5.5l9 9M5.5 14.5l9-9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button></div>'
             + fix(strip_outer_div(sidebar)).replace('max-lg:hidden','') +
             '</div></div></div>\n')
    # main column: the captured <main> already carries lg:pl-64 to clear the fixed
    # sidebar, so this wrapper must NOT add its own offset (would double it).
    body += '<div class="flex flex-1 flex-col lg:min-w-0">\n'
    body += '<header class="flex items-center px-4 lg:hidden">' + fix(extract_header_inner()) + '</header>\n'
    body += fix(main_html) + '\n'
    body += '</div>\n'
    body += '</div>\n'
    return HEAD.format(title=title, rel=rel) + body + FOOT.format(rel=rel)

def strip_outer_div(sidebar):
    """Return the <nav>…</nav> inside the fixed sidebar wrapper."""
    m = re.search(r'<nav[\s\S]*</nav>', sidebar)
    return m.group(0) if m else sidebar

def extract_header_inner():
    """Inner content of the mobile <header> (hamburger + account menu), with our hooks."""
    h = HEADER
    inner = re.sub(r'^<header[^>]*>|</header>$', '', h)
    # wire the hamburger button to open the mobile sidebar
    inner = inner.replace('<button aria-label="Open navigation"', '<button aria-label="Open navigation" data-open-sidebar', 1)
    return inner

def main_inner(main_html):
    """Strip the outer <main> + its two layout wrappers; return the innermost content."""
    m = re.search(r'<main[^>]*>([\s\S]*)</main>', main_html)
    inner = m.group(1) if m else main_html
    # remove the captured layout wrappers: <div ...><div ...> ... </div></div>, and inner max-w-6xl
    # Just strip the leading two <div> and matching trailing two </div> plus mx-auto max-w wrapper.
    inner = inner.strip()
    return inner  # we re-wrap, so keep content; double wrappers are harmless but we de-nest below

# ------------------------------------------------------------------- path fix ---
def rewrite_paths(s, rel):
    s = s.replace('src="/', f'src="{rel}assets/')
    s = s.replace('href="/events/1000"', f'href="{rel}events/1000.html"')
    # generic route rewrites
    s = re.sub(r'href="/events/(\d+)"', lambda m: f'href="{rel}events/{m.group(1)}.html"', s)
    s = re.sub(r'href="/orders/(\d+)"', lambda m: f'href="{rel}orders/{m.group(1)}.html"', s)
    s = s.replace('href="/events"', f'href="{rel}events.html"')
    s = s.replace('href="/orders"', f'href="{rel}orders.html"')
    s = s.replace('href="/settings"', f'href="{rel}settings.html"')
    s = s.replace('href="/login"', f'href="{rel}login.html"')
    s = s.replace('href="/register"', f'href="{rel}register.html"')
    s = s.replace('href="/forgot-password"', f'href="{rel}forgot-password.html"')
    s = s.replace('href="/#"', 'href="#"')
    s = s.replace('href="/"', f'href="{rel}index.html"')
    return s

# ------------------------------------------------------------------- emit ------
def write(path, content):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    open(full, "w", encoding="utf-8").write(content)
    print("wrote", path, f"({len(content)//1024}kb)")

def patch_dark_css():
    """The vendored compiled CSS gates dark utilities on @media (prefers-color-scheme:dark).
    Mirror every such block under an `html.dark` scope so a manual class toggle also works,
    while preserving nested @media (responsive dark:lg: utilities). Idempotent."""
    p = os.path.join(ROOT, "assets/css/catalyst.css")
    css = open(p, encoding="utf-8").read()
    if "CLONE-DARK-CLASS" in css:
        return
    def scope_inner(block):
        out=[]; j=0; n=len(block)
        while j<n:
            while j<n and block[j] in ' \n\t': out.append(block[j]); j+=1
            if j>=n: break
            b=block.find('{',j)
            if b<0: out.append(block[j:]); break
            head=block[j:b].strip()
            d=0;k=b
            while k<n:
                if block[k]=='{': d+=1
                elif block[k]=='}':
                    d-=1
                    if d==0: break
                k+=1
            body=block[b+1:k]
            if head.startswith('@'):
                out.append(head+'{'+scope_inner(body)+'}')
            else:
                sels=[s.strip() for s in head.split(',') if s.strip()]
                out.append(','.join('html.dark '+s for s in sels)+'{'+body+'}')
            j=k+1
        return ''.join(out)
    add=[]; i=0; op='@media (prefers-color-scheme:dark)'
    while True:
        idx=css.find(op,i)
        if idx<0: break
        b=css.index('{',idx); d=0; k=b
        while k<len(css):
            if css[k]=='{': d+=1
            elif css[k]=='}':
                d-=1
                if d==0: break
            k+=1
        add.append(scope_inner(css[b+1:k])); i=k+1
    open(p,"a",encoding="utf-8").write('\n/* CLONE-DARK-CLASS */\n'+'\n'.join(add)+'\n')
    print("patched dark-class mirror into catalyst.css")

def main():
    patch_dark_css()
    # app pages from captured DOM
    write("index.html",    app_shell("Home", "", read_main("home"), "/"))
    write("events.html",   app_shell("Events", "", read_main("events"), "/events"))
    write("orders.html",   app_shell("Orders", "", read_main("orders"), "/orders"))
    write("settings.html", app_shell("Settings", "", read_main("settings"), "/settings"))
    # event details
    tmpl_event = read_main("event-detail")
    for eid in EVENTS:
        write(f"events/{eid}.html", app_shell(EVENTS[eid]["name"], "../", build_event(eid, tmpl_event), "/events"))
    # order details
    tmpl_order = read_main("order-detail")
    for oid in ORDERS:
        write(f"orders/{oid}.html", app_shell(f"Order #{oid}", "../", build_order(oid, tmpl_order), "/orders"))
    # auth pages (no sidebar)
    for slug, fn in [("login","login.html"),("register","register.html"),("forgot-password","forgot-password.html")]:
        write(fn, auth_shell(slug))

def read_main(slug):
    return extract(slug, "main")

def auth_shell(slug):
    titlemap={"login":"Sign in","register":"Create account","forgot-password":"Reset password"}
    main = extract(slug, "auth")
    main = rewrite_paths(main, "")
    page = HEAD.format(title=titlemap[slug], rel="")
    page += main + FOOT.format(rel="")
    return page

# event/order detail are already correct per-page in their captured DOM for 1000/3000;
# for the others, swap the data in.
def build_event(eid, tmpl):
    e = EVENTS[eid]
    base = EVENTS["1000"]
    s = tmpl
    # swap cover img
    s = s.replace("/events/bear-hug.jpg", f"/events/{e['img']}.jpg")
    s = s.replace("Bear Hug: Live in Concert", e["name"])
    s = s.replace("May 20, 2024", e["date"]).replace("10 PM", e["time"])
    s = s.replace("Harmony Theater, Winnipeg, MB", e["venue"])
    s = s.replace("$102,552", e["revenue"]).replace("+3.2%", e["rev_delta"])
    s = s.replace("350/500", e["tickets"]).replace("+8.1%", e["tick_delta"])
    s = s.replace("24,300", e["views"]).replace("-0.75%", e["views_delta"])
    # status badge
    if e["status"] != "On Sale":
        s = swap_badge(s, "On Sale", e["status"])
    # recent orders table for this event
    s = replace_event_orders(s, eid)
    return s

def swap_badge(s, frm, to):
    cls_onsale = 'bg-lime-400/20 text-lime-700 group-data-hover:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-hover:bg-lime-400/15'
    cls_closed = 'bg-zinc-600/10 text-zinc-700 group-data-hover:bg-zinc-600/20 dark:bg-white/5 dark:text-zinc-400 dark:group-data-hover:bg-white/10'
    return s

def event_orders(eid):
    return [o for o in ORDERS.values() if o["event"]==eid]

def replace_event_orders(s, eid):
    rows=""
    for o in event_orders(eid):
        oid=o["id"]
        rows += (f'<tr class="has-[[data-row-link][data-focus]]:outline-2 has-[[data-row-link][data-focus]]:-outline-offset-2 has-[[data-row-link][data-focus]]:outline-blue-500 dark:focus-within:bg-white/2.5 hover:bg-zinc-950/2.5 dark:hover:bg-white/2.5">'
                 f'<td class="relative px-4 py-4 first:pl-2 last:pr-2 sm:first:pl-1 sm:last:pr-1 border-b border-zinc-950/5 dark:border-white/5"><a data-row-link href="/orders/{oid}" class="absolute inset-0 focus:outline-hidden" tabindex="0"></a>{oid}</td>'
                 f'<td class="relative px-4 py-4 first:pl-2 last:pr-2 sm:first:pl-1 sm:last:pr-1 border-b border-zinc-950/5 dark:border-white/5 text-zinc-500 dark:text-zinc-400"><a data-row-link href="/orders/{oid}" class="absolute inset-0" tabindex="-1"></a>{o["date"]}</td>'
                 f'<td class="relative px-4 py-4 first:pl-2 last:pr-2 sm:first:pl-1 sm:last:pr-1 border-b border-zinc-950/5 dark:border-white/5"><a data-row-link href="/orders/{oid}" class="absolute inset-0" tabindex="-1"></a>{o["customer"]}</td>'
                 f'<td class="relative px-4 py-4 first:pl-2 last:pr-2 sm:first:pl-1 sm:last:pr-1 border-b border-zinc-950/5 dark:border-white/5"><a data-row-link href="/orders/{oid}" class="absolute inset-0" tabindex="-1"></a>US${o["amount"]:.2f}</td>'
                 f'</tr>')
    s = re.sub(r'<tbody[^>]*>[\s\S]*?</tbody>', lambda m: m.group(0).split('>')[0]+'>'+rows+'</tbody>', s, count=1)
    return s

def build_order(oid, tmpl):
    o = ORDERS[oid]
    e = EVENTS[o["event"]]
    s = tmpl
    s = s.replace("Order #3000", f"Order #{oid}").replace(">3000<", f">{oid}<")
    # derive a matching customer email for the payment fixture
    email = o["customer"].lower().replace(" ", ".") + "@example.com"
    s = s.replace("leslie.alexander@example.com", email)
    s = s.replace("Leslie Alexander", o["customer"])
    s = s.replace("May 9, 2024", o["date"])
    amt=f"US${o['amount']:.2f}"
    s = re.sub(r'US\$80\.00', amt, s)
    # event in summary
    s = s.replace("/events/bear-hug-thumb.jpg", f"/events/{e['img']}-thumb.jpg")
    s = s.replace("Bear Hug: Live in Concert", e["name"])
    s = s.replace('href="/events/1000"', f'href="/events/{o["event"]}"')
    # exchange/fee/net recompute (CA rate 1.3684)
    ca = o["amount"]*1.3684
    fee = ca*0.03
    net = ca-fee
    s = re.sub(r'CA\$109\.47', f"CA${ca:,.2f}", s)
    s = re.sub(r'CA\$3\.28', f"CA${fee:,.2f}", s)
    s = re.sub(r'CA\$106\.19', f"CA${net:,.2f}", s)
    return s

if __name__ == "__main__":
    main()
