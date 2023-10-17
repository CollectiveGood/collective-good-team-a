import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | null = null;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<HttpResponse<any>> {
    const body = { username, password };
    return this.http.post(`${environment.apiUrl}/login`, body, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          this.user = response.body as User;
        })
      );
  }

  getUser(): User | null {
    return this.user;
  }
  
  logout() {
    // TODO
  }

  signUp(email: string, name: string, password: string) {
    const body = { email, name, password };
    return this.http.post(`${environment.apiUrl}/signup`, body, { observe: 'response' });
  }
}
