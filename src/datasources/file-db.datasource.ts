import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'FileDb',
  connector: 'memory',
  localStorage: '',
  file: './data/db.json', // Make sure the file exists!
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class FileDbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'FileDb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.FileDb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
