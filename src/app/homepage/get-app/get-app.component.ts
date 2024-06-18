import { Component } from '@angular/core';
import { NavBar2Component } from '../../pages/nav-bar2/nav-bar2.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-get-app',
  standalone: true,
  imports: [NavBar2Component,FooterComponent],
  templateUrl: './get-app.component.html',
  styleUrl: './get-app.component.scss'
})
export class GetAppComponent {

}
