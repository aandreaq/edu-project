document.addEventListener("DOMContentLoaded", initMain);

function initMain(): void {
    initHeader();
    initLoginModal();
}

function initHeader(): void {

    if (typeof updateCartCount === "function") {
        updateCartCount();
    } else {

        const cart = JSON.parse(localStorage.getItem("cart") ?? "[]");

        const count = cart.reduce(
            (total: number, item: any) => total + (item.quantity || 1),
            0
        );

        const cartCountEl = document.getElementById("cartCount");

        if (cartCountEl) {
            cartCountEl.textContent = String(count);
            cartCountEl.style.display = count > 0 ? "inline-block" : "none";
        }
    }

    setActiveLink();
}

function setActiveLink(): void {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    const links = document.querySelectorAll(".header__menu a");

    links.forEach((link) => {
        const a = link as HTMLAnchorElement;
        const href = a.getAttribute("href") || "";
        const linkPage = href.split("/").pop() || "";

        if (currentPage === linkPage) {
            a.classList.add("header__link--active");
        } else {
            a.classList.remove("header__link--active");
        }
    });
}

function initLoginModal(): void {
    const loginBtn = document.getElementById("loginBtn");
    const loginModal = document.getElementById("loginModal");
    const closeLogin = document.getElementById("closeLogin");

    if (!loginBtn || !loginModal || !closeLogin) return;

    loginBtn.addEventListener("click", () => {
        (loginModal as HTMLElement).style.display = "flex";
    });

    closeLogin.addEventListener("click", () => {
        (loginModal as HTMLElement).style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === loginModal) {
            (loginModal as HTMLElement).style.display = "none";
        }
    });
}

declare function updateCartCount(): void;