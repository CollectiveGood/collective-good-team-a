import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { SignupComponent } from './component/signup/signup.component';
import { AccountComponent } from './component/account/account.component';
import { authGuard } from './service/auth/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'account', component: AccountComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to home component
  { path: '**', redirectTo: '/home'} // handle unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
