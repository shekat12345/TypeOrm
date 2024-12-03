import {DataSource, DataSourceOptions} from 'typeorm';
import {ChatList} from './Table_Entities/ChatList';
import {File} from './Table_Entities/Files';
import {Message} from './Table_Entities/Messages';
import {RepositoryFactory} from './Factory';
const config = {
  type: 'react-native',
  database: 'ChatDb.db',
  entities: [ChatList, Message, File],
  synchronize: true,
  logging: true,
};

export const DataSourceDb = new DataSource({
  type: 'react-native',
  database: 'heheheh.db',
  entities: [ChatList, Message, File],
  synchronize: true,
  logging: true,
});

export async function addChatListWithMessages1() {
  await DataSourceDb.transaction(async transactionManager => {
    const chatList = new ChatList();
    chatList.conversationId = Math.random() * 100; // Example conversation ID
    chatList.title = 'Team Chat';
    chatList.lastMessage = 'Welcome to the team!';
    chatList.lastChange = new Date().toISOString();
    chatList.profileImagePath = '/images/team.jpg';

    const message1 = new Message();
    message1.conversationId = 12345;
    message1.senderId = 1;
    message1.messageTime = new Date().toISOString();
    message1.text = 'Hello, Team!';
    message1.senderName = 'Alice';

    const message2 = new Message();
    message2.conversationId = 12345;
    message2.senderId = 2;
    message2.messageTime = new Date().toISOString();
    message2.text = 'Hi, Alice!';
    message2.senderName = 'Bob';

    await transactionManager.save(chatList);
    message1.chat = chatList;
    message2.chat = chatList;

    await transactionManager.save([message1, message2]);
  });

  console.log('ChatList with messages added successfully in one transaction.');
}
const repositoryFactory = new RepositoryFactory(DataSourceDb);
export const createChatWithMessagesWithTransAction12s = async () => {
  try {
    await DataSourceDb.transaction(async transactionalEntityManager => {
      const chatLisst = repositoryFactory.createRepository(ChatList);
      const Mess = repositoryFactory.createRepository(Message);

      const newChat = await chatLisst.create({
        conversationId: Math.random() * 100,
        title: 'Team Chat',
        lastMessage: 'Welcome to the team chat!',
        lastChange: new Date().toISOString(),
        profileImagePath: '/images/team_chat.png',
      });

      const messages = [
        {
          conversationId: Math.random(),
          senderId: 1,
          contactMapped: true,
          messageTime: new Date().toISOString(),
          text: 'Hello everyone!',
          seen: true,
          senderName: 'Alice',
          selfSended: false,
          status: 'sent',
          sending: 'done',
          chat: newChat,
        },
        {
          conversationId: Math.random(),
          senderId: 2,
          contactMapped: true,
          messageTime: new Date().toISOString(),
          text: 'Hi Alice!',
          seen: true,
          senderName: 'Bob',
          selfSended: false,
          status: 'sent',
          sending: 'done',
          chat: newChat,
        },
      ];

      for (const messageData of messages) {
        // alert ("heheheh")
        await Mess.create(messageData);
      }

      console.log('Chat created with messages:', newChat);
    });
  } catch (error) {
    console.error('Error creating chat with messages:', error);
  }
};
