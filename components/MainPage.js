import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  BackHandler,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import Drawer from './resuable/drawer';
import firebase from 'react-native-firebase';
import { Card, Input, Button } from 'react-native-elements';
const { width, height } = Dimensions.get('window');
const MainScreen = props => {
  const [postData, setPostData] = useState(null);
  const pressbackFunct = () => {
    BackHandler.exitApp();
    props.navigation.goBack(null);

    return true;
  };
  const db = firebase.database();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', pressbackFunct);
    db.ref('post')
      .once('value')
      .then(snapdata => {
        console.log('coming from database', snapdata.val());
        const removeobject = Object.values(snapdata.val());
        setPostData(removeobject);
      });
  }, []);
  return (
    <View style={Styles.cointainer}>
      <Drawer props={{...props}} />
      <View style={Styles.Post}>
        <FlatList
          data={postData ? postData : []}
          renderItem={({ item }) => {
            const Day = new Date(item.Date).getDate();
            const Month = new Date(item.Date).getMonth() + 1;
            const Year = new Date(item.Date).getFullYear();
            return (
              <Card title={item.title} containerStyle={{ height: 400 }}>
                <Text>{`${Day}/${Month}/${Year}`}</Text>
                {item.photo ? <Image
                    style={{width: null, height: 250}}
                    source={{uri: item.photo}}
                  /> : <></>}
                <Text>{item.description}</Text>
              </Card>
            );
          }}
        />
      </View>
      <></>
    </View>
  );
};
const Styles = StyleSheet.create({
  cointainer: {
    flex: 1,
    backgroundColor: '#2B2B52',
  },
  
  Post: {
    backgroundColor: '#EAF0F1',
    flex: 1,
  },
});
export default MainScreen;
