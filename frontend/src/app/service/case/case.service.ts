import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment, Case } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CaseService {
  constructor(private http: HttpClient) {}

  /* Admin-only - retrieve all cases in the database */
  getAllCases(): Observable<Case[]> {
    return this.http.get<Case[]>(`${environment.apiUrl}/cases`, {
      withCredentials: true,
    });
  }

  /* Admin-only - retrieve all case assignments and their status */
  getAllAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${environment.apiUrl}/getAssignments`, {
      withCredentials: true,
    });
  }

  // Sojin
  /* Get all cases assigned to the current user */
  getAssignedCases(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${environment.apiUrl}/assignedCases`, {
      withCredentials: true,
    });
  }

  /* Get a case by its hash value
  *  @param hash: the hash value of the case
  */
  getCaseAsPDF(hash: string): Observable<Blob> {
    return this.http.get(`${environment.apiUrl}/getCase/${hash}`, {
      withCredentials: true,
      responseType: 'blob'
    });
  }

  /* Admin-only - upload a case
  *  @param file: the file to upload
  */
  addCase(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${environment.apiUrl}/addCase`, formData, {
      withCredentials: true
    });
  }

  /* Admin-only - assign a case to a user
  *  @param user: the user to assign the case to
  *  @param caseHash: the hash value of the case to assign
  */
  assignCase(user: string, caseHash: string): Observable<any> {
    const formData = new FormData();
    formData.append('user', user);
    formData.append('case', caseHash);

    return this.http.post(`${environment.apiUrl}/assignCase`, formData, {
      withCredentials: true,
    });
  }
}
