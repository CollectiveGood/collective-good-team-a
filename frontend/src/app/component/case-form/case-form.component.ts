import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaseService } from 'src/app/service/case/case.service';

@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.css']
})
export class CaseFormComponent {
  caseHash: string = '';
  caseBlob!: Blob;

  constructor(private route: ActivatedRoute, private caseService: CaseService) {
    this.route.params.subscribe(params => {
      this.caseHash = params['hash']; // fetch and render the PDF for the selected case
    });
  }

  ngOnInit(): void {
    // Use caseHash to fetch and render the PDF for the selected case
    this.caseService.getCaseAsPDF(this.caseHash).subscribe({
      next: (response: Blob) => {
        this.caseBlob = response;
      },
      error: (e) => {
        console.log('Get case failed: ', e);
      }
    });
  }
}
