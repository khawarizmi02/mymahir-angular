import { inject, Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo.data';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ApiRes {
  success: boolean;
  message?: string;
  todos: Todo[];
}

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  private apiUrl = environment.apiUrl + '/todos';

  private http = inject(HttpClient);

  getTodos(): Observable<ApiRes> {
    // HttpClient's methods return an Observable
    // const headers = new HttpHeaders({
    //   'ngrok-skip-browser-warning': 'true', // Your custom header
    // });
    // console.log(this.apiUrl);
    return this.http.get<ApiRes>(this.apiUrl);
  }

  /** POST: Create a new todo item */
  createTodo(newTodo: { title: string }): Observable<any> {
    // Send the data object to the API
    return this.http.post<any>(this.apiUrl, newTodo);
  }

  /** DELETE: Delete a todo item by ID */
  deleteTodo(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
