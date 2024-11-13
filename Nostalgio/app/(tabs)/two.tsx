import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Pressable,Image,ScrollView,ImageBackground } from 'react-native';

// Define your tab views

const App = () => {

  return (
    <View style={styles.container2}>
       <View style={styles.container}> 


<ImageBackground
 source={require('../../assets/images/background.png')} 
 style={{flex:1}}

>

   <View style={styles.tinylogo1}>
    <View style={styles.pic}>
  <Image   
     style={styles.tinylogo}
     source= {{ 
        uri: 'https://picsum.photos/seed/picsum/200/300',
     }}
   />
   
   </View>

     <Text  style={styles.text6}>Sanjita Medishetty</Text>
     <Text  style={styles.text7}>San Fransico, California</Text>
   
    </View>

  <Text style={styles.text123}>Badges</Text>
  <ScrollView contentContainerStyle={styles.scrollContainer}>

  


   </ScrollView>
   </ImageBackground>
   </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
   
  },
  pic:
  {
    marginLeft:90,
    marginTop:10,
    backgroundColor:"rgb(0,0,0,0)",
  },
  scrollContainer:
  {
     paddingBottom:700,
  },
    text123:
    {
     fontSize:30,
     color: 'white',
     fontWeight:'bold',
     marginLeft:20,
     marginTop:140,
    },
    container: {
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center', 
    },
    text6:
    {
       marginLeft:60,
       fontSize:18,
       marginTop:15,
       marginBottom:10,
       color:'white',
       backgroundColor:"rgb(0,0,0,0)",
    },
    text7:
    {
       fontSize:12,
       marginLeft:70,
       color:'white',
       backgroundColor:"rgb(0,0,0,0)",
  
    },
    tinylogo:
    {
      width:100,
      height:100,
      borderRadius:50,
      marginTop:0,
      marginBottom:0,
      marginRight:10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:"rgb(0,0,0,0)",
  
    },
    tinylogo1:
    {
      width:300,
      height:50,
      marginTop:50,
      alignSelf:'center',
      backgroundColor:"rgb(0,0,0,0)",
      
  
    },
  
   
    
   
});

export default App;