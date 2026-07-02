import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from gen import head, header, footer, page_hero, write

posts = [
	("blog-test-article.html", "Officia culpa tempor eu dolore dolor esse ex incididunt ea ullamco mollit&hellip;", "Aliquip fugiat nostrud nulla eu exercitation culpa officia irure dolor elit eu duis. Irure exercitation ex ad id anim fugiat mollit magna et. Proident magna exercitation amet irure est anim dolore. Sint reprehenderit&hellip;"),
	("blog-test-article-2.html", "Officiaaa culpa tempor eu dolore dolor esse ex incididunt ea ullamco mollit&hellip;", "Aliquip fdassadadassugiat nostrud nulla eu exercitation culpa officia irure dolor elit eu duis. Irure exercitation ex ad id anim fugiat mollit magna et. Proident magna exercitation amet irure est anim dolore. Sint reprehender&hellip;"),
	("blog-test-article-3.html", "Officia culpa tempor eu dolore dolor esse ex incididunt ea ullamco mollit&hellip;", "Aliquip fugiat nostrud nulla eu exercitation culpa officia irure dolor elit eu duis. Irure exercitation ex ad id anim fugiat mollit magna et. Proident magna exercitation amet irure est anim dolore. Sint reprehenderit&hellip;"),
	("blog-test-article-4.html", "Officia culpa tempor eu dolore dolor esse ex incididunt ea ullamco mollit&hellip;", "Aliquip fugiat nostrud nulla eu exercitation culpa officia irure dolor elit eu duis. Irure exercitation ex ad id anim fugiat mollit magna et. Proident magna exercitation amet irure est anim dolore. Sint reprehenderit&hellip;"),
	("blog-test-article-5.html", "Officia culpa tempor eu dolore dolor esse ex incididunt ea ullamco mollit&hellip;", "Aliquip fugiat nostrud nulla eu exercitation culpa officia irure dolor elit eu duis. Irure exercitation ex ad id anim fugiat mollit magna et. Proident magna exercitation amet irure est anim dolore. Sint reprehenderit&hellip;"),
	("blog-test-article-6.html", "Officia culpa tempor eu dolore dolor esse ex incididunt ea ullamco mollit&hellip;", "Aliquip fugiat nostrud nulla eu exercitation culpa officia irure dolor elit eu duis. Irure exercitation ex ad id anim fugiat mollit magna et. Proident magna exercitation amet irure est anim dolore. Sint reprehenderit&hellip;"),
]

cards = "\n".join(
	f"""<a class="blog-card" href="{href}">
		<div class="blog-card-img"><img src="assets/posts/test-article/example-image-1.jpeg" alt="" loading="lazy" /></div>
		<div class="blog-card-body">
			<h3>{title}</h3>
			<p>{excerpt}</p>
		</div>
	</a>"""
	for href, title, excerpt in posts
)

TWITTER = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 0 0 2.048-2.578 9.3 9.3 0 0 1-2.958 1.13 4.66 4.66 0 0 0-7.938 4.25 13.229 13.229 0 0 1-9.602-4.868c-.4.69-.63 1.49-.63 2.342A4.66 4.66 0 0 0 3.96 9.824a4.647 4.647 0 0 1-2.11-.583v.06a4.66 4.66 0 0 0 3.737 4.568 4.692 4.692 0 0 1-2.104.08 4.661 4.661 0 0 0 4.352 3.234 9.348 9.348 0 0 1-5.786 1.995 9.5 9.5 0 0 1-1.112-.065 13.175 13.175 0 0 0 7.14 2.093c8.57 0 13.255-7.098 13.255-13.254 0-.202-.005-.403-.014-.602a9.47 9.47 0 0 0 2.322-2.41z"></path></svg>'
FACEBOOK = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>'

html = head(
	"Blog — My SaaS Startup",
	"Read the My SaaS Startup blog for product tips, updates, and stories.",
	'<link rel="stylesheet" href="css/interior.css" />',
) + f"""<body class="next-light-theme">
{header('blog.html')}

<div class="page-hero">
	<div class="page-hero-social">
		<a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener" style="color:rgb(var(--textSecondary));">{TWITTER}</a>
		<a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener" style="color:rgb(var(--textSecondary));">{FACEBOOK}</a>
	</div>
	<h1>My SaaS Startup Blog</h1>
	<p style="max-width:70%;">Culpa duis reprehenderit in ex amet cillum nulla do in enim commodo. Sunt ut excepteur et est aliqua anim ea excepteur fugiat voluptate. Fugiat exercitation dolore laboris do quis consectetur eiusmod tempor consequat.</p>
</div>

<div class="page-body">
	<div class="wrap section">
		<div class="blog-grid">
			{cards}
		</div>
	</div>
</div>

{footer()}
<script src="js/site.js"></script>
</body>
</html>
"""

write("blog.html", html)
