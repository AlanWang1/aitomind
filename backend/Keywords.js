module.exports = function (input, fileName, filepath, firstResponse) {
  const fetch = require("node-fetch");
  const compare = require("./comparison");
  const keywordslink =
    "https://eastus.api.cognitive.microsoft.com/text/analytics/v3.0/keyPhrases";
  const entitieslink =
    "https://eastus.api.cognitive.microsoft.com/text/analytics/v2.1/entities";
  let keywordsinput = [];
  let entitiesinput = [];
  const headers = {
    "Ocp-Apim-Subscription-Key": "099f67563c744eecafc3b5da6345f5a1",
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  let keyWordsText = "";
  for (let i = 0; i < input.length; i++) {
    keyWordsText += input[i][0];
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

      for (let i = 0; i < responseData.documents[0].entities.length; i++) {
        const entity = responseData.documents[0].entities[i];

        for (let j = 0; j < input.length; j++) {
          if (input[j][0].includes(entity.name)) {
            entitiesinput.push([entity, input[j][1]]);
            break;
          }
        }
      }
    })
    .then(() => {
      fetch(keywordslink, { method: "POST", headers: headers, body: body })
        .then((res1) => res1.json())
        .then((resData) => {
          for (let i = 0; i < resData.documents[0].keyPhrases.length; i++) {
            const keyPhrase = resData.documents[0].keyPhrases[i];

            for (let j = 0; j < input.length; j++) {
              if (input[j][0].includes(keyPhrase)) {
                keywordsinput.push([keyPhrase, input[j][1]]);
              }
            }
          }

          compare(
            keywordsinput,
            entitiesinput,
            fileName,
            filepath,
            firstResponse
          );
        });
    });
};
