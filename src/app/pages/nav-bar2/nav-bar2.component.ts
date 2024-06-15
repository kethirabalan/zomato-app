import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar2.component.html',
  styleUrls: ['./nav-bar2.component.scss']
})
export class NavBar2Component implements OnInit {
  username: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    const storedUsername = this.authService.getLoggedInUser();
    if (storedUsername) {
      this.username = storedUsername;
      this.isLoggedIn = true;
    }
  }

  logout() {
    this.authService.logout();
    this.username = null;
    this.isLoggedIn = false;
    this.router.navigate(['/login']); // Redirect to login page after logout
  }
}
