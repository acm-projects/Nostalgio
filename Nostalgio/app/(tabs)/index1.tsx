import React from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";

const ManualColumnExample = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.grid}>
        {/* Row 1 */}
        <View style={styles.itemContainer}>
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

        <View style={styles.itemContainer}>
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

        {/* Row 2 */}
        <View style={styles.itemContainer}>
          <View style={styles.badge1}>
            <Image
              style={styles.tinylogo}
              source={{
                uri: "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRyk5Y00o2x6BWg5S8Fr0vAK_p7WGE19N0JXek-n7FO1UVZoOjaVJhcfpAjwP5dK-heMEyoTKaZavn19YBkvKAvu7MAR8cHqxIiDMNNlw",
              }}
            />
            <Text style={styles.text1}>Austin</Text>
          </View>
        </View>

        <View style={styles.itemContainer}>
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

        {/* Row 3 */}
        <View style={styles.itemContainer}>
          <View style={styles.badge1}>
            <Image
              style={styles.tinylogo}
              source={{
                uri: "https://lh5.googleusercontent.com/p/AF1QipN8CEMCG4Qrk5HIkMWAAgGg4DZt2pL-E_324a1q=w1080-h624-n-k-no",
              }}
            />
            <Text style={styles.text1}>New York</Text>
          </View>
        </View>
        <View style={styles.itemContainer}>
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

        {/* Row 4 */}
        <View style={styles.itemContainer}>
          <View style={styles.badge1}>
            <Image
              style={styles.tinylogo}
              source={{
                uri: "https://lh5.googleusercontent.com/p/AF1QipNf5g-XEHGykHukkEZM_GFw-EE-sqUkefr6EM-0=w1080-h624-n-k-no",
              }}
            />
            <Text style={styles.text1}>Houston</Text>
          </View>
        </View>
        <View style={styles.itemContainer}>
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

        {/* Row 5 */}
        <View style={styles.itemContainer}>
          <View style={styles.badge1}>
            <Image
              style={styles.tinylogo}
              source={{
                uri: "https://cdn.choosechicago.com/uploads/2022/03/RP_SKYDECK-44-1800x1202-1.jpg",
              }}
            />
            <Text style={styles.text1}>Chicago</Text>
          </View>
        </View>
        <View style={styles.itemContainer}>
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

        {/* Row 1 */}
        <View style={styles.itemContainer}>
          <View style={styles.badge1}>
            <Image
              style={styles.tinylogo}
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/San_Jose_California_Skyline.jpg/2560px-San_Jose_California_Skyline.jpg",
              }}
            />
            <Text style={styles.text1}>San Jose</Text>
          </View>
        </View>
        <View style={styles.itemContainer}>
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

        {/* Row 2 */}
        <View style={styles.itemContainer}>
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

        <View style={styles.itemContainer}>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {},
  grid: {
    flexDirection: "row",
    flexWrap: "wrap", // Allows items to wrap into the next line
    justifyContent: "space-between", // Aligns items evenly
  },
  itemContainer: {
    width: "50%", // Set width for each item (2 columns)
    marginBottom: 50, // Space between rows
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    color: "white",
    fontSize: 16,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cen: {
    marginLeft: 10,
    marginBottom: 12,
    marginTop: -15,
    color: "white",
    justifyContent: "flex-start",
  },
  first: {
    color: "white",
  },
  firstText: {
    alignItems: "center",
    marginRight: 10,
    marginTop: -3,
    color: "white",
    justifyContent: "center",
  },
  last: {
    marginTop: 15,
    color: "white",
  },
  content: {
    marginBottom: 100, // Space between rows
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
  stat: {
    width: 155,
    height: 155,
    backgroundColor: "#9370db",
    borderRadius: 40,
    justifyContent: "center",
    flexDirection: "column",
    marginLeft: 100,
  },
  text1: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    alignItems: "center",
    fontSize: 15,
    marginTop: 12,
  },
  badge1: {
    width: 100,
    height: 80,
    borderWidth: 3,
    borderColor: "purple",
    flexDirection: "column",
    justifyContent: "space-around",
    marginHorizontal: 10,
  },
  tinylogo: {
    width: 120,
    height: 150,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: 20,
    borderColor: "#9370db",
    borderWidth: 4,
  },
});

export default ManualColumnExample;
