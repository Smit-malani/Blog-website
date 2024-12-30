const cloudinary = require('cloudinary').v2


module.exports.cloudinaryConfig = async()=>{
    try {
        await cloudinary.config({
            cloud_name: "diyyoucpw",
            api_key: "233874336764363",
            api_secret: "zVEIuZmFVX0TC06yIoQTDRyVbTU"
        })
        console.log("cloudinary config done")
    } catch (err) {
        console.log(err)
        console.log("error while cloudinary config")
    }
}