import React from "react";
import { Text, View, StyleSheet } from "react-native";

export function CardView(props) {
  return (
    <View style={styles.card}>
      <Text>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    backgroundColor: "white",
    width: 150,
    height: 150
  }
});
