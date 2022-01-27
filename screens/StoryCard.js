import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import firebase from 'firebase';

var images = {
  image1: require('../assets/story_image_1.png'),
  image2: require('../assets/story_image_2.png'),
  image3: require('../assets/story_image_3.png'),
  image4: require('../assets/story_image_4.png'),
  image5: require('../assets/story_image_5.png'),
};



export default class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      storyData: this.props.story.value,
      storyid: this.props.story.key,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync({
      'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
    });
    this.setState({ fontsLoaded: true });
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
    this._loadFontsAsync();
    this.fetchUser();
  }

  render() {
   
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate('StoryScreen', {
              story: this.state.storyData,
            })
          }>
          <View
            style={
              !this.state.lightTheme
                ? styles.cardContainer
                : styles.lightcardContainer
            }>
            <Image
              source={images[this.state.storyData.preview_Image]}
              style={styles.storyImage}></Image>

            <View style={styles.titleContainer}>
              <Text
                style={
                  !this.state.lightTheme
                    ? styles.storyTitleText
                    : styles.lightstoryTitleText
                }>
                {this.state.storyData.title}
              </Text>
              <Text
                style={
                  !this.state.lightTheme
                    ? styles.storyAuthorText
                    : styles.lightstoryAuthorText
                }>
                {this.state.storyData.author}
              </Text>
              <Text
                style={
                  !this.state.lightTheme
                    ? styles.descriptionText
                    : styles.lightdescriptionText
                }>
                {this.state.storyData.description}
              </Text>
            </View>
            <View style={styles.actionContainer}>
              <View style={styles.likeButton}>
                <Ionicons name={'heart'} size={RFValue(30)} color={'white'} />
                <Text style={styles.likeText}>{this.state.storyData.likes}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: '#2f345d',
    borderRadius: RFValue(20),
  },
  lightcardContainer: {
    margin: RFValue(13),
    backgroundColor: '#eaeaea',
    borderRadius: RFValue(20),
  },
  storyImage: {
    resizeMode: 'contain',
    width: '95%',
    alignSelf: 'center',
    height: RFValue(250),
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: 'center',
  },
  storyTitleText: {
    fontSize: RFValue(25),
    fontFamily: 'Bubblegum-Sans',
    color: 'white',
  },
  lightstoryTitleText: {
    fontSize: RFValue(25),
    fontFamily: 'Bubblegum-Sans',
    color: '#2f345d',
  },
  storyAuthorText: {
    fontSize: RFValue(18),
    fontFamily: 'Bubblegum-Sans',
    color: 'white',
  },
  lightstoryAuthorText: {
    fontSize: RFValue(18),
    fontFamily: 'Bubblegum-Sans',
    color: '#2f345d',
  },
  descriptionText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: 13,
    color: 'white',
    paddingTop: RFValue(10),
  },
  lightdescriptionText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: 13,
    color: '#2f345d',
    paddingTop: RFValue(10),
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    borderRadius: RFValue(30),
  },
  likeText: {
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
});
