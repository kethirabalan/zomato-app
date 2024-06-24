import { Component, Inject, OnInit, PLATFORM_ID, ElementRef,  ViewChild } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageComponent } from '../message/message.component';
import { MessageService } from '../../services/message.service';

@Component({
selector: 'app-nav-bar',
standalone: true,
imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink,MessageComponent],
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
  loginSuccess = false;
  loginError = false;
  signupSuccess = false;
  signupError = false;

  @ViewChild('loginpassword') loginpassword!: ElementRef<HTMLInputElement>; // Define the type explicitly
  showPassword: any;

  constructor(
    private locationService: LocationService,
    private authService: AuthService,
    private messageService: MessageService,
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
        this.loginSuccess = true;
        setTimeout(() => {
          this.loginSuccess = false;
        }, 3000); // Show success message for 3 seconds
      } else {
        this.loginError = true;
        setTimeout(() => {
          this.loginError = false;
        }, 3000); // Show error message for 3 seconds
      }
  }

  togglePasswordVisibility(inputId: string) {
    this.showPassword = !this.showPassword;
    const input = (this as any)[inputId].nativeElement;
    input.type = this.showPassword ? 'text' : 'password';
  }


  onSignup() {
    const isSignUp = this.authService.signUp(this.signupObj);
    if (isSignUp) {
      this.signupSuccess = true;
      setTimeout(() => {
        this.signupSuccess = false;
      }, 1000);
    } else {
      this.signupError = true;
      setTimeout(() => {
        this.signupError = false;
      }, 3000);
    }
  }
  
  signInWithGoogle() {
    this.authService.googleSignIn();
  }

}