import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isAuthenticated: boolean = false;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<HttpResponse<any>> {
    const body = { username, password };
    return this.http
      .post(`${environment.apiUrl}/login`, body, {
        observe: 'response',
        withCredentials: true,
      })
      .pipe(
        tap((response: HttpResponse<any>) => {
          if (response.status == 401) {
            window.alert('Login unsuccessful. Please check your credentials.');
          } else if (response.status == 200) {
            this.isAuthenticated = true;
          }
        })
      );
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getUser(): Observable<User> | null {
    return this.http.get<User>(`${environment.apiUrl}/details`, {
      withCredentials: true,
    });
  }

  logout(): Observable<HttpResponse<any>> {
    this.isAuthenticated = false;
    return this.http.post<HttpResponse<any>>(`${environment.apiUrl}/logout`, {});
  }

  signUp(email: string, name: string, password: string): Observable<HttpResponse<any>> {
    const body = { email, name, password };
    return this.http.post<HttpResponse<any>>(`${environment.apiUrl}/signup`, body, {
      withCredentials: true,
    });
  }
}
