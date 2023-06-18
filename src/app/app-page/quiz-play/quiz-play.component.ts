import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/classes/Quiz';
import { QuizzesService } from 'src/services/quizzes.service';

@Component({
  selector: 'quiz-play',
  templateUrl: './quiz-play.component.html',
  styleUrls: ['./quiz-play.component.css']
})
export class QuizPlayComponent {
  quiz: Quiz;

  constructor(
    private quizzesService: QuizzesService,
    private route: ActivatedRoute){
    this.quiz = new Quiz();
  }

  ngOnInit(): void{
    this.getQuiz();
  }

  private getQuiz(): void{
    this.quizzesService.getById((this.route.snapshot.paramMap.get('id') as string)).subscribe(quiz => {
      this.quiz.serialize(quiz);
    })
  }
}
