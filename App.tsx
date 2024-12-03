/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'reflect-metadata';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {Actionerr} from './tester.js';
import {RunDb,destroyDb,HelloTest1,GetChatsOfNewSchema,GetMEssage,AddNewChatList,createChatWithMessagesWithTransActions,createChatWithMessagesNew,getChatsss,getChats,TestRepository,addChatWithMessagesAndFilesInTransaction,createChatWithMessages} from './ChatOrm/Database22.js';
import {AppDataSourceChat} from './ChatOrm/Database22.js';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { getManager } from 'typeorm';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {AppDataSource} from './orrm/database';
import {AppDataSource1} from './orrm/tutorials/dataBAse2.js';
import {Author} from './orrm/entities/Author';
import {Post} from './orrm/entities/Post';
import {Erf} from './orrm/tutorials';
import Student from './orrm/tutorials/entities/students.js';
import {Customer} from './orrm/tutorials/entities/Cutsomer.ts';
import { Chat } from './ChatOrm/entities/Chat.js';
import { Message } from './ChatOrm/entities/Message.js';
import {Test} from './Repository/Cmp.js'
type SectionProps = PropsWithChildren<{
  title: string;
}>;
function divideArrayIntoChunks<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
function decodeToOriginalArray(dataHelper: {[key: string]: string}): string[] {
  let originalArray: string[] = [];
  Object.keys(dataHelper)
    .sort((a, b) => Number(a) - Number(b))
    .forEach(key => {
      const chunk = JSON.parse(dataHelper[key]);
      originalArray = originalArray.concat(chunk);
    });
  return originalArray;
}

const Actioner = () => {
  const chunkSize = 5;
  const dividedArrays = divideArrayIntoChunks(characters, chunkSize);
  console.log(dividedArrays);
};
function Section({children, title}: SectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [posts, setPosts] = useState([]);
  const [initer, setIniter] = useState(false);

 

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  // useEffect(() => {
  //   if (!initer) {
  //     RunDb();
  //     return () => {
  //       destroyDb();
  //     };
  //   }
  // }, []);
  //sxsx
  return <Test/>
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      
         <Button title='Press to add' onPress={async()=>{
          try {
            HelloTest1()
            const input = {
              title: "General Chat",
              messages: [{ content: "Hello, World!" }],
              files: [
                { message: "Hello, World!", url: "message_file.png" },
                { url: "chat_file.png" },
              ],
            };
            
          } catch (error) {
            alert(error)
          }
         }}/>
         <Button title='Press to check' onPress={()=>{
          // getChats()
          addChatWithMessagesAndFilesInTransaction()
          // createChatWithMessages()
         }}/>
         <Button title='Press to delete' onPress={()=>{
          getChatsss()
         }}/>
         <Button title='Press to Test1' onPress={()=>{
          alert (JSON.stringify(GetMEssage()))
         }}/>
         <Button title='Add New chatList' onPress={()=>{
          // createChatWithMessagesNew()
          createChatWithMessagesWithTransActions()
         }}/>
         <Button title='Get ChatLists' onPress={()=>{
          GetChatsOfNewSchema()
         }}/>
    </SafeAreaView>
  );
} //jesd

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
