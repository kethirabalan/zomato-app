import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavBar2Component } from '../nav-bar2/nav-bar2.component';
import { Footer2Component } from '../footer2/footer2.component';
import { MenuComponent } from '../menu/menu.component';


@Component({
  selector: 'app-restaurant-items',
  standalone: true,
  imports: [Footer2Component, NavBar2Component, CommonModule, FormsModule,MenuComponent],
  templateUrl: './restaurant-items.component.html',
  styleUrl: './restaurant-items.component.scss'
})
export class RestaurantItemsComponent {

}
