document.addEventListener('DOMContentLoaded', () => {
    // Carousel functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function previousSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Allow manual navigation if needed
    showSlide(currentSlide);

    // Navigation arrows functionality
    const prevArrow = document.getElementById('prev-arrow');
    const nextArrow = document.getElementById('next-arrow');

    prevArrow.addEventListener('click', previousSlide);
    nextArrow.addEventListener('click', nextSlide);

    // Menu toggle functionality
    const menuToggle = document.querySelector('.hamburger');
    const menu = document.querySelector('.menuppal');

    menuToggle.addEventListener('click', (event) => {
        menuToggle.classList.toggle('is-active');
        menu.classList.toggle('is_active');
        event.preventDefault();
    });

    // Navigation through menu
    menu.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            const targetSlide = event.target.getAttribute('href').replace('#slide-', '');
            currentSlide = parseInt(targetSlide);
            showSlide(currentSlide);
            menuToggle.classList.remove('is-active');
            menu.classList.remove('is_active');
        }
    });

    // Keyboard navigation functionality
    window.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
            nextSlide();
        } else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
            previousSlide();
        }
    });

    // Scroll functionality for mobile
    window.addEventListener('wheel', (event) => {
        if (event.deltaY > 0) {
            nextSlide();
        } else {
            previousSlide();
        }
    });

    // Touch functionality for mobile
    let touchStartX = 0;
    let touchStartY = 0;

    window.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    });

    window.addEventListener('touchend', (event) => {
        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                previousSlide();
            } else {
                nextSlide();
            }
        } else {
            if (deltaY > 0) {
                previousSlide();
            } else {
                nextSlide();
            }
        }
    });
});