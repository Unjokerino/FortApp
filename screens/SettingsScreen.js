import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Dimensions
} from "react-native";
import { ExpoConfigView } from "@expo/samples";

function getStats(value) {
  fetch(`https://fortnite-api.p.rapidapi.com/stats/${value}`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "fortnite-api.p.rapidapi.com",
      "x-rapidapi-key": "3e5e2c1c6fmshdcb848c3030c4c5p18ada2jsnb160e3af5f26"
    }
  }).then(async response => {
    const text = await response.text();
    console.log(text);
  });
}
export default function SettingsScreen() {
  const [value, onChangeText] = React.useState("Username");

  return (
    <View style={styles.container}>
      <ScrollView>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            color: "gray"
          }}
          onChangeText={text => onChangeText(text)}
          onFocus={() => {
            onChangeText("");
          }}
          value={value}
        />
        <Button
          onPress={() => {
            getStats(value);
          }}
          title="Search"
        ></Button>
      </ScrollView>
    </View>
  );
}

SettingsScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
    backgroundColor: "#04181f",
    paddingTop: 30
  }
});

//8f5e5ce9-3a75-4d91-be92-7b54610405c2
