import React from "react";
import { View, StyleSheet, Image, Text} from "react-native";
import { Marker } from "react-native-maps";
import { PlaylistMarker } from '@/data/playlistMarker';


const PlaylistTile: React.FC<{
  marker: PlaylistMarker;
  index: number;
  trips: number;
}> = ({ marker, trips }) => {
  return (
    <Marker coordinate={{latitude: marker.latitude, 
      longitude: marker.longitude}}>
    {trips > 1 &&
      (<View style={styles.number}>
        <Text style={styles.numberText}>
          {trips}
        </Text>
      </View>)}
    <Image
      source={{uri: marker.image}} 
      style={styles.image}
    />
  </Marker>
  );
};


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
        textAlign:'center',
        alignItems: 'center',
        padding: 1,
      }
  
});

export default PlaylistTile;