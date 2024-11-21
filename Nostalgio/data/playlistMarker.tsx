import { MapMarkerProps } from "react-native-maps";
export type PlaylistMarker = {
  coordinate: MapMarkerProps["coordinate"];
  image: string;
  tripNum?: string;
};
export const playlists: PlaylistMarker[] = [
  {
    //chicago
    coordinate: {
      latitude: 41.8781,
      longitude: -87.6298,
    },
    image:
      "https://nostalgio-user-content.s3.us-east-1.amazonaws.com/users/0428c428-a051-7098-6a7e-3b6cfa6d9417/playlists/6Z96OcBxuKUa5Npuuv3B3s.webp",
    tripNum: "3",
  },
  {
    //banff
    coordinate: {
      latitude: 51.1784,
      longitude: -115.5708,
    },
    image:
      "https://nostalgio-user-content.s3.us-east-1.amazonaws.com/users/0428c428-a051-7098-6a7e-3b6cfa6d9417/playlists/0clj2OhZFIV7njUXHeMSlm.jpeg",
  },
  {
    //mexico city
    coordinate: {
      latitude: 19.4326,
      longitude: -99.1332,
    },
    image:
      "https://nostalgio-user-content.s3.us-east-1.amazonaws.com/users/0428c428-a051-7098-6a7e-3b6cfa6d9417/playlists/4KEXrigbAefsi1D6A3ipRR.webp",
  },
  {
    //vancouver
    coordinate: {
      latitude: 49.2827,
      longitude: -123.1207,
    },
    image:
      "https://nostalgio-user-content.s3.us-east-1.amazonaws.com/users/0428c428-a051-7098-6a7e-3b6cfa6d9417/playlists/3zbKoStJxTqW5HfY0X1q4m.HEIC",
  },
  {
    //queenstown
    coordinate: {
      latitude: -45.0312,
      longitude: 168.6626,
    },
    image:
      "https://nostalgio-user-content.s3.us-east-1.amazonaws.com/users/0428c428-a051-7098-6a7e-3b6cfa6d9417/playlists/2oYVS6YmbsIXx0w3u4ciW3.webp",
  },
  {
    //seattle
    coordinate: {
      latitude: 47.6062,
      longitude: -122.3321,
    },
    image:
      "https://nostalgio-user-content.s3.us-east-1.amazonaws.com/users/0428c428-a051-7098-6a7e-3b6cfa6d9417/playlists/3imDptg0U3ZwLNMM6HKaA4.jpg",
    tripNum: "2",
  },
  {
    //new york
    coordinate: {
      latitude: 40.7128,
      longitude: -74.006,
    },
    image:
      "https://nostalgio-user-content.s3.us-east-1.amazonaws.com/users/0428c428-a051-7098-6a7e-3b6cfa6d9417/playlists/2kWM5XIcdjvGhmWddpqNg4.jpg",
  },
  {
    //san francisco
    coordinate: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
    image:
      "https://nostalgio-user-content.s3.us-east-1.amazonaws.com/users/0428c428-a051-7098-6a7e-3b6cfa6d9417/playlists/2e9LBU3KmdeYRiFqzDhluT.jpeg",
    tripNum: "4",
  },
  {
    //san diego
    coordinate: {
      latitude: 32.7157,
      longitude: -117.1611,
    },
    image:
      "https://nostalgio-user-content.s3.us-east-1.amazonaws.com/users/0428c428-a051-7098-6a7e-3b6cfa6d9417/playlists/5rV6Ng4GIYrodEkwjFIjo0.jpg",
  },
  {
    //las vegas
    coordinate: {
      latitude: 36.179491,
      longitude: -115.157961,
    },
    image:
      "https://assets.simpleviewcms.com/simpleview/image/upload/c_limit,h_1200,q_75,w_1200/v1/clients/lasvegas/RR_LVCVA_Strip_Caesars_Bellagio_Paris_SM_1__704abf3c-7d0a-4d56-ae67-3167dc7784b4.jpg",
  },
  {
    //denver
    coordinate: {
      latitude: 39.830002,
      longitude: -105.03658,
    },
    image: "https://hotel-kaya.com/assets/uploads/2022/06/regles-ski-alpin.jpg",
    tripNum: "3",
  },
  {
    //houston
    coordinate: {
      latitude: 29.82969,
      longitude: -95.440653,
    },
    image:
      "https://www.houston.org/sites/default/files/2024-06/Houston%20Skyline%20Sunset.jpg",
  },
  {
    //cancun
    coordinate: {
      latitude: 21.236653,
      longitude: -86.926248,
    },
    image:
      "https://images.stockcake.com/public/0/9/f/09fad6da-c54a-4925-99b7-827d5d766a4d_large/tropical-beach-paradise-stockcake.jpg",
  },
];
