// Niksen — small vanilla JS enhancements (no framework)

// Herbarium filter chips (visual toggle)
document.addEventListener('click', function (e) {
  var chip = e.target.closest('.chip');
  if (!chip) return;
  var group = chip.closest('.filters');
  if (!group) return;
  group.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
  chip.classList.add('active');

  var filter = chip.dataset.filter;
  var cards = document.querySelectorAll('.herb-grid .herb-card');
  cards.forEach(function (card) {
    var show = !filter || filter === 'all' || card.dataset.tag === filter;
    card.style.display = show ? '' : 'none';
  });
});

// Newsletter form — no backend, just acknowledge
document.addEventListener('submit', function (e) {
  var form = e.target.closest('.subscribe');
  if (!form) return;
  e.preventDefault();
  form.innerHTML = '<p style="margin:0;font-size:15px;color:var(--accent);">Thank you — check your inbox to confirm.</p>';
});
