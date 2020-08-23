

const fetch = require('node-fetch');
const link = 'http://d4054ef2-cb3f-4871-84f8-05f7f5fa6158.canadacentral.azurecontainer.io/score'

layer1 = ["ether", "hydrocarbon", "carboxyl", "atom"];
keyphrases = ["distillation", "valence", "electron", "alcohol", "organic molecule"];
//const array = [node1, node2]
const headers = {
    'Content-Type': 'application/json',
    'Accept': '*/*'
}
nodes = [];
connections = [];

for (let i = 0; i < layer1.length; i++) {
    for (let j = 0; j < keyphrases.length; j++) {
    
    array = [layer1[i], keyphrases[j]];
var body = JSON.stringify({'data': array });  // change array
fetch(link, {method: 'POST', headers: headers, body: body})
.then(response => response.text())
.then(responseData => {
str = responseData
res = parseFloat(str.slice(3.-3))
if (res > 0.50) {
    //append node and connection
    nodes.push({text: keyphrases[j]})
    connections.push({source: layer1[i], target: keyphrases[j]})
    console.log(nodes)
    console.log(connections)
}

}

)}};