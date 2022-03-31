import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.initForm();
  }

  navigateToUserList(): void {
    this.router.navigate(['/']);
  }

  addUser(): void {
    console.log(this.form.getRawValue());
  /*  this.userService.addUser(this.form.getRawValue).subscribe(response => {
      console.log('Response from server: ', response);
    });*/
    const userData = this.form.getRawValue();
    console.log(userData);
    if (this.userService.allUsers) {
      this.userService.allUsers.push(userData);
    }
    this.router.navigate(['/']);

  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      id: Math.floor((Math.random() * 10000) + 1000),
      first_name: '',
      last_name: '',
      status: 'active',
      created_at: this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss.SSS'),
      updated_at: this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm:ss.SSS'),
      url: '-'
    });
  }
}
