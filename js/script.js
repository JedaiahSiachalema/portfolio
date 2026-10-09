document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const siteMenu = document.getElementById("site-menu");
    const menuBackdrop = document.getElementById("menu-backdrop");
    const menuClose = document.getElementById("menu-close");

    function setMenuOpen(open) {
        document.body.classList.toggle("menu-open", open);
        siteMenu.classList.toggle("is-open", open);
        menuBackdrop.classList.toggle("is-visible", open);
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
        siteMenu.setAttribute("aria-hidden", String(!open));
        siteMenu.inert = !open;

        if (open) {
            siteMenu.querySelector("a").focus();
        } else {
            menuToggle.focus();
        }
    }

    menuToggle.addEventListener("click", function () {
        setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    menuClose.addEventListener("click", function () {
        setMenuOpen(false);
    });

    menuBackdrop.addEventListener("click", function () {
        setMenuOpen(false);
    });

    siteMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            setMenuOpen(false);
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
            setMenuOpen(false);
        }
    });

    const filterButtons = document.querySelectorAll(".project-filter");
    const searchInput = document.getElementById("project-search");
    const clearSearchButton = document.getElementById("clear-project-search");
    const projectCards = document.querySelectorAll(".project-card");
    const resultsMessage = document.getElementById("project-results");
    const emptyMessage = document.getElementById("project-empty");
    const projectModal = document.getElementById("project-modal");
    const modalTitle = document.getElementById("project-modal-title");
    const modalCategory = document.getElementById("project-modal-category");
    const modalDescription = document.getElementById("project-modal-description");
    const modalTechnologies = document.getElementById("project-modal-technologies");
    let selectedCategory = "all";

    function filterProjects() {
        const query = searchInput.value.trim().toLowerCase();
        let visibleCount = 0;

        projectCards.forEach(function (card) {
            const matchesCategory = selectedCategory === "all" ||
                card.dataset.category === selectedCategory;
            const matchesSearch = card.textContent.toLowerCase().includes(query);
            const visible = matchesCategory && matchesSearch;

            card.hidden = !visible;
            card.classList.remove("project-card-entering");

            if (visible) {
                visibleCount++;
                void card.offsetWidth;
                card.classList.add("project-card-entering");
            }
        });

        resultsMessage.textContent = "Showing " + visibleCount +
            (visibleCount === 1 ? " project." : " projects.");
        emptyMessage.hidden = visibleCount > 0;
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            selectedCategory = button.dataset.category;

            filterButtons.forEach(function (filterButton) {
                const active = filterButton === button;
                filterButton.classList.toggle("is-active", active);
                filterButton.setAttribute("aria-pressed", String(active));
            });

            filterProjects();
        });
    });

    searchInput.addEventListener("input", filterProjects);

    clearSearchButton.addEventListener("click", function () {
        searchInput.value = "";
        filterProjects();
        searchInput.focus();
    });

    document.querySelectorAll(".project-details-button").forEach(function (button) {
        button.addEventListener("click", function () {
            const card = button.closest(".project-card");
            modalTitle.textContent = button.dataset.title;
            modalCategory.textContent = button.dataset.category;
            modalDescription.textContent = button.dataset.description;
            modalTechnologies.replaceChildren();

            card.querySelectorAll(".technology-list li").forEach(function (technology) {
                const badge = document.createElement("li");
                badge.textContent = technology.textContent;
                modalTechnologies.append(badge);
            });

            projectModal.showModal();
        });
    });

    document.getElementById("close-project-modal").addEventListener("click", function () {
        projectModal.close();
    });

    projectModal.addEventListener("click", function (event) {
        if (event.target === projectModal) {
            projectModal.close();
        }
    });
});
