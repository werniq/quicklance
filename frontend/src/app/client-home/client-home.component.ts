import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {
  clientTasks: any[] = [];
  error: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.fetchClientTasks();
  }

  fetchClientTasks(): void {
    this.clientTasks = [
      {
        id: 1,
        title: 'Task 1',
        description: 'Description for Task 1',
        created_at: '2024-11-20T10:30:00'
      },
      {
        id: 2,
        title: 'Task 2',
        description: 'Description for Task 2',
        created_at: '2024-11-21T11:00:00'
      },
      {
        id: 3,
        title: 'Task 3',
        description: 'Description for Task 3',
        created_at: '2024-11-21T14:15:00'
      }
    ];
  }
}
