# Example ShareX Server
 
## ShareX uploader config
Set the key to what you set in .env
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
