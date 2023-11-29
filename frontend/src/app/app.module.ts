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
import { HelpComponent } from './component/help/help.component';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { PdfViewerComponent } from './shared/pdf-viewer/pdf-viewer.component';
import { CaseFormComponent } from './component/case-form/case-form.component';
import { FormViewComponent } from './component/case-form/form-view/form-view.component';
import { AdminCaseViewComponent } from './component/admin/admin-case-view/admin-case-view.component';
import { AdminUserViewComponent } from './component/admin/admin-user-view/admin-user-view.component';
import { AdminAssignmentViewComponent } from './component/admin/admin-assignment-view/admin-assignment-view.component';
import { AdminHomeComponent } from './component/admin/admin-home/admin-home.component';
import { PasswordChangeDialogComponent } from './component/dialog/password-change-dialog/password-change-dialog.component';
import { PasswordConfirmationDialogComponent } from './component/dialog/password-confirmation-dialog/password-confirmation-dialog.component';
import { ConfirmLogoutDialogComponent } from './component/dialog/confirm-logout-dialog/confirm-logout-dialog.component';
import { FileUploadDialogComponent } from './component/dialog/file-upload-dialog/file-upload-dialog.component';
import { SaveChangesDialogComponent } from './component/dialog/save-changes-dialog/save-changes-dialog.component';
import { ConfirmSubmitDialogComponent } from './component/dialog/confirm-submit-dialog/confirm-submit-dialog.component';
import { CaseViewDialogComponent } from './component/dialog/case-view-dialog/case-view-dialog.component';
import { ConfirmCaseDeleteDialogComponent } from './component/dialog/confirm-case-delete-dialog/confirm-case-delete-dialog.component';
import { CaseAssignmentDialogComponent } from './component/dialog/case-assignment-dialog/case-assignment-dialog.component';
import { ReviewerFormViewComponent } from './component/case-form/reviewer-form-view/reviewer-form-view.component';
import { CaseViewComponent } from './component/case-view/case-view.component';
import { CompleteFormViewComponent } from './component/case-form/complete-form-view/complete-form-view.component';

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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    AdminUserViewComponent,
    AdminAssignmentViewComponent,
    AdminHomeComponent,
    FileUploadDialogComponent,
    SaveChangesDialogComponent,
    ConfirmSubmitDialogComponent,
    CaseViewDialogComponent,
    ConfirmCaseDeleteDialogComponent,
    AdminAssignmentViewComponent,
    CaseAssignmentDialogComponent,
    HelpComponent,
    ReviewerFormViewComponent,
    CaseViewComponent,
    CompleteFormViewComponent
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
    MatSortModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
