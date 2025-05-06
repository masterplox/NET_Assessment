import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Employee Management';

  constructor(private router: Router) {}

  goToEmployees() {
    this.router.navigate(['/employees']);
  }

  goToDepartments() {
    this.router.navigate(['/departments']);
  }
}
