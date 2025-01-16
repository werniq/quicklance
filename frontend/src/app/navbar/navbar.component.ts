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
    this.isUserAuthenticated = localStorage.getItem('jwtToken') != null;
    axios.get('http://localhost:8080/api/v1/user/'+this.userId.toString())
      .then(response => {
        if (response.status == 200) {
          this.userBalance = response.data.credits;
        }
      })
    this.setMenuItems();
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  setMenuItems() {
    const userType = localStorage.getItem('userType') || 'freelancer';
    if (userType === 'client') {
      this.menuItems = [
        { label: 'Home', route: '/home'},
        { label: 'Create task', route: '/create-task' },
        { label: 'Profile', route: '/users/' + localStorage.getItem('userId') },
      ];
    } else {
      this.menuItems = [
        { label: 'Browse Tasks', route: '/home' },
        { label: 'Profile', route: '/users/' + localStorage.getItem('userId') }
      ];
    }
  }

  protected readonly localStorage = localStorage;
}
