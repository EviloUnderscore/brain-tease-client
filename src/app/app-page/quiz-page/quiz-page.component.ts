import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { QuestionsCount } from 'src/classes/QuestionsCount';
import { QuizHistories } from 'src/classes/QuizHistories';
import { Quizzes } from 'src/classes/Quizzes';
import { HistoriesService } from 'src/services/histories.service';
import { QuestionsService } from 'src/services/questions.service';
import { QuizzesService } from 'src/services/quizzes.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';


@Component({
  selector: 'quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent implements OnInit{
  quizzes: Quizzes;
  filterdQuizzes: Quizzes;
  questionsCount: QuestionsCount;
  histories: QuizHistories;
  userSearch = '';
  titleSearch = '';
  sortByDateDesc = true;
  userId:  string | null = null;
  public isLargeScreen$: Observable<boolean>;

  constructor(
    private quizzesService: QuizzesService,
    private questionsService: QuestionsService,
    private historiesService: HistoriesService,
    private auth: AngularFireAuth,
    private breakpointObserver: BreakpointObserver){
      this.isLargeScreen$ = this.breakpointObserver
        .observe('(min-width: 850px)')
        .pipe(map((result: { matches: any; }) => result.matches)
      );
    this.quizzes = new Quizzes();
    this.filterdQuizzes = new Quizzes();
    this.questionsCount = new QuestionsCount();
    this.histories = new QuizHistories();
  }

  ngOnInit(): void{
    this.getAll().then(() => {
      this.getQuestionsCount();
    });
    this.getHistories();
    this.auth.user.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  authorClicked(authorName: string): void{
    this.userSearch = authorName;
    this.updateSearch();
  }

  changeSorting(): void{
    this.sortByDateDesc = !this.sortByDateDesc;
    this.filterdQuizzes.sortByDate(this.sortByDateDesc);
  }

  private getHistories(): void{
    this.historiesService.getAll().subscribe(histories => this.histories.addAll(histories));    
  }

  private async getAll(): Promise<void>{
    this.quizzesService.getAll().subscribe(quizzes => {
      this.quizzes.addAll(quizzes);
      this.filterdQuizzes.addAll(quizzes);
      this.filterdQuizzes.sortByDate(this.sortByDateDesc);
    });
  }

  private async getQuestionsCount(): Promise<void>{
    this.questionsService.getQuestionCount().subscribe(questions => {
      this.questionsCount.addAll(questions);
    })
  }

  public updateSearch(): void{
    const filteredQuizzes = this.quizzes.quizzes.filter((quiz) => {
      const containsAuthorName = quiz.authorName.toLowerCase().includes(this.userSearch.toLowerCase());
      const containsQuizName = quiz.name.toLowerCase().includes(this.titleSearch.toLowerCase());
      return containsAuthorName && containsQuizName;
    });

    this.filterdQuizzes.quizzes = filteredQuizzes;
    this.filterdQuizzes.sortByDate(this.sortByDateDesc);
  }
}
