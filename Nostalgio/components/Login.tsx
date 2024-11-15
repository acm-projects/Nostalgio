import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Linking, Alert, ImageBackground, TouchableOpacity, Image, ActivityIndicator, LinkingStatic } from 'react-native';
import axios, {Axios} from 'axios'

const Login: React.FC = ( navigator:any, userID:any  ) => {
  const [loading, setLoading] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const defaultImageUrl = 'https://picsum.photos/seed/picsum/200/300'; 

  const handleSpotifyLogin = async () => {
    setLoading(true);
    
    try {
      const apiUrl = `https://6p6xrc3hu4.execute-api.us-east-1.amazonaws.com/dev/auth/login`;
      await Linking.openURL(apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json(); 
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Unable to initiate login process.');
    } finally {
      setLoading(false);
    }
  };

  const fetchProfileImage = async () => {
    if (userID) {
      navigator.navigate('Badges'); // Adjust this to your Spotify login screen name
      return;
    }

    try {
      const response = await axios.get(` https://6p6xrc3hu4.execute-api.us-east-1.amazonaws.com/dev/users/{userId}`);
      const { CustomProfileImageUrl, SpotifyProfileImageUrl } = response.data;

      // Set the profile image with priority: CustomProfileImageUrl > SpotifyProfileImageUrl > defaultImageUrl
      setProfileImageUrl(CustomProfileImageUrl || SpotifyProfileImageUrl || defaultImageUrl);
      
    } catch (error) {
      console.error('Error fetching profile image:', error);
      Alert.alert("Error", "Failed to load profile image. Please try again.");
      setProfileImageUrl(null); // Fallback to default image if there's an error
    }
  };

  useEffect(() => {
    fetchProfileImage();
  }, [userID]);


 

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("@/assets/images/background.png")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <View style={styles.textContainer}>
          <Text style={styles.title}>Nostalgio</Text>
          <Text style={styles.subtitle}>
            Nostalgio needs to connect to your Spotify account to make your music memorable
          </Text>
        </View>

        <View style={{ padding: 20}}>
          <TouchableOpacity
            onPress={handleSpotifyLogin}

            style={styles.spotifyButton}
            disabled={loading}
          >
            {loading ? (
              <Text style={{ color: 'white', fontSize: 15, fontFamily: 'Unbounded-Regular', alignSelf:'center' }}>
                <ActivityIndicator size="large" color="#FFFFFF" style={{ top: 25 }} />
              </Text>
            ) : (
              <>
                <Image source={require('@/assets/images/Spotify.png')} style={styles.spotifyImage} />
                <Text style={{ color: 'white', fontSize: 16.5, fontFamily: 'Unbounded-Regular', width:180,}}>
                  Connect your Spotify account
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 55,
    marginTop: 50,
    marginBottom: 130,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Unbounded-Regular',
  },
  subtitle: {
    fontSize: 20,
    width: 250,
    textAlign: 'center',
    color: 'white',
    marginVertical: 10,
    fontFamily: 'Unbounded-Regular',
  },
  spotifyButton: {
    flexDirection: 'row', // Align the image and text horizontally
    alignItems: 'center', // Vertically align image and text
    backgroundColor: 'lightgray',
    opacity: 0.68,
    padding: 10,
    borderRadius: 60,
    height: 110,
    width: 300,
  },
  spotifyImage: {
    marginRight: 10, // Adds some space between image and text
    height: 100,
    width: 100,
  },
});

export default Login;