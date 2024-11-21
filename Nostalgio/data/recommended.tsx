import { MapMarkerProps } from "react-native-maps";
export type MarkerWithMetadata = {
  title?: MapMarkerProps["title"];
  description?: MapMarkerProps["description"];
  imageUrl?: string;
};
export const markers: MarkerWithMetadata[] = [
  {
    title: "Fortnight (feat. Post Malone)",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738ecc33f195df6aa257c39eaa",
    description: "Taylor Swift, Post Malone",
  },
  {
    title: "NEW DROP",
    description: "Don Toliver",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b273c800e1a4a237cf8f085183c5",
  },
  {
    title: "Please Please Please",
    description: "Sabrina Carpenter",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/f/fd/Short_n%27_Sweet_-_Sabrina_Carpenter.png",
  },
  {
    title: "Waves - OCULA Remix",
    description: "Le Youth, OCULA",
    imageUrl:
      "https://i1.sndcdn.com/artworks-rrLCyNFCWVb9jBwV-nup4bw-t500x500.jpg",
  },
  {
    title: "Die With A Smile",
    description: "Lady Gaga, Bruno Mars",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/1/12/Lady_Gaga_and_Bruno_Mars_-_Die_with_a_Smile.png",
  },
  {
    title: "Low Life (feat. The Weeknd)",
    description: "Future, The Weeknd",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b273626745b3aa04899001a924ad",
  },
  {
    title: "Cinnamon Girl",
    description: "Lana Del Rey",
    imageUrl:
      "https://images.genius.com/973c2301386e950f39da5eb5ee565cd3.1000x1000x1.png",
  },
  {
    title: "BIRDS OF A FEATHER",
    description: "Billie Eilish",
    imageUrl:
      "https://i.scdn.co/image/ab67616d00001e0271d62ea7ea8a5be92d3c1f62",
  },
  {
    title: "Champagne Coast",
    description: "Blood Orange",
    imageUrl: "https://i1.sndcdn.com/artworks-CKM7PGicRV6W-0-t500x500.png",
  },
  {
    title: "Ojitos Lindos",
    description: "Bad Bunny, Bomba Estèreo",
    imageUrl:
      "https://media.pitchfork.com/photos/627425dbc85171592b8a6e6a/master/pass/Bad-Bunny-Un-Verano-Sin-Ti.jpg",
  },
];
