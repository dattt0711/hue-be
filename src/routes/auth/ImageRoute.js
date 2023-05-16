const upload = require('../../configs/configMulter');
const connection = require('../../configs/database');
async function getGFS() {
    return await require('../../configs/database');
}

const mongoose = require('mongoose');
function ImageRoute(apiRouter) {
    //image route
    apiRouter.post('/file/image/upload', upload.single('file'), async (request, response) => {
    if (request.file === undefined) {
      return response.send('Invalid request!');
    } else {
      const imgUrl = `http://localhost:5000/file/image/${request.file.filename}`;
      
      return response.send({
        success: true,
        data: imgUrl
      });
    }
  });
  apiRouter.get("/file/image/:filename", async (request, response) => {
    try {
      const gfs = await getGFS();
      const readStream = gfs.openDownloadStreamByName(request.params.filename);
      readStream.pipe(response);
    } catch (error) {
      console.log(error)
      response.send("Image not found!")
    }
  });
}
module.exports = ImageRoute;