import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment, Case } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CaseService {
  constructor(private http: HttpClient) {}

  getAllCases(): Observable<Case[]> {
    return this.http.get<Case[]>(`${environment.apiUrl}/cases`, {
      withCredentials: true,
    });
  }

  // Sojin
  getAssignedCases(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${environment.apiUrl}/assignedCases`, {
      withCredentials: true,
    });
  }

  getCaseAsPDF(hash: string): Observable<Blob> {
    // Set the request options to accept PDF
    return this.http.get(`${environment.apiUrl}/getCase/${hash}`, {
      withCredentials: true,
      responseType: 'blob'
    });
  }
}
