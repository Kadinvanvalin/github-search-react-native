import UserListScreen from "./components/UserSearch";
import UserDetail from "./components/UserDetail";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RepoDetails from "./components/RepoDetail";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserList">
        <Stack.Screen name="GitHub Users" component={UserListScreen} />
        <Stack.Screen
        name="UserDetail"
        options={({ route }) => ({ title: `${route.params.user.login}'s Repos` })}
        component={UserDetail} />
        <Stack.Screen
        name="RepoDetail"
        options={({ route }) => ({ title: `${route.params.repo.name}'s collaborators` })}
        component={RepoDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
