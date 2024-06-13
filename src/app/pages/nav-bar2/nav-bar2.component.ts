import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar2',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nav-bar2.component.html',
  styleUrls: ['./nav-bar2.component.scss'] // Corrected to styleUrls
})
export class NavBar2Component {
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

  constructor(private router: Router) {}

  onSignUP() {
    this.signupUsers.push(this.signupObj);
    if (this.signupObj.userName &&
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
