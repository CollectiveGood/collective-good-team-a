export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string; //Role
}

// export enum Role {
//   USER,
//   ADMIN
// }

export interface Case {
    URLhash: string;
    url: string;
    caseName: string;
    authorId: number;
}

export interface Assignment {
    userId: number;
    hash: string;
    case: Case,
    user: User
}