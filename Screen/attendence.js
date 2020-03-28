import React, { useState, useEffect } from 'react';
import firebase from 'react-native-firebase';
import { View, Text, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity, ScrollView } from 'react-native';
const { width, height } = Dimensions.get('window');

const Attendence = ()=> {
  const [drawerClass, setDrawerClass] = useState();
  const [selectClass, setSelectClass] = useState("Select Class");
  const [studentBool, setStudentBool] = useState(false);
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
    return <ScrollView style={{flex: 1,backgroundColor:'black', flexDirection:'row',flexWrap:'wrap'}}>
        <View style={{width, height:150, flexDirection:"row", flexWrap:'wrap'}}>
           <Image style={{width:100,height:100,borderRadius:50,margin:20 , paddingTop:50    , backgroundColor:'orange'}}source={require('../Assets/student.png')}/>
           <Text style={{fontSize:20,marginTop:50, color: '#ffff'}}>{studentSelected.studentName}</Text>
        </View>
        
       <View style = {{width:width, backgroundColor:"#34495e",flexDirection:"row", justifyContent:'space-around', flexWrap:'wrap',borderTopEndRadius:30, borderTopStartRadius:30, paddingTop:20 }}>
       
        <Text style={{fontSize:20,marginTop:10, color: '#ffff'}}>ROLL NO - {studentSelected.rollNo}</Text>
        
      
      
       </View>
       <View style={{width:width, backgroundColor:"#34495e" ,padding: 15}}>
         <Text style={{fontSize:20,fontWeight:"900", color:'#ffff'}}>Month Attendence - </Text>
         <Text style={{fontSize:20,fontWeight:"900", color:'#ffff'}}>March - {studentSelected.march} </Text>
         <Text style={{fontSize:20,fontWeight:"900", color:'#ffff'}}>April - {studentSelected.apiril} </Text>
         <Text style={{fontSize:20,fontWeight:"900", color:'#ffff'}}>May - {studentSelected.may} </Text>
         <Text style={{fontSize:20,fontWeight:"900", color:'#ffff'}}>June - {studentSelected.june} </Text>
         <Text style={{fontSize:20,fontWeight:"900", color:'#ffff'}}>July - {studentSelected.July} </Text>
         <Text style={{fontSize:20,fontWeight:"900", color:'#ffff'}}>August - {studentSelected.august} </Text>
         <Text style={{fontSize:20,fontWeight:"900", color:'#ffff'}}>September - {studentSelected.september} </Text>
         <Text style={{fontSize:20,fontWeight:"900", color:'#ffff'}}>October - {studentSelected.october} </Text>
         <Text style={{fontSize:20,fontWeight:"900", color:'#ffff'}}>November - {studentSelected.november} </Text>
         <Text style={{fontSize:20,fontWeight:"900", color:'#ffff'}}>December - {studentSelected.december} </Text>
         <Text style={{fontSize:20,fontWeight:"900", color:'#ffff'}}>January - {studentSelected.january} </Text>
         <Text style={{fontSize:20,fontWeight:"900", color:'#ffff'}}>february - {studentSelected.february} </Text>
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
          db.ref('attendence'+'/'+item.Class).once('value').then((snap)=>{
              console.log('subjects', snap.val())
              if(!snap.val()){
                setStudentData(null)
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
export default Attendence;
