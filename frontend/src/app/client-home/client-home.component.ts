import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-client-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {
  clientTasks: any[] = [];
  newsFetchingURL: string = `http://localhost:8080/api/v1/user/${localStorage.getItem('userId')}/tasks`
  error: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.fetchClientTasks();
  }

  fetchClientTasks(): void {
    axios.get(this.newsFetchingURL, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('jwtToken'),
      }
    }).then(res => {
      this.clientTasks = res.data;
    })
  }
}
