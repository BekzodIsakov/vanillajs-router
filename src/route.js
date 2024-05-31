import home from "./pages/index.js";
import products from "./pages/products.js";
import page404 from "./pages/404.js";

const $main_nav = document.querySelector(".main-nav");
const $nav_links = $main_nav.querySelectorAll("a[href]");

const routes = {
  "/": { title: "Home", render: home },
  "/products": { title: "Products", render: products },
  404: { title: "Page Not Found!", render: page404 },
};

function registerNavLinks() {
  Array.from($nav_links).forEach(($link) => {
    $link.onclick = function (e) {
      e.preventDefault();
      history.pushState("", "", e.target.href);
      handleLocation();
    };
  });
}

async function handleLocation() {
  const path = window.location.pathname;
  const page = routes[path] || routes[404];

  Array.from($nav_links).forEach(($link) => {
    $link.classList.toggle("active", path === $link.pathname); // style active nav link
  });

  document.title = page.title;
  const doc = await page.render();
  document.getElementById("app").innerHTML = doc;
}

window.addEventListener("popstate", handleLocation);
window.addEventListener("DOMContentLoaded", () => {
  registerNavLinks();
  handleLocation();
});
