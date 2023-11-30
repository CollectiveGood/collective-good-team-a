// Store hard-coded values here
export const MIN_PASSWORD_LENGTH: number = 8;
export const MAX_PASSWORD_LENGTH: number = 128;
export const EMAIL_REGEX: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // For email validation
export enum VIEW_MODE { 
    NEW = 'new', 
    REVIEW = 'review', 
    COMPLETE = 'complete' 
};
export const FIELD_NAMES_MAP: Map<string, string> = new Map([
    ["patientName", "Patient Name"],
    ["patientGender", "Patient Gender"],
    ["patientAge", "Patient Age"],
    ["medicalHistory", "Medical History"],
    ["familyHistory", "Family History"],
    ["chiefComplaint", "Chief Complaint"],
    ["symptoms", "Symptoms"],
    ["hpi", "HPI"],
    ["physicalExamination", "Physical Examination"],
    ["labDiagnostics", "Lab Diagnostics"],
    ["additionalNotes", "Additional Notes"],
]);