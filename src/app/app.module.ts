import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { VotingHomeComponent } from './voting-home/voting-home.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { CastVoteComponent } from './cast-vote/cast-vote.component';
import { ViewResultsComponent } from './view-results/view-results.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    VotingHomeComponent,
    CreateQuestionComponent,
    CastVoteComponent,
    ViewResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
