import React from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import { fetchGitHubAPI } from "../utils/githubHandler";
import { ListItem } from "react-native-elements";
export default class UserDetail extends React.Component {
  state = {
    users: [],
    repos: [],
    modalVisible: false,
  };
  render() {
    return <>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.avatar}
            source={{ uri: this.props.route.params.user.avatar_url }}
          />
          <Text style={styles.name}>{this.props.route.params.user.login} </Text>
        </View>
        <FlatList
          data={this.state.repos}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => this.viewCollaborators(item)}
              bottomDivider
              title={`${item.name}`}
            />
          )}
          keyExtractor={item => `list-item-${item.id}`}
        />
        </SafeAreaView>
    

    </>
  }
  viewCollaborators = (repo) => {
    console.log(repo)
    this.props.navigation.navigate("RepoDetail", { repo });

  }
  componentDidMount() {

    const url = `/users/${this.props.route.params.user.login}/repos`;
      fetchGitHubAPI(url)
        .then(response => {
          console.log(response);
          this.setState({repos: response});
        })
        .catch(error => {
          console.error(error);
        });
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    backgroundColor: "#fff"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  avatar: {
    width: 74,
    height: 74
  },
  name: {
    fontSize: 24,
    margin: 5
  }
});
