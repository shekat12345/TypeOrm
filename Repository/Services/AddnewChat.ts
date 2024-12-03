import {
  RepositoryFactory,
  chatRepository,
  messageRepository,
  repositoryFactory,
} from '../Factory';
import {ChatList} from '../Table_Entities/ChatList';
import {Message} from '../Table_Entities/Messages';
import {DataSourceDb} from '../database';

export const createChatWithMessagesWithTransAction1s = async () => {
  try {
    await DataSourceDb.transaction(async transactionalEntityManager => {
      const newChat = await chatRepository.create({
        conversationId: Math.random() * 100,
        title: 'Team Chat',
        lastMessage: 'Welcome to the team chat!',
        lastChange: new Date().toISOString(),
        profileImagePath: '/images/team_chat.png',
      });
      // const savedChat = await chatLisst.save(newChat);

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
        await messageRepository.create(messageData);
      }

      console.log('Chat created with messages:', newChat);
    });
  } catch (error) {
    console.error('Error creating chat with messages:', error);
  }
};
