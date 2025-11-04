import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthRes, UserLogin } from '../interfaces/auth.data';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  public baseUrl: string = environment.apiUrl + '/auth';
  private http = inject(HttpClient);
  private dataService = inject(DataService);
  private readonly TOKEN_KEY = 'token';

  loginUser(user: UserLogin): Observable<AuthRes> {
    return this.http.post<AuthRes>(`${this.baseUrl}/sign-in`, user);
  }

  isLogin(): Boolean {
    return !!this.getToken();
  }

  getToken(): String | null {
    return this.dataService.getLocalStorage(this.TOKEN_KEY);
  }

  logout() {
    this.dataService.deleteStorage(this.TOKEN_KEY);
  }
}
