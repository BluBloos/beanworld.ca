(function () {
  var mapContainer = document.getElementById('map-container');
  var mapBg = document.getElementById('map-bg');

  // --- Coordinate mapping configuration ---
  // Minecraft coordinate bounds that the map image represents
  var MC_MIN_X = -500;
  var MC_MAX_X = 500;
  var MC_MIN_Z = -500;
  var MC_MAX_Z = 500;

  // Map image dimensions (must match the SVG viewBox)
  var IMG_W = 1000;
  var IMG_H = 700;

  // Padding inside the map border (pixels in the SVG)
  var PAD_X = 40;
  var PAD_Y = 80;

  function mcToPixel(x, z) {
    // Map Minecraft (x, z) to pixel (left%, top%) on the image
    var pxX = PAD_X + ((x - MC_MIN_X) / (MC_MAX_X - MC_MIN_X)) * (IMG_W - 2 * PAD_X);
    var pxY = PAD_Y + ((z - MC_MIN_Z) / (MC_MAX_Z - MC_MIN_Z)) * (IMG_H - 2 * PAD_Y);

    return {
      leftPct: (pxX / IMG_W) * 100,
      topPct: (pxY / IMG_H) * 100,
    };
  }

  function render(builds) {
    if (!builds || builds.length === 0) return;

    // Remove any existing markers
    mapContainer.querySelectorAll('.map-marker').forEach(function (el) {
      el.remove();
    });

    builds.forEach(function (build) {
      var pos = mcToPixel(build.x, build.z);

      var marker = document.createElement('div');
      marker.className = 'map-marker';
      marker.style.left = pos.leftPct + '%';
      marker.style.top = pos.topPct + '%';

      marker.innerHTML =
        '<div class="pin"></div>' +
        '<span class="label">' + build.name + '</span>' +
        '<div class="map-tooltip">' +
          '<div class="name">' + build.name + '</div>' +
          '<div class="builder">Built by ' + build.builder + '</div>' +
          '<div class="date">' + build.date + '</div>' +
        '</div>';

      // Toggle tooltip on click (for mobile)
      marker.addEventListener('click', function () {
        // Close all others
        mapContainer.querySelectorAll('.map-marker.active').forEach(function (el) {
          if (el !== marker) el.classList.remove('active');
        });
        marker.classList.toggle('active');
      });

      mapContainer.appendChild(marker);
    });
  }

  fetch('data/builds.json')
    .then(function (res) { return res.json(); })
    .then(render)
    .catch(function (err) {
      console.error('Failed to load builds:', err);
    });
})();
