# Aitomind

A Full Stack Web App for Generating Conceptual Mindmaps for Educational Videos
- Inspired by the difficulty of remote learning in the pandemic, aitomind aims to help understand long lectures and videos by giving a conceptual mindmap summary
- Using Azure Cognitive Services NLP APIs to recognize keywords and concepts, using them to form a connected mindmap

![image](https://github.com/AlanWang1/aitomind/assets/43789278/8f481e62-f524-42b9-93f9-e8c3cf63b248)

## Tech Stack

- Node.js and Express for backend server
- Azure Cognitive Services for NLP APIs
- Azure Machine Learning for deploying our own ML Model, and creating a REST API for it
- ReactJS for responsive frontend
- MongoDB for storing user mindmaps in a database

Originally Demoed at Hack the 6ix:
https://devpost.com/software/aitomind

## Inspiration

With remote learning seeming to be the norm, many students are finding the transitions difficult. In particular, consuming large amounts of online content through hour long videos and online textbooks isn't the most engaging or effective form of learning. We wanted to build something that helped students learn in a more interactive and efficient manner, aiming to promote conceptual understanding rather than brute memorization. 


## How we built it

The core of Aitomind is the natural language processing algorithm that transcribes text from videos and analyzes it to create a mindmap. This was made up of several azure services including: azure text-analytics, text-to-speech as well as the azure machine learning platform to implement our own models. We used azure text-to-speech to transcribe the text from the video, then used azure text-analytics to do key word and entity analysis. From there we used our own machine learning model, which is trained on a variety of academic datasets using a word to vector model. This is all ran on an express server and written in node.js. The frontend was built using react and styled with the bulma css library.



