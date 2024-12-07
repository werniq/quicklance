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
  userId: number = 0;
  userBalance: number = 0;
  isUserAuthenticated: boolean = false;
  menuItems: { label: string; route: string }[] = [];

  ngOnInit() {
    this.initializeUser();
    this.setMenuItems();
  }

  checkUserAuthentication() {
    const token = localStorage.getItem('token');
    axios.get(`https://localhost:8080/is-user-authenticated?token=${token}`)
      .then(response => {
        this.isUserAuthenticated = response.data.authenticated;
      })
      .catch(error => {
        console.error("Authentication check failed", error);
        this.isUserAuthenticated = false;
      });
  }

  retrieveUserInfoById(userId: number) {
    axios.post(`https://localhost:8080/get-user-info?userId=${userId}`)
      .then(response => {
        this.userId = response.data.id;
        this.userBalance = response.data.balance;
      })
      .catch(error => {
        console.error("Failed to retrieve user information", error);
      });
  }

  initializeUser() {
    this.checkUserAuthentication();
    if (this.isUserAuthenticated) {
      this.retrieveUserInfoById(this.userId);
    }
  }

  setMenuItems() {
    const userType = localStorage.getItem('userType') || 'freelancer';
    if (userType === 'client') {
      this.menuItems = [
        { label: 'Home', route: '/freelancer-home'},
        { label: 'My Tasks', route: '/my-tasks' },
        { label: 'Freelancers', route: '/freelancers' },
        { label: 'Create task', route: '/create-task' },
        { label: 'Profile', route: '/users/' + localStorage.getItem('userId') },
      ];
    } else {
      this.menuItems = [
        { label: 'Home', route: '/freelancer-home'},
        { label: 'Browse Tasks', route: '/tasks' },
        { label: 'My Earnings', route: '/my-earnings' },
        { label: 'Profile', route: '/users/' + localStorage.getItem('userId') }
      ];
    }
  }

  protected readonly localStorage = localStorage;
}
