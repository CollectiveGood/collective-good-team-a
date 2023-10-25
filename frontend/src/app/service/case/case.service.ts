import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Case } from 'src/app/model/case.model';
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
  getAssignedCases(): Observable<Case[]> {
    return this.http.get<Case[]>(`${environment.apiUrl}/assignedCases`, {
      withCredentials: true,
    });
  }
  getCaseAsPDF(hash: string): Observable<Blob> {
    // Set the request options to accept PDF
    const options = {
      responseType: 'blob' as 'json',
    };
    return this.http.get<Blob>(`${environment.apiUrl}/getCase/${hash}`, options);
  }
}
