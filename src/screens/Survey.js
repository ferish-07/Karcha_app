import { StyleSheet, Text, View ,FlatList, Dimensions, Animated, TouchableOpacity} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment'

export default function Survey() {
    const [currentIndex,setCurrentIndex]=useState(0)
    const [currenCategory,setCurrentCategory]=useState("")
    const flatlistRef=useRef()
const data={
    "INTERPERSONAL_SKILLS":[
        {
            question_id:1,
            title:"IS 1"
        },
        {
            question_id:2,
            title:"IS 2"

        },
        {
            question_id:3,
            title:"IS 3"

        },
        {
            question_id:4,
            title:"IS 4"

        }
    ],
    "ORGANIZATIONAL_SKILLS":[
        {
            question_id:1,
            title:"OS 1"

        },
        {
            question_id:2,
            title:"OS 2"

        },
        {
            question_id:3,
            title:"OS 3"

        },
        {
            question_id:4,
            title:"OS 4"

        }
    ],
    "CREATIVE_SKILLS":[  {
        question_id:1,
        title:"CS 1"

    },
    {
        question_id:2,
        title:"CS 2"

    },
    {
        question_id:3,
        title:"CS 3"

    },
    {
        question_id:4,
        title:"CS 4"

    }],
   
}
const [startTime, setStartTime] = useState(null);
const [sectionTimesArray,setSectionTimeArray]= useState([])
  const [endTime, setEndTime] = useState(null);
const getTimeDifference = (startTime, endTime) => {
    let time1 = moment(startTime);
    let time2 = moment(endTime);
    let final_time = moment.duration(time2.diff(time1));
    console.log("DIFFFFFFIN DATW", final_time)
    return `${final_time.hours()}:${final_time.minutes()}:${final_time.seconds()}`;
  };
const [flatListData,setFlatListData]= useState([])
const [newFlat,setNewFlat]= useState([])
const [datas,setDAtas]=useState({})
const nextButtonPressed=()=>{
    // console.log("CURRENT CATEGORY", currenCategory)
    
        datas[currenCategory].map((i, ind)=>{
            sectionTimesArray.map((item2, index)=>{
if(ind== index){
if(i.duration){

    let time = i.duration;
let dates=moment(new Date()).format("YYYY-MM-DD")
console.log("Ferosj", dates)
let time1 = moment(new Date( dates +'T' + time + 'Z'))
console.log("timeq", time1)
    let time2 = moment(new Date())
let final_time=moment.duration(time1.add(time2))
console.log("23456543456543456545]6545463456", new Date(),final_time, time1, time2)
    i.duration=`${final_time.hours()}:${final_time.minutes()}:${final_time.seconds()}`
}
else{
    i.duration=  getTimeDifference(startTime,new Date())

}
}
            })
        })
    


    console.log("Ferishhhh Ashish Modiii",datas)

}

useEffect(() => {
    // console.log(first)
    setFlatListData(Object.keys(data))
    setDAtas(data)
    // setStartTime(new Date())
    setSectionTimeArray(new Array(Object.keys(data).length).fill("0"))

}, [])
useEffect(()=>{
setStartTime(new Date())
},[newFlat])
const _renderItem=(item, index)=>{
    if(currentIndex == index){
        setCurrentCategory(item)
        setNewFlat(datas[item])
    }

return(

    <View style={{width:Dimensions.get("window").width, alignItems:'center'}}>
<Text style={{color:"blue", fontSize:24}}>{item}</Text>
        </View>
)
}

  return (
    <>
    <View style={{flex:1,}}>
      {/* <Text>Survey</Text> */}
      <Animated.FlatList
      style={{flex:1}}
      ref={flatlistRef}
       data={flatListData}
       horizontal
       scrollEnabled={false}
       showsHorizontalScrollIndicator={false}
       renderItem={({item,index})=> _renderItem(item, index) }
      
      />

      <View style={{ flex:2, alignItems:'center'}}>
{newFlat.map((item)=>{
    return(
        <View style={{margin:10, borderWidth:0.5, padding:10, borderColor:"grey", borderRadius:5}}>
            <Text>{item.title}</Text>
            </View>
    )
})}
      </View>

    </View>
<View style={{width:"100%", flexDirection:'row', justifyContent:'space-evenly', padding:20}}>
    {currentIndex !=0?

<TouchableOpacity onPress={()=> 
    {flatlistRef.current.scrollToIndex({
        index:parseInt(currentIndex)-1,
        animated:true})
    setCurrentIndex(currentIndex-1)
    }
    }>
        <Text>Previous</Text>
    </TouchableOpacity>:null
}
{currentIndex != flatListData.length-1?

    <TouchableOpacity onPress={()=>{

        flatlistRef.current.scrollToIndex({
            index:parseInt(currentIndex)+1,
            animated:true})
    
            setCurrentIndex(currentIndex+1)

            nextButtonPressed()
    } 
    }>
        <Text>Next</Text>
    </TouchableOpacity>:null
}
</View>
    <TouchableOpacity style={styles.touvh}>
<View >

<Text style={{color:'white', fontSize:20, fontWeight:'bold'}}>i</Text>
</View>
    </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
    touvh:{
        backgroundColor:'blue',
         position:"absolute", 
         width:50, 
         height:50, 
         borderRadius:50, 
         justifyContent:'center',
         alignItems:'center',
         right:0,
         bottom:50,
        
        }
})