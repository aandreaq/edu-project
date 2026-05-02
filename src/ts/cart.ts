interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

function getCart(): CartItem[] {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart: CartItem[]): void {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(item: Omit<CartItem, "quantity">): void {
    const cart = getCart();
    const existing = cart.find((p) => p.id === item.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    saveCart(cart);
}

function clearCart(): void {
    localStorage.removeItem("cart");
}



function renderCartTable(): void {
    const cartBody = document.getElementById("cartBody");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");
    const emptyMsg = document.getElementById("emptyMsg");

    if (!cartBody) return; // Ako nismo na cart.html stranici, prekini funkciju

    const cart = getCart();
    cartBody.innerHTML = "";

    if (cart.length === 0) {
        if (emptyMsg) emptyMsg.textContent = "Your cart is empty.";
        if (subtotalEl) subtotalEl.textContent = "$0";
        if (totalEl) totalEl.textContent = "$0";
        return;
    }

    if (emptyMsg) emptyMsg.textContent = "";

    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" style="width: 50px;"></td>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>
                <button class="btn-qty" data-id="${item.id}" data-delta="-1">-</button>
                ${item.quantity}
                <button class="btn-qty" data-id="${item.id}" data-delta="1">+</button>
            </td>
            <td>$${item.price * item.quantity}</td>
            <td><button class="btn-remove" data-id="${item.id}">×</button></td>
        `;
        cartBody.appendChild(row);
    });

    const totalSum = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (subtotalEl) subtotalEl.textContent = `$${totalSum}`;
    if (totalEl) totalEl.textContent = `$${totalSum}`;
}


document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const cart = getCart();

    
    if (target.classList.contains("btn-qty")) {
        const id = Number(target.dataset.id);
        const delta = Number(target.dataset.delta);
        const item = cart.find(p => p.id === id);
        
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                const newCart = cart.filter(p => p.id !== id);
                saveCart(newCart);
            } else {
                saveCart(cart);
            }
            renderCartTable();
            if (typeof updateCartCount === "function") updateCartCount();
        }
    }

    
    if (target.classList.contains("btn-remove")) {
        const id = Number(target.dataset.id);
        const newCart = cart.filter(p => p.id !== id);
        saveCart(newCart);
        renderCartTable();
        if (typeof updateCartCount === "function") updateCartCount();
    }

   
    if (target.id === "clearCart") {
        clearCart();
        renderCartTable();
        if (typeof updateCartCount === "function") updateCartCount();
    }
});


document.addEventListener("DOMContentLoaded", renderCartTable);
