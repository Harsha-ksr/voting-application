import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.css']
})
export class ViewResultsComponent implements OnInit{

  userId = localStorage.getItem('userId')
  votesPerQuestion = [{
    question: "Dummy",
    totalVotes: 1,
    percY: 30,
    percN: 70
  }]

  constructor(private router: Router, public http: HttpClient) { }
  errorMessage?: string;


  ngOnInit(): void {
    this.http.get('http://localhost:3000/api/getResultsByQuestion').subscribe({
      next: data => {
        const dataFromApi = JSON.stringify(data)
        const parsedData = JSON.parse(dataFromApi)
        for (var index = 0; index < parsedData.length; ++index) {
          let questionObj = {"question": parsedData[index].question,
                            "totalVotes": parsedData[index].totalVotes,
                            "percY": parsedData[index].perY,
                            "percN": parsedData[index].perN}
          this.votesPerQuestion.push(questionObj)
        }
        this.votesPerQuestion = this.votesPerQuestion.filter(obj => obj.question != 'Dummy')
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
     }
    })
  }
}
