import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feed from '../screens/Feed';
import CreateStory from '../screens/CreateStory';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';

const Tab = createMaterialBottomTabNavigator();

export default class TabNavigator extends React.Component {
  constructor() {
    super();
    this.state = { lightTheme: true };
  }
  fetchUser = async () => {
    await firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid)
      .on('value', (data) => {
        this.setState({
          lightTheme: data.val().current_theme === 'dark' ? false : true,
        });
      });
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <Tab.Navigator
        labeled={false}
        activeColor="tomato"
        inactiveColor="gray"
        barStyle={{
          backgroundColor: !this.state.lightTheme ? '#2f345d' : '#eaeaea',
          overflow: 'hidden',
          position: 'absolute',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Feed') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'CreateStory') {
              iconName = focused ? 'create' : 'create-outline';
            }
            return (
              <Ionicons name={iconName} size={RFValue(20)} color={color} />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen
          name="Feed"
          component={Feed}
          options={{ unmountOnBlur: true }}
        />
        <Tab.Screen
          name="CreateStory"
          component={CreateStory}
          options={{ unmountOnBlur: true }}
        />
      </Tab.Navigator>
    );
  }
}
