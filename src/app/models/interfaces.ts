export interface IPullRequest {
  id: number;
  title: string;
  updatedDate?: number;
  reviewersApproved?: number;
  mergeResult?: string;
  link: string;
  lastCommit: ICommit;
}

export interface IUser {
  name: string;
  displayName?: string;
}

export interface ICommit {
  id: number;
  message: string;
  createdDate?: number;
  createdBy?: IUser;
  buildStatus: string;
}

export interface ICommitStatus {
  id: number;
  status: 'successful' | 'inProgress' | 'failed';
}
