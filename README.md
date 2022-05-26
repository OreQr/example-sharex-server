# Example ShareX Server
Simple application to file sharing using ShareX

## Setup

```php
$ cd example-sharex-server
$ npm install
$ node index.js
```

### ShareX uploader config
Set the same key as you set in .env
```json
{
    "DestinationType": "ImageUploader, FileUploader",
    "RequestType": "POST",
    "RequestURL": "http://localhost:3001/upload",
    "FileFormName": "file",
    "Arguments": {
        "key": "key"
    },
    "ResponseType": "Text"
}
```
