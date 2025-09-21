const images = document.querySelectorAll('.gallery img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
let currentIndex = 0;

// Open Lightbox
images.forEach((img, index) => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    currentIndex = index;
  });
});

// Close Lightbox
function closeLightbox() {
  lightbox.style.display = 'none';
}

// Next/Prev
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
}
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
}

// Filter
function filterImages(category) {
  images.forEach(img => {
    if (category === 'all' || img.dataset.category === category) {
      img.style.display = 'block';
      img.classList.add("fade-in");
    } else {
      img.style.display = 'none';
    }
  });
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeLightbox();
  }
});
