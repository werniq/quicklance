import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: { id: number; firstname: string; lastname: string; type: string; credits: number } | null = null;
  isAdmin: boolean = false;
  creditsToUpdate: number = 0;
  successfulMessage: string = "";
  errorMessage: string = "";

  ngOnInit(): void {
    this.getUserData();
    this.checkIfAdmin();
  }

  getUserData() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    axios
      .get(`http://localhost:8080/api/v1/user/${userId}`)
      .then(response => {
        this.user = response.data;
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }

  checkIfAdmin() {
    const userId = localStorage.getItem('userId');
    this.isAdmin =  userId == this.user?.id.toString();
  }

  updateUserCredits() {
    if (!this.user) return;

    if (this.user.type.toLowerCase() == "freelancer") {
      this.errorMessage = "Freelancers are not allowed to perform this operation";
      return;
    }
    axios
      .post('http://localhost:8080/api/v1/user/credits', {
        userId: this.user.id,
        credits: this.creditsToUpdate
      })
      .then(response => {
        this.successfulMessage = response.data.message;
        if (this.user) this.user.credits = this.creditsToUpdate;
      })
      .catch(error => {
        console.error('Error updating user credits:', error);
        alert('Failed to update user credits');
      });
  }
}
