export interface IPullRequest {
  title: string;
  state?: string;
  createdDate?: number;
  updatedDate?: number;
  mergeResult?: string;
  link?: string;
  status?: string;
}

export interface IUser {
  name: string;
  displayName?: string;
}

