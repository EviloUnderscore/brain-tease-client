import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Quizzes } from 'src/classes/Quizzes';
import { Quiz } from 'src/classes/Quiz';

const httpOptionsWithAuthToken = (token: any) => ({
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'AuthToken': token,
  })
});

@Injectable({
  providedIn: 'root'
})
export class QuizzesService {

  constructor(
    private http: HttpClient,
    private auth: AngularFireAuth,
  ) {}

  getAll(): Observable<Quizzes>{
    return this.http.get<Quizzes>('/api/quizzes')
  }

  createQuiz(name: string, description: string, category_id: string): Observable<Quiz>{
    return new Observable<Quiz>(observer => {
      this.auth.user.subscribe(user => {
        user && user.getIdToken().then(token => {
          this.http.post<Quiz>(
            '/api/quizzes/create',
            { name, description, category_id },
            httpOptionsWithAuthToken(token),
          ).subscribe(() => observer.next());
        })
      })
    })
  }

  deleteById(id: string): Observable<any>{
    return this.http.delete<Quiz>(`/api/quizzes/${id}`);
  }
}
