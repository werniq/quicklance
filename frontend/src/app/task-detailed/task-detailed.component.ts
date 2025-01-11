import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import axios from 'axios';
import {NavbarComponent} from '../navbar/navbar.component';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-task-detailed',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './task-detailed.component.html',
  styleUrl: './task-detailed.component.css'
})

export class TaskDetailedComponent {
  id: number = 0;
  private sub: any;
  data: any = {
  };
  submissions: any = [];
  userType: boolean = localStorage.getItem('userType')! == "client";

  constructor(private route: ActivatedRoute) {}

  solutionDescription: string = '';
  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input?.files[0];
    }
  }

  getAllSubmissions() {

  }

  submitSolution(): void {
    if (!this.solutionDescription || !this.selectedFile) {
      console.error('Please provide a solution description and upload a file.');
      return;
    }

    console.log('Submitting solution:', {
      description: this.solutionDescription,
      file: this.selectedFile,
    });

    axios.post('http://localhost:8080/api/v1/task/submission', {
      'solution': this.selectedFile,
      'userId': parseInt(localStorage.getItem('userId')!),
      'taskId': this.id,
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('jwtToken'),
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          alert('Solution submitted successfully!');
        } else {
          alert('Something went wrong');
        }
      })
      .catch(e => {
        console.error('Error submitting solution:', e);
      });

    this.solutionDescription = '';
    this.selectedFile = null;
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
    })

    axios.get("http://localhost:8080/api/v1/tasks/" + this.id.toString())
      .then(response => {
        this.data = response.data;
      }, (error) => {
        console.error("Error while retrieving tasks data: ", error);
      })
  }
}
