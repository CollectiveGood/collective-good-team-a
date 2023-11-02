import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { User } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}
  
  login(username: string, password: string): Observable<HttpResponse<any>> {
    const body = { username, password };
    return this.http.post(`${environment.apiUrl}/login`, body, {
        observe: 'response',
        withCredentials: true,
    });
  }

  isLoggedIn(): Observable<boolean> {
    // A user is logged in if /details returns a user object
    return this.http.get<boolean>(`${environment.apiUrl}/details`, {
      withCredentials: true,
    }).pipe(
      map(user => {
        return user != null;
      })
    )
  }

  isAdmin(): Observable<boolean> {
    // A user is an admin if /details returns a user object with the role set to ADMIN
    return this.http.get<User>(`${environment.apiUrl}/details`, {
      withCredentials: true,
    }).pipe(
      map(user => {
        return user != null && user.role === 'ADMIN';
      })
    )
  }

  logout(): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${environment.apiUrl}/logout`, {}, { 
      observe: 'response', // This is necessary to get the response headers, which contain the 'Set-Cookie' header that clears the session cookie
      withCredentials: true, 
    });
  }

  signUp(email: string, name: string, password: string): Observable<HttpResponse<any>> {
    const body = { email, name, password };
    return this.http.post(`${environment.apiUrl}/signup`, body, {
      observe: 'response',
      withCredentials: true,
    });
  }

  isEmailValid(email: string): boolean {
    // Regular expression for basic email validation
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }
}
