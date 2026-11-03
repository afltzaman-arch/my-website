// Current year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// Contact form
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
        alert("Please fill in all fields.");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    const messages = JSON.parse(
        localStorage.getItem("portfolioMessages") || "[]"
    );

    const newMessage = {
        id: Date.now(),
        name: name,
        email: email,
        subject: subject,
        message: message,
        date: new Date().toLocaleString()
    };

    messages.unshift(newMessage);

    localStorage.setItem(
        "portfolioMessages",
        JSON.stringify(messages)
    );

    document.getElementById("formStatus").textContent =
        "Your message has been saved successfully!";

    contactForm.reset();

    updateDashboard();
});

// Dashboard
const dashboard = document.getElementById("dashboard");

document.getElementById("dashboardBtn").addEventListener("click", () => {
    dashboard.classList.add("active");
    updateDashboard();
});

document.getElementById("closeDashboard").addEventListener("click", () => {
    dashboard.classList.remove("active");
});

dashboard.addEventListener("click", event => {
    if (event.target === dashboard) {
        dashboard.classList.remove("active");
    }
});

function updateDashboard() {
    const messages = JSON.parse(
        localStorage.getItem("portfolioMessages") || "[]"
    );

    document.getElementById("totalMessages").textContent =
        messages.length;

    const messageList = document.getElementById("messageList");

    messageList.innerHTML = "";

    if (messages.length === 0) {
        messageList.textContent = "No messages available.";
        return;
    }

    messages.forEach(message => {
        const item = document.createElement("div");
        item.className = "message-item";

        const name = document.createElement("h4");
        name.textContent = message.name;

        const email = document.createElement("small");
        email.textContent = message.email;

        const subject = document.createElement("h5");
        subject.textContent = message.subject;

        const content = document.createElement("p");
        content.textContent = message.message;

        const date = document.createElement("small");
        date.textContent = message.date;

        item.append(name, email, subject, content, date);
        messageList.appendChild(item);
    });
}

// Clear dashboard messages
document.getElementById("clearMessages").addEventListener("click", () => {
    const confirmDelete = confirm(
        "Are you sure you want to delete all messages?"
    );

    if (confirmDelete) {
        localStorage.removeItem("portfolioMessages");
        updateDashboard();
        alert("All messages deleted.");
    }
});

// Close dashboard with Escape
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        dashboard.classList.remove("active");
    }
});
