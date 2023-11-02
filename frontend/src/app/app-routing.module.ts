import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { SignupComponent } from './component/signup/signup.component';
import { AccountComponent } from './component/account/account.component';
import { authGuard } from './service/auth/auth.guard';
import { CaseFormComponent } from './component/case-form/case-form.component';
import { AdminCaseViewComponent } from './component/admin/admin-case-view/admin-case-view.component';
import { adminGuard } from './service/auth/admin.guard';
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';

const routes: Routes = [
  // Admin routes
  { path: 'admin/cases', component: AdminCaseViewComponent, canActivate: [adminGuard, authGuard] },
  { path: 'admin/home', component: AdminHomeComponent, canActivate: [adminGuard, authGuard] },
  
  // User routes
  { path: 'home', component: HomeComponent, canActivate: [authGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'account', component: AccountComponent, canActivate: [authGuard] },
  { path: 'case/:hash', component: CaseFormComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to home component

  // Handle unknown paths
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
