import { Component, Input, OnChanges } from '@angular/core';
import { Project } from '../models/project';
import { BitbucketService } from '../services/bitbucket.service';
import { Observable } from 'rxjs/Observable';
import { IPullRequest, IBuildInfo } from '../models/interfaces';
import { JenkinsService } from '../services/jenkins.service';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/startWith';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'sd-project-tile',
  templateUrl: './project-tile.component.html',
  styleUrls: ['./project-tile.component.scss']
})
export class ProjectTileComponent implements OnChanges {

  @Input() project: Project;

  pullRequests$: Observable<IPullRequest[]>;
  buildInfo$: BehaviorSubject<IBuildInfo> = new BehaviorSubject<IBuildInfo>(undefined);
  userAvatarURL: Observable<string>;


  constructor(private _prService: BitbucketService, private _jenkinsService: JenkinsService) { }

  ngOnChanges(): void {
    if (this.project) {
      this.project.jenkinsBranchDisplayName = decodeURIComponent(decodeURIComponent(this.project.jenkinsBranchName));
      this.pullRequests$ = this._prService.getPullRequests(this.project);
      Observable.interval(10000).startWith(0).subscribe(() => {
        this._jenkinsService.getLatestBuildInfo(this.project).subscribe((buildInfo => {
          this.buildInfo$.next(buildInfo);
        }));
      });
    }
  }
  getTileBackground() {
    let tileBackgroundClass = '';
    this.buildInfo$.subscribe(value => {
      switch (value.result) {
        case 'SUCCESS': {
          tileBackgroundClass = 'background-color__success';
          break;
        }
        case 'FAILURE': {
          tileBackgroundClass = 'background-color__failed';
          break;
        }
        case '': {
          tileBackgroundClass = 'background-color__in-progress';
          break;
        }
      }
    });
    return tileBackgroundClass;
  }
  getLastPRBackground() {
    let tileBackgroundClass = '';
    this.buildInfo$.subscribe(value => {
      switch (value.result) {
        case 'SUCCESS': {
          tileBackgroundClass = 'background-color__success-lighter';
          break;
        }
        case 'FAILURE': {
          tileBackgroundClass = 'background-color__failed-lighter';
          break;
        }
        case '': {
          tileBackgroundClass = 'background-color__in-progress-lighter';
          break;
        }
      }
    });
    return tileBackgroundClass;
  }

}
