import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Assignment, GetAssignmentsRequest } from 'src/app/models';
import { AssignmentService } from 'src/app/service/assignment/assignment.service';

@Component({
  selector: 'app-case-view',
  templateUrl: './case-view.component.html',
  styleUrls: ['./case-view.component.css']
})
export class CaseViewComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) set MatSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  /* This component is used to display the list of completed case assignments in the database. */

  datePipe: DatePipe = new DatePipe('en-US');
  displayedColumns: string[] = ['caseName', 'completedAt'];
  dataSource = new MatTableDataSource<Assignment>();
  loading: boolean = false;
  searchText: string = '';

  constructor(
    private assignmentService: AssignmentService
  ) {}
  
  ngOnInit(): void {
    this.loadCaseList();

    // Set filter predicate
    this.dataSource.filterPredicate = (data: Assignment, filter: string) => {
      return data.case.caseName.toLowerCase().includes(filter);
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  loadCaseList(): void {
    // Load list of cases in the database
    this.loading = true;
    const request: GetAssignmentsRequest = {
      includeReviewed: true,
      includeNotCompleted: false,
      start: 0,
      take: 1000, // MAX set to 1000 for now
      desc: false,
    }
    this.assignmentService.getAssignments(request).subscribe({
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

  onCaseClick(assignment: Assignment): void {
    // Open case in new tab
    window.open(`/case/${assignment.hash}`, '_blank');
  }
}
