import { Component, Input, OnChanges } from '@angular/core';
import { BitbucketService } from '../services/bitbucket.service';
import { IPullRequest } from '../models/interfaces';
import { ICommit } from '../models/interfaces';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sd-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.scss']
})
export class CommitComponent implements OnChanges {

  @Input() pr: IPullRequest;
  commit$: Observable<ICommit>;

  constructor(private _bbService: BitbucketService) { }


  ngOnChanges(): void {
    this.commit$ = this._bbService.getCommit(this.pr);

  }

}
