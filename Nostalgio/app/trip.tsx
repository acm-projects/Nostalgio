import { useLocalSearchParams } from "expo-router";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  ActivityIndicator,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useLayoutEffect, useEffect, useState, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import { useNavigation } from "@react-navigation/native";

const userID = "e4484428-30d1-7021-bd4a-74095f2f86c2"; //Remove when authentication added
//https://6p6xrc3hu4.execute-api.us-east-1.amazonaws.com/dev/playlists/e4484428-30d1-7021-bd4a-74095f2f86c2/0dgwfxpRSIMVUvLbCp21Jt

export default function TripPage() {
  const { id } = useLocalSearchParams(); // This will extract the id from the URL
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Library",
      headerTintColor: "#4361EE",
      headerTitleStyle: { color: "#000000" },
    });
    if(loading){
      navigation.setOptions({
        title: "Loading...",
      })
    }
  });

  const [tripData, setTripData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetching the data
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch(
          `https://6p6xrc3hu4.execute-api.us-east-1.amazonaws.com/dev/playlists/${userID}/${id}`
        );
        const data = await response.json();
        //console.log("Raw JSON data:", data);

        setTripData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trips data:", error);
        setLoading(false);
      }
    };

    fetchTrips();
  }, [id]);

  useLayoutEffect(() => {
    if (tripData && id) {
      navigation.setOptions({
        title: `${tripData.name}`,
      });
    }
  }, [tripData, navigation]);

  if (loading) {
    return (
      <ImageBackground
        source={require("@/assets/images/background.png")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <ActivityIndicator size="large" color="#FFFFFF" style={{ top: 25 }} />
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => Linking.openURL(tripData.owner.externalUrl)}
          >
            <Image
              style={styles.titleImage}
              source={{ uri: tripData.images[0].url }}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{tripData.name}</Text>

          {tripData.tracks.map(
            (
              track: {
                externalUrl: string;
                trackId: string;
                name: string;
                artistNames: string;
              },
              trackIndex: Key | null | undefined
            ) => (
              <View
                key={trackIndex}
                style={{ backgroundColor: "transparent", width: "100%" }}
              >
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => Linking.openURL(track.externalUrl)}
                >
                  <View style={styles.boxlhs}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: `https://picsum.photos/1000?random=${trackIndex}`,
                      }}
                    />
                  </View>
                  <View style={[styles.boxmhs, { flex: 0.7 }]}>
                    <Text style={styles.subtitle}>{track.name}</Text>
                    <Text style={styles.artistTitle}>{track.artistNames}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          )}
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  boxlhs: {
    backgroundColor: "transparent",
    justifyContent: "center",
    flex: 0.3,
  },
  boxmhs: {
    backgroundColor: "transparent",
    justifyContent: "center",
    flex: 0.5,
    left: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  contentContainer: {
    padding: 15,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    alignContent: "center",
    color: "white",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  artistTitle: {
    fontSize: 14,
    fontWeight: "normal",
    color: "white",
  },
  titleImage: {
    height: 200,
    width: "auto",
    alignSelf: "center",
    aspectRatio: 1,
    borderRadius: 16,
    borderColor: "white",
    padding: 100,
  },
  image: {
    height: 100,
    width: "auto",
    aspectRatio: 1,
    borderRadius: 16,
    borderColor: "white",
  },
  item: {
    backgroundColor: "transparent",
    flexDirection: "row",
    padding: 15,
    width: "100%",
    height: "auto",
    justifyContent: "center",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0)",
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
});
