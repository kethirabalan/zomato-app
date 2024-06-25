import { Component, Inject, OnInit, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageComponent } from '../message/message.component';
import { MessageService } from '../../services/message.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, MessageComponent],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  signupUsers: any[] = [];
  signupObj= {
    userName: '',
    phone: '',
    email: '',
    password: '',
  };
  loginObj: any = {
    email: '',
    password: '',
  };
  userLocation: string = '';
  loginSuccess = false;
  loginError = false;
  signupSuccess = false;
  signupError = false;

  @ViewChild('loginpassword') loginpassword!: ElementRef<HTMLInputElement>;
  showPassword: boolean = false;

  constructor(
    private locationService: LocationService,
    private authService: AuthService,
    private messageService: MessageService,
    @Inject(PLATFORM_ID) private platformId: object,
    private firestoreService: FirestoreService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  login() {
    const email = this.loginObj.email;
    const password = this.loginObj.password;
    this.authService.loginUser(email, password)
      .then((res: any) => {
        setTimeout(() => {
          this.router.navigate(['/restaurant']);
        }, 3000);
        this.messageService.showMessage('User Login Successfully', 'success');
        console.log('login success');
      })
      .catch((error: any) => {
        this.messageService.showMessage('Invalid credentials. Please try again.', 'error');
        console.error('login error', error);
      });
  }

  signup() {
    const email = this.signupObj.email;
    const password = this.signupObj.password;
    this.authService.registerUser(email, password)
      .then((res: any) => {
        this.signupObj = { userName: '', phone: '', email: '',password: '' }; // Clear the form
        // setTimeout(() => {
        //   this.router.navigate(['/restaurant']);
        // }, 3000);
        this.messageService.showMessage('Account created successfully', 'success');
        console.log('signup success');
        this.firestoreService.addsignup(this.signupObj)
      })
      .catch((error: any) => {
        this.messageService.showMessage('Invalid signup details', 'error');
        console.error('signup error', error);
      });
  }

  async signInWithGoogle() {
    await this.authService.googleSignIn();
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

  togglePasswordVisibility(inputId: string) {
    this.showPassword = !this.showPassword;
    const input = (this as any)[inputId].nativeElement;
    input.type = this.showPassword ? 'text' : 'password';
  }
}
