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
        
    # Extract Info
    title_match = re.search(r"<title>(.*?)</title>", content)
    title = title_match.group(1) if title_match else "Harbr — Viral Tech & Gaming Trends"
    
    desc_match = re.search(r'<meta name="description" content="(.*?)">', content)
    desc = desc_match.group(1) if desc_match else ""
    
    clean_title = title.replace(" — Harbr", "").replace(" — Harbr.co.in", "")
    
    adsense_code = """    <!-- Google AdSense (Optimized Lazy Load) -->
    <script>
    (function() {
        var adsenseLoaded = false;
        function loadAdSense() {
            if (adsenseLoaded) return;
            adsenseLoaded = true;
            var script = document.createElement('script');
            script.async = true;
            script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1650980062663955';
            script.crossOrigin = 'anonymous';
            document.head.appendChild(script);
        }
        window.addEventListener('scroll', loadAdSense, { passive: true });
        window.addEventListener('touchstart', loadAdSense, { passive: true });
        window.addEventListener('mousemove', loadAdSense, { passive: true });
        setTimeout(loadAdSense, 3500);
    })();
    </script>"""
    
    if filename == "index.html":
        og_type = "website"
        image_url = "assets/suno-ai.webp"
        preload_tag = f'    <!-- LCP Image Preload -->\n    <link rel="preload" as="image" href="{image_url}">'
        meta_tags = adsense_code + "\n\n" + """    <!-- Google Search Console -->
    <meta name="google-site-verification" content="71PlSlqtdaI7WUmF42mCcrYleUqsWwIPKIEyYzZid8c" />""" + "\n\n" + preload_tag + "\n\n" + f"""    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://harbr.co.in/">
    <meta property="og:title" content="{clean_title}">
    <meta property="og:description" content="{desc}">
    <meta property="og:image" content="https://harbr.co.in/{image_url}">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://harbr.co.in/">
    <meta name="twitter:title" content="{clean_title}">
    <meta name="twitter:description" content="{desc}">
    <meta name="twitter:image" content="https://harbr.co.in/{image_url}">"""
    else:
        og_type = "article"
        img_match = re.search(r'<div class="article-banner">\s*<img src="(.*?)"', content)
        image_url = img_match.group(1) if img_match else "assets/suno-ai.webp"
        
        cat_match = re.search(r'<span class="card-tag.*?">(.*?)</span>', content)
        category = cat_match.group(1) if cat_match else "Tech"
        
        date_match = re.search(r'<span>&bull;</span>\s*<span>(.*?)</span>', content)
        if not date_match:
            date_match = re.search(r'<span>(July \d+, 2026)</span>', content)
        date = date_match.group(1) if date_match else "July 13, 2026"
        
        preload_tag = f'    <!-- LCP Image Preload -->\n    <link rel="preload" as="image" href="{image_url}">'
        meta_tags = adsense_code + "\n\n" + preload_tag + "\n\n" + f"""    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://harbr.co.in/{filename}">
    <meta property="og:title" content="{clean_title}">
    <meta property="og:description" content="{desc}">
    <meta property="og:image" content="https://harbr.co.in/{image_url}">
    <meta property="article:published_time" content="2026-07-13">
    <meta property="article:section" content="{category}">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://harbr.co.in/{filename}">
    <meta name="twitter:title" content="{clean_title}">
    <meta name="twitter:description" content="{desc}">
    <meta name="twitter:image" content="https://harbr.co.in/{image_url}">

    <!-- JSON-LD Schema -->
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": "{clean_title}",
      "image": [
        "https://harbr.co.in/{image_url}"
      ],
      "datePublished": "2026-07-13T08:00:00+05:30",
      "dateModified": "2026-07-13T08:00:00+05:30",
      "author": {{
        "@type": "Person",
        "name": "Harbr Editorial Desk",
        "url": "https://harbr.co.in/"
      }},
      "publisher": {{
        "@type": "Organization",
        "name": "Harbr",
        "logo": {{
          "@type": "ImageObject",
          "url": "https://harbr.co.in/assets/suno-ai.webp"
        }}
      }},
      "description": "{desc}"
    }}
    </script>"""

    # Inject Meta Tags Block
    injection_block = f"""    <!-- OG Meta Injected Start -->
{meta_tags}
    <!-- OG Meta Injected End -->"""

    block_pattern = r'(\s*<!-- OG Meta Injected Start -->.*?<!-- OG Meta Injected End -->)'
    if re.search(block_pattern, content, flags=re.DOTALL):
        content = re.sub(block_pattern, "\n" + injection_block, content, flags=re.DOTALL)
    else:
        desc_pattern = r'(<meta name="description" content=".*?">)'
        content = re.sub(desc_pattern, r'\1\n' + injection_block, content, count=1)
        
    # Inject Social Share Block
    if filename != "index.html":
        share_block = f"""            <!-- Social Share Injected Start -->
            <div class="social-share-wrap">
                <span class="share-title">Share this story:</span>
                <div class="share-buttons">
                    <a href="https://api.whatsapp.com/send?text=Check%20this%20out:%20{clean_title}%20https://harbr.co.in/{filename}" target="_blank" class="share-btn whatsapp" aria-label="Share on WhatsApp">
                        <svg width="14" height="14" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.114-2.906-6.99C16.657 1.875 14.18 1.84 11.55 1.84c-5.436 0-9.86 4.42-9.864 9.864-.001 1.73.488 3.415 1.417 4.887L2.098 21.8l5.349-1.401zM18.06 14.7c-.3-.15-1.785-.88-2.067-.98-.28-.1-.49-.15-.69.15-.2.3-.78 1-.96 1.21-.18.21-.36.24-.66.09-1.1-.55-1.9-1.1-2.65-2.4-.2-.35-.2-.7.1-.98.27-.27.6-.7.9-.9.1-.15.15-.27.2-.45.05-.18-.02-.34-.1-.49-.07-.15-.69-1.66-.95-2.28-.25-.6-.5-.5-.69-.5-.18-.01-.4-.01-.61-.01-.21 0-.55.08-.84.4-.3.32-1.14 1.12-1.14 2.73s1.17 3.17 1.33 3.39c.16.21 2.3 3.52 5.58 4.93.78.33 1.39.53 1.86.68.78.25 1.5.21 2.06.13.62-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.12-.27-.2-.58-.35z"/></svg>
                        WhatsApp
                    </a>
                    <a href="https://twitter.com/intent/tweet?text={clean_title}&url=https://harbr.co.in/{filename}" target="_blank" class="share-btn twitter" aria-label="Share on X">
                        <svg width="14" height="14" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        Share
                    </a>
                    <a href="https://www.reddit.com/submit?url=https://harbr.co.in/{filename}&title={clean_title}" target="_blank" class="share-btn reddit" aria-label="Share on Reddit">
                        <svg width="14" height="14" viewBox="0 0 24 24"><path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.29-1.72l1.35-4.24 3.71.79c.05.89.79 1.6 1.7 1.6 1.02 0 1.85-.83 1.85-1.85S20.15 2.5 19.13 2.5c-.83 0-1.54.55-1.77 1.29l-4.07-.87c-.3-.06-.59.12-.68.4l-1.61 5.07c-2.52.04-4.8.68-6.49 1.71C3.96 9.35 3.05 8.87 2.07 8.87c-1.65 0-3 1.35-3 3 0 1.12.63 2.1 1.56 2.6-.1.35-.15.71-.15 1.08 0 3.79 4.39 6.88 9.77 6.88s9.77-3.09 9.77-6.88c0-.37-.05-.73-.15-1.08.92-.5 1.55-1.48 1.55-2.6zm-18.86 3c0-1 .81-1.81 1.81-1.81.99 0 1.81.81 1.81 1.81 0 1-.82 1.81-1.81 1.81-.99-.01-1.81-.82-1.81-1.81zm11.16 3.63c-1.79 1.79-5.18 1.79-6.97 0-.19-.19-.19-.51 0-.7.19-.19.51-.19.7 0 1.41 1.41 4.14 1.41 5.56 0 .19-.19.51-.19.7 0 .2.19.2.51-.01.7zm-.11-1.82c-.99 0-1.81-.81-1.81-1.81 0-1 .81-1.81 1.81-1.81.99 0 1.81.81 1.81 1.81 0 1-.82 1.81-1.81 1.81z"/></svg>
                        Reddit
                    </a>
                </div>
            </div>
            <!-- Social Share Injected End -->"""

        share_pattern = r'(\s*<!-- Social Share Injected Start -->.*?<!-- Social Share Injected End -->)'
        if re.search(share_pattern, content, flags=re.DOTALL):
            content = re.sub(share_pattern, "\n" + share_block, content, flags=re.DOTALL)
        else:
            body_end_pattern = r'(</div>\s*</article>)'
            content = re.sub(body_end_pattern, "\n" + share_block + r"\n\1", content, count=1)
        
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
        
print("All files processed!")
