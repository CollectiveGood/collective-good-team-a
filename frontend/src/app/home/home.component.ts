import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  data: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`${environment.apiUrl}`).subscribe((response) => {
      this.data = response;
    });
  }
}
