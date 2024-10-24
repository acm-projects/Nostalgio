import {Text,View} from "react-native"
import { Link } from "expo-router"
import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';

 export default function TabOneScreen() {
  return (
    <View style={styles.container}>

      <View style={styles.row}>
        <View style={styles.pic}>
          <Image
            style={styles.tinylogo}
            source={{
              uri: 'https://media.gettyimages.com/id/939108006/photo/portrait-of-cute-girl.jpg?s=612x612&w=gi&k=20&c=RTL5VfCQHqztrgG329LcVF0s5aBhBwHxiSczq-EZhfs=',
            }}
          />
        </View>
        <View style={styles.pocd}>
          <Text style={styles.poc}>katieee_5</Text>
          <Text style={styles.pec}>Katie Thompson</Text>
        </View>
        <Pressable onPress={() => {}} style={styles.button}>
          <Text style={styles.text01}>Follow</Text>
        </Pressable>
      </View>

  
      <View style={styles.row}>
        <View style={styles.pic}>
          <Image
            style={styles.tinylogo}
            source={{
              uri: 'https://qph.cf2.quoracdn.net/main-qimg-57da7be6b26910c58e4c9c97de6114bc.webp',
            }}
          />
        </View>
        <View style={styles.pocd}>
          <Text style={styles.poc}>Tom65_Ricks</Text>
          <Text style={styles.pec}>Tom Ricks</Text>
        </View>
        <Pressable onPress={() => {}} style={styles.button}>
          <Text style={styles.text01}>Follow</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        <View style={styles.pic}>
          <Image
            style={styles.tinylogo}
            source={{
              uri: 'https://declutterthemind.com/wp-content/uploads/traitshappypeople.jpg',
            }}
          />
        </View>
        <View style={styles.pocd}>
          <Text style={styles.poc}>Haeliy902_Wang</Text>
          <Text style={styles.pec}>Haeliy Wang</Text>
        </View>
        <Pressable onPress={() => {}} style={styles.button}>
          <Text style={styles.text01}>Follow</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        <View style={styles.pic}>
          <Image
            style={styles.tinylogo}
            source={{
              uri: 'https://community.thriveglobal.com/wp-content/uploads/2018/01/Happy_guy.jpg?resize=1080,627',
            }}
          />
        </View>
        <View style={styles.pocd}>
          <Text style={styles.poc}>Haden434_Watts</Text>
          <Text style={styles.pec}>Hadden Watts</Text>
        </View>
        <Pressable onPress={() => {}} style={styles.button}>
          <Text style={styles.text01}>Follow</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        <View style={styles.pic}>
          <Image
            style={styles.tinylogo}
            source={{
              uri: 'https://images.squarespace-cdn.com/content/v1/5811246737c581e3d863f020/1514670194571-9YWHQITTW2PJ2M4RMZFY/Happiest+person+in+the+world%21.jpg?format=1000w',
            }}
          />
        </View>
        <View style={styles.pocd}>
          <Text style={styles.poc}>Christie_C</Text>
          <Text style={styles.pec}>Christine Cooper</Text>
        </View>
        <Pressable onPress={() => {}} style={styles.button}>
          <Text style={styles.text01}>Follow</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        <View style={styles.pic}>
          <Image
            style={styles.tinylogo}
            source={{
              uri: 'https://personalexcellence.co/files/girl-smiling2.jpg',
            }}
          />
        </View>
        <View style={styles.pocd}>
          <Text style={styles.poc}>Beth_12</Text>
          <Text style={styles.pec}>Beth Rogers</Text>
        </View>
        <Pressable onPress={() => {}} style={styles.button}>
          <Text style={styles.text01}>Follow</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        <View style={styles.pic}>
          <Image
            style={styles.tinylogo}
            source={{
              uri: 'https://media.istockphoto.com/id/1455764286/photo/celebration-black-woman-and-excited-person-showing-happiness-and-winner-feeling-winning.jpg?s=612x612&w=0&k=20&c=N-dauzi4f7w0_gR1WnF4OKDj1Q3U7E-N1pQTyg00Db0=',
            }}
          />
        </View>
        <View style={styles.pocd}>
          <Text style={styles.poc}>Nikki_5</Text>
          <Text style={styles.pec}>Nikki Jones </Text>
        </View>
        <Pressable onPress={() => {}} style={styles.button}>
          <Text style={styles.text01}>Follow</Text>
        </Pressable>
      </View>




    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', 
    marginBottom: 20,
    width: 350,
    height: 80,
  },
  poc: {
    marginBottom: 6,
    fontWeight: 'bold',
  },
  pec: {
    marginBottom: 6,
    color:'gray',
  },
  pocd: {
    marginLeft: 10, 
    flex: 1, 
  },
  tinylogo: {
    width: 60, 
    height: 60,
    borderRadius: 30, 
  },
  text01: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 18,
  },
  button: {
    width: 90, 
    height: 50, 
    backgroundColor: '#6a5acd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pic: {
    marginRight: 10, 
  },
});




