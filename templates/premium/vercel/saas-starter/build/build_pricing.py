import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from gen import head, header, footer, page_hero, write

plans = [
	("Free", "Give us a try for free", "0", ["1 seat", "1 active project", "Ulimited viewers", "10 blocks"], False),
	("Starter", "Best for individual desginers", "29", ["1 seat", "3 active project", "Ulimited viewers", "100 blocks", "CSV Downloader", "Password protection"], True),
	("Premium", "Get your team together", "79", ["10 seat", "10 active project", "Ulimited viewers", "Ulimited blocks", "CSV Downloader", "Password protection", "Customization"], False),
]

cards_html = ""
for name, tagline, price, features, featured in plans:
	feats = "\n".join(f"<li>{f}</li>" for f in features)
	cls = "pricing-card featured" if featured else "pricing-card"
	cards_html += f"""<div class="{cls}">
		<h3>{name}</h3>
		<div class="tagline">{tagline}</div>
		<div class="price">${price}<span>/month</span></div>
		<ul>{feats}</ul>
		<a href="sign-up.html" class="btn">Get started</a>
	</div>
	"""

faqs = [
	("Eiusmod eu laboris qui minim incididunt et id in elit veniam Lorem nulla ullamco.",
	 "Voluptate ad aliquip in adipisicing incididunt officia. Aliqua consectetur id commodo fugiat sunt dolor minim. Aliqua ut deserunt sit irure tempor esse labore elit commodo pariatur in nisi minim culpa. Exercitation eu in mollit tempor cillum excepteur adipisicing cillum do et dolor est deserunt dolor. Deserunt reprehenderit nulla commodo quis et consectetur deserunt ea eiusmod reprehenderit aliqua."),
	("Minim eiusmod aliquip in ea mollit fugiat ullamco veniam enim sint exercitation.",
	 "Nulla anim incididunt cillum sit consequat cillum voluptate mollit anim. Consectetur adipisicing elit ipsum dolor sit amet consectetur reprehenderit officia. Cupidatat aute id ex reprehenderit qui commodo."),
	("Commodo officia dolore anim occaecat.",
	 "Sint irure aute do occaecat magna. Duis aliquip ea commodo consequat sit nostrud proident laboris cillum id nisi."),
	("Irure Lorem proident esse enim.",
	 "Culpa velit ea eiusmod ut occaecat. Excepteur sit amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint."),
	("Ea quis consequat sunt sint aute pariatur aliquip minim voluptate.",
	 "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit."),
]
faq_html = ""
for i, (q, a) in enumerate(faqs):
	faq_html += f"""<div class="faq-item" data-accordion-item>
		<div class="faq-question" data-accordion-trigger>
			<h3 style="font-size:1.7rem;margin:0;">{q}</h3>
			<svg class="faq-chevron" data-accordion-chevron viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
		</div>
		<div class="faq-panel" data-accordion-panel>
			<div class="faq-panel-inner">{a}</div>
		</div>
	</div>
	"""

html = head(
	"Pricing — My SaaS Startup",
	"Flexible pricing for agile teams: Free, Starter, and Premium plans plus frequently asked questions.",
	'<link rel="stylesheet" href="css/interior.css" />',
) + f"""<body class="next-light-theme">
{header('pricing.html')}

{page_hero(None, "Pricing", "Cupidatat et reprehenderit ullamco aute ullamco anim tempor.")}

<div class="page-body">
	<div class="wrap section">
		<h2 class="section-heading">Flexible pricing for agile teams</h2>
		<div class="pricing-grid">
			{cards_html}
		</div>
	</div>

	<div class="wrap section">
		<h2 class="section-heading">Frequently asked question</h2>
		<div class="faq-list" data-accordion>
			{faq_html}
		</div>
	</div>
</div>

{footer()}
<script src="js/site.js"></script>
</body>
</html>
"""

write("pricing.html", html)
