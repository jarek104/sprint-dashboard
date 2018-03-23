import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Repo } from '../models/repo';

import { map } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { IPullRequest, ICommit } from '../models/interfaces';

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
    (`rest/api/1.0/projects/${repo.project}/repos/${repo.name}/pull-requests`, this.httpOptions).pipe(
      map(res => {
        const myValues = res.values.map(response => {
          const reviewersCount = this.parseReviewers(response.reviewers);
            return {
              id: response.id,
              title: response.title,
              updateDate: response.updatedDate,
              mergeResults: response.properties.mergeResult.outcome,
              link: response.links.self[0].href,
              lastCommitId: response.fromRef.latestCommit,
              repo: response.fromRef.repository.slug,
              project: response.fromRef.repository.project.key,
              reviewersApproved: reviewersCount
            };
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

  getCommit(pr: IPullRequest): Observable<ICommit> {
     return this._http.get<any>(`rest/api/1.0/projects/${pr.project}/repos/${pr.repo}/commits/${pr.lastCommitId}`, this.httpOptions).pipe(
      map(response => {
        return {
          id: response.id,
          author: response.author.displayName,
          message: response.message
        } as ICommit;
      }

    )
    );

  }
}
