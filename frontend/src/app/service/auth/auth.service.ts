import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<HttpResponse<any>> {
    const body = { username, password };
    return this.http.post(`${environment.apiUrl}/login`, body, {
        observe: 'response',
        withCredentials: true,
    });
  }

  checkAuthentication(): Observable<boolean> {
    // A user is logged in if /details returns a user object
    return this.http.get<boolean>(`${environment.apiUrl}/details`, {
      withCredentials: true,
    }).pipe(
      map(user => {
        return user != null;
      })
    )
  }

  getUser(): Observable<User> | null {
    return this.http.get<User>(`${environment.apiUrl}/details`, {
      withCredentials: true,
    });
  }

  logout(): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${environment.apiUrl}/logout`, {}).pipe(
      tap(response => {
        console.log(response);
        window.sessionStorage.clear();
      })
    )
  }

  signUp(email: string, name: string, password: string) {
    const body = { email, name, password };
    return this.http.post(`${environment.apiUrl}/signup`, body, {
      observe: 'response',
      withCredentials: true,
    });
  }
}
