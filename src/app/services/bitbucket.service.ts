import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Repo } from '../models/repo';

import { map } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { IPullRequest } from '../models/pull-request';

@Injectable()
export class BitbucketService {

  BITBUCKET_URL = 'https://bitbucket.hylandqa.net';

  constructor(private _http: HttpClient) { }

  prs: any[];

  getPRsFromRepo(repo: Repo): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer OTcwNjg2MTc2NTgyOuq3woQgGixAQ2LRYX7ZSzCFsD3K'
        })
      };
    return this._http.get<any>(`rest/api/1.0/projects/${repo.project}/repos/${repo.name}/pull-requests`, httpOptions).pipe(
      map(res => {

        const myValues = res.values.map(response => {
            const rObj = {};
            rObj[response.id] = response.id;
            rObj[response.title] = response.title;
            rObj[response.updatedDate] = response.updatedDate;
            // rObj[response.mergeResult] = response.mergeResult;
            return rObj;
          }
        );
        return myValues;
       }

      )

    );
  }
}
