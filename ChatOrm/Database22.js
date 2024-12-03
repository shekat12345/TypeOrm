import {DataSource} from 'typeorm';
import {Chat} from './entities/Chat';
import {Message} from './entities/Message';
import {File} from './entities/File';
import {RepositoryFactory} from './Repositry/RepositoryFactory';
export const AppDataSourceChat = new DataSource({
  type: 'react-native',
  database: 'app1212sdsd.db',
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
const repositoryFactory = new RepositoryFactory(AppDataSourceChat);
const chatRepository = repositoryFactory.createRepository(Chat);
const FileRepository = repositoryFactory.createRepository(File);
const messageRepository = repositoryFactory.createRepository(Message);

export const TestRepository = async () => {
  const chats = await chatRepository.findAll();
  alert(JSON.stringify(chats));
};

export const destroyDb = () => {
  AppDataSourceChat.destroy().then(() => {
    console.log('dataABase succesfully destroyed !');
  });
};
export const HelloTest1 = async () => {
  try {
    await AppDataSourceChat.transaction(async transactionalEntityManager => {
      const chatRepo = transactionalEntityManager.getRepository(Chat);
      const messageRepo = transactionalEntityManager.getRepository(Message);
      const fileRepo = transactionalEntityManager.getRepository(File);

      // Create a chat
      const chat = chatRepo.create({title: 'General Chat'});
      const savedChat = await chatRepo.save(chat);

      // Create a message for the chat
      const message = messageRepo.create({
        content: 'Hello, World!',
        chat: savedChat,
      });
      const savedMessage = await messageRepo.save(message);

      // Attach files to the chat and message
      const chatFile = fileRepo.create({url: 'chat_file.png', chat: savedChat});
      const messageFile = fileRepo.create({
        url: 'message_file.png',
        message: savedMessage,
      });

      await fileRepo.save([chatFile, messageFile]);
    });

    alert('done');
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
};
// export const addChatWithMessagesAndFilesInTransaction = async () => {

//   const queryRunner = AppDataSourceChat.createQueryRunner();

//   try {
//     // Start the transaction
//     alert ("hello")
//     await queryRunner.connect();
//     await queryRunner.startTransaction();

//     // Create repositories
//     const chatRepository = queryRunner.manager.getRepository(Chat);
//     const messageRepository = queryRunner.manager.getRepository(Message);
//     const fileRepository = queryRunner.manager.getRepository(File);

//     // Create a new Chat
//     const newChat = chatRepository.create({ title: "Transactional Chat" });
//     const savedChat = await chatRepository.save(newChat);

//     // Add Messages to the Chat
//     const messages = messageRepository.create([
//       { content: "Hello, Transaction!", chat: savedChat },
//       { content: "Ensuring atomicity!", chat: savedChat },
//     ]);
//     const savedMessages = await messageRepository.save(messages);

//     // Add Files to the Chat and a Message
//     const files = fileRepository.create([
//       { url: "chat_transaction_file.png", chat: savedChat },
//       { url: "message_transaction_file.png", message: savedMessages[0] },
//     ]);
//     const savedFiles = await fileRepository.save(files);

//     // Commit the transaction
//     await queryRunner.commitTransaction();

//     console.log("Transaction Completed:");
//     console.log("Chat:", savedChat);
//     console.log("Messages:", savedMessages);
//     console.log("Files:", savedFiles);
//   } catch (error) {
//     // Rollback the transaction on error
//     // alert ("hello")
//     console.error("Error during transaction:", error);
//     await queryRunner.rollbackTransaction();
//   } finally {
//     // Release the query runner
//     // alert ("hello")
//     await queryRunner.release();
//   }
// };
// const repositoryFactory = new RepositoryFactory(AppDataSource);

export const addChatWithMessagesAndFilesInTransaction = async () => {
  console.time('Transaction Time'); // Start measuring time
  const queryRunner = AppDataSourceChat.createQueryRunner();

  try {
    // Start the transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();

    // Create repositories using the RepositoryFactory, but with queryRunner's manager
    const chatRepository = repositoryFactory.createRepository(
      Chat,
      queryRunner.manager,
    );
    const messageRepository = repositoryFactory.createRepository(
      Message,
      queryRunner.manager,
    );
    const fileRepository = repositoryFactory.createRepository(
      File,
      queryRunner.manager,
    );

    // Create a new Chat
    const newChat = chatRepository.create({title: 'Transactional Chat'});
    const savedChat = await chatRepository.save(newChat);

    // Add Messages to the Chat
    const messages = messageRepository.create([
      {content: 'Hello, Transaction!', chat: savedChat},
      {content: 'Ensuring atomicity!', chat: savedChat},
      {content: 'Ensuring atomicity!', chat: savedChat},
      {content: 'Ensuring atomicity!', chat: savedChat},
      {content: 'Ensuring atomicity!', chat: savedChat},
      {content: 'Ensuring atomicity!', chat: savedChat},
    ]);
    const savedMessages = await messageRepository.save(messages);

    // Add Files to the Chat and a Message
    const files = fileRepository.create([
      {url: 'chat_transaction_file.png', chat: savedChat},
      {url: 'message_transaction_file.png', message: savedMessages[0]},
    ]);
    const savedFiles = await fileRepository.save(files);

    // Commit the transaction
    await queryRunner.commitTransaction();

    console.log('Transaction Completed:');
    console.log('Chat:', savedChat);
    console.log('Messages:', savedMessages);
    console.log('Files:', savedFiles);
    console.timeEnd(
      'Transaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction TimeTransaction Time',
    ); // End measuring time
  } catch (error) {
    // Rollback the transaction on error
    console.error('Error during transaction:', error);
    await queryRunner.rollbackTransaction();
  } finally {
    // Release the query runner

    await queryRunner.release();
    // alert('heheh');
  }
};

export const createChatWithMessages = async () => {
  const queryRunner = AppDataSourceChat.createQueryRunner();

  try {
    // Start a transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();

    // Create repositories for Chat and Message entities using query runner's manager
    const chatRepository = queryRunner.manager.getRepository(Chat);
    const messageRepository = queryRunner.manager.getRepository(Message);

    // Step 1: Create the Chat entity (Make sure it's a new entity, no existing `id`)
    const newChat = chatRepository.create({title: 'General Chat'});

    // Step 2: Create multiple messages and associate them with the chat
    const newMessages = messageRepository.create([
      {content: 'Hello, World!', chat: newChat},
      {content: 'How are you?', chat: newChat},
      {content: 'Good morning!', chat: newChat},
    ]);

    // Step 3: Save the Chat and Messages together
    // First, save the chat (this will insert the new chat into the database)
    const savedChat = await chatRepository.save(newChat);

    // Now save the messages (this will insert the new messages, associated with the saved chat)
    const savedMessages = await messageRepository.save(newMessages);

    // Step 4: Commit the transaction if everything goes well
    await queryRunner.commitTransaction();

    console.log(
      'Chat with messages created successfully:',
      savedChat,
      savedMessages,
    );
    alert('donesxsxsxs');
  } catch (error) {
    // Rollback transaction if any error occurs
    console.error('Error creating chat with messages:', error);
    await queryRunner.rollbackTransaction();
  } finally {
    // Release the query runner

    await queryRunner.release();
  }
};
export const getChatsss = () => {
  const chatRepository = repositoryFactory.createRepository(Chat);
  chatRepository
    .findAll({relations: ['messages']})
    .then(e => {
      alert(JSON.stringify(e));
    })
    .catch(e => {
      alert(e);
    });
};
export const GetMEssage=async()=>{
  const chatRepository = repositoryFactory.createRepository(Chat);
  let data = await chatRepository.findAll()
  return data
}
export const getChats = async () => {
  try {
    // Ensure the DataSource is initialized
    if (!AppDataSourceChat.isInitialized) {
      await AppDataSourceChat.initialize();
    }

    // Get the repository for the Chat entity
    const chatRepository = AppDataSourceChat.getRepository(Chat);

    // Fetch all chats with related messages and files
    const chats = await chatRepository.find({
      relations: ['messages', 'files'], // Specify relations to load
    });

    console.log('Chats with related data:', chats[chats.length - 1]);

    return chats; // Return the data if needed
  } catch (error) {
    console.error('Error fetching chats:', error);
  }
};
export const AddNewChatList =async()=>{
  const chatRepository = AppDataSourceChat.getRepository(Chat);

  const newChat = chatRepository.create({
    conversationId: null, // Nullable value
    title: 'Temporary Chat',
    lastMessage: 'Welcome to the temporary chat!',
    lastChange: new Date().toISOString(),
    profileImagePath: null, // Nullable value
    messages: [
      { content: 'First message in this chat' },
      { content: 'Second message in this chat' },
      { content: 'lslslslsllslslslslslls' },
    ], // List of messages
  });

  await chatRepository.save(newChat);
  console.log('Chat created:', newChat);
}
export const GetChatsOfNewSchema=async()=>{
  const chatRepository = repositoryFactory.createRepository(Chat);
  const data = await chatRepository.findAll({relations: ['messages','files',]})
  alert(JSON.stringify(data))
}
// {files: [{  "message": "hello", "url": "chat_file.png"}], "messages": [{ "content": "Hello, World!"}], "title": "General Chat"}


export const createChatWithMessagesNew = async () => {
  const queryRunner = AppDataSourceChat.createQueryRunner();

  try {
    // Start the transaction
    await queryRunner.connect();
    await queryRunner.startTransaction();

    // Use RepositoryFactory to create repositories with transaction manager
    // const repositoryFactory = new RepositoryFactory();
    const chatRepository = repositoryFactory.createRepository(Chat, queryRunner.manager);
    const messageRepository = repositoryFactory.createRepository(Message, queryRunner.manager);

    // Create a new chat
    const newChat = await chatRepository.create({
      conversationId: Math.random()*100,
      title: "Team Chat",
      lastMessage: "Welcome to the team chat!",
      lastChange: new Date().toISOString(),
      profileImagePath: "/images/team_chat.png",
    });

    // Create messages for the chat
    const messages = [
      {
        conversationId: newChat.conversationId,
        senderId: 1,
        contactMapped: true,
        messageTime: new Date().toISOString(),
        text: "Hello everyone!",
        seen: true,
        senderName: "Alice",
        selfSended: false,
        status: "sent",
        sending: "done",
        chat: newChat,
      },
      {
        conversationId: newChat.conversationId,
        senderId: 2,
        contactMapped: true,
        messageTime: new Date().toISOString(),
        text: "Hi Alice!",
        seen: true,
        senderName: "Bob",
        selfSended: false,
        status: "sent",
        sending: "done",
        chat: newChat,
      },
    ];

    // Save the chat using GenericRepository
    const savedChat = await queryRunner.manager.save(Chat, newChat);

    // Save messages using GenericRepository
    for (const messageData of messages) {
      const newMessage = messageRepository.create({ ...messageData, chat: savedChat });
      await queryRunner.manager.save(Message, newMessage);
    }

    // Commit the transaction
    await queryRunner.commitTransaction();
    console.log("Chat with messages created successfully:", savedChat);
  } catch (error) {
    // Rollback transaction on error
    await queryRunner.rollbackTransaction();
    console.error("Error creating chat with messages:", error);
  } finally {
    // Release the query runner
    await queryRunner.release();
  }
};
export const createChatWithMessagesWithTransActions = async () => {
  try {
    // Start a transaction using AppDataSourceChat.transaction
    await AppDataSourceChat.transaction(async (transactionalEntityManager) => {
      
      // Create repositories with transactionalEntityManager
      const chatRepository = repositoryFactory.createRepository(Chat);
      const messageRepository = repositoryFactory.createRepository(Message);

      // Create a new chat
      const newChat = await chatRepository.create({
        conversationId: Math.random()*100,
        title: "Team Chat",
        lastMessage: "Welcome to the team chat!",
        lastChange: new Date().toISOString(),
        profileImagePath: "/images/team_chat.png",
      });

      // Create messages for the chat
      const messages = [
        {
          conversationId: newChat.id,
          senderId: 1,
          contactMapped: true,
          messageTime: new Date().toISOString(),
          text: "Hello everyone this is message 1!",
          seen: true,
          senderName: "Alice",
          selfSended: false,
          status: "sent",
          sending: "done",
          chat: newChat,
        },
        {
          conversationId: newChat.id,
          senderId: 2,
          contactMapped: true,
          messageTime: new Date().toISOString(),
          text: "Hi Alice this is message 2!",
          seen: true,
          senderName: "Bob",
          selfSended: false,
          status: "sent",
          sending: "done",
          chat: newChat,
        },
      ];

      // Save messages using the repository
      for (const messageData of messages) {
        await messageRepository.create(messageData);
      }

      console.log("Chat created with messages:", newChat);
    });
  } catch (error) {
    console.error("Error creating chat with messages:", error);
  }
};