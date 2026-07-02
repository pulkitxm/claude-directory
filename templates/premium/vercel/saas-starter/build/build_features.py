import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from gen import head, header, footer, page_hero, write

PLAY_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg>'

cards = "\n".join(
	f"""<div class="icon-card">
		<img src="assets/grid-icons/asset-{i}.svg" alt="" loading="lazy" width="40" height="40" />
		<div class="icon-card-title">Lorem ipsum dolor sit amet.</div>
		<p style="opacity:.65;font-weight:normal;font-size:1.4rem;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis error dolorem ipsa dolore facere est consequuntur aut, eos doloribus voluptate.</p>
	</div>"""
	for i in range(1, 10)
)

html = head(
	"Features — My SaaS Startup",
	"Explore the features of My SaaS Startup: a quick intro video and nine feature highlights.",
	'<link rel="stylesheet" href="css/interior.css" /><link rel="stylesheet" href="css/home.css" />',
) + f"""<body class="next-light-theme">
{header('features.html')}

{page_hero(None, "Features", "Elit aute do nisi Lorem id ea culpa sint duis eu tempor dolore elit.")}

<div class="page-body">
	<div class="wrap section">
		<h2 class="section-heading">Check out this quick introduction</h2>
		<div class="video-block">
			<div class="video-frame" id="feature-video" data-yt-id="BggrpKfqh1c">
				<img src="assets/img/video-thumb.jpg" alt="Video thumbnail" loading="lazy" />
				<div class="video-play" aria-hidden="true">{PLAY_ICON}</div>
			</div>
		</div>

		<div class="autofit-grid icon-grid">
			{cards}
		</div>
	</div>
</div>

{footer()}
<script src="js/site.js"></script>
<script src="js/video-facade.js"></script>
</body>
</html>
"""

write("features.html", html)
