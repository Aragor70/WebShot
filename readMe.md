# WebShot

Automated screenshot generator

The website allows users to generate screenshots of any website and save them into the Google Drive service.


## Functionality specification

- A user can submit a URL and receive the picture of screenshot from input URL;
- A user can copy the image or save it in Google Drive storage;

- Given URL address needs to be valid;
- A user can access google drive within the secret key;
- A user will be asked for Google Drive access every time before the saving. It allows the service for use for every potential user with a Google Drive account.
- Screenshot width: 1920 pixels and height of 1080 pixels, Image format JPG. 
- A user can create file with customized name <b>< file_name ></b>.jpg.
- URL address needs to be valid.


## Technical Specification

- A README file with setup instructions.
- Clean code (of course).

- A git repository with clean commit history.
- Good REST practices.

## Usage
Rename "config/config.env.env" to "config/config.env" and update environment settings to your own.

Create your account at <i>https://www.screenshotmachine.com/</i>

Get the customerKey and insert into "config/config.env".
Be aware the free account has limited service.

## Install dependencies

```
npm install

# Run this command in the base and client directory.
```

Run App in development environment
```
npm run dev
```

- Version prequire 1.0.0
- License MIT

created by mikey.prus@gmail.com