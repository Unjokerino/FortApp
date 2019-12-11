import {
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform
} from "react-native";
//import basic react native components

class ExpandableIChallengeComponent extends Component {
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
      <View>
        {/*Header of the Expandable List Item*/}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={this.props.onClickFunction}
          style={styles.header}
        >
          <Text style={styles.headerText}>{this.props.item.category_name}</Text>
        </TouchableOpacity>
        <View
          style={{
            height: this.state.layoutHeight,
            overflow: "hidden"
          }}
        >
          {/*Content under the header of the Expandable List Item*/}
          {this.props.item.subcategory.map((item, key) => (
            <TouchableOpacity
              key={key}
              style={styles.content}
              onPress={() => alert("Id: " + item.id + " val: " + item.val)}
            >
              <Text style={styles.text}>
                {key}. {item.val}
              </Text>
              <View style={styles.separator} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#F5FCFF"
  },
  topHeading: {
    paddingLeft: 10,
    fontSize: 20
  },
  header: {
    backgroundColor: "#F5FCFF",
    padding: 16
  },
  headerText: {
    fontSize: 16,
    fontWeight: "500"
  },
  separator: {
    height: 0.5,
    backgroundColor: "#808080",
    width: "95%",
    marginLeft: 16,
    marginRight: 16
  },
  text: {
    fontSize: 16,
    color: "#606070",
    padding: 10
  },
  content: {
    paddingBosubcategoryom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#fff"
  }
});
