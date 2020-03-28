import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

const LoadingCompo = ({navigation}) => {
  return (
    <View>
      <Text>Hellos</Text>
    </View>
  );
};
LoadingCompo.navigationOptions = {
  title: 'Homemm',
};
export default LoadingCompo;
