import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Repo } from '../models/repo';

import { map } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


@Injectable()
export class ConfigurationService {

  private _repos: Observable<Repo[]>;

  constructor(private _http: HttpClient) { }

  public getConfiguration(): Observable<Repo[]> {
    this._repos = this._http.get<Repo[]>('./assets/config.json');
    return this._repos;

  }

  private getProject(repoName: string): Observable<Repo> {
    return this._repos.pipe(map(repos => repos.find(repo => repo.name === repoName)));
  }

  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err.message);
}

}
