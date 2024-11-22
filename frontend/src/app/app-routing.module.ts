import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import {FreelancerHomeComponent} from './freelancer-home/freelancer-home.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {TaskDetailedComponent} from './task-detailed/task-detailed.component';


const routes: Routes = [
  { path: '/home', component: FreelancerHomeComponent},
  { path: '/tasks', component: CommonModule},
  { path: '/tasks/:id', component: TaskDetailedComponent},
  { path: '/users/:id', component: UserProfileComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
