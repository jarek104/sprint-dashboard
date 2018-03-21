import { Component, OnInit, Input } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';
import { IRepo } from '../models/repo';

@Component({
  selector: 'sd-repo-tile',
  templateUrl: './repo-tile.component.html',
  styleUrls: ['./repo-tile.component.scss']
})
export class RepoTileComponent {

  @Input() repoName: string;


  constructor() { }

}
