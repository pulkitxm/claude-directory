import subprocess, sys, os

scripts = [
	"build_home.py",
	"build_features.py",
	"build_pricing.py",
	"build_contact.py",
	"build_blog.py",
	"build_articles.py",
	"build_legal.py",
	"build_404.py",
]

here = os.path.dirname(os.path.abspath(__file__))
for s in scripts:
	print("=== " + s + " ===")
	subprocess.run([sys.executable, os.path.join(here, s)], check=True, cwd=here)
