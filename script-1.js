
// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
});

// Hero slider functionality
let slideIndex = 1;
let slideInterval;

function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!slides.length) return;
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

function currentSlide(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex = n);
    startSlideShow();
}

function nextSlide() {
    showSlides(slideIndex += 1);
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
}

// Initialize slider
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        showSlides(slideIndex);
        startSlideShow();
    }
});

// Menu filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('menu-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    const noResults = document.getElementById('no-results');
    
    let currentCategory = 'all';
    let currentSearchTerm = '';
    
    // Filter by category
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                currentCategory = this.getAttribute('data-category');
                filterItems();
            });
        });
    }
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentSearchTerm = this.value.toLowerCase();
            filterItems();
        });
    }
    
    function filterItems() {
        if (!menuItems.length) return;
        
        let visibleCount = 0;
        
        menuItems.forEach(item => {
            const category = item.getAttribute('data-category');
            const itemName = item.querySelector('h3').textContent.toLowerCase();
            const itemDescription = item.querySelector('p').textContent.toLowerCase();
            
            const matchesCategory = currentCategory === 'all' || category === currentCategory;
            const matchesSearch = currentSearchTerm === '' || 
                                itemName.includes(currentSearchTerm) || 
                                itemDescription.includes(currentSearchTerm);
            
            if (matchesCategory && matchesSearch) {
                item.style.display = 'block';
                item.classList.add('fade-in');
                visibleCount++;
            } else {
                item.style.display = 'none';
                item.classList.remove('fade-in');
            }
        });
        
        // Show/hide no results message
        if (noResults) {
            if (visibleCount === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        }
    }
});

// Add to cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    const orderMealButtons = document.querySelectorAll('.order-meal-btn');
    
    // Add to cart
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.closest('.menu-item, .meal-item').querySelector('h3').textContent;
            showNotification(`${itemName} added to cart!`);
        });
    });
    
    // Favorite toggle
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent === '♡') {
                this.textContent = '❤️';
                this.style.color = '#DA020E';
            } else {
                this.textContent = '♡';
                this.style.color = '';
            }
        });
    });
    
    // Order meal
    orderMealButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mealName = this.closest('.meal-item').querySelector('h3').textContent;
            showNotification(`${mealName} added to cart!`);
        });
    });
});

// Store locator functionality
document.addEventListener('DOMContentLoaded', function() {
    const locationInput = document.getElementById('location-input');
    const findButton = document.querySelector('.find-btn');
    
    if (findButton) {
        findButton.addEventListener('click', function() {
            const location = locationInput ? locationInput.value : '';
            if (location.trim()) {
                showNotification(`Searching for McDonald's near ${location}...`);
                // Here you would integrate with a real store locator API
            } else {
                showNotification('Please enter a location to search.');
            }
        });
    }
});

// Notification system
function showNotification(message) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background-color: #DA020E;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        font-weight: 500;
    `;
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
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
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove notification after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Form validation for store locator
document.addEventListener('DOMContentLoaded', function() {
    const locationInput = document.getElementById('location-input');
    
    if (locationInput) {
        locationInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const findButton = document.querySelector('.find-btn');
                if (findButton) {
                    findButton.click();
                }
            }
        });
    }
});

// Add loading states to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Skip if it's a filter button or navigation button
            if (this.classList.contains('filter-btn') || 
                this.classList.contains('nav-btn') ||
                this.classList.contains('favorite-btn')) {
                return;
            }
            
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            // Simulate loading time
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 1000);
        });
    });
});

// Initialize animations on scroll
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.menu-item, .service-item, .timeline-item, .mvv-item, .stat-item');
    animateElements.forEach(el => observer.observe(el));
});
