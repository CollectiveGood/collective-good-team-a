import { User as U } from "@prisma/client";

declare global {
  namespace Express {
    interface User extends U {}
  }
}
export default {};
