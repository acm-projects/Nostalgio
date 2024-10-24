
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import {Image} from 'react-native';

import React, { useState, useRef, useEffect} from 'react';
import MapView, { Callout, MapMarkerProps, Marker } from 'react-native-maps';
import { Pressable, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Unbounded_400Regular, Unbounded_600SemiBold, useFonts } from '@expo-google-fonts/unbounded';
import CustomCallout from '@/components/CustomCallout';
import Swipeable from 'react-native-gesture-handler/Swipeable';

//import * as TaskManager from 'expo-task-manager';
//import * as Location from 'expo-location';
//import CurrentLocation from '@/location/CurrentLocation';
//import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export type MarkerWithMetadata = {
  title?: MapMarkerProps["title"];
  description?: MapMarkerProps["description"];
  imageUrl?: string
};



export default function TabOneScreen() {
  //stopwatch stuff
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  //const intervalIdRef = useRef<ReturnType<typeof setInterval> |null>(null);
  const intervalRef: {current : NodeJS.Timeout | null} = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {

    if(isRunning){
      const id = setInterval(() => {
          setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
      intervalRef.current = id;
    }
    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    }
  }, [isRunning]);

  function start(){
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop(){
    setIsRunning(false);
  }

  function reset(){
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime(){
    //let days = Math.floor(elapsedTime / 24);
    //let remainder = elapsedTime % 24
    //let hours = Math.floor(remainder);
    //let minutes = Math.floor(60 * (remainder - hours));
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / (1000) % 60);
    //let milliseconds = Math.floor((elapsedTime % 1000) /10);
    return `${hours}:${minutes}:${seconds}`;

  }
  
  function recommendedSwipe(){
  }

  const StartTripTimer = () => {
    return <><View style={styles.button}><Text style={styles.startTrip}>Start Trip</Text><FontAwesome6 name="play" size={17} color="white" style={{ right: 55 }} /></View></>
  }

  const EndTripTimer = () =>{
    return <><View style={styles.buttonEnd}><Text style={styles.startTrip}>End Trip <Text style={styles.timer}>{formatTime()}</Text></Text>
    <FontAwesome6 name="stop" size={19} color="white"  style={{right:55}}/></View></>
  }

  const Calendar = () => {
    return <><View style={styles.calendar}></View></>
  }

  const [status, setStatus] = useState(false);

  //recommended song marker
  const markers: MarkerWithMetadata[] = [
    {
      title: 'End of Beginning',
      //imageUrl: '../../assets/images/dallas.png',
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Djo_-_End_of_Beginning_single_cover.png/220px-Djo_-_End_of_Beginning_single_cover.png",
      description: 'Djo'
    },
    {
      title: 'Chicago Freestyle (feat. Giveon)',
      description: 'Drake, Giveon',
      imageUrl: "https://i.scdn.co/image/ab67616d0000b273bba7cfaf7c59ff0898acba1f"
    }
  ];

  const renderMarkers = () => {
    return markers.map((marker, index) =>{
      return(
        <Marker 
          key={index}
          coordinate={{
            latitude: 41.877495,
            longitude: -87.656607}}
        >
          <View style={styles.circle}>
            <View style={styles.circleInner}>
            </View>
          </View>
          <CustomCallout marker={marker}></CustomCallout>
        </Marker>
      );
    });
  };
  


  //actual mapview
  return (
    <View style={styles.container}>
        <MapView 
          style={styles.map}
          initialRegion={{ //needs to be based off of current location
            latitude: 41.877495,
            longitude: -87.656607,
            latitudeDelta: 30,
            longitudeDelta: 30,
          }}>
            {renderMarkers()}
            <Marker
              coordinate={{latitude: 32.887218, longitude: -96.750040}}>
              <View style={styles.number}>
                <Text
                  style={{color: 'white', fontWeight: 'bold',fontFamily: 'Unbounded_400Regular', fontSize: 11, left: 3}}>3
                </Text>
              </View>
              <Image
                source={require('../../assets/images/dallas.png')} //idk how to fix
                style={styles.image}/>
            </Marker>
              <Pressable onPress={() => {setStatus(!status); isRunning ? reset() : start();}}>{status ? <EndTripTimer/> : <StartTripTimer/>}</Pressable>
        </MapView>
    </View>
  );
}
//<Pressable onPress={() => {setStatus(!status); }}>{status ? <EndTripTimer/> : <StartTripTimer/>}</Pressable>
//<Pressable onPress={() => {isRunning ? stop() : start()}}></Pressable>
//<Text style={styles.title}>Start Trip</Text>
//<Text style={styles.startTrip}>{formatTime()}</Text>

      //<View>
        //    <Pressable style={styles.button}>
          //    <Text style={styles.title}>Start Trip</Text>
           // </Pressable>
        //</View>
        //<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//<EditScreenInfo path="app/(tabs)/index.tsx" />
/*<Marker coordinate = {{latitude: 41.877495, longitude: -87.656607}} 
              title='Recommended Songs' description='new song'>
                <View style={styles.circle}>
                  <View style={styles.circleInner}>
                  </View>
                </View>
              </Marker>*/

const screenWidth = Dimensions.get("window").width;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  startTrip: {
    position: 'absolute',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Unbounded_400Regular',
    left: 55,

  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },

  map: {
    width: '100%',
    height: '100%',
    fontFamily: 'Unbounded_400Regular',
  },
  image:{
    height: 50,
    width: 50,
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
  },
  number:{
    width:15,
    height:15,
    borderRadius:15/2,
    backgroundColor: '#4361ee',
    top:10,
    right: 2,
    zIndex: 1
  },

  button:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 174,
    height: 36,
    paddingVertical: 5,
    paddingHorizontal: 32,
    borderRadius: 20,
    backgroundColor: '#4361ee',
    left: "30%",
    top: 10
  },

  buttonEnd:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 174,
    height: 44,
    paddingVertical: 5,
    paddingHorizontal: 32,
    borderRadius: 20,
    backgroundColor: '#7209B7',
    left: "30%",
    top: 10,
  },
  
  timer:{
    position: 'absolute',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'Unbounded_400Regular',
    left: 55,
  },

  calendar:{
    width: 200,
    height: 200,
    backgroundColor: '#4361ee'
  },

  circle:{
    width: 22,
    height: 22,
    borderRadius: 22/2,
    backgroundColor: 'white'
  },
  circleInner:{
    left: 2.5,
    top: 2.5,
    width: 17,
    height: 17,
    borderRadius: 18/2,
    backgroundColor: '#4361ee',
  },

  rectangleOverlay:{
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    opacity: 0.5,
    color: 'purple'
  }

});



