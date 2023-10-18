import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
          }
        })
      );
  }

  getUser(): Observable<User> | null {
    return this.http.get<User>(`${environment.apiUrl}/details`, {
      withCredentials: true,
    }) as Observable<User>;
  }

  logout() {
    return this.http.post(`${environment.apiUrl}/logout`, {});
  }

  signUp(email: string, name: string, password: string) {
    const body = { email, name, password };
    return this.http.post(`${environment.apiUrl}/signup`, body, {
      observe: 'response',
      withCredentials: true,
    });
  }
}
