import { Component } from '@angular/core';
import { RestaurantService } from '../../services/restaurant.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-restaurant',
  standalone: true,
  imports: [CommonModule,FormsModule],
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
