import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavBar2Component } from '../nav-bar2/nav-bar2.component';
import { Footer2Component } from '../footer2/footer2.component';

@Component({
  selector: 'app-investor-relations',
  standalone: true,
  imports: [RouterLink,NavBar2Component,Footer2Component],
  templateUrl: './investor-relations.component.html',
  styleUrl: './investor-relations.component.scss'
})
export class InvestorRelationsComponent {

}
