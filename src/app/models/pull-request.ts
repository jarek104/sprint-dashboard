export interface IPullRequestResponse {
  size: number;
  limit: number;
  isLastPage: boolean;
  values: IPullRequests[];
  start: number;

}
export interface IPullRequests {
  size: number;
  limit: number;
  isLastPage: boolean;
  values: string[];
  start: number;

}
// id: string;
//   title: string;
//   state: string;
//   createdDate: number;
//   updatedDate: number;
