import { Component, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent {

  constructor(private el: ElementRef, private authService: AuthService) { }

  scrollTo(elementId: string): void {
    const element = this.el.nativeElement.querySelector(`#${elementId}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
