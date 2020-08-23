module.exports = function (input) {
  const fetch = require("node-fetch");
  const compare = require("./comparison");
  const keywordslink =
    "https://eastus.api.cognitive.microsoft.com/text/analytics/v3.0/keyPhrases";
  const entitieslink =
    "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.1/entities";
  keywordsinput = [];
  entitiesinput = [];
  const headers = {
    "Ocp-Apim-Subscription-Key": "099f67563c744eecafc3b5da6345f5a1",
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  
  let keyWordsText=''
  for(let i=0;i<input.length;i++){
    keyWordsText+=input[i][0];
  }

  const body = JSON.stringify({
    documents: [
      {
        language: "en",
        id: "1",
        text: keyWordsText,
      },
    ],
  });

  fetch(entitieslink, { method: "POST", headers: headers, body: body })
    .then((response) => response.json())
    .then((responseData) => {
      //responseData returns an array
      for(let i=0;i<responseData.documents[0].entities.length;i++){
        for(let j=0; j<input.length;j++){

        }
      }
      entitiesinput = responseData.documents[0].entities;
      fetch(keywordslink, { method: "POST", headers: headers, body: body })
        .then((res) => res.json())
        .then((resData) => {
          keywordsinput = resData.documents[0].keyPhrases;
          compare(keywordsinput, entitiesinput);
        });
    });
};
