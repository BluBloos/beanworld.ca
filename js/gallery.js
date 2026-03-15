(function () {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const gallery = document.getElementById('gallery');
  const emptyState = document.getElementById('gallery-empty');

  // Hide empty state if gallery has images
  const images = gallery.querySelectorAll('img');
  if (images.length > 0) {
    emptyState.style.display = 'none';
  }

  // Open lightbox on image click
  gallery.addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG') {
      lightboxImg.src = e.target.src;
      lightboxImg.alt = e.target.alt;
      lightbox.classList.add('open');
    }
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
  }

  closeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    closeLightbox();
  });

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
})();
