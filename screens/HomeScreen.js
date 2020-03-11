import React,{useState,useEffect} from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import ItemCard from "../components/ItemCard";
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

export default function HomeScreen(props) {
  
    const [currentStore, setcurrentStore] = useState([])
    const [upcomingItems, setupcomingItems] = useState([])
    const [refreshing, setrefreshing] = useState(false)

    const loadItems = () => {
        setrefreshing(true)
        _getItems("https://fortnite-api.theapinetwork.com/store/get").then((data) => {
          let items = []
          data.data.map(element => {
            element.item.price = "???"
            element.item.title = element.item.name
            element.item.image = element.item.images.icon
            items.push(element.item)
          });
          setcurrentStore(items)
        });
        _getItems("https://wsolver.ru/fortApp/upcomingItems.json").then(setupcomingItems);
        setrefreshing(false)
    };

    useEffect(() => {
      loadItems()
    }, [])

    async function _getItems(url){
        let result = fetch(url).then(
            async response => {
                const json = await response.json();
                return json
            }
        );
        return result
    };




    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={loadItems}
            />
          }
        >
          <View style={{ backgroundColor: "#51668b9e" }}>
            <Text style={styles.title}>Current Store</Text>
            <ScrollView horizontal={true} >   
              {currentStore.map(item =>{
                return(
                  <ItemCard key = {item.title} {...item} />
                )
              })}
            </ScrollView>
          </View>
          <View style={{ backgroundColor: "#51668b9e" }}>
            <Text style={styles.title}>Upcoming Items</Text>
          </View>
          <View style={styles.upcomingItemsContainer}>
            {upcomingItems.map(item =>{
              return(
                <ItemCard key = {item.title} {...item} />
              )
            })}
          </View>
        </ScrollView>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#fff",
    backgroundColor: "#04181f",
    paddingTop: 30
  },
  upcomingItemsContainer: {
    flexWrap:'wrap',
    flexDirection:'row'
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
    borderColor: "#4D243D",
    elevation: 20,
    margin: 7
  },
  verticalCard: {
    height: Dimensions.get("window").width / numColumns // approximate a square
  },

  horyzontalCard: {
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
