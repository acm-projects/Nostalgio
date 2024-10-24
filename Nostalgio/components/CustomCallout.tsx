import React from "react";
import { View, StyleSheet, Dimensions, Image, Text, Pressable } from "react-native";
import { Callout } from "react-native-maps";
import { MarkerWithMetadata } from '../app/(tabs)/index';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const CustomCallout: React.FC<{
  marker: MarkerWithMetadata;
}> = ({ marker }) => {
  return (
    <Callout tooltip>
      <View>
        <View style={styles.container}>
          <Image
            source={{
              uri: marker.imageUrl,
              //uri: '../../assets/images/dallas.png'
            }}
            resizeMode="cover"
            style={styles.image}
          ></Image>
          <View style={{ paddingHorizontal: 16, paddingVertical: 8, flex: 1 }}>
            <Text style={{
                fontFamily: "Unbounded_400Regular", 
                marginRight: 20, 
                fontSize: 16, 
                color: 'white',}}
                > Recommended</Text>
            <Text
              style={{
                fontWeight: "bold",
                fontFamily: "Unbounded_400Regular",
                fontSize: 16,
                color: 'white',
                paddingVertical: 2,
                marginRight: 20,
                marginTop: 14,
                left: 30,
              }}
            >
              {marker.title}
            </Text>

            <Text style={{
                fontFamily: 'Unbounded_400Regular', 
                color: 'white', 
                left: 30,
                paddingVertical: 1,
                }}>
                {marker.description}</Text>
            <Pressable>
                <View style={styles.button}>
                <Text style={{
                    fontFamily: 'Unbounded_400Regular',
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: 'white'
                }}>Add to Trip</Text>
                </View>
            </Pressable>
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
    //overflow: "hidden",
    top: (screenHeight * 0.5) / 2
  },
  triangle: {
    left: (screenWidth * 0.8) / 2 - 10,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 20,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: "black",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
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
    marginTop: 16,
  },

  image:{
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    width: 97,
    height: 97,
    marginTop: 40,
    left: 30
  }
});

export default CustomCallout;

