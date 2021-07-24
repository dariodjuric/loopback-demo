import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {GitHubApiDataSource} from '../datasources';

export class GitHubIssueResponse {
  'number': number;
  title: string;
  user: {login: string};
  state: string;
}

export interface GitHubApi {
  getIssue(
    repositoryOwner: string,
    repositoryName: string,
    issueNumber: number,
  ): Promise<GitHubIssueResponse>;
}

export class GitHubApiProvider implements Provider<GitHubApi> {
  constructor(
    // GitHubApi must match the name property in the datasource json file
    @inject('datasources.GitHubApi')
    protected dataSource: GitHubApiDataSource = new GitHubApiDataSource(),
  ) {}

  value(): Promise<GitHubApi> {
    return getService(this.dataSource);
  }
}
