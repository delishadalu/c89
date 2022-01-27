import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import * as Font from 'expo-font';
import StoryCard from './StoryCard';
import AppLoading from 'expo-app-loading';

import firebase from 'firebase';

export default class Feed extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
      lightTheme: true,
      stories: [],
    };
  }

  loadFont = async () => {
    await Font.loadAsync({
      'bubblegum-sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
    });

    this.setState({ fontLoaded: true });
  };
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

  fetchStories = async () => {
    
  
   
    await firebase
      .database()
      .ref('posts')
      .on('value', (data) => {
        this.setState({stories:[]})
        if (data.val()) {
          Object.keys(data.val()).map((key) =>
            this.setState({
              stories: [
                ...this.state.stories,
                { key: key, value: data.val()[key] },
              ],
            })
          );
        }
      });
     
  };

  componentDidMount() {
    this.loadFont();
    this.fetchUser();
    this.fetchStories();
  }

  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }
    return (
      <View
        style={{
          flex: 1,
         
          backgroundColor: !this.state.lightTheme ? '#15193c' : 'white',
        }}>
        <SafeAreaView
          style={{
            marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
          }}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Image
            style={{ width: 50, height: 50 }}
            source={require('../assets/logo.png')}
          />
          <Text style={{ paddingLeft: 20, fontFamily: 'bubblegum-sans' }}>
            STORY TELLING APP
          </Text>
        </View>

        <View style={{ flex: 0.9 }}>
          {this.state.stories.length === 0 ? (
            <Text>no stories in database</Text>
          ) : (
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={this.state.stories}
              renderItem={({ item }) => {
                return (
                  <StoryCard story={item} navigation={this.props.navigation} />
                );
              }}
            />
          )}
        </View>
      </View>
    );
  }
}
