import {DataSource} from 'typeorm';
import {Chat} from './entities/Chat';
import {Message} from './entities/Message';
import {File} from './entities/File';

export const AppDataSourceChat = new DataSource({
  type: 'react-native',
  database: 'app.db',
  entities: [Chat, Message, File],
  synchronize: true, // Automatically sync schema, avoid in production
  logging: true,
});

export const RunDb = () => {
  AppDataSourceChat.initialize()
    .then(() => console.log('Database initialized!'))
    .catch(error =>
      console.error('Error during Data Source initialization:', error),
    );
};
export const destroyDb=()=>{
    AppDataSourceChat.destroy().then(()=>{
        console.log("dataABase succesfully destroyed !")
    })
}