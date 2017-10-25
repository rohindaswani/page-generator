function playInView(node) {
  if (typeof node === "string") node = document.querySelector(node);
  function play() {
    var top = node.getBoundingClientRect().top;
    if( top < 550 ) {
      node.play();
    }
  }
  window.addEventListener('scroll', function(event) { play(); }, false);
  play()
}
