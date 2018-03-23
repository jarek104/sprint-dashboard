import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from './services/configuration.service';
import { Repo } from './models/repo';

@Component({
  selector: 'sd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  topLeft: Repo;
  topRight: Repo;
  topMiddle: Repo;

  bottomLeft: Repo;
  bottomRight: Repo;

  constructor(private _config: ConfigurationService) {}

  ngOnInit(): void {
    this._config.getConfiguration()
      .subscribe(repos => {
          this.topMiddle = repos[0];
          this.bottomLeft = repos[1];
          this.bottomRight = repos[2];
      },
          error => console.log(error));
  }

}
