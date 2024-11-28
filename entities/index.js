import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import {  AppDataSource } from "./dataBase";

const App1212 = () => {
  const [initialized, setInitialized] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [name, setName] = useState("");

  const loadAuthors = async () => {
    const authorRepo = AppDataSource.getRepository("Author");
    const data = await authorRepo.find({ relations: ["posts"] });
    setAuthors(data);
  };

  const addAuthor = async () => {
    const authorRepo = AppDataSource.getRepository("Author");
    const newAuthor = { name };
    await authorRepo.save(newAuthor);
    setName("");
    loadAuthors();
  };

  useEffect(() => {
    AppDataSource.initialize()
      .then(() => {
        // setInitialized(true);
        // loadAuthors();
      })
      .catch((error) => console.log("Error initializing database:", error));
  }, []);

  return (
    <View style={styles.container}>
      {initialized ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Author Name"
            value={name}
            onChangeText={setName}
          />
          <Button title="Add Author" onPress={addAuthor} />
          <FlatList
            data={authors}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.authorItem}>
                <Text style={styles.authorName}>{item.name}</Text>
                <Text>Posts: {item.posts?.length || 0}</Text>
              </View>
            )}
          />
        </>
      ) : (
        <Text>Loadingssssssssssssssss111ss...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 8,
  },
  authorItem: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
  },
  authorName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default App1212;
