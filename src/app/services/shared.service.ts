import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private authService: AuthService) {}

  private getUserCartKey(): string | null {
    const username = this.authService.getLoggedInUser();
    return username ? `cartItems_${username}` : null;
  }

  setItem(item: any): void {
    const cartKey = this.getUserCartKey();
    if (cartKey) {
      let cartItems = this.getCartItems();
      cartItems.push(item);
      this.saveCartItems(cartItems);
    } else {
      alert('No user logged in to add items to cart.');
    }
  }

  getCartItems(): any[] {
    const cartKey = this.getUserCartKey();
    const cartItems = cartKey ? localStorage.getItem(cartKey) : null;
    return cartItems ? JSON.parse(cartItems) : [];
  }

  clearCart(): void {
    const cartKey = this.getUserCartKey();
    if (cartKey) {
      localStorage.removeItem(cartKey);
    }
  }

  private saveCartItems(items: any[]): void {
    const cartKey = this.getUserCartKey();
    if (cartKey) {
      localStorage.setItem(cartKey, JSON.stringify(items));
    }
  }
}
