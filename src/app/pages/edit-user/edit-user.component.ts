import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router, private formBuilder: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit(): void {
        // Angular reactive form készítésének meghívása átadva az editálni kívánt usert
    this.initForm(this.userService.editingUser);
  }

  // User listára való navigáció
  navigateToUserList(): void {
    this.router.navigate(['/']);
  }

  editUser(): void {
    // updated_at mező felülírása a jelenlegi időpontra a formban
    this.form.get('updated_at')?.patchValue(this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss.SSS'));
    // Megkeressük a usereket tartalmazó tömbben azt amelyiket updatelni szerettük volna és felülírjuk a az alábbi mezőket: first_name, last_name, updated_at
    this.userService.allUsers.find(item => {
      if (item === this.userService.editingUser) {
        item.first_name = this.form.get('first_name')?.value;
        item.last_name = this.form.get('last_name')?.value;
        item.updated_at = this.form.get('updated_at')?.value;
      }
    });
    // Navigáció a user listára
    this.router.navigate(['/']);
  }
  
  // Reactive form inicializálása az editálni kívánt user adataival
  private initForm(user: any): void {
    this.form = this.formBuilder.group({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      status: user.status,
      created_at: user.created_at,
      updated_at: user.updated_at,
      url: user.url
    });
  }
}
