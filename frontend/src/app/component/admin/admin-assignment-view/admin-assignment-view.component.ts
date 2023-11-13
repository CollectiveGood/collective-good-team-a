import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Assignment } from 'src/app/models';
import { AssignmentService } from 'src/app/service/assignment/assignment.service';

@Component({
  selector: 'app-admin-assignment-view',
  templateUrl: './admin-assignment-view.component.html',
  styleUrls: ['./admin-assignment-view.component.css']
})
export class AdminAssignmentViewComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  datePipe = new DatePipe('en-US');
  displayedColumns: string[] = ['caseName', 'assignee', 'status', 'lastUpdated', 'actions'];
  dataSource = new MatTableDataSource<Assignment>();
  loading: boolean = false;
  searchText: string = '';

  constructor(
    private assignmentService: AssignmentService
  ) {}

  ngOnInit(): void {
    this.loadAssignmentList();
    // Set filter predicate - TODO
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private loadAssignmentList(): void {
    // Load list of users in the database
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
}
