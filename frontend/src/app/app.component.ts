import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FreelancerHomeComponent } from './freelancer-home/freelancer-home.component';
import { AppRoutingModule} from './app-routing.module';
import {NavbarComponent} from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FreelancerHomeComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quicklance';
}
