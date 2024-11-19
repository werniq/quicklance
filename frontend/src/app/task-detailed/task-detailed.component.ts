import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import axios from 'axios';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-task-detailed',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink
  ],
  templateUrl: './task-detailed.component.html',
  styleUrl: './task-detailed.component.css'
})

export class TaskDetailedComponent {
  id: number = 0;
  private sub: any;
  data: any = {
    title: 'Design a Landing Page',
    description: 'Create a modern landing page for a tech startup. Use responsive design principles and ensure compatibility across devices.',
    credits: 50,
    created_at: '2024-11-01'
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    })

    axios.get("http://localhost:8080/tasks/" + this.id.toString())
      .then(response => {
        this.data = response.data;
      }, (error) => {
        console.error("Error while retrieving tasks data: ", error);
      })
  }
}
