import {repositoryFactory} from '../Factory';
import {ChatList} from '../Table_Entities/ChatList';
import { DataSourceDb } from '../database';

export const getChats = async () => {
  try {
    // const chatRepository = repositoryFactory.createRepository(ChatList);
    const chatLisst = DataSourceDb.getRepository(ChatList)
    const ddd = await chatLisst.find()
    alert (JSON.stringify(ddd))
    
  } catch (error) {
    alert(error);
  }
};
