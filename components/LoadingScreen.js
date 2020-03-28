import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const LoadingScreen = (props) => {
  useEffect(() => {
    props.navigation.navigate('Auth');
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <ActivityIndicator color="blue" />
      </View>
    </View>
  );
};
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 20, height: 20},
    shadowColor: 'orange',
    shadowOpacity: 0.8,
  },
});
