import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { search } from "./Redux/user";

const Fetch = () => {
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    fetchPosts();
    return () => {};
  }, []);

  const fetchPosts = () => {
    const apiURL = "https://jsonplaceholder.typicode.com/posts";
    fetch(apiURL)
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredData(responseJson);
        setMasterData(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const ItemView = ({ item }) => {
    return (
      <Text style={styles.itemStyle}>
        {item.id}
        {". "}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const searchFilter = (text) => {
    dispatch(search({ searchWord }));
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearchWord(text);
    } else {
      setFilteredData(masterData);
      setSearchWord(text);
    }
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#c8c8c8" }}
      ></View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInputStyle}
        value={searchWord}
        placeholder="Search here"
        underlineColorAndroid="transparent"
        onChangeText={(text) => searchFilter(text)}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    padding: 15,
  },
  container: {
    marginTop: 20,
    paddingHorizontal: 30
  },
  textInputStyle: {
    marginTop: 50,
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "black",
    width:300,
    marginHorizontal:50
  },
});

export default Fetch;
