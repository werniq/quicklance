import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from "axios";

@Component({
  selector: 'app-user-creation-form',
  standalone: true,
  imports: [FormsModule],
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
        this.isRegistered = response.status === 200;
        this.successMessage = "Registration successful!";
        this.responseMessage = response.data.message || 'User registered successfully!';
        this.errorMessage = '';
      })
      .catch(error => {
        this.isRegistered = false;
        this.successMessage = '';
        this.errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
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
