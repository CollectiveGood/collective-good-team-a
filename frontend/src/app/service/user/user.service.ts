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

  updateProfile(name: string, email: string, oldPassword: string, password: string): Observable<User> {
    const body = { name, email, oldPassword, password };
    return this.http.post<User>(`${environment.apiUrl}/updateAccount`, body, { withCredentials: true });
  }
}
