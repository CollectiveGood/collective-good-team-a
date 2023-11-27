export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface Case {
    fileName: string;
    caseName: string;
    createdAt: Date;
    authorId: number;
    finalJson: any;
}

export interface Assignment {
    id: number;
    userId: number;
    reviewerId: number;
    hash: string;
    case: Case;
    info: CaseInfo;
    review: any;
    reviewed: string;
    completed: boolean;
    lastUpdated: Date
}

export interface UpdateAssignmentRequest {
    json: any;
    caseId: string;
    userId: number;
    completed: boolean;
}

export interface ReviewAssignmentRequest {
    caseId: string;
    userId: number;
    resolved: boolean;
    json: any;
}

export interface GetAssignmentsRequest {
    includeNotCompleted: boolean;
    includeReviewed: boolean;
    start: number;
    take: number;
    desc: boolean;
    hash: string;
}

export interface GetCasesRequest {
    isCompleted: boolean;
    hasAssignments: boolean;
    start: number;
    take: number;
    desc: boolean;
}

export interface GetUsersRequest {
    includeAdmins: boolean;
    email: string,
    start: number;
    take: number;
    desc: boolean;
}

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