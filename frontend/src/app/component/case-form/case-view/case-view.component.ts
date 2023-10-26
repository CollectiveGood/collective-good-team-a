import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-case-view',
  templateUrl: './case-view.component.html',
  styleUrls: ['./case-view.component.css']
})
export class CaseViewComponent {
  @Input() caseHash = ''; //will be replaced from parent component
}

