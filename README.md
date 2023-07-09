# Mock-Server

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.3.

This is a mock-server used by voting application to save/retrieve data.
This server needs to be up and running before running the actual voting-application.

## Steps To Run the Mock Server

Run `npm install` and make sure all dependent packages are installed.

Once the project is loaded, Open terminal, go to root directory and run `npm run mock:server` to start up the server.

The server starts on localhost port 3000.

## Test the APIs

Use Postman or any other testing tool to test the APIs. Below are the Curl commands provided which you can import into postman and run.

### Get Results By question:
`curl --location 'http://localhost:3000/api/getResultsByQuestion'`

### Cast Vote
`curl --location 'http://localhost:3000/api/castVote' \
--header 'Content-Type: application/json' \
--data '{
    "votedQuestions": [
        {
            "question": "Who is gonna win world-war 3?",
            "userId": "mkoride",
            "vote": "Yes"
        }
    ]
}'`

### Get All Questions
`curl --location 'http://localhost:3000/api/questions'`

### Create a question
`curl --location 'http://localhost:3000/api/createQuestion' \
--header 'Content-Type: application/json' \
--data '{
    "question": "This is a test questiosssn"
}'`
