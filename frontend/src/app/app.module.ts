// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { AccountComponent } from './component/account/account.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { PdfViewerComponent } from './shared/pdf-viewer/pdf-viewer.component';
import { CaseFormComponent } from './component/case-form/case-form.component';
import { FormViewComponent } from './component/case-form/form-view/form-view.component';
import { PasswordChangeDialogComponent } from './component/dialog/password-change-dialog/password-change-dialog.component';
import { PasswordConfirmationDialogComponent } from './component/dialog/password-confirmation-dialog/password-confirmation-dialog.component';
import { ConfirmLogoutDialogComponent } from './component/dialog/confirm-logout-dialog/confirm-logout-dialog.component';
import { AdminCaseViewComponent } from './component/admin/admin-case-view/admin-case-view.component';
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';
import { FileUploadDialogComponent } from './component/dialog/file-upload-dialog/file-upload-dialog.component';
import { SaveChangesDialogComponent } from './component/dialog/save-changes-dialog/save-changes-dialog.component';
import { ConfirmSubmitDialogComponent } from './component/dialog/confirm-submit-dialog/confirm-submit-dialog.component';

// UI
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    AccountComponent,
    ToolbarComponent,
    PdfViewerComponent,
    PasswordConfirmationDialogComponent,
    CaseFormComponent,
    FormViewComponent,
    PasswordChangeDialogComponent,
    ConfirmLogoutDialogComponent,
    AdminCaseViewComponent,
    AdminHomeComponent,
    FileUploadDialogComponent,
    SaveChangesDialogComponent,
    ConfirmSubmitDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
