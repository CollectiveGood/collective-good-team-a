import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './component/account/account.component';
import { AdminAssignmentViewComponent } from './component/admin/admin-assignment-view/admin-assignment-view.component';
import { AdminCaseViewComponent } from './component/admin/admin-case-view/admin-case-view.component';
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';
import { AdminUserViewComponent } from './component/admin/admin-user-view/admin-user-view.component';
import { CaseFormComponent } from './component/case-form/case-form.component';
import { HelpComponent } from './component/help/help.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { adminGuard } from './service/auth/admin.guard';
import { authGuard } from './service/auth/auth.guard';

const routes: Routes = [
  // Admin routes
  { path: 'admin/home', component: AdminHomeComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/cases', component: AdminCaseViewComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/users', component: AdminUserViewComponent, canActivate: [authGuard, adminGuard] },
  { path: 'admin/assignments', component: AdminAssignmentViewComponent, canActivate: [authGuard, adminGuard] },
  
  // User routes
  { path: 'home', component: HomeComponent, canActivate: [authGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'account', component: AccountComponent, canActivate: [authGuard] },
  { path: 'case/:hash', component: CaseFormComponent, canActivate: [authGuard] },
  { path: 'review/:hash', component: CaseFormComponent, canActivate: [authGuard] },
  { path: 'help', component: HelpComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to home component

  // Handle unknown paths
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
