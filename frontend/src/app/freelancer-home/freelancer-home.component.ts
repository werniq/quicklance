import { Component, OnInit } from '@angular/core';
import axios, { AxiosResponse } from "axios";
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-freelancer-home',
  standalone: true,
  imports: [NavbarComponent, NgForOf, RouterModule],
  templateUrl: './freelancer-home.component.html',
  styleUrls: ['./freelancer-home.component.css']
})

export class FreelancerHomeComponent implements OnInit {
  data: any = [
    {
      id: 1,
      title: 'Design a Landing Page',
      description: 'Create a modern landing page for a tech startup. Use responsive design principles and ensure compatibility across devices.',
      credits: 50,
      created_at: '2024-11-01'
    },
    {
      id: 2,
      title: 'Build a REST API',
      description: 'Develop a RESTful API for managing a to-do list. Include CRUD operations and JWT authentication.',
      credits: 75,
      created_at: '2024-11-05'
    },
    {
      id: 3,
      title: 'Write SEO Articles',
      description: 'Write three SEO-friendly articles on digital marketing trends and tips. Each article should be at least 1,000 words.',
      credits: 30,
      created_at: '2024-11-10'
    },
    {
      id: 4,
      title: 'Implement E-commerce Cart',
      description: 'Implement a shopping cart feature for an e-commerce site, including add, remove, and checkout functionalities.',
      credits: 90,
      created_at: '2024-11-07'
    },
    {
      id: 5,
      title: 'Develop Chatbot Functionality',
      description: 'Build a chatbot using AI that assists users with frequently asked questions and guides them through the site.',
      credits: 100,
      created_at: '2024-11-03'
    }
  ];

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    axios.get("http://localhost:8080/api/v1/tasks", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("userToken"),
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        this.data = response.data;
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }
}
