import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Image, Button, Modal, ImageBackground, FlatList, ViewToken, ViewStyle, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "expo-router";
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
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
//import Pagination from "@/components/Pagination";
import {markers, MarkerWithMetadata} from '@/data/recommended';
import { PlaylistMarker } from "@/data/playlistMarker";

import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { LocationObject, LocationObjectCoords } from "expo-location";
import PlaylistTile from "@/components/PlaylistTile";
import Carousel, {Pagination} from "react-native-snap-carousel";
import axios from "axios";
import CalendarPicker from "react-native-calendar-picker";
import { Link, useRouter } from "expo-router";
import { songs } from "@/data/songs";
import BottomSheet from "@gorhom/bottom-sheet";
import Calendar from "@/app/mapModal";


export const defaultLo: Location.LocationObject = 
  {
    coords: {
        accuracy: null,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
        latitude: 32.9857,
        longitude: -96.7502
    },
    timestamp: 0
  }



const screenWidth = Dimensions.get("window").width;
const userId = "0428c428-a051-7098-6a7e-3b6cfa6d9417";

export default function TabOneScreen() {
  
  //location
  const LOCATION_TASK_NAME = 'background-location-task';
  const [errorMsg, setErrorMsg] = useState<any | null>(null);
  const [location, setLocation] = useState(defaultLo);


  function requestCurrentLocationPermission(){
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        //const lastKnownPosition = await Location.getLastKnownPositionAsync();

        let location = await Location.getCurrentPositionAsync(); 
        if(location === undefined){
          setLocation(location)
        }else{
          setLocation(location);
        }        

      })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }


  return(
    <View style={styles.startTrip}></View>
  );

}


//console.log("Lo" + location);

 /*function requestPermissions(){

    useEffect(() => {
      (async () => {
        const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
        if (foregroundStatus === 'granted') {
          const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
          if (backgroundStatus === 'granted') {
            await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
              accuracy: Location.Accuracy.Balanced,
            });
            let location = await Location.getCurrentPositionAsync(); 
            if(location === undefined){
              setLocation(location)
            }else{
              setLocation(location);
            }   
          }
          else{
            setErrorMsg('Permission to access location was denied');
            return;
          }
        }
        else{
          setErrorMsg('Permission to access location was denied');
          return;
        }
      })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
    }

    return(
      <View style={styles.startTrip}></View>
    );
  };*/

  
  //console.log("Lo" + location);
  

  /*TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
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
  });*/
  
  //get current listening endpoints
  const [userListening, setUserListening] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
/*
  useEffect(() => {
    const currentPlayingTrack = async () => {
      try {
        const response = await fetch(
          `https://5ogc232v73.execute-api.us-east-1.amazonaws.com/dev/users/${userId}/spotify/currently-playing`
        );
        const data = await response.json();
        //console.log("Raw JSON data:", data);
        setUserListening(data);

        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Not currently listening to a song:", error);
        setLoading(false);
      }
    };
    currentPlayingTrack();
  }, []);

  function UpdateLocation() {
    console.log(`Uploading location`);
    console.log(`{ "lat": ${location.coords.latitude}, "lon": ${location.coords.longitude}, "userId": ${userId}, ${userListening}}`)
    const updateListeningLocation = async () => {
      try {
          const uploadResponse = await fetch(
            ` https://5ogc232v73.execute-api.us-east-1.amazonaws.com/dev/listening-history/store`,
            {
              method: "POST",
              body: `{ "lat": ${location.coords.latitude}, "lon": ${location.coords.longitude}, "userId": ${userId}, ${userListening}}`,
            }
          );
          if (!uploadResponse.ok) {
            throw new Error("Failed to upload location update");
          }
        } catch (error) {
          //console.error("Error updating location:", error);
          //alert("Please try again.");
        }
      };
      updateListeningLocation();
  }

  const PeriodicFunctionComponent = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      const intervalId = setInterval(() => {
        // Your periodic function logic here
        setCount((prevCount) => prevCount + 1);
        console.log('Function is running periodically:', count);
        if(count > 1){
          UpdateLocation();
        }
      }, 5000); // Runs every 5 seconds
      // Clean up the interval on component unmount
      return () => clearInterval(intervalId);
    }, [count]); // Re-runs the effect when 'count' changes
  };

  PeriodicFunctionComponent();*/

 /* async function fetchRecommendations(userId : string, lat : number, lon : number) {
    const url = `https://5ogc232v73.execute-api.us-east-1.amazonaws.com/dev/users/${userId}/suggestions/location?lat=${lat}&lon=${lon}`;
    //`https://6p6xrc3hu4.execute-api.us-east-1.amazonaws.com/dev/users/${userId}/suggestions/location?lat=${lat}&lon=${lon}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch recommendations: ${response.statusText}`);
      }
      const data = await response.json();
      if (data.message === "Successfully generated song suggestions") {
        return data.recommendations;
      } else {
        console.warn("Unexpected response message recs:", data.message);
        return [];
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      return []; // Return an empty array on error
    }
  }*/


  //add badges
  const sendBadgeData = async( userId: string, longitude: number, latitude: number) => {
    const API_URL = "https://6p6xrc3hu4.execute-api.us-east-1.amazonaws.com/dev/badges";
    try{
      const response = await axios.post(API_URL, {
        userId,
        latitude,
        longitude
      },{
        headers:{
          'Content-Type' : 'application/json',
        },
      });
      console.log('Badge data sent successfully:', response.data);
    } catch(error){
      console.error('Error sending location data:', error);
    }
  };


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
     //sendBadgeData("testID",  location.coords.longitude,  location.coords.latitude)
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
    //if schedules start write schedules: with start date
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
   //{sendBadgeData("testID", location.coords.longitude, location.coords.latitude)}
   const EndTripTimer = () => {
    //if shcedules date instead of formatTime write scheduled: with end date
     return (
       <>
   
         <View style={styles.buttonEnd}>
           <Text style={styles.startTrip}>
             End Trip  <Text style={styles.timer}>{formatTime()}</Text>
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

   async function fetchMemories(userId : string) {
    const url = `https://5ogc232v73.execute-api.us-east-1.amazonaws.com/dev/memories/${userId}`
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch memories: ${response.statusText}`);
      }
      const data = await response.json();
      //console.log('***** RESPONSE JSON*******', data);
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }


  function memoriesMarker(playlists : any[]) : PlaylistMarker[]{
    return playlists.map((playlist) => {
      const city = playlist[1].city;
      const image = playlist[1].art;

      return{
        city,
        image
      };
    });
  };

  async function getMems(){
    const mems = await fetchMemories(userId);
    return memoriesMarker(mems);
  }

  //let mem = getMems();
  //console.log(mem)
  //const [memories, setMemories] = useState<PlaylistMarker[]>([]);
  //setMemories
  getMems().then((mems) => console.log("Mems" + mems));

  /*const renderMarkers = () => {
    return playlists.map((item, index) => {
      return(
        <View key={index}>
          <PlaylistTile marker={item} index={index}></PlaylistTile>
        </View>
      )
    })
  };*/
  
  /*async function getMarkers() {
    const recommendations = await musicSuggestions();
    console.log(recommendations);
  }
    getMarkers()*/

  //const [recommendation, setRecommendation] = useState<any>(null);

  /*function mapRecommendations(recommendations : any[]) : MarkerWithMetadata[]{
    return recommendations.map((recommendation) => {
      const title = recommendation.track.album.name;
      const description = recommendation.track.artistIds.join(", ");
      const imageUrl = recommendation.track.album.images[0].url;

      return{
        title,
        description,
        imageUrl
      };
    });
  }*/

  //const rec = mapRecommendations(songs);
  //console.log(rec);

  
  /*async function getRecs() : Promise<MarkerWithMetadata[]>{
    const songs = await fetchRecommendations(userId, 32.7768, -96.7969);
    //const recommendations = await songs.json();
    return mapRecommendations(songs)
  }*/

  
  /*const [songRec, setSongRec] = useState<MarkerWithMetadata[]>([]);
  const fetchSong = () => {
    getRecs().then((fetchedSong) => setSongRec(fetchedSong));
  }*/
  
 /* useEffect(() => {
      getRecs().then((fetchedSong) => setSongRec(fetchedSong));
  }, []);*/


  
  
  //getRecs().then((songRec) => console.log(songRec));
  //getRecs()
 
  
  

  function renderRecommended(){
    //console.log(recommendation)
    const [openModal, setOpenModal] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    /*const [songRec, setSongRec] = useState<MarkerWithMetadata[]>([]);
    const fetchSong = async () => {
      const fetchedSong = await getRecs();
      setSongRec(fetchedSong);
    };*/


    const MyCarousel = ({data, index} : any) => {
      const _renderItem = ({item, index} : any) => (
          <View>
            <CustomCallout marker={item} index={index}></CustomCallout>
            <Pressable onPress={() => setOpenModal(false)}>
                      <Ionicons 
                        name="close" 
                        size={24} 
                        color="white" 
                        top={360}
                        left={40}
                        />
            </Pressable>
          </View>
        )
          
        return(
          <Carousel
            data={data}
            renderItem={_renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            layout={'default'}
            onSnapToItem={(activeIndex) => setActiveIndex(activeIndex)}
          ></Carousel>
        )
      }

      return markers.map((item : any, index : any) => {
        return (
            <Marker
              key={index}
              coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude
              }}
            >
              <Pressable onPress={() => setOpenModal(true)}>
                <View style={styles.circle}>
                  <View style={styles.circleInner}></View>
                </View>
              </Pressable>
              
              <Modal visible={openModal} transparent={true} onRequestClose={() => setOpenModal(false)}>
                  <View key={index} style={styles.rectangleOverlay}>
                      <MyCarousel data={markers} index={index}></MyCarousel>
                  </View>
              </Modal>
            </Marker>
      );
    });
  };
/*
<Pagination 
                        dotsLength={songRec.length}
                        activeDotIndex={activeIndex}
                        dotStyle={{
                          width: 8,
                          height: 8,
                          borderRadius: 8,
                          marginHorizontal: 1,
                          backgroundColor: "white",
                          bottom: 345
                        }}
                      ></Pagination>*/

function handleLongPress(){
  router.push('/mapModal')
}
    
const router = useRouter();
const [status, setStatus] = useState(false);

  //actual mapview
  return (
    <View style={styles.container}>
      {requestCurrentLocationPermission()}
      <MapView
        style={styles.map}
        initialRegion={{
          //needs to be based off of current location
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 30,
          longitudeDelta: 30,
        }}
        //showsUserLocation = {true}
        //showsMyLocationButton = {true}
        //rener markers belowt his
      >
   
        {renderRecommended()}
      

        <TouchableOpacity
          onPress={() => {
              setStatus(!status);
              isRunning ? reset() : start();
          }} onLongPress={handleLongPress} activeOpacity={0.9}
        >
          {status ? <EndTripTimer /> : <StartTripTimer />}
        </TouchableOpacity>
      </MapView>
    </View>
  );
}
//onLongPress={() => router.push('/mapModal')}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

  },

  overlay:{
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(114, 9, 183, 0.3)'
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
  modalContent:{
    width:1,
    height: 2
  },
  title:{
    fontWeight: "bold",
    fontFamily: "Unbounded_400Regular",
    fontSize: 16,
    color: 'white',
    paddingVertical: 2,
  },

  titleContainer:{
    flex: 1,
    overflow: 'hidden',
    marginLeft: 45,
    width: 200,
    marginTop: 40,
  },
 
  
});


