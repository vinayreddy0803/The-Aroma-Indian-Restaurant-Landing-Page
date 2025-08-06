// DOM Elements
const navbar = document.getElementById("navbar")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const menuGrid = document.getElementById("menu-grid")
const filterBtns = document.querySelectorAll(".filter-btn")
const reservationForm = document.getElementById("reservation-form")
const modal = document.getElementById("confirmation-modal")

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Mobile menu toggle
hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  hamburger.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Menu filtering functionality
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((b) => b.classList.remove("active"))
    // Add active class to clicked button
    btn.classList.add("active")

    const filter = btn.getAttribute("data-filter")
    const menuItems = document.querySelectorAll(".menu-item")

    menuItems.forEach((item) => {
      const category = item.getAttribute("data-category")

      if (filter === "all") {
        item.classList.remove("hidden")
      } else if (category.includes(filter)) {
        item.classList.remove("hidden")
      } else {
        item.classList.add("hidden")
      }
    })
  })
})

// Form validation and submission
reservationForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form data
  const formData = new FormData(reservationForm)
  const name = formData.get("name").trim()
  const contact = formData.get("contact").trim()
  const date = formData.get("date")
  const time = formData.get("time")
  const guests = formData.get("guests")

  // Validation
  if (!name || !contact || !date || !time || !guests) {
    showNotification("Please fill in all fields", "error")
    return
  }

  // Validate phone number (basic validation)
  const phoneRegex = /^[+]?[\d\s\-$$$$]{10,}$/
  if (!phoneRegex.test(contact)) {
    showNotification("Please enter a valid contact number", "error")
    return
  }

  // Validate date (not in the past)
  const selectedDate = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (selectedDate < today) {
    showNotification("Please select a future date", "error")
    return
  }

  // Show confirmation modal
  showModal()

  // Reset form
  reservationForm.reset()
})

// Show notification function
function showNotification(message, type = "success") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
        <span>${message}</span>
    `

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#4CAF50" : "#f44336"};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Modal functions
function showModal() {
  modal.classList.add("show")
  document.body.style.overflow = "hidden"
}

function closeModal() {
  modal.classList.remove("show")
  document.body.style.overflow = "auto"
}

// Close modal when clicking outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal()
  }
})

// Scroll to section function
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    const offsetTop = section.offsetTop - 80
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Gallery image hover effects
document.querySelectorAll(".gallery-item").forEach((item) => {
  item.addEventListener("mouseenter", () => {
    item.style.transform = "scale(1.05)"
  })

  item.addEventListener("mouseleave", () => {
    item.style.transform = "scale(1)"
  })
})

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".menu-item, .gallery-item, .about-text, .about-image").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Set minimum date for reservation form
const dateInput = document.getElementById("date")
if (dateInput) {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  dateInput.min = tomorrow.toISOString().split("T")[0]
}

// Add loading effect for images
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("load", () => {
    img.style.opacity = "1"
  })

  img.addEventListener("error", () => {
    img.style.opacity = "0.5"
    console.log("Image failed to load:", img.src)
  })
})

// Preload critical images
const criticalImages = ["/elegant-indian-restaurant.png"]

criticalImages.forEach((src) => {
  const img = new Image()
  img.src = src
})

// Add smooth reveal animation for sections
const revealElements = document.querySelectorAll("section")
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed")
      }
    })
  },
  { threshold: 0.15 },
)

revealElements.forEach((el) => {
  revealObserver.observe(el)
})

// Add CSS for reveal animation
const style = document.createElement("style")
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero {
        opacity: 1;
        transform: none;
    }
`
document.head.appendChild(style)

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Set initial active states
  document.querySelector('.filter-btn[data-filter="all"]').classList.add("active")

  // Add revealed class to hero section immediately
  document.querySelector(".hero").classList.add("revealed")

  console.log("The Aroma Restaurant website loaded successfully!")
})