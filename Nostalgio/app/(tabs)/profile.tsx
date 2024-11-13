import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet } from 'react-native';

const ProfileScreen = (userId:string) => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        // Replace `userId` dynamically and use the provided endpoint
        const response = await fetch(`https://6p6xrc3hu4.execute-api.us-east-1.amazonaws.com/dev/users/{userId}`);
        const data = await response.json();
        
        if (data && data.SpotifyProfileImageUrl) {
          setProfilePhoto(data.SpotifyProfileImageUrl);
        }
      } catch (error) {
        console.error('Error fetching profile photo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfilePhoto();
  }, [userId]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      {profilePhoto ? (
        <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
      ) : (
        <View style={styles.placeholder}>
          {/* Fallback content if photo doesn't load */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  loader: {
    marginTop: 20,
  },
  placeholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ccc',
  },
});

export default ProfileScreen;
