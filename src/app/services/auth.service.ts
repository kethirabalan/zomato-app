import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword,createUserWithEmailAndPassword} from '@angular/fire/auth';
import { getDatabase, ref, set, get, child } from '@angular/fire/database';
import { MessageService } from './message.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signupUsers: any[] = [];
  signupEmail: any[] = [];
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

  registerUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.fireauth, email, password)
  }
  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.fireauth, email, password)
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
  }

  logout(): void {
    this.loggedInUser = null;
    if (isPlatformBrowser(this._platformId)) {
      localStorage.removeItem('username');
      this.router.navigate(['/']);
      signOut(this.fireauth)
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
}
