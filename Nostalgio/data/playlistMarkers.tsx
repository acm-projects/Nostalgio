import { MapMarkerProps} from "react-native-maps";

export type PlaylistMarker = {
    coordinate: MapMarkerProps["coordinate"]
    image: string;
    tripNum?: string;
  };

export const playlists: PlaylistMarker[] = [
    {
        coordinate: { 
            latitude: 41.877495, 
            longitude: -87.656607 
        },
        image: "https://imageio.forbes.com/specials-images/imageserve/640e25d1d8b952e8f07aa269/Sunrise-at-Cloud-Gate/1960x0.jpg?format=jpg&width=960",
        tripNum: "3"
    },
    {
        coordinate: { 
            latitude: 29.747857, 
            longitude: -95.373558 
        },
        image: "https://cdn.britannica.com/27/94227-050-285CBFD4/Night-view-skyline-Houston-Texas.jpg",
    },
    {
        coordinate: { 
            latitude: 39.100370, 
            longitude: -106.748284
        },
        image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Ski_Famille_-_Family_Ski_Holidays.jpg",
        tripNum: "10"
    },
    {
        coordinate: {
            latitude: 37.329174,
            longitude: -122.043130
        },
        image: "https://cdn.britannica.com/13/77413-050-95217C0B/Golden-Gate-Bridge-San-Francisco.jpg",
        //tripNum: "1"
    }
  ];