import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  skills = ['AWS', 'C#', '.NET 9', 'Python', 'Django', 'Django Rest Framework', 'FastAPI', 'Serverless Lambdas', 'MSSQL', 'MySQL', 'PostgreSQL', 'MongoDB'];
}