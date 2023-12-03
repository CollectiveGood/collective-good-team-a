import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {

  constructor(private el: ElementRef) { }

  scrollTo(elementId: string): void {
    const element = this.el.nativeElement.querySelector(`#${elementId}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
