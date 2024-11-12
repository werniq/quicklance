import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: { id: number; title: string; description: string; credits: number; created_at: string }[] = [];

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    axios.get("https://localhost:8080/tasks")
      .then((response) => {
        this.data = response;
      }, (error) => {
        console.error("Error fetching data: ", error)
      })
  }
}
