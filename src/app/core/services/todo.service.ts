import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENT } from './constants';
import { Observable } from 'rxjs';
import { Todo } from '../models/todoElem';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo> {
    return this.http.get<Todo>(`${ENVIRONMENT}/todos`);
  }

  createTodo(data: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${ENVIRONMENT}/todos`, data);
  }

  editTodo(data: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${ENVIRONMENT}/todos/${data.id}`, data);
  }

  removeTodo(id: number): Observable<Todo> {
    return this.http.delete<Todo>(`${ENVIRONMENT}/todos/${id}`);
  }
}
