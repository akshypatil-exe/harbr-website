import os
from datetime import datetime

workspace_dir = r"c:\Users\Admin\.gemini\antigravity\scratch\second-brain\projects\harbr-website"
domain = "https://harbr.co.in"

exclude_files = ["sw.js"]

# Find all HTML files
html_files = [f for f in os.listdir(workspace_dir) if f.endswith(".html") and f not in exclude_files]

now_str = datetime.now().strftime("%Y-%m-%d")

sitemap_entries = []
for filename in html_files:
    if filename == "index.html":
        priority = "1.0"
        changefreq = "daily"
    elif filename == "privacy.html":
        priority = "0.3"
        changefreq = "monthly"
    else:
        priority = "0.8"
        changefreq = "weekly"
        
    sitemap_entries.append(f"""  <url>
    <loc>{domain}/{filename}</loc>
    <lastmod>{now_str}</lastmod>
    <changefreq>{changefreq}</changefreq>
    <priority>{priority}</priority>
  </url>""")

sitemap_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{"\n".join(sitemap_entries)}
</urlset>"""

# Write sitemap.xml
with open(os.path.join(workspace_dir, "sitemap.xml"), "w", encoding="utf-8") as f:
    f.write(sitemap_content)

# Write robots.txt
robots_content = f"""User-agent: *
Allow: /

Sitemap: {domain}/sitemap.xml
"""

with open(os.path.join(workspace_dir, "robots.txt"), "w", encoding="utf-8") as f:
    f.write(robots_content)

print("Sitemap and robots.txt generated successfully!")
