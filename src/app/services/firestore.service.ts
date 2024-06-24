import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection } from '@angular/fire/firestore';
import { addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) {
    console.log(firestore);
    
   }

 async addPhoneNumber(user:{phoneNumber:string}) {
    const userData = collection(this.firestore,'contact')
    await addDoc(userData,user)
  }
}
