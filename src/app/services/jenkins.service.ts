import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project';

import { map } from 'rxjs/operators';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { IBuildInfo } from '../models/interfaces';

@Injectable()
export class JenkinsService {

  constructor(private _http: HttpClient) { }

  getLatestBuildInfo(project: Project): Observable<IBuildInfo> {
    let pathBuilder = project.jenkinsJobLvl1 ? project.jenkinsJobLvl1 : '';
    pathBuilder = pathBuilder.concat(project.jenkinsJobLvl2 ? '/job/' + project.jenkinsJobLvl2 : '');
    pathBuilder = pathBuilder.concat(project.jenkinsJobLvl3 ? '/job/' + project.jenkinsJobLvl3 : '');


    let port = 0;

    switch (project.jenkinsProgram) {
      case 'csp':
        port = 3200;
        break;
      case 'cloud':
        port = 3201;
        break;
      case 'ag':
        port = 3202;
        break;
      case 'healthcarecs':
        port = 3203;
        break;
      case 'insurance':
        port = 3204;
        break;

      default:
        break;
    }

    return this._http.get<any>
    (`http://dev-032450:${port}/job/${pathBuilder}/lastBuild/api/json`)
    .pipe(map(response => {
      const result = this.getResult(response);
      const author = this.getAuthor(response.changeSets);
      const msg = this.getMessage(response.changeSets);
      const authorName = this.getUsernameFromEmail(response.changeSets);
        return {
          result: result,
          duration: response.duration,
          building: response.building,
          timestamp: response.timestamp,
          buildNumber: response.number,
          commitAuthor: author,
          commitAuthorAvatarURL: 'https://jira.hylandqa.net/secure/useravatar?ownerId=' + authorName.replace('onbase%5C', ''),
          commitMessage: msg
        } as IBuildInfo;

      })

    );
  }
  getResult(result: any): any {
    if (result.result) {
      console.log(result.result);
      return result.result;
    } else {return ''; }
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
  getUsernameFromEmail(changeSets: any): string {
    if (changeSets.length > 0) {
      const user = changeSets[0].items[0].author.absoluteUrl.replace('https://csp.jenkins.hylandqa.net/user/', '');

      if (user.indexOf('.') === -1) {
        return user;
      } else if (user.indexOf('.') > -1) {
        const emailParts = changeSets[0].items[0].authorEmail.split('@');
        const emailName = emailParts.length === 2 ? emailParts[0] : null;
        const nameParts = emailName.toLowerCase().split('.');
        return nameParts[0][0] + nameParts[1];
      }
    } else { return ''; }
  }
}

