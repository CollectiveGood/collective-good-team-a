import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Assignment } from 'src/app/models';
import { AssignmentService } from 'src/app/service/assignment/assignment.service';
import { CaseAssignmentDialogComponent } from '../../dialog/case-assignment-dialog/case-assignment-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-assignment-view',
  templateUrl: './admin-assignment-view.component.html',
  styleUrls: ['./admin-assignment-view.component.css']
})
export class AdminAssignmentViewComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  datePipe = new DatePipe('en-US');
  displayedColumns: string[] = ['caseName', 'status', 'lastUpdated', 'actions'];
  dataSource = new MatTableDataSource<Assignment>();
  loading: boolean = false;
  searchText: string = '';
  selectedStatus: string = 'All';
  
  constructor(
    private assignmentService: AssignmentService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadAssignmentList();

    // Set filter predicate - TODO
    this.dataSource.filterPredicate = (data: Assignment, filter: string) => {
      return data.case.caseName.toLowerCase().includes(filter);
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private loadAssignmentList(): void {
    // Load list of assignments in the database
    this.loading = true;
    this.assignmentService.getAllAssignments().subscribe({
      next: (response) => {
        if (response.length === 0) { // if no assignments, return
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

  openCaseAssignmentDialog(): void {
    const dialogRef = this.dialog.open(CaseAssignmentDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Case assignment created successfully!', 'Close', { duration: 3000 });
        this.loadAssignmentList();
      }
    });
  }
}
