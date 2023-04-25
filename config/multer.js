const multer = require("multer")

const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/")// qual lugar o arquivo será salvo
    }, 
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // nome do arquivo para nn se repetir 
    },
})

const upload = multer({ storage });

module.exports = upload;