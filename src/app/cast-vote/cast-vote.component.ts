import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-cast-vote',
  templateUrl: './cast-vote.component.html',
  styleUrls: ['./cast-vote.component.css']
})
export class CastVoteComponent implements OnInit {

  questionsDataJson : any
  currentIndex = 0;

  listOfQuestions: string[] = []
  userId = localStorage.getItem('userId')
  castedVote: any = null
  castVoteStatus: any

  votingDetailsByUser = [{
    "question": "Dummy",
    "userId": "test76",
    "vote": "Yes"
  }]
  votingDetailsByUserTemp: any
  errorMessage?: string;


  constructor(private router: Router, public http: HttpClient) { }

  ngOnInit(): void {
    this.http.post('http://localhost:3000/api/getQuestionsToVote', {user: this.userId}, { observe: 'response' }).subscribe({
      next: response => {
        const dataFromApi = JSON.stringify(response.body)
        console.log(dataFromApi)
        const parsedData = JSON.parse(dataFromApi)
        for (var index = 0; index < parsedData.length; ++index) {
          let questionObj = parsedData[index].toString()
          this.listOfQuestions.push(questionObj)
        }
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
     }
    })
  }
  onItemChange(e: any){
    this.castedVote = e.target.value
    console.log(" Value is : ", this.castedVote );
 }
 next() {
  if (this.currentIndex < this.listOfQuestions.length && this.userId != null && this.castedVote != null) {
    if(this.userId === null){
      this.userId = ""
    }
    const questionObj = {
      question: this.listOfQuestions[this.currentIndex],
      userId: this.userId,
      vote: this.castedVote
    }
    if(!(this.votingDetailsByUser.find(obj => obj.question === questionObj.question))){
      this.votingDetailsByUser.push(questionObj)
    }

    console.log(questionObj)
    console.log(this.votingDetailsByUser)
    this.http.post('http://localhost:3000/api/castVote', {votedQuestions: questionObj}, { observe: 'response' }).subscribe({
      next: response => {
        if(response.status == 200){
          this.castVoteStatus = true
          this.votingDetailsByUserTemp = JSON.stringify(this.votingDetailsByUser.slice(1))
        }
        else{
          console.log("issue")
          this.castVoteStatus = false
        }
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
    }
  })
  }
}

onNextQuestion(){
  this.currentIndex++;
  this.castedVote = null
}
 }

