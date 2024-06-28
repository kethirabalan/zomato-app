import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, collectionGroup, deleteDoc, doc, docSnapshots, getDoc,  getDocs, orderBy, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Storage, getDownloadURL, getStorage, ref, uploadBytesResumable, uploadString, uploadBytes, listAll } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  imageUrl: string[] = []

  constructor(private firestore: Firestore, private storage: Storage) {
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

  async addsignup(signupObj: { userName: string, phone: string,}) {
    const userData = collection(this.firestore, 'signup')
    await addDoc(userData, signupObj)
  }

  getData(){
    const itemCollection = collection(this.firestore,'signup');
   return collectionData(itemCollection, {idField:'id'})

  }

  command: string = '' 
  updateDoc(postId: string) {
    const userData = doc(this.firestore, 'post', postId)
    updateDoc(userData, {
      notes: this.command
    })
  }

  async imageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log(file);
      const storage = getStorage()
      const path = `post/${file.name}`
      const storageReference = ref(this.storage, path)
      const uploadTask = uploadBytesResumable(storageReference, file)
      console.log(uploadTask);
      await uploadTask.then(() => { alert('file uploaded succesfully') })
      const DownloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
      console.log(DownloadUrl);
      return [DownloadUrl]
    }
    return [];
  }

}

