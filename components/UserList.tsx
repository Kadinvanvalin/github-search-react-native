import React from "react";
import { StyleSheet, FlatList } from "react-native";
import Constants from "expo-constants";
import { ListItem } from "react-native-elements";

export default class UserList extends React.Component<
  {  users, navigation },
  {}
> {
  render() {
    return (
      <FlatList
          data={this.props.users}
          renderItem={({ item }) => (
            <ListItem
              onPress={() => this.viewUser(item)}
              bottomDivider
              leftAvatar={{ source: { uri: item.avatar_url } }}
              title={`${item.login}`}
            />
          )}
          keyExtractor={item => `list-item-${item.id}`}
        /> 

    );
  }
  viewUser = user => {
    this.props.navigation.push("UserDetail", { user });
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
