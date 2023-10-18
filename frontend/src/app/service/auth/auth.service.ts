import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<HttpResponse<any>> {
    const body = { username, password };
    return this.http.post(`${environment.apiUrl}/login`, body, { observe: 'response' }).pipe(
      tap((response: HttpResponse<any>) => {
        if (response.status == 401) {
          window.alert('Login unsuccessful. Please check your credentials.');
        }
      })
    );
  }

  getUser(): Observable<User> | null {
    return this.http.get<User>(`${environment.apiUrl}/details`) as Observable<User>;
  }
  
  logout() {
    return this.http.post(`${environment.apiUrl}/logout`, {});
  }

  signUp(email: string, name: string, password: string) {
    const body = { email, name, password };
    return this.http.post(`${environment.apiUrl}/signup`, body, { observe: 'response' });
  }
}
