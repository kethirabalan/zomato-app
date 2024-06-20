import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private readonly CART_KEY = 'cartItems';

  setItem(item: any): void {
    let cartItems = this.getCartItems();
    cartItems.push(item);
    this.saveCartItems(cartItems);
  }

  getCartItems(): any[] {
    const cartItems = localStorage.getItem(this.CART_KEY);
    return cartItems ? JSON.parse(cartItems) : [];
  }

  clearCart(): void {
    localStorage.removeItem(this.CART_KEY);
  }

  private saveCartItems(items: any[]): void {
    localStorage.setItem(this.CART_KEY, JSON.stringify(items));
  }
}
