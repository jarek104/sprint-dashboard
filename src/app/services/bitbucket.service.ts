import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Repo } from '../models/repo';

import { map } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class BitbucketService implements OnInit {

  BITBUCKET_URL = 'https://bitbucket.hylandqa.net';

  constructor(private _http: HttpClient) { }

  response: any;
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  getPRsFromRepo(repo: Repo): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer OTcwNjg2MTc2NTgyOuq3woQgGixAQ2LRYX7ZSzCFsD3K'
        })
      };
    return this._http.get<any>(`rest/api/1.0/projects/${repo.project}/repos/${repo.name}/pull-requests`, httpOptions);
  }
}
//
