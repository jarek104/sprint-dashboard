import { Component, Input, OnChanges } from '@angular/core';
import { Repo } from '../models/repo';
import { BitbucketService } from '../services/bitbucket.service';
import { Observable } from 'rxjs/Observable';
import { IPullRequest, IBuildStatus } from '../models/interfaces';
import { JenkinsService } from '../services/jenkins.service';

@Component({
  selector: 'sd-repo-tile',
  templateUrl: './repo-tile.component.html',
  styleUrls: ['./repo-tile.component.scss']
})
export class RepoTileComponent implements OnChanges {

  @Input() repo: Repo;

  pullRequests$: Observable<IPullRequest[]>;
  buildStatus$: Observable<IBuildStatus>;

  constructor(private _prService: BitbucketService, private _jenkinsService: JenkinsService) { }

  ngOnChanges(): void {
    if (this.repo) {
      this.pullRequests$ = this._prService.getPullRequests(this.repo);
      this.buildStatus$ = this._jenkinsService.getLatestBuildStatus(this.repo);
    }
  }

}
