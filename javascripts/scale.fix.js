// Fix scaling issues on mobile devices
(function() {
  var viewport = document.querySelector("meta[name=viewport]");
  viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);
})(); 