import {provideRouter, Routes} from '@angular/router';
import {ApplicationConfig} from '@angular/core';
import {FreelancerHomeComponent} from './freelancer-home/freelancer-home.component';
import {CommonModule} from '@angular/common';
import {TaskDetailedComponent} from './task-detailed/task-detailed.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {UserCreationFormComponent} from './user-creation-form/user-creation-form.component';
import {TaskCreationFormComponent} from './task-creation-form/task-creation-form.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'tasks', component: CommonModule},
  { path: 'tasks/:id', component: TaskDetailedComponent},
  { path: 'users/:id', component: UserProfileComponent},
  { path: 'register', component: UserCreationFormComponent},
  { path: 'create-task', component: TaskCreationFormComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
}
