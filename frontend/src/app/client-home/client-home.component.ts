import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-client-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent {
  clientTasks: any[] = [];
  error: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.fetchClientTasks();
  }

  async fetchClientTasks(): Promise<void> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.error = 'No token found in localStorage';
      return;
    }

    try {
      const response = await axios.get('/api/v1/user/tasks', {
        params: { token }
      });
      this.clientTasks = response.data;
    } catch (err) {
      this.error = 'Failed to fetch tasks';
      console.error(err);
    }
  }
}
