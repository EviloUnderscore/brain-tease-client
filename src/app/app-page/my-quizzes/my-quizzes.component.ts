import { Component } from '@angular/core';
import { Quizzes } from 'src/classes/Quizzes';
import { Quiz } from 'src/classes/Quiz';
import { QuizzesService } from 'src/services/quizzes.service';
import { QuestionsService } from 'src/services/questions.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HistoriesService } from 'src/services/histories.service';

@Component({
  selector: 'my-quizzes',
  templateUrl: './my-quizzes.component.html',
  styleUrls: ['./my-quizzes.component.css']
})
export class MyQuizzesComponent {
  quizzes: Quizzes;
  filteredQuizzes: Quizzes;
  titleSearch: string;
  userName:  string | null = null;
  userId:  string | null = null;

  constructor(
    private quizzesService: QuizzesService,
    private questionsService: QuestionsService,
    private historiesService: HistoriesService,
    private auth: AngularFireAuth){
    this.quizzes = new Quizzes();
    this.filteredQuizzes = new Quizzes();
    this.titleSearch = '';
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
      this.quizzes.addAll(quizzes);
      this.filteredQuizzes.addAll(quizzes);
      this.filteredQuizzes.sortByDate();
    });
  }

  public deleteQuiz(quiz: Quiz): void{
    this.historiesService.deleteByQuizId(quiz.id).subscribe(() => {
      this.questionsService.deleteByQuizId(quiz.id).subscribe(() => {
        this.quizzesService.deleteById(quiz.id).subscribe(() => {
          this.quizzes.removeQuiz(quiz);
          this.filteredQuizzes.removeQuiz(quiz);
        });
      });
    })
  }

  public createClicked(): void{
    this.quizzesService.createQuiz('Questionnaire sur la nature humaine', 'sdvszvqvqv', '1').subscribe(() => {
      this.getAll();
    })
  }

  public updateSearch(): void{    
    const filteredQuizzes = this.quizzes.quizzes.filter((quiz) => {
      return quiz.name.toLowerCase().includes(this.titleSearch.toLowerCase());
    });

    this.filteredQuizzes.quizzes = filteredQuizzes;
  }
}
