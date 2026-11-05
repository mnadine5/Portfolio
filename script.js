
// 1. Theme button
const themeButton = document.getElementById("theme-btn");

if (themeButton) {
    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("light");
        themeButton.textContent = document.body.classList.contains("light")
            ? "Dark mode"
            : "Light mode";
    });
}

// 2. Highlight the clicked menu link
const links = document.querySelectorAll("nav a");

links.forEach(function (link) {
    link.addEventListener("click", function () {
        links.forEach(function (other) {
            other.classList.remove("active");
        });
        link.classList.add("active");
    });
});

// 3. Comment form -> thank-you page
const form = document.querySelector(".comment-box form");

if (form) {
    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const fullName = form.elements["name"].value.trim();
        const firstName = fullName.split(" ")[0];
        const nextPage = "thanks.html?name=" + encodeURIComponent(firstName);
        const sendButton = form.querySelector("button");
        const address = form.getAttribute("action");

        // Test mode: no email service connected yet, so just open the thank-you page
        if (address.includes("YOUR_FORM_ID")) {
            window.location.href = nextPage;
            return;
        }

        sendButton.disabled = true;
        sendButton.textContent = "Sending...";

        try {
            const response = await fetch(address, {
                method: "POST",
                body: new FormData(form),
                headers: { Accept: "application/json" }
            });

            if (response.ok) {
                window.location.href = nextPage;
            } else {
                throw new Error("Send failed");
            }
        } catch (error) {
            sendButton.disabled = false;
            sendButton.textContent = "Send comment";
            alert("Sorry, your comment could not be sent. Please try again, or email me directly.");
        }
    });
}