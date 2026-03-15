document.addEventListener('DOMContentLoaded', () => {
    // Burger menu + smooth scroll + year (same as before)
    const burger = document.getElementById('burger');
    const menu = document.getElementById('menu');
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    burger.addEventListener('click', () => {
        menu.classList.toggle('active');
        burger.textContent = menu.classList.contains('active') ? '✕' : '☰';
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
                burger.textContent = '☰';
            }
        });
    });

    // Hero slideshow (same as before)
    const slides = document.querySelectorAll('.slide');
    let slideIndex = 0;
    function showSlide(n) { slides.forEach(s => s.classList.remove('active')); slides[n].classList.add('active'); }
    document.getElementById('next').addEventListener('click', () => { slideIndex = (slideIndex + 1) % slides.length; showSlide(slideIndex); });
    document.getElementById('prev').addEventListener('click', () => { slideIndex = (slideIndex - 1 + slides.length) % slides.length; showSlide(slideIndex); });
    setInterval(() => { slideIndex = (slideIndex + 1) % slides.length; showSlide(slideIndex); }, 4000);

    // LIGHTBOX
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modal-image');
    const modalCounter = document.getElementById('modal-counter');
    const closeBtn = document.getElementById('close-modal');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');

    const images = [
        {src: "assets/FrontView.jpeg", alt: "Front View"},
        {src: "assets/RightSideview.jpeg", alt: "Right Side View"},
        {src: "assets/BackView.jpeg", alt: "Rear View"},
        {src: "assets/sideview.jpeg", alt: "Side View"},
        {src: "assets/FrontSeat.jpeg", alt: "Front Seats"},
        {src: "assets/Steering.jpeg", alt: "Dashboard & Steering"},
        {src: "assets/BackSeat.jpeg", alt: "Back Seats"},
        {src: "assets/backgroundImage.jpeg", alt: "Background Image"}

    ];

    let currentIndex = 0;

    function openLightbox(index) {
        currentIndex = index;
        modal.style.display = "flex";
        modalImg.src = images[index].src;
        modalImg.alt = images[index].alt;
        modalCounter.textContent = `${index + 1}/${images.length}`;
    }

    function closeLightbox() {
        modal.style.display = "none";
    }

    function changeImage(direction) {
        currentIndex = (currentIndex + direction + images.length) % images.length;
        modalImg.src = images[currentIndex].src;
        modalCounter.textContent = `${currentIndex + 1}/${images.length}`;
    }

    // Click any gallery image
    document.querySelectorAll('.gallery-image').forEach(img => {
        img.addEventListener('click', () => {
            openLightbox(parseInt(img.dataset.index));
        });
    });

    // Lightbox controls
    closeBtn.addEventListener('click', closeLightbox);
    modalPrev.addEventListener('click', () => changeImage(-1));
    modalNext.addEventListener('click', () => changeImage(1));
    modal.addEventListener('click', e => { if (e.target === modal) closeLightbox(); });

    // Keyboard support
    document.addEventListener('keydown', e => {
        if (modal.style.display === "flex") {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") changeImage(-1);
            if (e.key === "ArrowRight") changeImage(1);
        }
    });
});
