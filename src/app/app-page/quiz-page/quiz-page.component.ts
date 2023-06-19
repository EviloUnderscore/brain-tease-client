import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Categories } from 'src/classes/Categories';
import { QuestionsCount } from 'src/classes/QuestionsCount';
import { QuizHistories } from 'src/classes/QuizHistories';
import { Quizzes } from 'src/classes/Quizzes';
import { CategoriesService } from 'src/services/category.service';
import { HistoriesService } from 'src/services/histories.service';
import { QuestionsService } from 'src/services/questions.service';
import { QuizzesService } from 'src/services/quizzes.service';


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

  constructor(
    private quizzesService: QuizzesService,
    private questionsService: QuestionsService,
    private historiesService: HistoriesService,
    private auth: AngularFireAuth)
  {
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
  }

  private async getHistories(): Promise<void>{
    this.auth.user.subscribe(user => {
      if (user) {
        this.historiesService.getByUser(user.uid).subscribe(histories => {
          this.histories.addAll(histories);
        })
      }
    });
  }

  private async getAll(): Promise<void>{
    this.quizzesService.getAll().subscribe(quizzes => {
      this.quizzes.addAll(quizzes);
      this.filterdQuizzes.addAll(quizzes);
      this.filterdQuizzes.sortByDate();
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
  }
}
