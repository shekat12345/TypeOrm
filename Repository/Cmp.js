import {Button, Text, View} from 'react-native';
import {ConnectorP} from './Services/Dbconenctor.ts';
import {getChats} from './Services/getChats.ts';
import {useEffect, useState} from 'react';
import {useDatabase} from './Services/getData.ts';
import {createChatWithMessagesWithTransActions} from '../ChatOrm/Database22.js';
import {
  DataSourceDb,
  createChatWithMessagesWithTransAction12s,
} from './database.js';
import {createChatWithMessagesWithTransAction1s} from './Services/AddnewChat.ts';
import {ChatList} from './Table_Entities/ChatList.ts';
import {Message} from './Table_Entities/Messages.ts';
import {chatRepository, messageRepository} from './Factory.ts';
import {filter, map, of} from 'rxjs';
import {userStream} from './../rxjs/index.ts';
import { useSelector } from 'react-redux';
const SimplePipeLine = async setState => {
  try {
    const observable = of(1, 2, 3, 4, 5);
    const insert = [
      filter(value => value % 2 === 0), // Filter even numbers
      map(value => value * 10), // Multiply by 10,
      map(value => {
        alert('helllo');
        return value + 5;
      }),
    ];
    observable
      .pipe(
        //  filter(value => value % 2 === 0), // Filter even numbers
        //  map(value => value * 10), // Multiply by 10,
        //  map(value => {
        //   alert ("helllo")
        //   return value + 5
        //  })
        ...insert,
      )
      .subscribe({
        next: result => {
          setState(s => [...s, result]);
          alert(result); // Alerts the result or fallback message
        },
        error: err => {
          console.error('Error:', err); // This won't be called because catchError is handling it
        },
        complete: () => {
          console.log('Observable complete');
        },
      });
  } catch (error) {
    alert(error);
  }
};
const TestPipeline = async (setterMethod) => {
  userStream.subscribe({
    next: e => {setterMethod(e)},
    error: err => alert(`got err `),
    complete: () => alert('Stream completed'),
  });
};
export const Test = () => {
  // const {data} = useDatabase('ChatList');
  const [state, setState] = useState([]);
  const errors = useSelector((s)=>s.errors)
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
            alert(error);
          }
        }}
        title="Test for actions"
      />
      <Button
        title="Get NEw Thingsss"
        onPress={async () => {
          // getChats()
          // const chatListRepository = DataSourceDb.getRepository(Message);

          let datta = await chatRepository.findAll();
          // messageRepository.create()
          alert(JSON.stringify(datta));
        }}
      />
      {/* <Button
        onPress={() => {
          // alert('rxjs');
          // SimplePipeLine(setState);
          TestPipeline(setState);
        }}
        title="RXTest"
      /> */}
      <Text>{JSON.stringify(state)}</Text>
      {/* <Text>{JSON.stringify(data)}</Text> */}
      <Text>errors{JSON.stringify(errors)}</Text>
    </View>
  );
};
