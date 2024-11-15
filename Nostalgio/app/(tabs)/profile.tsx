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
import { SafeAreaView } from "react-native-safe-area-context";

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
      const apiUrl = `https://api.unsplash.com/search/photos?client_id=sc77PzhtrkJ2wdHzAomI13AIuy4jaS3dbDpKUPmpnE4&query=${cityName}&collections=917009,Fa8XQGFy5PA,wyuGybuJGjI,mHWiMKGI0go&page=1&per_page=1`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.results[0]) {
        return data.results[0].urls.regular;
      } else {
        return "https://picsum.photos/id/67/200/100";
        //return "https://picsum.photos/id/43/200/100";
      }
    } catch (error) {
      console.error("Error in getCityImage:", error);
      return "https://picsum.photos/id/67/200/100";
      //return "https://picsum.photos/id/43/200/100";
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
        <SafeAreaView style={styles.container}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.userData}>
            <Image
              style={styles.profileImage}
              source={{ uri: userData.SpotifyProfileImageUrl }}
            />
            <Text style={styles.displayName}>{userData.DisplayName}</Text>
            <Text style={styles.displayCity}>Dallas, United States</Text>
          </View>
          <Text style={styles.badgesSection}>Badges</Text>

          <View style={styles.badgesContainer}>
            <FlatList
              data={badges}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <View style={{ position: "relative", alignItems: "center" }}>
                    <Image
                      style={styles.cityImage}
                      source={{ uri: item.imageUrl }}
                    />

                    {/* Outline Text */}
                    <Text
                      style={[styles.cityTitleOutline, { top: 49, left: 0 }]}
                    >
                      {`${item.city},\n${item.country}`}
                    </Text>
                    <Text
                      style={[styles.cityTitleOutline, { top: 51, left: 0 }]}
                    >
                      {`${item.city},\n${item.country}`}
                    </Text>
                    <Text
                      style={[styles.cityTitleOutline, { top: 50, left: -1 }]}
                    >
                      {`${item.city},\n${item.country}`}
                    </Text>
                    <Text
                      style={[styles.cityTitleOutline, { top: 50, left: 1 }]}
                    >
                      {`${item.city},\n${item.country}`}
                    </Text>

                    {/* Main Text (Centered) */}
                    <Text style={styles.cityTitle} numberOfLines={2}>
                      {`${item.city},\n${item.country}`}
                    </Text>
                  </View>

                  <View style={styles.stat}>
                    <Text style={styles.statTextTitle}>
                      {item.visitCount}{" "}
                      {item.visitCount !== 1 ? "trips" : "trip"}
                    </Text>
                    <Text style={styles.statText}>Last Visited</Text>
                    <Text style={styles.statText}>
                      {formatDate(item.lastVisitedDate)}
                    </Text>
                  </View>
                </View>
              )}
              contentContainerStyle={styles.scrollContainer}
            />
          </View>
        </SafeAreaView>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  badgesContainer: {
    flex: 1,
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  userData: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: "white",
    borderWidth: 1,
  },
  displayName: {
    fontSize: 24,
    marginTop: 15,
    marginBottom: 10,
    color: "white",
    textAlign: "center",
    fontFamily: "Unbounded_600SemiBold",
  },
  displayCity: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    fontFamily: "Unbounded_400Regular",
  },
  badgesSection: {
    fontSize: 32,
    color: "white",
    fontFamily: "Unbounded_600SemiBold",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  cityImage: {
    width: 200,
    height: 100,
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 1,
    overflow: "hidden",
  },
  cityTitle: {
    color: "white", // Main text color
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    width: "100%",
    position: "absolute", // Absolutely position to center over the image
    top: "50%", // Center vertically
    fontFamily: "Unbounded_500Medium",
    transform: [{ translateY: -20 }], // Adjust slightly to perfect centering
  },

  cityTitleOutline: {
    color: "#3A0CA3", // Outline color
    fontSize: 16,
    fontWeight: "bold",
    position: "absolute", // Keep outline text absolute
    textAlign: "center",
    alignSelf: "center",
    width: "100%",
    fontFamily: "Unbounded_500Medium",
    top: 50, // Center vertically
    transform: [{ translateY: -20 }], // Adjust to align perfectly
  },
  stat: {
    width: 100,
    height: 100,
    backgroundColor: "#3A0CA3",
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statTextTitle: {
    color: "white",
    fontSize: 16,
    fontFamily: "Unbounded_500Medium",
  },
  statText: {
    color: "white",
    fontSize: 12,
    fontFamily: "Unbounded_200ExtraLight",
  },
});
