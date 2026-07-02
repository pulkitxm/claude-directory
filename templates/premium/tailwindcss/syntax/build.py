#!/usr/bin/env python3
"""Static generator for the Syntax (CacheAdvance) docs clone.
Emits index.html + docs/<slug>.html sharing one shell. No build step at runtime —
this just writes the static files once; the output is plain HTML/CSS/JS.
"""
import os, re, html as H

ROOT = os.path.dirname(os.path.abspath(__file__))

ICONS_DIR = os.path.join(ROOT, ".reference", "icons")
LOGO_WORDMARK = open(os.path.join(ICONS_DIR, "logo_wordmark.txt")).read()
LOGO_DIAMOND = open(os.path.join(ICONS_DIR, "logo_diamond.txt")).read()
GITHUB_SVG = open(os.path.join(ICONS_DIR, "github.txt")).read()
GRID_SVG = open(os.path.join(ICONS_DIR, "grid.txt")).read()

# ---- Navigation structure (section title -> [(title, href-slug-or-'')]) ----
NAV = [
    ("Introduction", [
        ("Getting started", ""),         # home  ->  index.html
        ("Installation", "installation"),
    ]),
    ("Core concepts", [
        ("Understanding caching", "understanding-caching"),
        ("Predicting user behavior", "predicting-user-behavior"),
        ("Basics of time-travel", "basics-of-time-travel"),
        ("Introduction to string theory", "introduction-to-string-theory"),
        ("The butterfly effect", "the-butterfly-effect"),
    ]),
    ("Advanced guides", [
        ("Writing plugins", "writing-plugins"),
        ("Neuralink integration", "neuralink-integration"),
        ("Temporal paradoxes", "temporal-paradoxes"),
        ("Testing", "testing"),
        ("Compile-time caching", "compile-time-caching"),
        ("Predictive data generation", "predictive-data-generation"),
    ]),
    ("API reference", [
        ("CacheAdvance.predict()", "cacheadvance-predict"),
        ("CacheAdvance.flush()", "cacheadvance-flush"),
        ("CacheAdvance.revert()", "cacheadvance-revert"),
        ("CacheAdvance.regret()", "cacheadvance-regret"),
    ]),
    ("Contributing", [
        ("How to contribute", "how-to-contribute"),
        ("Architecture guide", "architecture-guide"),
        ("Design principles", "design-principles"),
    ]),
]

# flat ordered list for prev/next + section lookup
FLAT = []
for sec, items in NAV:
    for title, slug in items:
        FLAT.append((title, slug, sec))


def href_for(slug, from_docs):
    if slug == "":
        return "../index.html" if from_docs else "index.html"
    return (slug + ".html") if from_docs else ("docs/" + slug + ".html")


# ---------------------------------------------------------------- ICONS
ICON_LINK = '<svg aria-hidden="true" viewBox="0 0 16 16" class="h-4 w-4 flex-none fill-current"><path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z"></path></svg>'
ICON_LINK_PREV = '<svg viewBox="0 0 16 16" aria-hidden="true" class="-ml-1 h-4 w-4 flex-none fill-current -scale-x-100"><path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z"></path></svg>'
ICON_SEARCH = '<svg aria-hidden="true" viewBox="0 0 20 20" class="h-5 w-5 flex-none fill-slate-400 group-hover:fill-slate-500 md:group-hover:fill-slate-400 dark:fill-slate-500"><path d="M16.293 17.707a1 1 0 0 0 1.414-1.414l-1.414 1.414ZM9 14a5 5 0 0 1-5-5H2a7 7 0 0 0 7 7v-2ZM4 9a5 5 0 0 1 5-5V2a7 7 0 0 0-7 7h2Zm5-5a5 5 0 0 1 5 5h2a7 7 0 0 0-7-7v2Zm8.707 12.293-3.757-3.757-1.414 1.414 3.757 3.757 1.414-1.414ZM14 9a4.98 4.98 0 0 1-1.464 3.536l1.414 1.414A6.98 6.98 0 0 0 16 9h-2Zm-1.464 3.536A4.98 4.98 0 0 1 9 14v2a6.98 6.98 0 0 0 4.95-2.05l-1.414-1.414Z"></path></svg>'
ICON_HAMBURGER = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" class="h-6 w-6 stroke-slate-500"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>'
ICON_CLOSE = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" class="h-6 w-6 stroke-slate-500"><path d="M5 5l14 14M19 5l-14 14"></path></svg>'
ICON_SUN = '<svg aria-hidden="true" viewBox="0 0 16 16" class="h-4 w-4 dark:hidden fill-slate-400"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 1a1 1 0 0 1 2 0v1a1 1 0 1 1-2 0V1Zm4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm2.657-5.657a1 1 0 0 0-1.414 0l-.707.707a1 1 0 0 0 1.414 1.414l.707-.707a1 1 0 0 0 0-1.414Zm-1.415 11.313-.707-.707a1 1 0 0 1 1.415-1.415l.707.708a1 1 0 0 1-1.415 1.414ZM16 7.999a1 1 0 0 0-1-1h-1a1 1 0 1 0 0 2h1a1 1 0 0 0 1-1ZM7 14a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Zm-2.536-2.464a1 1 0 0 0-1.414 0l-.707.707a1 1 0 0 0 1.414 1.414l.707-.707a1 1 0 0 0 0-1.414Zm0-8.486A1 1 0 0 1 3.05 4.464l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707ZM3 8a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1Z"></path></svg>'
ICON_MOON = '<svg aria-hidden="true" viewBox="0 0 16 16" class="hidden h-4 w-4 dark:block fill-white"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.23 3.333C7.757 2.905 7.68 2 7 2a6 6 0 1 0 0 12c.68 0 .758-.905.23-1.332A5.989 5.989 0 0 1 5 8c0-1.885.87-3.568 2.23-4.668ZM12 5a1 1 0 0 1 1 1 1 1 0 0 0 1 1 1 1 0 1 1 0 2 1 1 0 0 0-1 1 1 1 0 1 1-2 0 1 1 0 0 0-1-1 1 1 0 1 1 0-2 1 1 0 0 0 1-1 1 1 0 0 1 1-1Z"></path></svg>'


# ---------------------------------------------------------------- HEADER
def header():
    return f'''<header class="sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 sm:px-6 lg:px-8 dark:shadow-none dark:bg-slate-900/95 dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75">
  <div class="mr-6 flex lg:hidden">
    <button type="button" class="relative" aria-label="Open navigation" data-mobile-open>{ICON_HAMBURGER}</button>
  </div>
  <div class="relative flex grow basis-0 items-center">
    <a aria-label="Home page" href="{{home}}">{LOGO_DIAMOND}{LOGO_WORDMARK}</a>
  </div>
  <div class="-my-5 mr-6 sm:mr-8 md:mr-0">
    <button type="button" data-search-open class="group flex h-6 w-6 items-center justify-center sm:justify-start md:h-auto md:w-80 md:flex-none md:rounded-lg md:py-2.5 md:pr-3.5 md:pl-4 md:text-sm md:ring-1 md:ring-slate-200 md:hover:ring-slate-300 lg:w-96 dark:md:bg-slate-800/75 dark:md:ring-white/5 dark:md:ring-inset dark:md:hover:bg-slate-700/40 dark:md:hover:ring-slate-500">
      {ICON_SEARCH}
      <span class="sr-only md:not-sr-only md:ml-2 md:text-slate-500 md:dark:text-slate-400">Search docs</span>
      <kbd class="ml-auto hidden font-medium text-slate-400 md:block dark:text-slate-500"><kbd class="font-sans">Ctrl </kbd><kbd class="font-sans">K</kbd></kbd>
    </button>
  </div>
  <div class="relative flex basis-0 justify-end gap-6 sm:gap-8 md:grow">
    <div class="relative z-10">
      <label class="sr-only">Theme</label>
      <button data-theme-button class="flex h-6 w-6 items-center justify-center rounded-lg shadow-md ring-1 shadow-black/5 ring-black/5 dark:bg-slate-700 dark:ring-white/5 dark:ring-inset" aria-label="Theme" type="button" aria-haspopup="listbox" aria-expanded="false">{ICON_SUN}{ICON_MOON}</button>
      <ul data-theme-menu role="listbox" class="hidden absolute top-full right-0 mt-3 w-36 space-y-1 rounded-xl bg-white p-3 text-sm font-medium shadow-md shadow-black/5 ring-1 ring-black/5 dark:bg-slate-800 dark:ring-white/5">
        <li role="option" data-theme-option="light" class="flex cursor-pointer items-center rounded-[0.625rem] p-1 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900/40"><div class="rounded-md bg-white p-1 ring-1 shadow-sm ring-slate-900/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5">{ICON_SUN.replace('dark:hidden','')}</div><div class="ml-3">Light</div></li>
        <li role="option" data-theme-option="dark" class="flex cursor-pointer items-center rounded-[0.625rem] p-1 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900/40"><div class="rounded-md bg-white p-1 ring-1 shadow-sm ring-slate-900/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5">{ICON_MOON.replace('hidden h-4 w-4 dark:block','h-4 w-4').replace('fill-white','fill-slate-400')}</div><div class="ml-3">Dark</div></li>
        <li role="option" data-theme-option="system" class="flex cursor-pointer items-center rounded-[0.625rem] p-1 text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900/40"><div class="rounded-md bg-white p-1 ring-1 shadow-sm ring-slate-900/5 dark:bg-slate-700 dark:ring-inset dark:ring-white/5"><svg viewBox="0 0 16 16" class="h-4 w-4 fill-slate-400"><path fill-rule="evenodd" clip-rule="evenodd" d="M1 4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4a3 3 0 0 1-3 3h-1.5l.5 2h1a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h1l.5-2H4a3 3 0 0 1-3-3V4Zm3-1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z"></path></svg></div><div class="ml-3">System</div></li>
      </ul>
    </div>
    <a class="group" aria-label="GitHub" href="https://github.com">{GITHUB_SVG}</a>
  </div>
</header>'''


# ---------------------------------------------------------------- SIDEBAR
def sidebar(active_slug, from_docs):
    out = ['<nav class="text-base lg:text-sm" data-sidebar-nav><ul role="list" class="space-y-9">']
    for sec, items in NAV:
        out.append('<li data-nav-group>')
        out.append(f'<h2 class="font-display font-medium text-slate-900 dark:text-white">{sec}</h2>')
        out.append('<ul role="list" class="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800">')
        for title, slug in items:
            is_active = slug == active_slug
            href = href_for(slug, from_docs)
            if is_active:
                cls = "block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full font-semibold text-sky-500 before:bg-sky-500"
                out.append(f'<li class="relative"><a class="{cls}" data-active aria-current="page" href="{href}">{H.escape(title)}</a></li>')
            else:
                cls = "block w-full pl-3.5 before:pointer-events-none before:absolute before:top-1/2 before:-left-1 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
                out.append(f'<li class="relative"><a class="{cls}" href="{href}">{H.escape(title)}</a></li>')
        out.append('</ul></li>')
    out.append('</ul></nav>')
    return "".join(out)


# ---------------------------------------------------------------- HERO (home only)
def hero():
    return '''<div class="overflow-hidden bg-slate-900 dark:-mt-19 dark:-mb-32 dark:pt-19 dark:pb-32">
  <div class="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
    <div class="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
      <div class="relative z-10 md:text-center lg:text-left">
        <img alt="" width="530" height="530" class="absolute right-full bottom-full -mr-72 -mb-56 opacity-50" src="assets/img/blur-cyan.png">
        <div class="relative">
          <p class="inline bg-linear-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">Never miss the cache again.</p>
          <p class="mt-3 text-2xl tracking-tight text-slate-400">Cache every single thing your app could ever do ahead of time, so your code never even has to run at all.</p>
          <div class="mt-8 flex gap-4 md:justify-center lg:justify-start">
            <a class="rounded-full bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 transition hover:bg-sky-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500" href="docs/installation.html">Get started</a>
            <a class="rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white transition hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400" href="https://github.com">View on GitHub</a>
          </div>
        </div>
      </div>
      <div class="relative lg:static xl:pl-10">
        <div class="absolute inset-x-[-50vw] -top-32 -bottom-48 mask-[linear-gradient(transparent,white,white)] lg:-top-32 lg:right-0 lg:-bottom-32 lg:left-[calc(50%+14rem)] lg:mask-none dark:mask-[linear-gradient(transparent,white,transparent)] lg:dark:mask-[linear-gradient(white,white,transparent)]">
          ''' + GRID_SVG + '''
        </div>
        <div class="relative">
          <img alt="" width="530" height="530" class="absolute -top-64 -right-64" src="assets/img/blur-cyan.png">
          <img alt="" width="567" height="567" class="absolute -right-44 -bottom-40" src="assets/img/blur-indigo.png">
          <div class="absolute inset-0 rounded-2xl bg-linear-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10 blur-lg"></div>
          <div class="absolute inset-0 rounded-2xl bg-linear-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10"></div>
          <div class="relative rounded-2xl bg-[#0A101F]/80 ring-1 ring-white/10 backdrop-blur-sm">
            <div class="absolute -top-px right-11 left-20 h-px bg-linear-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0"></div>
            <div class="absolute right-20 -bottom-px left-11 h-px bg-linear-to-r from-blue-400/0 via-blue-400 to-blue-400/0"></div>
            <div class="pt-4 pl-4">
              <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" class="h-2.5 w-auto stroke-slate-500/30"><circle cx="5" cy="5" r="4.5"></circle><circle cx="21" cy="5" r="4.5"></circle><circle cx="37" cy="5" r="4.5"></circle></svg>
              <div class="mt-4 flex space-x-2 text-xs">
                <div class="flex h-6 rounded-full bg-linear-to-r from-sky-400/30 via-sky-400 to-sky-400/30 p-px font-medium text-sky-300"><div class="flex items-center rounded-full px-2.5 bg-slate-800">cache-advance.config.js</div></div>
                <div class="flex h-6 rounded-full text-slate-500"><div class="flex items-center rounded-full px-2.5">package.json</div></div>
              </div>
              <div class="mt-6 flex items-start px-1 text-sm">
                <div aria-hidden="true" class="border-r border-slate-300/5 pr-4 font-mono text-slate-600 select-none">01<br>02<br>03<br>04<br>05<br>06<br>07<br></div>
                <pre class="prism-code language-javascript flex overflow-x-auto pb-6"><code class="px-4"><div class="token-line"><span class="token keyword module">export</span><span class="token plain"> </span><span class="token keyword module">default</span><span class="token plain"> </span><span class="token punctuation">{</span><span class="token plain">\n</span></div><div class="token-line"><span class="token plain">  </span><span class="token literal-property property">strategy</span><span class="token operator">:</span><span class="token plain"> </span><span class="token string">'predictive'</span><span class="token punctuation">,</span><span class="token plain">\n</span></div><div class="token-line"><span class="token plain">  </span><span class="token literal-property property">engine</span><span class="token operator">:</span><span class="token plain"> </span><span class="token punctuation">{</span><span class="token plain">\n</span></div><div class="token-line"><span class="token plain">    </span><span class="token literal-property property">cpus</span><span class="token operator">:</span><span class="token plain"> </span><span class="token number">12</span><span class="token punctuation">,</span><span class="token plain">\n</span></div><div class="token-line"><span class="token plain">    </span><span class="token literal-property property">backups</span><span class="token operator">:</span><span class="token plain"> </span><span class="token punctuation">[</span><span class="token string">'./storage/cache.wtf'</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token plain">\n</span></div><div class="token-line"><span class="token plain">  </span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token plain">\n</span></div><div class="token-line"><span class="token plain">\n</span><span class="token punctuation">}</span></div></code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>'''


# ---------------------------------------------------------------- QUICK-LINK CARDS (home)
CARD_ICONS = {k: open(os.path.join(ROOT, ".reference/icons", f"card-{k}.svg")).read()
              for k in ("installation", "architecture", "plugins", "apiref")}


def quicklinks():
    cards = [
        ("Installation", "Step-by-step guides to setting up your system and installing the library.", "docs/installation.html", "installation"),
        ("Architecture guide", "Learn how the internals work and contribute.", "docs/architecture-guide.html", "architecture"),
        ("Plugins", "Extend the library with third-party plugins or write your own.", "docs/writing-plugins.html", "plugins"),
        ("API reference", "Learn to easily customize and modify your app's visual design to fit your brand.", "docs/cacheadvance-predict.html", "apiref"),
    ]
    out = ['<div class="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">']
    for title, desc, href, icon in cards:
        out.append(f'''<div class="group relative rounded-xl border border-slate-200 dark:border-slate-800">
  <div class="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,var(--color-sky-50)),var(--quick-links-hover-bg,var(--color-sky-50)))_padding-box,linear-gradient(to_top,var(--color-indigo-400),var(--color-cyan-400),var(--color-sky-500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:var(--color-slate-800)]"></div>
  <div class="relative overflow-hidden rounded-xl p-6">{CARD_ICONS[icon]}
    <h2 class="mt-4 font-display text-base text-slate-900 dark:text-white"><a href="{href}"><span class="absolute -inset-px rounded-xl"></span>{H.escape(title)}</a></h2>
    <p class="mt-1 text-sm text-slate-700 dark:text-slate-400">{H.escape(desc)}</p>
  </div>
</div>''')
    out.append('</div>')
    return "".join(out)


# ---------------------------------------------------------------- PROSE BODY
LOREM_A = "Sit commodi iste iure molestias qui amet voluptatem sed quaerat. Nostrum aut pariatur. Sint ipsa praesentium dolor error cumque velit tenetur quaerat exercitationem. Consequatur et cum atque mollitia qui quia necessitatibus."
LOREM_B = "Possimus saepe veritatis sint nobis et quam eos. Architecto consequatur odit perferendis fuga eveniet possimus rerum cumque. Ea deleniti voluptatum deserunt voluptatibus ut non iste. Provident nam asperiores vel laboriosam omnis ducimus enim nesciunt quaerat. Minus tempora cupiditate est quod."
LOREM_C = "Voluptas beatae omnis omnis voluptas. Cum architecto ab sit ad eaque quas quia distinctio. Molestiae aperiam qui quis deleniti soluta quia qui. Dolores nostrum blanditiis libero optio id. Mollitia ad et asperiores quas saepe alias."
LEAD = "Quasi sapiente voluptates aut minima non doloribus similique quisquam. In quo expedita ipsum nostrum corrupti incidunt. Et aut eligendi ea perferendis."


def code_block(lang, lines):
    body = "".join(f'<div class="token-line"><span class="token plain">{H.escape(l)}</span></div>' for l in lines)
    return f'<pre class="prism-code language-{lang}"><code>{body}</code></pre>'


def callout():
    return '''<div class="my-8 flex rounded-3xl p-6 bg-amber-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10">
  <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" class="h-8 w-8 flex-none"><circle cx="20" cy="20" r="12" fill="#FDE68A"></circle><path d="M3 16c0 7.18 5.82 13 13 13s13-5.82 13-13S23.18 3 16 3 3 8.82 3 16Z" fill="#FEF3C7" fill-opacity="0.5" stroke="#92400E" stroke-width="2"></path><path d="M16 11v6" stroke="#92400E" stroke-width="2" stroke-linecap="round"></path><path d="M16 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="#92400E"></path></svg>
  <div class="ml-4 flex-auto">
    <p class="not-prose font-display text-xl text-amber-900 dark:text-amber-500">Oh no! Something bad happened!</p>
    <div class="prose mt-2.5 text-amber-800 dark:text-slate-300"><p>This is what a disclaimer message looks like. You might want to include inline <code>code</code> in it. Or maybe you&rsquo;ll want to include a <a href="#">link</a> in it. I don&rsquo;t think this should be a heading, but maybe it is.</p></div>
  </div>
</div>'''


def slugify(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')


# Build the standard doc article body (returns html + toc tree)
def doc_body():
    sections = [
        ("Quis vel iste dicta", [
            ("Et pariatur ab quas", "code-shell"),
            ("Natus aspernatur iste", None),
        ]),
        ("Quos porro ut molestiae", [
            ("Voluptatem quas possimus", None),
            ("Id vitae minima", None),
        ]),
        ("Vitae laborum maiores", [
            ("Corporis exercitationem", None),
            ("Reprehenderit magni", None),
        ]),
    ]
    body = [f'<p class="lead">{H.escape(LEAD)}</p>', '<hr>']
    toc = []
    for h2, subs in sections:
        h2id = slugify(h2)
        toc.append((h2, h2id, []))
        body.append(f'<h2 id="{h2id}">{H.escape(h2)}</h2>')
        body.append(f'<p>{H.escape(LOREM_A)}</p>')
        for h3, extra in subs:
            h3id = slugify(h3)
            toc[-1][2].append((h3, h3id))
            body.append(f'<h3 id="{h3id}">{H.escape(h3)}</h3>')
            body.append(f'<p>{H.escape(LOREM_A)}</p>')
            if extra == "code-shell":
                body.append(code_block("js", [
                    "/** @type {import('@tailwindlabs/lorem').ipsum} */",
                    "export default {",
                    "  lorem: 'ipsum',",
                    "  dolor: ['sit', 'amet', 'consectetur'],",
                    "  adipiscing: {",
                    "    elit: true,",
                    "  },",
                    "}",
                ]))
                body.append(f'<p>{H.escape(LOREM_B)}</p>')
            elif extra == "callout":
                body.append(callout())
            else:
                body.append(f'<p>{H.escape(LOREM_C)}</p>')
        body.append('<hr>')
    body.append(f'<p>{H.escape(LOREM_B)}</p>')
    return "".join(body), toc


# Home article body + toc
def home_body():
    body = [
        f'<p class="lead">Learn how to get CacheAdvance set up in your project in under thirty minutes or it&rsquo;s free.</p>',
        quicklinks(),
        f'<p>{H.escape(LOREM_B)}</p>',
        '<hr>',
        '<h2 id="quick-start">Quick start</h2>',
        f'<p>{H.escape(LOREM_A)}</p>',
        '<h3 id="installing-dependencies">Installing dependencies</h3>',
        f'<p>{H.escape(LOREM_A)}</p>',
        code_block("shell", ["npm install @tailwindlabs/cache-advance"]),
        f'<p>{H.escape(LOREM_B)}</p>',
        callout(),
        '<h3 id="configuring-the-library">Configuring the library</h3>',
        f'<p>{H.escape(LOREM_A)}</p>',
        callout(),
        '<hr>',
        '<h2 id="basic-usage">Basic usage</h2>',
        f'<p>{H.escape(LOREM_A)}</p>',
        '<h3 id="your-first-cache">Your first cache</h3>',
        f'<p>{H.escape(LOREM_C)}</p>',
        '<h3 id="clearing-the-cache">Clearing the cache</h3>',
        f'<p>{H.escape(LOREM_A)}</p>',
        '<h3 id="adding-middleware">Adding middleware</h3>',
        f'<p>{H.escape(LOREM_C)}</p>',
        '<hr>',
        '<h2 id="getting-help">Getting help</h2>',
        f'<p>{H.escape(LOREM_A)}</p>',
        '<h3 id="submit-an-issue">Submit an issue</h3>',
        f'<p>{H.escape(LOREM_A)}</p>',
        '<h3 id="join-the-community">Join the community</h3>',
        f'<p>{H.escape(LOREM_C)}</p>',
    ]
    toc = [
        ("Quick start", "quick-start", [("Installing dependencies", "installing-dependencies"), ("Configuring the library", "configuring-the-library")]),
        ("Basic usage", "basic-usage", [("Your first cache", "your-first-cache"), ("Clearing the cache", "clearing-the-cache"), ("Adding middleware", "adding-middleware")]),
        ("Getting help", "getting-help", [("Submit an issue", "submit-an-issue"), ("Join the community", "join-the-community")]),
    ]
    return "".join(body), toc


# ---------------------------------------------------------------- TOC
def toc_html(toc):
    out = ['<nav aria-labelledby="on-this-page-title" class="w-56" data-toc>',
           '<h2 id="on-this-page-title" class="font-display text-sm font-medium text-slate-900 dark:text-white">On this page</h2>',
           '<ol role="list" class="mt-4 space-y-3 text-sm">']
    first = True
    for h2, h2id, subs in toc:
        topcls = ('text-sky-500' if first else 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300')
        out.append(f'<li><h3><a class="{topcls}" href="#{h2id}">{H.escape(h2)}</a></h3>')
        if subs:
            out.append('<ol role="list" class="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400">')
            for s, sid in subs:
                out.append(f'<li><a class="hover:text-slate-600 dark:hover:text-slate-300" href="#{sid}">{H.escape(s)}</a></li>')
            out.append('</ol>')
        out.append('</li>')
        first = False
    out.append('</ol></nav>')
    return "".join(out)


# ---------------------------------------------------------------- PAGER
def pager(idx, from_docs):
    prev_html = ""
    next_html = ""
    if idx > 0:
        t, slug, _ = FLAT[idx - 1]
        prev_html = f'''<div><dt class="font-display text-sm font-medium text-slate-900 dark:text-white">Previous</dt><dd class="mt-1"><a class="flex items-center gap-x-1 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300" href="{href_for(slug, from_docs)}">{ICON_LINK_PREV}{H.escape(t)}</a></dd></div>'''
    if idx < len(FLAT) - 1:
        t, slug, _ = FLAT[idx + 1]
        next_html = f'''<div class="ml-auto text-right"><dt class="font-display text-sm font-medium text-slate-900 dark:text-white">Next</dt><dd class="mt-1"><a class="flex items-center gap-x-1 text-base font-semibold text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300" href="{href_for(slug, from_docs)}">{H.escape(t)}{ICON_LINK}</a></dd></div>'''
    return f'<dl class="mt-12 flex border-t border-slate-200 pt-6 dark:border-slate-800">{prev_html}{next_html}</dl>'


# ---------------------------------------------------------------- MOBILE DRAWER
def mobile_drawer(active_slug, from_docs):
    return f'''<div data-mobile-drawer class="hidden fixed inset-0 z-50 flex items-start overflow-y-auto bg-slate-900/50 backdrop-blur-sm lg:hidden">
  <div data-mobile-backdrop class="fixed inset-0"></div>
  <div class="relative min-h-full w-full max-w-xs bg-white px-4 pt-5 pb-12 sm:px-6 dark:bg-slate-900">
    <div class="flex items-center">
      <button type="button" aria-label="Close navigation" data-mobile-close>{ICON_CLOSE}</button>
      <a aria-label="Home page" href="{href_for('', from_docs)}" class="ml-6">{LOGO_DIAMOND.replace('lg:hidden','')}</a>
    </div>
    <div class="mt-5">{sidebar(active_slug, from_docs)}</div>
  </div>
</div>'''


# ---------------------------------------------------------------- PAGE ASSEMBLY
def page(title, eyebrow, h1, body_html, toc, active_slug, from_docs, idx, is_home=False):
    prefix = "../" if from_docs else ""
    home_href = href_for("", from_docs)
    hdr = header().replace("{home}", home_href)
    hero_html = hero() if is_home else ""
    return f'''<!doctype html>
<html lang="en" class="h-full antialiased __variable_f367f3 __variable_b436a8">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{H.escape(title)}</title>
<meta name="description" content="Cache every single thing your app could ever do ahead of time, so your code never even has to run at all.">
<link rel="stylesheet" href="{prefix}assets/css/syntax.css">
<script>try{{var t=localStorage.getItem("theme")||"system";var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",d);}}catch(e){{}}</script>
</head>
<body class="flex min-h-full bg-white antialiased dark:bg-slate-900">
<div class="flex w-full flex-col">
{hdr}
{hero_html}
<div class="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
  <div class="hidden lg:relative lg:block lg:flex-none">
    <div class="absolute inset-y-0 right-0 w-[50vw] bg-slate-50 dark:hidden"></div>
    <div class="absolute top-16 right-0 bottom-0 hidden h-12 w-px bg-linear-to-t from-slate-800 dark:block"></div>
    <div class="absolute top-28 right-0 bottom-0 hidden w-px bg-slate-800 dark:block"></div>
    <div class="sticky top-19 -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-x-hidden overflow-y-auto py-16 pr-8 pl-0.5 xl:w-72 xl:pr-16">
      {sidebar(active_slug, from_docs)}
    </div>
  </div>
  <div class="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pr-0 lg:pl-8 xl:px-16">
    <article>
      <header class="mb-9 space-y-1">
        <p class="font-display text-sm font-medium text-sky-500">{H.escape(eyebrow)}</p>
        <h1 class="font-display text-3xl tracking-tight text-slate-900 dark:text-white">{H.escape(h1)}</h1>
      </header>
      <div class="prose max-w-none prose-slate dark:text-slate-400 dark:prose-invert prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-34 prose-lead:text-slate-500 dark:prose-lead:text-slate-400 prose-a:font-semibold dark:prose-a:text-sky-400 dark:[--tw-prose-background:var(--color-slate-900)] prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,var(--color-sky-300))] prose-a:hover:[--tw-prose-underline-size:6px] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,var(--color-sky-800))] dark:prose-a:hover:[--tw-prose-underline-size:6px] prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10 dark:prose-hr:border-slate-800">
        {body_html}
      </div>
    </article>
    {pager(idx, from_docs)}
  </div>
  <div class="hidden xl:sticky xl:top-19 xl:-mr-6 xl:block xl:h-[calc(100vh-4.75rem)] xl:flex-none xl:overflow-y-auto xl:py-16 xl:pr-6">
    {toc_html(toc)}
  </div>
</div>
</div>
{mobile_drawer(active_slug, from_docs)}
<script src="{prefix}assets/js/syntax.js"></script>
</body>
</html>'''


def main():
    os.makedirs(os.path.join(ROOT, "docs"), exist_ok=True)
    # Home (index)
    hbody, htoc = home_body()
    home_html = page("Getting started - CacheAdvance", "Introduction", "Getting started",
                     hbody, htoc, "", False, 0, is_home=True)
    open(os.path.join(ROOT, "index.html"), "w").write(home_html)
    # Doc pages (skip idx 0 which is home)
    for idx, (title, slug, sec) in enumerate(FLAT):
        if slug == "":
            continue
        body, toc = doc_body()
        out = page(f"{title} - CacheAdvance", sec, title, body, toc, slug, True, idx)
        open(os.path.join(ROOT, "docs", slug + ".html"), "w").write(out)
    print("Generated", 1 + sum(1 for _, s, _ in FLAT if s), "pages")


if __name__ == "__main__":
    main()
