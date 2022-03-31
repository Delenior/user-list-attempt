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
    // Megnézzük hogy a user listánk létezik-e, 
    if (this.userService.allUsers.length < 1) {
      // Ha nem akkor lekérjük a szerverről a usereket,
      this.userService.getUsers().subscribe(response => {
        // elmentjük a service tömbjébe (this.userService.allUsers) -- ezáltal lesz bárhol elérhatő a kis applikációnkba
        this.userService.allUsers = response;
        // Ez csak a megjelenításhez kell, a html-ben ezt vizsgáljuk hogy létezik-e
        this.users = response;
        // Kiszámoljuk hogy hány oldalra lesz szükségünk és beállítjuk ezt a változót
        this.pageNumber = this.getPageNumber(response.length);
        // Az első 10 usert betesszük a displayedUsers nevű tömbbe, amit meg fogunk jeleníteni a html-ben
        for (let i = this.currentPage; i < this.currentPage + 10; i++) {
          this.displayedUsers.push(this.userService.allUsers[i]);
        }
      });
    } else {
      // Ha már létezik ebbe az ágba kerülünk, ilyenkor csak updateljük a users-t amia megjelenításhez kell, a html-ben ezt vizsgáljuk hogy létezik-e
      // Ebben az esetben nem történik szerver hívás, csak visszatöltjük az adatokat a userService allUsers tömbjéből
      this.users = this.userService.allUsers;
      // Kiszámoljuk hogy hány oldalra lesz szükségünk és beállítjuk ezt a változót
      this.pageNumber = this.getPageNumber(this.userService.allUsers.length);
      // Az első 10 usert betesszük a displayedUsers nevű tömbbe, amit meg fogunk jeleníteni a html-ben
      for (let i = this.currentPage; i < this.currentPage + 10; i++) {
        this.displayedUsers.push(this.userService.allUsers[i]);
      }

    }
  }

  // Oldalváltás - lapozás
  switchPage(page: any): void {
    // Beállítjuk a jelenlegi oldalt
    this.currentPage = page - 1;
    // Kiürítjük a displayedUsers-t azért hogy ne csak a végéhez csapja hozzá az új oldalon lévő usereket, hanem teljesen kicserélje
    this.displayedUsers = [];
    // Majd az oldalszám alapján a allUsersből a megfelelő 10 usert betesszük a displayedUsers tömbbe
    for (let i = (this.currentPage * 10); i < (this.currentPage * 10) + 10; i++) {
      if (this.userService.allUsers[i]) {
        this.displayedUsers.push(this.userService.allUsers[i]);
      }
    }
  }

  // Status váltás
  switchStatus(user: any): void {
    // Megkeressük az editálni kívánt usert majd ha locked volt a korábbi status akkor beállítjuk aktívra vagy fordíva
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

  // Átadjuk az editálni kívánt usert a userService editingUser változójába, majd átnavigálunk az edit route-ra
  editUser(user: any): void {
    this.userService.editingUser = user;
    this.router.navigate(['/edit/' + user.id]);
  }

  // Navigáció új user hozzáadásához
  navigateToAdd(): void {
    this.router.navigate(['/new']);
  }
  
  // Ebben a függvényben számoljuk ki, hogy hány oldalt is fog kitenni a user lista
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
