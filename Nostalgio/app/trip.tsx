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
  Alert,
  useColorScheme,
} from "react-native";
import { useLayoutEffect, useEffect, useState, Key } from "react";
import { useNavigation } from "@react-navigation/native";
import Svg, { G, Path, SvgProps } from "react-native-svg";
import * as Sharing from "expo-sharing";
import * as ImagePicker from "expo-image-picker";

const userID = "e4484428-30d1-7021-bd4a-74095f2f86c2"; //Remove when authentication added
//https://6p6xrc3hu4.execute-api.us-east-1.amazonaws.com/dev/playlists/e4484428-30d1-7021-bd4a-74095f2f86c2/0dgwfxpRSIMVUvLbCp21Jt

// Tab Icons at https://icon-sets.iconify.design/solar/
export function SolarShareScreenOutline(props: SvgProps) {
  return (
    <Svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        fill={props.color || "currentColor"}
        d="M15.03 7.47a.75.75 0 0 0-1.06 0l-2.5 2.5a.75.75 0 1 0 1.06 1.06l1.22-1.22V16a.75.75 0 0 0 1.5 0V9.81l1.22 1.22a.75.75 0 1 0 1.06-1.06z"
      />
      <Path
        fill={props.color || "currentColor"}
        fillRule="evenodd"
        d="M13.945 1.25h1.11c1.367 0 2.47 0 3.337.117c.9.12 1.658.38 2.26.981c.602.602.86 1.36.982 2.26c.116.867.116 1.97.116 3.337v8.11c0 1.367 0 2.47-.116 3.337c-.122.9-.38 1.658-.982 2.26s-1.36.86-2.26.982c-.867.116-1.97.116-3.337.116h-1.11c-1.367 0-2.47 0-3.337-.116c-.9-.122-1.658-.38-2.26-.982c-.4-.4-.648-.869-.805-1.402c-.951-.001-1.744-.012-2.386-.098c-.764-.103-1.426-.325-1.955-.854s-.751-1.19-.854-1.955c-.098-.73-.098-1.656-.098-2.79V9.447c0-1.133 0-2.058.098-2.79c.103-.763.325-1.425.854-1.954s1.19-.751 1.955-.854c.642-.086 1.435-.097 2.386-.098c.157-.533.406-1.002.805-1.402c.602-.602 1.36-.86 2.26-.981c.867-.117 1.97-.117 3.337-.117M7.25 16.055c0 1.05 0 1.943.053 2.694c-.835-.003-1.455-.018-1.946-.084c-.598-.08-.89-.224-1.094-.428s-.348-.496-.428-1.094c-.083-.619-.085-1.443-.085-2.643v-5c0-1.2.002-2.024.085-2.643c.08-.598.224-.89.428-1.094s.496-.348 1.094-.428c.491-.066 1.111-.08 1.946-.084C7.25 6 7.25 6.895 7.25 7.945zm3.558-13.202c-.734.099-1.122.28-1.399.556c-.277.277-.457.665-.556 1.4C8.752 5.562 8.75 6.564 8.75 8v8c0 1.435.002 2.436.103 3.192c.099.734.28 1.122.556 1.399c.277.277.665.457 1.4.556c.755.101 1.756.103 3.191.103h1c1.435 0 2.436-.002 3.192-.103c.734-.099 1.122-.28 1.399-.556c.277-.277.457-.665.556-1.4c.101-.755.103-1.756.103-3.191V8c0-1.435-.002-2.437-.103-3.192c-.099-.734-.28-1.122-.556-1.399c-.277-.277-.665-.457-1.4-.556c-.755-.101-1.756-.103-3.191-.103h-1c-1.435 0-2.437.002-3.192.103"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export function SolarScreenShareBold(props: SvgProps) {
  return (
    <Svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        fill={props.color || "currentColor"}
        d="M6.623 4.508c-1.471.027-2.318.151-2.89.725C3 5.965 3 7.143 3 9.5v5c0 2.357 0 3.536.732 4.268c.573.573 1.42.698 2.891.725c-.123-.918-.123-2.064-.123-3.394V7.902c0-1.33 0-2.477.123-3.394"
      />
      <Path
        fill={props.color || "currentColor"}
        fillRule="evenodd"
        d="M8.879 2.879C8 3.757 8 5.172 8 8v8c0 2.828 0 4.243.879 5.121C9.757 22 11.172 22 14 22h1c2.828 0 4.243 0 5.121-.879C21 20.243 21 18.828 21 16V8c0-2.828 0-4.243-.879-5.121C19.243 2 17.828 2 15 2h-1c-2.828 0-4.243 0-5.121.879m6.151 4.59a.75.75 0 0 0-1.06 0l-2.5 2.5a.75.75 0 1 0 1.06 1.061l1.22-1.22V16a.75.75 0 0 0 1.5 0V9.81l1.22 1.22a.75.75 0 1 0 1.06-1.06z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export function SolarGalleryEditOutline(props: SvgProps) {
  return (
    <Svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <G fill={props.color || "currentColor"} fillRule="evenodd" clipRule="evenodd">
        <Path
          d="M18.449 1.988a2.52 2.52 0 1 1 3.563 3.563L17.76 9.803l-.03.03c-.23.23-.391.392-.572.532a3.7 3.7 0 0 1-.683.423c-.206.098-.422.17-.732.273l-.04.014l-1.838.612a1.227 1.227 0 0 1-1.552-1.552l.612-1.838l.014-.04c.103-.31.175-.526.273-.732q.175-.364.423-.684c.14-.18.301-.34.532-.571l.03-.03zm2.502 1.06a1.02 1.02 0 0 0-1.442 0l-.131.132l.016.05c.082.236.238.548.533.843a2.2 2.2 0 0 0 .893.55l.131-.132a1.02 1.02 0 0 0 0-1.442m-1.265 2.708a3.75 3.75 0 0 1-1.442-1.442L15.258 7.3c-.272.273-.364.366-.44.464a2.2 2.2 0 0 0-.252.406c-.053.113-.096.236-.218.602l-.225.675l.43.43l.675-.226c.366-.121.489-.164.602-.217a2.2 2.2 0 0 0 .406-.252c.098-.076.191-.168.464-.44z"
        />
        <Path
          d="M12 1.25h-.057c-2.309 0-4.118 0-5.53.19c-1.444.194-2.584.6-3.479 1.494c-.895.895-1.3 2.035-1.494 3.48c-.19 1.411-.19 3.22-.19 5.529v.114c0 2.309 0 4.118.19 5.53c.194 1.444.6 2.584 1.494 3.479c.895.895 2.035 1.3 3.48 1.494c1.411.19 3.22.19 5.529.19h.114c2.309 0 4.118 0 5.53-.19c1.444-.194 2.584-.6 3.479-1.494c.895-.895 1.3-2.035 1.494-3.48c.19-1.411.19-3.22.19-5.529V12a.75.75 0 0 0-1.5 0c0 2.378-.002 4.086-.176 5.386l-.022.152l-2.774-2.497a3.75 3.75 0 0 0-4.665-.28l-.298.21a1.25 1.25 0 0 1-1.602-.14l-4.29-4.29a3.05 3.05 0 0 0-4.165-.138l-.507.443c.005-1.792.03-3.153.175-4.232c.172-1.279.5-2.05 1.069-2.62c.57-.569 1.34-.896 2.619-1.068c1.3-.174 3.008-.176 5.386-.176a.75.75 0 0 0 0-1.5M2.926 17.386c.172 1.279.5 2.05 1.069 2.62c.57.569 1.34.896 2.619 1.068c1.3.174 3.008.176 5.386.176s4.086-.002 5.386-.176c1.279-.172 2.05-.5 2.62-1.069a3 3 0 0 0 .604-.865a1 1 0 0 1-.112-.083l-3.223-2.9a2.25 2.25 0 0 0-2.8-.17l-.297.21a2.75 2.75 0 0 1-3.526-.305l-4.29-4.29a1.55 1.55 0 0 0-2.117-.07L2.75 12.84c.003 1.948.023 3.405.176 4.546"
        />
      </G>
    </Svg>
  );
}

export function SolarGalleryEditBold(props: SvgProps) {
  return (
    <Svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        fill={props.color || "currentColor"}
        d="M22 12.698c-.002 1.47-.013 2.718-.096 3.743c-.097 1.19-.296 2.184-.74 3.009a4.2 4.2 0 0 1-.73.983c-.833.833-1.893 1.21-3.237 1.39C15.884 22 14.2 22 12.053 22h-.106c-2.148 0-3.83 0-5.144-.177c-1.343-.18-2.404-.557-3.236-1.39c-.738-.738-1.12-1.656-1.322-2.795c-.2-1.12-.236-2.512-.243-4.241Q1.999 12.737 2 12v-.054c0-2.148 0-3.83.177-5.144c.18-1.343.557-2.404 1.39-3.236s1.893-1.21 3.236-1.39c1.168-.157 2.67-.175 4.499-.177a.697.697 0 1 1 0 1.396c-1.855.002-3.234.018-4.313.163c-1.189.16-1.906.464-2.436.994S3.72 5.8 3.56 6.99C3.397 8.2 3.395 9.788 3.395 12v.784l.932-.814a2.14 2.14 0 0 1 2.922.097l3.99 3.99a1.86 1.86 0 0 0 2.385.207l.278-.195a2.79 2.79 0 0 1 3.471.209l2.633 2.37c.265-.557.423-1.288.507-2.32c.079-.972.09-2.152.091-3.63a.698.698 0 0 1 1.396 0"
      />
      <Path
        fill={props.color || "currentColor"}
        fillRule="evenodd"
        d="M17.5 11c-2.121 0-3.182 0-3.841-.659S13 8.621 13 6.5s0-3.182.659-3.841S15.379 2 17.5 2s3.182 0 3.841.659S22 4.379 22 6.5s0 3.182-.659 3.841S19.621 11 17.5 11m2.212-6.712a.983.983 0 0 1 0 1.39l-.058.058a.24.24 0 0 1-.211.067a1.6 1.6 0 0 1-.81-.436a1.6 1.6 0 0 1-.436-.81a.24.24 0 0 1 .067-.211l.058-.058a.983.983 0 0 1 1.39 0M17.35 8.04a3 3 0 0 1-.296.279a1.6 1.6 0 0 1-.303.187c-.09.043-.188.076-.381.14l-1.021.34a.265.265 0 0 1-.335-.335l.34-1.02c.064-.194.097-.291.14-.382q.077-.163.187-.303c.062-.08.134-.152.279-.296l1.799-1.799c.043-.043.118-.023.138.035a1.98 1.98 0 0 0 1.217 1.217c.058.02.078.095.035.138z"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export function SolarPen2Outline(props: SvgProps) {
  return (
    <Svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        fill={props.color || "currentColor"}
        fillRule="evenodd"
        d="M14.1 2.391a3.896 3.896 0 0 1 5.509 5.51l-7.594 7.594c-.428.428-.69.69-.98.917a6 6 0 0 1-1.108.684c-.334.159-.685.276-1.259.467l-2.672.891l-.642.214a1.598 1.598 0 0 1-2.022-2.022l1.105-3.314c.191-.574.308-.925.467-1.259a6 6 0 0 1 .685-1.107c.227-.291.488-.553.916-.98zM5.96 16.885l-.844-.846l.728-2.185c.212-.636.3-.895.414-1.135q.212-.443.513-.83c.164-.21.356-.404.83-.879l5.891-5.89a6.05 6.05 0 0 0 1.349 2.04a6.05 6.05 0 0 0 2.04 1.348l-5.891 5.89c-.475.475-.668.667-.878.83q-.388.302-.83.514c-.24.114-.5.202-1.136.414zm12.116-9.573a4 4 0 0 1-.455-.129a4.5 4.5 0 0 1-1.72-1.084a4.54 4.54 0 0 1-1.084-1.72a4 4 0 0 1-.13-.455l.473-.472a2.396 2.396 0 0 1 3.388 3.388zM3.25 22a.75.75 0 0 1 .75-.75h16v1.5H4a.75.75 0 0 1-.75-.75"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export function SolarPen2Bold(props: SvgProps) {
  return (
    <Svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        fill={props.color || "currentColor"}
        fillRule="evenodd"
        d="M3.25 22a.75.75 0 0 1 .75-.75h16a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75"
        clipRule="evenodd"
      />
      <Path
        fill={props.color || "currentColor"}
        d="m11.52 14.929l5.917-5.917a8.2 8.2 0 0 1-2.661-1.787a8.2 8.2 0 0 1-1.788-2.662L7.07 10.48c-.462.462-.693.692-.891.947a5.2 5.2 0 0 0-.599.969c-.139.291-.242.601-.449 1.22l-1.088 3.267a.848.848 0 0 0 1.073 1.073l3.266-1.088c.62-.207.93-.31 1.221-.45q.518-.246.969-.598c.255-.199.485-.43.947-.891m7.56-7.559a3.146 3.146 0 0 0-4.45-4.449l-.71.71l.031.09c.26.749.751 1.732 1.674 2.655A7 7 0 0 0 18.37 8.08z"
      />
    </Svg>
  );
}

export function SolarAddSquareOutline(props: SvgProps) {
  return (
    <Svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        fill={props.color || "currentColor"}
        fillRule="evenodd"
        d="M12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25z"
        clipRule="evenodd"
      />
      <Path
        fill={props.color || "currentColor"}
        d="M12.057 1.25h-.114c-2.309 0-4.118 0-5.53.19c-1.444.194-2.584.6-3.479 1.494c-.895.895-1.3 2.035-1.494 3.48c-.19 1.411-.19 3.22-.19 5.529v.114c0 2.309 0 4.118.19 5.53c.194 1.444.6 2.584 1.494 3.479c.895.895 2.035 1.3 3.48 1.494c1.411.19 3.22.19 5.529.19h.114c2.309 0 4.118 0 5.53-.19c1.444-.194 2.584-.6 3.479-1.494c.895-.895 1.3-2.035 1.494-3.48c.19-1.411.19-3.22.19-5.529v-.114c0-2.309 0-4.118-.19-5.53c-.194-1.444-.6-2.584-1.494-3.479c-.895-.895-2.035-1.3-3.48-1.494c-1.411-.19-3.22-.19-5.529-.19M3.995 3.995c.57-.57 1.34-.897 2.619-1.069c1.3-.174 3.008-.176 5.386-.176s4.086.002 5.386.176c1.279.172 2.05.5 2.62 1.069c.569.57.896 1.34 1.068 2.619c.174 1.3.176 3.008.176 5.386s-.002 4.086-.176 5.386c-.172 1.279-.5 2.05-1.069 2.62c-.57.569-1.34.896-2.619 1.068c-1.3.174-3.008.176-5.386.176s-4.086-.002-5.386-.176c-1.279-.172-2.05-.5-2.62-1.069c-.569-.57-.896-1.34-1.068-2.619c-.174-1.3-.176-3.008-.176-5.386s.002-4.086.176-5.386c.172-1.279.5-2.05 1.069-2.62"
      />
    </Svg>
  );
}

export function SolarAddSquareBold(props: SvgProps) {
  return (
    <Svg
      width={props.width || "24"}
      height={props.height || "24"}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        fill={props.color || "currentColor"}
        fillRule="evenodd"
        d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22m0-13.75a.75.75 0 0 1 .75.75v2.25H15a.75.75 0 0 1 0 1.5h-2.25V15a.75.75 0 0 1-1.5 0v-2.25H9a.75.75 0 0 1 0-1.5h2.25V9a.75.75 0 0 1 .75-.75"
        clipRule="evenodd"
      />
    </Svg>
  );
}

export function UploadImage(id: any, fetchTrips: any) {
  console.log(`User is updating image of ${id}`);

  const pickImageAndUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Uh oh!",
        "We need camera roll permissions to make this work"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const fileUri = result.assets[0].uri;
      const fileName = fileUri.split("/").pop();
      let fileType = fileUri.split(".").pop();
      if (fileType == "jpg") {
        fileType = "jpeg";
      }
      console.log(fileUri);
      console.log(`image/${fileType}`);
      console.log(`${fileName}`);

      const response = await fetch(fileUri);
      const blob = await response.blob();

      console.log(blob);

      const header = new Headers();
      header.append("Content-Type", `image/${fileType}`);
      header.append("X-Original-File-Name", `${fileName}`);

      try {
        const uploadResponse = await fetch(
          `https://6p6xrc3hu4.execute-api.us-east-1.amazonaws.com/dev/memories/${userID}/${id}/image`,
          {
            method: "PUT",
            headers: header,
            body: blob,
          }
        );

        console.log(uploadResponse);

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload image update");
        }

        Alert.alert("Success!", "Image updated successfully");
        await fetchTrips();
      } catch (error) {
        console.error("Error updating image:", error);
        alert("Please try again.");
      }
    }
  };
  pickImageAndUpload();
}

export function EditTitle(id: any, fetchTrips: any) {
  console.log(`User is updating title of ${id}`);
  Alert.prompt(
    "Trip Title",
    "Enter your new album title below",
    [
      { text: "Cancel", style: "destructive", onPress: () => {} },
      {
        text: "Update",
        onPress: (newTitle) => {
          console.log(newTitle);
          const UploadTitle = async () => {
            try {
              const uploadResponse = await fetch(
                `https://6p6xrc3hu4.execute-api.us-east-1.amazonaws.com/dev/memories/${userID}/${id}`,
                {
                  method: "PUT",
                  body: `{ "name": "${newTitle}" }`,
                }
              );

              if (!uploadResponse.ok) {
                throw new Error("Failed to upload title update");
              }

              Alert.alert("Success!", "Title updated successfully");
              await fetchTrips();
            } catch (error) {
              console.error("Error updating title:", error);
              alert("Please try again.");
            }
          };
          UploadTitle();
        },
      },
    ],
    "plain-text"
  );
}


export default function TripPage() {
  const { id, city, date } = useLocalSearchParams(); // This will extract the id, city, and date from the URL
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Library",
      headerTintColor: "#4361EE",
      headerTitleStyle: {
        color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
      },
      headerRight: () => (
        <TouchableOpacity onPress={onShare} style={{ marginRight: 5 }}>
          <SolarShareScreenOutline width={24} height={24} color="#4361EE" />
        </TouchableOpacity>
      ),
    });
    if(loading){
      navigation.setOptions({
        title: "Loading...",
      })
    }
  });

  const [tripData, setTripData] = useState<any>(null);
  const [tripTitle, setTripTitle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchTrips = async () => {
    try {
      const response = await fetch(
        `https://6p6xrc3hu4.execute-api.us-east-1.amazonaws.com/dev/playlists/${userID}/${id}`
      );
      const data = await response.json();
      //console.log("Raw JSON data:", data);

      setTripData(data);

      const response2 = await fetch(
        `https://6p6xrc3hu4.execute-api.us-east-1.amazonaws.com/dev/memories/${userID}/${id}`
      );
      const data2 = await response2.json();
      //console.log("Raw JSON data:", data2);

      setTripTitle(data2.name);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching trips data:", error);
      setLoading(false);
    }
  };

  // Fetching the data
  useEffect(() => {
    fetchTrips(); //Fetch initialls
    if (tripTitle && id) {
      navigation.setOptions({
        title: `${tripTitle}`,
      });
    }
  }, [id, tripTitle, navigation]);

  const onShare = async () => {
    try {
      Sharing.shareAsync(`${tripData.link}`);
    } catch (error) {
      console.error(error);
    }
  };

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
          <View style={styles.imageContainer}>
            <Image
              style={styles.titleImage}
              source={{ uri: tripData.images[0].url }}
            />
            <View style={styles.iconOverlay}>
              <TouchableOpacity
                style={styles.iconOverlayButton}
                onPress={() => UploadImage(id, fetchTrips)}
              >
                <SolarGalleryEditBold width={32} height={32} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.title}>{tripTitle}</Text>
          <View style={styles.info}>
            <View style={[styles.boxmhs, { flex: 0.8 }]}>
              <Text style={styles.artistTitle}>{city}</Text>
              <Text style={styles.artistTitle}>{date}</Text>
              <Text style={styles.artistTitle}>{tripData.owner.name}</Text>
            </View>
            <View
              style={[
                styles.boxlhs,
                {
                  justifyContent: "center",
                  alignItems: "flex-end",
                  right: 15,
                  flex: 0.3,
                  flexDirection: "row",
                },
              ]}
            >
              <TouchableOpacity
                style={{ flex: 0.5, paddingRight: 5 }}
                onPress={() => EditTitle(id, fetchTrips)}
              >
                <SolarPen2Bold width={52} height={52} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ flex: 0.5 }}
                onPress={() => Linking.openURL(tripData.link)}
              >
                <SolarAddSquareBold width={52} height={52} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {tripData.tracks.map(
            (
              track: {
                externalUrl: string;
                trackId: string;
                name: string;
                artistNames: string;
                albumImages: any;
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
                        uri: track.albumImages.large.url,
                      }}
                    />
                  </View>
                  <View style={[styles.boxmhs, { flex: 0.7 }]}>
                    <Text style={styles.subtitle} numberOfLines={2}>
                      {track.name}
                    </Text>
                    <Text style={styles.artistTitle} numberOfLines={1}>
                      {track.artistNames}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          )}
        </SafeAreaView>
        <View style={{ height: 50, backgroundColor: "rgba(0, 0, 0, 0)" }} />
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
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    alignContent: "center",
    color: "white",
    padding: 10,
    fontFamily: "Unbounded_400Regular",
  },
  subtitle: {
    width: "90%",
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Unbounded_500Medium",
  },
  artistTitle: {
    width: "80%",
    fontSize: 14,
    fontWeight: "normal",
    color: "white",
    fontFamily: "Unbounded_400Regular",
  },
  imageContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 200,
  },
  titleImage: {
    height: 200,
    width: "auto",
    alignSelf: "center",
    aspectRatio: 1,
    borderRadius: 16,
    borderColor: "white",
    borderWidth: 1,
    padding: 100,
  },
  iconOverlay: {
    height: 200,
    width: 200,
    aspectRatio: 1,
    position: "relative",
    top: -200,
  },
  iconOverlayButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  image: {
    height: 100,
    width: "auto",
    aspectRatio: 1,
    borderRadius: 16,
    borderColor: "white",
    borderWidth: 1,
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
  info: {
    backgroundColor: "transparent",
    flexDirection: "row",
    width: "100%",
    height: "auto",
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