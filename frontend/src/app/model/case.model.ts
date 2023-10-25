export interface Case {
    URLhash: string;
    url: string;
    caseName: string;
    authorId: number;
}

export interface AssignedCase {
    userId: number;
    hash: string;
    case: {
      caseName: string;
    };
}