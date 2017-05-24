document.addEventListener('DOMContentLoaded', function() {
  Array.prototype.forEach.call(document.querySelectorAll('.hg-rotate'), function(container) {
    container.style.height = container.querySelector('img').height + "px";
    function activateNext() {
      var active = container.querySelectorAll('img+img:not(.active)');
      if (active.length > 0) {
        active[0].classList.add("active");
        if (active.length == 1) {
          setTimeout(activateNext, 2000);
        } else {
          setTimeout(activateNext, 1000);
        }
      } else {
        Array.prototype.forEach.call(container.querySelectorAll('.active'), function(img) {
          img.classList.remove("active");
        });
        setTimeout(activateNext, 1000);
      }
    }
    setTimeout(activateNext, 1000);
  });
});
