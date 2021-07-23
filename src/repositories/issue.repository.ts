import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FileDbDataSource} from '../datasources';
import {Issue, IssueRelations} from '../models';

export class IssueRepository extends DefaultCrudRepository<
  Issue,
  typeof Issue.prototype.issueNumber,
  IssueRelations
> {
  constructor(
    @inject('datasources.FileDb') dataSource: FileDbDataSource,
  ) {
    super(Issue, dataSource);
  }
}
