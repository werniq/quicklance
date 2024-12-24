import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import axios from 'axios';

@Component({
  selector: 'app-task-creation-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-creation-form.component.html',
  styleUrls: ['./task-creation-form.component.css']
})
export class TaskCreationFormComponent {
  private taskCreationEndpoint = 'http://localhost:8080/api/v1/task';
  task = {
    title: '',
    description: '',
    credits: 0
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;

  createTask() {
    axios.post(this.taskCreationEndpoint, JSON.stringify(this.task), {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('userToken'),
      }
    })
      .then(response => {
        if (response.status === 200) {
          this.successMessage = 'Task created successfully!';
          this.task = { title: '', description: '', credits: 0 };
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
}
