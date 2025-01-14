import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import axios from 'axios';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-task-detailed',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    FormsModule,
    NgIf,
    NgForOf,
  ],
  templateUrl: './task-detailed.component.html',
  styleUrls: ['./task-detailed.component.css']
})
export class TaskDetailedComponent implements OnInit {
  id: number = 0;
  private sub: any;
  data: any = {};
  submissions: any[] = []; // To store all submissions
  userType: boolean = localStorage.getItem('userType')! === 'client';

  constructor(private route: ActivatedRoute) {}

  solutionDescription: string = '';
  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  getAllSubmissions(): void {
    const token = localStorage.getItem('jwtToken');
    axios
      .get(`http://localhost:8080/api/v1/task/${this.id}/submissions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response)
        this.submissions = response.data; // Populate submissions
        console.log(this.submissions)
      })
      .catch(error => {
        console.error('Error fetching submissions:', error);
      });
  }
  downloadSolution(base64Data: string, filename: string): void {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }

  isImage(base64Data: string): boolean {
    try {
      const prefix = base64Data.substring(0, 20);
      return prefix.includes('iVBORw0KGgo') || prefix.includes('image/');
    } catch {
      return false;
    }
  }

  viewImage(base64Data: string): void {
    const imageUrl = `data:image/png;base64,${base64Data}`;
    const newTab = window.open();
    if (newTab) {
      newTab.document.body.innerHTML = `<img src="${imageUrl}" style="max-width:100%; max-height:100%;">`;
    }
  }


  submitSolution(): void {
    if (!this.solutionDescription || !this.selectedFile) {
      console.error('Please provide a solution description and upload a file.');
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const byteArray = new Uint8Array(arrayBuffer);

      const payload = {
        solution: Array.from(byteArray),
        userId: parseInt(localStorage.getItem('userId')!, 10),
        taskId: this.id,
        description: this.solutionDescription,
      };

      axios.post('http://localhost:8080/api/v1/task/submission', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          'Content-Type': 'application/json',
        },
      })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            alert('Solution submitted successfully!');
            this.getAllSubmissions(); // Refresh submissions after successful submission
          } else {
            alert('Something went wrong');
          }
        })
        .catch(e => {
          console.error('Error submitting solution:', e);
        });

      this.solutionDescription = '';
      this.selectedFile = null;
    };

    reader.onerror = () => {
      console.error('Failed to read file');
    };

    reader.readAsArrayBuffer(this.selectedFile);
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = parseInt(params['id'], 10);
      this.getAllSubmissions(); // Fetch submissions on component initialization
    });

    axios
      .get(`http://localhost:8080/api/v1/tasks/${this.id}`)
      .then(response => {
        this.data = response.data;
      })
      .catch(error => {
        console.error('Error while retrieving task data:', error);
      });
  }
}
