import { Component } from '@angular/core';
import { CaseService } from 'src/app/service/case/case.service';
import { UserService } from 'src/app/service/user/user.service';

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
