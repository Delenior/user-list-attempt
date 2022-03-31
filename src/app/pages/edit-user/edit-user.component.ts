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
    this.initForm(this.userService.editingUser);
    console.log(this.route.snapshot.paramMap);
    console.log('In edit: ', this.userService.editingUser);
  }

  navigateToUserList(): void {
    this.router.navigate(['/']);
  }

  editUser(): void {
    this.form.get('updated_at')?.patchValue(this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss.SSS'));
    this.userService.allUsers.find(item => {
      if (item === this.userService.editingUser) {
        item.first_name = this.form.get('first_name')?.value;
        item.last_name = this.form.get('first_name')?.value;
        item.updated_at = this.form.get('updated_at')?.value;
      }
    });
    this.router.navigate(['/']);
  }
  
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
