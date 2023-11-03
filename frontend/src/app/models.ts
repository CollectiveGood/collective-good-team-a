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
}

export interface Assignment {
    userId: number;
    hash: string;
    case: Case,
    user: User
}