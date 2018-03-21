import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from './services/configuration.service';
import { IRepo } from './models/repo';

@Component({
  selector: 'sd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sd';
  topLeft: IRepo;
  topRight: IRepo;
  topMiddle: string;

  bottomLeft: IRepo;
  bottomRight: IRepo;

  repos: IRepo[] = [];

  constructor(private config: ConfigurationService) {

  }

  ngOnInit(): void {
    this.config.getConfiguration()
      .subscribe(myRepo => {
          this.repos = myRepo;
          console.log(myRepo);
      },
          error => console.log(error));
  }

}
