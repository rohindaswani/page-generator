function pin(node, minScroll, maxScroll) {
  if (typeof node === "string") node = document.querySelector(node);
  var scale = node.offsetTop / minScroll;
  minScroll = node.offsetTop;
  maxScroll *= scale;
  function animator() {
    var scroll = window.pageYOffset;
    if (scroll < minScroll) {
      node.style.position = "absolute";
      node.style.top = minScroll + "px";
    } else if (scroll < maxScroll - node.height) {
      node.style.top = 0;
      node.style.position = "fixed";
    } else {
      node.style.position = "absolute";
      node.style.top = maxScroll - node.height + "px";
    }
  }
  window.addEventListener('scroll', function(event) { window.requestAnimationFrame(animator); }, false);
  animator();
}
