# Social Network 

## Description 
​This application is an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list.
​
This backend can be used for social media startups, and uses a NOSQL database, Express.js for routing, MongoDB database, and Mongoose ODM to handle large amounts of unstructured data, including User and Thought models and schemas and Reaction subdocument schema. When the application is invoked, the server is started and Mongoose models are synced to the MongoDB database.

API GET routes in Insomnia Core for users and thoughts show data and is displayed in a formatted JSON. API POST, PUT, and DELETE routes in Insomnia Core successfully create, update, and delete users and thoughts in the database. API POST and DELETE routes in Insomnia Core successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list.

## Installation
Clone the repository. Using the command line, navigate to the root of the application and run npm i to install dependencies. 
Run the command for node index.js to start server and then test  application in insomnia.
In insomnia run the CRUd method for retrieving, create, update and delete data.