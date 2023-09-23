const express = require("express");
const cors = require("cors");
const app = express()
const path = require("path")
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})
const ip = "192.168.1.121"
const upload = multer({ storage })

const corsOptions = {
    origin: "http://192.168.1.121:3000",
}

app.use(cors(corsOptions))


const homesiteRouter = express.Router()
homesiteRouter.use(app.use(express.static(path.join(__dirname, "_home"))))
app.use("/home", homesiteRouter)

app.post(`/tallenna`, upload.single("file"), (req, res) => {

    console.log(req.body)

    if (!req.file){
        return res.status(400).json({ error: "no file uploaded"})
    }

    const tiedosto = req.file
    res.json({ msg: "file uploaded successfully: ", tiedosto })    
})

const port = process.env.PORT || 3000;
app.listen(port, ip, () => {
    console.log(`Server is running on port ${port}`)
}) 