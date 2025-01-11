import { Component } from '@angular/core';
import axios from 'axios';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private userAuthorizationEndpoint = "http://localhost:8080/api/v1/login";
  public user = {
    email: '',
    password: '',
  };
  public responseMessage = "";
  public successMessage = '';
  public errorMessage = '';

  constructor() { }

  authorizeUser() {
    axios.post(this.userAuthorizationEndpoint, this.user)
      .then(response => {
        if (response.status == 200) {
          this.successMessage = 'User authorized successfully!';
          localStorage.setItem('jwtToken', response.data.jwtToken);
          localStorage.setItem('userId', response.data.userId);
          localStorage.setItem('userType', response.data.userType.toLowerCase());
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
      email: '',
      password: '',
    };
    this.responseMessage = '';
    this.successMessage = '';
    this.errorMessage = '';
  }
}
