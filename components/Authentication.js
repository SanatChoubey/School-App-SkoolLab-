import React, { useState,useEffect } from 'react';
import { StyleSheet, BackHandler, Text, View, Dimensions } from 'react-native';
import {Card, Input, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'react-native-firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('screen');


const AuthScreen = (props) => {
  const [pNumber, setNumber]= useState(null)
  const handleBackButtonClick = () => {
    props.navigation.goBack(null);
    return false;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  }, []);
  const signIn = (props) => {
    const code = '+91'
    firebase.auth().signInWithPhoneNumber('+919770003301')
    .then(confirmResult => {console.log(confirmResult)})
    .catch(e=>{console.log(e)})
    // props.navigation.push('MainScreen');
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          width: width - 20,
          backgroundColor: 'white',
          textAlign: 'center',
        }}>
        <Icon
          style={{marginLeft: width / 2 - 20}}
          name="lock"
          size={50}
          color="#ED4C67"
        />
        <Input
          placeholder="Phone Number"
          onChangeText={(e)=>{setNumber(e)}}
          leftIcon={<Icon name="phone" size={25} />}
        />
        <View style={{marginTop:20,marginLeft:10, marginRight:10}}>
          <Button onPress={signIn} title="Send Otp" />
          <TouchableOpacity onPress={()=>{props.navigation.navigate('MainScreen')}}>
            <Text style={{fontSize:20,marginTop:10, color:'lightblue', marginLeft:'40%'}}>Skip</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AuthScreen;
