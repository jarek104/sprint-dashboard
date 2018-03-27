import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project';

import { map } from 'rxjs/operators';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { IPullRequest, ICommit, IBuildInfo } from '../models/interfaces';

@Injectable()
export class BitbucketService {

  constructor(private _http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Bearer OTcwNjg2MTc2NTgyOuq3woQgGixAQ2LRYX7ZSzCFsD3K'
    })
  };

  getPullRequests(project: Project): Observable<IPullRequest[]> {
    return this._http.get<any>
    (`rest/api/1.0/projects/${project.bitBucketProject}/repos/${project.bitBucketName}/pull-requests`, this.httpOptions).pipe(
      map(res => {
        const myValues = res.values.map(response => {
          const approved = this.parseReviewers(response.reviewers);
            return {
              id: response.id,
              title: response.title,
              updateDate: response.updatedDate,
              mergeResult: response.properties.mergeResult.outcome,
              link: response.links.self[0].href,
              lastCommitId: response.fromRef.latestCommit,
              repo: response.fromRef.repository.slug,
              project: response.fromRef.repository.project.key,
              isApproved: approved
            };
          }
        );
        return myValues;
       }
      )
    );
  }

  parseReviewers(reviewers: any): boolean {
    const response = reviewers.filter(revs => revs.approved === true);
    return response.length > 0;
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
  // getBuildStatus(pr: IPullRequest): Observable<IBuildStatus> {
  //   return this._http.get<any>(`rest/build-status/1.0/commits/stats/${pr.lastCommitId}`, this.httpOptions).pipe(
  //     map(response => {
  //       if (response.successful === 1) {
  //         return { status: 'SUCCESS' } as IBuildStatus;
  //       } else if (response.inProgress === 1) {
  //         return { status: 'In progress' } as IBuildStatus;
  //       } else if (response.failed === 1) {
  //         return { status: 'Failed' } as IBuildStatus;
  //       }
  //     })
  //   );
  // }
}
