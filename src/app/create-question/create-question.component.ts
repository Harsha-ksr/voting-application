import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})

export class CreateQuestionComponent {

  createQuestionObj: any = {
    question : '',
    userId : localStorage.getItem('userId'),
    vote: ''
  }


  parsedData: any
  hasQuestion = false
  errorMessage?: string;
  createQuestionStatus = ''


  constructor(private router: Router, public http: HttpClient) { }

  onSubmit(){
    this.http.get('http://localhost:3000/api/questions').subscribe( {
      next: data => {
      const dataFromApi = JSON.stringify(data)
      this.parsedData = JSON.parse(dataFromApi)
      //console.log(this.parsedData.questions[0].question)
      const jsonVal = this.parsedData.questions
      for (var index = 0; index < jsonVal.length; ++index) {

        var questionVal = jsonVal[index];

        if(questionVal.question === this.createQuestionObj.question){
          this.hasQuestion = true;
          break;
        }

       }
       if(!this.hasQuestion){
        this.http.post('http://localhost:3000/api/createQuestion', {question: this.createQuestionObj.question, user: this.createQuestionObj.userId }, { observe: 'response' }).subscribe({
          next: response => {
            if(response.status == 200){
              this.createQuestionStatus = 'Created a new question.'
            }
            else{
              this.createQuestionStatus = 'Error creating question. Please try again!'
            }
          },
          error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
        }
        })
       }
       else{
        this.createQuestionStatus = 'Question already exists in the database. Please try entering a different question.'
       }
    },
    error: error => {
      this.errorMessage = error.message;
      console.error('There was an error!', error);
  }
});
  }

  onItemChange(e: any){
    this.createQuestionObj.vote = e.target.value
    console.log(" Value is : ", this.createQuestionObj.vote );
 }
}
