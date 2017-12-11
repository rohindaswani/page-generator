function pinWithHeader(header, node, minScroll, maxScroll, additionalScroll = 0) {
  if (typeof header === "string") header = document.querySelector(header);
  if (typeof node === "string") node = document.querySelector(node);
  var scale = node.offsetTop / minScroll;
  minScroll = node.offsetTop;
  maxScroll *= scale;
  function animator() {
    var scroll = window.pageYOffset;
    if (scroll + header.offsetHeight < minScroll) {
      node.style.position = "absolute";
      node.style.top = minScroll + "px";
    } else if (scroll < maxScroll + header.offsetHeight - node.clientHeight) {
      node.style.top = header.offsetHeight + "px";
      node.style.position = "fixed";
    } else {
      node.style.position = "absolute";
      node.style.top = maxScroll - header.offsetHeight + additionalScroll + "px";
    }
  }
  window.addEventListener('scroll', function(event) { window.requestAnimationFrame(animator); }, false);
  animator();
}
