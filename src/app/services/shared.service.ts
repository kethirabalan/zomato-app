import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  Firestore, addDoc, collection, collectionData, collectionGroup, deleteDoc, doc, docSnapshots, getDoc, arrayUnion,
  getDocs, orderBy, query, setDoc, updateDoc, where
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private authService: AuthService, private firestore: Firestore) { }

  private getUserCartDoc() {
    const username = this.authService.getLoggedInUserEmail();
    return username ? doc(this.firestore, `signup/${username}`) : null;
  }

  async addCartItems(cartItem: { title: string, shop: string, price: string }) {
    const userDocRef = this.getUserCartDoc();

    if (userDocRef) {
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        await updateDoc(userDocRef, {
          cartItems: arrayUnion(cartItem)
        });
      } else {
        await setDoc(userDocRef, {
          cartItems: [cartItem]
        });
      }
    } else {
      alert('No user logged in to add items to cart.');
    }
  }

  async getCartItems(): Promise<any[]> {
    const cartDoc = this.getUserCartDoc();
    if (cartDoc) {
      const cartSnapshot = await getDoc(cartDoc);
      return cartSnapshot.exists() ? (cartSnapshot.data()?.['cartItems'] || []) : [];
    }
    return [];
  }

  async deleteCartItem(item: any) {
    const userDocRef = this.getUserCartDoc();
    if (userDocRef) {
      const cartItems = await this.getCartItems();
      const updatedCartItems = cartItems.filter(cartItem => cartItem.title !== item.title);
      await setDoc(userDocRef, { cartItems: updatedCartItems });
    }
  }

  async clearCart() {
    const userDocRef = this.getUserCartDoc();
    if (userDocRef) {
      await setDoc(userDocRef, { cartItems: [] });
    }
  }

  private async saveCartItems(items: any[]): Promise<void> {
    const cartDoc = this.getUserCartDoc();
    if (cartDoc) {
      await setDoc(cartDoc, { cartItems: items });
    }
  }
}