import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MonoText } from "../components/StyledText";

import { CardView } from "../components/CardView";
import { red } from "ansi-colors";

const numColumns = 2;

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      currentStore: [],
      upcomingItems: [],
      refreshing: true
    };
  }

  _getCurrentStore = () => {
    fetch("https://fortnite-api.theapinetwork.com/store/get").then(
      async response => {
        const text = await response.text();
        if ((json_text = JSON.parse(text))) {
          this.setState({
            currentStore: []
          });

          json_text.data.forEach(element => {
            this.setState({
              currentStore: [...this.state.currentStore, element]
            });
          });
        }
      }
    );
  };

  loadItems = () => {
    this._getCurrentStore();
    this._getUpcomingItems();

    this.setState({
      refreshing: false
    });
  };

  _getUpcomingItems = () => {
    fetch("https://wsolver.ru/fortApp/upcomingItems.json").then(
      async response => {
        const text = await response.text();
        if ((json_text = JSON.parse(text))) {
          this.setState({
            upcomingItems: []
          });
          json_text.forEach(element => {
            this.setState({
              upcomingItems: [...this.state.upcomingItems, element]
            });
          });
        }
      }
    );
  };
  _favoriteOnPress = name => {
    console.log(name);
  };

  _renderCurrentStoreItem = ({ item }) => (
    <TouchableOpacity style={[styles.horyzontalCard, styles[item.item.rarity]]}>
      <Image
        style={{ flex: 1, width: "100%" }}
        source={{ uri: item.item.images.icon }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          paddingVertical: 5,
          paddingHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0e0e0e52",
          width: "100%"
        }}
      >
        <Text style={{ flex: 1, width: "100%" }} style={styles.cardText}>
          {item.item.name}
        </Text>
        <Text style={{ flex: 1, width: "100%" }} style={styles.cardText}>
          {item.store.cost}
        </Text>
      </View>
    </TouchableOpacity>
  );

  _renderUpcomingItem = ({ item }) => (
    <TouchableOpacity style={[styles.card, styles[item.rarity]]}>
      <Ionicons
        onPress={() => {
          this._favoriteOnPress(item.name);
        }}
        name="md-star"
        size={38}
        color="#fff"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          padding: 5,
          zIndex: 9
        }}
      />
      <Image style={{ flex: 1, width: "100%" }} source={{ uri: item.image }} />
      <View
        style={{
          position: "absolute",
          bottom: 0,
          paddingVertical: 5,
          paddingHorizontal: 10,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0e0e0e52",
          width: "100%"
        }}
      >
        <Text style={{ flex: 1, width: "100%" }} style={styles.cardText}>
          {item.name}
        </Text>
        <Text style={{ flex: 1, width: "100%" }} style={styles.cardText}>
          {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  _keyExtractor = item => {
    return item.name;
  };

  componentDidMount() {
    this.loadItems();
  }

  render() {
    const upcomingItemsLoading =
      this.state.upcomingItems.length != 0 ? (
        <FlatList
          data={this.state.upcomingItems}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderUpcomingItem}
          numColumns={numColumns}
        />
      ) : (
        <ActivityIndicator style={styles.activityIndicator} size="large" />
      );

    const currentShopLoading =
      this.state.upcomingItems.length != 0 ? (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={this.state.currentStore}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderCurrentStoreItem}
        />
      ) : (
        <ActivityIndicator style={styles.activityIndicator} size="large" />
      );
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.loadItems}
            />
          }
        >
          <View style={{ backgroundColor: "#51668b9e" }}>
            <Text style={styles.title}>Current Store</Text>
          </View>

          {currentShopLoading}
          <View style={{ backgroundColor: "#51668b9e" }}>
            <Text style={styles.title}>Upcoming Items</Text>
          </View>
          {upcomingItemsLoading}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
    backgroundColor: "#04181f",
    paddingTop: 30
  },
  upcoming: {
    backgroundColor: "red",

    justifyContent: "center"
  },
  activityIndicator: {
    flex: 1,
    height: Dimensions.get("window").width / numColumns
  },
  title: {
    color: "#fff",
    alignItems: "center",
    paddingLeft: 5,
    width: 300,
    borderBottomColor: "#51668b",
    fontFamily: "burbankBold",
    color: "#fff",
    height: 0,
    borderBottomWidth: 50,
    fontSize: 32,
    borderRightWidth: 50,
    borderRightColor: "transparent"
  },
  card: {
    backgroundColor: "#4D243D",
    alignItems: "center",
    color: "#fff",
    justifyContent: "center",
    flex: 1,

    margin: 5,
    height: Dimensions.get("window").width / numColumns // approximate a square
  },

  horyzontalCard: {
    backgroundColor: "#4D243D",
    alignItems: "center",
    color: "#fff",
    justifyContent: "center",
    flex: 1,

    margin: 5,
    width: Dimensions.get("window").width / numColumns, // approximate a square
    height: Dimensions.get("window").width / numColumns
  },

  cardText: {
    color: "#fff"
  },
  epic: {
    backgroundColor: "#9846d2"
  },
  rare: {
    backgroundColor: "#259bd9"
  },
  uncommon: {
    backgroundColor: "#42891a"
  },
  common: {
    backgroundColor: "gray"
  },
  marvel: {
    backgroundColor: "#d42f30"
  },
  frozen: {
    backgroundColor: "#6dc8f0"
  },
  lava: {
    backgroundColor: "#bd5f28"
  },
  legendary: {
    backgroundColor: "#bf6c21"
  }
});
