import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from gen import head, header, footer, page_hero, write

TABLE_ROWS = [
	["Dolor do culpa exceptuer proident anim duis deserunt nulla dolor et tempor.", "Eu enim qui eu nostrud minim.", "Proident officia velit ut in est culpa non adipisicing excepteur exercitation aliqua.", "Duis proident adipisicing magna aute sint adipisicing sit deserunt minim eu."],
	["Nisi cillum culpa adipisicing cillum.", "Proident nulla cillum aute occaecat mollit labore.", "Non ex eiusmod tempor cupidatat consequat anim et veniam nisi sint fugiat pariatur.", "Consectetur nisi culpa non ex ipsum deserunt magna est ea magna."],
	["Officia laboris anim voluptate incididunt mollit mollit.", "Adipisicing est consectetur id esse nostrud culpa non exercitation cupidatat pariatur dolore amet.", "Dolor ex est ad ut adipisicing irure nulla esse aliqua nisi ipsum id aliqua.", "Proident anim consequat enim sit pariatur."],
	["Sint anim sint deserunt in elit ad Lorem dolore tempor.", "Consequat nostrud irure anim ex do dolor amet ea dolore incididunt esse id cupidatat.", "Eu nostrud occaecat incididunt deserunt Lorem ad Lorem elit.", "Id ullamco in ad adipisicing magna elit ea minim sunt esse adipisicing."],
	["Ea adipisicing ut nulla aute dolore quis in reprehenderit qui ipsum Lorem magna.", "Irure ex dolore consequat mollit Lorem nostrud velit irure.", "Dolore minim ad esse occaecat.", "Qui id tempor culpa."],
]

def table():
	rows = "".join("<tr>" + "".join(f"<td>{c}</td>" for c in row) + "</tr>" for row in TABLE_ROWS)
	return f"""<table class="legal-table">
		<thead><tr><th>Column 1</th><th>Column 2</th><th>Column 3</th><th>Column 4</th></tr></thead>
		<tbody>{rows}</tbody>
	</table>"""


LEGAL_BODY = f"""
<p>Deserunt culpa consequat non nostrud esse cillum pariatur velit consequat. Est fugiat voluptate deserunt sint culpa sint. Laboris irure veniam quis eu voluptate. Nulla ad proident ex proident excepteur. Dolor cillum Lorem occaecat enim veniam ullamco eiusmod consequat ad dolore exercitation Lorem in eu quis magna. Esse cillum aliquip et eu dolore consectetur. Exercitation id non quis ex qui in dolore et proident. Laborum nisi commodo fugiat mollit et. Aliqua duis non nostrud ea velit incididunt. Laboris nostrud incididunt laborum enim eu dolor. Culpa anim sit ea. Labore laborum et aute ex est exceptuer labore voluptate deserunt. Quis exceptuer consequat aliqua reprehenderit voluptate non laboris ipsum. Quis excepteur nostrud est enim duis exercitation cupidatat nulla pariatur culpa consequat sint. Dolor nostrud nostrud aute dolore. Excepteur reprehenderit aliquip amet excepteur. Aliqua commodo nulla dolor ex nisi labore reprehenderit sint aliqua in minim. Lorem amet non veniam ut incididunt reprehenderit aliquip mollit do ullamco pariatur.</p>
<h3>Reprehenderit aliquip minim commodo magna occaecat dolore labore mollit mollit do esse deserunt. Aliquip eu reprehenderit aute</h3>
<ul>
	<li>Ipsum cillum amet aliqua laboris ut excepteur enim laborum veniam mollit officia esse. Anim et voluptate qui quis cillum labore ipsum incididunt consequat est ea exercitation et commodo.</li>
	<li>Consequat amet officia sit non id occaecat occaecat duis irure.</li>
	<li>Nostrud dolor pariatur dolore Lorem in aliqua sunt aliqua excepteur laboris exercitation proident officia.</li>
	<li>Ut et voluptate consequat elit amet minim.</li>
	<li>Reprehenderit et consequat ea minim est proident eu incididunt non laboris proident culpa consequat sint.</li>
</ul>
{table()}
"""

pages = [
	("privacy-policy.html", "Privacy policy", "Privacy Policy for My SaaS Startup: what data we collect, how we use it, and your rights."),
	("cookies-policy.html", "Cookies policy", "Cookies Policy for My SaaS Startup: how and why we use cookies on our site."),
]

for slug, title, desc in pages:
	html = head(
		f"{title} — My SaaS Startup",
		desc,
		'<link rel="stylesheet" href="css/interior.css" />',
	) + f"""<body class="next-light-theme">
{header('')}

{page_hero(None, title, "")}

<div class="page-body">
	<div class="wrap section">
		<div class="legal-content">
			{LEGAL_BODY}
		</div>
	</div>
</div>

{footer()}
<script src="js/site.js"></script>
</body>
</html>
"""
	write(slug, html)
