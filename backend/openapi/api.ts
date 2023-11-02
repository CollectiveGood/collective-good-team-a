/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/details": {
    /** gets a users info/checks if a user is logged in */
    get: {
      responses: {
        /** @description returns the user object */
        200: {
          content: {
            "application/json": components["schemas"]["User"];
          };
        };
        /** @description not logged in */
        401: {
          content: {
            "application/json": components["schemas"]["Response"];
          };
        };
      };
    };
  };
  "/adminDetails": {
    /** checks if an admin user is logged in */
    get: {
      responses: {
        /** @description returns the (admin) user object */
        200: {
          content: {
            "application/json": components["schemas"]["User"];
          };
        };
        /** @description not an admin */
        401: {
          content: {
            "application/json": components["schemas"]["Response"];
          };
        };
      };
    };
  };
  "/login": {
    /** Logins a user in */
    post: {
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": {
            username: string;
            password: string;
          };
        };
      };
      responses: {
        /** @description returns a login cookie */
        200: {
          content: {
            "application/json": components["schemas"]["User"];
          };
        };
        /** @description failed to login */
        401: {
          content: {
            "application/json": components["schemas"]["Response"];
          };
        };
      };
    };
  };
  "/logout": {
    /** logs a user out */
    post: {
      responses: {
        /** @description logs a user out */
        200: {
          content: {
            "application/json": components["schemas"]["Response"];
          };
        };
        /** @description Server failed to finish the function */
        500: {
          content: {
            "application/json": components["schemas"]["Response"];
          };
        };
      };
    };
  };
  "/signup": {
    /** Logins a user in */
    post: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["SignUpInput"];
        };
      };
      responses: {
        /** @description signs a user up and returns the cookie */
        200: {
          content: {
            "application/json": components["schemas"]["User"];
          };
        };
        /** @description user already exists */
        409: {
          content: {
            "application/json": components["schemas"]["Response"];
          };
        };
        /** @description Server failed to finish the function */
        500: {
          content: {
            "application/json": components["schemas"]["Response"];
          };
        };
      };
    };
  };
  "/updateAccount": {
    /** Updates account information */
    post: {
      requestBody: {
        content: {
          "application/json": components["schemas"]["SignUpInput"] & {
            oldPassword: string;
          };
        };
      };
      responses: {
        /** @description account successfully updated */
        200: {
          content: {
            "application/json": components["schemas"]["User"];
          };
        };
        /** @description email already exists */
        409: {
          content: {
            "application/json": components["schemas"]["Response"];
          };
        };
        /** @description Server failed to finish the function */
        500: {
          content: {
            "application/json": components["schemas"]["Response"];
          };
        };
      };
    };
  };
  "/getCase/{hash}": {
    /** gets a case from the url hash */
    get: {
      responses: {
        /** @description returns the pdf of the hash */
        200: {
          content: {
            "application/pdf": Record<string, never>;
          };
        };
        /** @description the server encountered an error */
        500: {
          content: {
            "application/json": components["schemas"]["Response"];
          };
        };
      };
    };
  };
  "/cases": {
    /** gets all the cases */
    get: {
      responses: {
        /** @description up to 15 cases */
        200: {
          content: {
            "application/json": components["schemas"]["Case"][];
          };
        };
      };
    };
  };
  "/addCase": {
    /** adds a case to the database and returns the inserted value */
    get: {
      requestBody: {
        content: {
          "multipart/form-data": {
            /** Format: binary */
            file?: string;
          };
        };
      };
      responses: {
        /** @description successfully added a case */
        200: {
          content: {
            "application/json": components["schemas"]["Case"];
          };
        };
        /** @description the server encountered an error */
        500: {
          content: {
            "application/json": components["schemas"]["Response"];
          };
        };
      };
    };
  };
  "/deleteCase": {
    /** deletes a case */
    post: {
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": {
            hash: string;
          };
        };
      };
      responses: {
        /** @description case deleted */
        200: {
          content: {
            "application/json": components["schemas"]["Case"];
          };
        };
        /** @description Server failed to finish the function */
        500: {
          content: {
            "application/json": components["schemas"]["Response"];
          };
        };
      };
    };
  };
  "/assignCase": {
    /** assigns the case (hash) to the user (user) */
    post: {
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": {
            user: string;
            case: string;
          };
        };
      };
      responses: {
        /** @description successfully assigned a case */
        200: {
          content: {
            "application/json": components["schemas"]["Assignment"];
          };
        };
        /** @description an error was encountered */
        500: {
          content: {
            "application/json": components["schemas"]["Response"];
          };
        };
      };
    };
  };
  "/assignedCases": {
    /** gets all the assigned cases to the logged in user */
    get: {
      responses: {
        /** @description all the assigned cases */
        200: {
          content: {
            "application/json": components["schemas"]["Assignment"][];
          };
        };
        /** @description an error was encountered */
        500: {
          content: {
            "application/json": components["schemas"]["Response"];
          };
        };
      };
    };
  };
  "/updateAssignment": {
    /** Updates the information attached to an assignment */
    post: {
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": {
            json: components["schemas"]["AnyValue"];
            caseId: string;
            userId: number;
            completed?: boolean;
          };
        };
      };
      responses: {
        /** @description successfully updated the information of the case */
        200: {
          content: {
            "application/json": components["schemas"]["Assignment"];
          };
        };
        /** @description an error was encountered */
        500: {
          content: {
            "application/json": components["schemas"]["Response"];
          };
        };
      };
    };
  };
  "/resolveCase": {
    /** Accepts a case if resolved, rejects a case if not resolved */
    post: {
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": {
            caseId: string;
            userId: number;
            resolved: boolean;
          };
        };
      };
      responses: {
        /** @description successfully resolved the case */
        200: {
          content: {
            "application/json": components["schemas"]["Assignment"];
          };
        };
        /** @description an error was encountered */
        500: {
          content: {
            "application/json": components["schemas"]["Response"];
          };
        };
      };
    };
  };
  "/getAssignments": {
    /** Gets all the cases assigned by this user */
    get: {
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": {
            includeNotCompleted: boolean;
            includeReviewed: boolean;
            start: number;
            take: number;
            desc: boolean;
            hash?: string;
          };
        };
      };
      responses: {
        /** @description successfully got the cases */
        200: {
          content: {
            "application/json": components["schemas"]["Assignment"][];
          };
        };
        /** @description an error was encountered */
        500: {
          content: {
            "application/json": components["schemas"]["Response"];
          };
        };
      };
    };
  };
  "/getUsers": {
    /** Gets a list of users */
    get: {
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": {
            includeAdmins: boolean;
            email?: string;
            start: number;
            take: number;
            desc: boolean;
          };
        };
      };
      responses: {
        /** @description successfully got the users */
        200: {
          content: {
            "application/json": components["schemas"]["User"][];
          };
        };
        /** @description an error was encountered */
        500: {
          content: {
            "application/json": components["schemas"]["Response"];
          };
        };
      };
    };
  };
  "/getCases": {
    /** Gets a list of cases */
    get: {
      requestBody: {
        content: {
          "application/x-www-form-urlencoded": {
            isCompleted: boolean;
            hasAssignments: boolean;
            start: number;
            take: number;
            desc: boolean;
          };
        };
      };
      responses: {
        /** @description successfully got the users */
        200: {
          content: {
            "application/json": components["schemas"]["Case"][];
          };
        };
        /** @description an error was encountered */
        500: {
          content: {
            "application/json": components["schemas"]["Response"];
          };
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    AnyValue: unknown;
    Response: {
      response: string;
    };
    User: {
      id: number;
      email: string;
      password: string;
      name: string;
      role: string;
    };
    Case: {
      fileName: string;
      caseName: string;
      authorId: number;
      finalJson: components["schemas"]["AnyValue"];
    };
    Assignment: {
      info: components["schemas"]["AnyValue"];
      userId: number;
      hash: string;
      case?: {
        caseName: string;
      };
      /** @enum {string} */
      reviewed?: "PENDING" | "ACCEPTED" | "REJECTED";
      completed: boolean;
    };
    SignUpInput: {
      name: string;
      password: string;
      email: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export type operations = Record<string, never>;
