import { Component } from '@angular/core';
import { Case } from 'src/app/model/case.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CaseService } from 'src/app/service/case/case.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  cases: Case[] = [];
  
  constructor(private caseService: CaseService) {}

  ngOnInit(): void {
    this.caseService.getAllCases().subscribe((response) => {
      console.log(response);
      this.cases = response;
    });
  }
}
