import { Injectable } from '@angular/core';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { collection } from '@angular/fire/firestore';
import { addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) {
    console.log(firestore);
  }

  async addPhoneNumber(user: { phoneNumber: string }) {
    const userData = collection(this.firestore, 'contact')
    await addDoc(userData, user)
  }

  async addRestaurant(restaurant: { name: string, cuisine: string, address: string }) {
    const userData = collection(this.firestore, 'restaurantDetails')
    await addDoc(userData, restaurant)
  }

  async addsignup(signupObj: { userName: string, phone: string, email: string }) {
    const userData = collection(this.firestore, 'signup')
    await addDoc(userData, signupObj)
  }

}

