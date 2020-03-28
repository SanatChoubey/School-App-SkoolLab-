import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage'
import PushNotification from 'react-native-push-notification';

import firebase from 'react-native-firebase';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoadingScreen from './components/LoadingScreen';
import MainScreen from './components/MainPage';
import AuthScreen from './components/Authentication';
import StudentProfile from './Screen/studentProfile';
import MessageByClass from './Screen/messageByClass';
import Academic from './Screen/academicCalender';
import Subject from './Screen/subject';
import Attendence from './Screen/attendence';
import ExamMarks from './Screen/ExamMarks';
import YearlyPlan from './Screen/yearlyPlan';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './redux/saga/index';
import rootReducer from './redux/reducer/index';

const App = () => {
  const db = firebase.database();
  const stackNav = createStackNavigator({
    homes: {
      screen: LoadingScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'SchoolApp',
      }),
    },
    profile: {
      screen: StudentProfile,
    },
    MessageByClass: {
      screen: MessageByClass
    },
    "Academic Calender": {
      screen: Academic
    },
    "Yearly Plan": {
      screen: YearlyPlan 
    },
    "ExamMarks": {
      screen: ExamMarks
    },
    "Attendence": {
      screen: Attendence
    },
    "Subject": {
      screen: Subject
    },
    Auth: {
      screen: AuthScreen,
      navigationOptions: {
        title: 'phoneAuth',
        headerLeft: () => null,
      },
    },
    MainScreen: {
      screen: MainScreen,
      navigationOptions: {
        title: 'SchoolApp',
        headerLeft: () => null,
      },
    },
  },{
    initialRouteName: "Auth"
  });

  const ScreenContainer = createAppContainer(stackNav);
  const pushasync = async () => {
    PushNotification.configure({
      onRegister: function (token) {
        // console.log('TOKEN:', token);
      },
      onNotification: function (notification) { },
    });
  };
  const LocalStorage = async () => {
    try {
      firebase
          .messaging()
          .requestPermission()
          .then(() => {
            console.log('request  granted');
            firebase
              .messaging()
              .getToken()
              .then(fcmToken => {
                if (fcmToken) {
                  console.log('token ha', fcmToken);
                  db.ref('notification/'+fcmToken).set({
                    token : fcmToken
                  })
                } else {
                  // user doesn't have a device token yet
                  console.log('token nahi  mila ha');
                }
              });
          })
          .catch(error => {
            // console.log('request Not granted');
          });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    LocalStorage();

    pushasync();
    console.log('working');
  }, []);
  const sagaMiddleware = createSagaMiddleware();
  const stores = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  return (
    <Provider store={stores}>
      <>
        <ScreenContainer />
      </>
    </Provider>
  );
};

export default App;
