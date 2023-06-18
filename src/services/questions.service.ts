import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QuestionsCount } from 'src/classes/QuestionsCount';
import { Questions } from 'src/classes/Questions';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(
    private http: HttpClient
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
}
