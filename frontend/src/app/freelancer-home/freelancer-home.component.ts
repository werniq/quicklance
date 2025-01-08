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
  data: any = [];

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
