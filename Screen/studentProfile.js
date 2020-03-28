import React, { useState, useEffect } from 'react';
import firebase from 'react-native-firebase';
// import student from '../Assets/student.png';

import { LineChart, Grid, ProgressCircle, YAxis } from 'react-native-svg-charts'
import { View, Text, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity, ScrollView } from 'react-native';
const { width, height } = Dimensions.get('window');



const Filldata = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
const Yeardata = ['January', 'feburary', 'March', 'Apiril', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const StudentProfile = () => {
  const [drawerClass, setDrawerClass] = useState();
  const [selectClass, setSelectClass] = useState("Select Class");
  const [studentBool, setStudentBool] = useState(false);
  const [studentData, setStudentData] = useState(null);
  const [studentSelected, setStudentSelected] = useState(null);
  const [studentSelectedBool, setStudentSelectedBool] = useState(false);
  const [Ongoing, setOngoing] = useState('');
  const [Msg, setMsg] = useState('');
  const db = firebase.database();
  useEffect(()=>{
    db.ref('Class').once('value').then((snap)=>{
        const objremover = Object.values(snap.val())
        setDrawerClass(objremover)
    })
},[])
const ongoingFunc = () => {
  if(Ongoing){
    
      return Ongoing.map(data=>{
      return <View style={{flexDirection:'row', width, marginTop:15}}>
        <Text style={{color:'#ffff',fontSize:15}}>{data.subject}</Text>
      <Text style={{marginLeft:10,color:'#ffff',fontSize:15}}>{data.Ongoing_Topic}</Text>
      </View>
      })
    
  }else{
    return<Text style={{color:'white'}}>please wait</Text>
  }
}
const onMsgFunc = () => {
  if(Msg){
    
      return Msg.map(data=>{
        // const day = new Date(data.Date).getDate()
        const Day = new Date(data.Date).getDate();
            const Month = new Date(data.Date).getMonth() + 1;
            const Year = new Date(data.Date).getFullYear();
      return <View style={{ width:width-20, marginTop:15,paddingTop:20, height:150, borderRadius:20, margin:10, backgroundColor:'#30336b'}}>
        <Text style={{marginLeft:10,fontSize:15, }}>{Day}/{Month}/{Year}</Text>
      <Text style={{marginLeft:10,color:'#ffff',fontSize:20}}>{data.msg}</Text>
      </View>
      })
    
  }else{
    return<Text style={{color:'white'}}>please wait</Text>
  }
}

const showStudentName = () => {
  if(studentBool && studentData){
    return (
      <FlatList
          style={{flex: 1}}
          data={studentData}
          renderItem = { ({item}) => {
            // const Day = new Date(item.Date).getDate();
            // const Month = new Date(item.Date).getMonth() + 1;
            // const Year = new Date(item.Date).getFullYear();
            return (<TouchableOpacity 
              onPress={()=>{
                setStudentBool(false)
                  setStudentSelected(item)
                  setStudentSelectedBool(true)
              }}
            
            style={{height:100,padding: 10,borderRadius: 10,backgroundColor:'#fab1a0', margin:10 , flexDirection:"row" }}>
                {/* <Text>{`${Day}/${Month}/${Year}`}</Text>
                {/* <Text style={{color:"#2d3436", fontSize: 18}}> {new Date(item.Date)}</Text> */}
              {/* <Text style={{fontSize: 18}}>  {item.classMsg}</Text>  */}
              <View style={{width:50,height:50, borderRadius:25, borderColor:'#ea8685', borderWidth:2}}>
                <Image style={{width:null,height:null ,flex:1}}source={require('../Assets/student.png')}/>
              </View>
              <View style={{ flex:1, flexWrap:"wrap", flexDirection:"row"}}>
              <Text style={{color:"#2d3436", padding:15, fontSize: 18}}>Sno - {item.Sno}</Text>
              <Text style={{color:"#2d3436",padding:15, fontSize: 18}}> {item.studentName}</Text>
              <Text style={{color:"#2d3436", fontSize: 18}}> FatheName - {item.fatherName}</Text>
              </View>
          
            </TouchableOpacity>)
          }}
        />
    )
  }
  if(studentSelected){
    db.ref('onGoing'+'/'+selectClass).once('value').then((snap)=>{
      if(snap.val()){const remover = Object.values(snap.val())
      setOngoing(remover)}
      else{
        setOngoing('')
      }
    })
    db.ref('messageforStudent'+'/'+selectClass+'/'+studentSelected.studentName).once('value').then((snap)=>{
      if(snap.val()){
        const remover = Object.values(snap.val())
        setMsg(remover)
      }else{
        setMsg('')
      }
    })
    return <ScrollView style={{flex: 1,backgroundColor:'black', flexDirection:'row',flexWrap:'wrap'}}>
        <View style={{width, height:150, flexDirection:"row", flexWrap:'wrap'}}>
           <Image style={{width:100,height:100,borderRadius:50,margin:20 , paddingTop:50    , backgroundColor:'orange'}}source={require('../Assets/student.png')}/>
           <Text style={{fontSize:20,marginTop:50, color: '#ffff'}}>{studentSelected.studentName}</Text>
        </View>
        
       <View style = {{width:width, 
        backgroundColor:"#34495e",
        // backgroundColor:"orange",
        height:300,
        flexDirection:"column", justifyContent:'space-around', flexWrap:'wrap',borderTopEndRadius:30, borderTopStartRadius:30,  }}>
       
       <View><Text style={{fontSize:20,marginTop:10, color: '#ffff'}}>ROLL NO - {studentSelected.rollNo}</Text></View> 
       <View><Text style={{fontSize:20,marginTop:10, color: '#ffff'}}>AdminNo - {studentSelected.adminNo}</Text></View> 
       <View><Text style={{fontSize:20,marginTop:10, color: '#ffff'}}>Father Name - {studentSelected.fatherName}</Text></View> 
       <View><Text style={{fontSize:20,marginTop:10, color: '#ffff'}}>Mother Name - {studentSelected.motherName}</Text></View> 
       <View><Text style={{fontSize:20,marginTop:10, color: '#ffff'}}> Dob  - {studentSelected.Dob}</Text></View> 
      
      
       </View>
       <View style={{width:width, backgroundColor:"#34495e"}}>
         <Text style={{fontSize:20,fontWeight:"900", color:'#ffff'}}>On Going Topic in Class</Text>
         {
           ongoingFunc()
         }
       </View>
       <View style={{width:width, backgroundColor:"#34495e"}}>
         <Text style={{fontSize:20,fontWeight:"900", color:'#ffff'}}>Message For {studentSelected.studentName} Parent's </Text>
         {
           onMsgFunc()
         }
       </View>
       <View style={{width:width, backgroundColor:"#34495e"}}>
         <Text style={{fontSize:20,fontWeight:"900", color:'#ffff'}}> Student Progress ( in Months) </Text>
         
         <LineChart
                style={{ height: 200 }}
                data={ Filldata }
                svg={{ stroke: 'rgb(134, 65, 244)' }}
                contentInset={{ top: 20, bottom: 20 }}
            >
                <Grid/>
            </LineChart>
            
      </View>
        
 
    </ScrollView>
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
          db.ref(item.Class).once('value').then((snap)=>{
              console.log('subjects', snap.val())
              if(!snap.val()){
                setStudentData(null)
                setStudentBool(true)
                // setSubject(null)
              }
              const objrem= Object.values(snap.val())
              if(objrem&&snap.val()){
                // const sortedData = objrem.sort((a,b)=>{
                //   return a.subjectNumber-b.subjectNumber
                // })
                // console.log(sortedData)
                // setSubject(sortedData)
                // setMessage(objrem)
                const sortedData = objrem.sort((a,b)=>{
                  return a.Sno-b.Sno
                })
                setStudentBool(true)
                setStudentData(sortedData)
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
  <View style={{flex: 1,backgroundColor:'white'}}>

      {
        // showMessagebyclass()
        showStudentName()
      }
  </View>
    </View>
  );
};
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

export default StudentProfile;
//blue - #192a56,
//orange - #f3a683