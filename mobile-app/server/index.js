/**
 * Created by udit on 22/01/17.
 */

var blobUtil = require('blob-util');

Meteor.methods({
  detectAPI(imageDataURL) {

    var options = {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': '3c876c12d0954e50975a7f0047e2c1dd',
      },
      content: imageDataURL,
      npmRequestOptions: { body: null, formData: imageDataURL }, //After picture is taken, image data is set on the facial recognition API
    };

    try {
      var detectRes = HTTP.post('https://westus.api.cognitive.microsoft.com/face/v1.0/detect', options).data;

      console.log(detectRes);

      if ( detectRes && detectRes.error ) {
        return 'noPerson';
      } else {

        var faceId = detectRes[0]['faceId'];

        console.log(faceId);

        var identifyRes = HTTP.post('https://westus.api.cognitive.microsoft.com/face/v1.0/identify', {
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': '3c876c12d0954e50975a7f0047e2c1dd',
          },
          body: {
            faceIds: [faceId],
            personGroupId: 'outtatheblues'
          }
        }).data;

        console.log(identifyRes);

        if (identifyRes && identifyRes.error) {
          return 'Failed';
        } else {
          var face = identifyRes[0];
          console.log(face);

          // Call Person API to know the name

          var name = 'doneRecog Udit';   //Sends recognized name with 'doneRecog' data to database when recognition is complete
          return name;
        }
      }
    } catch (err) {       //Case if request not properly made
      console.log(err);
      return 'Failed';
    }

  },
});
