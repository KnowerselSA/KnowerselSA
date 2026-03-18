document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const inputs = document.querySelectorAll(".form-input, .form-textarea");
  const sendButton = document.querySelector(".send-button");

  // ✨ Input focus animation
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.style.transform = "scale(1.02)";
    });

    input.addEventListener("blur", function () {
      this.style.transform = "scale(1)";
    });
  });

  // 🚀 Form Submit
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: contactForm.querySelector('[name="name"]').value,
      email: contactForm.querySelector('[name="email"]').value,
      phone: contactForm.querySelector('[name="phone"]').value,
      message: contactForm.querySelector('[name="message"]').value,
    };

    // ✅ Validation
    if (!data.name.trim() || !data.email.trim()) {
      alert("Please fill Name and Email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert("Enter valid email");
      return;
    }

    // ⏳ Loading state
    const originalText = sendButton.innerHTML;
    sendButton.innerHTML = "Sending...";
    sendButton.disabled = true;

    try {
      const res = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        alert("Email sent successfully ✅");
        contactForm.reset();
      } else {
        alert("Failed to send email ❌");
      }
    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }

    // 🔄 Reset button
    sendButton.innerHTML = originalText;
    sendButton.disabled = false;
  });

  // 🖱 Button click animation
  sendButton.addEventListener("mousedown", function () {
    this.style.transform = "scale(0.95)";
  });

  sendButton.addEventListener("mouseup", function () {
    this.style.transform = "scale(1)";
  });
});