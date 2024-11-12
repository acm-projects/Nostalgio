import { useState, useLayoutEffect, useContext } from "react";
import CalendarPicker from "react-native-calendar-picker";
import {View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, useColorScheme} from 'react-native';
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { Tabs, useNavigation } from "expo-router";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Unbounded_500Medium } from "@expo-google-fonts/unbounded";
import {DateContext} from "@/components/DateContext";
import { RouteProp, useRoute } from "@react-navigation/native";




export default function Calendar() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Map",
      headerTintColor: "#FFFFFF",
      headerTitleStyle: {
        color: colorScheme === "dark" ? "#FFFFFF" : "#000000",
      },
      headerTransparent: true,
      title: "",
    });
  });

  const minDate = new Date();
  const [selectedStartDate, setSelectedStartDate]=useState('DD/MM/YYYY');
  const [selectedEndDate, setSelectedEndDate]=useState('DD/MM/YYYY'); 
  const [startFinal, setStartFinal] = useState("");
  const [endFinal, setEndFinal] = useState("");

  const onSchedule = () => {
    setStartFinal(selectedStartDate);
    setEndFinal(selectedEndDate);
    navigation.goBack();
  }

  const onDateChange=(date: any, type: any) => {
      const newDate=JSON.stringify(date);
      const newDate1=newDate.substring(1,newDate.length - 1);
      const dates=newDate.split("T");
      const date1=dates[0].split("-");
      const day=date1[2];
      const month=date1[1];
      const year=date1[0].substring(1,date1[0].length);

      if(type==='END_DATE'){
        if(day==undefined){
          setSelectedEndDate('MM/DD/YYYY');
        }else{
          setSelectedEndDate(month+"/"+day+"/"+year);
        }
      }else{
        setSelectedStartDate(month+"/"+day+"/"+year);
        setSelectedEndDate('MM/DD/YYYY');
      }
    }
  

    return (
      <ImageBackground
        source={require("@/assets/images/gradient.png")}
        resizeMode="cover"
        style={[StyleSheet.absoluteFillObject, { flex: 1 }]}
      >
        <Text style={styles.text}>Schedule your trip</Text>
        <View
          style={{
            backgroundColor: "#3A0CA3",
            height: 380,
            width: 380,
            left: 17,
            paddingTop: 15,
            borderRadius: 40,
          }}
        >
          <CalendarPicker
            allowRangeSelection={true}
            allowBackwardRangeSelect={true}
            showDayStragglers={true}
            minDate={minDate}
            previousTitle="Prev"
            previousTitleStyle={{ fontSize: 14, left: 5 }}
            nextTitleStyle={{ fontSize: 14, right: 5 }}
            todayBackgroundColor="#4361EE"
            selectedDayColor="white"
            selectedDayTextColor="#3A0CA3"
            todayTextStyle={{ color: "white" }}
            onDateChange={onDateChange}
            textStyle={{
              fontFamily: "Unbounded_500Medium",
              color: "white",
            }}
            dayLabelsWrapper={{ borderColor: "white" }}
            monthTitleStyle={{ paddingRight: 8, fontSize: 20 }}
            yearTitleStyle={{ fontSize: 19 }}
            width={380}
            height={380}
          ></CalendarPicker>
          <TouchableOpacity
            style={styles.button}
            onPress={onSchedule}
          >
            <Text
              style={{
                fontFamily: "Unbounded_500Medium",
                fontSize: 20,
                textAlign: "center",
                color: "white",
              }}
            >
              Schedule
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );

};





//<Text style={styles.date}>{"Start Date: " + selectedStartDate}</Text>
//<Text style={styles.endDate}>{"End Date: " + selectedEndDate}</Text>

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
  
    },
    text:{
      flex: 0.45,
      fontFamily: "Unbounded_400Regular",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      fontSize: 48,
      textAlign: "center",
      paddingHorizontal: 15,
      marginTop: 120
    },
    date:{
      fontFamily: "Unbounded_400Regular",
      color: "white",
      fontSize: 18,
      textAlign: "center",
      marginTop: 30, 
    },
    endDate:{
      fontFamily: "Unbounded_400Regular",
      color: "white",
      fontSize: 18,
      textAlign: "center",
      marginTop: 10, 
    },
    button:{
      width:170,
      height: 40, 
      backgroundColor: "#4361ee",
      justifyContent: 'center',
      alignSelf: "center",
      borderRadius: 30,
      marginTop: 20
    }

})

