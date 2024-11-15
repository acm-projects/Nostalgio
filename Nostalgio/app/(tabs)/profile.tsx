import React, { Component } from "react";
import { Image, StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { format } from "date-fns";
import { ImageBackground, ScrollView } from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import { ActivityIndicator } from "react-native";

const userID = "0428c428-a051-7098-6a7e-3b6cfa6d9417"; //Remove when authentication added
 
async function fetchBadges(userId: string) {
  try {
    const apiUrl = `https://5ogc232v73.execute-api.us-east-1.amazonaws.com/dev/badges/${userId}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (!response.ok) {
      throw new Error('Request failed with status ' + response.status);
    }
    const badgeData = await response.json();
    //console.log('***** RESPONSE JSON*******', badgeData);
    return badgeData;
  } catch (error) {
    console.error('Error:', error);
  }
}

function formatDate(dateString: string) {
  let year = parseInt(dateString.substring(0, 4), 10);
  let month = parseInt(dateString.substring(5, 7), 10) - 1;
  let day = parseInt(dateString.substring(8, 10), 10);

  return format(new Date(year, month, day), "MM.dd.yyyy");
}

async function getCityImage(cityName: string){
  try {
    const apiUrl = `https://api.unsplash.com/search/photos?client_id=sc77PzhtrkJ2wdHzAomI13AIuy4jaS3dbDpKUPmpnE4&query=${cityName}&collections=917009&page=1&per_page=1`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.results[0]) {
      console.log(cityName);
      console.log(data.results[0].urls.regular);
      return data.results[0].urls.regular;
    } else {
      console.log(cityName);
      console.log("Default")
      return "https://www.extraspace.com/blog/wp-content/uploads/2018/11/living-in-dallas-tx-670x450.jpg";
    }
  } catch (error) {
    console.error("Error:", error);
    return "https://www.extraspace.com/blog/wp-content/uploads/2018/11/living-in-dallas-tx-670x450.jpg";
  }
}

export default class Badges extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    try {
      const data = await fetchBadges(userID);
      const badgesWithImages = await Promise.all(
        data.map(async (badge: { city: string }) => {
          const imageUrl = await getCityImage(badge.city);
          return { ...badge, imageUrl }; // Add imageUrl property
        })
      );
      this.setState({ data: badgesWithImages });
    } catch (error) {
      console.error("Error in componentDidMount:", error);
    }
  }

  render() {
    return (
      <ImageBackground
        source={require("../../assets/images/background.png")}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.tinylogo1}>
            <View style={styles.pic}>
              <Image
                style={styles.tinylogo}
                source={{
                  uri: "https://picsum.photos/seed/picsum/200/300",
                }}
              />
            </View>

            <Text style={styles.text6}>Sanjita Medishetty</Text>
            <Text style={styles.text7}>San Fransico, California</Text>
          </View>
          <Text style={styles.text123}>Badges</Text>
          <FlatList
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.row}>
                  <Image
                    style={styles.tinylogo9}
                    source={{ uri: item.imageUrl }}
                  />
                  <Text style={styles.text90}>{item.city}</Text>
                  <View style={styles.stat}>
                    <Text style={styles.first}>{item.city},</Text>
                    <Text style={styles.first}>{item.country}</Text>
                    <Text style={styles.first}>
                      {item.visitCount}{" "}
                      {item.visitCount !== 1 ? "trips" : "trip"}
                    </Text>
                    <Text style={styles.last}>Last Visited</Text>
                    <Text style={styles.lastText}>
                      {formatDate(item.lastVisitedDate)}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            )}
          />
        </View>
      </ImageBackground>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 15,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  text90: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    position: 'absolute', // Position text over image
    textAlign: 'center',
    alignSelf: 'center',
    marginLeft: 30,

  },
  text123:
  {
   fontSize:30,
   color: 'white',
   fontWeight:'bold',
   marginLeft:20,
   marginTop:140,
  },
  first: {
    color: 'white',
  },
  last: {
    marginTop: 15,
    color: 'white',
  },
  lastText: {
    marginTop: 1,
    marginLeft: 10,
    color: 'white',
    justifyContent: 'flex-end',
  },
  stat: {
    width: 125,
    height: 155,
    backgroundColor: "#AE5FE1",
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    flexDirection: 'column',
    marginLeft: 55,
  },
  tinylogo9: {
    width: 120,
    height: 150,
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 20,
    borderColor: '#9370db',
    borderWidth: 4,
  },
});
