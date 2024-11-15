import {
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";

import { Text, View } from "@/components/Themed";

import { useState, useLayoutEffect, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Svg, { Path, SvgProps } from "react-native-svg";

import { format } from "date-fns";

const userID = "0428c428-a051-7098-6a7e-3b6cfa6d9417"; //Remove when authentication added

export function SolarArrowDownBold(props: SvgProps) {
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
        d="m12.37 15.835l6.43-6.63C19.201 8.79 18.958 8 18.43 8H5.57c-.528 0-.771.79-.37 1.205l6.43 6.63c.213.22.527.22.74 0"
      />
    </Svg>
  );
}

function formatDate(dateString: string) {
  let year = parseInt(dateString.substring(0, 4), 10);
  let month = parseInt(dateString.substring(5, 7), 10) - 1;
  let day = parseInt(dateString.substring(8, 10), 10);

  return format(new Date(year, month, day), "MM.dd.yyyy");
}

function renderTrip(
  trip: any,
  index: number,
  handleClick: (id: string, city: string, date: string) => void
) {
  return (
    <TouchableOpacity
      key={index}
      style={[styles.item, { transform: [{ scale: 0.85 }] }]}
      onPress={() => handleClick(trip.id, trip.city, `${formatDate(trip.startDate)} - ${formatDate(trip.endDate)}`)}
    >
      <View style={styles.boxlhs}>
        <Image style={styles.image} source={{ uri: trip.art }} />
      </View>
      <View style={[styles.boxmhs, { flex: 0.7 }]}>
        <Text style={styles.title}>{trip.name}</Text>
        <Text style={styles.subtitle}>
          {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function LibraryScreen() {
  const router = useRouter();
  function handleClick(id: string, city: string, date: string) {
    router.push(`/trip?id=${id}&city=${city}&date=${date}`);
  }

  const [tripsData, setTripsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetching the data
  const fetchTrips = async () => {
    try {
      const response = await fetch(
        `https://5ogc232v73.execute-api.us-east-1.amazonaws.com/dev/memories/${userID}`
      ); // Replace with endpoint URL
      const data = await response.json();
      //console.log('Raw JSON data:', data);

      const formattedData = formatTripsByCity(data);
      setTripsData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching trips data:", error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTrips();
  }, []));

  // Function to group trips by city
  function formatTripsByCity(data: any) {
    const groupedTrips: any = {};

    data.trips.forEach((trip: any) => {
      const city = trip.city;

      if (!groupedTrips[city]) {
        groupedTrips[city] = [];
      }
      groupedTrips[city].push([trip]);
    });

    return {
      ongoing: data.ongoing,
      trips: groupedTrips,
    };
  }

  if (loading) {
    return (
      <ImageBackground
        source={require("@/assets/images/background.png")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <ActivityIndicator size="large" color="#FFFFFF" style={{ top: 25 }} />
        </SafeAreaView>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require("@/assets/images/background.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <View style={{ height: 50, backgroundColor: "rgba(0, 0, 0, 0)" }} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <SafeAreaView style={{ flex: 1 }}>
          {tripsData.ongoing && (
            <TouchableOpacity
              style={styles.ongoing}
              onPress={() =>
                handleClick(
                  tripsData.ongoing.id,
                  tripsData.ongoing.city,
                  `${formatDate(tripsData.ongoing.startDate)} - Present`
                )
              }
            >
              <View style={styles.boxlhs}>
                <Image
                  style={styles.image}
                  source={{ uri: tripsData.ongoing.art }}
                />
              </View>
              <View style={styles.boxmhs}>
                <Text style={styles.subtitle}>Ongoing Trip:</Text>
                <Text style={styles.title}>{tripsData.ongoing.city}</Text>
                <Text style={styles.subtitle}>
                  {formatDate(tripsData.ongoing.startDate)} - Present
                </Text>
              </View>
              <View style={styles.boxrhs} />
            </TouchableOpacity>
          )}

          {Object.keys(tripsData.trips).map((city, cityIndex) => {
            const cityTrips = tripsData.trips[city];

            if (cityTrips.length === 1) {
              const trip = cityTrips[0][0]; // Access the single trip
              return (
                <View
                  key={cityIndex}
                  style={{ backgroundColor: "transparent", width: "100%" }}
                >
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() =>
                      handleClick(
                        trip.id,
                        trip.city,
                        `${formatDate(trip.startDate)} - ${formatDate(
                          trip.endDate
                        )}`
                      )
                    }
                  >
                    <View style={styles.boxlhs}>
                      <Image style={styles.image} source={{ uri: trip.art }} />
                    </View>
                    <View style={[styles.boxmhs, { flex: 0.7 }]}>
                      <Text style={styles.title}>{city}</Text>
                      <Text style={styles.subtitle}>{trip.name}</Text>
                      <Text style={styles.subtitle}>
                        {formatDate(trip.startDate)} -{" "}
                        {formatDate(trip.endDate)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            } else {
              return (
                <View
                  key={cityIndex}
                  style={{ backgroundColor: "transparent", width: "100%" }}
                >
                  {/* City Section */}
                  <TouchableOpacity
                    style={styles.item}
                  >
                    <View style={styles.boxlhs}>
                      <Image
                        style={styles.image}
                        source={{ uri: cityTrips[0][0].art }}
                      />
                    </View>
                    <View style={styles.boxmhs}>
                      <Text style={styles.title}>{city}</Text>
                      <Text style={styles.subtitle}>
                        {cityTrips.length} trips
                      </Text>
                    </View>
                    <View style={styles.boxrhs} />
                  </TouchableOpacity>

                  {/* Trips in City Section */}
                  {cityTrips.map((tripArray: any[], tripIndex: number) =>
                    tripArray.map((trip, index) =>
                      renderTrip(trip, tripIndex * 10 + index, handleClick)
                    )
                  )}
                </View>
              );
            }
          })}
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
  boxrhs: {
    backgroundColor: "transparent",
    alignItems: "flex-end",
    justifyContent: "center",
    flex: 0.2,
    right: 15,
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
    color: "white",
    fontFamily: "Unbounded_600SemiBold",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Unbounded_400Regular",
  },
  image: {
    height: 100,
    width: "auto",
    aspectRatio: 1,
    borderRadius: 16,
    borderColor: "white",
  },
  ongoing: {
    backgroundColor: "#3A0CA3",
    flexDirection: "row",
    padding: 15,
    width: "100%",
    height: "auto",
    borderRadius: 16,
    justifyContent: "center",
    marginVertical: 15,
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
