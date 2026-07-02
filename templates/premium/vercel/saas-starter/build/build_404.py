import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from gen import head, header, footer, write

html = head(
	"404 — Page Not Found — My SaaS Startup",
	"The page you're looking for doesn't exist.",
	'<link rel="stylesheet" href="css/interior.css" /><link rel="stylesheet" href="css/home.css" />',
) + """<body class="next-light-theme">
""" + header('') + """
<div class="page-body">
	<div class="wrap notfound">
		<img src="assets/img/404-illustration.svg" alt="Illustration of a person next to a warning sign" width="400" height="322" loading="eager" />
		<h1>404</h1>
		<p>Oh, that's unfortunate! Page not found &#128532;</p>
	</div>
</div>

""" + footer() + """
<script src="js/site.js"></script>
</body>
</html>
"""

write("404.html", html)
write("sign-up.html", html)
