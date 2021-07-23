import {getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {CacheRequest, Issue} from '../models';
import {inject} from '@loopback/core';
import {GitHubApi} from '../services';

export class CacheController {
  constructor(
    @inject('services.GitHubApi')
    protected gitHubApiService: GitHubApi,
  ) {}

  @post('/cache-requests', {
    responses: {
      '200': {
        content: {
          'application/json': {schema: getModelSchemaRef(Issue)},
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CacheRequest),
        },
      },
    })
    cacheRequest: CacheRequest,
  ): Promise<Issue> {
    const issueResponse = await this.gitHubApiService.getIssue(
      cacheRequest.owner,
      cacheRequest.repo,
      cacheRequest.issueNumber,
    );

    const issueEntity = new Issue();
    issueEntity.issueNumber = issueResponse.number;
    issueEntity.title = issueResponse.title;

    return issueEntity;
  }
}
