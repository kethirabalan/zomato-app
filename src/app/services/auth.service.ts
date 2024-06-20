import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signupUsers: any[];
  loggedInUser: any = null;

  constructor(private router: Router) {
    const localdata = this.getLocalStorageItem('signupUsers');
    this.signupUsers = localdata ? JSON.parse(localdata) : [];
  }

  signUp(user: any): boolean {
    if (this.isValidSignUp(user)) {
      this.signupUsers.push(user);
      this.setLocalStorageItem('signupUsers', JSON.stringify(this.signupUsers));
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
      this.setLocalStorageItem('username', user.userName);
      // Redirect to restaurant items page
      this.router.navigate(['/restaurant']);
      return true;
    } else {
      alert('Wrong credentials');
      return false;
    }
  }

  getLoggedInUser(): string | null {
    return this.getLocalStorageItem('username');
  }

  logout(): void {
    this.loggedInUser = null;
    this.removeLocalStorageItem('username');
    this.router.navigate(['/']);
  }

  getProfileImage(): string | null {
    return this.getLocalStorageItem('profileImage');
  }

  setProfileImage(image: string): void {
    this.setLocalStorageItem('profileImage', image);
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
    const phoneRegex = /^\d{10}$/; //  10 digit phone number
    return phoneRegex.test(phone);
  }

  private isValidPassword(password: any): boolean {
    return password.length >= 8; //  Password should be at least 8 characters long
  }

  private getLocalStorageItem(key: string): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  }

  private setLocalStorageItem(key: string, value: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value);
    }
  }

  private removeLocalStorageItem(key: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
    }
  }
}
