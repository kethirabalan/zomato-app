import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  categories = ['All', 'Biryani', 'Chicken', 'Pizza', 'Burger', 'Pasta'];
  selectedCategory = 'All';

  menuItems = [
    { title: 'Oyalo Pizza | California Pizza', category: 'Pizza', location: 'Tirunelveli', price: 525.00, image: 'assets/menu-1.jpg' },
    { title: 'A1 Parotta Stall | Curry Chicken', category: 'Chicken', location: 'Tirunelveli', price: 625.00, image: 'assets/menu-2.jpg' },
    { title: 'Sha Biriyani | Chicken Tikka Masala', category: 'Biryani', location: 'Tirunelveli', price: 225.00, image: 'assets/menu-3.jpg' },
    { title: 'Sweet Truth | Fusilli Pasta', category: 'Pasta', location: 'Tirunelveli', price: 325.00, image: 'assets/menu-4.jpg' },
    { title: 'Foodweel | Chicken Nuggets', category: 'Chicken', location: 'Tirunelveli', price: 525.00, image: 'assets/menu-5.jpg' },
    { title: 'Ibaco | Spring Rolls', category: 'Burger', location: 'Tirunelveli', price: 425.00, image: 'assets/menu-6.jpg' }
  ];

  get filteredMenuItems() {
    if (this.selectedCategory === 'All') {
      return this.menuItems;
    }
    return this.menuItems.filter(item => item.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
}