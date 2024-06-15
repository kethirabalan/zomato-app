import { Component} from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { AccordionComponent } from '../accordion/accordion.component';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';


@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink, FooterComponent, AccordionComponent,
 NavBarComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})

export class LandingPageComponent  {
  
}
