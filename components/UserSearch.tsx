import React from "react";
import { StyleSheet, SafeAreaView, } from "react-native";
import Constants from "expo-constants";
import { fetchGitHubAPI } from "../utils/githubHandler";
import {  SearchBar } from "react-native-elements";
import UserList from "./UserList";
interface User {
  login: string;
  avatar_url: string;
  id: string;
}
interface Repo {
  name: string;
}
interface AppState {
  users: User[];
  repos: Repo[];
  search: string;
}
export default class UserListScreen extends React.Component<
  { navigation },
  AppState
> {
  state: AppState = {
    users: [],
    repos: [],
    search: ""
  };

  render() {
    const { search } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <SearchBar
          platform="ios"
          placeholder="Type Here..."
          onChangeText={this.onChangeText}
          value={search}
        />
        <UserList navigation={this.props.navigation} users={this.state.users}></UserList>
      </SafeAreaView>
    );
  }
  viewUser = user => {
    this.props.navigation.navigate("UserDetail", { user });
  };
  onChangeText = search => {
    this.setState({ search });
    const url = `/search/users?q=${search}`;
    fetchGitHubAPI(url)
      .then(response => {
        console.log(response);
        this.setState({ users: response.items });
      })
      .catch(error => {
        console.error(error);
      });
  };
  componentDidMount = () => {
    const url = "/users";
    fetchGitHubAPI(url)
      .then(response => {
        console.log(response);
        this.setState({ users: response });
      })
      .catch(error => {
        console.error(error);
      });
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#fff"
  }
});
