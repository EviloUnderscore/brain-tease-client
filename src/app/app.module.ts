import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { MyQuizPageComponent } from './my-quiz-page/my-quiz-page.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizPageComponent,
    MyQuizPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
