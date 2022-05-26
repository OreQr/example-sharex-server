require('dotenv').config()
const express = require('express')
const app = express()
const db = require('node-localdb')
const uploads = db('uploads.json')
const path = require('path')
const shortid = require('shortid')
const fileUpload = require('express-fileupload')

const port = process.env.PORT || 3000

app.use(fileUpload({
    safeFileNames: true,
    preserveExtension: true,
    limits: {
        fileSize: process.env.UPLOAD_LIMIT*1024*1024
    },
    abortOnLimit: true
}))

app.post('/upload', (req, res) => {
    if (req.body.key !== process.env.KEY) {
        res.sendStatus(401)
        return
    }

    if (!req.files || !req.files.file) {
        res.sendStatus(400)
        return
    }

    var file = req.files.file

    var id = shortid.generate()

    file.mv(path.join(__dirname, `storage/${file.name}`), (error) => {
        if (error) {
            res.sendStatus(500)
            return
        }

        uploads.insert({ id: id, name: file.name }).then(function(u){
            res.send(`${process.env.URL}/${id}`)
        })
    })
})

app.get('/:id', (req, res) => {
    uploads.findOne({ id: req.params.id }).then((result) => {
        if (!result) {
            res.sendStatus(404)
            return
        }

        res.sendFile(path.join(__dirname, `storage/${result.name}`))
    })
})

app.get('/*', (req, res) => {
    res.redirect(process.env.REDIRECT)
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})