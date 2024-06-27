import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, collection, query, where, getDocs, doc, setDoc } from '@angular/fire/firestore';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireauth: Auth,
    private firestore: Firestore,
    private messageService: MessageService,
    private router: Router
  ) {}

  registerUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.fireauth, email, password);
  }

  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.fireauth, email, password);
  }

  googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(this.fireauth, provider)
      .then((result) => {
        this.router.navigate(['/restaurant']);
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
      });
  }

  logout(): void {
    signOut(this.fireauth).then(() => {
      this.router.navigate(['/']);
    }).catch((error) => {
      console.error('Error during sign-out:', error);
    });
  }
  
  async getLoggedInUser(email: string): Promise<string | null> {
    const q = query(collection(this.firestore, 'signup'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return doc.data()['userName'];
    }
    return null;
}

  async getProfileImage(email: string): Promise<string> {
    const q = query(collection(this.firestore, 'signup'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return doc.data()['profileImage'] || '../../../assets/user.avif'; 
    }
    return '../../../assets/user.avif';
  }
  
  // async setProfileImage(email: string, image: string): Promise<void> {
  //   const q = query(collection(this.firestore, 'signup'), where('email', '==', email));
  //   const querySnapshot = await getDocs(q);
  //   if (!querySnapshot.empty) {
  //     const docRef = doc(this.firestore, 'signup', querySnapshot.docs[0].id);
  //     await setDoc(docRef, { profileImage: image }, { merge: true });
  //   }
  // }

  getLoggedInUserEmail(): string | null {
    return 'user@example.com';
  }

  private isValidSignUp(user: any): boolean {
    return (
      user.userName &&
      this.isValidPhone(user.phone) &&
      this.isValidEmail(user.email) &&
      this.isValidPassword(user.password)
    );
  }

  private isValidEmail(email: any): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPhone(phone: any): boolean {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }

  private isValidPassword(password: any): boolean {
    return password.length >= 8;
  }
}
