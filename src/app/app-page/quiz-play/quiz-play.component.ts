import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Questions } from 'src/classes/Questions';
import { Quiz } from 'src/classes/Quiz';
import { QuestionsService } from 'src/services/questions.service';
import { QuizzesService } from 'src/services/quizzes.service';

@Component({
  selector: 'quiz-play',
  templateUrl: './quiz-play.component.html',
  styleUrls: ['./quiz-play.component.css']
})
export class QuizPlayComponent {
  quiz: Quiz;
  questions: Questions;
  isPlaying = false;
  lastQuestion = false;
  currentQuestion = 0;

  constructor(
    private quizzesService: QuizzesService,
    private questionsService: QuestionsService,
    private route: ActivatedRoute){
    this.quiz = new Quiz();
    this.questions = new Questions();
  }

  ngOnInit(): void{
    this.getQuiz();
  }

  startingQuiz(): void{
    this.isPlaying = true;
    this.currentQuestion++;
    this.checkQuestionList();
  }

  nextQuestion(): void{
    this.currentQuestion++;
    this.checkQuestionList();
  }

  endQuiz():void{
    console.log("coucou");
  }

  currentQuestionIndex(i: number): boolean{
    return this.currentQuestion == i+1;
  }

  private getQuiz(): void{
    const quizId = (this.route.snapshot.paramMap.get('id') as string)
    this.quizzesService.getById(quizId).subscribe(quiz => {
      this.quiz.serialize(quiz);
      this.questionsService.getByQuizId(quizId).subscribe(questions => {        
        this.questions.addAll(questions);
      })
    })
  }

  private checkQuestionList(): void{
    if(this.currentQuestion >= this.questions.count()){
      this.lastQuestion = true;
    }
  }
}
