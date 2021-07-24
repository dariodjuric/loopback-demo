import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {GitHubApiDataSource} from '../datasources';

/**
 * This class is used for representing the response from GitHub API. Only a subset of returned properties is used.
 */
export class GitHubIssueResponse {
  'number': number;
  title: string;
  user: {login: string};
  state: string;
}

/**
 * When other components want to use this service, they declare dependency on the following interface.
 */
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
