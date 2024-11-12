import { MapMarkerProps} from "react-native-maps";

export type MarkerWithMetadata = {
    title?: MapMarkerProps["title"];
    description?: MapMarkerProps["description"];
    imageUrl?: string;
  };

export const markers: MarkerWithMetadata[] = [
    {
      title: "End of Beginning",
      //imageUrl: '../../assets/images/dallas.png',
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Djo_-_End_of_Beginning_single_cover.png/220px-Djo_-_End_of_Beginning_single_cover.png",
      description: "Djo",
    },
    {
      title: "Chicago Freestyle (feat. Giveon)",
      description: "Drake, Giveon, Future, Playboi Carti",
      imageUrl:
        "https://i.scdn.co/image/ab67616d0000b273bba7cfaf7c59ff0898acba1f",
    },
  ];

  /*
// Transform the API response into the markers format
  export async function getMarkers() {
    const recommendations : MarkerWithMetadata[] = await musicSuggestions();
    // Map the API response to match the MarkerWithMetadata structure
    return recommendations.map((recommendation) => {
      const { track } = recommendation;
      return {
        title: track.album.name, // Use the album name as the title
        description: track.artistIds.join(", "), // Combine artist IDs as a placeholder for artist names
        imageUrl: track.album.images[0].url, // Use the first image in the album as the image URL
      };
    });
  }*/