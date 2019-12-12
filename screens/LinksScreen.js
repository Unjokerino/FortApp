/*Example of Expandable ListView in React Native*/
import React, { Component } from "react";
//import react in our project
import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  ActivityIndicator,
  TouchableOpacity,
  Platform
} from "react-native";
//import basic react native components

class ExpandableItemComponent extends Component {
  //Custom Component for the Expandable List
  constructor() {
    super();
    this.state = {
      layoutHeight: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.item.isExpanded) {
      this.setState(() => {
        return {
          layoutHeight: null
        };
      });
    } else {
      this.setState(() => {
        return {
          layoutHeight: 0
        };
      });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.layoutHeight !== nextState.layoutHeight) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <View style={{ marginTop: 5, fontFamily: "burbankBold" }}>
        {/*Header of the Expandable List Item*/}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClickFunction}
          style={styles.header}
        >
          <Text style={styles.headerText}>{this.props.item.title}</Text>
        </TouchableOpacity>
        <View
          style={{
            height: this.state.layoutHeight,
            overflow: "hidden"
          }}
        >
          {/*Content under the header of the Expandable List Item*/}
          <Text style={styles.subtitle}>Normal Challenges</Text>
          {this.props.item[0].challenges.map((item, key) => (
            <TouchableOpacity
              key={key}
              style={[styles.content]}
              onPress={() => alert("Id: ")}
            >
              <View
                style={[
                  styles.textContainer,
                  key === 0 ? { marginTop: 5 } : "",
                  key === this.props.item[0].challenges.length - 1
                    ? { marginBottom: 5 }
                    : ""
                ]}
              >
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.objective}>{item.objective}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <Text style={styles.subtitle}>Prestige Challenges</Text>

          {this.props.item[1].challenges.map((item, key) => (
            <TouchableOpacity
              key={key}
              style={[styles.content]}
              onPress={() => alert("Id: ")}
            >
              <View
                style={[
                  styles.textContainer,
                  key === 0 ? { marginTop: 5 } : "",
                  key === this.props.item[0].challenges.length - 1
                    ? { marginBottom: 5 }
                    : ""
                ]}
              >
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.objective}>{item.objective}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

export default class LinksScreen extends Component {
  static navigationOptions = {
    header: null
  };
  //Main View defined under this Class
  constructor() {
    super();
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = {
      challenges: [],
      refreshing: true
    };
  }

  _getChallenges = () => {
    fetch("https://wsolver.ru/fortApp/challenges.json").then(async response => {
      const text = await response.text();
      if ((json_text = JSON.parse(text))) {
        this.setState({
          challenges: []
        });
        json_text.forEach((element, key) => {
          key === 0
            ? (element.isExpanded = true)
            : (element.isExpanded = false);

          this.setState({
            challenges: [element, ...this.state.challenges]
          });
        });
      }
    });
  };

  updateLayout = index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...this.state.challenges];
    //For Single Expand at a time
    array.map((value, placeindex) =>
      placeindex === index
        ? (array[placeindex]["isExpanded"] = !array[placeindex]["isExpanded"])
        : (array[placeindex]["isExpanded"] = false)
    );

    //For Multiple Expand at a time
    //array[index]['isExpanded'] = !array[index]['isExpanded'];
    this.setState(() => {
      return {
        listDataSource: array
      };
    });
  };

  componentDidMount() {
    this._getChallenges();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "#51668b9e" }}>
          <Text style={styles.title}>Challenges</Text>
        </View>
        <ScrollView>
          {this.state.challenges.length > 0 ? (
            this.state.challenges.map((item, key) => (
              <View>
                <ExpandableItemComponent
                  key={item.title}
                  onClickFunction={this.updateLayout.bind(this, key)}
                  item={item}
                />
              </View>
            ))
          ) : (
            <ActivityIndicator style={styles.activityIndicator} size="large" />
          )}
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
  topHeading: {
    paddingLeft: 10,
    fontSize: 20
  },
  subtitle: {
    color: "#fff",
    padding: 5,
    backgroundColor: "#51668bd1",
    marginHorizontal: 8,
    marginTop: 10
  },
  header: {
    opacity: 0.6,
    marginHorizontal: 5,
    backgroundColor: "#51668b",
    padding: 16
  },
  headerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "burbankBold"
  },
  textContainer: {
    borderRadius: 4,
    backgroundColor: "#51668b9e",

    minHeight: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  textContainerWrapper: {},
  text: {
    fontWeight: "500",
    flex: 1,
    paddingLeft: 5,
    color: "#fff",
    fontSize: 16
  },
  objective: {
    fontWeight: "500",
    color: "#77a9e3"
  },
  content: {
    padding: 2,
    paddingHorizontal: 5,
    opacity: 0.6,
    marginHorizontal: 8,
    backgroundColor: "#51668bd1"
  }
});

//Dummy content to show
//You can also use dynamic data by calling webservice
