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


  getPRsFromRepo(repo: Repo): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer OTcwNjg2MTc2NTgyOuq3woQgGixAQ2LRYX7ZSzCFsD3K'
        })
      };
    return this._http.get<any>(`rest/api/1.0/projects/${repo.project}/repos/${repo.name}/pull-requests`, httpOptions).pipe(
      map(res => {

        const myValues = res.values.map(
          resp =>  resp = resp.id
        );
        return myValues;
      })
    );
  }
}
//
