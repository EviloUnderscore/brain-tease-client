import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { QuizHistories } from 'src/classes/QuizHistories';
import { QuizHistory } from 'src/classes/QuizHistory';

const httpOptionsWithAuthToken = (token: any) => ({
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'AuthToken': token,
  })
});

@Injectable({
  providedIn: 'root'
})
export class HistoriesService {

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth,
  ) {}

  getAll(): Observable<QuizHistories>{
    return this.http.get<QuizHistories>('/api/histories')
  }

  getByUser(id: string):  Observable<QuizHistories>{
    return this.http.get<QuizHistories>(`/api/histories/user/${id}`)
  }

  createHistory(quiz_id: string, score: number): Observable<QuizHistory>{
    return new Observable<QuizHistory>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          this.http.post<QuizHistory>(
            '/api/histories/create',
            { quiz_id, score },
            httpOptionsWithAuthToken(token),
          ).subscribe(history => observer.next(history));
        })
      })
    })
  }
}
