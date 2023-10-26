import { Component, OnInit } from '@angular/core';
import { AssignedCase, Case } from 'src/app/model/case.model';
import { Router } from '@angular/router';
import { CaseService } from 'src/app/service/case/case.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  assignedCases: AssignedCase[] | null = null;
  loading: boolean = false;
  
  constructor( private router: Router, private caseService: CaseService) {}

  ngOnInit(): void {
    // Retrieve list of assigned cases
    this.loading = true;
    this.caseService.getAssignedCases().subscribe({
      next: (response) => {
        if (response.length === 0) { // if none assigned, set to null
          return;
        }
        this.assignedCases = response;
        console.log(this.assignedCases);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }


  //Sojin
  // Handle button click
  caseClick(clickedCase: AssignedCase) {
    // You can access the case information here and perform any necessary actions
    console.log('Button clicked for case:',clickedCase.hash);
    this.router.navigate([`/case/${clickedCase.hash}`])
  }
}
