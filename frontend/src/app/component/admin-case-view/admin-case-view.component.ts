import { Component, OnInit } from '@angular/core';
import { Assignment, User, Case } from 'src/app/models';
import { Router } from '@angular/router';
import { CaseService } from 'src/app/service/case/case.service';
import { UserService } from 'src/app/service/user/user.service';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-admin-case-view',
  templateUrl: './admin-case-view.component.html',
  styleUrls: ['./admin-case-view.component.css'],
})
export class AdminCaseViewComponent {

  dataSource: MatTableDataSource<Case> = new MatTableDataSource([]); // Create a data source
  loading: boolean = false;
  user: User | null = null;

  constructor(private router: Router, private caseService: CaseService, private userService: UserService) {

  }

  ngOnInit(): void {
    // Retrieve list of assigned cases
    this.loading = true;
    this.caseService.getAllCases().subscribe({
      next: (response) => {
        if (response.length === 0) { // if none assigned, set to null
          return;
        }
        this.dataSource = response;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
