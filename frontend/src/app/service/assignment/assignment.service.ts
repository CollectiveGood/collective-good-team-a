import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Assignment, GetAssignmentsRequest, ReviewAssignmentRequest, UpdateAssignmentRequest } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  /* This service handles all HTTP requests related to creating, retrieving, and updating cases that are assigned to users. */

  constructor(
    private http: HttpClient,
  ) { }

  /* Admin-only - retrieve all case assignments and their status */
  getAllAssignments(): Observable<Assignment[]> {
    const request = {
      includeReviewed: true,
      includeNotCompleted: true,
      start: 0,
      take: 1000, // MAX set to 1000 for now
      desc: false
    };
    return this.http.post<Assignment[]>(`${environment.apiUrl}/getAssignments`, request, {
      withCredentials: true,
    });
  }

  /* Admin-only - retrieve case assignments using specified filter parameters
  *  @param request: the request object containing the filter parameters (see models.ts)
  */
  getAssignments(request: GetAssignmentsRequest): Observable<Assignment[]> {
    return this.http.post<Assignment[]>(`${environment.apiUrl}/getAssignments`, request, {
      withCredentials: true,
    });
  }

  /* Get assignment by case ID
  *  @param caseId: the ID of the case
  */
  getAssignmentByCaseId(caseId: string): Observable<Assignment> {
    return this.http.get<Assignment>(`${environment.apiUrl}/getAssignment/${caseId}`, {
      withCredentials: true,
    });
  }

  /* Get specific review assignment for the current user
  *  @param caseId: the ID of the case
  */
  getReviewAssignment(caseId: string): Observable<Assignment> {
    return this.http.get<Assignment>(`${environment.apiUrl}/getReview/${caseId}`, {
      withCredentials: true,
    });
  }

  /* Get specific assignment by its unique id
  *  @param id: the assignment id
  */
  getAssignment(id: number): Observable<Assignment> {
    return this.http.get<Assignment>(`${environment.apiUrl}/assignment/${id}`, {
      withCredentials: true,
    });
  }

  /* Get all cases assigned to the current user */
  getAllAssignedCases(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${environment.apiUrl}/assignedCases`, {
      withCredentials: true,
    });
  }

  /* Get all new cases for user to complete */
  getNewAssignedCases(): Observable<Assignment[]> {
    // reviewed: PENDING or REJECTED, completed: false
    return this.http.get<Assignment[]>(`${environment.apiUrl}/assignedCases`, {
      withCredentials: true,
    }).pipe(
      map((assignments: Assignment[]) => {
        return assignments.filter((assignment: Assignment) => {
          return (assignment.reviewed === "PENDING" || assignment.reviewed === "REJECTED") && !assignment.completed;
        });
      }
    ));
  }

  /* Get all cases that the current user has been asked to review */
  getCasesToReview(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${environment.apiUrl}/assignedReviewerCases`, {
      withCredentials: true, 
    }).pipe(
      map((assignments: Assignment[]) => {
        return assignments.filter((assignment: Assignment) => {
          return assignment.reviewed === "PENDING" && assignment.completed;
        });
      })
    );
  }

  /* Get all cases that the current user has submitted for review */
  getSubmittedCases(): Observable<Assignment[]> {
    // reviewed: PENDING, completed: true
    return this.http.get<Assignment[]>(`${environment.apiUrl}/assignedCases`, {
      withCredentials: true,
    }).pipe(
      map((assignments: Assignment[]) => {
        return assignments.filter((assignment: Assignment) => {
          return assignment.reviewed === "PENDING" && assignment.completed;
        });
      }
    ));
  }

  /* Get all cases that the current user has submitted and been approved */
  getCompletedCases(): Observable<Assignment[]> {
    // reviewed: ACCEPTED, completed: true
    return this.http.get<Assignment[]>(`${environment.apiUrl}/assignedCases`, {
      withCredentials: true,
    }).pipe(
      map((assignments: Assignment[]) => {
        return assignments.filter((assignment: Assignment) => {
          return assignment.reviewed === "ACCEPTED" && assignment.completed;
        });
      }
    ));
  }

  needsReview(assignment: Assignment): boolean {
    /* Assignment must be submitted, pending review */
    return assignment.completed && assignment.reviewed === 'PENDING'
  }

  /* Admin-only - assign a case to a user
  *  @param user: the user to assign the case to
  *  @param reviewer: the reviewer to assign the case to
  *  @param caseId: the id or hash value of the case to assign
  */
  assignCase(userEmail: string, reviewerEmail: string, caseId: string): Observable<HttpResponse<Assignment>> {
    const request = {
      user: userEmail,
      reviewer: reviewerEmail,
      case: caseId,
    };

    return this.http.post<Assignment>(`${environment.apiUrl}/assignCase`, request, {
      withCredentials: true,
      observe: 'response',
    });
  }

  /* Submit a case assignment for review
  *  @param updateAssignmentRequest: the request body (see models.ts)
  */
  updateAssignment(updateAssignmentRequest: UpdateAssignmentRequest): Observable<Assignment> {
    const request = {
      json: updateAssignmentRequest.json,
      caseId: updateAssignmentRequest.caseId,
      userId: updateAssignmentRequest.userId,
      completed: updateAssignmentRequest.completed,
    };
  
    return this.http.post<Assignment>(`${environment.apiUrl}/updateAssignment`, request, {
      withCredentials: true,
    });
  }

  /* Review a submitted case assignment
  *  @param reviewAssignmentRequest: the request body (see models.ts)
  */
  submitReview(reviewAssignmentRequest: ReviewAssignmentRequest): Observable<Assignment> {
    const request = {
      caseId: reviewAssignmentRequest.caseId,
      userId: reviewAssignmentRequest.userId,
      resolved: reviewAssignmentRequest.resolved,
      json: reviewAssignmentRequest.json,
    }
  
    return this.http.post<Assignment>(`${environment.apiUrl}/resolveAssignment`, request, {
      withCredentials: true,
    });
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
