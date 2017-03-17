function carousel(selector, image, advance, reverse) {
  var elements = document.querySelectorAll(selector);
  if (image) image = document.querySelector(image);
  if (advance) advance = document.querySelector(advance);
  if (reverse) reverse = document.querySelector(reverse);
  if (elements.length === 0) return;

  var index = 0;
  function change(amount) {
    index = Math.min(Math.max(index + amount, 0), elements.length - 1);

    if (image) image.src = elements.item(index).getAttribute('data-carousel');

    if (index <= 0) {
      reverse.style.display = "none";
    } else {
      reverse.style.display = "inline-block";
    }

    if (index >= elements.length - 1) {
      advance.style.display = "none";
    } else {
      advance.style.display = "inline-block";
    }

    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
    elements.item(index).style.display = "block";
  }
  change(0);

  if (advance) advance.addEventListener('click', function(event) { change(+1); });
  if (reverse) {
    reverse.addEventListener('click', function(event) { change(-1); });
    reverse.style.display = "none";
  }
}
