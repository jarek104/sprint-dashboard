import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Repo } from '../models/repo';

import { map } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { IBuildStatus } from '../models/interfaces';

@Injectable()
export class JenkinsService {

  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer a57cfd524fd558b1f6a9c4113fbed622'
    })
  };
  getLatestBuildStatus(repo: Repo): Observable<IBuildStatus> {
    const buildStatus = this._http.get<any>(`job/ngWeb/job/${repo.name}/job/develop/lastBuild/api/json`).pipe(
      map(results => results.result)
    );
  return buildStatus;
  }

}

