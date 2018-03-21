import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IRepo } from '../models/repo';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


@Injectable()
export class ConfigurationService {

  constructor(private _http: HttpClient) { }

  public getConfiguration(): Observable<IRepo[]> {
    return this._http.get<IRepo[]>('./assets/config.json')
      // .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    // console.error(err.message);
    return Observable.throw(err.message);
}

}
