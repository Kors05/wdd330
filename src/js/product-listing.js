import { loadHeaderFooter } from "./utils.mjs";

const params = new URLSearchParams(window.location.search);
const searchTerm = params.get("search")?.toLowerCase().trim();

const resultsElement = document.querySelector("#search-results");

async function searchProducts() {
  if (!searchTerm) {
    resultsElement.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  try {
    const response = await fetch("../json/tents.json");

    if (!response.ok) {
      throw new Error(`Could not load products: ${response.status}`);
    }

    const products = await response.json();

    const results = products.filter((product) => {
      const name = product.Name?.toLowerCase() || "";
const brand = product.Brand?.Name?.toLowerCase() || "";
const description = product.DescriptionHtmlSimple?.toLowerCase() || "";

return (
  name.includes(searchTerm) ||
  brand.includes(searchTerm) ||
  description.includes(searchTerm)
);
    });

    console.log("Search results:", results);

    if (results.length === 0) {
      resultsElement.innerHTML = `<p>No products found for "${searchTerm}".</p>`;
      return;
    }

   resultsElement.innerHTML = results
  .map(
    (product) => `
      <li class="product-card">
        <a href="../product_pages/?product=${product.Id}">
          <img src="${product.Image}" alt="${product.Name}" />
          <h2 class="card__name">${product.Name}</h2>
          <p>$${product.FinalPrice}</p>
        </a>
      </li>
    `,
  )
  .join("");
  } catch (error) {
    console.error("Search error:", error);
    resultsElement.innerHTML =
      "<p>Sorry, we could not retrieve the search results.</p>";
  }
}

loadHeaderFooter().then(searchProducts);