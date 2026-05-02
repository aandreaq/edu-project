type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  isSale?: boolean;
};

type BestProduct = {
  id: number;
  name: string;
  image: string;
  description: string;
  rating: number;
};

const products: Product[] = [
  { id: 1, name: "Vel vestibulum elit tuvel euqen.", price: 250, image: "../img/CatalogPage/suitcasegreen-1.png", isSale: true },
  { id: 2, name: "Vel vestibulum elit tuvel euqen.", price: 250, image: "../img/CatalogPage/suitcaseblue-1.png", isSale: true },
  { id: 3, name: "Vel vestibulum elit tuvel euqen.", price: 250, image: "../img/CatalogPage/suitcasegrey.png", isSale: true },
  { id: 4, name: "Vel vestibulum elit tuvel euqen.", price: 250, image: "../img/CatalogPage/suitcaseorange.png", isSale: true },
  { id: 5, name: "Vel vestibulum elit tuvel euqen.", price: 250, image: "../img/CatalogPage/suitcasyellow.png", isSale: true },
  { id: 6, name: "Vel vestibulum elit tuvel euqen.", price: 250, image: "../img/CatalogPage/suitcasered-1.png", isSale: true },
  { id: 7, name: "Vel vestibulum elit tuvel euqen.", price: 250, image: "../img/CatalogPage/suitcaseblack.png", isSale: true },
  { id: 8, name: "Vel vestibulum elit tuvel euqen.", price: 250, image: "../img/CatalogPage/suitcasebrown.png", isSale: true },
  { id: 9, name: "Vel vestibulum elit tuvel euqen.", price: 250, image: "../img/CatalogPage/kidsuitcase-2.png", isSale: true },
  { id: 10, name: "Vel vestibulum elit tuvel euqen.", price: 250, image: "../img/CatalogPage/kidsuitcase-3.png", isSale: true },
  { id: 11, name: "Vel vestibulum elit tuvel euqen.", price: 250, image: "../img/CatalogPage/kidsuitcase-4.png", isSale: true },
  { id: 12, name: "Vel vestibulum elit tuvel euqen.", price: 250, image: "../img/CatalogPage/kidsuitcase-5.png", isSale: true },
  { id: 13, name: "Vel vestibulum elit tuvel euqen.", price: 250, image: "../img/CatalogPage/suitcasyellow.png", isSale: true },
  { id: 14, name: "Vel vestibulum elit tuvel euqen.", price: 250, image: "../img/CatalogPage/suitcaseblack.png", isSale: true },
  { id: 15, name: "Vel vestibulum elit tuvel euqen.", price: 250, image: "../img/CatalogPage/suitcasebrown.png", isSale: true }
];

const bestProducts: BestProduct[] = [
  {
    id: 1,
    name: "Travel Suitcase Red",
    image: "../img/CatalogPage/setofsuitcasesred-small.png",
    description: "Lightweight durable suitcase",
    rating: 5
  },
  {
    id: 2,
    name: "Modern Suitcase",
    image: "../img/CatalogPage/setofsuitcasesblack-small.png",
    description: "Premium modern design",
    rating: 4
  },
  {
    id: 3,
    name: "Premium Travel Bag",
    image: "../img/CatalogPage/setofsuitcasesblue-small.png",
    description: "Extra storage space",
    rating: 5
  },
  {
    id: 4,
    name: "Classic Suitcase",
    image: "../img/CatalogPage/setofsuitcasesyellow-small.png",
    description: "Strong classic build",
    rating: 4
  },
  {
    id: 5,
    name: "Black Suitcase",
    image: "../img/CatalogPage/setofsuitcasesgreen-small.png",
    description: "Budget friendly option",
    rating: 3
  }
];

// const grid = document.getElementById("productsGrid") as HTMLElement;
// const shownCount = document.getElementById("shownCount");
// const totalCount = document.getElementById("totalCount");
// const nextBtn = document.getElementById("nextBtn") as HTMLButtonElement;
// const searchInput = document.getElementById("searchInput") as HTMLInputElement;
// const sortSelect = document.getElementById("sortSelect") as HTMLSelectElement;
// const bestContainer = document.querySelector(".catalog__smallCards") as HTMLElement;
// const pageButtons = document.querySelectorAll(".page-btn");

let currentPage = 1;
const perPage = 12;
let filteredProducts: Product[] = [];

declare function addToCart(item: CartItem): void;
declare function updateCartCount(): void;

function render(
  list: Product[],
  grid: HTMLElement,
  shownCount: HTMLElement | null,
  totalCount: HTMLElement | null,
  nextBtn: HTMLButtonElement | null
) {
  if (!grid) return;

  const visible = list.slice(0, currentPage * perPage);
  grid.innerHTML = "";

  visible.forEach(p => {
    grid.innerHTML += `
      <div class="product" data-id="${p.id}">
        ${p.isSale ? `<span class="product__badge">SALE</span>` : ""}
        <div class="product__imgWrapper">
          <img src="${p.image}" alt="${p.name}">
        </div>
        <p class="product__title">${p.name}</p>
        <p class="product__price">$${p.price}</p>
        <button class="product__btn add-to-cart" data-id="${p.id}">Add to cart</button>
      </div>
    `;
  });

  if (shownCount) shownCount.textContent = visible.length.toString();
  if (totalCount) totalCount.textContent = list.length.toString();
  if (nextBtn) nextBtn.style.display = visible.length >= list.length ? "none" : "block";
}

function renderBestSets(container: HTMLElement) {
  if (!container) return;

  container.innerHTML = "";

  bestProducts.forEach(p => {
    container.innerHTML += `
      <div class="small-card">
        <img class="small-card__img" src="${p.image}" alt="${p.name}">
        <div class="small-card__content">
          <p class="small-card__title">${p.name}</p>
          <p class="small-card__desc">${p.description}</p>
          <div class="small-card__stars">${"⭐".repeat(p.rating)}</div>
        </div>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productsGrid") as HTMLElement;
  const shownCount = document.getElementById("shownCount");
  const totalCount = document.getElementById("totalCount");
  const nextBtn = document.getElementById("nextBtn") as HTMLButtonElement;
  const searchInput = document.getElementById("searchInput") as HTMLInputElement;
  const sortSelect = document.getElementById("sortSelect") as HTMLSelectElement;
  const bestContainer = document.querySelector(".catalog__smallCards") as HTMLElement;
  const pageButtons = document.querySelectorAll(".page-btn");

  filteredProducts = [...products];

  if (grid) render(filteredProducts, grid, shownCount, totalCount, nextBtn);
  if (bestContainer) renderBestSets(bestContainer);

  searchInput?.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    filteredProducts = products.filter(p => p.name.toLowerCase().includes(value));
    currentPage = 1;
    render(filteredProducts, grid, shownCount, totalCount, nextBtn);
  });

  sortSelect?.addEventListener("change", () => {
    if (sortSelect.value === "low") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortSelect.value === "high") {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else {
      filteredProducts = [...products];
    }

    currentPage = 1;
    render(filteredProducts, grid, shownCount, totalCount, nextBtn);
  });

  nextBtn?.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredProducts.length / perPage);
    if (currentPage < totalPages) {
      currentPage++;
      render(filteredProducts, grid, shownCount, totalCount, nextBtn);
    }
  });

  pageButtons?.forEach(btn => {
    btn.addEventListener("click", () => {
      currentPage = Number(btn.getAttribute("data-page"));
      pageButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      render(filteredProducts, grid, shownCount, totalCount, nextBtn);
    });
  });

  grid?.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const card = target.closest(".product") as HTMLElement;
    if (!card) return;

    const id = Number(card.getAttribute("data-id"));
    const productData = products.find(p => p.id === id);

    if (target.classList.contains("add-to-cart")) {
      if (productData && typeof addToCart === "function") {
        addToCart({
          id: productData.id,
          name: productData.name,
          price: productData.price,
          image: productData.image
        });

        if (typeof updateCartCount === "function") updateCartCount();

        target.textContent = "Added!";
        setTimeout(() => (target.textContent = "Add to cart"), 1000);
      }
      return;
    }

    window.location.href = `./product.html?id=${id}`;
  });
});