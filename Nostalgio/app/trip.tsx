import { useLocalSearchParams } from "expo-router";
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function TripPage() {
  const { id } = useLocalSearchParams(); // This will extract the id from the URL
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (id) {
      navigation.setOptions({
        title: `${id}`,
        headerBackTitle: "Library",
        headerTintColor: "#4361EE",
        headerTitleStyle: { color: "#000000" },
      });
    }
  }, [id, navigation]);

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
            <Image
              style={
                (styles.titleImage)
              }
              source={{ uri: "https://picsum.photos/1000?random=1" }}
            />
            <Text style={styles.title}>Trip ID: {id}</Text>
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
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  artistTitle: {
    fontSize: 14,
    fontWeight: "bold",
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
