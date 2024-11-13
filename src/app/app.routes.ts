import {provideRouter, Routes} from '@angular/router';
import {ApplicationConfig} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {CommonModule} from '@angular/common';
import {TaskDetailedComponent} from './task-detailed/task-detailed.component';
import {UserProfileComponent} from './user-profile/user-profile.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'tasks', component: CommonModule},
  { path: 'tasks/:id', component: TaskDetailedComponent},
  { path: 'users/:id', component: UserProfileComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
}
