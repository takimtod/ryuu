const axios = require('axios');

const clientId = '8f777f61f80e4051b754d8e50310ad6e';
const clientSecret = '0f497309cb264e79abdeb37b045f6c79';
const base64Credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

async function searchSpotifyTrack(query) {
  try {
    // Step 1: Get Access Token
    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const data = 'grant_type=client_credentials';
    const base64Credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const tokenResponse = await axios.post(tokenUrl, data, {
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = tokenResponse.data.access_token;

    // Step 2: Search for a Track
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`;
    
    const searchResponse = await axios.get(searchUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    // Process and return information for the first track
    const firstTrack = searchResponse.data.tracks.items[0];
    if (!firstTrack) {
      return { error: 'No tracks found' };
    }

    const result = {
      trackName: firstTrack.name,
      artistName: firstTrack.artists.map(artist => artist.name).join(', '),
      previewUrl: firstTrack.preview_url,
      externalUrl: firstTrack.external_urls.spotify,
    };

    return result;

  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return { error: 'Failed to retrieve tracks' };
  }
}
module.exports = { searchSpotifyTrack }