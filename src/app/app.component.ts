import { Component } from '@angular/core';
import { Project } from './models/project';
import { CONFIGURATIONS } from '../assets/configs';

@Component({
  selector: 'sd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  projects: Project[] = CONFIGURATIONS;

  constructor() {}


}
