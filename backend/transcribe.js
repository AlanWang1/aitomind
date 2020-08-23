module.exports = function(path, responseFileName, filepath, firstResponse) {
  const keywords = require('./keywords.js')
  const entities = require('./entities.js') 
    //"use strict";
    //console.log(path);
    // pull in the required packages.
    var sdk = require("microsoft-cognitiveservices-speech-sdk");
    var fs = require("fs");
    var text=[];
    // replace with your own subscription key,
    // service region (e.g., "westus"), and
    // the name of the file you want to run
    // through the speech recognizer.
    var subscriptionKey = "4d4bf316f31d4aac815068ccf8f78582";
    var serviceRegion = "eastus"; // e.g., "westus"
    var filename = path; // 16000 Hz, Mono
    
    // k.create the push stream we need for the speech sd
    var pushStream = sdk.AudioInputStream.createPushStream();
    
    // open the file and push it to the push stream.
    fs.createReadStream(filename).on('data', function(arrayBuffer) {
      pushStream.write(arrayBuffer.slice());
    }).on('end', function() {
      pushStream.close();
    });
    
    // we are done with the setup
    //console.log("Now recognizing from: " + filename);
    
    // now create the audio-config pointing to our stream and
    // the speech config specifying the language.
    var audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
    var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    
    // setting the recognition language to English.
    speechConfig.speechRecognitionLanguage = "en-US";
    
    // create the speech recognizer.
    var recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    
    // start the recognizer and wait for a result.
   /*  recognizer.recognizeOnceAsync(
      function (result) {
        console.log(result);
    
        recognizer.close();
        recognizer = undefined;
      },
      function (err) {
        console.trace("err - " + err);
    
        recognizer.close();
        recognizer = undefined;
      }); */
     /*  recognizer.recognizing = (s, e) => {
        console.log(`RECOGNIZING: Text=${e.result.text}`);
    }; */
recognizer.startContinuousRecognitionAsync();
    recognizer.recognized = (s, e) => {
      text.push([e.result.text, e.result.offset]);//Displays final recognized text
        /* if (e.result.reason == ResultReason.RecognizedSpeech) {
            console.log(`RECOGNIZED: Text=${e.result.text}`); // Final 
        }
        else if (e.result.reason == ResultReason.NoMatch) {
            console.log("NOMATCH: Speech could not be recognized.");
        } */
    };
    
  /*   recognizer.canceled = (s, e) => {
        console.log(`CANCELED: Reason=${e.reason}`);
    
        if (e.reason == CancellationReason.Error) {
            console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
            console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
            console.log("CANCELED: Did you update the subscription info?");
        }
    
        recognizer.stopContinuousRecognitionAsync();
    }; */
    
  recognizer.sessionStopped = (s, e) => {
    
       // console.log("\n    Session stopped event.");
       recognizer.stopContinuousRecognitionAsync();
       recognizer.close()
       

    
       //entities(str)
 
       console.log(text);
       keywords(text, responseFileName, filepath,firstResponse);

    };
      
  
//recognizer.stopContinuousRecognitionAsync();

    // </code>
    
 // }());
    
};