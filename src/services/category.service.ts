import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/types/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) {}

  getAll(): Observable<Category[]>{
    return this.http.get<Category[]>('/api/categories')
  }

  getById(id: string):  Observable<Category>{
    return this.http.get<Category>(`/api/categories/${id}`)
  }
}
