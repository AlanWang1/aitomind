const { ConsoleLoggingListener } = require('microsoft-cognitiveservices-speech-sdk/distrib/lib/src/common.browser/Exports');

module.exports = function (keywordsinput, entitiesinput) {
    const keywords = require('./keywords.js');
    const entities = require('./entities.js');
    //const similarity = require('./similarity.js');
    const fetch = require('node-fetch');
    //const mongoose = require('mongoose');
    //const mindmapSchema = require('./models/mindmap.model.js')
    //const mindmap = mongoose.model('mindmaps', mindmapSchema, 'mindmaps')
    const link = 'http://cf6d83ff-aa1b-4794-b9bb-b008f94831d8.canadacentral.azurecontainer.io/score'

    //console.log(entitiesinput)
    //console.log(keywordsinput);
    var index = 0;
    entitiesinput1 = entitiesinput;
    layer1 = [];
    //proof of concept code to get longest entity array
    for (let i = 0; i < entitiesinput1.length; i++) {

        if (entitiesinput1[i][0].matches.length > index) {
            index = entitiesinput1[i][0].matches.length
            mainideaindex = i
            //console.log(entitiesinput1[mainideaindex].name);                               //main idea
            entitiesinput1.splice(i, 1)
            i++
            //console.log(index, i)
        }
        /* if ('wikipediaUrl' in entitiesinput[i]); {
            layer1.push(entitiesinput1[i].name) 
            console.log(entitiesinput1[i])               //2nd layer
            entitiesinput1.splice(i, 1)
        } */
    }

    for (let i = 0; i < entitiesinput.length; i++) {
        for (let j = 0; j < keywordsinput.length; j++) {
            if (entitiesinput[i][0].name == keywordsinput[j][0]) {
                layer1.push(keywordsinput[j][0]); //if keyword and entity match, add to first layer
            }
        }
    }

    console.log("MAIN IDEA", entitiesinput1[mainideaindex][0].name);
    console.log("layer1", layer1); //1st layer

    const headers = {
        "Content-Type": "application/json",
        "Accept": "*/*",
    };

    //append main idea node
    //append layer 1 nodes, connections
    //append layer 2 nodes, connections

    nodes = [];
    connections = [];

    nodes.push({ text: entitiesinput1[mainideaindex][0].name }); // add main idea node
    for (let i = 0; i < layer1.length; i++) {
        //loop thru layer1 to add all layer 1 nodes and connections
        nodes.push({ text: layer1[i] });
        connections.push({
            source: entitiesinput1[mainideaindex][0].name,
            target: layer1[i],
        });
    }

    for (let i = 0; i < layer1.length; i++) {
        for (let j = 0; j < keywordsinput.length; j++) {

            array = [layer1[i], keywordsinput[j][0]];
            var body = JSON.stringify({ data: array });  // change array
            fetch(link, { method: 'POST', headers: headers, body: body })
                .then(response => response.json())
                .then(responseData => {
                    str = responseData.slice(1, -1)
                    res = parseFloat(str)
                    if (1.0 > res > 0.50) {
                        //append node and connection
                        nodes.push({ text: keywordsinput[j][0] });
                        connections.push({ source: layer1[i], target: keywordsinput[j][0] });

                    }

                }

                )
        }
    };

    console.log(nodes);
    console.log(connections);








    //proof of concept code to search api


    //proof of concept code to search api
};
