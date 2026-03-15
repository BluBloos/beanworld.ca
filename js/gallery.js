(function () {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var closeBtn = document.querySelector('.lightbox-close');
  var gallery = document.getElementById('gallery');
  var emptyState = document.getElementById('gallery-empty');

  function formatDate(dateStr) {
    var d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  function render(photos) {
    if (!photos || photos.length === 0) return;

    emptyState.style.display = 'none';

    gallery.innerHTML = photos.map(function (photo) {
      return (
        '<figure class="gallery-item">' +
          '<img src="' + photo.src + '" alt="' + photo.caption + '">' +
          '<figcaption>' +
            '<span class="gallery-date">' + formatDate(photo.date) + '</span>' +
            photo.caption +
          '</figcaption>' +
        '</figure>'
      );
    }).join('');
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

  fetch('data/gallery.json')
    .then(function (res) { return res.json(); })
    .then(render)
    .catch(function (err) {
      console.error('Failed to load gallery:', err);
    });
})();
