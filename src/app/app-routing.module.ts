import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { MyQuizPageComponent } from './my-quiz-page/my-quiz-page.component';

const routes: Routes = [
  {path: 'quiz', component: QuizPageComponent, pathMatch: 'full'},
  {path: 'my-quizzes', component: MyQuizPageComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
