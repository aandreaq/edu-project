"use strict";
document.addEventListener("DOMContentLoaded", initMain);
function initMain() {
    initHeader();
    initLoginModal();
    // Ako imaš slider na početnoj, dodaj ovde initSlider();
}
/* ========================= HEADER ========================= */
function initHeader() {
    // updateCartCount se nalazi u cart.ts, ovde je samo pozivamo
    if (typeof updateCartCount === "function") {
        updateCartCount();
    }
    setActiveLink();
}
/* ========================= ACTIVE LINK ========================= */
function setActiveLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    // Proveri da li tvoji linkovi imaju klasu .header__link ili .header__link-a / -c
    const links = document.querySelectorAll(".header__menu a");
    links.forEach((link) => {
        const a = link;
        const href = a.getAttribute("href") || "";
        const linkPage = href.split("/").pop() || "";
        if (currentPage === linkPage) {
            a.classList.add("header__link--active");
        }
        else {
            a.classList.remove("header__link--active");
        }
    });
}
/* ========================= LOGIN MODAL ========================= */
function initLoginModal() {
    const loginBtn = document.getElementById("loginBtn");
    const loginModal = document.getElementById("loginModal");
    const closeLogin = document.getElementById("closeLogin");
    if (!loginBtn || !loginModal || !closeLogin)
        return;
    loginBtn.addEventListener("click", () => {
        loginModal.style.display = "flex";
    });
    closeLogin.addEventListener("click", () => {
        loginModal.style.display = "none";
    });
    // Zatvaranje na klik van modala
    window.addEventListener("click", (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = "none";
        }
    });
}
