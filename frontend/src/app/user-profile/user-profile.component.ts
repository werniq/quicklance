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
  user: { id: number; firstname: string; lastname: string; type: string; credits: number }  = {
    id: 0,
    firstname: "",
    lastname: "",
    type: "",
    credits: 0,
  };
  isAdmin: boolean = false;
  creditsToUpdate: number = 0;
  successfulMessage: string = "";
  errorMessage: string = "";

  ngOnInit(): void {
    this.getUserData();
  }

  async getUserData() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    await axios
      .get(`http://localhost:8080/api/v1/user/${userId}`)
      .then(response => {
        this.user.id = response.data.id;
        this.user.firstname = response.data.firstname;
        this.user.lastname = response.data.lastname;
        this.user.type = response.data.type;
        this.user.credits = response.data.credits;
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    this.checkIfAdmin();
  }

  checkIfAdmin() {
    const userId = localStorage.getItem('userId');
    this.isAdmin =  userId?.toString() == this.user?.id.toString() && this.user?.type != "freelancer";
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
