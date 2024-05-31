export default async () => {
  const api_url = "https://fakestoreapi.com/products";

  async function fetchProducts() {
    const response = await fetch(api_url);
    const result = await response.json();
    return result;
  }

  const products = await fetchProducts();

  return `
    <h1>Products</h1>
    <ul class="products">
      ${products
        .map(
          (product) => `
            <li class="card">
              <img class="card__img" src="${product.image}" />
              <span class="card__title">${product.title}</span>
              <div class="card__icons-container">
                <span class="card__icons">
                  ${"&starf;".repeat(
                    Math.round(product.rating.rate)
                  )}${"&star;".repeat(5 - Math.round(product.rating.rate))}
                </span>
                (${product.rating.count})
              </div>
              <strong class="card__subtitle">$${product.price}</strong>
            </li>
            `
        )
        .join("")}
    </ul>
  `;
};
