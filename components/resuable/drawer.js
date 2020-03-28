import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';

const { width, heigth } = Dimensions.get('window');
const DrawerArray = [
  
  "Attendence",
  "Subject",
  'See Student Profile',
  'Homework / Message By Class',
  "ExamMarks",
  'Academic Calender',
  "Yearly Plan"
];
const Drawer = (props) => {

  return (
    <View style={Styles.container}>
      <FlatList
        style={{ flex: 1, }}
        horizontal={true}
        data={DrawerArray}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {

            if (item === 'See Student Profile') {
              props.props.navigation.push('profile');
              }
              if (item === 'Academic Calender') {
                props.props.navigation.push("Academic Calender");
              }
              if (item === "ExamMarks") {
                props.props.navigation.push("ExamMarks");
              }
              if (item === 'Homework / Message By Class') {
                props.props.navigation.push("MessageByClass");
              }
              if (item === "Yearly Plan" ) {
                props.props.navigation.push("Yearly Plan");
              }
              if (item === "Attendence" ) {
                props.props.navigation.push("Attendence");
              }
              if (item === "Subject" ) {
                props.props.navigation.push("Subject");
              }
          }}>
            <View
              style={{
                margin: 5, marginTop: 10, width: 150, height: 30, backgroundColor: '#ED4C67', alignItems: 'center',
                justifyContent: 'center', borderRadius: 10
              }}>
              <Text style={{ color: '#ffffff' }}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
const Styles = StyleSheet.create({
  container: {
    width: width,
    height: 50,
  },
});
export default Drawer;
