const fs = require('fs');
const path = require('path');

// Read CLI args
const args = process.argv.slice(2);
if (args.includes('--help') || args.length === 0) {
    console.log(`
Usage: node scripts/add-article.js <article_metadata.json>

Arguments:
  <article_metadata.json>  Path to a JSON file containing the article details:
    {
      "title": "Article Title",
      "slug": "article-slug",
      "category": "AI | Gaming | Hardware | Software",
      "excerpt": "Short summary",
      "image": "assets/image-name.jpg",
      "date": "July 13, 2026",
      "readTime": "5 min read",
      "bodyHtml": "<p>First paragraph...</p><h2>Subheadline</h2><p>Second paragraph...</p><blockquote>Quote...</blockquote>"
    }
`);
    process.exit(0);
}

const jsonPath = path.resolve(args[0]);
if (!fs.existsSync(jsonPath)) {
    console.error(`Error: File not found at ${jsonPath}`);
    process.exit(1);
}

let meta;
try {
    meta = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
} catch (e) {
    console.error(`Error parsing JSON file: ${e.message}`);
    process.exit(1);
}

// Validation
const required = ['title', 'slug', 'category', 'excerpt', 'image', 'date', 'readTime', 'bodyHtml'];
for (const field of required) {
    if (!meta[field]) {
        console.error(`Error: Missing required field "${field}" in JSON metadata.`);
        process.exit(1);
    }
}

const filename = `${meta.slug}.html`;
const filepath = path.join(__dirname, '..', filename);

// Generate Subpage HTML
const subpageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${meta.title} — Harbr</title>
    <meta name="description" content="${meta.excerpt}">
    <!-- Google Fonts Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <div class="app-shell">
        <!-- HEADER -->
        <header class="main-header">
            <div class="nav-container">
                <a href="index.html" class="logo">
                    Harbr<span class="logo-accent">.co.in</span>
                </a>
                <nav class="nav-links-wrap">
                    <ul class="nav-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="index.html" class="active">${meta.category}</a></li>
                    </ul>
                </nav>
                <div class="header-actions">
                    <button class="menu-toggle" id="mobile-menu-btn" aria-label="Toggle mobile menu">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    </button>
                </div>
            </div>
        </header>

        <!-- ARTICLE MAIN BODY -->
        <main class="article-detail-wrap">
            <!-- Ad Slot Above Content -->
            <div class="ad-slot"></div>

            <article class="article-content">
                <header class="article-header">
                    <a href="index.html" class="article-back-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                        Back to Home
                    </a>
                    <span class="card-tag">${meta.category}</span>
                    <h1 class="article-headline">${meta.title}</h1>
                    <div class="featured-meta">
                        <span>By Harbr Editorial Desk</span>
                        <span>&bull;</span>
                        <span>${meta.date}</span>
                        <span>&bull;</span>
                        <span>${meta.readTime}</span>
                    </div>
                </header>

                <div class="article-banner">
                    <img src="${meta.image}" alt="${meta.title}">
                </div>

                <div class="article-body">
                    ${meta.bodyHtml}
                </div>
            </article>

            <!-- Ad Slot Below Content -->
            <div class="ad-slot"></div>
        </main>

        <!-- FOOTER -->
        <footer class="main-footer">
            <div class="footer-container">
                <div class="footer-bottom">
                    <span>&copy; 2026 Harbr.co.in. All rights reserved. Built autonomously.</span>
                    <a href="index.html">Back to Homepage</a>
                </div>
            </div>
        </footer>

        <!-- MOBILE NAVIGATION DRAWER -->
        <div class="mobile-drawer" id="mobile-drawer">
            <div class="drawer-backdrop" id="drawer-backdrop"></div>
            <div class="drawer-content">
                <div class="drawer-header">
                    <a href="index.html" class="logo">
                        Harbr<span class="logo-accent">.co.in</span>
                    </a>
                    <button class="drawer-close" id="drawer-close-btn" aria-label="Close mobile menu">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
                <div class="drawer-body">
                    <ul class="drawer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="index.html" class="active">${meta.category}</a></li>
                    </ul>
                    <!-- Ad Slot inside drawer -->
                    <div class="ad-slot"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Script connection -->
    <script src="index.js"></script>
</body>
</html>`;

fs.writeFileSync(filepath, subpageHtml, 'utf8');
console.log(`Generated subpage: ${filename}`);

// Run the meta injector script on the newly created subpage
try {
    const { execSync } = require('child_process');
    execSync('python scripts/inject_meta.py');
    console.log(`Injected SEO meta & social tags successfully!`);
} catch (e) {
    console.error(`Warning: Could not auto-run python meta injector: ${e.message}`);
}

// Update search index in index.js
const jsPath = path.join(__dirname, '..', 'index.js');
let jsContent = fs.readFileSync(jsPath, 'utf8');

const itemStr = `        {
            title: "${meta.title}",
            url: "${filename}",
            category: "${meta.category}",
            excerpt: "${meta.excerpt.replace(/"/g, '\\"')}"
        },`;

jsContent = jsContent.replace('const articles = [', `const articles = [\n${itemStr}`);
fs.writeFileSync(jsPath, jsContent, 'utf8');
console.log(`Updated search index in index.js`);

// Update index.html
const indexHtmlPath = path.join(__dirname, '..', 'index.html');
let indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

const cardHtml = `                        <!-- Card: ${meta.title} -->
                        <article class="article-card" data-category="${meta.category}" id="card-${meta.slug}">
                            <a href="${filename}" class="card-img-wrap">
                                <img src="${meta.image}" alt="${meta.title}" class="card-img">
                            </a>
                            <div class="card-body">
                                <span class="card-tag">${meta.category}</span>
                                <a href="${filename}">
                                    <h4 class="card-title">${meta.title}</h4>
                                </a>
                                <p class="card-excerpt">${meta.excerpt}</p>
                                <div class="card-footer">
                                    <span>${meta.date}</span>
                                    <span>${meta.readTime}</span>
                                </div>
                            </div>
                        </article>`;

// Find the grid container start
const gridStartPattern = '<div class="articles-grid" id="articles-grid">';
if (indexContent.includes(gridStartPattern)) {
    indexContent = indexContent.replace(gridStartPattern, `${gridStartPattern}\n${cardHtml}`);
    fs.writeFileSync(indexHtmlPath, indexContent, 'utf8');
    console.log(`Appended card to trending grid in index.html`);
} else {
    console.error(`Could not auto-insert card in index.html (grid container not found)`);
}

console.log(`Done! Article published successfully.`);
