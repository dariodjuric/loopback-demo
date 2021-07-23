import {Model, model, property} from '@loopback/repository';

@model()
export class CacheRequest extends Model {
  @property({
    type: 'number',
    required: true,
  })
  issueId: number;

  @property({
    type: 'string',
    required: true,
  })
  owner: string;

  @property({
    type: 'string',
    required: true,
  })
  repo: string;


  constructor(data?: Partial<CacheRequest>) {
    super(data);
  }
}

export interface CacheRequestRelations {
  // describe navigational properties here
}

export type CacheRequestWithRelations = CacheRequest & CacheRequestRelations;
