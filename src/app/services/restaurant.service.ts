import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection } from '@angular/fire/firestore';
import { addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private firestore: Firestore) {
    console.log(firestore);
    
   }

//  async addRestaurant(restaurant:{restaurantDetails:string}) {
//     const userData = collection(this.firestore,'restaurantDetails')
//     await addDoc(userData,restaurant)
//   }

  async addRestaurant(restaurant: { name: string, cuisine: string, address: string }) {
    const userData = collection(this.firestore,'restaurantDetails')
    await addDoc(userData,restaurant)
  }
}