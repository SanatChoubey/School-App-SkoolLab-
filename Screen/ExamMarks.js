import React, { useState, useEffect } from 'react';
import firebase from 'react-native-firebase';
import { View, Text, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity, ScrollView } from 'react-native';
const { width, height } = Dimensions.get('window');

const ExamMarks = () => {
    const [drawerClass, setDrawerClass] = useState();
    const [selectClass, setSelectClass] = useState("Select Class");
    const [studentBool, setStudentBool] = useState(false);
    const [allExamData, setAllExamData] = useState(null);
    const [examstype, setExamstype] = useState(null);
    const [examtypebool, setExamstypeBool] = useState(true);
    const [selectedExamType, setSelectedExamType] = useState(null);
    const [studentData, setStudentData] = useState(null);
    const [studentSelected, setStudentSelected] = useState(null);
    const [studentSelectedBool, setStudentSelectedBool] = useState(false);
    const db = firebase.database();
    useEffect(()=>{
      db.ref('Class').once('value').then((snap)=>{
          const objremover = Object.values(snap.val())
          setDrawerClass(objremover)
      })
  },[])
  const examMarkfunc = () => {
    if(examtypebool&&examstype){
        return (
          <FlatList
              style={{flex: 1}}
              data={examstype}
              renderItem = { ({item}) => {
               
                return (<TouchableOpacity 
                  onPress={()=>{
                  
                    console.log(item)
                    setSelectedExamType(item)
                    setExamstypeBool(false)

                  }}
                
                style={{height:100,padding: 10,borderRadius: 10,backgroundColor:'#fab1a0', margin:10 , flexDirection:"row" }}>
                   
                  
                  <View style={{ flex:1, flexWrap:"wrap", flexDirection:"row"}}>
                <Text style={{color:"#2d3436", padding:15, fontSize: 18}}>Exam Name - {item}</Text>
                 
                  </View>
              
                </TouchableOpacity>)
              }}
            />
        )
      }
      if(selectedExamType){
        return (
        <FlatList
              style={{flex: 1}}
              data={allExamData[selectedExamType]}
              renderItem = { ({item}) => {
               
                const keys = Object.keys(item)
                const indexofName = keys.indexOf("studentName")
                const indexofSno = keys.indexOf('Sno')
                keys.splice(indexofSno,1);
                 keys.splice(indexofName,1);
                 console.log('key',keys)

                return (<TouchableOpacity 
                  onPress={()=>{
                    

                  }}
                
                style={{padding: 10,borderRadius: 10,backgroundColor:'#fab1a0', margin:10 , flexDirection:"row" }}>
                   
                  
                  <View style={{ flex:1, flexWrap:"wrap", flexDirection:"column"}}>
                    <Text style={{color:"#2d3436", padding:15, fontSize: 20, fontWeight:""}}> {item.studentName}</Text>
                    {
                      keys.map(keyData=>(
                      <Text style={{color:"#2d3436", padding:15, fontSize: 18}}> {keyData}- {item[keyData]}</Text>
                      ))
                    }
                  </View>

              
                </TouchableOpacity>)
              }}
            />
        )
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
            db.ref('exams'+'/'+item.Class).once('value').then((snap)=>{
                
                if(!snap.val()){
                  setExamstype(null)
                  setAllExamData(null)
                }
                
                if(snap.val()){
                  const objrem= Object.values(snap.val())
                  const examsKey = Object.keys(snap.val())
                  //console.log('subjects', snap.val(), examsKey)
                  setExamstype(examsKey)
                  setAllExamData(snap.val())
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
        <View style={{width, height:30, backgroundColor:''}}>
          <Text style={{color:'#ffff', fontSize: 15}}> {selectClass}</Text>
    </View>
        <View style={{width, height:30, backgroundColor:'lightblue'}}>
          <Text style={{color:'#ffff', fontSize: 15}}> {selectedExamType?selectedExamType:"select exam"}</Text>
    </View>
    <View style={{flex: 1,backgroundColor:'white'}}>
  
        {
          
        examMarkfunc()
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
  })
export default ExamMarks;