import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { AccordionComponent } from '../accordion/accordion.component';
import { FormsModule, ReactiveFormsModule, isFormControl } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { Router } from '@angular/router'; // Import the Router


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, FooterComponent, AccordionComponent, FormsModule, ReactiveFormsModule, 
 NavBarComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})

export class LandingPageComponent implements OnInit {
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


  constructor(private router: Router) { } 

  ngOnInit(): void {
    const localdata = localStorage.getItem('signupUsers');
    if (localdata !== null) {
      this.signupUsers = JSON.parse(localdata);
    }
  }

  onSignUP() {
    this.signupUsers.push(this.signupObj);
    localStorage.setItem('signupUsers', JSON.stringify(this.signupUsers));
    this.signupObj = {
      userName: '',
      phone: '',
      email: '',
      password: '',
    }

   function isValidEmail(email:any) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone:any) {
  const phoneRegex = /^\d{10}$/; // Example: 10 digit phone number
  return phoneRegex.test(phone);
}

function isValidPassword(password:any) {
  return password.length >= 8; // Example: Password should be at least 8 characters long
}

if (
  this.signupObj.userName &&
  isValidPhone(this.signupObj.phone) &&
  isValidEmail(this.signupObj.email) &&
  isValidPassword(this.signupObj.password)
) 
{
  alert('Account Created');
} else {
  alert('Not valid');
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
