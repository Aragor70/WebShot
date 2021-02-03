const express = require('express');
const router = express.Router();
const fs = require('fs');
const asyncHandler = require('../../middlewares/async');
const screenshotmachine = require('screenshotmachine');

//route POST   api/abouts
//description  generate the image
//access       public
router.post('/', asyncHandler( async(req, res, next) => {

    const { url } = req.body;

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

    const output = 'output.png';
    
    const file = screenshotmachine.readScreenshot(apiUrl).pipe(fs.createWriteStream(output).on('close', function() {
    console.log('Screenshot saved as ' + output);

    res.json(file)

}));

}));

module.exports = router;