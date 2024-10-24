
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(true, true),
      }}>
      <Tabs.Screen
        name="two"
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <View style={styles.customHeaderContainer}>
         
               
          
            
              </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  customHeaderContainer: {
    width:50,
    height:50,
    marginRight:380,
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center',

  },
  customHeaderContainer1:
  {

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  routing: 
  {
    marginTop:640,
  },
  text11: 
  {
    color: 'gray',
    fontSize: 15,
    lineHeight: 84,
    fontWeight: 'bold',
    marginTop:-60,
    marginLeft:-16,
  

  },
  followers:
  {
    borderColor:'black',
    marginTop:1,
    display:'flex',
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:'center',


  },
  num:
  {
    display:'flex',
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:'center',


  },
  text1: 
  {
    color: 'black',
    fontSize: 15,
    lineHeight: 84,
    fontWeight: 'bold',
  

  },
  headerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width:90,
  },

});
