import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Import the Router
import { NavBar2Component } from '../../homepage/nav-bar2/nav-bar2.component';
import { Footer2Component } from '../../homepage/footer2/footer2.component';


@Component({
  selector: 'app-restaurant-items',
  standalone: true,
  imports: [Footer2Component, NavBar2Component, CommonModule, FormsModule],
  templateUrl: './restaurant-items.component.html',
  styleUrl: './restaurant-items.component.scss'
})
export class RestaurantItemsComponent {

}
