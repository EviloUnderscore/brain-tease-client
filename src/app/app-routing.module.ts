import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizPageComponent } from './quiz-page/quiz-page.component';

const routes: Routes = [
  {path: 'quiz', component: QuizPageComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
