import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Role, User } from 'src/app/models';
import { UserService } from 'src/app/service/user/user.service';
import { ConfirmUserRoleUpdateComponent } from '../../dialog/confirm-user-role-update/confirm-user-role-update.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-user-view',
  templateUrl: './admin-user-view.component.html',
  styleUrls: ['./admin-user-view.component.css']
})
export class AdminUserViewComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) set MatSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  displayedColumns: string[] = ['name', 'email', 'role'];
  dataSource = new MatTableDataSource<User>();
  loading: boolean = false;
  searchText: string = '';

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
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

  updateUserRole(userId: number, currentRole: Role): void {
    // Confirm action
    const dialogRef = this.dialog.open(ConfirmUserRoleUpdateComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(update => {
      if (update) {
        const newRole = currentRole === Role.USER ? Role.ADMIN : Role.USER;

        this.userService.updateUserRole(userId, newRole).subscribe({
          next: (response) => {
            this.snackBar.open(`Successfully changed user role for '${response.name}' from ${currentRole} to ${newRole}`, 'Close', {
              duration: 3000}
            );
            this.loadUserList();
          },
          error: (e) => {
            console.error(e);
            this.snackBar.open(`An error occurred updating user role`, 'Close', {
              duration: 3000}
            );
          }
        })
      }
    });
  }
}
