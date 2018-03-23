export interface IPullRequest {
  id: number;
  title: string;
  updateDate?: number;
  reviewersApproved?: number;
  mergeResult?: string;
  link: string;
  lastCommitId: string;
  repo?: string;
  project?: string;
}

export interface IUser {
  name: string;
  displayName?: string;
}

export interface ICommit {
  id: string;
  author: string;
  message: string;
  createdDate?: number;
  createdBy?: IUser;
}

export interface ICommitStatus {
  commitId: number;
  status: 'successful' | 'inProgress' | 'failed';
}
