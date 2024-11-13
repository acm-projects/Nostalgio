import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../../components/Login'; 



export default function HomeScreen() : JSX.Element{
  return (
    // <NavigationContainer>
    //   <Tab.Navigator>
    //     {/* Use the Login component in one of the tabs */}
    //     <Tab.Screen name="login" component={login} />
    //   </Tab.Navigator>
    // </NavigationContainer>

  <Login />
  
  );
}


