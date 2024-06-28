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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUser();
    this.loadProfileImage();
  }

  loadUser(): void {
    this.authService.getLoggedInUserEmail().then((email) => {
      if (email) {
        // Extract the part before the "@" in the email
        const username = email.split('@')[0];
        this.userName = username; // Use the extracted username
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
        const profileImg = await this.authService.getProfileImage(email);
        if (profileImg) {
          this.profileImgSrc = profileImg;
        }
      }
    } catch (error) {
      console.error('Error loading profile image:', error);
    }
  }


  logout(): void {
    this.authService.logout();
    this.userName = null;
    this.isLoggedIn = false;
    this.router.navigate(['/']); // Redirect to login page after logout
  }

  editProfile(): void {
    const editProfileModal = new (window as any).bootstrap.Modal(
      document.getElementById('editProfileModal')
    );
    editProfileModal.show();
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        this.profileImgSrc = base64Image; // Update the profile image in the UI
        // this.authService.setProfileImage(base64Image); // Save to Firestore
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfile(): void {
    // Additional logic to update the profile details can be added here
  }
}