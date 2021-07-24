import {Entity, model, property} from '@loopback/repository';

@model()
export class Issue extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  issueNumber: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  reporter: string;

  @property({
    type: 'string',
    required: true,
  })
  state: string;

  constructor(data?: Partial<Issue>) {
    super(data);
  }
}

export interface IssueRelations {
  // describe navigational properties here
}

export type IssueWithRelations = Issue & IssueRelations;
