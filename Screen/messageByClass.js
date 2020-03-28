import React, {useEffect, useState} from 'react';
import firebase from 'react-native-firebase';
import {View,Text, StyleSheet, Dimensions, FlatList, TouchableOpacity} from 'react-native';
const { width, height } = Dimensions.get('window');

const MessageByClass = () => {
  const [drawerClass, setDrawerClass] = useState();
  const [Message, setMessage] = useState();
  const [selectClass, setSelectClass] = useState("Select Class");
  const db = firebase.database();
  useEffect(()=>{
    db.ref('Class').once('value').then((snap)=>{
        const objremover = Object.values(snap.val())
        setDrawerClass(objremover)
    })
},[])
  const showMessagebyclass = ( ) => {
    if(Message){
      return <FlatList
          style={{flex: 1}}
          data={Message}
          renderItem = { ({item}) => {
            const Day = new Date(item.Date).getDate();
            const Month = new Date(item.Date).getMonth() + 1;
            const Year = new Date(item.Date).getFullYear();
            return (<View style={{padding: 10,borderRadius: 10,backgroundColor:'#fab1a0', margin:10 , flexDirection:"column" ,justifyContent:'space-between',}}>
                <Text>{`${Day}/${Month}/${Year}`}</Text>
                {/* <Text style={{color:"#2d3436", fontSize: 18}}> {new Date(item.Date)}</Text> */}
              <Text style={{fontSize: 18}}>  {item.classMsg}</Text>
            </View>)
          }}
        />
    }else{

    }
  }

  return (
    <View style={Styles.container}>
    <View style={Styles.FlatWrapper}>  
  <FlatList
    style={{ width: width,height: 50}}
    horizontal={true}
    data={drawerClass}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => {
            setSelectClass(item.Class)
          db.ref('MesagebyClass'+'/'+item.Class).once('value').then((snap)=>{
              console.log('subjects', snap.val())
              if(!snap.val()){
                setMessage(null)
                // setSubject(null)
              }
              const objrem= Object.values(snap.val())
              if(objrem){
                // const sortedData = objrem.sort((a,b)=>{
                //   return a.subjectNumber-b.subjectNumber
                // })
                // console.log(sortedData)
                // setSubject(sortedData)
                setMessage(objrem)
              }
              
          })
      }}>
        <View
          style={{
            margin: 5, marginTop: 10, width: 150, height: 30, backgroundColor: '#ED4C67', alignItems: 'center',
            justifyContent: 'center', borderRadius: 10
          }}>
          <Text style={{ color: '#ffffff' }}>{item.Class}</Text>
        </View>
      </TouchableOpacity>
    )}
  />
  </View>
  <View style={{width, height:30, backgroundColor:'#34495e'}}>
        <Text style={{color:'#ffff', fontSize: 15}}> {selectClass}</Text>
  </View>
  <View style={{flex: 1,backgroundColor:'white'}}>

      {
        showMessagebyclass()
      }
  </View>
    </View>
  )
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2B52'
  },
  FlatWrapper: {
      width: width,
      height: 50,
  }
});
export default MessageByClass;
