import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Image, Text, Pressable, TouchableOpacity } from "react-native";
import { Callout } from "react-native-maps";
import { MarkerWithMetadata } from '@/data/recommended';
import {MovingText} from "@/components/MovingText";


const screenWidth = Dimensions.get("window").width;


const CustomCallout: React.FC<{
  marker: MarkerWithMetadata;
  index: number;
}> = ({ marker }) => {
  const [status, setStatus] = useState(false);

  const AddTrip = () => {
    return (
      <>
        <View style={styles.button}>
          <Text style={styles.addButton}>Add to Trip</Text>
        </View>
      </>
    );
  };

  const Added = () => {
    return (
      <>
        <View style={styles.addedButton}>
          <Text style={styles.addButton}>Added</Text>
        </View>
      </>
    );
  };
  return (
    <Callout tooltip={true}>
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
            <View>  
              <View style={styles.titleContainer}>
                <MovingText 
                    style={styles.title} 
                    text={marker.title ?? ''}
                    animationThreshold={25}
                />
                <Text style={{
                    fontFamily: 'Unbounded_400Regular', 
                    color: 'white', 
                    }}
                    numberOfLines={1}>
                    {marker.description}
                </Text>
              
              <TouchableOpacity activeOpacity={0.9} onPress={() => {setStatus(!status)}}>
                    {status ? <Added /> : <AddTrip />}  
              </TouchableOpacity>
              </View>
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
            <View>
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
    marginBottom: 15,
    shadowColor: '#292929',
    shadowOpacity: 25,
    shadowOffset:{
      width: 0,
      height: 1
    },
    shadowRadius: 1
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
    color: 'white',
  },
  addedButton:{
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 137,
    height: 32,
    borderRadius: 20,
    backgroundColor: '#4c4c4c',
    left: '12%',
    marginTop: 15,
    marginBottom: 15,
    shadowColor: '#292929',
    shadowOpacity: 25,
    shadowOffset:{
      width: 0,
      height: 1
    },
    shadowRadius: 1

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
    marginTop: 41,
  },

});

export default CustomCallout;

