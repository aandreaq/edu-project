"use strict";
function initSlider() {
    const track = document.querySelector('.slider__track');
    const prevBtn = document.querySelector('.slider__btn--prev');
    const nextBtn = document.querySelector('.slider__btn--next');
    const items = document.querySelectorAll('.slider__item');
    if (!track || !prevBtn || !nextBtn || items.length === 0)
        return;
    let index = 0;
    const updateSlider = () => {
        const firstItem = items[0];
        // offsetWidth je sigurniji + proveri da li je gap u CSS-u tacno 20px
        const itemWidth = firstItem.offsetWidth + 20;
        track.style.transform = `translateX(${-index * itemWidth}px)`;
        track.style.transition = "transform 0.4s ease-in-out"; // Dodaj prelaz da ne skace
    };
    nextBtn.addEventListener('click', () => {
        // -4 znaci da vidis 4 slike odjednom. Ako vidis 3, stavi -3.
        if (index < items.length - 4) {
            index++;
        }
        else {
            index = 0;
        }
        updateSlider();
    });
    prevBtn.addEventListener('click', () => {
        if (index > 0) {
            index--;
        }
        else {
            // Ako klikne "nazad" na pocetku, baci ga na zadnju mogucu poziciju
            index = items.length - 4;
        }
        updateSlider();
    });
}
function initAddToCartButtons() {
    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const btn = e.currentTarget;
            // Proveri da li tvoj HTML taster ima tacno ove data atribute: 
            // data-id, data-name, data-price, data-image
            const item = {
                id: Number(btn.dataset.id),
                name: btn.dataset.name || "",
                price: Number(btn.dataset.price),
                image: btn.dataset.image || ""
            };
            // @ts-ignore
            if (typeof addToCart === 'function') {
                // @ts-ignore
                addToCart(item);
                // @ts-ignore
                if (typeof updateCartCount === 'function')
                    updateCartCount();
                const originalText = btn.textContent;
                btn.textContent = "Added!";
                btn.style.pointerEvents = "none"; // Onemoguci dupli klik dok pise Added!
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.pointerEvents = "auto";
                }, 1000);
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", () => {
    initSlider();
    initAddToCartButtons();
});
