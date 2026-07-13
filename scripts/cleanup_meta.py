import os
import re

workspace_dir = r"c:\Users\Admin\.gemini\antigravity\scratch\second-brain\projects\harbr-website"

html_files = [
    "index.html",
    "ai-coding.html",
    "gaming-bugs.html",
    "gta-6-leaks.html",
    "suno-ai.html",
    "switch-2.html",
    "openai-orion-leak.html",
    "gta-6-pc-release.html",
    "elden-ring-patch-glitch.html",
    "sora-2-open-beta.html",
    "switch-2-launch-titles-leak.html"
]

for filename in html_files:
    filepath = os.path.join(workspace_dir, filename)
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Strip any blocks of meta tags
    # Remove comments and nested tags
    content = re.sub(r'<!-- Open Graph / Facebook -->.*?(\n\s*\n|\n\s*<!--|\n\s*</head>)', '\n', content, flags=re.DOTALL)
    content = re.sub(r'<!-- Twitter -->.*?(\n\s*\n|\n\s*<!--|\n\s*</head>)', '\n', content, flags=re.DOTALL)
    content = re.sub(r'<!-- JSON-LD Schema -->.*?(\n\s*\n|\n\s*<!--|\n\s*</head>)', '\n', content, flags=re.DOTALL)
    
    # Remove individual tags if they are left over
    content = re.sub(r'^\s*<meta property="og:.*?>\s*\n', '', content, flags=re.MULTILINE)
    content = re.sub(r'^\s*<meta name="twitter:.*?>\s*\n', '', content, flags=re.MULTILINE)
    content = re.sub(r'^\s*<script type="application/ld\+json">.*?</script>\s*\n', '', content, flags=re.DOTALL|re.MULTILINE)
    
    # Remove duplicate meta description lines if any (keep only the first one)
    desc_matches = list(re.finditer(r'<meta name="description" content=".*?">', content))
    if len(desc_matches) > 1:
        first_desc = desc_matches[0].group(0)
        content = content.replace(first_desc, "##META_DESC##", 1)
        content = re.sub(r'<meta name="description" content=".*?">', '', content)
        content = content.replace("##META_DESC##", first_desc)

    # Clean up empty lines
    content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
        
print("Cleanup done!")
