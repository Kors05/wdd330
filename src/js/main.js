import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter().then(() => {
  const searchForm = document.querySelector("#search-form");

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchInput = document.querySelector("#search-input");
    const searchTerm = searchInput.value.trim();

    if (searchTerm) {
      window.location.href = `/product-listing/?search=${encodeURIComponent(searchTerm)}`;
    }
  });
});