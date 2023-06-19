import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Questions } from 'src/classes/Questions';
import { QuestionsWithAnswers } from 'src/classes/QuestionsWithAnswers';
import { Quiz } from 'src/classes/Quiz';
import { RandomAnswer } from 'src/classes/RandomAnswer';
import { RandomAnswers } from 'src/classes/RandomAnswers';
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
  questionsWithRandomAnswers: QuestionsWithAnswers;
  isPlaying = false;
  lastQuestion = false;
  currentQuestion = 0;
  testOver = false;

  constructor(
    private quizzesService: QuizzesService,
    private questionsService: QuestionsService,
    private route: ActivatedRoute){
    this.quiz = new Quiz();
    this.questions = new Questions();
    this.questionsWithRandomAnswers = new QuestionsWithAnswers();
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
    this.testOver = true;
    
  }

  currentQuestionIndex(i: number): boolean{
    return this.currentQuestion == i+1;
  }

  selectAnswer(answer: RandomAnswer, question: RandomAnswers): void{
    if(answer.selected){
      answer.selected = false;
    } else {
      question.unselectAll();
      answer.selected = true;
    }
  }

  isAnswerSelected(question: RandomAnswers): boolean {
    console.log(question);
    
    return question.answers.some((answer) => answer.selected);
  }

  private getQuiz(): void{
    const quizId = (this.route.snapshot.paramMap.get('id') as string)
    this.quizzesService.getById(quizId).subscribe(quiz => {
      this.quiz.serialize(quiz);
      this.questionsService.getByQuizId(quizId).subscribe(questions => {        
        this.questions.addAll(questions);
        this.questionsWithRandomAnswers.generateQuestionsWithRandomAnswers(questions);
      })
    })
  }

  private checkQuestionList(): void{
    if(this.currentQuestion >= this.questions.count()){
      this.lastQuestion = true;
    }
  }
}
