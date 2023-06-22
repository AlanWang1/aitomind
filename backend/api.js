const fetch = require("node-fetch");
const link =
  "http://cf6d83ff-aa1b-4794-b9bb-b008f94831d8.canadacentral.azurecontainer.io/score";

layer1 = ["ether", "hydrocarbon", "carboxyl", "atom"];
keyphrases = [
  "distillation",
  "valence",
  "electron",
  "alcohol",
  "organic molecule",
];
//const array = [node1, node2]
const headers = {
  "Content-Type": "application/json",
  Accept: "*/*",
};
nodes = [];
connections = [];

for (let i = 0; i < layer1.length; i++) {
  for (let j = 0; j < keyphrases.length; j++) {
    array = [layer1[i], keyphrases[j]];
    //console.log(array);
    var body = JSON.stringify({ data: array }); // change array
    //console.log(body);
    fetch(link, { method: "POST", headers: headers, body: body })
      .then((response) => response.json())
      .then((responseData) => {
        str = responseData.slice(1, -1);
        //console.log(str);
        //str1 = str.slice(1,-1)
        res = parseFloat(str);
        console.log(res);
        if (res > 0.5) {
          //append node and connection
          nodes.push({ text: keyphrases[j] });
          connections.push({ source: layer1[i], target: keyphrases[j] });
        }
      });
  }
}
console.log(nodes);
console.log(connections);
