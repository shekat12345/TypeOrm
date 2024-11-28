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
import {Actionerr} from './tester.js'
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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {AppDataSource} from './orrm/database';
import { AppDataSource1 } from './orrm/tutorials/dataBAse2.js';
import {Author} from './orrm/entities/Author';
import {Post} from './orrm/entities/Post';
import {Erf} from './orrm/tutorials';

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
function decodeToOriginalArray(dataHelper: { [key: string]: string }): string[] {
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

const Action=()=>{
  AppDataSource1.initialize().then(()=>{
    alert ("heoeoeoeo")
  }).catch((err)=>{
    alert (err)
  })
}

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    if (!initer) {
      AppDataSource.initialize()
        .then(() => {
          setIniter(true);
          // alert('Database initialized successfully!');
        })
        .catch(error => console.error('Error initializing database:', error));
      return () => {
        AppDataSource.destroy();
      };
    }
  }, []);
  const getPosts = async () => {
    if (initer) {
      try {
        const postsRepo = AppDataSource.getRepository(Post);
        const posts = await postsRepo.find();
        setPosts(posts);
        alert(JSON.stringify(posts));
      } catch (error) {
        alert(error);
      }
    }
  };
  useEffect(() => {
    getPosts();
  }, [initer]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Button
        title="Get Authors "
        onPress={async () => {
          // axios
          //   .post('http://192.168.10.53:3000/posts', {
          //     title: 'My First Post',
          //     content: 'This is the content of my first post.',
          //     authorId: 1,
          //   })
          //   .then(response => {
          //     alert(JSON.stringify(response.data));
          //   })
          //   .catch(error => {
          //     alert(error.message); // Log the error message
          //     console.error('Error details:', error.response?.data || error);
          //   });

          const authorRepo = AppDataSource.getRepository(Author);
          const authors = await authorRepo.find();
          // let erf = JSON.stringify(authorRepo)
          console.log(authors);
          // axios.get('http://192.168.10.53:3000/authors').then((e)=>{
          //   alert (JSON.stringify(e))
          // }).catch((er)=>{alert (er)})
        }}
      />
      <Button
        title="Get Posts"
        onPress={async () => {
          const authorRepo = AppDataSource.getRepository(Post);
          const authors = await authorRepo.find();
          // let erf = JSON.stringify(authorRepo)
          console.log(authors);
        }}
      />
      <Button
        title="Create Post"
        onPress={async () => {
          try {
            const postRepo = AppDataSource.getRepository(Post);
            const newPost = postRepo.create({
              title: 'hello',
              content: 'hellll',
              author: 1,
            });
            await postRepo.save(newPost);
            alert('hello ');
          } catch (error) {
            alert(error);
          }
        }}
      />
      <Button
        title="Create an Author "
        onPress={async () => {
          try {
            const authorRepo = AppDataSource.getRepository(Author);
            const newAuthor = authorRepo.create({name: 'user name 1'});
            await authorRepo.save(newAuthor);
            alert('hello ');
          } catch (error) {
            alert(error);
          }
        }}
      />
      <View>
        <Text>{JSON.stringify(posts)}</Text>
      </View>
      <Button onPress={()=>{

      Action()

      }} title='Std'/>
    </SafeAreaView>
  );
}//jesd

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
