import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import geohash from 'ngeohash';  // For geohashing

// Initialize DynamoDB Client
const dynamoDbClient = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);

// Use environment variable for table name
const tableName = process.env.LISTENING_HISTORY_TABLE || 'ListeningHistoryTable';

/**
 * Generates multiple geohashes in the surrounding area based on the center point and precision.
 * 
 * @param {Number} lat - Latitude of the center point.
 * @param {Number} lon - Longitude of the center point.
 * @param {Number} precision - The geohash precision (default is 5, which corresponds to city-level).
 * @returns {Array} - An array of geohashes covering the area.
 */
const generateGeohashesInRadius = (lat, lon, precision = 5) => {
  const centerGeohash = geohash.encode(lat, lon, precision);
  const neighbors = geohash.neighbors(centerGeohash);  // Get neighboring geohashes
  return [centerGeohash, ...neighbors];  // Return the center and neighboring geohashes
};


/**
 * Store listening history with geohash, latitude, longitude, and detailed track and user-specific data.
 * 
 * This function stores a record of a user's listening history, capturing the user's location, track details, artist info,
 * album metadata, and audio features at the time of listening.
 * 
 * @param {Number} lat - Latitude of the location.
 * @param {Number} lon - Longitude of the location.
 * @param {Object} itemData - Data related to the track, user, and additional attributes.
 */
export const storeTrackWithLocation = async (lat, lon, itemData) => {
  const timestamp = Math.floor(Date.now() / 1000);  // Unix timestamp in seconds
  const geoHash = geohash.encode(lat, lon, 5);  // Generate a geohash with precision 5 (city-level)

  // Define the DynamoDB parameters for storing the listening history
  const params = {
    TableName: tableName,
    Item: {
      geohash: geoHash,                // Partition key: geohash
      timestamp: timestamp,            // Sort key: current timestamp (for sorting by time within geohash)
      userId: itemData.userId,         // GSI for user-specific queries
      trackId: itemData.trackId,       // Track ID to identify the song
      latitude: lat,                   // Store latitude as a number
      longitude: lon,                  // Store longitude as a number
      artistIds: itemData.artistIds,   // Array of artist IDs, stored as a List of Strings
      artistNames: itemData.artistNames, // List of artist names for display purposes
      trackUri: itemData.trackUri,     // Spotify URI for playback reference
      genres: itemData.genres,         // List of genres associated with the track
      audioFeatures: {                 // Store audio features in a Map
        tempo: Number(itemData.audioFeatures.tempo),
        danceability: Number(itemData.audioFeatures.danceability),
        energy: Number(itemData.audioFeatures.energy),
        acousticness: Number(itemData.audioFeatures.acousticness),
        valence: Number(itemData.audioFeatures.valence),
      },
      track_url: itemData.trackUrl,    // Spotify track URL for easy access
      album: {                         // Nested album data with name, release date, and images
        name: itemData.album.name, 
        releaseDate: itemData.album.releaseDate,
        images: itemData.album.images.map(image => ({
          url: image.url,             // Each image stored as an object with URL
          width: image.width,         // Store image width if available
          height: image.height        // Store image height if available
        })),
      },
    }
  };

  try {
    console.log(`[INFO] Storing listening history for user: ${itemData.userId}, track ID: ${itemData.trackId}, geohash: ${geoHash}`);
    await dynamoDb.send(new PutCommand(params));
    console.log(`[INFO] Successfully stored listening history for track ID: ${itemData.trackId}, geohash: ${geoHash}`);
  } catch (error) {
    console.error(`[ERROR] Failed to store listening history for user: ${itemData.userId}, track ID: ${itemData.trackId} - ${error.message}`);
    throw new Error('Failed to store listening history.');
  }
};

/**
 * Query tracks by geohash or radius. If no radius is provided, it defaults to a city-level search.
 * 
 * @param {Number} lat - Latitude of the center point.
 * @param {Number} lon - Longitude of the center point.
 * @param {Number} radius - The search radius in meters (optional).
 * @returns {Array} - List of tracks within the radius or geohash.
 */
export const queryTracksByGeohashOrRadius = async (lat, lon, radius = null) => {
  if (!radius) {
    console.log(`Querying by single geohash at precision 5 (city-level)`);
    const geoHash = geohash.encode(lat, lon, 5);  // City-level precision
    return queryByGeohash(geoHash);
  }

  console.log(`Querying by multiple geohashes for radius: ${radius} meters`);
  const geohashes = generateGeohashesInRadius(lat, lon, 5);
  return queryMultipleGeohashes(geohashes);
};

/**
 * Query tracks by a single geohash (city-level).
 * 
 * @param {String} geoHash - The geohash to query.
 * @returns {Array} - List of tracks in the geohash.
 */
const queryByGeohash = async (geoHash) => {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'geohash = :geohash',
    ExpressionAttributeValues: {
      ':geohash': geoHash
    }
  };

  try {
    console.log(`Querying for tracks in geohash: ${geoHash}`);
    const result = await dynamoDb.send(new QueryCommand(params));
    console.log(`Found ${result.Items.length} tracks`);
    return result.Items;
  } catch (error) {
    console.error(`Error querying tracks by geohash ${geoHash}: ${error.message}`);
    throw new Error('Failed to query tracks by geohash.');
  }
};

/**
 * Query tracks by multiple geohashes to cover a larger area.
 * 
 * @param {Array} geohashes - List of geohashes to query.
 * @returns {Array} - List of tracks in the geohashes.
 */
const queryMultipleGeohashes = async (geohashes) => {
  const tracks = [];

  for (const geoHash of geohashes) {
    const params = {
      TableName: tableName,
      KeyConditionExpression: 'geohash = :geohash',
      ExpressionAttributeValues: {
        ':geohash': geoHash
      }
    };

    try {
      console.log(`Querying for tracks in geohash: ${geoHash}`);
      const result = await dynamoDb.send(new QueryCommand(params));
      tracks.push(...result.Items);
    } catch (error) {
      console.error(`Error querying tracks for geohash ${geoHash}: ${error.message}`);
    }
  }

  console.log(`Found a total of ${tracks.length} tracks across all geohashes`);
  return tracks;
};
