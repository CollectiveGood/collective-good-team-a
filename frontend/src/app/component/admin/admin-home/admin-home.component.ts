import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css', '../../home/home.component.css']
})
export class AdminHomeComponent {

  constructor() { }

  loading: boolean = false;

  ngOnInit(): void {
    // TODO
  }
}
