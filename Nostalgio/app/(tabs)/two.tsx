import React from 'react';
import { StyleSheet,Image, ImageBackground, Pressable,Linking,ScrollView} from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View} from '@/components/Themed';
import { LinearGradient } from 'expo-linear-gradient';


export default function TabTwoScreen() {
  
  return (
   
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

 
  
              <Text style={styles.text}>15 friends</Text>
             <Text style={styles.text}>following</Text>
      
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
        <Text style={styles.text90}>San Jose </Text>
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
     



    
   


  );
  
}




const styles = StyleSheet.create({
  scrollContainer:
{
   paddingBottom:380,
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
  pic:
  {
    marginLeft:90,
    marginTop:10,
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
