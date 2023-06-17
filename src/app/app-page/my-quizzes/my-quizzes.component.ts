import { Component } from '@angular/core';
import { Quizzes } from 'src/classes/Quizzes';
import { Quiz } from 'src/classes/Quiz';
import { QuizzesService } from 'src/services/quizzes.service';
import { QuestionsService } from 'src/services/questions.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'my-quizzes',
  templateUrl: './my-quizzes.component.html',
  styleUrls: ['./my-quizzes.component.css']
})
export class MyQuizzesComponent {
  quizzes: Quizzes;
  userName:  string | null = null;
  userId:  string | null = null;

  constructor(
    private quizzesService: QuizzesService,
    private questionsService: QuestionsService,
    private auth: AngularFireAuth){
    this.quizzes = new Quizzes();
  }

  ngOnInit(): void{
    this.auth.user.subscribe(user => {
      if (user) {
        this.userName = user.displayName;
        this.userId = user.uid;
      }
      this.getAll();
    });
  }

  private getAll(): void{
    this.quizzesService.getByUser((this.userId as string)).subscribe(quizzes => {
      const newQuizzes = new Quizzes()
      newQuizzes.addAll(quizzes);
      this.quizzes = newQuizzes;
      this.quizzes.sortByDate();
    });
  }

  public deleteQuiz(quiz: Quiz): void{
    this.questionsService.deleteByQuizId(quiz.id).subscribe(() => {
      this.quizzesService.deleteById(quiz.id).subscribe(() => {
        this.quizzes.removeQuiz(quiz);
      });
    });
  }

  public createClicked(): void{
    this.quizzesService.createQuiz('Questionnaire sur la nature humaine', 'sdvszvqvqv', '1').subscribe(() => {
      this.getAll();
    })
  }
}
