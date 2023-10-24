import { Component } from '@angular/core';
import { Case } from 'src/app/model/case.model';
import { CaseService } from 'src/app/service/case/case.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  cases: Case[] | null = null;
  loading: boolean = false;
  
  constructor(private caseService: CaseService) {}

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
}
