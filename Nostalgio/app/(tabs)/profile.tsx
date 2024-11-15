import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  Alert,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { format } from "date-fns";

const userID = "0428c428-a051-7098-6a7e-3b6cfa6d9417"; // Remove when authentication added

export default function Profile() {
  const [badges, setBadges] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const apiUrl = `https://5ogc232v73.execute-api.us-east-1.amazonaws.com/dev/badges/${userID}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Request failed with status " + response.status);
      }
      const data = await response.json();
      //console.log("Raw JSON data:", data);

      const badgesWithImages = await Promise.all(
        data.map(async (badge: { city: any; }) => {
          const imageUrl = await getCityImage(badge.city);
          return { ...badge, imageUrl };
        })
      );

      setBadges(badgesWithImages);

      const response2 = await fetch(
        `https://5ogc232v73.execute-api.us-east-1.amazonaws.com/dev/users/${userID}`
      );
      const data2 = await response2.json();
      //console.log("Raw JSON data:", data2);

      setUserData(data2);
    } catch (error) {
      console.error("Error in fetchBadges:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCityImage = async (cityName: string) => {
    try {
      const apiUrl = `https://api.unsplash.com/search/photos?client_id=sc77PzhtrkJ2wdHzAomI13AIuy4jaS3dbDpKUPmpnE4&query=${cityName}&collections=917009&page=1&per_page=1`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.results[0]) {
        return data.results[0].urls.regular;
      } else {
        return "https://www.extraspace.com/blog/wp-content/uploads/2018/11/living-in-dallas-tx-670x450.jpg";
      }
    } catch (error) {
      console.error("Error in getCityImage:", error);
      return "https://www.extraspace.com/blog/wp-content/uploads/2018/11/living-in-dallas-tx-670x450.jpg";
    }
  };

  const formatDate = (dateString: string) => {
    let year = parseInt(dateString.substring(0, 4), 10);
    let month = parseInt(dateString.substring(5, 7), 10) - 1;
    let day = parseInt(dateString.substring(8, 10), 10);
    return format(new Date(year, month, day), "MM.dd.yyyy");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={{ flex: 1 }}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#AE5FE1" />
      ) : (
        <View style={styles.container}>
          <View style={styles.tinylogo1}>
            <View style={styles.pic}>
              <Image
                style={styles.tinylogo}
                source={{ uri: userData.SpotifyProfileImageUrl }}
              />
            </View>
            <Text style={styles.text6}>{userData.DisplayName}</Text>
            <Text style={styles.text7}>Dallas, United States</Text>
          </View>
          <Text style={styles.text123}>Badges</Text>
          <FlatList
            data={badges}
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
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 15,
  },
  pic: {
    marginLeft: 90,
    marginTop: 10,
    backgroundColor: "rgb(0,0,0,0)",
  },
  text6: {
    marginLeft: 60,
    fontSize: 18,
    marginTop: 15,
    marginBottom: 10,
    color: "white",
    backgroundColor: "rgb(0,0,0,0)",
  },
  text7: {
    fontSize: 12,
    marginLeft: 70,
    color: "white",
    backgroundColor: "rgb(0,0,0,0)",
  },
  tinylogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 0,
    marginBottom: 0,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(0,0,0,0)",
  },
  tinylogo1: {
    width: 300,
    height: 50,
    marginTop: 50,
    alignSelf: "center",
    backgroundColor: "rgb(0,0,0,0)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  text90: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    position: "absolute",
    textAlign: "center",
    alignSelf: "center",
    marginLeft: 30,
  },
  text123: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 140,
  },
  first: {
    color: "white",
  },
  last: {
    marginTop: 15,
    color: "white",
  },
  lastText: {
    marginTop: 1,
    marginLeft: 10,
    color: "white",
    justifyContent: "flex-end",
  },
  stat: {
    width: 125,
    height: 155,
    backgroundColor: "#AE5FE1",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    flexDirection: "column",
    marginLeft: 55,
  },
  tinylogo9: {
    width: 120,
    height: 150,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: 20,
    borderColor: "#9370db",
    borderWidth: 4,
  },
});
