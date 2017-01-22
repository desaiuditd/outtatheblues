/**
 * Created by udit on 22/01/17.
 */

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "AIzaSyAAr-PydyLPmvAelN4wfDI04tPclIOqBSM",
  authDomain: "scu-hackathons.firebaseapp.com",
  databaseURL: "https://scu-hackathons.firebaseio.com",
  storageBucket: "scu-hackathons.appspot.com",
  messagingSenderId: "582430128541"
};
firebase.initializeApp(config);

/* Local Database Access */
var ref = firebase.database().ref("Alexa");

/* The Raspberry Pi is always listening to the database to see if voice commands to Alexa are issued */
ref.on("child_changed", function(snap) {
  console.log("initial data loaded!", snap.key + ":", snap.val());
  if (snap.val() == 'callFacialRecog') {                                              //After the Alexa application is triggered by onLaunch or DoorIntent
    //Snaps a picture of whatever is in front of the door
    MeteorCamera.getPicture(
      {
        width: 640,
        height: 480,
        quality: 100
      }, function (error, data) {

        if (error) {
          console.log(error);
        } else {
          // Create a Face - with detect api
          // b64toBlob(data.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""), 'image/png')
          Meteor.call('detectAPI', data, function (error, results) {
            if (error) {
              console.log(error);
            } else {
              console.log(results);
              // ref.child("Read").set(results);
            }
          })
        }
      }
    );
  } /* When Raspberry Pi reads that the Alexa wrote the facial traning indicator word to the database */
  else if (snap.val() != null && snap.val().includes('callFacialTrain')) {

  }
});
