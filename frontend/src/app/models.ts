export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
}

export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

/* Represents a case in the database */
export interface Case {
    fileName: string;
    caseName: string;
    createdAt: Date;
    authorId: number;
}

/* Represents a case assigned to a user */
export interface Assignment {
    id: number;
    userId: number;
    reviewerId: number;
    hash: string; // same as fileName in Case
    case: {
        caseName: string;
    };
    info: CaseInfo;
    review: any;
    reviewed: string;
    completed: boolean;
    lastUpdated: Date
}

/* Represents a comment on a case */
export interface ReviewComment {
    fieldId: string; // the field that is being commented on
    commentText: string;
}

/* Represents a case assignment in completed reviewed form */
export interface FinalReview {
    id: number;
    userId: number;
    reviewerId: number;
    hash: string;
    info: any;
    review: any;
    lastUpdated: Date;
}

/* Form field format for case submission (can be changed later) */
export interface CaseInfo {
    patientName: string;
    patientGender: string;
    patientAge: number;
    medicalHistory: string;
    familyHistory: string;
    chiefComplaint: string;
    symptoms: string;
    hpi: string;
    physicalExaminationNotes: string;
    labDiagnosticsNotes: string;
    additionalNotes: string;
}

/* Request body for updating user information */
export interface UpdateAssignmentRequest {
    json: any;
    caseId: string;
    userId: number;
    completed: boolean;
}

/* Request body for submitting a review */
export interface ReviewAssignmentRequest {
    caseId: string;
    userId: number;
    resolved: boolean | undefined;
    json: any;
}

/* Request body for retrieving assignments */
export interface GetAssignmentsRequest {
    includeNotCompleted: boolean;
    includeReviewed: boolean;
    start: number;
    take: number;
    desc: boolean;
    hash?: string; // optional
}

/* Request body for retrieving cases */
export interface GetCasesRequest {
    isCompleted: boolean;
    hasAssignments: boolean;
    start: number;
    take: number;
    desc: boolean;
}

/* Request body for retrieving users */
export interface GetUsersRequest {
    includeAdmins: boolean;
    email: string,
    start: number;
    take: number;
    desc: boolean;
}