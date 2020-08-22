module.exports = function(input) {


    const fetch = require('node-fetch');
    const link = 'https://eastus.api.cognitive.microsoft.com/text/analytics/v2.1/entities'
    const headers = {
        'Ocp-Apim-Subscription-Key': '099f67563c744eecafc3b5da6345f5a1',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    
    const body = (
       JSON.stringify({
            documents: [
              {
                language: "en",
                id: "1",
                text: input
              }
            ]
          })
    )
        
    
    fetch(link, {method: 'POST', headers: headers, body: body})
                .then(response => response.json()) 
                .then(responseData => {
                return console.log(responseData.documents[0].entities);
                });
                
                
            
    };