import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QuestionsCount } from 'src/classes/QuestionsCount';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<QuestionsCount[]>{
    return this.http.get<QuestionsCount[]>('/api/questions/count')
  }

  deleteByQuizId(id: string): Observable<any>{
    return this.http.delete<any>(`/api/questions/${id}`);
  }
}
