document.addEventListener("DOMContentLoaded", () => {
  // --- MOCK DATA ---
  const niches = [
    "Technology",
    "Personal Finance",
    "Health & Fitness",
    "Travel",
    "Cooking",
    "DIY & Crafts",
    "Digital Marketing",
    "Sustainable Living",
    "Book Reviews",
    "Movie Buffs",
    "Gardening",
    "History",
    "Science",
    "Cryptocurrency",
    "Parenting",
    "Fashion",
    "Automotive",
    "Real Estate",
    "Mental Wellness",
    "Productivity",
  ];

  const featuredArticles = [
    {
      title: "The Future of AI in Everyday Life",
      author: "Jane Doe",
      avatar: "",
      niche: "Technology",
      img: "https://placehold.co/600x400/0056B3/FFFFFF?text=AI",
    },
    {
      title: "A Beginner's Guide to Investing in Stocks",
      author: "John Smith",
      avatar: "",
      niche: "Personal Finance",
      img: "https://placehold.co/600x400/212529/FFFFFF?text=Finance",
    },
    {
      title: "10-Minute Workouts for Busy Professionals",
      author: "Emily White",
      avatar: "",
      niche: "Health & Fitness",
      img: "https://placehold.co/600x400/FFC107/212529?text=Fitness",
    },
    {
      title: "Uncovering the Hidden Gems of Southeast Asia",
      author: "Chris Green",
      avatar: "",
      niche: "Travel",
      img: "https://placehold.co/600x400/0056B3/FFFFFF?text=Travel",
    },
    {
      title: "Mastering the Art of Sourdough Bread",
      author: "Maria Rodriguez",
      avatar: "",
      niche: "Cooking",
      img: "https://placehold.co/600x400/212529/FFFFFF?text=Food",
    },
    {
      title: "How to Build Your Own Smart Mirror",
      author: "Alex Johnson",
      avatar: "",
      niche: "DIY & Crafts",
      img: "https://placehold.co/600x400/FFC107/212529?text=DIY",
    },
  ];

  // Combine data for searching
  const searchableData = [
    ...niches.map((niche) => ({ title: niche, type: "Niche", url: "#" })),
    ...featuredArticles.map((article) => ({
      title: article.title,
      type: "Article",
      url: "#",
    })),
  ];

  // --- Feather Icons ---
  feather.replace();

  // --- DOM Elements ---
  const navbar = document.getElementById("navbar");
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const nicheGrid = document.getElementById("niche-grid");
  const articleTrack = document.getElementById("carousel-track");
  const carouselPrevBtn = document.getElementById("carousel-prev");
  const carouselNextBtn = document.getElementById("carousel-next");

  // --- HELPER FUNCTIONS ---
  const getInitials = (name) => {
    if (!name) return "";
    const names = name.split(" ");
    const initials = names.map((n) => n[0]).join("");
    return initials.slice(0, 2).toUpperCase();
  };

  const displayLiveFeatures = () => {
    const greetingEl = document.getElementById("greeting");
    const locationEl = document.getElementById("location-weather");

    if (greetingEl) {
      greetingEl.innerHTML = `<i data-feather="coffee" style="width:18px; height:18px;"></i> Good Morning`;
    }
    if (locationEl) {
      locationEl.innerHTML = `<i data-feather="map-pin" style="width:18px; height:18px;"></i> Lagos, NG | <i data-feather="cloud-drizzle" style="width:18px; height:18px;"></i> 24&deg;C`;
    }
    feather.replace(); // Re-run feather icons after adding new ones
  };

  // --- DYNAMIC CONTENT POPULATION ---

  // Populate Live Features
  displayLiveFeatures();

  // Populate Niches
  if (nicheGrid) {
    niches.forEach((niche) => {
      const nicheCard = document.createElement("div");
      nicheCard.className = "niche-card";
      nicheCard.textContent = niche;
      nicheGrid.appendChild(nicheCard);
    });
  }

  // Populate Featured Articles Carousel
  if (articleTrack) {
    featuredArticles.forEach((article) => {
      const slide = document.createElement("div");
      slide.className = "article-slide";

      const avatarContent = article.avatar
        ? `<img src="${article.avatar}" alt="${
            article.author
          }" class="author-avatar" onerror="this.outerHTML='<div class=\\'author-avatar\\'>${getInitials(
            article.author
          )}</div>'"`
        : `<div class="author-avatar">${getInitials(article.author)}</div>`;

      slide.innerHTML = `
                    <div class="article-card">
                        <img src="${article.img}" alt="${article.title}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/E9ECEF/212529?text=Image+Not+Found';">
                        <div class="article-content">
                            <p class="article-niche">${article.niche}</p>
                            <h3>${article.title}</h3>
                            <div class="author-info">
                                ${avatarContent}
                                <span class="article-author">By ${article.author}</span>
                            </div>
                        </div>
                    </div>
                `;
      articleTrack.appendChild(slide);
    });
  }

  // --- EVENT LISTENERS & LOGIC ---

  // Search Functionality (Reusable for both inputs)
  const setupSearch = (inputId, resultsId) => {
    const searchInput = document.getElementById(inputId);
    const searchResultsContainer = document.getElementById(resultsId);
    const searchResultsList = searchResultsContainer.querySelector(
      ".search-results-list"
    );

    if (!searchInput) return;

    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      if (query.length > 0) {
        const filteredData = searchableData.filter((item) =>
          item.title.toLowerCase().includes(query)
        );
        displaySearchResults(
          filteredData,
          searchResultsList,
          searchResultsContainer
        );
      } else {
        searchResultsContainer.style.display = "none";
      }
    });

    document.addEventListener("click", (e) => {
      if (
        !searchResultsContainer.contains(e.target) &&
        e.target !== searchInput
      ) {
        searchResultsContainer.style.display = "none";
      }
    });
  };

  function displaySearchResults(results, listElement, containerElement) {
    listElement.innerHTML = ""; // Clear previous results
    if (results.length === 0) {
      listElement.innerHTML = `<li class="no-results">No results found</li>`;
    } else {
      results.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `
                        <a href="${item.url}">
                            <span class="result-item-title">${item.title}</span>
                            <span class="result-item-type">${item.type}</span>
                        </a>
                    `;
        listElement.appendChild(li);
      });
    }
    containerElement.style.display = "block";
  }

  // Initialize search for both desktop and mobile
  setupSearch("search-input-desktop", "search-results-desktop");
  setupSearch("search-input-mobile", "search-results-mobile");

  // Sticky Navigation Bar
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle
  if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", () => {
      const isExpanded = mobileMenu.style.display === "block";
      mobileMenu.style.display = isExpanded ? "none" : "block";
      mobileMenuButton.innerHTML = `<i data-feather="${
        isExpanded ? "menu" : "x"
      }"></i>`;
      feather.replace();
    });
  }

  // Carousel Logic
  if (articleTrack && carouselPrevBtn && carouselNextBtn) {
    const slides = document.querySelectorAll(".article-slide");
    if (slides.length > 0) {
      let currentIndex = 0;
      const totalSlides = slides.length;

      function getVisibleSlides() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
      }

      function updateCarousel() {
        const visibleSlides = getVisibleSlides();
        const maxIndex = totalSlides - visibleSlides;
        currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

        const slideWidth = slides[0].clientWidth;
        articleTrack.style.transform = `translateX(-${
          currentIndex * slideWidth
        }px)`;

        carouselPrevBtn.disabled = currentIndex === 0;
        carouselNextBtn.disabled = currentIndex === maxIndex;
      }

      carouselNextBtn.addEventListener("click", () => {
        currentIndex++;
        updateCarousel();
      });

      carouselPrevBtn.addEventListener("click", () => {
        currentIndex--;
        updateCarousel();
      });

      window.addEventListener("resize", updateCarousel);
      updateCarousel();
    }
  }
});

