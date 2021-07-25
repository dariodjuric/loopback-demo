import {get, getModelSchemaRef, HttpErrors, param} from '@loopback/rest';
import {CachedIssue} from '../models';
import {inject} from '@loopback/core';
import {GitHubApi} from '../services';
import {repository} from '@loopback/repository';
import {IssueRepository} from '../repositories';

export class IssueController {
  constructor(
    @inject('services.GitHubApi')
    protected gitHubApiService: GitHubApi,
    @repository(IssueRepository)
    public issueRepository: IssueRepository,
  ) {}

  @get('/issues/{repositoryOwner}/{repositoryName}/{issueNumber}', {
    responses: {
      '200': {
        content: {
          'application/json': {
            schema: getModelSchemaRef(CachedIssue),
          },
        },
      },
    },
  })
  async getIssue(
    @param.path.string('repositoryOwner') repositoryOwner: string,
    @param.path.string('repositoryName') repositoryName: string,
    @param.path.number('issueNumber') issueNumber: number,
  ): Promise<CachedIssue> {
    try {
      // This method will return saved entity if exists, otherwise it will raise ENTITY_NOT_FOUND error
      return await this.issueRepository.findById(issueNumber);
    } catch (e) {
      if (e.code === 'ENTITY_NOT_FOUND') {
        const issueResponse = await this.gitHubApiService.getIssue(
          repositoryOwner,
          repositoryName,
          issueNumber,
        );

        const newIssueEntity = new CachedIssue();
        newIssueEntity.issueNumber = issueResponse.number;
        newIssueEntity.title = issueResponse.title;
        newIssueEntity.reporter = issueResponse.user?.login;
        newIssueEntity.state = issueResponse.state;
        newIssueEntity.repositoryName = repositoryName;
        newIssueEntity.repositoryOwner = repositoryOwner;

        return this.issueRepository.create(newIssueEntity);
      } else {
        throw new HttpErrors.InternalServerError(
          `Error while looking up issue #${issueNumber} in the database`,
        );
      }
    }
  }
}
