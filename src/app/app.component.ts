import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from './services/configuration.service';
import { Project } from './models/project';

@Component({
  selector: 'sd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  project1: Project;
  project2: Project;
  project3: Project;
  project4: Project;
  project5: Project;
  project6: Project;

  constructor(private _config: ConfigurationService) {}

  ngOnInit(): void {
    this._config.getConfiguration()
      .subscribe(projects => {
          this.project1 = projects[0];
          this.project2 = projects[1];
          this.project3 = projects[2];
          this.project4 = projects[3];
          this.project5 = projects[4];
          this.project6 = projects[5];
      },
          error => console.log(error));
  }

}
