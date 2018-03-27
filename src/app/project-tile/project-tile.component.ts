import { Component, Input, OnChanges } from '@angular/core';
import { Project } from '../models/project';
import { BitbucketService } from '../services/bitbucket.service';
import { Observable } from 'rxjs/Observable';
import { IPullRequest, IBuildInfo } from '../models/interfaces';
import { JenkinsService } from '../services/jenkins.service';

@Component({
  selector: 'sd-project-tile',
  templateUrl: './project-tile.component.html',
  styleUrls: ['./project-tile.component.scss']
})
export class ProjectTileComponent implements OnChanges {

  @Input() project: Project;

  pullRequests$: Observable<IPullRequest[]>;
  buildInfo$: Observable<IBuildInfo>;

  constructor(private _prService: BitbucketService, private _jenkinsService: JenkinsService) { }

  ngOnChanges(): void {
    if (this.project) {
      this.pullRequests$ = this._prService.getPullRequests(this.project);
      this.buildInfo$ = this._jenkinsService.getLatestBuildInfo(this.project);
    }
  }

}
