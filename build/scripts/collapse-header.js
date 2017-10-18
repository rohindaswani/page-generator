function collapseHeader(header, node, scrollPoint) {
  if (typeof header === "string") header = document.querySelector(header);
  if (typeof node === "string") node = document.querySelector(node);
  var setDisplayOnChildren = function(element, value) {
    Array.prototype.forEach.call(element.children, function (child) {
      child.style.display = value;
    });
  };
  function collapse() {
    if( window.pageYOffset > scrollPoint){
      setDisplayOnChildren(header, "none");
      node.style.display = "";
      node.style.position = "fixed";
    }
    else{
      setDisplayOnChildren(header, "");
      header.style.position = "fixed";
      node.style.position = "";
    }
  }
  window.addEventListener('scroll', function(event) { collapse(); }, false);
  collapse()
}