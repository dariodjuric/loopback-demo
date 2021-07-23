import {getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {CacheRequest} from '../models';

export class CacheController {
  constructor() {}

  @post('/cache-requests', {
    responses: {
      '200': {
        content: {
          'application/json': {schema: getModelSchemaRef(CacheRequest)},
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
  ): Promise<CacheRequest> {
    return cacheRequest;
  }
}
