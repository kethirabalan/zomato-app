import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private authService: AuthService, private firestore: Firestore) {}

  private getUserCartDoc() {
    const username = this.authService.getLoggedInUser('');
    return username ? doc(this.firestore, `cartItems/${username}`) : null;
  }

  async setItem(item: any): Promise<void> {
    const cartDoc = this.getUserCartDoc();
    if (cartDoc) {
      const cartItems = await this.getCartItems();
      cartItems.push(item);
      await this.saveCartItems(cartItems);
    } else {
      alert('No user logged in to add items to cart.');
    }
  }

  async getCartItems(): Promise<any[]> {
    const cartDoc = this.getUserCartDoc();
    if (cartDoc) {
      const cartSnapshot = await getDoc(cartDoc);
      return cartSnapshot.exists() ? (cartSnapshot.data()?.['items'] || []) : [];
    }
    return [];
  }

  async removeItemFromCart(item: any): Promise<void> {
    const cartDoc = this.getUserCartDoc();
    if (cartDoc) {
      const cartItems = await this.getCartItems();
      const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
      await this.saveCartItems(updatedCartItems);
    }
  }

  async clearCart(): Promise<void> {
    const cartDoc = this.getUserCartDoc();
    if (cartDoc) {
      await setDoc(cartDoc, { items: [] });
    }
  }

  private async saveCartItems(items: any[]): Promise<void> {
    const cartDoc = this.getUserCartDoc();
    if (cartDoc) {
      await setDoc(cartDoc, { items });
    }
  }
}
