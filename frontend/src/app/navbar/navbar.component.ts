import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import axios from "axios";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userId: string = localStorage.getItem('userId') || '0';
  userBalance: number = 0;
  isUserAuthenticated: boolean = false;
  menuItems: { label: string; route: string }[] = [];

  ngOnInit() {
    this.isUserAuthenticated = localStorage.getItem('userToken') != '';
    this.setMenuItems();
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('userToken');
  }

  setMenuItems() {
    const userType = localStorage.getItem('userType') || 'freelancer';
    if (userType === 'client') {
      this.menuItems = [
        { label: 'Home', route: '/home'},
        { label: 'My Tasks', route: '/my-tasks' },
        { label: 'Freelancers', route: '/freelancers' },
        { label: 'Create task', route: '/create-task' },
        { label: 'Profile', route: '/users/' + localStorage.getItem('userId') },
      ];
    } else {
      this.menuItems = [
        { label: 'Home', route: '/home'},
        { label: 'Browse Tasks', route: '/tasks' },
        { label: 'My Earnings', route: '/my-earnings' },
        { label: 'Profile', route: '/users/' + localStorage.getItem('userId') }
      ];
    }
  }

  protected readonly localStorage = localStorage;
}
