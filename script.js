// --- بيانات جميع المنتجات (الأيفونات، الإيربودز، والشواحن) ---
const products = [
    // --- الأيفونات (9) ---
    { id: 1, name: "iPhone X", price: 399, image: "images/iphoneX.jpg" },
    { id: 2, name: "iPhone XR", price: 449, image: "images/iphoneXR.jpg" },
    { id: 3, name: "iPhone 11", price: 499, image: "images/iphone11.jpg" },
    { id: 4, name: "iPhone 11 Max", price: 599, image: "images/iphone11max.jpg" },
    { id: 5, name: "iPhone 12", price: 699, image: "images/iphone12.jpg" },
    { id: 6, name: "iPhone 14 ", price: 800, image: "images/iphone14.jpg" },
    { id: 7, name: "iPhone 14 Max", price: 799, image: "images/iphone14max.jpg" },
    { id: 8, name: "iPhone 17", price: 1099, image: "images/iphone17.jpg" },
    { id: 9, name: "iPhone 17 Max", price: 1199, image: "images/iphone17max.jpg" },

    // --- الإيربودز (3) ---
    { id: 10, name: "AirPods Gen 1", price: 129, image: "images/Air1.jpg" },
    { id: 11, name: "AirPods Gen 2", price: 159, image: "images/Air2.jpg" },
    { id: 12, name: "AirPods Gen 3", price: 199, image: "images/Air3.jpg" },

    // --- الشواحن والجرابات (10) ---
    { id: 13, name: "MagSafe Case v1", price: 39, image: "images/MageSafeCase1.jpg" },
    { id: 14, name: "MagSafe Case v2", price: 39, image: "images/MageSafeCase2.jpg" },
    { id: 15, name: "MagSafe Case v3", price: 45, image: "images/MageSafeCase3.jpg" },
    { id: 16, name: "MagSafe Case v4", price: 45, image: "images/MageSafeCase4.jpg" },
    { id: 17, name: "MagSafe Case v5", price: 49, image: "images/MageSafeCase5.jpg" },
    { id: 18, name: "MagSafe Case v6", price: 49, image: "images/MageSafeCase6.jpg" },
    { id: 19, name: "Power Adapter 20W", price: 19, image: "images/Power1.jpg" },
    { id: 20, name: "Power Adapter 30W", price: 29, image: "images/Power2.jpg" },
    { id: 21, name: "Power Adapter 35W", price: 35, image: "images/Power3.jpg" },
    { id: 22, name: "Power Adapter 60W", price: 49, image: "images/Power4.jpg" }
];

// --- تشغيل الدوال عند تحميل الصفحة ---
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('productGrid')) loadProducts();
    if (document.getElementById('cartItems')) loadCart();
    updateCartCount();
    setupLogin();
});

// --- برمجة صفحة تسجيل الدخول ---
function setupLogin() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // التحقق من الإيميل والباسورد بشكل بسيط
            if (email.includes("@") && password.length > 5) {
                localStorage.setItem("isLoggedIn", "true");
                window.location.href = "index.html";
            } else {
                const error = document.getElementById('loginError');
                if(error) error.innerText = "Email invalid or password too short!";
            }
        });
    }
}

// --- عرض المنتجات في الصفحة الرئيسية ---
function loadProducts() {
    const grid = document.getElementById('productGrid');
    if(!grid) return;

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button class="btn-main" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        grid.appendChild(card);
    });
}

// --- إضافة منتج للسلة ---
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

// --- تحديث عداد السلة في المنيو ---
function updateCartCount() {
    const countSpan = document.getElementById('cartCount');
    if (countSpan) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        countSpan.innerText = cart.length;
    }
}

// --- عرض المنتجات في صفحة السلة ---
function loadCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const totalPriceSpan = document.getElementById('totalPrice');
    if(!cartItemsDiv) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsDiv.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    }

    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.name} - $${item.price}</span>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsDiv.appendChild(div);
    });

    if(totalPriceSpan) totalPriceSpan.innerText = total;
}

// --- حذف منتج من السلة ---
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

// --- إتمام عملية الشراء ---
function checkout() {
    if(confirm("Confirm purchase?")) {
        alert("Thank you for your purchase!");
        localStorage.removeItem('cart');
        window.location.href = "index.html";
    }
}