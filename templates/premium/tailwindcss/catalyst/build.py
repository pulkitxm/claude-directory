#!/usr/bin/env python3
import re, os, json, html as htmllib

ROOT = os.path.dirname(os.path.abspath(__file__))
REF = os.path.join(ROOT, ".reference")

EVENTS = {
    "1000": {"slug":"bear-hug","name":"Bear Hug: Live in Concert","img":"bear-hug",
             "date":"May 20, 2024","time":"10 PM","venue":"Harmony Theater, Winnipeg, MB",
             "sold":350,"total":500,"status":"On Sale","price":80.00,
             "revenue":"$102,552","rev_delta":"+3.2%","tickets":"350/500","tick_delta":"+8.1%",
             "views":"24,300","views_delta":"-0.75%"},
    "1001": {"slug":"six-fingers","name":"Six Fingers - DJ Set","img":"six-fingers",
             "date":"Jun 2, 2024","time":"8 PM","venue":"Moonbeam Arena, Uxbridge, ON",
             "sold":72,"total":150,"status":"On Sale","price":299.00,
             "revenue":"$24,115","rev_delta":"+3.2%","tickets":"72/150","tick_delta":"+8.1%",
             "views":"57,544","views_delta":"-2.5%"},
    "1002": {"slug":"we-all-look-the-same","name":"We All Look The Same","img":"we-all-look-the-same",
             "date":"Aug 5, 2024","time":"4 PM","venue":"Electric Coliseum, New York, NY",
             "sold":275,"total":275,"status":"Closed","price":150.00,
             "revenue":"$40,598","rev_delta":"+3.2%","tickets":"275/275","tick_delta":"+8.1%",
             "views":"122,122","views_delta":"-8.0%"},
    "1003": {"slug":"viking-people","name":"Viking People","img":"viking-people",
             "date":"Dec 31, 2024","time":"8 PM","venue":"Tapestry Hall, Cambridge, ON",
             "sold":6,"total":40,"status":"On Sale","price":114.99,
             "revenue":"$3,552","rev_delta":"+3.2%","tickets":"6/40","tick_delta":"+8.1%",
             "views":"9,000","views_delta":"-0.15%"},
}

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
    return f"US$ {a:,.2f}".replace("US$ ","US$")

HEAD_T = """<!doctype html>
<html lang="en" class="antialiased">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>__TITLE__ - Catalyst</title>
<meta name="description" content="Catalyst - a Tailwind Plus application UI kit demo (event management admin), faithfully recreated as a static HTML/CSS/JS study.">
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

def clean(markup):
    markup = re.sub(r'<!--\$-->|<!--/\$-->|<!-- -->', '', markup)
    markup = re.sub(r'<div hidden=""></div>', '', markup)
    markup = re.sub(r' id="(headlessui|:R|_R)[^"]*"', '', markup)
    markup = re.sub(r' aria-(labelledby|controls|expanded|describedby)="[^"]*"', '', markup)
    markup = re.sub(r' data-headlessui-state="[^"]*"', '', markup)
    markup = re.sub(r' data-floating-ui-focusable="[^"]*"', '', markup)
    markup = markup.replace('cursor-default ', '')
    return markup

def extract(slug, what):
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
    if what == "auth":
        mm = re.search(r'<main[\s\S]*?</main>', body)
        return clean(mm.group(0)) if mm else ""
    return ""

SIDEBAR = extract("home", "sidebar")
HEADER  = extract("home", "header")

def set_current(nav_markup, href):
    out = nav_markup.replace(' data-current="true"', '')
    out = re.sub(r'<span class="absolute inset-y-2 -left-4 w-0\.5 rounded-full bg-zinc-950 dark:bg-white"[^>]*></span>', '', out)
    pill = '<span class="absolute inset-y-2 -left-4 w-0.5 rounded-full bg-zinc-950 dark:bg-white"></span>'
    def repl(m):
        return m.group(0).replace('<a ', '<a data-current="true" ', 1)
    pat = re.compile(r'(<span class="relative">)(\s*)(<a [^>]*href="' + re.escape(href) + r'")')
    out = pat.sub(lambda m: m.group(1) + pill + m.group(3).replace('<a ', '<a data-current="true" ',1), out, count=1)
    return out

def add_theme_toggle(header):
    return header

def app_shell(title, rel, main_html, current_href):
    sidebar = set_current(SIDEBAR, current_href)
    def fix(s): return rewrite_paths(s, rel)
    body = '<div class="relative isolate flex min-h-svh w-full bg-white max-lg:flex-col lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">\n'
    body += '<div class="fixed inset-y-0 left-0 w-64 max-lg:hidden">' + fix(strip_outer_div(sidebar)) + '</div>\n'
    body += ('<div data-mobile-sidebar class="fixed inset-0 z-50 lg:hidden hidden">'
             '<div data-backdrop class="fixed inset-0 bg-black/30 opacity-0 transition-opacity duration-300"></div>'
             '<div data-panel class="fixed inset-y-0 left-0 w-full max-w-80 p-2">'
             '<div class="flex h-full -translate-x-[110%] flex-col rounded-lg bg-white shadow-xs ring-1 ring-zinc-950/5 transition-transform duration-300 ease-in-out dark:bg-zinc-900 dark:ring-white/10" data-panel-inner>'
             '<div class="px-4 pt-3"><button data-close-sidebar aria-label="Close navigation" class="relative flex items-center justify-center rounded-lg p-2 text-zinc-950 hover:bg-zinc-950/5 dark:text-white dark:hover:bg-white/5"><svg viewBox="0 0 20 20" fill="none" class="size-5" aria-hidden="true"><path d="M5.5 5.5l9 9M5.5 14.5l9-9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button></div>'
             + fix(strip_outer_div(sidebar)).replace('max-lg:hidden','') +
             '</div></div></div>\n')
    body += '<div class="flex flex-1 flex-col lg:min-w-0">\n'
    body += '<header class="flex items-center px-4 lg:hidden">' + fix(extract_header_inner()) + '</header>\n'
    body += fix(main_html) + '\n'
    body += '</div>\n'
    body += '</div>\n'
    return HEAD.format(title=title, rel=rel) + body + FOOT.format(rel=rel)

def strip_outer_div(sidebar):
    m = re.search(r'<nav[\s\S]*</nav>', sidebar)
    return m.group(0) if m else sidebar

def extract_header_inner():
    h = HEADER
    inner = re.sub(r'^<header[^>]*>|</header>$', '', h)
    inner = inner.replace('<button aria-label="Open navigation"', '<button aria-label="Open navigation" data-open-sidebar', 1)
    return inner

def main_inner(main_html):
    m = re.search(r'<main[^>]*>([\s\S]*)</main>', main_html)
    inner = m.group(1) if m else main_html
    inner = inner.strip()
    return inner

def rewrite_paths(s, rel):
    s = s.replace('src="/', f'src="{rel}assets/')
    s = s.replace('href="/events/1000"', f'href="{rel}events/1000.html"')
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

def write(path, content):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    open(full, "w", encoding="utf-8").write(content)
    print("wrote", path, f"({len(content)//1024}kb)")

def patch_dark_css():
    p = os.path.join(ROOT, "assets/css/catalyst.css")
    css = open(p, encoding="utf-8").read()
    if "--catalyst-dark-class:1" in css:
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
    open(p,"a",encoding="utf-8").write('\n:root{--catalyst-dark-class:1}\n'+'\n'.join(add)+'\n')
    print("patched dark-class mirror into catalyst.css")

def main():
    patch_dark_css()
    write("index.html",    app_shell("Home", "", read_main("home"), "/"))
    write("events.html",   app_shell("Events", "", read_main("events"), "/events"))
    write("orders.html",   app_shell("Orders", "", read_main("orders"), "/orders"))
    write("settings.html", app_shell("Settings", "", read_main("settings"), "/settings"))
    tmpl_event = read_main("event-detail")
    for eid in EVENTS:
        write(f"events/{eid}.html", app_shell(EVENTS[eid]["name"], "../", build_event(eid, tmpl_event), "/events"))
    tmpl_order = read_main("order-detail")
    for oid in ORDERS:
        write(f"orders/{oid}.html", app_shell(f"Order #{oid}", "../", build_order(oid, tmpl_order), "/orders"))
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

def build_event(eid, tmpl):
    e = EVENTS[eid]
    base = EVENTS["1000"]
    s = tmpl
    s = s.replace("/events/bear-hug.jpg", f"/events/{e['img']}.jpg")
    s = s.replace("Bear Hug: Live in Concert", e["name"])
    s = s.replace("May 20, 2024", e["date"]).replace("10 PM", e["time"])
    s = s.replace("Harmony Theater, Winnipeg, MB", e["venue"])
    s = s.replace("$102,552", e["revenue"]).replace("+3.2%", e["rev_delta"])
    s = s.replace("350/500", e["tickets"]).replace("+8.1%", e["tick_delta"])
    s = s.replace("24,300", e["views"]).replace("-0.75%", e["views_delta"])
    if e["status"] != "On Sale":
        s = swap_badge(s, "On Sale", e["status"])
    s = replace_event_orders(s, eid)
    return s

def swap_badge(s, frm, to):
    cls_onsale = 'bg-lime-400/20 text-lime-700 group-data-hover:bg-lime-400/30 dark:bg-lime-400/10 dark:text-lime-300 dark:group-data-hover:bg-lime-400/15'
    cls_closed = 'bg-zinc-600/10 text-zinc-700 group-data-hover:bg-zinc-600/20 dark:bg-white/5 dark:text-zinc-400 dark:group-data-hover:bg-white/10'
    s = s.replace(cls_onsale, cls_closed)
    return s.replace(f">{frm}</span", f">{to}</span", 1)

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
    email = o["customer"].lower().replace(" ", ".") + "@example.com"
    s = s.replace("leslie.alexander@example.com", email)
    s = s.replace("Leslie Alexander", o["customer"])
    s = s.replace("May 9, 2024", o["date"])
    amt=f"US${o['amount']:.2f}"
    s = re.sub(r'US\$80\.00', amt, s)
    s = s.replace("/events/bear-hug-thumb.jpg", f"/events/{e['img']}-thumb.jpg")
    s = s.replace("Bear Hug: Live in Concert", e["name"])
    s = s.replace('href="/events/1000"', f'href="/events/{o["event"]}"')
    ca = o["amount"]*1.3684
    fee = ca*0.03
    net = ca-fee
    s = re.sub(r'CA\$109\.47', f"CA${ca:,.2f}", s)
    s = re.sub(r'CA\$3\.28', f"CA${fee:,.2f}", s)
    s = re.sub(r'CA\$106\.19', f"CA${net:,.2f}", s)
    return s

if __name__ == "__main__":
    main()
