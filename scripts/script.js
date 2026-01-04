// ===========================
// Mobile Menu Toggle
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navDesktop = document.querySelector('.nav-desktop');

    // Create mobile menu if it doesn't exist
    let mobileMenu = document.querySelector('.nav-mobile');

    if (!mobileMenu) {
        mobileMenu = document.createElement('nav');
        mobileMenu.className = 'nav-mobile';
        mobileMenu.innerHTML = `
            <a class="nav-link" href="index.html">Home</a>
            <a class="nav-link" href="about.html">About</a>
            <a class="nav-link" href="sessions.html">Sessions</a>
            <a class="nav-link" href="booking.html">Booking</a>
            <a class="nav-link" href="shop.html">Shop</a>
            <a class="nav-link" href="contact.html">Contact</a>
        `;

        // Add mobile menu styles
        mobileMenu.style.cssText = `
            display: none;
            position: fixed;
            top: 73px;
            left: 0;
            right: 0;
            background-color: rgba(15, 15, 15, 0.98);
            backdrop-filter: blur(12px);
            padding: 1.5rem;
            flex-direction: column;
            gap: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            z-index: 40;
            animation: slideDown 0.3s ease-out;
        `;

        document.querySelector('.header').appendChild(mobileMenu);
    }

    // Add animation keyframes
    if (!document.querySelector('#mobile-menu-animations')) {
        const style = document.createElement('style');
        style.id = 'mobile-menu-animations';
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideUp {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(-10px);
                }
            }
            
            .nav-mobile.closing {
                animation: slideUp 0.3s ease-out;
            }
        `;
        document.head.appendChild(style);
    }

    // Toggle mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            const isOpen = mobileMenu.style.display === 'flex';

            if (isOpen) {
                mobileMenu.classList.add('closing');
                setTimeout(() => {
                    mobileMenu.style.display = 'none';
                    mobileMenu.classList.remove('closing');
                }, 300);
            } else {
                mobileMenu.style.display = 'flex';
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);

        if (!isClickInsideMenu && !isClickOnToggle && mobileMenu.style.display === 'flex') {
            mobileMenu.classList.add('closing');
            setTimeout(() => {
                mobileMenu.style.display = 'none';
                mobileMenu.classList.remove('closing');
            }, 300);
        }
    });

    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 1024) {
            mobileMenu.style.display = 'none';
        }
    });
});

// ===========================
// Smooth Scroll for Navigation Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Button Click Handlers (Placeholder)
// ===========================
const joinButtons = document.querySelectorAll('.btn-primary');
joinButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Placeholder for join session functionality
        // console.log('Join Session clicked');
        // alert('Join Session functionality will be implemented here!');
    });
});

const learnMoreButtons = document.querySelectorAll('.btn-secondary');
learnMoreButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Placeholder for learn more functionality
        console.log('Learn More clicked');
        // Could scroll to about section or open a modal
    });
});

// ===========================
// Scroll Animation for Feature Cards
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===========================
// Header Background on Scroll
// ===========================
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.backgroundColor = 'rgba(15, 15, 15, 0.95)';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(15, 15, 15, 0.8)';
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===========================
// Add Active State to Navigation Links
// ===========================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});
