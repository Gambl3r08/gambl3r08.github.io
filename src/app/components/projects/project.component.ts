import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects = [
    {
      name: 'Proyecto 1',
      description: 'Descripción del proyecto 1',
      link: '#'
    },
    {
      name: 'Proyecto 2',
      description: 'Descripción del proyecto 2',
      link: '#'
    },
    {
      name: 'Proyecto 3',
      description: 'Descripción del proyecto 3',
      link: '#'
    }
  ];
}