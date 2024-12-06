// Funktion zum Öffnen der Lightbox
function openLightbox(event) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightbox.style.display = 'flex';
    lightboxImg.src = event.target.src;
}

// Funktion zum Schließen der Lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

// Funktion zum Wechseln der Bilder in der Lightbox
function changeImage(direction) {
    const lightboxImg = document.getElementById('lightbox-img');
    const images = Array.from(document.querySelectorAll('.gallery img'));
    const currentIndex = images.findIndex(img => img.src === lightboxImg.src);
    let newIndex = currentIndex + direction;

    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;

    lightboxImg.src = images[newIndex].src;
}
