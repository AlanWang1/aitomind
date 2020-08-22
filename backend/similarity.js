module.exports = function(input) {


    const fetch = require('node-fetch');
    const link = 'http://16f7dc40-7776-4076-b87b-81461e1af404.canadacentral.azurecontainer.io/score'
    const headers = {
        'Content-Type': 'application/json',
    }
    
    const body = (
       JSON.stringify({
            "data": input
          })
    )
        
    
    fetch(link, {method: 'POST', headers: headers, body: body})
                .then(response => response.json()) 
                .then(responseData => {
                return console.log(responseData);
                });
                
                
            
    };