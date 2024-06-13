import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'] // Corrected to styleUrls
})
export class NavBarComponent implements OnInit {
  title = 'geo-location-login';
  signupUsers: any[] = [];
  signupObj: any = {
    userName: '',
    phone: '',
    email: '',
    password: '',
  };
  loginObj: any = {
    userName: '',
    password: '',
  };
  userLocation: string;

  constructor(private locationService: LocationService, private router: Router) {
    this.userLocation = ''; // Initialize userLocation
  }

  ngOnInit(): void {
    const localdata = localStorage.getItem('signupUsers');
    if (localdata !== null) {
      this.signupUsers = JSON.parse(localdata);
    }
  }

  onDetectLocationClick() {
    this.locationService.getLocation()
      .then(coords => {
        this.locationService.reverseGeocode(coords.latitude, coords.longitude)
          .subscribe({
            next: address => {
              this.userLocation = address;
              console.log(this.userLocation);
            },
            error: error => {
              console.error('Error getting address:', error.message);
            }
          });
      })
      .catch(error => {
        console.error('Error getting location:', error.message);
      });
  }

  onSignUP() {
    this.signupUsers.push(this.signupObj);
    if (typeof localStorage !== undefined && this.signupObj.userName &&
      isValidPhone(this.signupObj.phone) &&
      isValidEmail(this.signupObj.email) &&
      isValidPassword(this.signupObj.password)) {
      localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
      alert('Account created successfully');

      this.signupObj = {
        userName: '',
        phone: '',
        email: '',
        password: '',
      }
    } else {
      alert('Not valid');
    }

    function isValidEmail(email: any) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    function isValidPhone(phone: any) {
      const phoneRegex = /^\d{10}$/; // Example: 10 digit phone number
      return phoneRegex.test(phone);
    }

    function isValidPassword(password: any) {
      return password.length >= 8; // Example: Password should be at least 8 characters long
    }
  }

  onLogin() {
    const isUserExist = this.signupUsers.find((user: any) => user.userName === this.loginObj.userName && user.password === this.loginObj.password);
    if (isUserExist !== undefined) {
      alert('User Login Successfully');
      // Redirect to restaurant items page
      this.router.navigate(['/restaurant']);
    } else {
      alert('Wrong credentials');
    }
  }
}
