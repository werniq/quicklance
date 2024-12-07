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
    name: '',
    email: '',
    password: '',
    userType: 'client'
  };
  public responseMessage = "";
  public isRegistered = false;
  public successMessage = '';
  public errorMessage = '';

  constructor() { }

  updateUsername(username: string) {
    this.user.name = username;
  }

  updateEmail(email: string) {
    this.user.email = email;
  }

  updatePassword(password: string) {
    this.user.password = password;
  }

  updateUserType(userType: string) {
    this.user.userType = userType;
  }

  registerUser() {
    axios.post(this.userCreationEndpoint, this.user)
      .then(response => {
      if (response.status === 200) {
        this.successMessage = 'Task created successfully!';
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
      name: '',
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
