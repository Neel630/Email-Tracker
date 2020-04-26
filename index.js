const express = require('express');
const app = express();
const connectDB = require('./config/db');

//connect to DB
connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('Running');
});

app.use('/api/email', require('./routes/api/email'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server Runnnig'));
