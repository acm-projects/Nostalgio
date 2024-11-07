import {Image, StyleSheet, Text, Dimensions, View} from 'react-native';
import React from 'react';
import { MarkerWithMetadata } from '@/data/recommended';



const RecImage: React.FC<{
    marker: MarkerWithMetadata;
    index: number;
  }> = ({ marker, index }) => {
    return (
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
         </View>
        </View>
    )}

export default RecImage;
const screenWidth = Dimensions.get("window").width;
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
    image:{
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 15,
        width: 97,
        height: 97,
        marginTop: 40,
        left: 30
      },
    })

