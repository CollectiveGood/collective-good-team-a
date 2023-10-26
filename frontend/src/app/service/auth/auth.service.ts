import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
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
}
