import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-admin-user-view',
  templateUrl: './admin-user-view.component.html',
  styleUrls: ['./admin-user-view.component.css']
})
export class AdminUserViewComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  displayedColumns: string[] = ['name', 'email', 'role'];
  dataSource = new MatTableDataSource<User>();
  loading: boolean = false;
  searchText: string = '';

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUserList();

    // Set filter predicate
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      return data.name.toLowerCase().includes(filter) ||
        data.email.toLowerCase().includes(filter)
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  private loadUserList(): void {
    // Load list of users in the database
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        if (response.length === 0) { // if no users, return
          return;
        }
        this.dataSource.data = response;
      },
      error: (e) => {
        console.error(e);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }
}
