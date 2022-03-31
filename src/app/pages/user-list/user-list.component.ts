import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any[] = [];
  displayedUsers: any[] = [];
  currentPage: number = 0;
  pageNumber: number = 0;
  pages: any[] = [];
  pageSize = 10;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (this.userService.allUsers.length < 3) {
      this.userService.getUsers().subscribe(response => {
        this.userService.allUsers = response;
        this.users=response;
        this.pageNumber = this.getPageNumber(response.length);
        for (let i = this.currentPage; i < this.currentPage + 10; i++) {
          this.displayedUsers.push(this.userService.allUsers[i]);
        }
      });
    } else {
      this.users = this.userService.allUsers;
      this.pageNumber = this.getPageNumber(this.userService.allUsers.length);
      for (let i = this.currentPage; i < this.currentPage + 10; i++) {
        this.displayedUsers.push(this.userService.allUsers[i]);
      }

    }

  }

  switchPage(page: any): void {
    this.currentPage = page - 1;
    console.log(this.currentPage * 10, this.userService.allUsers[this.currentPage * 10]);
    this.displayedUsers = [];
    for (let i = (this.currentPage * 10); i < (this.currentPage*10) + 10; i++) {
      if (this.userService.allUsers[i]) {
        this.displayedUsers.push(this.userService.allUsers[i]);
      }
    }
  }

  switchStatus(user: any): void {
    console.log(this.userService.allUsers.find(item => item === user));
    this.userService.allUsers.find(item => {
      if (item === user) {
        if (user.status === 'locked') {
          user.status = 'active';
        } else {
          user.status = 'locked';
        }
      }
    })
  }

  editUser(user: any): void {
    this.userService.editingUser = user;
    this.router.navigate(['/edit/' + user.id]);
  }

  navigateToAdd(): void {
    this.router.navigate(['/new']);
  }
  
  private getPageNumber(length: number): number {
    let result = 0;
    if ((length / this.pageSize % 1) !== 0) {
      result = parseInt((length / this.pageSize).toString()) + 1;
    } else {
      result = this.pageNumber = parseInt((length / this.pageSize).toString());
    }
    for (let i = 1; i <= result; i++) {
      this.pages.push(i);
    }
    return result;
  }
}
