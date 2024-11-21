import React from "react";
import { View, StyleSheet, Dimensions, Image, Text, Pressable } from "react-native";
import { Callout, Marker } from "react-native-maps";
import { PlaylistMarker } from '@/data/playlistMarker';

import {MovingText} from "@/components/MovingText";


const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;




const PlaylistTile: React.FC<{
  marker: PlaylistMarker;
  index: number;
}> = ({ marker }) => {
  return (
    <Marker coordinate={marker.coordinate}>
    {marker.tripNum &&
    <View style={styles.number}>
      <Text style={styles.numberText}>
        {marker.tripNum}
      </Text>
    </View>}
    <Image
      source={{uri: marker.image}} 
      style={styles.image}
    />
  </Marker>
  );
};
/*<Marker coordinate={{ latitude: 41.877495, longitude: -87.656607 }}>
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
            source={require("../../assets/images/chicago.png")} //idk how to fix
            style={styles.image}
          />
        </Marker>*/

const styles = StyleSheet.create({
    image: {
        height: 50,
        width: 50,
        borderColor: "white",
        borderRadius: 10,
        borderWidth: 1,
      },
      number: {
        width: 17,
        height: 17,
        borderRadius: 17 / 2,
        backgroundColor: "#4361ee",
        top: 10,
        right: 2,
        zIndex: 1,
        elevation: 50
      },
      numberText:{
        color: "white",
        fontWeight: "bold",
        fontFamily: "Unbounded_600SemiBold",
        fontSize: 11,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        textAlign: 'center'
      }
  
});

export default PlaylistTile;