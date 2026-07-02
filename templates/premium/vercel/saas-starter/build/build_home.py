import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from gen import head, header, footer, write, TWITTER_ICON

PREV_ARROW = '<svg viewBox="0 0 27 44" fill="currentColor" aria-hidden="true"><path d="M0,22L22,0l2.1,2.1L4.2,22l19.9,19.9L22,44L0,22L0,22L0,22z"></path></svg>'
NEXT_ARROW = '<svg viewBox="0 0 27 44" fill="currentColor" aria-hidden="true"><path d="M27,22L27,22L5,44l-2.1-2.1L22.8,22L2.9,2.1L5,0L27,22L27,22z"></path></svg>'

partners = "\n".join(
	f'<a href="#" tabindex="-1"><img src="assets/partners/logoipsum-logo-{i}.svg" alt="Partner logo {i}" loading="lazy" width="120" height="30" /></a>'
	for i in range(1, 8)
)

icon_cards = "\n".join(
	f"""<div class="icon-card" data-reveal>
		<img src="assets/grid-icons/asset-{i}.svg" alt="" loading="lazy" width="40" height="40" />
		<div class="icon-card-title">Lorem ipsum dolor sit amet.</div>
		<p style="opacity:.65;font-weight:normal;font-size:1.4rem;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis error dolorem ipsa dolore facere est consequuntur aut, eos doloribus voluptate.</p>
	</div>"""
	for i in range(1, 10)
)

card_titles = [
	"Officia culpa tempor eu dolore dolor esse ex incididunt ea ullamco mollit&hellip;",
	"Officiaaa culpa tempor eu dolore dolor esse ex incididunt ea ullamco mollit&hellip;",
	"Officia culpa tempor eu dolore dolor esse ex incididunt ea ullamco mollit&hellip;",
	"Officia culpa tempor eu dolore dolor esse ex incididunt ea ullamco mollit&hellip;",
	"Officia culpa tempor eu dolore dolor esse ex incididunt ea ullamco mollit&hellip;",
	"Officia culpa tempor eu dolore dolor esse ex incididunt ea ullamco mollit&hellip;",
]
simple_cards = "\n".join(
	f"""<div class="simple-card" data-reveal>
		<div>{t}</div>
		<p>Aliquip fugiat nostrud nulla eu exercitation culpa officia irure dolor elit eu duis. Irure exercitation ex ad id anim fugiat mollit magna et. Proident magna exercitation amet irure est anim dolore. Sint reprehenderit ullamco aliquip dolor veniam exercitation excepteur ex cupidatat aute fugiat dolore.</p>
	</div>"""
	for t in card_titles[:6]
)

testimonials = [
	("author-photo-1.jpeg", "“Since I invested in saas product I made over 100,000 dollars profits. It really saves me time and effort. saas product is exactly what our business has been lacking.”", "Marjorie Morgan", "Chief Chad Officer"),
	("author-photo-2.jpeg", "“Really good. I am so pleased with this product. I didn't even need training.”", "Clyde Edwards", "Very Serious Man"),
	("author-photo-3.jpeg", "“It's really wonderful. I use saas product often. Thank You! Saas product has really helped our business.”", "Jimmy Hunter", "Sigma Male University Graduate"),
]

testimonial_slides = "\n".join(
	f"""<div class="testimonial-slide" data-slide="{i}" style="display:{'flex' if i == 0 else 'none'};flex-direction:column;align-items:center;">
		<p class="testimonial-quote">{quote}</p>
		<div class="testimonial-person">
			<div class="testimonial-avatar"><img src="assets/testimonials/{img}" alt="{name}" loading="lazy" width="60" height="60" /></div>
			<div class="testimonial-name">{name}</div>
			<div class="testimonial-role">{role}</div>
		</div>
	</div>"""
	for i, (img, quote, name, role) in enumerate(testimonials)
)
dots = "\n".join(f'<span class="{"active" if i == 0 else ""}" data-dot="{i}"></span>' for i in range(len(testimonials)))

html = head(
	"My SaaS Startup — Make Your Life Easier With Our SaaS",
	"Clone of the Next.js SaaS Starter marketing landing page: hero, partners, feature rows, dark CTA bands, signing-in feature grid, and testimonials.",
	'<link rel="stylesheet" href="css/home.css" />',
) + f"""<body class="next-light-theme">
{header('index.html')}

<section class="hero">
	<div class="wrap hero-row">
		<div class="hero-copy">
			<span class="eyebrow">the coolest, saas product you have ever seen</span>
			<h1 class="hero-heading">Make your life easier with our SaaS</h1>
			<p class="hero-lede">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, tempora qui. Explicabo voluptate iure ipsum molestias repudiandae perspiciatis nostrum praesentium, unde pariatur tempora magni rem. Necessitatibus facilis obcaecati ratione.</p>
			<div class="hero-actions">
				<a href="#" class="btn">Subscribe to the newsletter <span>&rarr;</span></a>
				<a href="features.html" class="btn-outline">Features <span>&rarr;</span></a>
			</div>
		</div>
		<div class="hero-art">
			<img src="assets/demo-illustration-1.svg" alt="Illustration of a person working on a laptop" width="450" height="294" loading="eager" />
		</div>
	</div>
</section>

<section class="partners">
	<div class="wrap">
		<h3 class="partners-label">official partners with</h3>
		<div class="partners-track">
			{partners}
		</div>
	</div>
</section>

<div class="body-sections">
	<section class="wrap">
		<div class="feature-row" data-reveal>
			<div class="feature-row-copy">
				<span class="eyebrow">sit amet gogo</span>
				<h2 class="feature-row-heading">Lorem ipsum dolor sit amet consectetur.</h2>
				<p class="feature-row-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quidem error incidunt a doloremque voluptatem porro inventore voluptate quo deleniti animi laboriosam. Possimus ullam velit rem itaque consectetur, in distinctio? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta repellendus quia quos dolore quaerat impedit, nostrum reprehenderit, voluptatum, quibusdam eum nesciunt id suscipit quod quasi quis esse dolore.</p>
				<a href="help-center.html" class="feature-row-link">Possimus ullam velit rem itaque consectetur, in distinctio?</a>
			</div>
			<div class="feature-row-art">
				<img src="assets/demo-illustration-2.svg" alt="" width="600" height="400" loading="lazy" />
			</div>
		</div>
	</section>

	<section class="wrap">
		<div class="feature-row reverse" data-reveal>
			<div class="feature-row-copy">
				<span class="eyebrow">lorem ipsum</span>
				<h2 class="feature-row-heading">Lorem ipsum dolor sit.</h2>
				<p class="feature-row-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quidem error incidunt a doloremque voluptatem porro inventore voluptate quo deleniti animi laboriosam. Possimus ullam velit rem itaque consectetur, in distinctio?</p>
				<ul class="feature-row-checklist">
					<li>Professional point 1</li>
					<li>Professional remark 2</li>
					<li>Professional feature 3</li>
				</ul>
			</div>
			<div class="feature-row-art">
				<img src="assets/demo-illustration-1.svg" alt="" width="600" height="400" loading="lazy" />
			</div>
		</div>
	</section>

	<section class="cta-band" data-reveal>
		<span class="eyebrow" style="color:rgb(var(--textSecondary));">Lorem ipsum dolor sit amet</span>
		<h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus delectus?</h2>
		<div class="cta-band-actions">
			<a href="#" class="btn">Subscribe to the newsletter <span>&rarr;</span></a>
			<a href="features.html" class="btn-outline bordered">Features <span>&rarr;</span></a>
		</div>
	</section>

	<section class="signin-section">
		<div class="wrap">
			<div class="signin-heading-wrap">
				<span class="eyebrow">features</span>
				<h2>What are you signing in for?</h2>
			</div>
			<div class="signin-split">
				<div class="signin-mock" data-reveal>
					<img src="assets/demo-illustration-3.png" alt="Product screenshot mockup" loading="lazy" width="1200" height="675" />
				</div>
				<div class="signin-features" data-reveal>
					<div class="signin-feature">
						<span class="signin-feature-dot red"></span>
						<div class="signin-feature-copy">
							<h4>Find relevant media contacts - multiline title</h4>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quidem ipsam ratione dicta quis cupiditate consequuntur laborum ducimus iusto velit.</p>
						</div>
					</div>
					<div class="signin-feature">
						<span class="signin-feature-dot blue"></span>
						<div class="signin-feature-copy">
							<h4>Another amazing feature</h4>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quidem ipsam ratione dicta quis cupiditate consequuntur laborum ducimus iusto velit.</p>
						</div>
					</div>
					<div class="signin-feature">
						<span class="signin-feature-dot green"></span>
						<div class="signin-feature-copy">
							<h4>And yet&hellip; another truly fascinating feature</h4>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam quidem ipsam ratione dicta quis cupiditate consequuntur laborum ducimus iusto velit.</p>
						</div>
					</div>
				</div>
			</div>

			<div class="autofit-grid icon-grid">
				{icon_cards}
			</div>
		</div>
	</section>

	<section class="wrap testimonials">
		<div class="testimonials-track">
			{testimonial_slides}
			<div class="testimonial-nav">
				<button type="button" aria-label="Previous testimonial" data-testimonial-prev>{PREV_ARROW}</button>
				<div class="testimonial-dots">{dots}</div>
				<button type="button" aria-label="Next testimonial" data-testimonial-next>{NEXT_ARROW}</button>
			</div>
		</div>
	</section>

	<section class="wrap">
		<div class="signin-heading-wrap">
			<span class="eyebrow">features</span>
			<h2>What are you signing in for?</h2>
		</div>
		<div class="autofit-grid card-grid">
			{simple_cards}
		</div>
	</section>
</div>

{footer()}
<script src="js/site.js"></script>
<script src="js/testimonials.js"></script>
</body>
</html>
"""

write("index.html", html)
