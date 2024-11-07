import {StyleSheet, Text, View, Image, Dimensions, Pressable} from 'react-native'
import React from 'react'
import {ImageSliderType} from '@/location/SliderData'
import { MovingText } from './MovingText';

type Props = {
    item: ImageSliderType;
    index: number;
}

const SliderItem = ({item, index}: Props) => {
    return (
        <View>
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
      </View>
    )
}

/*const SliderItem = ({item, index}: Props) => {
    return (
        <View style={styles.itemContainer}>
            <Image source={{uri: item.imageUrl}} style={{width: 300, height: 500}}/>
            <Text>{item.title}</Text>
        </View>
    )
}*/

const screenWidth = Dimensions.get("window").width;
export default SliderItem;
const styles = StyleSheet.create({
    itemContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
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
        left: 30,
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
        marginTop: 3
      },
    
});
