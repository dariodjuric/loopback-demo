import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'GitHubApi',
  connector: 'rest',
  options: {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'User-Agent': 'LoopBack',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: 'https://api.github.com/repos/{repositoryOwner}/{repositoryName}/issues/{issueNumber}',
      },
      functions: {
        getIssue: ['repositoryOwner', 'repositoryName', 'issueNumber'],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class GitHubApiDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  constructor(
    @inject('datasources.config.GitHubApi', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
