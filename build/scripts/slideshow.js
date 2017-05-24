Array.from(document.querySelectorAll("ul.slideshow")).forEach(function(root) {
  var current = 0;
  var slides = Array.from(root.children).filter(function(node) { return node.matches("li"); });
  var nextButton = document.querySelector(root.dataset.next);
  var prevButton = document.querySelector(root.dataset.prev);

  function refresh() {
    if (prevButton) prevButton.disabled = (current <= 0);
    if (nextButton) nextButton.disabled = (current >= slides.length - 1);
    if (root.dataset.currentIndex) Array.from(document.querySelectorAll(root.dataset.currentIndex)).forEach(function(node) { node.textContent = current + 1; });
    if (root.dataset.maxIndex) Array.from(document.querySelectorAll(root.dataset.maxIndex)).forEach(function(node) { node.textContent = slides.length; });
  }

  function hide(slide) {
    slide.dataset.display = slide.style.display;
    slide.style.display = "none";
  }

  function show(slide) {
    slide.style.display = slide.dataset.display;
  }

  function activate(n) {
    hide(slides[current]);
    current = n;
    show(slides[current])
    refresh();
    root.dispatchEvent(new CustomEvent('change', { detail: { page: current, total: slides.length }}));
  }

  slides.forEach(hide);
  show(slides[0]);
  refresh();

  if (nextButton) nextButton.addEventListener('click', function(event) { activate(current + 1); });
  if (prevButton) prevButton.addEventListener('click', function(event) { activate(current - 1); });
});
