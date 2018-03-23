import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CommitService {

  constructor(private _http: HttpClient) { }

}
