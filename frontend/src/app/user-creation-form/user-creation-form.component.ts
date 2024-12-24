import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import axios from "axios";

@Component({
  selector: 'app-user-creation-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-creation-form.component.html',
  styleUrls: ['./user-creation-form.component.css']
})
export class UserCreationFormComponent {
  private userCreationEndpoint = "http://localhost:8080/api/v1/register";
  public user = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    userType: 'client'
  };
  public responseMessage = "";
  public isRegistered = false;
  public successMessage = '';
  public errorMessage = '';

  constructor() { }

  registerUser() {
    this.user.userType = this.user.userType.toUpperCase();
    axios.post(this.userCreationEndpoint, this.user)
      .then(response => {
      if (response.status === 200) {
        this.successMessage = 'User created successfully!';
        localStorage.setItem('userToken', response.data.jwtToken);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('userType', this.user.userType.toLowerCase());
        this.resetForm();
      } else {
        this.errorMessage = 'Unexpected response from the server: ' + response.data?.message;
      }
      })
      .catch(error => {
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message || 'An error occurred.';
        } else {
          this.errorMessage = 'Unable to connect to the server. Please try again later.';
        }
      });
  }

  resetForm() {
    this.user = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      userType: 'client'
    };
    this.responseMessage = '';
    this.isRegistered = false;
    this.successMessage = '';
    this.errorMessage = '';
  }
}
