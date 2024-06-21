import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBar2Component } from '../nav-bar2/nav-bar2.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule,NavBar2Component],
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

  validPromoCodes: { [key: string]: number } = {
    'EXAMPLECODE': 5,
    'DISCOUNT10': 10,
    'SAVE15': 15
  };

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.loadCartItems();
    this.calculateTotalPrice();
  }

  loadCartItems(): void {
    this.cartItems = this.sharedService.getCartItems();
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
}