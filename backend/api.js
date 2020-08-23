const fetch = require('node-fetch');
const link = 'http://d4054ef2-cb3f-4871-84f8-05f7f5fa6158.canadacentral.azurecontainer.io/score'

const array = ["ether", "ketone"]
const headers = {
    'Content-Type': 'application/json',
    'Accept': '*/*'
}
const body = JSON.stringify({'data': array });
 
    

fetch(link, {method: 'POST', headers: headers, body: body})
.then(response => response.text())
.then(responseData => {
console.log(responseData)

});