// ===================================
// SMOOTH SCROLL FOR NAVIGATION
// ===================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ===================================
// MOBILE NAVIGATION TOGGLE
// ===================================
const navToggle = document.querySelector(".nav__toggle");
const navMenu = document.querySelector(".nav__menu");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });
}

// ===================================
// SCROLL REVEAL ANIMATION
// ===================================
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  const revealPoint = 100;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add("active");
    }
  });
};

// Initial check on page load
revealOnScroll();

// Check on scroll
window.addEventListener("scroll", revealOnScroll);

// ===================================
// INTERSECTION OBSERVER (Alternative)
// ===================================
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

revealElements.forEach((element) => {
  observer.observe(element);
});

// ===================================
// SMOOTH SCROLL INDICATOR
// ===================================
const scrollIndicator = document.querySelector(".hero__scroll");

if (scrollIndicator) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      scrollIndicator.style.opacity = "0";
    } else {
      scrollIndicator.style.opacity = "1";
    }
  });
}

// ===================================
// PROJECT LINK HANDLER (ZippyCart)
// ===================================
function openTwoLinks(event) {
  event.preventDefault();

  const backendURL = "https://zippy-cart-backend.onrender.com";
  const frontendURL = "https://zippy-cart-frontend.onrender.com";

  // Open backend
  window.open(backendURL, "_blank");

  // Open frontend after 3 seconds
  setTimeout(() => {
    window.open(frontendURL, "_blank");
  }, 3000);
}

// ===================================
// TYPING EFFECT FOR CODE BLOCK
// ===================================
const codeLines = document.querySelectorAll(".code__line");

const typeCode = () => {
  codeLines.forEach((line, index) => {
    setTimeout(() => {
      line.style.opacity = "1";
    }, index * 150);
  });
};

// Start typing animation when hero is visible
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        typeCode();
        heroObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

const heroSection = document.querySelector(".hero");
if (heroSection) {
  heroObserver.observe(heroSection);
}

// ===================================
// CURSOR EFFECT (Optional Enhancement)
// ===================================
const createCursorEffect = () => {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  const interactiveElements = document.querySelectorAll(
    "a, button, .tech-card, .project-card",
  );

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });
};

// Uncomment to enable custom cursor
// createCursorEffect();

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
let ticking = false;

const optimizedScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      revealOnScroll();
      ticking = false;
    });
    ticking = true;
  }
};

window.addEventListener("scroll", optimizedScroll, { passive: true });

// ===================================
// PRELOADER (Optional)
// ===================================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
