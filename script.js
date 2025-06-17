// Datos de productos
const products = [
    {
        id: 1,
        name: 'Jumpsuit Neon',
        price: 199.99,
        image: 'img/product1.jpg',
        description: 'Jumpsuit con estampado neón y detalles retro'
    },
    {
        id: 2,
        name: 'Vestido Glam',
        price: 149.99,
        image: 'img/product2.jpg',
        description: 'Vestido con hombreras y estampado ochentero'
    },
    {
        id: 3,
        name: 'Top Glam',
        price: 79.99,
        image: 'img/product3.png',
        description: 'Top con detalles metalizados y hombreras'
    },
    {
        id: 4,
        name: 'Pantalones Power',
        price: 129.99,
        image: 'img/product4.jpg',
        description: 'Pantalones anchos con cintura alta y detalles brillantes'
    },
    {
        id: 5,
        name: 'Chaqueta Moto',
        price: 179.99,
        image: 'img/product5.jpg',
        description: 'Chaqueta de cuero sintético con hombreras y cierre de metal'
    },
    {
        id: 6,
        name: 'Falda Midi',
        price: 99.99,
        image: 'img/product6.jpg',
        description: 'Falda midi con estampado geométrico ochentero'
    },
    {
        id: 7,
        name: 'Crop Top',
        price: 69.99,
        image: 'img/product7.jpg',
        description: 'Crop top con mangas acampanadas y detalles brillantes'
    },
    {
        id: 8,
        name: 'Vestido Mini',
        price: 139.99,
        image: 'img/product8.jpg',
        description: 'Vestido mini con cuello alto y detalles de vinilo'
    },
    {
        id: 9,
        name: 'Blazer',
        price: 169.99,
        image: 'img/product9.jpg',
        description: 'Blazer con hombreras y botones dorados'
    },
    {
        id: 10,
        name: 'Body',
        price: 89.99,
        image: 'img/product10.jpg',
        description: 'Body con tirantes gruesos y detalles brillantes'
    }
];

// Datos de músicos
const musicians = [
    {
        id: 1,
        name: 'Madonna',
        image: 'img/madonna.png',
        description: 'La reina del pop que revolucionó la moda ochentera',
        youtubeId: 'zpzdgmqIHOQ'
    },
    {
        id: 2,
        name: 'Prince',
        image: 'img/prince.png',
        description: 'El ícono de la música y la moda más influyente de los 80s',
        youtubeId: 'l7vRSu_wsNc'
    },
    {
        id: 3,
        name: 'Cyndi Lauper',
        image: 'img/cyndi.png',
        description: 'La reina del neón y los colores vibrantes',
        youtubeId: 'PIb6AZdTr-A'
    },
    {
        id: 4,
        name: 'Michael Jackson',
        image: 'img/michaeljackson.png',
        description: 'El rey del pop, ícono de la música y la danza de los 80s',
        youtubeId: '4V90AmXnguw'  // Video de Thriller
    }
];

// Carrito de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Funciones
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function renderProducts() {
    const productsGrid = document.querySelector('.products-grid');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Agregar al Carrito</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

function renderMusicians() {
    const musicGrid = document.querySelector('.music-grid');
    musicians.forEach(musician => {
        const musicCard = document.createElement('div');
        musicCard.className = 'music-card';
        musicCard.innerHTML = `
            <div class="music-content">
                <a href="#" class="music-link" data-youtube-id="${musician.youtubeId}">
                    <img src="${musician.image}" alt="${musician.name}" class="music-image">
                </a>
                <div class="music-info">
                    <h3 class="music-title">${musician.name}</h3>
                    <p class="music-description">${musician.description}</p>
                </div>
            </div>
        `;
        musicGrid.appendChild(musicCard);
    });

    // Añadir evento click a los enlaces de música
    document.querySelectorAll('.music-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const youtubeId = link.dataset.youtubeId;
            openYouTubeVideo(youtubeId);
        });
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Producto agregado al carrito');
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    notification.style.transform = 'translateY(0)';
    setTimeout(() => {
        notification.style.transform = 'translateY(-100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function openYouTubeVideo(youtubeId) {
    const videoUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
    window.open(videoUrl, '_blank');
}

// Event Listeners
window.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderMusicians();
    updateCartCount();
    
    // Manejar clic en el carrito
    document.querySelector('.cart').addEventListener('click', () => {
        window.location.href = 'cart.html';
    });

    // Mobile Menu
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Contact Form
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Mensaje enviado con éxito');
        contactForm.reset();
    });
});

// Animaciones
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.product-card, .music-card');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});
