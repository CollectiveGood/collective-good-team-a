import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.css']
})
export class CaseFormComponent {
  caseHash: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.caseHash = params['hash'];
      // Use caseHash to fetch and render the PDF for the selected case.
    });
  }

}
