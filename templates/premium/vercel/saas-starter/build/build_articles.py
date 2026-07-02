import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from gen import head, header, footer, write

TWITTER = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 0 0 2.048-2.578 9.3 9.3 0 0 1-2.958 1.13 4.66 4.66 0 0 0-7.938 4.25 13.229 13.229 0 0 1-9.602-4.868c-.4.69-.63 1.49-.63 2.342A4.66 4.66 0 0 0 3.96 9.824a4.647 4.647 0 0 1-2.11-.583v.06a4.66 4.66 0 0 0 3.737 4.568 4.692 4.692 0 0 1-2.104.08 4.661 4.661 0 0 0 4.352 3.234 9.348 9.348 0 0 1-5.786 1.995 9.5 9.5 0 0 1-1.112-.065 13.175 13.175 0 0 0 7.14 2.093c8.57 0 13.255-7.098 13.255-13.254 0-.202-.005-.403-.014-.602a9.47 9.47 0 0 0 2.322-2.41z"></path></svg>'
FACEBOOK = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>'
LINKEDIN = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452z"></path></svg>'

FULL_ARTICLE_BODY = """
<h2>History, purpose and usage</h2>
<p>Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:</p>
<blockquote>
	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
	<cite>&mdash; Cicero</cite>
</blockquote>
<h2>Hedonist roots</h2>
<p>Until recently, the prevailing view assumed lorem ipsum was born as a nonsense text. &ldquo;It's not Latin, though it looks like it, and it actually says nothing,&rdquo; Before &amp; After magazine answered a curious reader, &ldquo;its 'words' loosely approximate the frequency with which letters occur in English, which is why at a glance it looks pretty real.&rdquo;</p>
<p><strong>As Cicero would put it, &ldquo;Um, not so fast.&rdquo;</strong></p>
<p>The placeholder text, beginning with the line &ldquo;Lorem ipsum dolor sit amet, consectetur,&rdquo; looks like Latin because in its youth, centuries ago, it was Latin.</p>
<p>Richard McClintock, a Latin scholar from <strong>Hampden-Sydney College</strong>, is credited with discovering the source behind the ubiquitous filler text. In seeing a sample of lorem ipsum, his interest was piqued by consectetur&mdash;a genuine, albeit rare, Latin word. Consulting a Latin dictionary led McClintock to a passage from De Finibus Bonorum et Malorum (&ldquo;On the Extremes of Good and Evil&rdquo;), a first-century B.C. text from the Roman philosopher Cicero.</p>
<p>In particular, the garbled words of lorem ipsum bear an unmistakable resemblance to sections 1.10.32&ndash;33 of Cicero's work, with the most notable passage excerpted below:</p>
<blockquote>
	Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
</blockquote>
<p>McClintock's eye for detail certainly helped narrow the whereabouts of lorem ipsum's origin, however, the &ldquo;how and when&rdquo; still remain something of a mystery, with competing theories and timelines.</p>
<h2>Creation timelines for the standard lorem ipsum passage vary, with some citing the 15th century and others the 20th.</h2>
<p>So how did the classical Latin become so incoherent? According to McClintock, a 15th century typesetter likely scrambled part of Cicero's De Finibus in order to provide placeholder text to mockup various fonts for a type specimen book.</p>
<ul>
	<li>It's difficult to find examples of lorem ipsum in use before Letraset made it popular as a dummy text in the 1960s, although McClintock says he remembers coming across the lorem ipsum passage in a book of old metal type samples. So far he hasn't relocated where he once saw the passage, but the popularity of Cicero in the 15th century supports the theory that the filler text has been used for centuries.</li>
	<li>And anyways, as Cecil Adams reasoned, &ldquo;[Do you really] think graphic arts supply houses were hiring classics scholars in the 1960s?&rdquo; Perhaps. But it seems reasonable to imagine there was a version in use far before the age of Letraset.</li>
</ul>
<p>McClintock wrote to Before &amp; After to explain his discovery:</p>
<img src="assets/posts/test-article/example-image-2.png" alt="" loading="lazy" width="1200" height="675" />
<p>It's difficult to find examples of lorem ipsum in use before Letraset made it popular as a dummy text in the 1960s, although McClintock says he remembers coming across the lorem ipsum passage in a book of old metal type samples. So far he hasn't relocated where he once saw the passage, but the popularity of Cicero in the 15th century supports the theory that the filler text has been used for centuries.</p>
<p>And anyways, as Cecil Adams reasoned, &ldquo;[Do you really] think graphic arts supply houses were hiring classics scholars in the 1960s?&rdquo; Perhaps. But it seems reasonable to imagine there was a version in use far before the age of Letraset.</p>
<pre><code>process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin =&gt; {
  inputString += inputStdin;
});

process.stdin.on('end', _ =&gt; {
  inputString = inputString.trim().split('\\n').map(string =&gt; {
    return string.trim();
  });

  main();
});</code></pre>
"""

SHORT_ARTICLE_BODY = """
<h2>Overview</h2>
<p>Aliquip fugiat nostrud nulla eu exercitation culpa officia irure dolor elit eu duis. Irure exercitation ex ad id anim fugiat mollit magna et. Proident magna exercitation amet irure est anim dolore. Sint reprehenderit ullamco aliquip dolor veniam exercitation excepteur ex cupidatat aute fugiat dolore.</p>
<p>Nostrud pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate.</p>
<blockquote>
	Culpa proident adipisicing id nulla nisi laboris ex. Officia dolore magna officia sunt anim officia.
	<cite>&mdash; Anonymous</cite>
</blockquote>
<h2>Details</h2>
<p>Duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex. Officia dolore magna officia sunt anim officia. Aliqua ut commodo dolore ipsum sunt duis do eu.</p>
<ul>
	<li>Ipsum culpa amet dolor labore dolore sunt ipsum.</li>
	<li>Nostrud dolor pariatur dolore Lorem in aliqua sunt aliqua excepteur laboris.</li>
	<li>Ut et voluptate consequat elit amet minim.</li>
</ul>
"""

articles = [
	("blog-test-article.html", "Officia culpa tempor eu dolore dolor esse ex incididunt ea ullamco mollit occaecat cupidatat irure.", "31st July 2021", "3 min read", FULL_ARTICLE_BODY),
	("blog-test-article-2.html", "Officiaaa culpa tempor eu dolore dolor esse ex incididunt ea ullamco mollit occaecat cupidatat irure.", "2nd August 2021", "2 min read", SHORT_ARTICLE_BODY),
	("blog-test-article-3.html", "Officia culpa tempor eu dolore dolor esse ex incididunt ea ullamco mollit occaecat cupidatat irure.", "5th August 2021", "2 min read", SHORT_ARTICLE_BODY),
	("blog-test-article-4.html", "Officia culpa tempor eu dolore dolor esse ex incididunt ea ullamco mollit occaecat cupidatat irure.", "9th August 2021", "2 min read", SHORT_ARTICLE_BODY),
	("blog-test-article-5.html", "Officia culpa tempor eu dolore dolor esse ex incididunt ea ullamco mollit occaecat cupidatat irure.", "14th August 2021", "2 min read", SHORT_ARTICLE_BODY),
	("blog-test-article-6.html", "Officia culpa tempor eu dolore dolor esse ex incididunt ea ullamco mollit occaecat cupidatat irure.", "20th August 2021", "2 min read", SHORT_ARTICLE_BODY),
]

for slug, title, date, read, body in articles:
	html = head(
		title.replace("&hellip;", "...") + " — My SaaS Startup Blog",
		"Blog article on the My SaaS Startup blog.",
		'<link rel="stylesheet" href="css/interior.css" />',
	) + f"""<body class="next-light-theme">
{header('blog.html')}

<div class="page-body">
	<div class="wrap section">
		<div class="article-social">
			<a href="https://facebook.com" aria-label="Share on Facebook" target="_blank" rel="noopener">{FACEBOOK}</a>
			<a href="https://twitter.com" aria-label="Share on Twitter" target="_blank" rel="noopener">{TWITTER}</a>
			<a href="https://linkedin.com" aria-label="Share on LinkedIn" target="_blank" rel="noopener">{LINKEDIN}</a>
		</div>
		<div class="article-body">
			<div class="article-hero">
				<img src="assets/posts/test-article/example-image-1.jpeg" alt="Article cover" loading="eager" />
			</div>
			<h1 class="article-title">{title}</h1>
			<div class="article-meta">{date} &middot; {read}</div>
			<div class="article-content">
				{body}
			</div>
		</div>
	</div>
</div>

{footer()}
<script src="js/site.js"></script>
</body>
</html>
"""
	write(slug, html)
