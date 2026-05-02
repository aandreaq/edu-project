"use strict";
/* ========================= DATA ========================= */
// Promenjeno ime u productData da ne pravi konflikt sa catalog.ts
const productData = [
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
/* ========================= INIT ========================= */
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get('id'));
    // Koristimo productData umesto products
    const product = productData.find(p => p.id === productId);
    if (!product) {
        console.error("Proizvod nije pronađen!");
        return;
    }
    renderProductDetails(product);
    setupQtyButtons();
    setupAddToCart(product);
    renderRelatedItems(product.id);
    setupTabs();
    setupReviewForm();
});
/* ========================= FUNCTIONS ========================= */
function renderProductDetails(product) {
    const nameEl = document.getElementById("productName");
    const titleEl = document.getElementById("productTitle");
    const priceEl = document.getElementById("productPrice");
    const mainImg = document.getElementById("productMainImg");
    const heroImg = document.getElementById("productImage");
    if (nameEl)
        nameEl.textContent = product.name;
    if (titleEl)
        titleEl.textContent = product.name;
    if (priceEl)
        priceEl.textContent = `$${product.price}`;
    if (mainImg)
        mainImg.src = product.image;
    if (heroImg)
        heroImg.src = product.image;
}
function setupQtyButtons() {
    const minusBtn = document.getElementById("minus");
    const plusBtn = document.getElementById("plus");
    const qtySpan = document.getElementById("qty");
    let currentQty = 1;
    minusBtn === null || minusBtn === void 0 ? void 0 : minusBtn.addEventListener("click", () => {
        if (currentQty > 1) {
            currentQty--;
            if (qtySpan)
                qtySpan.textContent = String(currentQty);
        }
    });
    plusBtn === null || plusBtn === void 0 ? void 0 : plusBtn.addEventListener("click", () => {
        currentQty++;
        if (qtySpan)
            qtySpan.textContent = String(currentQty);
    });
}
function setupAddToCart(product) {
    const btn = document.getElementById("addToCartBtn");
    const qtySpan = document.getElementById("qty");
    if (!btn)
        return;
    btn.addEventListener("click", () => {
        const quantity = Number((qtySpan === null || qtySpan === void 0 ? void 0 : qtySpan.textContent) || 1);
        for (let i = 0; i < quantity; i++) {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
            });
        }
        if (typeof updateCartCount === "function")
            updateCartCount();
        alert(`Dodato: ${quantity} komada!`);
    });
}
function renderRelatedItems(currentId) {
    const container = document.getElementById("relatedGrid");
    if (!container)
        return;
    const related = productData
        .filter(p => p.id !== currentId)
        .slice(0, 4);
    container.innerHTML = related.map(p => `
        <div class="product" onclick="window.location.href='./product.html?id=${p.id}'" style="cursor:pointer">
            <img src="${p.image}" alt="${p.name}" />
            <p>${p.name}</p>
            <span>$${p.price}</span>
        </div>
    `).join("");
}
function setupTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const panes = document.querySelectorAll('.tab-pane');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            var _a;
            const target = tab.getAttribute('data-tab');
            // Skloni active klasu sa svih
            tabs.forEach(t => t.classList.remove('active'));
            panes.forEach(p => p.classList.remove('active'));
            // Dodaj active na kliknuti
            tab.classList.add('active');
            (_a = document.getElementById(target || '')) === null || _a === void 0 ? void 0 : _a.classList.add('active');
        });
    });
}
function setupReviewForm() {
    const form = document.getElementById('reviewForm');
    form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Thank you for your reiew.Your review is waiting for confirmation");
        form.reset();
    });
}
