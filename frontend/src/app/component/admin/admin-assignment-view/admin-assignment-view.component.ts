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
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationDialogComponent } from '../../dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-admin-assignment-view',
  templateUrl: './admin-assignment-view.component.html',
  styleUrls: ['./admin-assignment-view.component.css']
})
export class AdminAssignmentViewComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) set MatSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  datePipe = new DatePipe('en-US');
  displayedColumns: string[] = ['caseName', 'lastUpdated', 'actions'];
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
  
    // Set filter predicates for search and status filter
    this.dataSource.filterPredicate = (data: Assignment, filter: string) => {
      const { searchText, selectedStatus } = JSON.parse(filter);
      
      const caseNameMatches = data.case.caseName.toLowerCase().includes(searchText);
  
      switch (selectedStatus) {
        case 'All':
          return caseNameMatches;
        case 'Awaiting Review':
          return caseNameMatches && data.completed && data.reviewed === 'PENDING';
        case 'New':
          return caseNameMatches && !data.completed && data.reviewed === 'PENDING';
        case 'Completed':
          return caseNameMatches && data.completed && data.reviewed === 'ACCEPTED';
        default:
          return false; // Unknown status, no match
      }
    };

    // Set custom sorting for caseName field
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'caseName':
          return item.case?.caseName.toLowerCase() || '';
        default:
          return (item as any)[property];
      }
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
          this.dataSource.data = [];
        }
        this.dataSource.data = response;
      },
      error: (e: HttpErrorResponse) => {
        console.error(e);
        this.snackBar.open(`Failed to retrieve case assignments ${e.message}.`, 'Close', { duration: 3000 });
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    const filterValue = this.searchText.trim().toLowerCase();
    this.dataSource.filter = JSON.stringify({ searchText: filterValue, selectedStatus: this.selectedStatus });
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

  onDeleteClick(assignment: Assignment): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Assignment Deletion',
        content: `Are you sure you want to delete assignment for "${assignment.case.caseName}"?`,
        confirmText: 'Confirm Delete',
        confirmColor: 'warn'
      }
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.assignmentService.deleteAssignment(assignment.id).subscribe({
          next: (response) => {
            console.log(response);
          },
          error: (e: HttpErrorResponse) => {
            console.error(e);
            this.snackBar.open(`Error deleting assignment for "${assignment.case.caseName}: ${e.status} ${e.statusText}`, 'Close', { duration: 3000 });
          },
          complete: () => {
            this.loadAssignmentList();
          }
        });
      }
    });
  }
}
