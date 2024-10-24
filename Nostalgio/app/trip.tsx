import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function TripPage() {
  const { id } = useLocalSearchParams(); // This will extract the id from the URL
  
  console.log("Opened", id);

  return (
    <View>
      <Text>Trip ID: {id}</Text>
      {/* You can now fetch data or render the trip based on this ID */}
    </View>
  );
}
