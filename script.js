// Mobile Navigation
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      hamburger.classList.toggle("active")
    })
  }

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      hamburger.classList.remove("active")
    })
  })
})

// Animated Counter for Impact Stats
function animateCounter(element, target) {
  let current = 0
  const increment = target / 100
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    element.textContent = Math.floor(current).toLocaleString()
  }, 20)
}

// Initialize counters when they come into view
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll(".stat-number")
      statNumbers.forEach((stat) => {
        const target = Number.parseInt(stat.getAttribute("data-target"))
        animateCounter(stat, target)
      })
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

const impactTracker = document.querySelector(".impact-tracker")
if (impactTracker) {
  observer.observe(impactTracker)
}

// Donation Form Functionality
document.addEventListener("DOMContentLoaded", () => {
  // Donation tabs
  const tabBtns = document.querySelectorAll(".tab-btn")
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      tabBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // Amount buttons
  const amountBtns = document.querySelectorAll(".amount-btn")
  const customAmount = document.querySelector(".custom-amount")
  const amountInput = document.querySelector("#amount")

  amountBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      amountBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      if (this.classList.contains("custom")) {
        customAmount.style.display = "block"
        customAmount.focus()
      } else {
        customAmount.style.display = "none"
        const amount = this.getAttribute("data-amount")
        if (amountInput) {
          amountInput.value = amount
        }
      }
    })
  })

  if (customAmount) {
    customAmount.addEventListener("input", function () {
      if (amountInput) {
        amountInput.value = this.value
      }
    })
  }

  // Donation form submission
  const donationForm = document.querySelector(".donation-form")
  if (donationForm) {
    donationForm.addEventListener("submit", (e) => {
      e.preventDefault()
      alert("Thank you for your donation! This is a demo - no actual payment was processed.")
    })
  }
})

// Volunteer Form Multi-step
document.addEventListener("DOMContentLoaded", () => {
  const volunteerForm = document.querySelector(".volunteer-form")
  if (!volunteerForm) return

  const steps = document.querySelectorAll(".form-step")
  const progressSteps = document.querySelectorAll(".progress-step")
  const nextBtns = document.querySelectorAll(".next-step")
  const prevBtns = document.querySelectorAll(".prev-step")
  let currentStep = 1

  function showStep(stepNumber) {
    steps.forEach((step) => step.classList.remove("active"))
    progressSteps.forEach((step) => step.classList.remove("active"))

    document.querySelector(`[data-step="${stepNumber}"]`).classList.add("active")
    progressSteps[stepNumber - 1].classList.add("active")

    // Mark previous steps as completed
    for (let i = 0; i < stepNumber - 1; i++) {
      progressSteps[i].classList.add("completed")
    }
  }

  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep < 3) {
        currentStep++
        showStep(currentStep)

        if (currentStep === 3) {
          updateSummary()
        }
      }
    })
  })

  prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep > 1) {
        currentStep--
        showStep(currentStep)
      }
    })
  })

  function updateSummary() {
    const firstName = document.querySelector("#firstName").value
    const lastName = document.querySelector("#lastName").value
    const email = document.querySelector("#email").value
    const role = document.querySelector("#role").value
    const availability = Array.from(document.querySelectorAll('input[name="availability"]:checked'))
      .map((cb) => cb.value)
      .join(", ")

    const summaryContent = document.querySelector("#summary-content")
    summaryContent.innerHTML = `
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Preferred Role:</strong> ${role}</p>
            <p><strong>Availability:</strong> ${availability}</p>
        `
  }

  // Apply buttons for specific roles
  const applyBtns = document.querySelectorAll(".apply-btn")
  applyBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const role = this.getAttribute("data-role")
      const roleSelect = document.querySelector("#role")
      if (roleSelect) {
        roleSelect.value = role
      }
      document.querySelector("#signup").scrollIntoView({ behavior: "smooth" })
    })
  })

  volunteerForm.addEventListener("submit", (e) => {
    e.preventDefault()
    alert("Thank you for your volunteer application! We will contact you soon.")
  })
})

// Events Calendar
document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.querySelector("#calendar")
  if (!calendar) return

  const currentMonthElement = document.querySelector("#currentMonth")
  const prevBtn = document.querySelector("#prevMonth")
  const nextBtn = document.querySelector("#nextMonth")

  const currentDate = new Date()
  const events = {
    "2025-03-15": "Community Fundraising Walk",
    "2025-03-22": "Volunteer Appreciation Dinner",
    "2025-04-05": "Skills Workshop: Job Readiness",
  }

  function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    calendar.innerHTML = ""

    // Add day headers
    const dayHeaders = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    dayHeaders.forEach((day) => {
      const dayHeader = document.createElement("div")
      dayHeader.className = "calendar-day-header"
      dayHeader.textContent = day
      dayHeader.style.fontWeight = "bold"
      dayHeader.style.backgroundColor = "var(--secondary-color)"
      dayHeader.style.color = "var(--white)"
      calendar.appendChild(dayHeader)
    })

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const emptyDay = document.createElement("div")
      emptyDay.className = "calendar-day empty"
      calendar.appendChild(emptyDay)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement("div")
      dayElement.className = "calendar-day"
      dayElement.textContent = day

      const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      if (events[dateString]) {
        dayElement.classList.add("has-event")
        dayElement.title = events[dateString]
      }

      calendar.appendChild(dayElement)
    }

    currentMonthElement.textContent = `${firstDay.toLocaleString("default", { month: "long" })} ${year}`
  }

  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1)
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth())
  })

  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1)
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth())
  })

  // Initialize calendar
  generateCalendar(currentDate.getFullYear(), currentDate.getMonth())
})

// Event Details Modal
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.querySelector("#eventModal")
  const eventBtns = document.querySelectorAll(".event-btn")
  const closeBtn = document.querySelector(".close")

  if (!modal) return

  const eventDetails = {
    walk: {
      title: "Community Fundraising Walk",
      date: "March 15, 2025",
      time: "9:00 AM - 12:00 PM",
      location: "Sea Point Promenade",
      description:
        "Join us for a scenic 5km walk along the beautiful Sea Point Promenade. Registration includes a t-shirt, refreshments, and the satisfaction of supporting a great cause.",
      registration: "R50 per person",
      contact: "events@haven.org.za",
    },
    dinner: {
      title: "Volunteer Appreciation Dinner",
      date: "March 22, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "The Haven Main Shelter",
      description:
        "A special evening to celebrate our incredible volunteers. Enjoy dinner, hear impact stories, and connect with fellow volunteers.",
      registration: "Invitation only",
      contact: "volunteer@haven.org.za",
    },
    workshop: {
      title: "Skills Workshop: Job Readiness",
      date: "April 5, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Community Center",
      description:
        "Free workshop covering resume writing, interview skills, and job search strategies. Open to residents and community members.",
      registration: "Free - RSVP required",
      contact: "programs@haven.org.za",
    },
  }

  eventBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const eventKey = this.getAttribute("data-event")
      const event = eventDetails[eventKey]

      if (event) {
        document.querySelector("#eventDetails").innerHTML = `
                    <h2>${event.title}</h2>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p><strong>Time:</strong> ${event.time}</p>
                    <p><strong>Location:</strong> ${event.location}</p>
                    <p><strong>Description:</strong> ${event.description}</p>
                    <p><strong>Registration:</strong> ${event.registration}</p>
                    <p><strong>Contact:</strong> ${event.contact}</p>
                    <button class="btn btn-primary" onclick="alert('Registration functionality would be implemented here')">Register Now</button>
                `
        modal.style.display = "block"
      }
    })
  })

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none"
  })

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none"
    }
  })
})

// FAQ Accordion
document.addEventListener("DOMContentLoaded", () => {
  const faqQuestions = document.querySelectorAll(".faq-question")

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling
      const isActive = answer.classList.contains("active")

      // Close all other answers
      document.querySelectorAll(".faq-answer").forEach((a) => {
        a.classList.remove("active")
      })

      // Toggle current answer
      if (!isActive) {
        answer.classList.add("active")
      }
    })
  })
})

// Newsletter Form
document.addEventListener("DOMContentLoaded", () => {
  const newsletterForms = document.querySelectorAll(".newsletter-form")

  newsletterForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()
      const email = this.querySelector('input[type="email"]').value
      if (email) {
        alert("Thank you for subscribing to our newsletter!")
        this.reset()
      }
    })
  })
})

// Smooth Scrolling for Anchor Links
document.addEventListener("DOMContentLoaded", () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]')

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
})

// Map Pin Interactions
document.addEventListener("DOMContentLoaded", () => {
  const mapPins = document.querySelectorAll(".pin")

  mapPins.forEach((pin) => {
    pin.addEventListener("click", function () {
      const shelterName = this.getAttribute("data-shelter")
      alert(`${shelterName} Shelter - Contact us for more information about this location.`)
    })
  })
})

// Form Validation Enhancement
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validatePhone(phone) {
  const re = /^[+]?[1-9][\d]{0,15}$/
  return re.test(phone.replace(/\s/g, ""))
}

// Add real-time validation to forms
document.addEventListener("DOMContentLoaded", () => {
  const emailInputs = document.querySelectorAll('input[type="email"]')
  const phoneInputs = document.querySelectorAll('input[type="tel"]')

  emailInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.value && !validateEmail(this.value)) {
        this.style.borderColor = "#dc3545"
        this.setCustomValidity("Please enter a valid email address")
      } else {
        this.style.borderColor = ""
        this.setCustomValidity("")
      }
    })
  })

  phoneInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.value && !validatePhone(this.value)) {
        this.style.borderColor = "#dc3545"
        this.setCustomValidity("Please enter a valid phone number")
      } else {
        this.style.borderColor = ""
        this.setCustomValidity("")
      }
    })
  })
})

// Loading States for Forms
function showLoading(button) {
  const originalText = button.textContent
  button.textContent = "Loading..."
  button.disabled = true

  setTimeout(() => {
    button.textContent = originalText
    button.disabled = false
  }, 2000)
}

// Add loading states to form submissions
document.addEventListener("DOMContentLoaded", () => {
  const submitButtons = document.querySelectorAll('button[type="submit"]')

  submitButtons.forEach((button) => {
    button.addEventListener("click", function () {
      if (this.form && this.form.checkValidity()) {
        showLoading(this)
      }
    })
  })
})

// Scroll Progress Indicator
document.addEventListener("DOMContentLoaded", () => {
  const scrollProgress = document.getElementById("scrollProgress")

  if (scrollProgress) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.body.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      scrollProgress.style.width = scrollPercent + "%"
    })
  }
})

// Header Scroll Effect
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header")

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  }
})

// Intersection Observer for Animations
document.addEventListener("DOMContentLoaded", () => {
  const animateOnScroll = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running"
          entry.target.classList.add("animate")
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  // Observe elements for animation
  const elementsToAnimate = document.querySelectorAll("h1, h2, h3, .help-card, .story-card, .stat")
  elementsToAnimate.forEach((el) => {
    el.style.animationPlayState = "paused"
    animateOnScroll.observe(el)
  })
})

// Parallax Effect for Hero Section
document.addEventListener("DOMContentLoaded", () => {
  const heroImage = document.querySelector(".hero-image")

  if (heroImage) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      heroImage.style.transform = `scale(1.1) translateY(${rate}px)`
    })
  }
})

// Enhanced Button Interactions
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })

    button.addEventListener("mousedown", function () {
      this.style.transform = "translateY(-1px) scale(0.98)"
    })

    button.addEventListener("mouseup", function () {
      this.style.transform = "translateY(-3px) scale(1.05)"
    })
  })
})

// Card Tilt Effect
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".help-card, .story-card, .stat")

  cards.forEach((card) => {
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)"
    })
  })
})

// Smooth Reveal Animations
document.addEventListener("DOMContentLoaded", () => {
  const revealElements = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
        }
      })
    },
    {
      threshold: 0.15,
    },
  )

  const elementsToReveal = document.querySelectorAll(".help-card, .about-content, .shelter-info, .story-content")
  elementsToReveal.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "all 0.8s ease"
    revealElements.observe(el)
  })

  // Add revealed class styles
  const style = document.createElement("style")
  style.textContent = `
    .revealed {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `
  document.head.appendChild(style)
})
