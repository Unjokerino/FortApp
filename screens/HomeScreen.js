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
  Dimensions
} from "react-native";

import { MonoText } from "../components/StyledText";

import { CardView } from "../components/CardView";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      currentStore: []
    };
  }

  _getCurrentStore = () => {
    fetch("https://fortnite-api.theapinetwork.com/store/get").then(
      async response => {
        const text = await response.text();
        if ((json_text = JSON.parse(text))) {
          json_text.data.forEach(element => {
            this.setState({
              currentStore: [...this.state.currentStore, element]
            });
          });
        }
      }
    );
  };

  _renderItem = ({ item }) => (
    <CardView id={item.itemId} name={item.item.name} />
  );

  componentDidMount() {
    this._getCurrentStore();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.state.currentStore != [] ? this.state.currentStore : []}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
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
  }
});
