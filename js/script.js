
document.addEventListener("DOMContentLoaded", function () {
    // Feature 1: light/dark theme switch.
    const themeButton = document.getElementById("themeToggle");

    themeButton.addEventListener("click", function () {
        const dark = document.documentElement.dataset.theme !== "dark";

        if (dark) {
            document.documentElement.dataset.theme = "dark";
        } else {
            delete document.documentElement.dataset.theme;
        }

        themeButton.textContent = dark ? "Switch to Light" : "Switch to Dark";
    });

    // Feature 2: expand or collapse project details.
    document.querySelectorAll(".detailsToggle").forEach(function (button) {
        button.addEventListener("click", function () {
            const details = button.nextElementSibling;
            details.hidden = !details.hidden;
            button.setAttribute("aria-expanded", String(!details.hidden));
            button.textContent = details.hidden ? "Show Details" : "Hide Details";
        });
    });

    // Feature 3: filter projects and reset the search.
    const search = document.getElementById("projectSearch");
    const reset = document.getElementById("resetSearch");
    const projects = document.querySelectorAll(".project");
    const searchMessage = document.getElementById("searchMessage");

    function filterProjects() {
        const query = search.value.trim().toLowerCase();
        let matches = 0;

        projects.forEach(function (project) {
            const text = (project.textContent + " " +
                project.dataset.search).toLowerCase();
            const visible = text.includes(query);

            project.hidden = !visible;
            if (visible) matches++;
        });

        searchMessage.textContent = matches
            ? "Showing " + matches + " matching project(s)."
            : "No projects match. Try another word or reset.";
    }

    search.addEventListener("input", filterProjects);

    reset.addEventListener("click", function () {
        search.value = "";
        filterProjects();
    });

    // Feature 4: gallery with correct first/last-photo handling.
    const photos = [
        {
            src: "images/photo1.jpg",
            alt: "First personal photograph",
            caption: "Photo 1"
        },
        {
            src: "images/photo2.jpg",
            alt: "Second personal photograph",
            caption: "Photo 2"
        },
        {
            src: "images/photo3.jpg",
            alt: "Third personal photograph",
            caption: "Photo 3"
        }
    ];

    let currentPhoto = 0;
    const image = document.getElementById("galleryImage");
    const caption = document.getElementById("galleryCaption");
    const count = document.getElementById("galleryCount");

    function showPhoto(index) {
        currentPhoto = (index + photos.length) % photos.length;
        image.src = photos[currentPhoto].src;
        image.alt = photos[currentPhoto].alt;
        caption.textContent = photos[currentPhoto].caption;
        count.textContent = (currentPhoto + 1) + " of " + photos.length;
    }

    document.getElementById("previousPhoto").addEventListener("click", function () {
        showPhoto(currentPhoto - 1);
    });

    document.getElementById("nextPhoto").addEventListener("click", function () {
        showPhoto(currentPhoto + 1);
    });

    // Required feature: contact form validation and local preview.
    const form = document.getElementById("contactForm");
    const feedback = document.getElementById("formFeedback");
    const preview = document.getElementById("formPreview");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        document.getElementById("nameError").textContent = "";
        document.getElementById("emailError").textContent = "";
        document.getElementById("messageError").textContent = "";

        let valid = true;

        if (!name) {
            document.getElementById("nameError").textContent =
                "Please enter your name.";
            valid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            document.getElementById("emailError").textContent =
                "Enter a valid email address.";
            valid = false;
        }

        if (!message) {
            document.getElementById("messageError").textContent =
                "Please enter a message.";
            valid = false;
        }

        if (!valid) {
            feedback.textContent = "Please correct the errors above.";
            preview.hidden = true;
            return;
        }

        // textContent prevents entered text from being interpreted as HTML.
        document.getElementById("previewName").textContent = name;
        document.getElementById("previewEmail").textContent = email;
        document.getElementById("previewMessage").textContent = message;

        preview.hidden = false;
        feedback.textContent =
            "Your data was validated locally. No message was sent.";
    });

    document.getElementById("currentYear").textContent =
        new Date().getFullYear();
});