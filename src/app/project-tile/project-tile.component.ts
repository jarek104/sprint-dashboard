import { Component, Input, OnChanges } from '@angular/core';
import { Project } from '../models/project';
import { BitbucketService } from '../services/bitbucket.service';
import { Observable } from 'rxjs/Observable';
import { IPullRequest, IBuildInfo } from '../models/interfaces';
import { JenkinsService } from '../services/jenkins.service';

import 'rxjs/add/observable/of';
import { map } from 'rxjs/operators';

@Component({
  selector: 'sd-project-tile',
  templateUrl: './project-tile.component.html',
  styleUrls: ['./project-tile.component.scss']
})
export class ProjectTileComponent implements OnChanges {

  @Input() project: Project;

  pullRequests$: Observable<IPullRequest[]>;
  buildInfo$: Observable<IBuildInfo>;
  userAvatarURL: Observable<string>;

  constructor(private _prService: BitbucketService, private _jenkinsService: JenkinsService) { }

  ngOnChanges(): void {
    this.project.jenkinsBranchDisplayName = decodeURIComponent(decodeURIComponent(this.project.jenkinsBranchName));
    if (this.project) {
      this.pullRequests$ = this._prService.getPullRequests(this.project);
      this.buildInfo$ = this._jenkinsService.getLatestBuildInfo(this.project).pipe(
        map(buildInfo => {
          return {
            ...buildInfo,
            commitAuthorAbsoluteURL: buildInfo.commitAuthorAbsoluteURL.replace('https://csp.jenkins.hylandqa.net/user/',
            'https://jira.hylandqa.net/secure/useravatar?ownerId=').replace('onbase%5C', '')
          };
        })
      );
      this.getUserAvatar();
    }
  }
  getUserAvatar() {
    let url = '';

    this.buildInfo$.map(value => {url = value.commitAuthorAbsoluteURL;
      console.log('URL: ' + url);
      url = url.replace('https://csp.jenkins.hylandqa.net/user/',
        'https://jira.hylandqa.net/secure/useravatar?ownerId=');
    });

  }

}
