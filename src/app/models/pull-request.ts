export interface IPullRequest {
  id: number;
  title: string;
  // createdDate?: number;
  updatedDate?: number;
  reviewersApproved?: number;
  mergeResult?: string;
  // link?: string;
  // status?: string;
}

export interface IUser {
  name: string;
  displayName?: string;
}

