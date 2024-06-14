import { Component , OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  item: any;
  quantity: number = 1;
  totalPrice: number = 0;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.item = this.sharedService.getItem();
    this.totalPrice = this.item?.price;
  }

  onQuantityChange(event: any): void {
    this.quantity = event.target.value;
    this.totalPrice = this.item.price * this.quantity;
  }
}