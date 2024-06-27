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
  imageUrl: string[] = []
  signupObj: any = {
    userName: '',
    phone: '',
    email: '',
  };

  loginObj: any = {
    email: '',
    password: '',
  };

  progress: any
  profileImgSrc: string = '../../../assets/user.avif'; // Default profile image
  userLocation: string = '';
  loginSuccess = false;
  loginError = false;
  signupSuccess = false;
  signupError = false;



  showSignupPassword: boolean = false;
  showLoginPassword: boolean = false;

  @ViewChild('loginpassword') loginpassword!: ElementRef<HTMLInputElement>;
  showPassword: boolean = false;

  constructor(
    private locationService: LocationService,
    private authService: AuthService,
    private messageService: MessageService,
    private firestore: FirestoreService,
    private router: Router
  ) { }
  
  ngOnInit(): void { }

  login() {
    const email = this.loginObj.email;
    const password = this.loginObj.password;
    this.authService.loginUser(email, password)
      .then((res: any) => {
        this.messageService.showMessage('User Login Successfully', 'success');
        console.log('login success');
        setTimeout(() => {
          const modalElement = document.querySelector('.modal.show');
          if (modalElement) {
            (modalElement as any).classList.remove('show');
            (modalElement as any).style.display = 'none';
            document.body.classList.remove('modal-open');
            const modalBackdrop = document.querySelector('.modal-backdrop');
            if (modalBackdrop) {
              modalBackdrop.remove();
            }
          }
          this.router.navigate(['/restaurant']);
        }, 5000); // 10 seconds
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
        this.firestore.addsignup(this.signupObj);
        this.messageService.showMessage('Account created successfully', 'success');
        console.log('signup success');
        setTimeout(() => {
          const modalElement = document.querySelector('.modal.show');
          if (modalElement) {
            (modalElement as any).classList.remove('show');
            (modalElement as any).style.display = 'none';
            document.body.classList.remove('modal-open');
            const modalBackdrop = document.querySelector('.modal-backdrop');
            if (modalBackdrop) {
              modalBackdrop.remove();
            }
          }
  
          this.router.navigate(['/restaurant']);
        }, 5000); // 10 seconds
      })
      .catch((error: any) => {
        // Show error message
        this.messageService.showMessage('Invalid signup details', 'error');
        console.error('signup error', error);
      });
  } 

  async onFileSelected(event: any): Promise<void> {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        this.profileImgSrc = base64Image; // Update the profile image in the UI
        // this.authService.setProfileImage(base64Image); // Save to Firestore
      };
      reader.readAsDataURL(file);
    }
    try {
      const image = await this.firestore.imageUpload(event);
      console.log(image);
      this.imageUrl = this.imageUrl.concat(image);
      console.log(this.imageUrl);
    }
    catch (error) {
      console.error('image upload as some problem', error);
    }
  }

  async onSave() {
    if (this.signupObj.valid) {
      console.log(this.signupObj.value);
      const formData = this.signupObj.value
      formData.imageUrl = this.imageUrl
      this.signupObj.reset();
      (document.getElementById('fileInput') as HTMLInputElement).value = '';
      this.progress = '';
    }
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

  togglePasswordVisibility(form: string) {
    if (form === 'signup') {
      this.showSignupPassword = !this.showSignupPassword;
      const input = document.getElementById('signuppassword') as HTMLInputElement;
      input.type = this.showSignupPassword ? 'text' : 'password';
    } else if (form === 'login') {
      this.showLoginPassword = !this.showLoginPassword;
      const input = document.getElementById('loginpassword') as HTMLInputElement;
      input.type = this.showLoginPassword ? 'text' : 'password';
    }
  }
}
