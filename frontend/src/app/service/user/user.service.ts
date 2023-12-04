import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetUsersRequest, Role, User } from 'src/app/models';
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
    const request = {
      "includeAdmins": true,
      "start": 0,
      "take": 1000,
      "desc": false
    }
    return this.http.post<User[]>(`${environment.apiUrl}/getUsers`, request, { withCredentials: true });
  }

  /* Admin-only - Get users using specified filter parameters
  *  @param request: the request object containing the filter parameters (see models.ts)
  */
  getUsers(request: GetUsersRequest): Observable<User[]> {
    return this.http.post<User[]>(`${environment.apiUrl}/getUsers`, request, { withCredentials: true });
  }
  
  /* Admin-only - Update user role 
  *  @param userId: the user ID of the user to update
  *  @param role: the new role of the user
  */
  updateUserRole(userId: number, role: Role): Observable<User> {
    const body = { userId, role };
    return this.http.post<User>(`${environment.apiUrl}/updateUserRole`, body, { withCredentials: true });
  }

  /* Update user information
  *  @param name: the new name of the user
  *  @param email: the new email of the user
  * @param oldPassword: the old password of the user
  * @param password: the new password of the user
  * @returns the updated user
  * */
  updateProfile(name: string, email: string, oldPassword: string, password: string): Observable<User> {
    const body = { name, email, oldPassword, password };
    return this.http.post<User>(`${environment.apiUrl}/updateAccount`, body, { withCredentials: true });
  }
}
