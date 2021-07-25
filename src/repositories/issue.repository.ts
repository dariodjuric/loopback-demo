import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FileDbDataSource} from '../datasources';
import {CachedIssue, CachedIssueRelations} from '../models';

export class IssueRepository extends DefaultCrudRepository<
  CachedIssue,
  typeof CachedIssue.prototype.issueNumber,
  CachedIssueRelations
> {
  constructor(@inject('datasources.FileDb') dataSource: FileDbDataSource) {
    super(CachedIssue, dataSource);
  }
}
