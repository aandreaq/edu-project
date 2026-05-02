

function initSlider(): void {
    const track = document.querySelector('.slider__track') as HTMLElement;
    const prevBtn = document.querySelector('.slider__btn--prev');
    const nextBtn = document.querySelector('.slider__btn--next');
    const items = document.querySelectorAll('.slider__item');

    if (!track || !prevBtn || !nextBtn || items.length === 0) return;

    let index = 0;

    const updateSlider = () => {
        const firstItem = items[0] as HTMLElement;
        
        const itemWidth = firstItem.offsetWidth + 20; 
        track.style.transform = `translateX(${-index * itemWidth}px)`;
        track.style.transition = "transform 0.4s ease-in-out"; 
    };

    nextBtn.addEventListener('click', () => {
        
        if (index < items.length - 4) {
            index++;
        } else {
            index = 0;
        }
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        if (index > 0) {
            index--;
        } else {
            
            index = items.length - 4; 
        }
        updateSlider();
    });
}

function initAddToCartButtons(): void {
    const buttons = document.querySelectorAll('.add-to-cart');
    
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const btn = e.currentTarget as HTMLButtonElement;
            
            
            const item = {
                id: Number(btn.dataset.id),
                name: btn.dataset.name || "",
                price: Number(btn.dataset.price),
                image: btn.dataset.image || ""
            };

            
            if (typeof addToCart === 'function') {
                
                addToCart(item);
                
                if (typeof updateCartCount === 'function') updateCartCount();

                const originalText = btn.textContent;
                btn.textContent = "Added!";
                btn.style.pointerEvents = "none";

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