import React from "react";
import { View, StyleSheet, Dimensions, Image, Text, Pressable } from "react-native";
import { Callout } from "react-native-maps";
import { MarkerWithMetadata } from '@/data/recommended';
import status from '../app/(tabs)/index';
import MapView,{MapViewProps} from "react-native-maps";
import Swiper from 'react-native-swiper';


import {MovingText} from "@/components/MovingText";
import Carousel from "react-native-snap-carousel";


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;



const CustomCallout2: React.FC<{
  marker: MarkerWithMetadata;
  index: number;
}> = ({ marker, index }) => {
  return (
    <Callout tooltip={true}>
      <View>
        <View style={styles.container}>
            <View>
              <Pressable>
                  <View style={styles.button}>
                    <Text style={styles.addButton}>Add to Trip</Text>
                  </View>
              </Pressable>
            </View>
            <View>
              <Text style={{
                      fontFamily: "Unbounded_400Regular", 
                      fontSize: 16, 
                      right: '150%',
                      marginTop: 8,
                      color: 'white',}}
                    > Recommended</Text>
            </View>
        </View>
      </View>
    </Callout>
  );
};

//<View style={styles.triangle}></View>

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3a0ca3",
    width: (screenWidth * 0.9),
    height: 160,
    flexDirection: "row",
    borderRadius: 30,
    overflow: "hidden",
    top: '100%',
    left: 20,
  },
  wrapper:{
    color: "white"
  },
  
  button:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 137,
    height: 32,
    borderRadius: 20,
    backgroundColor: '#4361ee',
    left: '12%',
    marginTop: 15,
    marginBottom: 15
  },

  image:{
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    width: 97,
    height: 97,
    marginTop: 40,
    left: 30
  },

  addButton:{
    fontFamily: 'Unbounded_400Regular',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
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

export default CustomCallout2;
