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
  Alert,
  useColorScheme,
} from "react-native";
import { useLayoutEffect, useEffect, useState, Key } from "react";
import { useNavigation } from "@react-navigation/native";
import Svg, { G, Path, SvgProps } from "react-native-svg";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";


/*
const [userID, setUserID] = useState<any>(null);
setUserID("0428c428-a051-7098-6a7e-3b6cfa6d9417"); //Remove when authentication added
*/

export function SpotifyIcon(props: SvgProps) {
  return (
    <Svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 256 256"
      fill="none"
      {...props}
    >
      <Path
        fill={props.color || "#FFF"} 
        d="M128 0C57.308 0 0 57.309 0 128c0 70.696 57.309 128 128 128c70.697 0 128-57.304 128-128C256 57.314 198.697.007 127.998.007zm58.699 184.614c-2.293 3.76-7.215 4.952-10.975 2.644c-30.053-18.357-67.885-22.515-112.44-12.335a7.98 7.98 0 0 1-9.552-6.007a7.97 7.97 0 0 1 6-9.553c48.76-11.14 90.583-6.344 124.323 14.276c3.76 2.308 4.952 7.215 2.644 10.975m15.667-34.853c-2.89 4.695-9.034 6.178-13.726 3.289c-34.406-21.148-86.853-27.273-127.548-14.92c-5.278 1.594-10.852-1.38-12.454-6.649c-1.59-5.278 1.386-10.842 6.655-12.446c46.485-14.106 104.275-7.273 143.787 17.007c4.692 2.89 6.175 9.034 3.286 13.72zm1.345-36.293C162.457 88.964 94.394 86.71 55.007 98.666c-6.325 1.918-13.014-1.653-14.93-7.978c-1.917-6.328 1.65-13.012 7.98-14.935C93.27 62.027 168.434 64.68 215.929 92.876c5.702 3.376 7.566 10.724 4.188 16.405c-3.362 5.69-10.73 7.565-16.4 4.187z"
      />
    </Svg>
  );
}

export default function AuthScreen() {
  /*
  const router = useRouter();
  function handleClick(id: string, city: string, date: string) {
    router.push(`/trip?id=${id}&city=${city}&date=${date}`);
  }
    */
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const handleSpotifyLogin = async () => {
    console.log("Button clicked");  

    // Spotify auth URL
    const authUrl =
      "https://5ogc232v73.execute-api.us-east-1.amazonaws.com/dev/auth/login";

    // Custom redirect URI using your app’s scheme
    const redirectUri = Linking.createURL(
      "/dev/callback"
    );

    https: try {
      console.log("Opening");
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUri
      );
      console.log("Opened");
      console.log("Result:", result);

      if (result.type === "success" && result.url) {
        // Parse the URL to get the auth response
        const { queryParams } = Linking.parse(result.url);

        // Handle your token or any response parameters
        console.log("Spotify Auth Response:", queryParams);
        // Use queryParams to store your token or navigate as needed
      }
    } catch (error) {
      console.error("Error during Spotify Auth:", error);
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <SafeAreaView style={[styles.container, { flex: 1 }]}>
        <Image
          source={require("@/assets/images/logo2.png")}
          style={styles.logo}
        />
        <TouchableOpacity style={styles.button} onPress={handleSpotifyLogin}>
          <View style={styles.boxlhs}>
            <SpotifyIcon width={64} height={64} color="#FFFFFF" />
          </View>
          <View style={styles.boxrhs}>
            <Text style={styles.text}>Login with Spotify</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  logo: {
    position: "absolute",
    top: 150,
    height: 100,
    width: "auto",
    aspectRatio: 3,
  },
  boxlhs: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "flex-end",
    flex: 0.3,
    right: 10,
  },
  boxrhs: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 0.7,
    left: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", 
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Unbounded_400Regular",
  },
  button: {
    backgroundColor: "rgba(255,255,255,0.4)",
    flexDirection: "row",
    padding: 15,
    width: "80%",
    height: "auto",
    justifyContent: "center",
    borderRadius: 25,
  },
});
