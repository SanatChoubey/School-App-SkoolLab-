import React, {useEffect, useState} from 'react';
import firebase from 'react-native-firebase';
import {View,Text, StyleSheet, Dimensions, FlatList, TouchableOpacity} from 'react-native';
const { width, height } = Dimensions.get('window');

const Subject = () => {
    const [drawerClass, setDrawerClass] = useState();
    const [subject, setSubject] = useState();
    const [selectClass, setSelectClass] = useState("Select Class");
    const db = firebase.database();
    useEffect(()=>{
        db.ref('Class').once('value').then((snap)=>{
            const objremover = Object.values(snap.val())
            setDrawerClass(objremover)
        })
    },[])
    const showSubject = () => {
      if(subject){
        return <FlatList
          style={{flex: 1}}
          data={subject}
          renderItem = { ({item}) => (
            <View style={{height:50,padding: 10,borderRadius: 10,backgroundColor:'#fab1a0', margin:10 , flexDirection:"row" ,justifyContent:'space-between',alignItems:"center"}}>
                <Text style={{color:"#2d3436", fontSize: 18}}>SubjectCode - {item.subjectNumber}</Text>
              <Text style={{fontSize: 18}}>  {item.subject}</Text>
            </View>
          )}
        />

      }else{
        return <Text> </Text>
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
              db.ref('Subject'+'/'+item.Class).once('value').then((snap)=>{
                  console.log('subjects', snap.val())
                  if(!snap.val()){
                    setSubject(null)
                  }
                  const objrem= Object.values(snap.val())
                  if(objrem){
                    const sortedData = objrem.sort((a,b)=>{
                      return a.subjectNumber-b.subjectNumber
                    })
                    console.log(sortedData)
                    setSubject(sortedData)
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
            showSubject()
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
export default Subject;