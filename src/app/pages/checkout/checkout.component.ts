import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBar2Component } from '../nav-bar2/nav-bar2.component';
import { PdfGeneratorService } from '../../services/pdf-generator.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, NavBar2Component,],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  item: any;
  quantity: number = 1;
  totalPrice: number = 0;
  promoCode: string = '';
  promoCodeApplied: boolean = false;
  promoDiscount: number = 0;
  cartItems: any[] = [];
  cartItemRemoved: boolean = false;


  formData = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    address: '',
    address2: '',
    country: '',
    state: '',
    zip: '',
    cart_items: '',
    promo_code: '',
    promo_discount: '',
    total_price: ''
  };


  validPromoCodes: { [key: string]: number } = {
    'EXAMPLECODE': 5,
    'DISCOUNT10': 10,
    'SAVE15': 15
  };

  constructor(private sharedService: SharedService, private pdfGenerator: PdfGeneratorService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  async loadCartItems(): Promise<void> {
    try {
      this.cartItems = await this.sharedService.getCartItems();
      this.calculateTotalPrice();
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price, 0);
    if (this.promoCodeApplied) {
      this.applyPromoCode();
    }
  }

  applyPromoCode(): void {
    if (this.validPromoCodes.hasOwnProperty(this.promoCode)) {
      this.promoCodeApplied = true;
      this.promoDiscount = this.validPromoCodes[this.promoCode];
      this.totalPrice -= this.promoDiscount;
    } else {
      this.promoCodeApplied = false;
      this.promoDiscount = 0;
      this.calculateTotalPrice();
    }
  }

  async removeFromCart(index: number): Promise<void> {
    if (index >= 0 && index < this.cartItems.length) {
      const item = this.cartItems[index];
      this.cartItems.splice(index, 1);
      this.calculateTotalPrice(); // Recalculate total price after removal

      // Display danger alert for item removal
      this.cartItemRemoved = true;
      setTimeout(() => {
        this.cartItemRemoved = false;
      }, 3000); // Hide message after 3 seconds

      try {
        await this.sharedService.removeItemFromCart(item);
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    }
  }

  onSubmit() {
    this.pdfGenerator.generatePdf(this.formData);
  }
}