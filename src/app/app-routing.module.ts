import { ViewResultsComponent } from './view-results/view-results.component';
import { CastVoteComponent } from './cast-vote/cast-vote.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { VotingHomeComponent } from './voting-home/voting-home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo:'/login', pathMatch:'full'
  },

  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'voting-home',
    component: VotingHomeComponent
  },
  {
    path: 'create-question',
    component: CreateQuestionComponent
  },
  {
    path: 'cast-vote',
    component: CastVoteComponent
  },
  {
    path: 'view-results',
    component: ViewResultsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
