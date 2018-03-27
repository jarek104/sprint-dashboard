import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project';

import { map } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


@Injectable()
export class ConfigurationService {

  private _projects: Observable<Project[]>;

  constructor(private _http: HttpClient) { }

  public getConfiguration(): Observable<Project[]> {
    this._projects = this._http.get<Project[]>('./assets/config.json');
    return this._projects;

  }

  private getProject(projectName: string): Observable<Project> {
    return this._projects.pipe(map(projects => projects.find(project => project.bitBucketName === projectName)));
  }

  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err.message);
}

}
