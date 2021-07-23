import {getModelSchemaRef, HttpErrors, post, requestBody} from '@loopback/rest';
import {CacheRequest, Issue} from '../models';
import {inject} from '@loopback/core';
import {GitHubApi} from '../services';
import {repository} from '@loopback/repository';
import {IssueRepository} from '../repositories';

export class CacheController {
  constructor(
    @inject('services.GitHubApi')
    protected gitHubApiService: GitHubApi,
    @repository(IssueRepository)
    public issueRepository: IssueRepository,
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
  async createCacheEntry(
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

    const newIssueEntity = new Issue();
    newIssueEntity.issueNumber = issueResponse.number;
    newIssueEntity.title = issueResponse.title;

    try {
      await this.issueRepository.findById(issueResponse.number);

      await this.issueRepository.replaceById(
        issueResponse.number,
        newIssueEntity,
      );
      return newIssueEntity;
    } catch (e) {
      if (e.code === 'ENTITY_NOT_FOUND') {
        return this.issueRepository.create(newIssueEntity);
      } else {
        throw new HttpErrors.InternalServerError(
          `Error while looking up issue #${issueResponse.number} in the database`,
        );
      }
    }
  }
}
