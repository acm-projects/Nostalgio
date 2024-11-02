import { Text, View } from "react-native";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, ScrollView } from "react-native";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.statistics1}>
          <View style={styles.grid}>
            <View style={styles.content}>
              <View style={styles.badge1}>
                <Image
                  style={styles.tinylogo}
                  source={{
                    uri: "https://www.extraspace.com/blog/wp-content/uploads/2018/11/living-in-dallas-tx-670x450.jpg",
                  }}
                />
                <Text style={styles.text1}>Dallas</Text>
              </View>
            </View>

            <View style={styles.content}>
              <View style={styles.stat}>
                <View style={styles.center}>
                  <Text style={styles.cen}>9.24.15</Text>

                  <View style={styles.firstText}>
                    <Text style={styles.first}>Dallas</Text>
                    <Text style={styles.first}>Texas,USA</Text>
                    <Text style={styles.first}>3 trips</Text>
                  </View>
                  <Text style={styles.last}>Last Visted</Text>
                  <Text style={styles.lastText}>8.15.23</Text>
                </View>
              </View>
            </View>

            <View style={styles.badge1}>
              <Image
                style={styles.tinylogo}
                source={{
                  uri: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRyk5Y00o2x6BWg5S8Fr0vAK_p7WGE19N0JXek-n7FO1UVZoOjaVJhcfpAjwP5dK-heMEyoTKaZavn19YBkvKAvu7MAR8cHqxIiDMNNlw",
                }}
              />
              <Text style={styles.text1}>Austin</Text>
            </View>

            <View style={styles.badge1}>
              <Image
                style={styles.tinylogo}
                source={{
                  uri: "https://lh5.googleusercontent.com/p/AF1QipN8CEMCG4Qrk5HIkMWAAgGg4DZt2pL-E_324a1q=w1080-h624-n-k-no",
                }}
              />
              <Text style={styles.text1}>New York</Text>
            </View>

            <View style={styles.badge1}>
              <Image
                style={styles.tinylogo}
                source={{
                  uri: "https://lh5.googleusercontent.com/p/AF1QipNf5g-XEHGykHukkEZM_GFw-EE-sqUkefr6EM-0=w1080-h624-n-k-no",
                }}
              />
              <Text style={styles.text1}>Houston</Text>
            </View>

            <View style={styles.badge1}>
              <Image
                style={styles.tinylogo}
                source={{
                  uri: "https://cdn.choosechicago.com/uploads/2022/03/RP_SKYDECK-44-1800x1202-1.jpg",
                }}
              />
              <Text style={styles.text1}>Chicago</Text>
            </View>

            <View style={styles.badge1}>
              <Image
                style={styles.tinylogo}
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/San_Jose_California_Skyline.jpg/2560px-San_Jose_California_Skyline.jpg",
                }}
              />
              <Text style={styles.text1}>San Jose</Text>
            </View>

            <View style={styles.badge1}>
              <Image
                style={styles.tinylogo}
                source={{
                  uri: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,f_avif,h_680,q_65,w_1440/v1/clients/sanantoniotx/River_Walk_Night_VSA_f4e9311c-acd1-4ebf-aa30-37f3264aaad6.jpg",
                }}
              />
              <Text style={styles.text1}>San Antonio</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    height: 600,
  },
  cen: {
    marginLeft: 10,
    color: "white",
    justifyContent: "flex-start",
  },
  first: {
    color: "white",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap", // Allows items to wrap into the next line
    justifyContent: "space-between",
  },
  firstText: {
    alignItems: "center",
    marginRight: 10,
    marginTop: 10,
    color: "white",
    justifyContent: "center",
  },
  last: {
    marginTop: 15,
    color: "white",
  },
  content: {
    width: "48%", // Set width for each item (2 columns)
    marginBottom: 10, // Space between rows
    justifyContent: "center",
    alignItems: "center",
  },
  lastText: {
    marginTop: 1,
    marginLeft: 10,
    color: "white",
    justifyContent: "flex-end",
  },
  center: {
    alignSelf: "center",
    marginTop: 15,
    marginLeft: 12,
  },
  statistics1: {
    flexDirection: "column",
    alignItems: "center",
    gap: 45,
    flexWrap: "wrap",
    marginBottom: 100,
    textAlign: "center",
  },
  statistics: {
    width: "48%", // Set width for each item (2 columns)
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10, // Space between rows
    justifyContent: "center",
    alignItems: "center",
  },
  stat: {
    width: 155,
    height: 155,
    backgroundColor: "#008080",
    borderRadius: 85,
    flexDirection: "column",
    marginLeft: 100,
  },
  text1: {
    color: "#2e8b57",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 15,
    marginTop: 12,
  },
  text2: {
    color: "#008080",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 15,
    marginTop: 12,
  },
  text3: {
    color: "#9370db",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 15,
    marginTop: 12,
  },
  text4: {
    color: "#696969",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 15,
    marginTop: 12,
  },
  text5: {
    color: "#bc8f8f",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 15,
    marginTop: 12,
  },
  text6: {
    color: "#4682b4",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 15,
    marginTop: 12,
  },
  text7: {
    color: "#008080",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 15,
    marginTop: 12,
  },

  badge1: {
    width: 110,
    height: 110,
    backgroundColor: "#2e8b57",
    borderRadius: 60,
    flexDirection: "column",
    justifyContent: "space-around",
    marginHorizontal: 10,
  },
  badge2: {
    width: 110,
    height: 110,
    backgroundColor: "#008080",
    borderRadius: 60,
    flexDirection: "column",
    justifyContent: "space-around",
    marginHorizontal: 10,
  },
  badge3: {
    width: 110,
    height: 110,
    backgroundColor: "#9370db",
    borderRadius: 60,
    flexDirection: "column",
    justifyContent: "space-around",
    marginHorizontal: 10,
  },
  badge4: {
    width: 110,
    height: 110,
    backgroundColor: "#696969",
    borderRadius: 60,
    flexDirection: "column",
    justifyContent: "space-around",
    marginHorizontal: 10,
  },
  badge5: {
    width: 110,
    height: 110,
    backgroundColor: "#bc8f8f",
    borderRadius: 60,
    flexDirection: "column",
    justifyContent: "space-around",
    marginHorizontal: 10,
  },
  badge6: {
    width: 110,
    height: 110,
    backgroundColor: "#4682b4",
    borderRadius: 60,
    flexDirection: "column",
    justifyContent: "space-around",
    marginHorizontal: 10,
  },
  badge7: {
    width: 110,
    height: 110,
    backgroundColor: "#008080",
    borderRadius: 60,
    flexDirection: "column",
    justifyContent: "space-around",
    marginHorizontal: 10,
  },

  tinylogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginTop: 30,
  },
});
