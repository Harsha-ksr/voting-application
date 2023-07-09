const jsonServer = require('json-server')
const middleware = jsonServer.defaults();
const server =  jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

//const questionData = require('../server/data/questions');
const questionData = [{
  "question":"Dummy",
  "userId": "testUser",
  "createTimestamp": new Date().getTime()}]



const questionsDataJson = {"questions": questionData}

const votingDetailsByUser = [{
  "question": "Dummy",
  "userId": "",
  "vote": "Yes",
  "createTimestamp": new Date().getTime()
}]

const userVoteData = {"userVoteData": votingDetailsByUser}

server.get('/api/questions', (req, res, next) => {
  res.status(200).send(questionsDataJson);
})

server.get('/api/getResultsByQuestion', (req, res, next) => {
  if(req.method === 'GET'){
    const sortedValidatedQuestions = votingDetailsByUser.sort(obj => obj.createTimestamp)
    const questions = sortedValidatedQuestions.map(obj => obj.question)
    const distinctQuestions = Array.from(new Set(questions))
    const sortedValidatedQuestionsYes = sortedValidatedQuestions.filter(obj => obj.vote === 'Yes')
    const sortedValidatedQuestionsNo = sortedValidatedQuestions.filter(obj => obj.vote === 'No')
    const occurrencesYes = {};
    const occurrencesNo = {};
    for (const str of sortedValidatedQuestionsYes) {

      if (occurrencesYes[str.question]) {
        occurrencesYes[str.question]++;
      }
      else {
        occurrencesYes[str.question] = 1;
      }
    }

    for (const str of sortedValidatedQuestionsNo) {
      if (occurrencesNo[str.question]) {
        occurrencesNo[str.question]++;
      }
      else {
        occurrencesNo[str.question] = 1;
      }
    }

    const votesPerQuestion = [{
      question: "Dummy",
      totalVotes: 1,
      percY: 30,
      percN: 70
    }]
    distinctQuestions.filter(obj => obj != 'Dummy').map(obj => obj).forEach(question => {

      var yes = 0
      var no = 0

      if(occurrencesYes[question]){
        yes = occurrencesYes[question]
      }
      if(occurrencesNo[question]){
        no =occurrencesNo[question]
      }

      var yesP = (yes / (yes + no)) * 100
      var noP = (no / (yes + no)) * 100

      const totalC = Number(yes) + Number(no)
      const voteObj = {
        "question": question,
        "totalVotes": totalC,
        "perY": yesP.toFixed(2),
        "perN": noP.toFixed(2)
      }
      votesPerQuestion.push(voteObj)
    })
    res.status(200).send(votesPerQuestion.filter(obj => obj.question != 'Dummy'));
  }
})

server.post('/api/createQuestion', (req, res) => {
  if(req.method === 'POST'){
    let userId = req.body['user']
    let questionInBody = req.body['question']
    if(questionInBody != null){
      const questionVal = {"question": questionInBody, "userId": userId, "createTimestamp": new Date().getTime()}
      questionData.push(questionVal)
      console.log(questionData)
      res.status(200).jsonp({message: 'Success'});
    }
    else{
      res.status(500).jsonp({
        error: "Error occured while inserting the question."
      })
    }
  }
})

server.post('/api/castVote', (req, res) => {
  if(req.method === 'POST'){
    // catch: you will get a list of questions for voting
    // need modifications
    let jsonBodyStr = JSON.stringify(req.body['votedQuestions'])
    let votedQuestionObj = JSON.parse(jsonBodyStr)
      if(!(votedQuestionObj.vote === '')){
        let questionInBody = votedQuestionObj.question
        let userId = votedQuestionObj.userId
        let castedVote = votedQuestionObj.vote
        if(!(votingDetailsByUser.find(obj => obj.question === questionInBody && obj.userId == userId))){
          const createTimeStamp = questionData.filter(obj => obj.question === questionInBody).map(obj => obj.createTimestamp)
          const votingDataVal = {"question": questionInBody, "userId": userId, "vote": castedVote, "createTimeStamp": createTimeStamp[0]}
          votingDetailsByUser.push(votingDataVal)
          console.log(votingDetailsByUser)
        }
      }
    res.status(200).jsonp({message: "Success"})

  }
  else{
    res.status(500).jsonp({
      error: "Error occured while updating voting details."
    })
  }
})

server.post('/api/getQuestionsToVote', (req, res) => {
  if(req.method === 'POST'){
    let userId = req.body['user']
    const currentUserVotedQuestions = votingDetailsByUser.filter(obj => obj.userId === userId).map(obj => obj.question)
    const questionsToVoteTemp = questionData.slice(1).filter(obj => !(currentUserVotedQuestions.includes(obj.question))).sort(obj => obj.createTimestamp)
    const questionsToVote = questionData.slice(1).filter(obj => !(currentUserVotedQuestions.includes(obj.question))).sort(obj => obj.createTimestamp).map(obj => obj.question)
    console.log(questionsToVoteTemp)
    res.status(200).send(questionsToVote);
  }
})

server.listen(3000, () => {
  console.log('Mock Json Server listening on port 3000...')
})
