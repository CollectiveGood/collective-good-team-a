import { Component, OnInit } from '@angular/core';
import { Case } from 'src/app/model/case.model';
import { Router } from '@angular/router';
import { CaseService } from 'src/app/service/case/case.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  cases: Case[] | null = null;
  case: Case | null = null;
  clickedCaseURL: string | null = null;
  loading: boolean = false;
  
  constructor( private router: Router, private caseService: CaseService) {}

  ngOnInit(): void {
    // Retrieve list of cases
    this.loading = true;
    this.caseService.getAllCases()?.subscribe({
      next: (response) => {
        console.log("attempting to get cases");
        // console.log(response);
        this.cases = response;
        if (this.cases.length == 0) {
          this.cases = null;
        } else {
          console.log(this.cases.length);
          console.log(this.cases[0]);
        }
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
  caseClick(clickedCase: Case) {
    // You can access the case information here and perform any necessary actions
    console.log('Button clicked for case:', clickedCase);
    this.router.navigate([`/case/${clickedCase.URLhash}`])
  }
}
