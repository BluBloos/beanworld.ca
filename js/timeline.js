(function () {
  const container = document.getElementById('timeline');

  function formatDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  function render(builds) {
    if (!builds || builds.length === 0) {
      container.innerHTML = '<div class="empty-state">No builds recorded yet.</div>';
      return;
    }

    // Sort oldest first (left to right)
    builds.sort(function (a, b) {
      return a.date.localeCompare(b.date);
    });

    container.innerHTML = builds
      .map(function (build) {
        return (
          '<div class="timeline-entry">' +
            '<div class="timeline-card">' +
              '<div class="date">' + formatDate(build.date) + '</div>' +
              '<div class="name">' + build.name + '</div>' +
              '<div class="builder">Built by ' + build.builder + '</div>' +
              '<div class="description">' + build.description + '</div>' +
            '</div>' +
          '</div>'
        );
      })
      .join('');
  }

  fetch('data/builds.json')
    .then(function (res) { return res.json(); })
    .then(render)
    .catch(function (err) {
      console.error('Failed to load builds:', err);
      container.innerHTML = '<div class="empty-state">Could not load build data.</div>';
    });
})();
