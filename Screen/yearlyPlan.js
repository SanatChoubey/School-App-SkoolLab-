import React, {useEffect, useState} from 'react';
import firebase from 'react-native-firebase';
import {View,Text, StyleSheet, TouchableOpacity, Dimensions, FlatList} from 'react-native';
const { width, height } = Dimensions.get('window');
const YearlyPlan = () => {
    const [drawerClass, setDrawerClass] = useState();
    const [yearlyData, setYearlyData] = useState(null);
    const [selectClass, setSelectClass] = useState("Select Class");
    const db = firebase.database();
    useEffect(()=>{
        db.ref('Class').once('value').then((snap)=>{
            const objremover = Object.values(snap.val())
            setDrawerClass(objremover)
        })
    },[])
    const showyearlyPlan = () => {
        if(yearlyData) {
            return  <FlatList
            style={{flex: 1}}
            data={yearlyData}
            renderItem = { ({item}) => (
              <View style={{padding: 10,borderRadius: 10,backgroundColor:'#fab1a0', margin:10 , flexDirection:"column" ,justifyContent:'space-between',}}>
                
                <Text style={{fontSize: 24, fontWeight:'bold'}}>{item.subject}</Text>
                <Text style={{fontSize: 18}}> March  - </Text>
                <Text style={{fontSize: 12, color:"#636e72"}}>  {item.March}</Text>
                <Text style={{fontSize: 18}}> April  - </Text>
                <Text style={{fontSize: 12, color:"#636e72"}}>  {item.Apiril}</Text>
                <Text style={{fontSize: 18}}> May  - </Text>
                <Text style={{fontSize: 12, color:"#636e72"}}>  {item.May}</Text>
                <Text style={{fontSize: 18}}> June  - </Text>
                <Text style={{fontSize: 12, color:"#636e72"}}>  {item.June}</Text>
                <Text style={{fontSize: 18}}> July - </Text>
                <Text style={{fontSize: 12, color:"#636e72"}}>  {item.July}</Text>
                <Text style={{fontSize: 18}}> August  - </Text>
                <Text style={{fontSize: 12, color:"#636e72"}}>  {item.August}</Text>
                <Text style={{fontSize: 18}}> September  - </Text>
                <Text style={{fontSize: 12, color:"#636e72"}}>  {item.September}</Text>
                <Text style={{fontSize: 18}}> October  - </Text>
                <Text style={{fontSize: 12, color:"#636e72"}}>  {item.October}</Text>
                <Text style={{fontSize: 18}}> November  - </Text>
                <Text style={{fontSize: 12, color:"#636e72"}}>  {item.November}</Text>
                <Text style={{fontSize: 18}}> December  - </Text>
                <Text style={{fontSize: 12, color:"#636e72"}}>  {item.December}</Text>
                <Text style={{fontSize: 18}}> January - </Text>
                <Text style={{fontSize: 12, color:"#636e72"}}>  {item.January}</Text>
                <Text style={{fontSize: 18}}> Febraury  - </Text>
                <Text style={{fontSize: 12, color:"#636e72"}}>  {item.febraury}</Text>
                

              </View>
            )}
          />
        }else{
            return (
                <View>
                    
                </View>
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
              db.ref('yearlyPlan'+'/'+item.Class).once('value').then((snap)=>{
                  console.log('classess ', snap.val())
                  if(!snap.val()){
                    setYearlyData(null)
                  }
                  const objrem= Object.values(snap.val())
                  if(objrem){
                    // const sortedData = objrem.sort((a,b)=>{
                    //   return a.subjectNumber-b.subjectNumber
                    // })
                    // console.log(sortedData)
                    // setSubject(sortedData)
                    setYearlyData(objrem)

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
            showyearlyPlan()
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
export default YearlyPlan;
