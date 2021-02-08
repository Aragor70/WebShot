const fs = require('fs');
const { google } = require('googleapis');
const ErrorResponse = require('./tools/ErrorResponse');

module.exports = (accessToken, fileName, response, next) => {


const authorize = (credentials, callback) => {

  const {client_secret, client_id, redirect_uris} = credentials.installed;

  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
 
  const code = accessToken

    oAuth2Client.getToken(code, async(err, token) => {

      if (err) {
        return next(new ErrorResponse('User not authorised. here', 401))
      }
      
        oAuth2Client.setCredentials(token);
      
        callback(oAuth2Client)

    });
}

const uploadFile = (auth) => {
  const drive = google.drive({ version: 'v3', auth });
  
  const name = fileName
  
  const fileMetadata = { 'name': name };
  const media = {
      mimeType: 'image/jpeg',
      body: fs.createReadStream(name)
  };

  drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id'

  }, function (err, res) {

      if (err) {
          // Handle error
          return next(new ErrorResponse('User not authorised', 401))

      } else {
          console.log('File Id: ', res.data.id);
          
          return response.json({ success: true, message: 'File has been saved' })
      }
  });

}


// Load client secrets from a local file.
fs.readFile('credentials.json', async(err, content) => {

  if (err) {
    return next(new ErrorResponse('Server not found.', 404))
  }
  try {
    // Authorize a client with credentials, then call the Google Drive API.
    
    authorize(JSON.parse(content), uploadFile);
  } catch (err) {
    return next(new ErrorResponse('Server not found.', 404))
  }
  
});

}