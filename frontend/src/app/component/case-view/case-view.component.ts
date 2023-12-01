import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Assignment } from 'src/app/models';
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
  displayedColumns: string[] = ['caseName', 'lastUpdated'];
  dataSource = new MatTableDataSource<Assignment>();
  loading: boolean = false;
  searchText: string = '';

  constructor(
    private assignmentService: AssignmentService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.loadCaseList();
  
    // Set filter predicate
    this.dataSource.filterPredicate = (data: Assignment, filter: string) => {
      return data.case.caseName.toLowerCase().includes(filter);
    }
    
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

  applyFilter(): void {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  loadCaseList(): void {
    // Load list of completed and reviewed cases
    this.loading = true;
    this.assignmentService.getAllCompletedAssignments().subscribe({
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
    this.router.navigate([`/case/${assignment.id}/complete`]);
  }
}
