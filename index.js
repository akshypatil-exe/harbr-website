/* ==========================================
   HARBR.CO.IN INTERACTIVE ENGINE (VANILLA JS)
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Article Data Model for client-side search
    const articles = [
        {
            title: "PS6 Specs Leak: Sony Next-Gen Console Leverages Custom AI Co-Processor for Native 8K 120FPS",
            url: "ps6-specs-leak-ai-coprocessor.html",
            category: "Hardware",
            excerpt: "A massive supply-chain leak from Taiwan has exposed the core hardware layout of Sony's upcoming PlayStation 6, revealing an AMD Zen 6 APU and a dedicated AI upscaling NPU."
        },
        {
            title: "Nintendo Switch 2 Launch Title Leaks: 8 Games Unveiled by European Publisher",
            url: "switch-2-launch-titles-leak.html",
            category: "Hardware",
            excerpt: "A server leak from a major European game publisher has exposed 8 launch titles for the upcoming Nintendo Switch 2, including a new Mario Kart and Metroid Prime."
        },
        {
            title: "OpenAI Sora 2 Open Beta: Text-to-Video Access Triggers 24-Hour Server Queues",
            url: "sora-2-open-beta.html",
            category: "AI",
            excerpt: "OpenAI has unexpectedly launched the Sora 2 open beta, letting anyone generate photorealistic videos. Server loads have triggered queues exceeding 24 hours."
        },
        {
            title: "Nintendo Switch 2 Launch Title Leaks: 8 Games Unveiled by European Publisher",
            url: "switch-2-launch-titles-leak.html",
            category: "Hardware",
            excerpt: "A server leak from a major European game publisher has exposed 8 launch titles for the upcoming Nintendo Switch 2, including a new Mario Kart and Metroid Prime."
        },
        {
            title: "OpenAI Sora 2 Open Beta: Text-to-Video Access Triggers 24-Hour Server Queues",
            url: "sora-2-open-beta.html",
            category: "AI",
            excerpt: "OpenAI has unexpectedly launched the Sora 2 open beta, letting anyone generate photorealistic videos. Server loads have triggered queues exceeding 24 hours."
        },
        {
            title: "Nintendo Switch 2 Launch Title Leaks: 8 Games Unveiled by European Publisher",
            url: "switch-2-launch-titles-leak.html",
            category: "Hardware",
            excerpt: "A server leak from a major European game publisher has exposed 8 launch titles for the upcoming Nintendo Switch 2, including a new Mario Kart and Metroid Prime."
        },
        {
            title: "OpenAI Sora 2 Open Beta: Text-to-Video Access Triggers 24-Hour Server Queues",
            url: "sora-2-open-beta.html",
            category: "AI",
            excerpt: "OpenAI has unexpectedly launched the Sora 2 open beta, letting anyone generate photorealistic videos. Server loads have triggered queues exceeding 24 hours."
        },
        {
            title: "OpenAI Orion Leak: Real-Time Multimodal Search Integration Surfaces Online",
            url: "openai-orion-leak.html",
            category: "AI",
            excerpt: "Leaked screenshots of OpenAI's upcoming model Orion reveal native, multi-tab real-time search synthesis."
        },
        {
            title: "GTA 6 PC Confirmation: Rockstar Schedules Late 2026 Release",
            url: "gta-6-pc-release.html",
            category: "Gaming",
            excerpt: "Rockstar Games officially confirms the GTA 6 PC release window, introducing advanced graphics features."
        },
        {
            title: "Elden Ring Patch 1.15 Glitch: Modded Co-Op Saves Corrupting",
            url: "elden-ring-patch-glitch.html",
            category: "Gaming",
            excerpt: "A critical glitch in the latest Elden Ring update is causing save file corruptions for modded players."
        },
        {
            title: "Suno AI v4: Generative Music Reaches Studio-Quality Realism",
            url: "suno-ai.html",
            category: "AI",
            excerpt: "Suno AI v4 drops with breathtaking studio-quality vocal fidelity and structural composition."
        },
        {
            title: "GTA 6 Leaks: Source Code and Gameplay Details Surfacing Online",
            url: "gta-6-leaks.html",
            category: "Gaming",
            excerpt: "A series of massive developer build leaks has Rockstar Games working around the clock to contain source code exposure."
        },
        {
            title: "The Worst Gaming Bugs of 2026 That Broke the Internet",
            url: "gaming-bugs.html",
            category: "Gaming",
            excerpt: "From item duplication anomalies to gravity-defying physics engines, these are the glitches gamers exploited this month."
        },
        {
            title: "Nintendo Switch 2: Specs, Price, and Launch Title Rumors",
            url: "switch-2.html",
            category: "Hardware",
            excerpt: "Industry analysts predict an Nvidia Tegra-powered hybrid console launching soon. Here is a breakdown of dev kit leaks."
        },
        {
            title: "The Rise of Autonomous AI Coding Agents: Will Devs Be Obsolete?",
            url: "ai-coding.html",
            category: "Software",
            excerpt: "AI agents are coding large-scale systems autonomously. We explore what this means for junior developers entering the market."
        }
    ];

    // 2. Search Modal Overlay Toggle
    const searchOpenBtn = document.getElementById('search-open-btn');
    const searchCloseBtn = document.getElementById('search-close-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchBarInput = document.getElementById('search-bar-input');
    const searchResultsList = document.getElementById('search-results-list');

    if (searchOpenBtn && searchOverlay) {
        searchOpenBtn.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            searchBarInput.focus();
            document.body.style.overflow = 'hidden'; // Lock background scroll
        });
    }

    if (searchCloseBtn && searchOverlay) {
        searchCloseBtn.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Escape Key to close search
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // 3. Search Matching Algorithm
    if (searchBarInput && searchResultsList) {
        searchBarInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            searchResultsList.innerHTML = '';

            if (query.length === 0) {
                return;
            }

            const matched = articles.filter(art => 
                art.title.toLowerCase().includes(query) || 
                art.excerpt.toLowerCase().includes(query) ||
                art.category.toLowerCase().includes(query)
            );

            if (matched.length === 0) {
                searchResultsList.innerHTML = `
                    <div style="padding: var(--spacing-md); text-align: center; color: var(--color-text-muted);">
                        No trends found for "${e.target.value}"
                    </div>
                `;
                return;
            }

            matched.forEach(art => {
                const item = document.createElement('a');
                item.href = art.url;
                item.className = 'result-item';
                item.innerHTML = `
                    <div>
                        <div class="result-title">${art.title}</div>
                        <div class="result-meta">${art.category} &bull; ${art.excerpt.substring(0, 70)}...</div>
                    </div>
                    <span style="color: var(--color-accent-orange); font-size: 13px;">Read &rarr;</span>
                `;
                searchResultsList.appendChild(item);
            });
        });
    }

    // 4. Client-side Category Filter
    const categoryBtns = document.querySelectorAll('.category-filter-btn');
    const cards = document.querySelectorAll('.article-card');
    const heroSection = document.getElementById('featured-section');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active classes
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            // Handle hero visibility
            if (heroSection) {
                if (category === 'AI' || !category) {
                    heroSection.style.display = 'grid';
                } else {
                    heroSection.style.display = 'none';
                }
            }

            // Filter cards
            cards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (!category || cardCat === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 5. Sidebar Hot Tags Filtering
    const tagLinks = document.querySelectorAll('.tag-link');
    tagLinks.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            const tagVal = tag.getAttribute('data-tag');
            
            // Trigger matching search
            if (searchOpenBtn && searchOverlay && searchBarInput) {
                searchOpenBtn.click();
                searchBarInput.value = tagVal;
                // Dispatch input event to trigger search list
                searchBarInput.dispatchEvent(new Event('input'));
            }
        });
    });

    // 6. Mobile navigation toggle drawer
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerCloseBtn = document.getElementById('drawer-close-btn');
    const drawerBackdrop = document.getElementById('drawer-backdrop');

    if (mobileMenuBtn && mobileDrawer) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileDrawer.classList.add('active');
            document.body.style.overflow = 'hidden'; // Lock background scroll
        });
    }

    const closeDrawer = () => {
        if (mobileDrawer) {
            mobileDrawer.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    if (drawerCloseBtn) {
        drawerCloseBtn.addEventListener('click', closeDrawer);
    }
    if (drawerBackdrop) {
        drawerBackdrop.addEventListener('click', closeDrawer);
    }

    // Close drawer when category filter is clicked (on mobile)
    const drawerCategoryBtns = document.querySelectorAll('.mobile-drawer .category-filter-btn');
    drawerCategoryBtns.forEach(btn => {
        btn.addEventListener('click', closeDrawer);
    });

    // 7. Dynamic Mock Live Reaction Feed
    const reactionsList = document.getElementById('reactions-list');
    const mockUsers = [
        { name: "SpeedyGonzales", av: "SG", text: "Switch 2 price must be kept under $400 otherwise it's DOA." },
        { name: "AiCoderGuy", av: "AC", text: "Antigravity generated this site? That is actually nuts." },
        { name: "ConsolePeasant", av: "CP", text: "GTA 6 gameplay leaked online looks so realistic it is terrifying." },
        { name: "LofiLover", av: "LL", text: "Suno v4 is literally making me doubt what is real and what is synthetic." }
    ];

    if (reactionsList) {
        let userIndex = 0;
        setInterval(() => {
            if (userIndex >= mockUsers.length) return; // Cap reactions
            
            const user = mockUsers[userIndex];
            const reactionItem = document.createElement('div');
            reactionItem.className = 'reaction-item';
            // Fade-in animation styling
            reactionItem.style.opacity = '0';
            reactionItem.style.transform = 'translateY(10px)';
            reactionItem.style.transition = 'all 0.5s ease';
            
            reactionItem.innerHTML = `
                <div class="reaction-avatar">${user.av}</div>
                <div class="reaction-content">
                    <span class="reaction-user">${user.name}</span>
                    <span class="reaction-text">${user.text}</span>
                </div>
            `;
            
            reactionsList.prepend(reactionItem);
            
            // Trigger animation
            setTimeout(() => {
                reactionItem.style.opacity = '1';
                reactionItem.style.transform = 'translateY(0)';
            }, 50);

            // Remove last reaction if it exceeds 6 items to conserve space
            if (reactionsList.children.length > 6) {
                reactionsList.removeChild(reactionsList.lastChild);
            }
            
            userIndex++;
        }, 8000); // Add a new reaction every 8 seconds
    }
});
