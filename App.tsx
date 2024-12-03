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

import {Test} from './Repository/Cmp.js'
type SectionProps = PropsWithChildren<{
  title: string;
}>;





function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [posts, setPosts] = useState([]);
  const [initer, setIniter] = useState(false);

 

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  return <Test/>
  // return (
  //   <SafeAreaView style={backgroundStyle}>
  //     <StatusBar
  //       barStyle={isDarkMode ? 'light-content' : 'dark-content'}
  //       backgroundColor={backgroundStyle.backgroundColor}
  //     />
      
  //        <Button title='Press to add' onPress={async()=>{
  //         try {
  //           HelloTest1()
  //           const input = {
  //             title: "General Chat",
  //             messages: [{ content: "Hello, World!" }],
  //             files: [
  //               { message: "Hello, World!", url: "message_file.png" },
  //               { url: "chat_file.png" },
  //             ],
  //           };
            
  //         } catch (error) {
  //           alert(error)
  //         }
  //        }}/>
  //        <Button title='Press to check' onPress={()=>{
  //         // getChats()
  //         addChatWithMessagesAndFilesInTransaction()
  //         // createChatWithMessages()
  //        }}/>
  //        <Button title='Press to delete' onPress={()=>{
  //         getChatsss()
  //        }}/>
  //        <Button title='Press to Test1' onPress={()=>{
  //         alert (JSON.stringify(GetMEssage()))
  //        }}/>
  //        <Button title='Add New chatList' onPress={()=>{
  //         // createChatWithMessagesNew()
  //         createChatWithMessagesWithTransActions()
  //        }}/>
  //        <Button title='Get ChatLists' onPress={()=>{
  //         GetChatsOfNewSchema()
  //        }}/>
  //   </SafeAreaView>
  // );
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
