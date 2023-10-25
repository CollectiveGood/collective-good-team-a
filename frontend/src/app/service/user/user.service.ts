import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<User> | null {
    return this.http.get<User>(`${environment.apiUrl}/details`, { withCredentials: true });
  }

  changePassword(email: string, password: string, oldPassword: string): Observable<User> {
    const body = { email, password, oldPassword };
    return this.http.put<User>(`${environment.apiUrl}/updateAccount`, body, { withCredentials: true });
  }
}
