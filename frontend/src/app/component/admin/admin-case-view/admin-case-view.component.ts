import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Case } from 'src/app/models';
import { CaseService } from 'src/app/service/case/case.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent } from '../../dialog/file-upload-dialog/file-upload-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-case-view',
  templateUrl: './admin-case-view.component.html',
  styleUrls: ['./admin-case-view.component.css'],
})
export class AdminCaseViewComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  datePipe = new DatePipe('en-US');
  displayedColumns: string[] = ['caseName', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<Case>();
  loading: boolean = false;
  searchText: string = '';
  
  constructor(
    private caseService: CaseService, 
    private dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadCaseList();

    // Set filter predicate
    this.dataSource.filterPredicate = (data: Case, filter: string) => {
      return data.caseName.toLowerCase().includes(filter);
    }
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

  applyFilter(): void {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
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

  onCaseClick(): void {
    // TODO
  }
}