document.addEventListener("DOMContentLoaded", function () {
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
