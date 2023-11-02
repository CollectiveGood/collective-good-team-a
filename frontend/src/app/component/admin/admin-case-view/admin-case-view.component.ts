import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Assignment, User, Case } from 'src/app/models';
import { Router } from '@angular/router';
import { CaseService } from 'src/app/service/case/case.service';
import { UserService } from 'src/app/service/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent } from '../../dialog/file-upload-dialog/file-upload-dialog.component';

@Component({
  selector: 'app-admin-case-view',
  templateUrl: './admin-case-view.component.html',
  styleUrls: ['./admin-case-view.component.css'],
})
export class AdminCaseViewComponent {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef<HTMLInputElement> | undefined;
  
  caseList: Case[] = [];
  loading: boolean = false;
  user: User | null = null;
  displayedColumns: string[] = ['caseName', 'actions'];

  constructor(
    private caseService: CaseService, 
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Retrieve list of assigned cases
    this.loading = true;
    this.caseService.getAllCases().subscribe({
      next: (response) => {
        if (response.length === 0) { // if none, set to null
          return;
        }
        this.caseList = response;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  openUploadCaseDialog(): void {
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
      width: '400px'
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.uploadFile(result);
    //   }
    // });
  }
  // onFileSelect(event): void {
  //   const file: File = event.target.files[0];

  //   if (file) {
  //     this.uploadFile(file);
  //   }
  // }

  uploadFile(file: File): void {
    const formData = new FormData();
    formData.append('file', file);

    this.caseService.addCase(file).subscribe({
      next: (response) => {
        console.log(response);
        this.snackbar.open("Upload successful!", "Close", { duration: 3000 });
      },
      error: (e) => {
        console.error(e);
      }
    });
  }
}
