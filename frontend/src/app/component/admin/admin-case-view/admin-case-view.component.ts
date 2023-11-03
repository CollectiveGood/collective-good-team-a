import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Case } from 'src/app/models';
import { CaseService } from 'src/app/service/case/case.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent } from '../../dialog/file-upload-dialog/file-upload-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-case-view',
  templateUrl: './admin-case-view.component.html',
  styleUrls: ['./admin-case-view.component.css'],
})
export class AdminCaseViewComponent implements AfterViewInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  displayedColumns: string[] = ['caseName', 'actions'];
  dataSource = new MatTableDataSource<Case>();
  
  loading: boolean = false;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private caseService: CaseService, 
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCaseList();
  }

  loadCaseList(): void {
    // Load list of cases in the database
    this.loading = true;
    this.caseService.getAllCases().subscribe({
      next: (response) => {
        if (response.length === 0) { // if no cases, return
          return;
        }
        this.dataSource.data = response;
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCaseList();
      }
    });
  }
}