import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule,],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  categories = ['All', 'Biryani', 'Chicken', 'Pizza', 'Burger', 'Pasta'];
  selectedCategory = 'All';

  cartItemAdded: boolean = false;
  command:string=''
  posts:any

  menuItems = [
    { title: 'California Pizza',shop:'Oyalo Pizza', category: 'Pizza', location: 'Tirunelveli', price: 525.00, image: 'assets/menu-1.jpg' },
    { title: 'Curry Chicken', shop:'A1 Parotta Stall', category: 'Chicken', location: 'Tirunelveli', price: 625.00, image: 'assets/menu-2.jpg' },
    { title: 'Chicken Tikka Masala', shop:'Sha Biriyani', category: 'Biryani', location: 'Tirunelveli', price: 225.00, image: 'assets/menu-3.jpg' },
    { title: 'Fusilli Pasta', shop:'Sweet Truth', category: 'Pasta', location: 'Tirunelveli', price: 325.00, image: 'assets/menu-4.jpg' },
    { title: 'Chicken Nuggets', shop:'Foodweel', category: 'Chicken', location: 'Tirunelveli', price: 525.00, image: 'assets/menu-5.jpg' },
    { title: 'Spring Rolls', shop:'Ibaco', category: 'Burger', location: 'Tirunelveli', price: 425.00, image: 'assets/menu-6.jpg' }
  ];

  constructor(private sharedService: SharedService, private router: Router, private firestore: FirestoreService,private authService: AuthService, private snackBar: MatSnackBar,) {}

  ngOnInit(): void {
    //   this.firestore.getData().subscribe((res:any)=>{
    //   this.posts = res;
    // })
  }

  async addAndShowMessage(item: any) {
    try {
      const userEmail = await this.authService.getLoggedInUserEmail();
      if (userEmail) {
        this.sharedService.addCartItems(item);
        this.cartItemAdded = true;
        this.snackBar.open('Item added to cart successfully!', 'Close', {
          duration: 3000,
        });
        setTimeout(() => {
          this.cartItemAdded = false;
        }, 3000);
      } else {
        this.snackBar.open('Please log in to add items to the cart.', 'Close', {
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error fetching logged-in user email:', error);
    }
  }
  
  get filteredMenuItems() {
    if (this.selectedCategory === 'All') {
      return this.menuItems;
    }
    return this.menuItems.filter(item => item.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }
  
  // updateForm(postId:any){
  //   this.firestore.command =this.command;
  //   this.firestore.updateDoc(postId);
  // }

}