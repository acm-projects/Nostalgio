import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Image, Button, Modal, ImageBackground, FlatList, ViewToken } from "react-native";

import React, { useState, useRef, useEffect, useCallback } from "react";
import MapView, { Callout, MapMarkerProps, Marker, MapViewProps} from "react-native-maps";
import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import CustomCallout from "@/components/CustomCallout";
import Ionicons from '@expo/vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import DatePicker from 'react-native-modern-datepicker';
import Pagination from "@/components/Pagination";
import {markers, MarkerWithMetadata} from '@/data/recommended';

import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';


export default function TabOneScreen() {

  //stopwatch stuff
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef: { current: NodeJS.Timeout | null } = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
      intervalRef.current = id;
    }
    return () => {
      clearInterval(intervalRef.current as NodeJS.Timeout);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {
    //let days = Math.floor(elapsedTime / 24);
    //let remainder = elapsedTime % 24
    //let hours = Math.floor(remainder);
    //let minutes = Math.floor(60 * (remainder - hours));
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);

    return `${hours}:${minutes}:${seconds}`;
  }


  //start stop button
  const StartTripTimer = () => {
    return (
      <>
        <View style={styles.button}>
          <Text style={styles.startTrip}>Start Trip</Text>
            <FontAwesome6
              name="play"
              size={20}
              color="white"
              style={{ right: 55}}
            />
          </View>
      </>
    );
  };

  const EndTripTimer = () => {
    return (
      <>
        <View style={styles.buttonEnd}>
          <Text style={styles.startTrip}>
            End Trip        <Text style={styles.timer}>{formatTime()}</Text>
          </Text>
              <FontAwesome6
                name="stop"
                size={22}
                color="white"
                style={{ right: 55}}
              />
        </View>
      </>
    );
  };


  const [status, setStatus] = useState(false);

 
  //location
  const LOCATION_TASK_NAME = 'background-location-task';
  const [errorMsg, setErrorMsg] = useState<any| null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [coordinates, setCoordinates] = useState<{lat: null | number , lon : null | number}>({lat: null, lon: null});


  function requestPermissions(){

    useEffect(() => {
      (async () => {
        const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
        if (foregroundStatus === 'granted') {
          const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
          if (backgroundStatus === 'granted') {
            await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
              accuracy: Location.Accuracy.Balanced,
            });
            let userLocation = await Location.getCurrentPositionAsync({});
            setLocation(userLocation);
            //setLocation(userLocation);
            /*setCoordinates({
              ...coordinates,
              "latitude": location.coords.latitude,
              "longitude": location.coords.longitude
            });*/
          }
        }
      })();
    }, [coordinates.lat]);
    return(
      <View style={styles.startTrip}></View>
    );
  };

  console.log(location?.coords.latitude)
  
  //console.log("Lo" + location);
  

  TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
    if (error) {
      setErrorMsg('Permission to access location was denied');
      // Error occurred - check `error.message` for more details.
      return;
    }
    if (data) {
      const { locationBackground }: any = data;
      var arr = new Array();
      //doing this to store the latitudes and longitude of background and then find where it was majority 
      //to render location for playlist
      arr.push([locationBackground.coords.latitude, locationBackground.coords.longitude]);
      // do something with the locations captured in the background
    }
  });
  
  


  /*const testRec = () => {
    const [currentIndex, setCurrentIndex] = useState(1);

    return(
      <View style={styles.recommended}>
        {markers.map((marker, index) => {
          return(
            <View key={index}>
              {currentIndex === index}
               <ImageTest marker={marker} index={index}></ImageTest>
            </View>
          )
        })}
      </View>
    )
  }*/
  
  const renderMarkers = () => {
    const [openModal, setOpenModal] = useState(false);
  

    const [activeDotIndex, setActiveDotIndex] = useState(0);

    const onViewableItemsChanged = ({viewableItems} : {viewableItems: ViewToken[];
    }) => {
      if(viewableItems[0].index !== undefined && 
          viewableItems[0].index !== null)
          {
        setActiveDotIndex(viewableItems[0].index);
        //console.log(viewableItems[0].index);
      }
    };


    const viewabilityConfig ={
      itemVisiblePercentThreshold: 50,
    }

    const viewabilityConfigCallbackPairs = useRef([
      {viewabilityConfig, onViewableItemsChanged}
    ]);

    return markers.map((item, index) => {
      return (
          <Marker
            key={index}
            coordinate={{
                latitude: 41.877495,
                longitude: -87.656607
            }}
          >
            <Pressable onPress={() => setOpenModal(true)}>
              <View style={styles.circle}>
                <View style={styles.circleInner}></View>
              </View>
            </Pressable>
            
            <Modal visible={openModal} transparent={true}>
          
                
                  <View key={index}>
                    {activeDotIndex === index &&
                    <CustomCallout marker={item} index={index}/>}
                    <Pressable onPress={() => setOpenModal(false)}>
                      <Ionicons 
                        name="close" 
                        size={24} 
                        color="white" 
                        top={378}
                        left={35}
                        />
                    </Pressable>
                  </View>
               
            </Modal>
            
          </Marker>
      );
    });
  };
  /*<FlatList
                    data={markers}
                    horizontal={true}
                    bounces={false}
                    pagingEnabled={true}
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({item, index}) =>{
                      return <CustomCallout marker={item} index={index}/>
                    }}
                  ></FlatList>*/
/*<View style={styles.simple}>
                    <Pagination paginationIndex={activeDotIndex}/>
                  </View>*/


  /*const renderMarkers = () => {
    const [openModal, setOpenModal] = useState(false)
    
    const [activeDotIndex, setActiveDotIndex] = useState(0);
    const carous = useRef();

    /*const itemRender = ({item, index} : {item: any, index: any}) => {
      return (
              <View style={styles.container}>
                <Image
                    source={{
                      uri: item.imageUrl,
                      //uri: '../../assets/images/dallas.png'
                    }}
                    resizeMode="cover"
                    style={styles.images}
                ></Image>
              </View>
        );
    };*/

    /*return markers.map((marker, index) => {
      return (
          <Marker
            key={index}
            coordinate={{
                latitude: 41.877495,
                longitude: -87.656607
            }}
          >
            <Pressable onPress={() => setOpenModal(true)}>
              <View style={styles.circle}>
                <View style={styles.circleInner}></View>
              </View>
            </Pressable>
            
            <Modal visible={openModal} transparent={true}>
              <View key={index}>

              </View>
            </Modal>
            
          </Marker>
      );
    });
  };*/

  
  /*
  after PRessable
  <Modal visible={openModal} transparent={true}>
              <View key={index}>
                
                <View style={styles.rectangleOverlay}>

                  <Pressable onPress={() => setOpenModal(false)}>
                    <Ionicons 
                      name="close" 
                      size={24} 
                      color="white" 
                      top={378}
                      left={35}
                      />
                  </Pressable>
                </View>
              </View>
            </Modal>
  */

  const today = new Date();
  //const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'YYYY/MM/DD')

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('2023/02/08');
  

  function handleOnLongPress (){
    setOpen(!open);
  }

  function handleChange (propDate: React.SetStateAction<string>){
    setDate(propDate)
  }
  
  

  //actual mapview
  return (
    <View style={styles.container}>
      {requestPermissions()}
      <MapView
        style={styles.map}
        initialRegion={{
          //needs to be based off of current location
          latitude: 41.877495,
          longitude: -87.656607,
          latitudeDelta: 30,
          longitudeDelta: 30,
        }}
        //showsUserLocation = {true}
        showsMyLocationButton = {true}
        //rener markers belowt his
      >
        {renderMarkers()} 
        <Marker coordinate={{ latitude: 32.887218, longitude: -96.75004 }}>
          <View style={styles.number}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontFamily: "Unbounded_400Regular",
                fontSize: 11,
                left: 3,
              }}
            >
              3
            </Text>
          </View>
          <Image
            source={require("../../assets/images/dallas.png")} //idk how to fix
            style={styles.image}
          />
        </Marker>
        <Pressable
          onPress={() => {
            setStatus(!status);
            isRunning ? reset() : start();
          }} onLongPress={handleOnLongPress}
        >
          {status ? <EndTripTimer /> : <StartTripTimer />}
        </Pressable>
        <Modal
          animationType="slide"
          transparent={true}
          visible={open}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker
                mode='calendar'
                //minimumDate={startDate}
                selected={date}
                onDateChange={handleChange}
              />

            </View>
          </View>

        </Modal>
      </MapView>
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

  },

  simple:{
    flex: 1
  },

  recommended:{
      backgroundColor: "#3a0ca3",
      width: (screenWidth * 0.9),
      height: 160,
      flexDirection: "row",
      borderRadius: 30,
      overflow: "hidden",
      top: '100%',
      left: 20,
  },

  wrapper:{},

  startTrip: {
    position: "absolute",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Unbounded_400Regular",
    color: 'white',
    left: 55,

  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },

  map: {
    width: "100%",
    height: "100%",
    fontFamily: "Unbounded_400Regular",
  },
  image: {
    height: 50,
    width: 50,
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 1,
  },
  number: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: "#4361ee",
    top: 10,
    right: 2,
    zIndex: 1,
    elevation: 50
  },

  button: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 174,
    height: 36,
    paddingVertical: 5,
    paddingHorizontal: 32,
    borderRadius: 20,
    backgroundColor: "#4361ee",
    left: "30%",
    top: 10,
  },

  buttonEnd: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 174,
    height: 44,
    paddingVertical: 5,
    paddingHorizontal: 32,
    borderRadius: 20,
    backgroundColor: "#7209B7",
    left: "30%",
    top: 10,
  },

  timer: {
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "Unbounded_400Regular",
    left: 55,
    zIndex: -100,
    lineHeight: 10
  },

  calendar: {
    width: 200,
    height: 200,
    backgroundColor: "#4361ee",
  },

  circle: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    backgroundColor: "white",
  },
  circleInner: {
    left: 2.5,
    top: 2.5,
    width: 17,
    height: 17,
    borderRadius: 18 / 2,
    backgroundColor: "#4361ee",
  },

  rectangleOverlay: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  },

  centeredView:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },

  modalView:{
    margin:20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  images:{
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    width: 97,
    height: 97,
    marginTop: 40,
    left: 30
  },
});
