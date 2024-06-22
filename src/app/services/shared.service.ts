import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { getDatabase, ref, set, get, child } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  db = getDatabase();

  constructor(private authService: AuthService) {}

  private getUserCartKey(): string | null {
    const username = this.authService.getLoggedInUser();
    return username ? `cartItems/${username}` : null;
  }

  setItem(item: any): void {
    const cartKey = this.getUserCartKey();
    if (cartKey) {
      this.getCartItems().then(cartItems => {
        cartItems.push(item);
        this.saveCartItems(cartItems);
      });
    } else {
      alert('No user logged in to add items to cart.');
    }
  }

  async getCartItems(): Promise<any[]> {
    const cartKey = this.getUserCartKey();
    if (cartKey) {
      const cartRef = ref(this.db, cartKey);
      const snapshot = await get(cartRef);
      return snapshot.exists() ? snapshot.val() : [];
    }
    return [];
  }

  clearCart(): void {
    const cartKey = this.getUserCartKey();
    if (cartKey) {
      set(ref(this.db, cartKey), []).catch(error => console.error('Error clearing cart:', error));
    }
  }

  private saveCartItems(items: any[]): void {
    const cartKey = this.getUserCartKey();
    if (cartKey) {
      set(ref(this.db, cartKey), items).catch(error => console.error('Error saving cart items:', error));
    }
  }
}
