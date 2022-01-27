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
import * as Speech from 'expo-speech';

var images = {
  image1: require('../assets/story_image_1.png'),
  image2: require('../assets/story_image_2.png'),
  image3: require('../assets/story_image_3.png'),
  image4: require('../assets/story_image_4.png'),
  image5: require('../assets/story_image_5.png'),
};


console.log(this.props);
export default class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      speakerColor: 'red',
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync({
      'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  initiateSpeak = () => {
    if (this.state.speakerColor === 'red') {
      Speech.speak(
        `${this.props.route.params.story.title} by ${this.props.route.params.story.author}`
      );
      Speech.speak(this.props.route.params.story.story);
      Speech.speak(
        `moralof the story is ${this.props.route.params.story.moral}`
      );

      this.setState({ speakerColor: 'gray' });
    } else {
      Speech.stop();
      this.setState({ speakerColor: 'red' });
    }
  };

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.cardContainer}>
          <Image
            source={images[this.props.route.params.story.preview_Image]}
            style={styles.storyImage}></Image>

          <View style={styles.titleContainer}>
            <Text style={styles.storyTitleText}>
              {this.props.route.params.story.title}
            </Text>
            <View style={{ position: 'absolute', right: 20, top: -5 }}>
              <TouchableOpacity onPress={this.initiateSpeak}>
                <Ionicons
                  name={'volume-high'}
                  size={RFValue(30)}
                  color={this.state.speakerColor}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.storyAuthorText}>
              {this.props.route.params.story.author}
            </Text>
            <Text style={styles.descriptionText}>
              {this.props.route.params.story.story}
            </Text>
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.likeButton}>
              <Ionicons name={'heart'} size={RFValue(30)} color={'white'} />
              <Text style={styles.likeText}>{this.props.route.params.story.likes}</Text>
            </View>
          </View>
        </View>
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
  storyAuthorText: {
    fontSize: RFValue(18),
    fontFamily: 'Bubblegum-Sans',
    color: 'white',
  },
  descriptionText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: 13,
    color: 'white',
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
