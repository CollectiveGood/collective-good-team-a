import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetUsersRequest, User } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /* Get details about the user that is logged in */
  getUser(): Observable<User> | null {
    return this.http.get<User>(`${environment.apiUrl}/details`, { withCredentials: true });
  }

  /* Admin-only - Get all users in the database */
  getAllUsers(): Observable<User[]> {
    return this.http.post<User[]>(`${environment.apiUrl}/getUsers`, {}, { withCredentials: true });
  }

  /* Admin-only - Get users using specified filter parameters
  *  @param request: the request object containing the filter parameters (see models.ts)
  */
  getUsers(request: GetUsersRequest): Observable<User[]> {
    return this.http.post<User[]>(`${environment.apiUrl}/getUsers`, request, { withCredentials: true });
  }
  
  /* Update user information */
  updateProfile(name: string, email: string, oldPassword: string, password: string): Observable<User> {
    const body = { name, email, oldPassword, password };
    return this.http.post<User>(`${environment.apiUrl}/updateAccount`, body, { withCredentials: true });
  }
}
