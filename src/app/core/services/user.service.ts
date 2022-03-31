import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Ez fogja eltárolni az editálni kívánt usert
  editingUser: any;
  
  // Ez a változó tárolja globálisan a usereket
  allUsers: any[] = [];
  
  constructor(private http: HttpClient) { }

  // Http kérés a szerver felé
  getUsers(): Observable<any> {
    return this.http.get('https://assessment-users-backend.herokuapp.com/users.json');
  }
}
