import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where, getDoc } from '@angular/fire/firestore';
import { Storage, getDownloadURL, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  imageUrl: string[] = [];

  constructor(private firestore: Firestore, private storage: Storage) {
    console.log(firestore);
  }

  async addPhoneNumber(user: { phoneNumber: string }) {
    const userData = collection(this.firestore, 'contact');
    await addDoc(userData, user);
  }

  async addRestaurant(restaurant: { name: string, cuisine: string, address: string }) {
    const restaurantData = collection(this.firestore, 'restaurantDetails');
    await addDoc(restaurantData, restaurant);
  }

  async addsignup(signupObj: { userName: string, phone: string }) {
    const signupData = collection(this.firestore, 'signup');
    await addDoc(signupData, signupObj);
  }

  async getUserByEmail(email: string): Promise<any> {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    const user = querySnapshot.docs.map(doc => doc.data())[0];
    return user || null;
  }

  async updateUserProfile(email: string, profileImageUrl: string): Promise<void> {
    const userDoc = doc(this.firestore, 'users', email);
    await updateDoc(userDoc, { profileImageUrl });
  }

  getData() {
    const itemCollection = collection(this.firestore, 'signup');
    return collectionData(itemCollection, { idField: 'id' });
  }

  async updateDocument(postId: string, command: string) {
    const postRef = doc(this.firestore, 'posts', postId);
    await updateDoc(postRef, { notes: command });
  }

  async imageUpload(event: any): Promise<string[]> {
    const file = event.target.files[0];
    if (file) {
      const path = `post/${file.name}`;
      const storageRef = ref(this.storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          () => { },
          (error) => {
            console.error('Error uploading file:', error);
            reject(error);
          },
          () => {
            resolve(null);
          }
        );
      });

      const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
      return [downloadUrl];
    }
    return [];
  }
}