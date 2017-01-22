// Saves options to chrome.storage.sync.
function save_options() {
  var isEnableSnap = document.getElementById('isEnableSnap').checked;
  chrome.storage.sync.set({
    isEnableSnap: isEnableSnap,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    isEnableSnap: true
  }, function(items) {
    // document.getElementById('color').value = items.favoriteColor;
    document.getElementById('isEnableSnap').checked = items.isEnableSnap;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);

// Access Camera Permission hack

window.onload = function() {

  // Normalize the various vendor prefixed versions of getUserMedia.
  navigator.getUserMedia = (navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia);
}

function success(stream) {
  console.log('User accepted');
  setTimeout(function () {
    var tracks = stream.getTracks();
    for(var i = 0; i < tracks.length; i++) {
      tracks[i].stop();
    }
  }, 3000);
}

function deny(obj) {
  console.log(obj);
  console.log('User rejected');
}

navigator.getUserMedia({video: true, audio: true}, success, deny);
