import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, Auth } from '@angular/fire/auth';
import { signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, set, get, child } from '@angular/fire/database';
import { MessageService } from './message.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signupUsers: any[] = [];
  loggedInUser: any = null;
  db = getDatabase();

  constructor(
    private fireauth: Auth,
    private messageService: MessageService,
    private router: Router,
    @Inject(PLATFORM_ID) private _platformId: object
  ) {
    this.loadSignupUsers();
    if (isPlatformBrowser(this._platformId)) {
      const localdata = localStorage.getItem('signupUsers');
      this.signupUsers = localdata ? JSON.parse(localdata) : [];
    }
  }

  private loadSignupUsers(): void {
    const usersRef = ref(this.db, 'signupUsers');
    get(usersRef).then(snapshot => {
      if (snapshot.exists()) {
        this.signupUsers = snapshot.val();
      } else {
        console.log('No signup users available');
      }
    }).catch(error => {
      console.error('Error loading signup users:', error);
    });
  }

  private saveSignupUsers(): void {
    set(ref(this.db, 'signupUsers'), this.signupUsers)
      .catch(error => console.error('Error saving signup users:', error));
    if (isPlatformBrowser(this._platformId)) {
      localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
    }
  }

  signUp(user: any): boolean {
    if (this.isValidSignUp(user)) {
      user.profileImage = '../../../assets/user.avif';
      this.signupUsers.push(user);
      this.saveSignupUsers();
      this.messageService.showMessage('Account created successfully', 'success');
      return true;
    } else {
      this.messageService.showMessage('Invalid signup details', 'error');
      return false;
    }
  }

  
  login(user: any): boolean {
    const isUserExist = this.signupUsers.find(
      u => u.userName === user.userName && u.password === user.password
    );

    if (isUserExist) {
      this.messageService.showMessage('User Login Successfully', 'success');
      this.loggedInUser = user;
      this.saveLoginState(user.userName);
      setTimeout(() => {
        this.router.navigate(['/restaurant']);
      }, 3000); // Wait for 3 seconds before navigating
      return true;
    } else {
      this.messageService.showMessage('Invalid credentials. Please try again.', 'error');
      return false;
    }
  }

  getLoggedInUser(): string | null {
    if (isPlatformBrowser(this._platformId)) {
      return localStorage.getItem('username');
    }
    return null;
  }

  getProfileImage(): string {
    const username = this.getLoggedInUser();
    if (username) {
      const user = this.signupUsers.find(u => u.userName === username);
      return user?.profileImage || '../../../assets/user.avif';
    }
    return '../../../assets/user.avif';
  }

  setProfileImage(image: string): void {
    const username = this.getLoggedInUser();
    if (username) {
      const user = this.signupUsers.find(u => u.userName === username);
      if (user) {
        user.profileImage = image;
        this.saveSignupUsers();
      }
    }
  }

  logout(): void {
    this.loggedInUser = null;
    if (isPlatformBrowser(this._platformId)) {
      localStorage.removeItem('username');
    }
    this.router.navigate(['/']);
  }

  private saveLoginState(username: string): void {
    if (isPlatformBrowser(this._platformId)) {
      localStorage.setItem('username', username);
    }
  }

  private isValidSignUp(user: any): boolean {
    return (
      user.userName &&
      this.isValidPhone(user.phone) &&
      this.isValidEmail(user.email) &&
      this.isValidPassword(user.password)
    );
  }

  private isValidEmail(email: any): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPhone(phone: any): boolean {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }

  private isValidPassword(password: any): boolean {
    return password.length >= 8;
  }

  googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.fireauth, provider)
      .then((result) => {
        this.router.navigate(['/restaurant']);
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
      });
  };
}
