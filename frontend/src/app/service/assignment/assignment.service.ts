import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment, GetAssignmentsRequest, UpdateAssignmentRequest } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }

  /* Admin-only - retrieve all case assignments and their status */
  getAllAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${environment.apiUrl}/getAssignments`, {
      withCredentials: true,
    });
  }

  /* Retrieve assignments based on criteria
  *  @param requestParams: the criteria to filter by (see models.ts)
  */
  getAssignments(requestParams: GetAssignmentsRequest): Observable<Assignment[]> {
    // Set the request headers (assuming you're sending form data)
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    // Construct the query string based on requestParams
    const queryString = `?includeNotCompleted=${requestParams.includeNotCompleted}&includeReviewed=${requestParams.includeReviewed}&start=${requestParams.start}&take=${requestParams.take}&desc=${requestParams.desc}&hash=${requestParams.hash}`;

    // Send the GET request with the query string
    return this.http.get<Assignment[]>(`${environment.apiUrl}${queryString}`, { headers });
  }

  // Sojin
  /* Get all cases assigned to the current user */
  getAssignedCases(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${environment.apiUrl}/assignedCases`, {
      withCredentials: true,
    });
  }

  /* Admin-only - assign a case to a user
  *  @param user: the user to assign the case to
  *  @param caseHash: the hash value of the case to assign
  */
  assignCase(user: string, caseHash: string): Observable<Assignment> {
    const formData = new FormData();
    formData.append('user', user);
    formData.append('case', caseHash);

    return this.http.post<Assignment>(`${environment.apiUrl}/assignCase`, formData, {
      withCredentials: true,
    });
  }

  /* Update an assignment using form data
  *  @param UpdateAssignmentRequest: the request body
  */
  updateAssignment(UpdateAssignmentRequest: UpdateAssignmentRequest): Observable<Assignment> {
    const formData = new FormData();
    formData.append('json', JSON.stringify(UpdateAssignmentRequest.json));

    return this.http.post<Assignment>(`${environment.apiUrl}/updateAssignment`, formData, {
      withCredentials: true,
    })
  }

  /* Mark a case assignment as resolved
  *  @param caseId: the ID of the case
  *  @param userId: the ID of the user
  * @param resolved: whether the case is resolved or not
  * */
  resolveCase(caseId: string, userId: number, resolved: boolean): Observable<Assignment> {
    const formData = new FormData();
    formData.append('caseId', caseId);
    formData.append('userId', userId.toString());
    formData.append('resolved', resolved.toString());

    return this.http.post<Assignment>(`${environment.apiUrl}/resolveCase`, formData, {
      withCredentials: true,
    })
  }
}
