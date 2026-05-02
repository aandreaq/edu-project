"use strict";
/* ========================= CONTACT.TS ========================= */
function initContact() {
    // Pomeramo selektore UNUTAR funkcije da bi se tražili samo kad se funkcija pozove
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const topicInput = document.getElementById("topic");
    const messageInput = document.getElementById("message");
    const msg = document.getElementById("formMsg");
    // Ako nismo na contact stranici (elementi ne postoje), samo izađi bez greške
    if (!form || !emailInput || !nameInput || !topicInput || !messageInput || !msg) {
        return;
    }
    console.log("Contact stranica inicijalizovana!");
    /* ========================= EMAIL VALIDATION ========================= */
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    /* ========================= REAL-TIME EMAIL CHECK ========================= */
    emailInput.addEventListener("input", () => {
        if (emailInput.value === "") {
            emailInput.style.borderColor = "#B92770";
            return;
        }
        if (!validateEmail(emailInput.value)) {
            emailInput.style.borderColor = "red";
        }
        else {
            emailInput.style.borderColor = "green";
        }
    });
    /* ========================= FORM SUBMIT ========================= */
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!nameInput.value.trim() || !emailInput.value.trim() || !topicInput.value.trim() || !messageInput.value.trim()) {
            msg.textContent = "All fields are required!";
            msg.style.color = "red";
            return;
        }
        if (!validateEmail(emailInput.value)) {
            msg.textContent = "Please enter a valid email address!";
            msg.style.color = "red";
            return;
        }
        msg.textContent = "Message sent successfully!";
        msg.style.color = "green";
        form.reset();
        emailInput.style.borderColor = "#B92770";
    });
}
// Činimo funkciju dostupnom globalno za main.ts
window.initContact = initContact;
// Ostavljamo i ovo za svaki slučaj ako se fajl učitava zasebno
document.addEventListener("DOMContentLoaded", initContact);
