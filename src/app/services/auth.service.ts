import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, Auth } from '@angular/fire/auth';
import { signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, set, get, child } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signupUsers: any[] = [];
  loggedInUser: any = null;
  db = getDatabase();

  constructor(private fireauth: Auth, private router: Router) {
    this.loadSignupUsers();
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
  }

  signUp(user: any): boolean {
    if (this.isValidSignUp(user)) {
      user.profileImage = '../../../assets/user.avif';
      this.signupUsers.push(user);
      this.saveSignupUsers();
      alert('Account created successfully');
      return true;
    } else {
      alert('Invalid signup details');
      return false;
    }
  }

  login(user: any): boolean {
    const isUserExist = this.signupUsers.find(
      u => u.userName === user.userName && u.password === user.password
    );

    if (isUserExist) {
      alert('User Login Successfully');
      this.loggedInUser = user;
      this.saveLoginState(user.userName);
      this.router.navigate(['/restaurant']);
      return true;
    } else {
      alert('Wrong credentials');
      return false;
    }
  }

  getLoggedInUser(): string | null {
    return localStorage.getItem('username');
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
    localStorage.removeItem('username');
    this.router.navigate(['/']);
  }

  private saveLoginState(username: string): void {
    localStorage.setItem('username', username);
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
