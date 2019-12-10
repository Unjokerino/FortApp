import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { ExpoLinksView } from "@expo/samples";

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={{ backgroundColor: "#51668b9e" }}>
        <Text style={styles.title}>Challenges</Text>
      </View>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  header: null
};

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
  }
});
