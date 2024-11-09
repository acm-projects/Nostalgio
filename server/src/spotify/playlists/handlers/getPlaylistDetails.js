import axios from 'axios';
import { validateSpotifyToken } from '../../../auth/spotify/spotifyTokenManager.js';

/**
 * Handler to retrieve and format details of a Spotify playlist for a user.
 * 
 * @param {Object} event - The API Gateway Lambda event object containing path parameters.
 * @returns {Object} - HTTP response with formatted playlist details or an error message.
 */
export const getPlaylistDetailsHandler = async (event) => {
  let userId, playlistId;

  try {
    // Step 1: Extract userId and playlistId from the request
    ({ userId, playlistId } = event.pathParameters);

    if (!userId || !playlistId) {
      console.warn('Missing userId or playlistId in the request');
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing userId or playlistId' }),
      };
    }

    console.log(`Fetching playlist details for user: ${userId}, playlistId: ${playlistId}`);

    // Step 2: Retrieve a valid Spotify access token for the user
    const tokenValidationResponse = await validateSpotifyToken(event);
    const { accessToken } = JSON.parse(tokenValidationResponse.body);

    if (!accessToken) {
      throw new Error(`No valid access token available for user: ${userId}`);
    }

    // Step 3: Make the API call to Spotify to retrieve playlist details
    const response = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const { name, description, owner, images, tracks, external_urls } = response.data;

    // Step 4: Format the playlist data into a user-friendly structure
    const formattedPlaylist = {
      playlistId,
      name,
      description,
      link: external_urls.spotify, // Spotify link for the playlist
      owner: {
        id: owner.id,
        name: owner.display_name,
        externalUrl: owner.external_urls.spotify,
      },
      images: images.map((image) => ({
        url: image.url,
        width: image.width,
        height: image.height,
      })),
      totalTracks: tracks.total,
      tracks: tracks.items.map((item) => ({
        trackId: item.track.id,
        name: item.track.name,
        artistNames: item.track.artists.map((artist) => artist.name).join(', '),
        albumName: item.track.album.name,
        durationMs: item.track.duration_ms,
        previewUrl: item.track.preview_url,
        externalUrl: item.track.external_urls.spotify,
        addedAt: item.added_at,
        albumImages: item.track.album.images.length > 0 ? {
          small: item.track.album.images[2] || null,
          medium: item.track.album.images[1] || null,
          large: item.track.album.images[0] || null,
        } : null,
      })),
    };

    console.log(`Successfully fetched and formatted playlist details for playlistId: ${playlistId}`);

    // Step 5: Return the formatted playlist data
    return {
      statusCode: 200,
      body: JSON.stringify(formattedPlaylist),
    };
  } catch (error) {
    console.error(`Error fetching playlist details for user: ${userId}, playlistId: ${playlistId} - ${error.message}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to retrieve playlist details', error: error.message }),
    };
  }
};
