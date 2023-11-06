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
    userId: number;
    hash: string;
    case: Case;
    info: any;
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

export interface GetAssignmentsRequest {
    includeNotCompleted: boolean;
    includeReviewed: boolean;
    start: number;
    take: number;
    desc: boolean;
    hash: string;
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
    otherNotes: string;
}