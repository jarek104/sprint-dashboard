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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer a57cfd524fd558b1f6a9c4113fbed622'
    })
  };
  getLatestBuildInfo(project: Project): Observable<IBuildInfo> {
    return this._http.get<any>
    (`job/${project.jenkinsProject}/job/${project.bitBucketName}/job/${project.jenkinsBranchName}/lastBuild/api/json`)
    .pipe(map(response => {
        return {
          result: response.result,
          duration: response.duration,
          building: response.building,
          timestamp: response.timestamp
        } as IBuildInfo;

      })

    );
  }

}

