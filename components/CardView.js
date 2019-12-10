import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export function CardView(props) {
  return (
    <TouchableOpacity style={styles.card}>
      <Text>{props.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    flexDirection: "column",
    backgroundColor: "white",
    width: 150,

    height: 150
  }
});
