const express = require('express');
const router = express.Router();
const fs = require('fs');
const asyncHandler = require('../../middlewares/async');
const screenshotmachine = require('screenshotmachine');
const { google } = require('googleapis');
const saveFile = require('../../google');
const ErrorResponse = require('../../tools/ErrorResponse');
var validUrl = require('valid-url');

const credentials = require('../../credentials.json');

//route POST   api/urls
//description  generate the image
//access       public
router.post('/', asyncHandler( async(req, res, next) => {

    const { url, customName } = req.body;

    if (!url) {
        return next(new ErrorResponse('Address not found', 404))
    }
    if (!validUrl.isUri(url)){
        return next(new ErrorResponse('Please enter valid Address', 404))
    }

    customerKey = process.env.customerKey;
    secretPhrase = process.env.secretPhrase;

    const options = {
        url,
        dimension : '1920x1080',
        device : '',
        format: 'jpg',
        cacheLimit: '0',
        delay: '200',
        zoom: '100'
    }

    const apiUrl = await screenshotmachine.generateScreenshotApiUrl(customerKey, secretPhrase, options);

    let output;

    if (customName) {
        output = customName + '.jpg'
    } else {
        const domain = (new URL(url)).hostname.replace('www.','').split('.')[0]

        output = domain + '.jpg'
    }
    
    
    
    await screenshotmachine.readScreenshot(apiUrl).pipe(fs.createWriteStream(output).on('close', function() {
    console.log('Screenshot saved as ' + output);

    
    setTimeout(() => {

    
    const {client_secret, client_id, redirect_uris} = credentials.installed;
  
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  
    
    // get inputs

    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive'];

    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'online',
      scope: SCOPES
    });
    
    return res.json({ url: authUrl, view: apiUrl, name: output}) // google drive access

    }, 3000)

}));

}));


//route POST   api/urls/confirm
//description  get the access to save the file
//access       public
router.post('/confirm', asyncHandler( async(req, res, next) => {

    const { key, fileName } = req.body;

    if (!fileName) {
        return next(new ErrorResponse('File not found', 404))
    }
    if (!key) {
        return next(new ErrorResponse('File not found', 404))
    }
    
    await saveFile(key, fileName)


    res.json({ success: true, message: 'File has been saved.' })

}));



module.exports = router;