import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders, httpResource } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateStudent, Student } from '../interfaces/student.data';

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
  private token =
    '';

  // private headers = new HttpHeaders({
  //   Authorization: `Bearer ${this.token}`,
  // });

  getStudents(): Observable<ApiRes> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get<ApiRes>(`${this.baseUrl}`, { headers });
  }

  getStudentWithId(id: number): Observable<ApiRes2> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
    return this.http.get<ApiRes2>(`${this.baseUrl}/${id}`, { headers });
  }

  createNewStudent(student: CreateStudent): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.post<any>(`${this.baseUrl}`, student, { headers });
  }

  deleteStudent(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });

    return this.http.delete<any>(`${this.baseUrl}/${id}`, { headers });
  }
}
