import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBar2Component } from '../nav-bar2/nav-bar2.component';
import { Footer2Component } from '../footer2/footer2.component';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [CommonModule, FormsModule, NavBar2Component, Footer2Component],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.scss'
})
export class AddRestaurantComponent {
  restaurant = {
    name: '',
    cuisine: '',
    address: ''
  };

  constructor(private firestoreService: FirestoreService) { }

  submitForm() {
    this.firestoreService.addRestaurant(this.restaurant)
      .then(() => {
        alert('Restaurant added successfully');
        this.restaurant = { name: '', cuisine: '', address: '' }; // Clear the form
      })
      .catch(error => {
        console.error('Error adding restaurant: ', error);
      });
  }
}

