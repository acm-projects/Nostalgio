import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Pressable,Image,ScrollView,ImageBackground } from 'react-native';

// Define your tab views
const FirstRoute = () => (
  <View style={styles.container2}>
  <ScrollView>
    <View style={styles.row8}>
      <View style={styles.pic}>
        <Image
          style={styles.tinylogo8}
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


    <View style={styles.row8}>
      <View style={styles.pic}>
        <Image
          style={styles.tinylogo8}
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

    <View style={styles.row8}>
      <View style={styles.pic}>
        <Image
          style={styles.tinylogo8}
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

    <View style={styles.row8}>
      <View style={styles.pic}>
        <Image
          style={styles.tinylogo8}
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

    <View style={styles.row8}>
      <View style={styles.pic}>
        <Image
          style={styles.tinylogo8}
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

    <View style={styles.row8}>
      <View style={styles.pic}>
        <Image
          style={styles.tinylogo8}
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

    <View style={styles.row8}>
      <View style={styles.pic}>
        <Image
          style={styles.tinylogo8}
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


    <View style={styles.row8}>
      <View style={styles.pic}>
        <Image
          style={styles.tinylogo8}
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


    <View style={styles.row8}>
      <View style={styles.pic}>
        <Image
          style={styles.tinylogo8}
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

    <View style={styles.row8}>
      <View style={styles.pic}>
        <Image
          style={styles.tinylogo8}
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

    <View style={styles.row8}>
      <View style={styles.pic}>
        <Image
          style={styles.tinylogo8}
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

    <View style={styles.row8}>
      <View style={styles.pic}>
        <Image
          style={styles.tinylogo8}
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

    <View style={styles.row8}>
      <View style={styles.pic}>
        <Image
          style={styles.tinylogo8}
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

    <View style={styles.row8}>
      <View style={styles.pic}>
        <Image
          style={styles.tinylogo8}
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
    </ScrollView>
  </View> 
);

const SecondRoute = () => (
  <View style={styles.container2}>
  <ScrollView>
     <View style={styles.row8}>
       <View style={styles.pic}>
         <Image
           style={styles.tinylogo8}
           source={{
             uri: 'https://media.gettyimages.com/id/939108006/photo/portrait-of-cute-girl.jpg?s=612x612&w=gi&k=20&c=RTL5VfCQHqztrgG329LcVF0s5aBhBwHxiSczq-EZhfs=',
           }}
         />
       </View>
       <View style={styles.pocd}>
         <Text style={styles.poc}>katieee_5</Text>
         <Text style={styles.pec}>Katie Thompson</Text>
       </View>
       <Pressable onPress={() => {}} style={styles.button1}>
         <Text style={styles.text02}>following</Text>
       </Pressable>
     </View>
 
 
     <View style={styles.row8}>
       <View style={styles.pic}>
         <Image
           style={styles.tinylogo8}
           source={{
             uri: 'https://qph.cf2.quoracdn.net/main-qimg-57da7be6b26910c58e4c9c97de6114bc.webp',
           }}
         />
       </View>
       <View style={styles.pocd}>
         <Text style={styles.poc}>Tom65_Ricks</Text>
         <Text style={styles.pec}>Tom Ricks</Text>
       </View>
       <Pressable onPress={() => {}} style={styles.button1}>
         <Text style={styles.text02}>following</Text>
       </Pressable>
     </View>
 
     <View style={styles.row8}>
       <View style={styles.pic}>
         <Image
           style={styles.tinylogo8}
           source={{
             uri: 'https://declutterthemind.com/wp-content/uploads/traitshappypeople.jpg',
           }}
         />
       </View>
       <View style={styles.pocd}>
         <Text style={styles.poc}>Haeliy902_Wang</Text>
         <Text style={styles.pec}>Haeliy Wang</Text>
       </View>
       <Pressable onPress={() => {}} style={styles.button1}>
         <Text style={styles.text02}>following</Text>
       </Pressable>
     </View>
 
     <View style={styles.row8}>
       <View style={styles.pic}>
         <Image
           style={styles.tinylogo8}
           source={{
             uri: 'https://community.thriveglobal.com/wp-content/uploads/2018/01/Happy_guy.jpg?resize=1080,627',
           }}
         />
       </View>
       <View style={styles.pocd}>
         <Text style={styles.poc}>Haden434_Watts</Text>
         <Text style={styles.pec}>Hadden Watts</Text>
       </View>
       <Pressable onPress={() => {}} style={styles.button1}>
         <Text style={styles.text02}>following</Text>
       </Pressable>
     </View>
 
     <View style={styles.row8}>
       <View style={styles.pic}>
         <Image
           style={styles.tinylogo8}
           source={{
             uri: 'https://images.squarespace-cdn.com/content/v1/5811246737c581e3d863f020/1514670194571-9YWHQITTW2PJ2M4RMZFY/Happiest+person+in+the+world%21.jpg?format=1000w',
           }}
         />
       </View>
       <View style={styles.pocd}>
         <Text style={styles.poc}>Christie_C</Text>
         <Text style={styles.pec}>Christine Cooper</Text>
       </View>
       <Pressable onPress={() => {}} style={styles.button1}>
         <Text style={styles.text02}>following</Text>
       </Pressable>
     </View>
 
     <View style={styles.row8}>
       <View style={styles.pic}>
         <Image
           style={styles.tinylogo8}
           source={{
             uri: 'https://personalexcellence.co/files/girl-smiling2.jpg',
           }}
         />
       </View>
       <View style={styles.pocd}>
         <Text style={styles.poc}>Beth_12</Text>
         <Text style={styles.pec}>Beth Rogers</Text>
       </View>
       <Pressable onPress={() => {}} style={styles.button1}>
         <Text style={styles.text02}>following</Text>
       </Pressable>
     </View>
 
     <View style={styles.row8}>
       <View style={styles.pic}>
         <Image
           style={styles.tinylogo8}
           source={{
             uri: 'https://media.istockphoto.com/id/1455764286/photo/celebration-black-woman-and-excited-person-showing-happiness-and-winner-feeling-winning.jpg?s=612x612&w=0&k=20&c=N-dauzi4f7w0_gR1WnF4OKDj1Q3U7E-N1pQTyg00Db0=',
           }}
         />
       </View>
       <View style={styles.pocd}>
         <Text style={styles.poc}>Nikki_5</Text>
         <Text style={styles.pec}>Nikki Jones </Text>
       </View>
       <Pressable onPress={() => {}} style={styles.button1}>
         <Text style={styles.text02}>following</Text>
       </Pressable>
     </View>
 
     <View style={styles.row8}>
       <View style={styles.pic}>
         <Image
           style={styles.tinylogo8}
           source={{
             uri: 'https://media.gettyimages.com/id/939108006/photo/portrait-of-cute-girl.jpg?s=612x612&w=gi&k=20&c=RTL5VfCQHqztrgG329LcVF0s5aBhBwHxiSczq-EZhfs=',
           }}
         />
       </View>
       <View style={styles.pocd}>
         <Text style={styles.poc}>katieee_5</Text>
         <Text style={styles.pec}>Katie Thompson</Text>
       </View>
       <Pressable onPress={() => {}} style={styles.button1}>
         <Text style={styles.text02}>following</Text>
       </Pressable>
     </View>
 
 
     <View style={styles.row8}>
       <View style={styles.pic}>
         <Image
           style={styles.tinylogo8}
           source={{
             uri: 'https://qph.cf2.quoracdn.net/main-qimg-57da7be6b26910c58e4c9c97de6114bc.webp',
           }}
         />
       </View>
       <View style={styles.pocd}>
         <Text style={styles.poc}>Tom65_Ricks</Text>
         <Text style={styles.pec}>Tom Ricks</Text>
       </View>
       <Pressable onPress={() => {}} style={styles.button1}>
         <Text style={styles.text02}>following</Text>
       </Pressable>
     </View>
 
     <View style={styles.row8}>
       <View style={styles.pic}>
         <Image
           style={styles.tinylogo8}
           source={{
             uri: 'https://declutterthemind.com/wp-content/uploads/traitshappypeople.jpg',
           }}
         />
       </View>
       <View style={styles.pocd}>
         <Text style={styles.poc}>Haeliy902_Wang</Text>
         <Text style={styles.pec}>Haeliy Wang</Text>
       </View>
       <Pressable onPress={() => {}} style={styles.button1}>
         <Text style={styles.text02}>following</Text>
       </Pressable>
     </View>
 
     <View style={styles.row8}>
       <View style={styles.pic}>
         <Image
           style={styles.tinylogo8}
           source={{
             uri: 'https://community.thriveglobal.com/wp-content/uploads/2018/01/Happy_guy.jpg?resize=1080,627',
           }}
         />
       </View>
       <View style={styles.pocd}>
         <Text style={styles.poc}>Haden434_Watts</Text>
         <Text style={styles.pec}>Hadden Watts</Text>
       </View>
       <Pressable onPress={() => {}} style={styles.button1}>
         <Text style={styles.text02}>following</Text>
       </Pressable>
     </View>
 
     <View style={styles.row8}>
       <View style={styles.pic}>
         <Image
           style={styles.tinylogo8}
           source={{
             uri: 'https://images.squarespace-cdn.com/content/v1/5811246737c581e3d863f020/1514670194571-9YWHQITTW2PJ2M4RMZFY/Happiest+person+in+the+world%21.jpg?format=1000w',
           }}
         />
       </View>
       <View style={styles.pocd}>
         <Text style={styles.poc}>Christie_C</Text>
         <Text style={styles.pec}>Christine Cooper</Text>
       </View>
       <Pressable onPress={() => {}} style={styles.button1}>
         <Text style={styles.text02}>following</Text>
       </Pressable>
     </View>
 
     <View style={styles.row8}>
       <View style={styles.pic}>
         <Image
           style={styles.tinylogo8}
           source={{
             uri: 'https://personalexcellence.co/files/girl-smiling2.jpg',
           }}
         />
       </View>
       <View style={styles.pocd}>
         <Text style={styles.poc}>Beth_12</Text>
         <Text style={styles.pec}>Beth Rogers</Text>
       </View>
       <Pressable onPress={() => {}} style={styles.button1}>
         <Text style={styles.text02}>following</Text>
       </Pressable>
     </View>
 
     <View style={styles.row8}>
       <View style={styles.pic}>
         <Image
           style={styles.tinylogo8}
           source={{
             uri: 'https://media.istockphoto.com/id/1455764286/photo/celebration-black-woman-and-excited-person-showing-happiness-and-winner-feeling-winning.jpg?s=612x612&w=0&k=20&c=N-dauzi4f7w0_gR1WnF4OKDj1Q3U7E-N1pQTyg00Db0=',
           }}
         />
       </View>
       <View style={styles.pocd}>
         <Text style={styles.poc}>Nikki_5</Text>
         <Text style={styles.pec}>Nikki Jones </Text>
       </View>
       <Pressable onPress={() => {}} style={styles.button1}>
         <Text style={styles.text02}>following</Text>
       </Pressable>
     
     </View>
     </ScrollView>
   </View>
 
);

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'Followers' },
    { key: 'second', title: 'Following' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      labelStyle={styles.label}
    />
  );

  return (
    <View style={styles.container2}>
       <View style={styles.container}> 


<ImageBackground
 source={require('../../assets/images/Colors22.png')} 
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


   <View style={styles.down}>


   <View style={styles.modalBackground1}>
      <Button title="15 friends" color={'#3A0CA3'} onPress={() => setModalVisible(true)} />
      </View>
      

      <View style={styles.pic1}></View>
      <View style={styles.modalBackground1}>
      <Button title="Following" color={'#3A0CA3'}  onPress={() => setModalVisible(true)} />
      </View>

      
   
   </View>


   

   
  <Text style={styles.text123}>  
                                    Badges</Text>
  <ScrollView contentContainerStyle={styles.scrollContainer}>

  <View style={styles.back}>
  


   <View style={styles.row}>
  
      <View style={styles.back}>
       <Image
         style={styles.tinylogo9}
         source={{
           uri: 'https://www.extraspace.com/blog/wp-content/uploads/2018/11/living-in-dallas-tx-670x450.jpg',
         }}
       />
     <Text style={styles.text90}>Dallas</Text>
     </View>

     <View style={styles.stat1}></View>

     <View style={styles.stat}>
 
    <Text style={styles.cen}>9.24.15</Text>

      <Text style={styles.first}>Dallas</Text>
      <Text style={styles.first}>Texas,USA</Text>
       <Text style={styles.first}>3 trips</Text>

    <Text style={styles.last}>Last Visted</Text>
    <Text style={styles.lastText}>8.15.23</Text>

 </View>
     

   </View>
   <View style={styles.row}>

   <View style={styles.back}>
       <Image
         style={styles.tinylogo9}
         source={{
           uri: 'https://www.extraspace.com/blog/wp-content/uploads/2018/11/living-in-dallas-tx-670x450.jpg',
         }}
       />
     <Text style={styles.text90}> Dallas</Text>
     </View>
    
   
     <View style={styles.stat}>
 
    <Text style={styles.cen}>9.24.15</Text>

      <Text style={styles.first}>San Jose</Text>
      <Text style={styles.first}> California, USA</Text>
       <Text style={styles.first}>3 trips</Text>

    <Text style={styles.last}>Last Visted</Text>
    <Text style={styles.lastText}>8.15.23</Text>

 </View>
     

   </View>

   <View style={styles.row}>
    
      <View style={styles.back}>
       <Image
         style={styles.tinylogo9}
         source={{
           uri: 'https://www.extraspace.com/blog/wp-content/uploads/2018/11/living-in-dallas-tx-670x450.jpg',
         }}
       />
     <Text style={styles.text90}>Austin</Text>
     </View>

     <View style={styles.stat}>
 
    <Text style={styles.cen}>9.24.15</Text>

      <Text style={styles.first}>Austin</Text>
      <Text style={styles.first}>Texas,USA</Text>
       <Text style={styles.first}>3 trips</Text>

    <Text style={styles.last}>Last Visted</Text>
    <Text style={styles.lastText}>8.15.23</Text>

 </View>
     

   </View>
   <View style={styles.row}>
    
      <View style={styles.back}>
       <Image
         style={styles.tinylogo9}
         source={{
           uri: 'https://www.extraspace.com/blog/wp-content/uploads/2018/11/living-in-dallas-tx-670x450.jpg',
         }}
       />
     <Text style={styles.text90}> New York </Text>
     </View>

     <View style={styles.stat}>
 
    <Text style={styles.cen}>9.24.15</Text>

      <Text style={styles.first}>New York</Text>
      <Text style={styles.first}> New York ,USA</Text>
       <Text style={styles.first}>3 trips</Text>

    <Text style={styles.last}>Last Visted</Text>
    <Text style={styles.lastText}>8.15.23</Text>

 </View>
     

   </View>

   <View style={styles.row}>
    
      <View style={styles.back}>
       <Image
         style={styles.tinylogo9}
         source={{
           uri: 'https://www.extraspace.com/blog/wp-content/uploads/2018/11/living-in-dallas-tx-670x450.jpg',
         }}
       />
     <Text style={styles.text90}>Houston</Text>
     </View>

     <View style={styles.stat}>
 
    <Text style={styles.cen}>9.24.15</Text>

      <Text style={styles.first}>Houston </Text>
      <Text style={styles.first}>Texas,USA</Text>
       <Text style={styles.first}>3 trips</Text>

    <Text style={styles.last}>Last Visted</Text>
    <Text style={styles.lastText}>8.15.23</Text>

 </View>
     

   </View>
   <View style={styles.row}>
    
      <View style={styles.back}>
       <Image
         style={styles.tinylogo9}
         source={{
           uri: 'https://www.extraspace.com/blog/wp-content/uploads/2018/11/living-in-dallas-tx-670x450.jpg',
         }}
       />
     <Text style={styles.text90}>Chicago</Text>
     </View>

     <View style={styles.stat}>
 
    <Text style={styles.cen}>9.24.15</Text>

      <Text style={styles.first}>Chicago</Text>
      <Text style={styles.first}>llinois,USA</Text>
       <Text style={styles.first}>3 trips</Text>

    <Text style={styles.last}>Last Visted</Text>
    <Text style={styles.lastText}>8.15.23</Text>

 </View>
     

   </View>
   <View style={styles.row}>
    
      <View style={styles.back}>
       <Image
         style={styles.tinylogo9}
         source={{
           uri: 'https://www.extraspace.com/blog/wp-content/uploads/2018/11/living-in-dallas-tx-670x450.jpg',
         }}
       />
     <Text style={styles.text90}>San Antonio </Text>
     </View>

     <View style={styles.stat}>
 
    <Text style={styles.cen}>9.24.15</Text>

      <Text style={styles.first}>San Antonio</Text>
      <Text style={styles.first}>Texas,USA</Text>
       <Text style={styles.first}> 4 trips</Text>

    <Text style={styles.last}>Last Visted</Text>
    <Text style={styles.lastText}>8.15.23</Text>

 </View>
     

   </View>
   <View style={styles.row}>
    
      <View style={styles.back}>
       <Image
         style={styles.tinylogo9}
         source={{
           uri: 'https://www.extraspace.com/blog/wp-content/uploads/2018/11/living-in-dallas-tx-670x450.jpg',
         }}
       />
     <Text style={styles.text90}>New Jersey</Text>
     </View>

     <View style={styles.stat}>
 
    <Text style={styles.cen}>9.24.15</Text>

      <Text style={styles.first}>New Jersey </Text>
      <Text style={styles.first}>New Jersey,USA</Text>
       <Text style={styles.first}>5 trips</Text>

    <Text style={styles.last}>Last Visted</Text>
    <Text style={styles.lastText}>8.15.23</Text>

 </View>
     

   </View>
   <View style={styles.row}>
    
      <View style={styles.back}>
       <Image
         style={styles.tinylogo9}
         source={{
           uri: 'https://www.extraspace.com/blog/wp-content/uploads/2018/11/living-in-dallas-tx-670x450.jpg',
         }}
       />
     <Text style={styles.text90}>Los Vages</Text>
     </View>

    

     <View style={styles.stat}>
 
    <Text style={styles.cen}>9.24.15</Text>

      <Text style={styles.first}>Los Vages</Text>
      <Text style={styles.first}>Califonia, USA</Text>
       <Text style={styles.first}>3 trips</Text>

    <Text style={styles.last}>Last Visted</Text>
    <Text style={styles.lastText}>8.15.23</Text>
    

 </View>
     

   </View>


   
   </View>
  
  



   
  
   </ScrollView>
   </ImageBackground>
 
   
   </View>
  
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              renderTabBar={renderTabBar}
            />
            <Button title="Close"  color="#6a5acd" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
     

    </View>
  );
};

const styles = StyleSheet.create({
  container2: {
   
  },
 
  modalBackground1:
  {
    backgroundColor:'rgb(0,0,0,0)',
    borderRadius:10,
    alignItems:'center',
    marginRight:30,
    marginLeft:-20,
    
  },
  scene: {
  
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    backgroundColor: 'white',
  },
  indicator: {
    backgroundColor: 'purple',
  },
  label: {
    fontWeight:'bold',
    color: 'black',

  },
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  tabLabel: {
    color: '#000',
    fontWeight: 'bold',
  },

  row8: {
    flexDirection: 'row',
    alignSelf: 'center', 
    marginBottom: 20,
    width: 365,
    height: 40,
    marginRight:120,
   
  },
  poc: {
    marginBottom: 6,
    fontWeight: 'bold',
    fontSize:12,
  },
  pec: {
    marginBottom: 6,
    fontSize:10,
    color:'gray',
  },
  pocd: {
    marginLeft: 10, 
    flex: 1, 
  },
  tinylogo8: {
    width: 30, 
    height: 30,
    borderRadius: 30, 
  },
  text01: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 12,
  },
  text02: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 12,
  },
  button: {
    width: 60, 
    height: 30, 
    backgroundColor: '#6a5acd',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button1: {
    width: 80, 
    height: 30, 
    fontWeight:'bold',
    backgroundColor: 'lightgray',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
     marginLeft:34,
     marginTop:15,
    },
  
    back:
    {
     backgroundColor:'rgb(0,0,0,0)',
    },
    stat1:
    {
      width:-70,
    },
   
    text90: {
      color: 'white',
      fontSize: 15,
      fontWeight: 'bold',
      position: 'absolute', // Position text over image
      textAlign: 'center',
      marginTop:50,
      alignSelf:'center',
    },
    rest:
    {
      fontSize:20,
      fontWeight:'bold',
      color:'white',
  
    },
    row: {
      flexDirection: 'row',
      alignItems:'center',
      alignSelf:'center',
      backgroundColor:'rbg(0,0,0,0)',
  
    
    },
    down:{
      display:'flex',
      flexDirection:'row',
      justifyContent:"space-between",
      width:175,
      marginTop:150,
      alignSelf:'center',
      backgroundColor:"rgb(0,0,0,0)",
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap', // Allows items to wrap into the next line
      justifyContent: 'space-between', // Aligns items evenly
    },
    itemContainer: {
      width: '50%', // Set width for each item (2 columns)
      marginBottom: 50, // Space between rows
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemText: {
      color: 'white',
      fontSize: 16,
    },
    container: {
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center', 
    },
    cen:
    {
       marginLeft:10,
       marginBottom:12,
       marginTop:-15,
       color:'white',
       justifyContent:'flex-start',
    },
    first:
    {
      color:'white',
    },
    firstText:
    { 
      alignItems:"center",
      marginRight:10,
      marginTop:-3,
      color:'white',
      justifyContent:'center',
    },
    last:
    {
     marginTop:15,
     color:"white",
    },
    content:
    {
     
      marginBottom: 100, // Space between rows
      justifyContent: 'center',
      alignItems: 'center',
    },
    lastText:
    {
       
       marginTop:1,
       marginLeft:10,
       color:'white',
       justifyContent:'flex-end',
    },
    center:
    {
       alignSelf:"center",
       marginTop:15,
       marginLeft:12,
    },
    stat:
    {
      width:125,
      height:155,
      backgroundColor:"#AE5FE1",
      borderRadius:40,
      justifyContent: 'center',
      alignItems:'center',
      paddingTop:10,
      flexDirection: 'column', 
      marginLeft:60,
     
    },
    text1:
    {
       color:'white',
       fontWeight:'bold',
        fontSize:15,
        marginTop:140,
  
  
    },
    badge1:
    {
     width:100,
     height:80,
     borderWidth:3,
     borderColor:'purple',
     flexDirection: 'column', 
    },
    tinylogo9:
    {
      width: 120, 
      height: 150,
      borderRadius: 30, 
      alignSelf:'center',
      marginTop:20,
      borderColor:'#9370db',
      borderWidth:4,
  
  
    },
    down1: 
    {
      marginLeft:35,
      backgroundColor:"rgb(0,0,0,0)",
    },
    text:{
      marginTop:-3,
      marginLeft:-5,
      backgroundColor:"rgb(0,0,0,0)",
      color:'white',
      fontSize:17,
    },
    down2: 
    {
      width:100,
      alignSelf:'center',
      height:30,
      padding:10,
      backgroundColor:"rgb(0,0,0,0)",
  
  
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
    whole:{
       marginTop:500,
       backgroundColor:"rgb(0,0,0,0)",
  
    },
    routing: 
    {
      marginTop:640,
      backgroundColor:"rgb(0,0,0,0)",
  
    },
    text11: 
    {
      fontSize: 15,
      lineHeight: 84,
      marginTop:-60,
      marginLeft:-16,
      backgroundColor:"rgb(0,0,0,0)",
    
  
    },
   
    num:
    {
      display:'flex',
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:'center',
      backgroundColor:"rgb(0,0,0,0)",
  
  
    },
    
   
});

export default App;
