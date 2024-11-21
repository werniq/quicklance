import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import axios from "axios";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userId: number = 0;
  userBalance: number = 0;
  isUserAuthenticated: boolean = false;
  menuItems: string[] = [];

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
    const userType = localStorage.getItem('type') || 'freelancer';
    if (userType === 'client') {
      this.menuItems = ['My Tasks', 'Freelancers', 'Profile'];
    } else {
      this.menuItems = ['Browse Tasks', 'My Earnings', 'Profile'];
    }
  }

  login() {
    // Logic for login
  }

  logout() {
    // Logic for logout
  }
}
