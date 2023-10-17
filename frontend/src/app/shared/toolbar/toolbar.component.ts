import { Component } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  activeUser: User | null = null;
  
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.activeUser = this.authService.getUser();
  }
}
