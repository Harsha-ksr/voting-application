import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-voting-home',
  templateUrl: './voting-home.component.html',
  styleUrls: ['./voting-home.component.css']
})
export class VotingHomeComponent {

  userId = localStorage.getItem('userId')
}
