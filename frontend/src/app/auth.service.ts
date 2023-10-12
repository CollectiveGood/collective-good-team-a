import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<HttpResponse<any>> {
    const body = { username, password };
    return this.http.post(`${environment.apiUrl}/login`, body, { observe: 'response' });
  }

  signUp(email: string, name: string, password: string) {
    const body = { email, name, password };
    return this.http.post(`${environment.apiUrl}/signup`, body, { observe: 'response' });
  }
}
