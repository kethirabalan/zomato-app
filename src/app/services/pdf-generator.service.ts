import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }

  public generatePdf(data: any): void {
    const doc = new jsPDF();
    
    doc.text("Checkout Details", 10, 10);

    // Billing Address
    doc.text("Billing Address", 10, 20);
    doc.text(`First Name: ${data.first_name}`, 10, 30);
    doc.text(`Last Name: ${data.last_name}`, 10, 40);
    doc.text(`Username: ${data.username}`, 10, 50);
    doc.text(`Email: ${data.email}`, 10, 60);
    doc.text(`Address: ${data.address}`, 10, 70);
    doc.text(`Address 2: ${data.address2}`, 10, 80);
    doc.text(`Country: ${data.country}`, 10, 90);
    doc.text(`State: ${data.state}`, 10, 100);
    doc.text(`Zip: ${data.zip}`, 10, 110);

    // Payment Information
    doc.text("Payment Information", 10, 130);
    doc.text(`Payment Method: ${data.payment_method}`, 10, 140);

    if (data.cart_items && Array.isArray(data.cart_items)) {
      // Cart Items
      doc.text("Cart Items", 10, 130);
      let y_position = 140;
      data.cart_items.forEach((item: any) => {
        doc.text(`Item: ${item.title}, Shop: ${item.shop}, Price: ${item.price} INR`, 10, y_position);
        y_position += 10;
      });
    }

    doc.text(`Promo Code: ${data.promo_code} (-${data.promo_discount} INR)`, 10, 200);
  doc.text(`Total Price: ${data.total_price} INR`, 10, 210);

  doc.save('checkout_details.pdf');
  }
}