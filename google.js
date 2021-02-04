const fs = require('fs');
const { google } = require('googleapis');

module.exports = (accessToken, fileName) => {




// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {

  if (err) return console.log('Error loading client secret file:', err);

  // Authorize a client with credentials, then call the Google Drive API.
  authorize(JSON.parse(content), listFiles);
  //authorize(JSON.parse(content), getFile);
  authorize(JSON.parse(content), uploadFile);

});

const authorize = (credentials, callback) => {

  const {client_secret, client_id, redirect_uris} = credentials.installed;

  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  getAccessToken(oAuth2Client, callback)

}


const getAccessToken = (oAuth2Client, callback) => {
  
  const code = accessToken

    oAuth2Client.getToken(code, (err, token) => {

      if (err) return console.error('Error retrieving access token', err);

      oAuth2Client.setCredentials(token);
      
      callback(oAuth2Client)

    });
}


const listFiles = (auth) => {
  const drive = google.drive({ version: 'v3', auth });
  getList(drive, '');
}

const getList = (drive, pageToken) => {
  drive.files.list({
      corpora: 'user',
      pageSize: 10,
      //q: "name='elvis233424234'",
      pageToken: pageToken ? pageToken : '',
      fields: 'nextPageToken, files(*)',
  }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = res.data.files;
      if (files.length) {
          console.log('Files:');
          processList(files);
          if (res.data.nextPageToken) {
              getList(drive, res.data.nextPageToken);
          }

      } else {
          console.log('No files found.');
      }
  });
}



const processList = (files) => {
  console.log('Processing....');
  files.forEach(file => {
      // console.log(file.name + '|' + file.size + '|' + file.createdTime + '|' + file.modifiedTime);
      console.log(file);
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
          console.log(err);
      } else {
        
          console.log('File Id: ', res.data.id);
      }
  });
}


const getFile = (auth, fileId) => {
  const drive = google.drive({ version: 'v3', auth });
  drive.files.get({ fileId: fileId, fields: '*' }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      console.log(res.data); c
  });
}

}