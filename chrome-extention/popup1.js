

  document.getElementById("vibes").addEventListener("click", function() {
  var newURL = "file:///Users/mahendramhatre/Desktop/outtatheblues/chrome-extention/graph.html";
  chrome.tabs.create({ url: newURL });
})
