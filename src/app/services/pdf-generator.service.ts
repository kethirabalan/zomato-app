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

    // Set font and styles
    doc.setFontSize(16);
    doc.setTextColor(40);

    // Title
    doc.text("Checkout Details", 10, 10);
    doc.setFontSize(12);

    // Billing Address
    doc.setTextColor(0, 0, 255);
    doc.text("Billing Address", 10, 20);
    doc.setTextColor(0);
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
    doc.setTextColor(0, 0, 255);
    doc.text("Payment Information", 10, 130);
    doc.setTextColor(0);
    doc.text(`Payment Method: ${data.payment_method}`, 10, 140);
    doc.text(`Name on Card: ${data.cc_name}`, 10, 150);
    doc.text(`Credit Card Number: ${data.cc_number}`, 10, 160);
    doc.text(`Expiration: ${data.cc_expiration}`, 10, 170);
    doc.text(`CVV: ${data.cc_cvv}`, 10, 180);

    // Cart Items
    let y_position = 200;
    if (data.cart_items && Array.isArray(data.cart_items)) {
      doc.setTextColor(0, 0, 255);
      doc.text("Cart Items", 10, y_position);
      y_position += 10;
      data.cart_items.forEach((item: any) => {
        doc.setTextColor(0);
        doc.text(`Item: ${item.title}, Shop: ${item.shop}, Price: ${item.price} INR`, 10, y_position);
        y_position += 10;
      });
    }

    // Promo Code and Total Price
    y_position += 20; // Add some space before promo code
    doc.setTextColor(0, 0, 255);
    doc.text(`Promo Code: ${data.promo_code} (-${data.promo_discount} INR)`, 10, y_position);
    y_position += 10;
    doc.text(`Total Price: ${data.total_price} INR`, 10, y_position);

    // Save the PDF
    doc.save('checkout_details.pdf');
  }
}