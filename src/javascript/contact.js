document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")
  const inputs = document.querySelectorAll(".form-input, .form-textarea")

  // Add focus effects to form inputs
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.style.transform = "scale(1.02)"
    })

    input.addEventListener("blur", function () {
      this.style.transform = "scale(1)"
    })
  })

  // Handle form submission
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(contactForm)
    const name = contactForm.querySelector('input[placeholder="Name*"]').value
    const email = contactForm.querySelector('input[placeholder="Email*"]').value
    const phone = contactForm.querySelector('input[placeholder="Phone No. (Optional)"]').value
    const message = contactForm.querySelector("textarea").value

    // Basic validation
    if (!name.trim() || !email.trim()) {
      alert("Please fill in all required fields (Name and Email)")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address")
      return
    }

    // Simulate form submission
    const sendButton = contactForm.querySelector(".send-button")
    const originalText = sendButton.innerHTML

    sendButton.innerHTML = "Sending..."
    sendButton.disabled = true

    setTimeout(() => {
      alert("Thank you for your message! We will get back to you soon.")
      contactForm.reset()
      sendButton.innerHTML = originalText
      sendButton.disabled = false
    }, 2000)
  })

  // Add smooth hover effects to navigation links
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      if (!this.classList.contains("active")) {
        this.style.transform = "translateY(-2px)"
      }
    })

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Add click effect to send button
  const sendButton = document.querySelector(".send-button")
  sendButton.addEventListener("mousedown", function () {
    this.style.transform = "scale(0.98)"
  })

  sendButton.addEventListener("mouseup", function () {
    this.style.transform = "scale(1)"
  })
})
