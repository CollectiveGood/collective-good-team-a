import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Case, GetCasesRequest } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CaseService {
  constructor(private http: HttpClient) {}

  /* Admin-only - retrieve all cases in the database */
  getAllCases(): Observable<Case[]> {
    // Send empty body as there are no filters
    return this.http.post<Case[]>(`${environment.apiUrl}/getCases`, {}, {
      withCredentials: true,
    });
  }

  /* Admin-only - retrieve cases using specified filter parameters
  *  @param request: the request object containing the filter parameters (see models.ts)
  */
  getCases(request: GetCasesRequest): Observable<Case[]> {
    return this.http.post<Case[]>(`${environment.apiUrl}/getCases`, request, {
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
  addCase(file: File): Observable<HttpResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${environment.apiUrl}/addCase`, formData, {
      withCredentials: true,
      observe: 'response',
    });
  }

  /* Admin-only - delete a case
  *  @param hash: the hash (or id) of the case to delete
  */
  deleteCase(hash: string): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${environment.apiUrl}/deleteCase`, {
      hash: hash,
    }, {
      withCredentials: true,
      observe: 'response',
    });
  }
}
