import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './pages/user-list/user-list.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';

const routes: Routes = [
  { path: '', component: UserListComponent},
  { path: 'new', component: AddUserComponent},
  { path: 'edit/:id', component: EditUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
