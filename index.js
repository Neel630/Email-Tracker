const express = require('express');
const app = express();
const connectDB = require('./config/db');
const Image = require('./model/Image')
var fs = require('fs');
//connect to DB
connectDB();

//save image in database
var ImageModel = new Image()
ImageModel.img.data= fs.readFileSync('sample_image.jpg')

//init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  console.log('hii');
  res.send('Running');
});

app.use('/api/email', require('./routes/api/email'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server Runnnig'));
