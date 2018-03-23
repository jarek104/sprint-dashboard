import { Component, Input, OnChanges } from '@angular/core';
import { Repo } from '../models/repo';
import { BitbucketService } from '../services/bitbucket.service';
import { Observable } from 'rxjs/Observable';
import { IPullRequest } from '../models/interfaces';

@Component({
  selector: 'sd-repo-tile',
  templateUrl: './repo-tile.component.html',
  styleUrls: ['./repo-tile.component.scss']
})
export class RepoTileComponent implements OnChanges {

  @Input() repo: Repo;

  pullRequests$: Observable<IPullRequest[]>;

  constructor(private _prService: BitbucketService) { }

  ngOnChanges(): void {
    if (this.repo) {
      this.pullRequests$ = this._prService.getPullRequests(this.repo);
    }
  }

}
