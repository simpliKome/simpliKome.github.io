// Navbar scroll transition
const nav = document.querySelector("#main-nav");
const backToTopButton = document.querySelector("#back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("solid");
  } else {
    nav.classList.remove("solid");
  }

  // Back to top button visibility
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

function goTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// Featured carousel logic
let carouselIndex = 0;
const track = document.getElementById("carousel-track");
// Calculate maxIndex based on actual children for dynamic content
const updateCarouselBounds = () => {
  return track ? track.children.length - 1 : 0;
};
let maxIndex = updateCarouselBounds();

function moveCarousel(dir) {
  const cardWidth = track.children[0]
    ? track.children[0].offsetWidth + 16
    : 320; // 300px card + 16px margin-right
  carouselIndex = Math.min(Math.max(carouselIndex + dir, 0), maxIndex);
  track.style.transform = `translateX(-${carouselIndex * cardWidth}px)`;
}

// Recalculate maxIndex on window resize to ensure correct carousel movement
window.addEventListener("resize", () => {
  maxIndex = updateCarouselBounds();
  moveCarousel(0); // Adjust position without changing index
});

// Infinite Scroll: load more articles
const articleGrid = document.getElementById("article-grid");
const spinner = document.getElementById("load-spinner");
let page = 1;
let loading = false;
let articlesData = [
  // Initial articles (matching the ones in HTML)
  {
    img: "https://placehold.co/300x180/FFC107/212529?text=Latest+1",
    badge: "HEALTH",
    title: "Wellness in the Modern Age",
    meta: "By Alex Green · June 8 · 6 min read",
    snippet:
      "Discover new habits that promote long-term health and balance in daily life.",
  },
  {
    img: "https://placehold.co/300x180/0056B3/FFFFFF?text=Latest+2",
    badge: "SCIENCE",
    title: "The Mysteries of Dark Matter",
    meta: "By Dr. S. Patel · June 7 · 9 min read",
    snippet:
      "An exploration into the elusive substance that holds galaxies together.",
  },
  {
    img: "https://placehold.co/300x180/212529/F8F9FA?text=Latest+3",
    badge: "FOOD",
    title: "Future of Sustainable Agriculture",
    meta: "By M. Sharma · June 5 · 7 min read",
    snippet:
      "Innovative farming techniques aimed at feeding the world responsibly.",
  },
  // Add more articles for infinite scroll to demonstrate
  {
    img: "https://placehold.co/300x180/F8F9FA/212529?text=Article+4",
    badge: "TECHNOLOGY",
    title: "Quantum Computing Explained",
    meta: "By Tech Guru · June 1 · 12 min read",
    snippet:
      "A beginner's guide to the complex world of quantum computing and its future.",
  },
  {
    img: "https://placehold.co/300x180/6C757D/F8F9FA?text=Article+5",
    badge: "TRAVEL",
    title: "Hidden Gems of Southeast Asia",
    meta: "By Adventurer A · May 25 · 8 min read",
    snippet:
      "Uncover unique travel experiences off the beaten path in vibrant Asia.",
  },
  {
    img: "https://placehold.co/300x180/0056B3/FFFFFF?text=Article+6",
    badge: "BUSINESS",
    title: "Startup Funding in 2025",
    meta: "By Investor B · May 18 · 10 min read",
    snippet:
      "Trends and strategies for securing venture capital in the current market.",
  },
  {
    img: "https://placehold.co/300x180/FFC107/212529?text=Article+7",
    badge: "HISTORY",
    title: "The Fall of Ancient Empires",
    meta: "By Historian C · May 10 · 14 min read",
    snippet:
      "A deep dive into the factors that led to the decline of historical civilizations.",
  },
  {
    img: "https://placehold.co/300x180/212529/F8F9FA?text=Article+8",
    badge: "CULTURE",
    title: "Reviving Traditional Crafts",
    meta: "By Artisan D · May 3 · 6 min read",
    snippet:
      "Exploring efforts to preserve and promote artisanal skills globally.",
  },
];
let loadedArticleCount = 3; // Initially 3 articles are loaded in HTML

function loadMore() {
  if (loading || loadedArticleCount >= articlesData.length) {
    spinner.style.display = "none"; // Hide spinner if no more articles
    return;
  }

  loading = true;
  spinner.style.display = "block";

  setTimeout(() => {
    const articlesToAdd = articlesData.slice(
      loadedArticleCount,
      loadedArticleCount + 3
    ); // Load 3 more
    if (articlesToAdd.length > 0) {
      articlesToAdd.forEach((article) => {
        const card = document.createElement("div");
        card.className = "article-card";
        card.innerHTML = `
         <img src="${article.img}" alt="${article.title}">
         <span class="badge">${article.badge}</span>
         <h3>${article.title}</h3>
         <div class="meta">${article.meta}</div>
         <p>${article.snippet}</p>
         <div class="actions">
           <button class="icon-btn" onclick="toggleSave(this)">⭐</button>
           <button class="icon-btn">🔗</button>
         </div>`;
        articleGrid.append(card);
      });
      loadedArticleCount += articlesToAdd.length;
    } else {
      // No more articles to load, indicate end of content
      const endMessage = document.createElement("p");
      endMessage.textContent =
        "You've reached the end of our articles for now!";
      endMessage.style.textAlign = "center";
      endMessage.style.marginTop = "2rem";
      endMessage.style.color = "var(--color-muted)";
      articleGrid.after(endMessage); // Add after the grid
    }
    spinner.style.display = "none";
    loading = false;
    page++; // Keep track of pages for consistent logic if needed for external API
  }, 1200);
}

// Initial load on content load and subsequent loads on scroll
window.addEventListener("scroll", () => {
  // Check if user is near the bottom of the page
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
    // Adjusted threshold
    loadMore();
  }
});

// Save toggle with animation
function toggleSave(btn) {
  btn.classList.toggle("saved");
}

// Newsletter subscribe
function subscribeNewsletter(evt) {
  evt.preventDefault();
  const msg = document.getElementById("newsletter-message");
  const emailInput = evt.target.querySelector('input[type="email"]');
  if (emailInput.value) {
    msg.textContent = "Thanks for subscribing to our newsletter!";
    msg.style.color = "var(--color-primary)"; // Primary color for success
    evt.target.reset();
  } else {
    msg.textContent = "Please enter a valid email address.";
    msg.style.color = "#DC3545"; // Red for error
  }
}

