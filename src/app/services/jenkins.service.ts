import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project';

import { map } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { IBuildInfo } from '../models/interfaces';

@Injectable()
export class JenkinsService {

  constructor(private _http: HttpClient) { }

  getLatestBuildInfo(project: Project): Observable<IBuildInfo> {
    return this._http.get<any>
    (`job/${project.jenkinsProject}/job/${project.bitBucketName}/job/${project.jenkinsBranchName}/lastBuild/api/json`)
    .pipe(map(response => {
      const author = this.getAuthor(response.changeSets);
      const msg = this.getMessage(response.changeSets);
      const authorURL = this.getAuthorUrl(response.changeSets);
        return {
          result: response.result,
          duration: response.duration,
          building: response.building,
          timestamp: response.timestamp,
          buildNumber: response.number,
          commitAuthor: author,
          commitAuthorAbsoluteURL: authorURL,
          commitMessage: msg
        } as IBuildInfo;

      })

    );
  }
  getAuthor(changeSets: any): any {
    if (changeSets.length > 0) {
      return changeSets[0].items[0].author.fullName;
    } else {return ''; }
  }
  getMessage(changeSets: any): any {
    if (changeSets.length > 0) {
      return changeSets[0].items[0].msg;
    } else {return ''; }
  }
  getAuthorUrl(changeSets: any): string {
    if (changeSets.length > 0) {
      return changeSets[0].items[0].author.absoluteUrl;
    } else {return ''; }
  }
}

