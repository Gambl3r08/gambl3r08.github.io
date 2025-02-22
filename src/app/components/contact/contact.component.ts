import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactInfo = {
    email: 'tuemail@dominio.com',
    phone: '+123456789',
    address: 'Tu dirección'
  };
}