import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import axios from 'axios';
import {NavbarComponent} from '../navbar/navbar.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-task-detailed',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    FormsModule
  ],
  templateUrl: './task-detailed.component.html',
  styleUrl: './task-detailed.component.css'
})

export class TaskDetailedComponent {
  id: number = 0;
  private sub: any;
  data: any = {
  };

  constructor(private route: ActivatedRoute) {}

  solutionDescription: string = '';
  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  submitSolution(): void {
    if (!this.solutionDescription || !this.selectedFile) {
      console.error('Please provide a solution description and upload a file.');
      return;
    }

    const formData = new FormData();
    formData.append('description', this.solutionDescription);
    formData.append('file', this.selectedFile);
    formData.append('userId', localStorage.getItem("userId")!.toString());
    formData.append('taskId', this.id.toString());

    console.log('Submitting solution:', {
      description: this.solutionDescription,
      file: this.selectedFile,
    });

    axios.post(`http://localhost:8080/api/v1/task/submission`, formData)
      .then(res => {
        if (res.status == 200) {
          console.log(res)
        } else {
          alert("Something went wrong")
        }
      })

    this.solutionDescription = '';
    this.selectedFile = null;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    })

    axios.get("http://localhost:8080/api/v1/tasks/" + this.id.toString())
      .then(response => {
        this.data = response.data;
      }, (error) => {
        console.error("Error while retrieving tasks data: ", error);
      })
  }
}
