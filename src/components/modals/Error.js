import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {View, TouchableHighlight, Dimensions, BackAndroid} from 'react-native';
import { Container, Title, Text, Content, Button, Body, List, ListItem, H1 } from 'native-base';


export default connect()(class errorModal extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      message: props.error,
      hide: props.hide,
    };
    this.dismissModal = this.dismissModal.bind(this);
  }
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.dismissModal();
      Actions.pop();
    });
  }

  dismissModal() {
    this.setState({hide: true});
  }

  render() {
    var {height, width} = Dimensions.get('window');
    return this.state.hide
      ? (
        <View>
        </View>
      )
      : (
        <Button 
        transparent
        onPress={() => {
          this.props.source === 'signup' 
          ? this.props.dispatch({type: 'CLEAR_SIGNUP'})
          : null;
          Actions.pop();
        }}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          height: height,
          width: width,
          borderRadius: -1,
          backgroundColor: 'rgba(155,55,55,0.9)',          
          justifyContent: 'center',
          borderWidth: .2,
          borderColor: 'black'
        }}>
          <Text style={{alignSelf: 'center'}}>{this.state.message}</Text>
        </Button>
      );    
  }
})

