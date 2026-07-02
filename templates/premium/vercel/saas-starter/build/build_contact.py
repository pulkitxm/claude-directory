import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from gen import head, header, footer, page_hero, write

html = head(
	"Contact — My SaaS Startup",
	"Get in touch with My SaaS Startup support via email or the contact form.",
	'<link rel="stylesheet" href="css/interior.css" />',
) + """<body class="next-light-theme">
""" + header('contact.html') + page_hero(None, "Contact", "Minim sint aliquip nostrud excepteur cupidatat amet do laborum exercitation cupidatat ea proident.") + """
<div class="page-body">
	<div class="wrap section">
		<div class="contact-grid">
			<div class="contact-info">
				<h3>Contact Info</h3>
				<p>Email: <a href="mailto:support@myawesomesaas.com" style="color:rgb(var(--primary));">support@myawesomesaas.com</a></p>
			</div>
			<form class="contact-form" data-contact-form onsubmit="return false;">
				<input type="text" placeholder="Your Name" required />
				<input type="email" placeholder="Your Email" required />
				<textarea placeholder="Enter Your Message..." required></textarea>
				<button type="submit" class="btn">Send Message</button>
			</form>
		</div>
	</div>
</div>
""" + footer() + """
<script src="js/site.js"></script>
</body>
</html>
"""

write("contact.html", html)
