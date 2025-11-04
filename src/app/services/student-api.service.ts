import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateStudent, Student } from '../interfaces/student.data';
import { AuthApiService } from './auth-api.service';

interface ApiRes {
  succcess: boolean;
  message: string;
  students: Student[];
}

interface ApiRes2 {
  succcess: boolean;
  message: string;
  student: Student;
}
@Injectable({
  providedIn: 'root',
})
export class StudentApiService {
  public baseUrl: string = environment.apiUrl + '/students';
  private http = inject(HttpClient);
  private authService = inject(AuthApiService);
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    }).set('Content-Type', 'application/json');
  }

  getStudents(): Observable<ApiRes> {
    return this.http.get<ApiRes>(`${this.baseUrl}`, { headers: this.getHeaders() });
  }

  getStudentWithId(id: number): Observable<ApiRes2> {
    return this.http.get<ApiRes2>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }

  createNewStudent(student: CreateStudent): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, student, { headers: this.getHeaders() });
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
  }
}
