// Ecommerce functionality
class EcommerceApp {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.products = this.initializeProducts();
        this.init();
    }

    initializeProducts() {
        return [
            {
                id: 1,
                name: "Smart Watches",
                price: 199.99,
                originalPrice: 249.99,
                image: "images/item1.png",
                category: "Electronics",
                description: "High-quality smart watch with health monitoring features"
            },
            {
                id: 2,
                name: "Laptops",
                price: 899.99,
                originalPrice: 999.99,
                image: "images/item2.png",
                category: "Electronics",
                description: "Powerful laptop for work and gaming"
            },
            {
                id: 3,
                name: "Camera",
                price: 599.99,
                originalPrice: 699.99,
                image: "images/item3.png",
                category: "Electronics",
                description: "Professional camera for photography enthusiasts"
            },
            {
                id: 4,
                name: "Headphones",
                price: 149.99,
                originalPrice: 199.99,
                image: "images/item4.png",
                category: "Electronics",
                description: "Premium wireless headphones with noise cancellation"
            },
            {
                id: 5,
                name: "Mobiles",
                price: 799.99,
                originalPrice: 899.99,
                image: "images/item5.png",
                category: "Electronics",
                description: "Latest smartphone with advanced features"
            },
            {
                id: 6,
                name: "T-shirts with multiple colors",
                price: 10.30,
                image: "images/shirt.png",
                category: "Clothing",
                description: "T-shirts with multiple colors, for men"
            },
            {
                id: 7,
                name: "Jean shorts for men",
                price: 10.30,
                image: "images/jacket.png",
                category: "Clothing",
                description: "Jean shorts for men blue color"
            },
            {
                id: 8,
                name: "Brown winter coat",
                price: 10.30,
                image: "images/coat.png",
                category: "Clothing",
                description: "Brown winter coat medium size"
            },
            {
                id: 9,
                name: "Leather wallet",
                price: 10.30,
                image: "images/wallet.png",
                category: "Accessories",
                description: "Leather wallet for men"
            },
            {
                id: 10,
                name: "Travel bag",
                price: 10.30,
                image: "images/bag.png",
                category: "Accessories",
                description: "Jeans bag for travel for men"
            },
            {
                id: 11,
                name: "Canon camera",
                price: 10.30,
                image: "images/shorts.png",
                category: "Electronics",
                description: "Canon camera black, 100x zoom"
            },
            {
                id: 12,
                name: "Gaming headset",
                price: 10.30,
                image: "images/headphone.png",
                category: "Electronics",
                description: "Headset for gaming with mic"
            },
            {
                id: 13,
                name: "Smartwatch",
                price: 10.30,
                image: "images/bag.png",
                category: "Electronics",
                description: "Smartwatch silver color modern"
            },
            {
                id: 14,
                name: "Blue wallet",
                price: 10.30,
                image: "images/pot.png",
                category: "Accessories",
                description: "Blue wallet for men leather material"
            },
            {
                id: 15,
                name: "Travel bag",
                price: 10.30,
                image: "images/jug.png",
                category: "Accessories",
                description: "Jeans bag for travel"
            }
        ];
    }

    init() {
        this.setupEventListeners();
        this.updateCartDisplay();
        this.setupTimer();
        this.setupSearch();
        this.setupProductClicks();
    }

    setupEventListeners() {
        // Cart icon click
        const cartIcon = document.querySelector('.fa-cart-shopping');
        if (cartIcon) {
            cartIcon.addEventListener('click', () => this.showCart());
        }

        // Search functionality
        const searchButton = document.querySelector('.search-button');
        if (searchButton) {
            searchButton.addEventListener('click', () => this.performSearch());
        }

        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-cart')) {
                e.preventDefault();
                const productId = e.target.getAttribute('data-product-id');
                this.addToCart(parseInt(productId));
            }
        });

        // Buy now buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('buy-now')) {
                e.preventDefault();
                const productId = e.target.getAttribute('data-product-id');
                this.buyNow(parseInt(productId));
            }
        });

        // Newsletter subscription
        document.addEventListener('click', (e) => {
            if (e.target.textContent === 'Subscribe' && e.target.type === 'button') {
                e.preventDefault();
                const emailInput = e.target.parentElement.querySelector('input[type="email"]');
                if (emailInput && emailInput.value) {
                    this.subscribeToNewsletter(emailInput.value);
                    emailInput.value = '';
                } else {
                    this.showNotification('Please enter a valid email address');
                }
            }
        });

        // Dropdown functionality
        this.setupDropdowns();
    }

    setupDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const dropbtn = dropdown.querySelector('.dropbtn');
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            
            if (dropbtn && dropdownContent) {
                dropbtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    dropdownContent.classList.toggle('show');
                });
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.matches('.dropbtn')) {
                const dropdowns = document.querySelectorAll('.dropdown-content');
                dropdowns.forEach(dropdown => {
                    if (dropdown.classList.contains('show')) {
                        dropdown.classList.remove('show');
                    }
                });
            }
        });
    }

    setupProductClicks() {
        // Make all product cards clickable
        const productCards = document.querySelectorAll('.card-div, .card, .accessories, .box');
        productCards.forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on buttons
                if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
                    return;
                }
                
                // Find product info from the card
                const productName = card.querySelector('.description, .title, p')?.textContent;
                const productImage = card.querySelector('img')?.src;
                const productPrice = card.querySelector('.price')?.textContent;
                
                if (productName) {
                    this.navigateToProduct(productName, productImage, productPrice);
                }
            });
        });

        // Setup category buttons
        const categoryButtons = document.querySelectorAll('.categories button');
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.textContent.toLowerCase();
                this.filterByCategory(category);
            });
        });
    }

    filterByCategory(category) {
        if (category === 'all category') {
            // Navigate to page2 with all products
            sessionStorage.setItem('searchResults', JSON.stringify(this.products));
            window.location.href = 'page2.html';
        } else {
            // Filter products by category
            const filteredProducts = this.products.filter(product => 
                product.category.toLowerCase().includes(category)
            );
            
            if (filteredProducts.length > 0) {
                sessionStorage.setItem('searchResults', JSON.stringify(filteredProducts));
                window.location.href = 'page2.html';
            } else {
                this.showNotification('No products found in this category');
            }
        }
    }

    navigateToProduct(productName, productImage, productPrice) {
        // Store product info in sessionStorage for the product page
        const productInfo = {
            name: productName,
            image: productImage,
            price: productPrice
        };
        sessionStorage.setItem('selectedProduct', JSON.stringify(productInfo));
        
        // Navigate to product page
        window.location.href = 'page3.html';
    }

    setupSearch() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }
    }

    performSearch() {
        const searchInput = document.querySelector('.search-input');
        const searchTerm = searchInput.value.toLowerCase();
        
        if (searchTerm.trim() === '') return;

        // Filter products based on search term
        const filteredProducts = this.products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );

        // Store search results and navigate to page2
        sessionStorage.setItem('searchResults', JSON.stringify(filteredProducts));
        window.location.href = 'page2.html';
    }

    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                ...product,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Product added to cart!');
    }

    buyNow(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        // Add to cart first
        this.addToCart(productId);
        
        // Navigate to checkout (you can create a checkout page)
        this.showNotification('Redirecting to checkout...');
        setTimeout(() => {
            // For now, just show cart
            this.showCart();
        }, 1000);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Product removed from cart!');
    }

    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
                this.updateCartDisplay();
            }
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartDisplay() {
        const cartIcon = document.querySelector('.fa-cart-shopping');
        if (cartIcon) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            if (totalItems > 0) {
                // Add cart count badge
                let badge = cartIcon.parentElement.querySelector('.cart-badge');
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'cart-badge';
                    badge.style.cssText = `
                        position: absolute;
                        top: -8px;
                        right: -8px;
                        background: red;
                        color: white;
                        border-radius: 50%;
                        width: 20px;
                        height: 20px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 12px;
                        font-weight: bold;
                    `;
                    cartIcon.parentElement.style.position = 'relative';
                    cartIcon.parentElement.appendChild(badge);
                }
                badge.textContent = totalItems;
            } else {
                const badge = cartIcon.parentElement.querySelector('.cart-badge');
                if (badge) badge.remove();
            }
        }
    }

    showCart() {
        const cartHTML = `
            <div class="cart-modal" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            ">
                <div class="cart-content" style="
                    background: white;
                    padding: 20px;
                    border-radius: 8px;
                    max-width: 500px;
                    max-height: 80vh;
                    overflow-y: auto;
                    position: relative;
                ">
                    <button class="close-cart" style="
                        position: absolute;
                        top: 10px;
                        right: 15px;
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                    ">&times;</button>
                    <h2>Shopping Cart</h2>
                    ${this.cart.length === 0 ? '<p>Your cart is empty</p>' : this.generateCartHTML()}
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', cartHTML);
        
        // Close cart functionality
        const closeBtn = document.querySelector('.close-cart');
        const modal = document.querySelector('.cart-modal');
        
        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    generateCartHTML() {
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        return `
            ${this.cart.map(item => `
                <div class="cart-item" style="
                    display: flex;
                    align-items: center;
                    padding: 10px 0;
                    border-bottom: 1px solid #eee;
                ">
                    <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; margin-right: 15px;">
                    <div style="flex: 1;">
                        <h4>${item.name}</h4>
                        <p>$${item.price}</p>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <button onclick="ecommerceApp.updateQuantity(${item.id}, ${item.quantity - 1})" style="padding: 5px 10px;">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="ecommerceApp.updateQuantity(${item.id}, ${item.quantity + 1})" style="padding: 5px 10px;">+</button>
                        <button onclick="ecommerceApp.removeFromCart(${item.id})" style="padding: 5px 10px; background: red; color: white; border: none; border-radius: 3px;">Remove</button>
                    </div>
                </div>
            `).join('')}
            <div style="margin-top: 20px; text-align: right;">
                <h3>Total: $${total.toFixed(2)}</h3>
                <button onclick="ecommerceApp.checkout()" style="
                    padding: 10px 20px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                ">Checkout</button>
            </div>
        `;
    }

    checkout() {
        alert('Checkout functionality would be implemented here!');
        // You can add payment processing, order confirmation, etc.
    }

    subscribeToNewsletter(email) {
        // Store subscription in localStorage
        const subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions') || '[]');
        if (!subscriptions.includes(email)) {
            subscriptions.push(email);
            localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
            this.showNotification('Successfully subscribed to newsletter!');
        } else {
            this.showNotification('You are already subscribed!');
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1001;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    setupTimer() {
        // Set countdown target date (4 days from now)
        const countdownDate = new Date().getTime() + (4 * 24 * 60 * 60 * 1000) + (13 * 60 * 60 * 1000) + (34 * 60 * 1000) + (56 * 1000);

        const updateTimer = () => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const daysElement = document.getElementById('days');
            const hoursElement = document.getElementById('hours');
            const minutesElement = document.getElementById('minutes');
            const secondsElement = document.getElementById('seconds');

            if (daysElement) daysElement.innerText = String(days).padStart(2, '0');
            if (hoursElement) hoursElement.innerText = String(hours).padStart(2, '0');
            if (minutesElement) minutesElement.innerText = String(minutes).padStart(2, '0');
            if (secondsElement) secondsElement.innerText = String(seconds).padStart(2, '0');
        };

        setInterval(updateTimer, 1000);
        updateTimer();
    }
}

// Initialize the ecommerce app
const ecommerceApp = new EcommerceApp();

// Add CSS for animations and dropdowns
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    .dropdown-content.show {
        display: block;
    }

    .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    .dropdown-content a:hover {
        background-color: #f1f1f1;
    }

    .dropdown {
        position: relative;
        display: inline-block;
    }
`;
document.head.appendChild(style);

// Page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle product page (page3.html)
    if (window.location.pathname.includes('page3.html')) {
        const productInfo = JSON.parse(sessionStorage.getItem('selectedProduct') || '{}');
        if (productInfo.name) {
            // Update product details on page3
            const productTitle = document.querySelector('.product-details h1');
            const productImage = document.querySelector('.product-image img');
            const buyNowBtn = document.querySelector('.buy-now');
            const addCartBtn = document.querySelector('.add-cart');
            
            if (productTitle) productTitle.textContent = productInfo.name;
            if (productImage && productInfo.image) productImage.src = productInfo.image;
            if (buyNowBtn) buyNowBtn.setAttribute('data-product-id', '1');
            if (addCartBtn) addCartBtn.setAttribute('data-product-id', '1');
        }
    }

    // Handle search results page (page2.html)
    if (window.location.pathname.includes('page2.html')) {
        const searchResults = JSON.parse(sessionStorage.getItem('searchResults') || '[]');
        if (searchResults.length > 0) {
            // Update the accessories list with search results
            const accessoriesList = document.getElementById('accessories-list');
            if (accessoriesList) {
                accessoriesList.innerHTML = searchResults.map(product => `
                    <div class="accessories" style="cursor: pointer;">
                        <img src="${product.image}" alt="${product.name}">
                        <div>
                            <p class="acc-price">$${product.price} ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}</p>
                            <div class="stars">
                                <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star" style="color:#BDC4CD;"></i>
                            </div>
                            <p class="acc-desc">${product.description}</p>
                        </div>
                    </div>
                `).join('');
            }
        }
    }
});