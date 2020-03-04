import React from "react";
import { View, } from 'react-native';
import UserList from './UserList'
import { fetchGitHubAPI } from "../utils/githubHandler";
export default class RepoDetails extends React.Component {
  state = {
    users: [],
  }
  render() {
  return (
        <View
        style={{
          display: "flex",
          flexDirection: "row"
        }}>
          <UserList navigation={this.props.navigation} users={this.state.users}></UserList>
        </View>
  );
  }
  componentDidMount() {
    console.log(this.props)
    const url = `/repos/${this.props.route.params.repo.owner.login}/${this.props.route.params.repo.name}/contributors`
    fetchGitHubAPI(url)
    .then(response => {
      console.log(response);
      this.setState({ users: response });
    })
    .catch(error => {
      console.error(error);
    });
  }
};
