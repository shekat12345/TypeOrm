import {Button, Text, View} from 'react-native';
import {ConnectorP} from './Services/Dbconenctor.ts';
import {getChats} from './Services/getChats.ts';
import {useEffect} from 'react';
import {useDatabase} from './Services/getData.ts'
import {createChatWithMessagesWithTransActions} from '../ChatOrm/Database22.js';
import { DataSourceDb, createChatWithMessagesWithTransAction12s } from './database.js';
import {createChatWithMessagesWithTransAction1s} from './Services/AddnewChat.ts'
import { ChatList } from './Table_Entities/ChatList.ts';
import { Message } from './Table_Entities/Messages.ts';
import { chatRepository, messageRepository } from './Factory.ts';
export const Test = () => {
  const {data} = useDatabase('ChatList')
  useEffect(() => {
   
    // ConnectorP.RunDb();
    // return () => {
    //   ConnectorP.DestroyDb();
    // };
  }, []);
  return (
    <View>
      <Button
        onPress={() => {
          try {
            ConnectorP.DestroyDb();
            alert('done');
          } catch (error) {
            alert(error);
          }
        }}
        title="Tets for rconnections"
      />
      <Button
        onPress={() => {
          try {
            createChatWithMessagesWithTransAction1s();
            // messageRepository.create( {
            //   conversationId: Math.round(Math.random()),
            //   senderId: 1,
            //   contactMapped: true,
            //   messageTime: new Date().toISOString(),
            //   text: 'Hello everyone####################################!################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################################',
            //   seen: true,
            //   senderName: 'Alice',
            //   selfSended: false,
            //   status: 'sent',
            //   sending: 'done',
            //   // chat: newChat,
            // }).then(()=>{alert ("hello")})
            // alert('done');
          } catch (error) {
            alert (error)
          }          
        }}
        title="Test for actions"
      />
      <Button title="Get NEw Thingsss" onPress={async()=>{
        // getChats()
        // const chatListRepository = DataSourceDb.getRepository(Message);
        
        let datta =await chatRepository.findAll()
        // messageRepository.create()
        alert (JSON.stringify(datta))
        }}/>
        <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};
