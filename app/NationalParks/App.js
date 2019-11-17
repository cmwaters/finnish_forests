import React from "react";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

// screens are created in a seperate file per screen
import HomeScreen from "./home";

// import HistoryScreen from "./screens/history";
// import PuzzleScreen from "./screens/puzzle";
// import StoryScreen from "./screens/story";
// import HintsScreen from "./screens/hints";
import MapScreen from "./map";




// TabStack.navigationOptions = ({ navigation }) => {
//   const { routeName } = navigation.state.routes[navigation.state.index];
//   // const { title } = PuzzleScreen.title
//   const { title } = 'PuzzleScreen.title'

//   // You can do whatever you like here to pick the title based on the route name
//   const headerTitle = title;

//   return {
//     headerTitle,
//   };
// };


const MainStack = createStackNavigator(
  {
    Home: HomeScreen, 
    Map: MapScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(MainStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}