![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub last commit](https://img.shields.io/github/last-commit/oreqr/example-sharex-server?style=for-the-badge&logo=github&logoColor=white)

# Example ShareX Server
Simple application to file sharing using ShareX 📷

## Installation
### Requirements
- node
- npm
- pm2 (to install `npm install pm2 -g`)

Download from github
```bash
git clone https://github.com/oreqr/example-sharex-server.git

cd example-sharex-server
```
Install modules
```bash
npm install
```
Replace `[KEY]` in `config.json` and `server.sxcu` for your own key

Run the server
```bash
pm2 start "npm start" --name "sharex-server"
```
Run `server.sxcu` on your computer to configure ShareX

## License

[MIT](https://github.com/OreQr/example-sharex-server/blob/main/LICENSE)
