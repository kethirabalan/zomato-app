import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
selector: 'app-nav-bar',
standalone: true,
imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
templateUrl: './nav-bar.component.html',
styleUrls: ['./nav-bar.component.scss'] 
})

export class NavBarComponent implements OnInit {
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
  loginSuccess = false; // Track login success state
  loginError = false; // Track login error state

  constructor(
    private locationService: LocationService,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private _platformId: object
  ) {
    this.userLocation = '';
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      const localdata = localStorage.getItem('signupUsers');
      this.signupUsers = localdata ? JSON.parse(localdata) : [];
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

  onSignUp() {
    const isSignedUp = this.authService.signUp(this.signupObj);
    if (isSignedUp) {
      this.signupObj = {
        userName: '',
        phone: '',
        email: '',
        password: '',
      };
    }
  }

  onLogin() {
    const isLoggedIn = this.authService.login(this.loginObj);
    if (isLoggedIn) {
      this.loginSuccess = true; // Set login success flag
      setTimeout(() => {
        this.loginSuccess = false; // Reset after a delay (if needed)
      }, 3000); // Reset after 3 seconds (adjust as needed)
    } else {
      this.loginError = true; // Set login error flag
      setTimeout(() => {
        this.loginError = false; // Reset after a delay (if needed)
      }, 3000); // Reset after 3 seconds (adjust as needed)
    }
  }

  signInWithGoogle() {
    this.authService.googleSignIn();
  }
 
}  
