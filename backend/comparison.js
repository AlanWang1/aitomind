const {
  ConsoleLoggingListener,
} = require("microsoft-cognitiveservices-speech-sdk/distrib/lib/src/common.browser/Exports");

module.exports = function (keywordsinput, entitiesinput) {
  const keywords = require("./keywords.js");
  const entities = require("./entities.js");
  const fetch = require("node-fetch");

  const link =
    "http://cf6d83ff-aa1b-4794-b9bb-b008f94831d8.canadacentral.azurecontainer.io/score";

 
  var index = 0;
  let entitiesinput1 = entitiesinput;
  let mainideaindex = 0;
  let layer1 = [];
  //proof of concept code to get longest entity array
  for (let i = 0; i < entitiesinput1.length; i++) {
    if (entitiesinput1[i][0].matches.length > index) {
      index = entitiesinput1[i][0].matches.length;
      mainideaindex = i;
      //console.log(entitiesinput1[mainideaindex].name);                               //main idea
      entitiesinput1.splice(i, 1);
     
      //console.log(index, i)
    }
    /* if ('wikipediaUrl' in entitiesinput[i]); {
        layer1.push(entitiesinput1[i].name) 
        console.log(entitiesinput1[i])               //2nd layer
        entitiesinput1.splice(i, 1)
    } */
  }

  const convertToMinutes = (nanoseconds) => {
    seconds = nanoseconds / 10000000;
    minutes = Math.floor(seconds / 60);
    remainderSeconds = seconds - minutes * 60;
    return minutes + ":" + remainderSeconds;
  };

  for (let i = 0; i < entitiesinput.length; i++) {
    for (let j = 0; j < keywordsinput.length; j++) {

      if (entitiesinput[i][0] == keywordsinput[j][0]) {
        const timestamp = convertToMinutes(keywordsinput[i][1]);

        layer1.push({text:keywordsinput[j][0], timestamp:timestamp}); //if keyword and entity match, add to first layer
      }
    }
  }



  const headers = {
    "Content-Type": "application/json",
    Accept: "*/*",
  };

  //append main idea node
  //append layer 1 nodes, connections
  //append layer 2 nodes, connections

  nodes = [];
  connections = [];

  nodes.push({
    text:
      entitiesinput1[mainideaindex][0].name,
      
    timestamp:convertToMinutes(entitiesinput1[mainideaindex][1]),
  });
 
   // add main idea node
  for (let i = 0; i < layer1.length; i++) {
    //loop thru layer1 to add all layer 1 nodes and connections
    nodes.push( layer1[i]);

    connections.push({
      source:{
        text: entitiesinput1[mainideaindex][0].name,
        timestamp: convertToMinutes(entitiesinput1[mainideaindex][1])
      },
      target:layer1[i]

    });
  }
  console.log(nodes);

  
  async function processArray(array){
      for(const item of array){
          apiCall(keywordsinput);
      }
  }
  processArray(layer1)

  async function apiCall(array2){
    for(const item of array2){
        
    }
  }

/*
  for (let i = 0; i < layer1.length; i++) {
    for (let j = 0; j < keywordsinput.length; j++) {
      array = [layer1[i], keywordsinput[j][0]];
      var body = JSON.stringify({ data: array }); // change array
      fetch(link, { method: "POST", headers: headers, body: body })
        .then((response) => response.json())
        .then((responseData) => {
          str = responseData.slice(1, -1);
          res = parseFloat(str);
          if (1.0 > res > 0.7) {
            //append node and connection
            nodes.push({
              text:
                keywordsinput[j][0] +
                " " +
                convertToMinutes(keywordsinput[j][1]),
            });
            connections.push({
              source: layer1[i],
              target:
                keywordsinput[j][0] +
                " " +
                convertToMinutes(keywordsinput[j][1]),
            });
          }
        });
    }
    
  }
*/


  console.log(nodes);
  console.log(connections);
  //proof of concept code to search api

  //proof of concept code to search api
};
