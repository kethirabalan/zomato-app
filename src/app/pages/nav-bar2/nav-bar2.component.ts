import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-nav-bar2',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-bar2.component.html',
  styleUrls: ['./nav-bar2.component.scss']
})
export class NavBar2Component implements OnInit {
  userName: string | null = null;
  isLoggedIn: boolean = false;
  profileImgSrc: string = '../../../assets/user.avif'; // Default profile image
  selectedFile!: File;


  constructor(private authService: AuthService, private router: Router,  private firestore: FirestoreService,) {}

  ngOnInit(): void {
    this.loadUser();
    this.loadProfileImage();
  }

  loadUser(): void {
    this.authService.getLoggedInUserEmail().then((email) => {
      if (email) {
        const username = email.split('@')[0];
        this.userName = username;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }
  
  async loadProfileImage(): Promise<void> {
    try {
      const email = await this.authService.getLoggedInUserEmail();
      if (email) {
        const userDoc = await this.firestore.getUserByEmail(email);
        if (userDoc && userDoc.profileImageUrl) {
          this.profileImgSrc = userDoc.profileImageUrl;
        }
      }
    } catch (error) {
      console.error('Error loading profile image:', error);
    }
  }


  logout(): void {
    this.authService.logout();
    this.userName = null;
    this.router.navigate(['/']); // Redirect to login page after logout
  }

  editProfile(): void {
    const editProfileModal = new (window as any).bootstrap.Modal(
      document.getElementById('editProfileModal')
    );
    editProfileModal.show();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        this.profileImgSrc = base64Image;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async updateProfile(): Promise<void> {
    if (!this.selectedFile) {
      console.warn('No file selected');
      return;
    }

    try {
      const email = await this.authService.getLoggedInUserEmail();
      if (email) {
        const downloadUrl = await this.firestore.imageUpload({ target: { files: [this.selectedFile] } });
        await this.firestore.updateUserProfile(email, downloadUrl[0]);
        console.log('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }
}