import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClientHomeComponent } from '../client-home/client-home.component';
import { FreelancerHomeComponent } from '../freelancer-home/freelancer-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ClientHomeComponent, FreelancerHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  userType = localStorage.getItem('userType') || "freelancer";
}
