import React from "react";
import { Text, View, StyleSheet,Image, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

export default function CardView(props) {

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.content}>
        <LinearGradient
          colors={['#cacaca', '#ffffff00']}
          start={[1,0]}
          style={[styles.backgroundGradient,styles[props.rarity]]}>
        </LinearGradient>
        <Image source={{uri:props.image}} style={styles.image} />
        
        <View style={styles.infoBox}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.title}>{props.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    
    padding:5,
    flexDirection: "column",
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").width / 2
  },
  content:{
    borderRadius: 10,
    backgroundColor: "white",
  },
  title:{
    color:'#fff',
    textAlign:'center',
  },
  infoBox:{
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent:'center',
    position:'absolute',
    bottom:0,
    width:'100%',
    backgroundColor:'#00000069',
    height:50,
  },
  backgroundGradient:{
    borderRadius: 10,
    position:'absolute',
    width:'100%',
    height:'100%',
  },
  image:{
    borderRadius: 10,
    alignSelf: 'center',
    width:'100%',
    height:'100%',
    
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
