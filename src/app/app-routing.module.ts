import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizPageComponent } from './app-page/quiz-page/quiz-page.component';
import { QuizPlayComponent } from './app-page/quiz-play/quiz-play.component';
import { MyQuizzesComponent } from './app-page/my-quizzes/my-quizzes.component';
import { QuizUpdateComponent } from './app-page/quiz-update/quiz-update.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: QuizPageComponent, pathMatch: 'full'},
  {path: 'my-quizzes', component: MyQuizzesComponent, pathMatch: 'full'},
  {path: 'my-quizzes/create', component: QuizUpdateComponent, pathMatch: 'full'},
  {path: 'my-quizzes/edit/:id', component: QuizUpdateComponent, pathMatch: 'full'},
  {path: 'play/:id', component: QuizPlayComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
