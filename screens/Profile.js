import React, { Component } from 'react';
import { Text, View, Image, Switch } from 'react-native';
import firebase from 'firebase';

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      lightTheme: true,
      profileImage:
        'https://i.pinimg.com/474x/2e/45/08/2e4508f6cf78152eeadb462928014616--girl-clipart-cute-clipart.jpg',
      name: 'delisha davis',
    };
  }

  fetchUser = async () => {
    await firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid)
      .on('value', (data) => {
        this.setState({
          lightTheme: data.val().current_theme === 'dark' ? false : true,
          name: `${data.val().first_name}  ${data.val().last_name}`,
          profileImage: data.val().profile_picture,
        });
      });
  };

  componentDidMount() {
    this.fetchUser();
  }

  toggleSwitch = () => {
    firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid)
      .update({
        current_theme: this.state.lightTheme ? 'dark' : 'light',
      });

    this.setState({ lightTheme: !this.state.lightTheme });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: !this.state.lightTheme ? '#2f345d' : 'white',
        }}>
        <Image
          style={{ width: 100, height: 100, borderRadius: 100 }}
          source={{
            uri: this.state.profileImage,
          }}
        />
        <Text
          style={{
            color: !this.state.lightTheme ? 'white' : '#2f345d',
            fontSize: 30,
          }}>
         
          {this.state.name}
        </Text>

        <View style={{ flexDirection: 'row', marginTop: 50 }}>
          <Text
            style={{
              color: !this.state.lightTheme ? 'white' : 'teal',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            {' '}
            dark theme{' '}
          </Text>
          <Switch
            trackColor={{ false: '#2a2a2a', true: 'gray' }}
            thumbColor={this.state.lightTheme ? 'red' : 'green'}
            ios_backgroundColor="#2a2a2a"
            onValueChange={this.toggleSwitch}
            value={!this.state.lightTheme}
            style={{
              marginLeft: 20,
              transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
            }}
          />
        </View>
      </View>
    );
  }
}
