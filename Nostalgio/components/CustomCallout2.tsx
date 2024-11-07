import React, {useState, useRef} from "react";
import { View, StyleSheet, Dimensions, Image, Text, Pressable } from "react-native";
import { Callout } from "react-native-maps";
import { MarkerWithMetadata } from '../app/(tabs)/index';
import {MovingText} from "@/components/MovingText";
import Carousel, { Pagination } from 'react-native-snap-carousel';

const screenWidth = Dimensions.get("window").width;
const [activeDotIndex, setActiveDotIndex] = useState(0);
const carous = useRef();

const markers = [
  {
    title: "End of Beginning",
    //imageUrl: '../../assets/images/dallas.png',
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Djo_-_End_of_Beginning_single_cover.png/220px-Djo_-_End_of_Beginning_single_cover.png",
    description: "Djo",
  },
  {
    title: "Chicago Freestyle (feat. Giveon)",
    description: "Drake, Giveon, Future, Playboi Carti",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b273bba7cfaf7c59ff0898acba1f",
  },
];

const itemRender = ({item, index} : {item: any, index: any}) => {
  return (
          <View style={styles.container}>
            <Image
                source={{
                  uri: item.imageUrl,
                  //uri: '../../assets/images/dallas.png'
                }}
                resizeMode="cover"
                style={styles.image}
            ></Image>
          <View>  
              <View style={styles.titleContainer}>
                <MovingText 
                    style={styles.title} 
                    text={item.title ?? ''}
                    animationThreshold={25}
                />
                <Text style={{
                    fontFamily: 'Unbounded_400Regular', 
                    color: 'white', 
                    }}
                    numberOfLines={1}>
                    {item.description}
                </Text>
              
              <Pressable>
                  <View style={styles.button}>
                    <Text style={styles.addButton}>Add to Trip</Text>
                  </View>
              </Pressable>
              </View>
            </View>
          </View>
  )
};

const CustomCallout2 =  () => {
  return (
    <Callout tooltip={true}>
      <View>
        <View style={styles.container}>
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
            < Carousel 
                  //ref={carous}
                  data={markers}
                  renderItem={itemRender}
                  sliderWidth={Dimensions.get('window').width}
                  itemWidth={Dimensions.get('window').width}
                  onSnapToItem={index => setActiveDotIndex(index)}
                ></Carousel>
                <View>
                  <Pagination 
                    //carouselRef={carous}
                    activeDotIndex={activeDotIndex} 
                    dotsLength={2}
                  ></Pagination>
                </View>
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

