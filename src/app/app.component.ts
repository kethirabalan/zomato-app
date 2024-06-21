import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastrModule } from 'ngx-toastr'; // Import ToastrModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ToastrModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'zomato-app';
}
