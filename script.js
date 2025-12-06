// Get modal elements
const modal = document.getElementById("orderModal");
const closeBtn = document.querySelector(".close");

// Get all order buttons
const orderButtons = document.querySelectorAll(".btn-order");

// Open modal when order button is clicked
orderButtons.forEach(button => {
    button.addEventListener("click", function(e) {
        e.preventDefault();
        if (modal) {
            modal.style.display = "block";
        }
    });
});

// Close modal when X is clicked
if (closeBtn) {
    closeBtn.addEventListener("click", function() {
        if (modal) {
            modal.style.display = "none";
        }
    });
}

// Close modal when clicking outside of it
window.addEventListener("click", function(event) {
    if (modal && event.target == modal) {
        modal.style.display = "none";
    }
});

// Escape key to close modal
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape" && modal && modal.style.display === "block") {
        modal.style.display = "none";
    }
});

// Category Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const menuCategories = document.querySelectorAll('.menu-category');

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-category');

            // Remove active class from all tabs and categories
            categoryTabs.forEach(t => t.classList.remove('active'));
            menuCategories.forEach(category => category.classList.remove('active'));

            // Add active class to clicked tab and corresponding category
            this.classList.add('active');
            const targetCategory = document.getElementById(categoryId);
            if (targetCategory) {
                targetCategory.classList.add('active');
            }
        });
    });

    // Add ripple effect to buttons
    addRippleEffect();
});

// Order Item Function
function orderItem(itemName) {
    if (modal) {
        modal.style.display = "block";
    }
    console.log("تم طلب: " + itemName);
}

// Ripple Effect Function
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            const ripples = this.querySelectorAll('.ripple');
            ripples.forEach(r => r.remove());
            
            this.appendChild(ripple);
        });
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = "slideIn 0.6s ease-out forwards";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll(".menu-item, .specialty-card, .contact-card").forEach(el => {
    observer.observe(el);
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    /* Custom scrollbar */
    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #d32f2f, #f57c00);
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #c41c1c, #e66100);
    }
`;
document.head.appendChild(style);

// Parallax effect for hero
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Search functionality for menu
function searchMenu() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;
    
    const filter = searchInput.value.toLowerCase();
    const menuItems = document.querySelectorAll(".menu-item");
    
    menuItems.forEach(item => {
        const titleElement = item.querySelector("h4");
        if (titleElement) {
            const title = titleElement.textContent.toLowerCase();
            if (title.includes(filter)) {
                item.style.display = "";
                item.style.animation = "slideIn 0.3s ease-out";
            } else {
                item.style.display = "none";
            }
        }
    });
}

// Prevent form submission
document.addEventListener("submit", function(e) {
    e.preventDefault();
});
