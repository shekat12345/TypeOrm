import {DataSource} from 'typeorm';
import {DataSourceDb} from './../database';

class Connector {
  private dataSource: DataSource;
  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }
  RunDb = () => {
    this.dataSource
      .initialize()
      .then(() => console.log('Database initialized!'))
      .catch(error =>
        console.error('Error during Data Source initialization:', error),
      );
  };
  DestroyDb = (dataSource: DataSource) => {
    this.dataSource
      .destroy()
      .then(() => console.log('Database Destroyed!'))
      .catch(error =>
        console.error('Error during Data Source initialization:', error),
      );
  };
}
export const ConnectorP : Connector = new Connector(DataSourceDb);

// const RunDb = (dataSource: DataSource) => {
//   dataSource
//     .initialize()
//     .then(() => console.log('Database initialized!'))
//     .catch(error =>
//       console.error('Error during Data Source initialization:', error),
//     );
// };

// const DestroyDb = (dataSource: DataSource) => {
//   dataSource
//     .destroy()
//     .then(() => console.log('Database Destroyed!'))
//     .catch(error =>
//       console.error('Error during Data Source initialization:', error),
//     );
// };
