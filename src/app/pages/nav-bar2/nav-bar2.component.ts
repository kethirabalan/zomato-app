import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar2',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './nav-bar2.component.html',
  styleUrls: ['./nav-bar2.component.scss']
})
export class NavBar2Component implements OnInit {
  username: string | null = null;
  isLoggedIn: boolean = false;
  profileImgSrc: string = '../../../assets/user.avif'; // Default profile image
  cartItems: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUser();
    this.loadProfileImage();
  }

  loadUser() {
    const storedUsername = this.authService.getLoggedInUser();
    if (storedUsername) {
      this.username = storedUsername;
      this.isLoggedIn = true;
    }
  }

  loadProfileImage() {
    const storedProfileImg = this.authService.getProfileImage();
    if (storedProfileImg) {
      this.profileImgSrc = storedProfileImg;
    }
  }

  logout() {
    this.authService.logout();
    this.username = null;
    this.isLoggedIn = false;
    this.router.navigate(['/']); // Redirect to login page after logout
  }

  editprofile() {
    const editProfileModal = new window.bootstrap.Modal(
      document.getElementById('editProfileModal')
    );
    editProfileModal.show();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        this.profileImgSrc = base64Image; // Update the profile image in the UI
        this.authService.setProfileImage(base64Image); // Save to local storage
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfile() {
    // Additional logic to update the profile details can be added here
  }
}