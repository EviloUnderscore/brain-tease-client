import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QuestionsCount } from 'src/classes/QuestionsCount';
import { Questions } from 'src/classes/Questions';
import { Question } from 'src/classes/Question';
import { AngularFireAuth } from '@angular/fire/compat/auth';

const httpOptionsWithAuthToken = (token: any) => ({
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'AuthToken': token,
  })
});


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth,
  ) {}

  getQuestionCount(): Observable<QuestionsCount[]>{
    return this.http.get<QuestionsCount[]>('/api/questions/count')
  }

  getByQuizId(id: string): Observable<Questions>{
    return this.http.get<Questions>(`/api/questions/quiz/${id}`)
  }

  deleteByQuizId(id: string): Observable<any>{
    return this.http.delete<any>(`/api/questions/${id}`);
  }

  createQuestion(quiz_id: string, question: string, answer: string, category: string, type_id: string, fake_answer_1: string, fake_answer_2: string, fake_answer_3: string): Observable<Question>{
    return new Observable<Question>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          this.http.post<Question>(
            '/api/question/create',
            { quiz_id, question, answer, category, type_id, fake_answer_1, fake_answer_2, fake_answer_3 },
            httpOptionsWithAuthToken(token),
          ).subscribe(() => observer.next());
        })
      })
    })
  }

  updateQuestion(id: string, quiz_id: string, question: string, answer: string, category: string, type_id: string, fake_answer_1: string, fake_answer_2: string, fake_answer_3: string): Observable<Question>{
    return new Observable<Question>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          this.http.post<Question>(
            `/api/question/update/${id}`,
            { quiz_id, question, answer, category, type_id, fake_answer_1, fake_answer_2, fake_answer_3 },
            httpOptionsWithAuthToken(token),
          ).subscribe(() => observer.next());
        })
      })
    })
  }
}
