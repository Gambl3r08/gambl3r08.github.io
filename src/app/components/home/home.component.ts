import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  name = 'Roberto Lozada';
  title = 'Desarrollador Backend';
  description = 'Apasionado por crear soluciones digitales innovadoras';
}