import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Repo } from '../models/repo';

import { map } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { IPullRequest } from '../models/interfaces';

@Injectable()
export class BitbucketService {
  BITBUCKET_URL = 'https://bitbucket.hylandqa.net';

  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer OTcwNjg2MTc2NTgyOuq3woQgGixAQ2LRYX7ZSzCFsD3K'
    })
  };

  getPullRequests(repo: Repo): Observable<IPullRequest[]> {
    return this._http.get<any>
    (`rest/api/1.0/projects/${repo.project}/repos/${repo.name}/pull-requests?state=merged`, this.httpOptions).pipe(
      map(res => {
        const myValues = res.values.map(response => {
            const rObj = {};
            rObj['id'] = response.id;
            rObj['title'] = response.title;
            rObj['updateDate'] = response.updatedDate;
            rObj['reviewersApproved'] = this.parseReviewers(response.reviewers);
            // rObj['mergeResult'] = response.properties.mergeResult.outcome || '';
            rObj['link'] = response.links.self[0].href;
            return rObj;
          }
        );
        return myValues;
       }

      )
    );
  }

  parseReviewers(reviewers: any): number {
    const response = reviewers.filter(revs => revs.approved === true);
    return response.length;
  }

  getCommit(commitId: string, repo: Repo): Observable<string> {
     return this._http.get<any>(`rest/api/1.0/projects/${repo.project}/repos/${repo.name}/pull-requests`, this.httpOptions).pipe(
      map(response => response = response.message)
    );

  }
}
