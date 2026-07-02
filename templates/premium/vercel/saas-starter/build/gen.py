#!/usr/bin/env python3
"""Static-site generator for the Next.js SaaS Starter clone.

Not part of the shipped runtime artifact — it's a build-time convenience so
the shared header/footer/theme markup stays DRY across 14 output pages. The
output is plain, self-contained HTML/CSS/JS with no build step required to
run it.
"""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

LOGO_SVG = open(os.path.join(ROOT, "assets/img/logo.svg")).read().strip()

MOON_ICON = '<svg width="24" height="24" viewBox="0 0 24 24" focusable="false"><path fill="currentColor" d="M21.4,13.7C20.6,13.9,19.8,14,19,14c-5,0-9-4-9-9c0-0.8,0.1-1.6,0.3-2.4c0.1-0.3,0-0.7-0.3-1 c-0.3-0.3-0.6-0.4-1-0.3C4.3,2.7,1,7.1,1,12c0,6.1,4.9,11,11,11c4.9,0,9.3-3.3,10.6-8.1c0.1-0.3,0-0.7-0.3-1 C22.1,13.7,21.7,13.6,21.4,13.7z"></path></svg>'
CLOSE_ICON = '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path fill="currentColor" d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.439A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"></path></svg>'
HAMBURGER_ICON = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path></svg>'
TWITTER_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 0 0 2.048-2.578 9.3 9.3 0 0 1-2.958 1.13 4.66 4.66 0 0 0-7.938 4.25 13.229 13.229 0 0 1-9.602-4.868c-.4.69-.63 1.49-.63 2.342A4.66 4.66 0 0 0 3.96 9.824a4.647 4.647 0 0 1-2.11-.583v.06a4.66 4.66 0 0 0 3.737 4.568 4.692 4.692 0 0 1-2.104.08 4.661 4.661 0 0 0 4.352 3.234 9.348 9.348 0 0 1-5.786 1.995 9.5 9.5 0 0 1-1.112-.065 13.175 13.175 0 0 0 7.14 2.093c8.57 0 13.255-7.098 13.255-13.254 0-.202-.005-.403-.014-.602a9.47 9.47 0 0 0 2.322-2.41z"></path></svg>'
FACEBOOK_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>'
LINKEDIN_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z"></path></svg>'

NAV_ITEMS = [
	("features.html", "Awesome SaaS Features"),
	("pricing.html", "Pricing"),
	("contact.html", "Contact"),
]

FOOTER_COLS = [
	("Company", [("privacy-policy.html", "Privacy Policy"), ("cookies-policy.html", "Cookies Policy")]),
	("Product", [("features.html", "Features"), ("404.html", "Something"), ("404.html", "Something else"), ("404.html", "And something else")]),
	("Knowledge", [("blog.html", "Blog"), ("contact.html", "Contact"), ("404.html", "FAQ"), ("404.html", "Help Center")]),
	("Something", [("404.html", "Features2"), ("404.html", "Something2"), ("404.html", "Something else2"), ("404.html", "And something else2")]),
]


def head(title, description, extra_css="", canonical=""):
	return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{title}</title>
<meta name="description" content="{description}" />
<link rel="icon" href="assets/favicon.ico" />
<link rel="preconnect" href="assets/fonts" />
<link rel="stylesheet" href="css/tokens.css" />
<link rel="stylesheet" href="css/layout.css" />
{extra_css}
</head>
"""


def header(active_href):
	nav_html = "\n".join(
		f'<li><a href="{href}" class="{"active" if href == active_href else ""}">{label}</a></li>'
		for href, label in NAV_ITEMS
	)
	drawer_nav = "\n".join(
		f'<li><a href="{href}">{label}</a></li>' for href, label in NAV_ITEMS
	)
	return f"""<script src="js/theme-boot.js"></script>
<div class="my-drawer drawer-closed" aria-hidden="true" id="mobile-drawer">
	<div class="my-drawer-container">
		<button type="button" class="close-icon" aria-label="Close" data-drawer-close>{CLOSE_ICON}</button>
		<ul>
			{drawer_nav}
			<li><a href="sign-up.html">Sign up</a></li>
		</ul>
	</div>
</div>
<header class="navbar">
	<div class="navbar-inner">
		<a href="index.html" class="navbar-logo" aria-label="Logoipsum home">{LOGO_SVG}</a>
		<ul class="navbar-links">
			{nav_html}
		</ul>
		<a href="sign-up.html" class="btn navbar-signup" style="width:auto;">Sign up</a>
		<button type="button" class="navbar-toggle" aria-label="Toggle theme" data-theme-toggle>{MOON_ICON}</button>
		<button type="button" aria-label="Toggle menu" class="navbar-burger" data-drawer-open>{HAMBURGER_ICON}</button>
	</div>
</header>
"""


def footer():
	cols_html = ""
	for title, links in FOOTER_COLS:
		links_html = "\n".join(f'<a href="{href}">{label}</a>' for href, label in links)
		cols_html += f'<div class="footer-col"><h4>{title}</h4>{links_html}</div>\n'
	return f"""<footer class="footer">
	<div class="footer-wave" aria-hidden="true"><svg viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none"><path fill="currentColor" d="M0,32 C240,90 480,90 720,50 C960,10 1200,10 1440,45 L1440,80 L0,80 Z"></path></svg></div>
	<div class="wrap footer-top">
		<h2 class="footer-cta-heading">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus delectus?</h2>
		<div class="footer-cta-actions">
			<a href="#" class="btn">Subscribe to the newsletter <span>&rarr;</span></a>
			<a href="features.html" class="btn-outline bordered">Features <span>&rarr;</span></a>
		</div>
	</div>
	<div class="wrap">
		<div class="footer-links">
			{cols_html}
		</div>
		<div class="footer-bottom">
			<div class="footer-social">
				<a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener">{TWITTER_ICON}</a>
				<a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener">{FACEBOOK_ICON}</a>
				<a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener">{LINKEDIN_ICON}</a>
			</div>
			<div class="footer-copy">&copy; Copyright 2021 My Saas Startup</div>
		</div>
	</div>
</footer>
"""


def page_hero(eyebrow_social, title, subtitle):
	return f"""<div class="page-hero">
	<div class="page-hero-social">
		<a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener" style="color:rgb(var(--textSecondary));">{TWITTER_ICON}</a>
		<a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener" style="color:rgb(var(--textSecondary));">{FACEBOOK_ICON}</a>
		<a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener" style="color:rgb(var(--textSecondary));">{LINKEDIN_ICON}</a>
	</div>
	<h1>{title}</h1>
	<p>{subtitle}</p>
</div>
"""


def write(path, content):
	with open(os.path.join(ROOT, path), "w") as f:
		f.write(content)
	print("wrote", path)
