import { User } from "@prisma/client";

export function localAuthStrategy(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

export function adminAuthStrategy(req: any, res: any, next: any) {
  const user = req.user as User;
  if (!req.isAuthenticated() || user.role !== "ADMIN") {
    res.redirect("/");
  }
  next();
}
