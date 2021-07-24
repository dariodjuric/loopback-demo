import {Model, model, property} from '@loopback/repository';

/**
 * This is a DTO used for our API.
 */
@model()
export class CacheRequest extends Model {
  @property({
    type: 'number',
    required: true,
  })
  issueNumber: number;

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
