import { Component } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBar2Component } from '../nav-bar2/nav-bar2.component';
import { Footer2Component } from '../footer2/footer2.component';

@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [CommonModule,FormsModule,NavBar2Component,Footer2Component],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.scss'
})
export class AddRestaurantComponent {
  restaurant = {
    name: '',
    cuisine: '',
    address: ''
  };

  constructor(private restaurantService: RestaurantService) {}

  submitForm() {
    this.restaurantService.addRestaurant(this.restaurant).subscribe(
      (response) => {
        console.log('Restaurant added successfully', response);
        
      },
      (error) => {
        console.error('Error adding restaurant', error);
        
      }
    );
  }
}
