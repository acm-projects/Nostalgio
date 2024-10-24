/**
 * Helper function to extract artist IDs from an array of Spotify tracks.
 * Each track may contain multiple artists, so this function handles that.
 * 
 * @param {Array} tracks - The array of track objects from a Spotify API response.
 * @returns {Array} - Array of unique artist IDs.
 */
export const getArtistIds = (tracks) => {
    if (!tracks || tracks.length === 0) {
      console.log('No tracks available to extract artist IDs from.');
      return [];
    }
  
    // Extract artist IDs and filter out duplicates
    const artistIds = new Set();
  
    tracks.forEach(track => {
      if (track.artists && track.artists.length > 0) {
        track.artists.forEach(artist => {
          artistIds.add(artist.id);  // Add artist ID to the set to ensure uniqueness
        });
      }
    });
  
    const artistIdsArray = [...artistIds];  // Convert Set to Array
    console.log(`Extracted ${artistIdsArray.length} unique artist IDs: ${artistIdsArray}`);
  
    return artistIdsArray;
  };
  