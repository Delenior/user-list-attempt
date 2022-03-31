import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  editingUser: any;
  
  allUsers: any[] = [];
  
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get('https://assessment-users-backend.herokuapp.com/users.json');
  }

  addUser(body: any): Observable<any> {
    return this.http.post('https://assessment-users-backend.herokuapp.com/users', body);
  }
}
