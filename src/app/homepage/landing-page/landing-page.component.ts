import { Component} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { AccordionComponent } from '../accordion/accordion.component';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, FooterComponent, AccordionComponent,
 NavBarComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})

export class LandingPageComponent  {
  phoneNumber: string = '';

 
  constructor(private firestoreService: FirestoreService, private authService: AuthService) {} // Injected AuthService


  contact() {
    console.log(this.firestoreService);
    
    if (this.phoneNumber) {
      this.firestoreService.addPhoneNumber({ phoneNumber: this.phoneNumber })
        .then(() => {
          alert('Phone number added successfully');
          this.phoneNumber = ''; // Clear the input field
        })
        .catch(error => {
          console.error('Error adding phone number: ', error);
        });
    } else {
      alert('Please enter a valid phone number');
    }
  }
}


